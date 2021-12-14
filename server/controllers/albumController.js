import Album from '../db/models/albumModel.js';
import { addImages, deleteImages } from '../services/album/albumService.js';

class albumController {
  async list(req, res) {
    try {
      const albums = await Album.find({ owner: req.user.id }).populate('images');
      res.json(albums);
    } catch (e) {
      console.log(e);
    }
  }
  async create(req, res) {
    const album = new Album({
      name: req.body.name,
      thumbnail: req.body.thumbnail,
      images: req.body.images,
      owner: req.user.id,
    });
    try {
      await album.save();
      res.status(201).send('Create new album');
    } catch (e) {
      res.sendStatus(403);
      console.log(e);
    }
  }

  async addImages(req, res) {
    try {
      await addImages(req.params.id, req.user.id, req.body.images);
      res.sendStatus(201);
    } catch (e) {
      console.log(e);
      res.sendStatus(403);
    }
  }
  async deleteImages(req, res) {
    try {
      await deleteImages(req.params.id, req.user.id, req.body.images);
      res.sendStatus(201);
    } catch (e) {
      res.sendStatus(403);
      console.log(e);
    }
  }

  async delete(req, res) {
    try {
      await Album.findByIdAndDelete(req.params.id);
      res.sendStatus(200);
    } catch (e) {
      res.sendStatus(403);
      console.log(e);
    }
  }
}

export default new albumController();
