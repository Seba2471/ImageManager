import fs from 'fs';
import multer from 'multer';
import path from 'path';
import { __dirname } from '../../config.js';
import mv from 'mv';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './server/uploads/');
  },
  filename: function (req, file, cb) {
    const name = Date.now() + path.extname(file.originalname);
    cb(null, name);
  },
});
export const uploadImage = multer({ storage: storage });

export const removeImage = (filename) => {
  fs.rm(`./server/uploads/${filename}`, () => {
    console.log('File delete');
  });
};

export const moveImage = (owner, filename) => {
  const ownerPath = path.join(`./server/usersFiles/`, owner);
  const sourcePath = path.join('./server/uploads', filename);
  const destinationPath = path.join(ownerPath, filename);

  try {
    mv(sourcePath, destinationPath, { mkdirp: true }, function (err) {
      console.log('Add image');
    });
  } catch (e) {
    console.log(e);
    removeImage(filename);
  }
  return destinationPath;
};

export const getImagePath = (owner, filename) => {
  const usersFilesPath = path.join(__dirname, '/usersFiles/');
  return path.join(usersFilesPath, `${owner}/${filename}`);
};
