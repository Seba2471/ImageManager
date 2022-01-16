import fs from 'fs';
import multer from 'multer';
import path from 'path';
import { __dirname } from '../../config.js';
import mv from 'mv';
import Image from '../../db/models/imageModel.js';
import User from '../../db/models/userModel.js';
import mongoose from 'mongoose';
import { deleteImageFromAlbums } from '../album/albumService.js';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './server/uploads/');
  },
  filename: function (req, file, cb) {
    const name = Date.now() + path.extname(file.originalname);
    cb(null, name);
  },
});

function fileFilter(req, file, cb) {
  const whitelist = ['image/png', 'image/jpeg'];

  if (whitelist.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Extension not allowed'));
  }
}

export const uploadImage = multer({ storage, fileFilter });

export const removeErrorImage = (files) => {
  files.map((file) => {
    fs.rm(`./server/uploads/${file.filename}`, () => {
      console.log('File delete');
    });
  });
};

export const moveImage = (owner, filename) => {
  const ownerPath = path.join(`./server/usersFiles/`, owner);
  const sourcePath = path.join('./server/uploads', filename);
  const destinationPath = path.join(ownerPath, filename);

  try {
    mv(sourcePath, destinationPath, { mkdirp: true }, function (err) {});
  } catch (e) {
    console.log(e);
    removeErrorImage(filename);
  }
  return destinationPath;
};

export const getImagePath = (owner, filename) => {
  const usersFilesPath = path.join(__dirname, '/usersFiles/');
  return path.join(usersFilesPath, `${owner}/${filename}`);
};

export const removeUserImage = (image) => {
  fs.unlinkSync(image.path);
};
export const removeUserImages = async (imagesId, userId) => {
  try {
    const images = await Image.find({
      _id: {
        $in: imagesId,
      },
    })
      .then(function (docs) {
        const albums = [];
        const images = [];
        docs.map((image) => {
          try {
            fs.unlinkSync(getImagePath(image.owner, image.file_name));
          } catch (e) {
            throw new Error('Unlink File Error');
          }
          image.albums.map((album) => {
            if (!albums.includes(album.toString())) {
              albums.push(album.toString());
            }
          });
          if (!images.includes(image)) {
            images.push(image._id);
          }
        });
        deleteImageFromAlbums(albums, images);
      })
      .catch(() => {
        throw new Error('Images not found');
      });
    Image.deleteMany(
      {
        _id: {
          $in: imagesId,
        },
      },
      function (err) {
        if (err) {
          throw new Error('Delete Error');
        }
      }
    );

    const owner = await User.findById(userId);
    User.findByIdAndUpdate(owner.id, { imagesCount: owner.imagesCount - imagesId.length }, function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        docs.imagesCount -= imagesId.length;
      }
    });
  } catch (e) {
    throw new Error(e);
  }
};

export const addAlbumToImages = async (id, images) => {
  if (typeof id == 'string') {
    const newId = mongoose.Types.ObjectId(id);
    await Image.updateMany({ _id: { $in: images } }, { $push: { albums: newId } });
  } else {
    await Image.updateMany({ _id: { $in: images } }, { $push: { albums: id } });
  }
};
