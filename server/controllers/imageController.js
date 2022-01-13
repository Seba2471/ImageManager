import Image from '../db/models/imageModel.js';
import User from '../db/models/userModel.js';
import { removeErrorImage, moveImage, getImagePath, removeUserImages } from '../services/image/imageService.js';

class imageController {
  async userImage(req, res) {
    const images = await Image.find({ owner: req.user.id });
    res.json(images.reverse());
  }
  async add(req, res) {
    try {
      const owner = await User.findById(req.user.id);

      if (!owner) {
        throw new Error('User not found');
      }

      let images = [];

      if (!req.body.mdates) {
        return res.status(403).send('No images to add');
      }
      const imageModiftyDate = req.body.mdates.split(',');

      req.files.map((file, index) => {
        const image = new Image({
          orignal_name: file.originalname,
          last_modifity: Date.parse(imageModiftyDate[index]),
          file_name: file.filename,
          owner: owner.id,
        });
        image.path = moveImage(owner.id, file.filename);
        images.push(image);
      });
      User.findByIdAndUpdate(owner.id, { imagesCount: owner.imagesCount + req.files.length }, function (err, docs) {
        if (err) {
          console.log(err);
        } else {
          docs.imagesCount += req.files.length;
        }
      });
      await Image.insertMany(images)
        .then(function () {
          console.log('Images add'); // Success
        })
        .catch(function (error) {
          console.log(error); // Failure
        });
      res.status(201).send('Images add');
    } catch (e) {
      console.log(e);
      removeErrorImage(req.files);
    }
  }

  send(req, res) {
    const owner = req.user.id;
    const filename = req.params.filename;

    res.status(200).sendFile(getImagePath(owner, filename), (e) => {
      if (e) {
        console.log(e);
        res.sendStatus(403);
      }
    });
  }

  async delete(req, res) {
    try {
      if (!req.body.images) {
        return res.status(403).send('No images to delete');
      }
      await removeUserImages(req.body.images, req.user.id);
      res.sendStatus(204);
    } catch (e) {
      console.log(e);
      res.status(403).send('Images not exists');
    }
  }
}

export default new imageController();
