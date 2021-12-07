import Image from '../db/models/imageModel.js';
import User from '../db/models/userModel.js';
import { removeErrorImage, moveImage, getImagePath, removeUserImages } from '../services/image/fileService.js';

class imageController {
  async userImage(req, res) {
    const images = await Image.find({ owner: req.user.id });
    res.json(images);
  }
  async add(req, res) {
    try {
      const owner = await User.findById(req.user.id);

      if (!owner) {
        throw new Error('User not found');
      }

      let images = [];

      req.files.map((file) => {
        const image = new Image({
          orignal_name: file.originalname,
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
      res.sendStatus(403);
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
      console.log(req.body);
      removeUserImages(req.body.images);
      // const owner = await User.findById(req.user.id);
      // owner.imagesCount -= 1;
      // owner.save();
      res.sendStatus(204);
    } catch (e) {
      console.log(e);
      res.sendStatus(403);
    }
  }
}

export default new imageController();
