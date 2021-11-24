import Image from '../db/models/imageModel.js';
import User from '../db/models/userModel.js';
import { removeErrorImage, moveImage, getImagePath, removeUserImage } from '../services/image/fileService.js';

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

      const image = new Image({
        orignal_name: req.body.orignal_name,
        file_name: req.file.filename,
        owner: owner.id,
      });

      image.path = moveImage(owner.id, req.file.filename);

      const imagesCount = owner.imagesCount + 1;

      User.findByIdAndUpdate(owner.id, { imagesCount }, function (err, docs) {
        if (err) {
          console.log(err);
        } else {
          docs.imagesCount += 1;
        }
      });
      await image.save();
      res.status(201).send('Image add');
    } catch (e) {
      console.log(e);
      removeErrorImage(req.file.filename);
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
      const image = await Image.findById(req.params.id);
      if (!image) {
        throw new Error('Image not found');
      }
      const owner = await User.findById(image.owner);
      owner.imagesCount -= 1;
      removeUserImage(image);
      await Image.findByIdAndDelete(req.params.id);
      owner.save();
      res.sendStatus(204);
    } catch (e) {
      console.log(e);
      res.status(403).send('Image not found');
    }
  }
}

export default new imageController();
