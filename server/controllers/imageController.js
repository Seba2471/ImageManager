import Image from '../db/models/imageModel.js';
import { removeImage, moveImage, getImagePath } from '../services/image/fileService.js';

class imageController {
  async add(req, res) {
    const image = new Image({
      name: req.body.name,
      file_name: req.file.filename,
      owner: req.body.owner,
    });

    image.path = moveImage(req.body.owner, req.file.filename);

    try {
      await image.save();
      res.sendStatus(201);
    } catch (e) {
      res.sendStatus(403);
      removeImage(req.file.filename);
    }
  }

  sendImage(req, res) {
    const owner = req.params.id;
    const filename = req.params.filename;

    res.status(200).sendFile(getImagePath(owner, filename), (e) => {
      if (e) {
        console.log(e);
        res.sendStatus(403);
      }
    });
  }
}

export default new imageController();
