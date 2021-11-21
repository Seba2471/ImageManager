import Image from '../db/models/imageModel.js';

class imageController {
  add(req, res) {
    const image = new Image({
      name: req.body.name,
      path: 'path test',
      file_name: 'tests',
      owner: '619a9c798a48b499289e3f06',
    });

    try {
      image.save();
      res.sendStatus(201);
    } catch (e) {
      console.log(e);
    }
  }
}

export default new imageController();
