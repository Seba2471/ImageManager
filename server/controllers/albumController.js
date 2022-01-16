import Album from '../db/models/albumModel.js';
import { addImages, deleteImages } from '../services/album/albumService.js';
import { addAlbumToImages } from '../services/image/imageService.js';

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
      await album.save().then((doc) => {
        addAlbumToImages(doc._id, req.body.images);
      });
      res.status(201).send('Create new album');
    } catch (e) {
      console.log(e.errors.name?.message, e.errors.thumbnail?.message);
      res.status(403).json({
        nameError: e.errors.name?.message,
        thumbnailError: e.errors.thumbnail?.message,
      });
    }
  }

  async changeName(req, res) {
    try {
      const album = await Album.findById(req.params.id);
      album.name = req.body.name;
      await album.save();
      res.status(200).send('Album name changed');
    } catch (e) {
      console.log(e);
      res.status(403).send('Album name change failed');
    }
  }

  async changeThumbnail(req, res) {
    try {
      const album = await Album.findById(req.params.id);
      album.thumbnail = req.body.file_name;
      await album.save();
      res.status(200).send('Album thumbnail changed');
    } catch (e) {
      console.log(e);
      res.status(403).send('Album thumbnail change failed');
    }
  }

  async addImages(req, res) {
    try {
      await addImages(req.params.id, req.user.id, req.body.images);
      res.sendStatus(201);
    } catch (e) {
      console.log(e);
      res.status(403).send('No images to add');
    }
  }
  async deleteImages(req, res) {
    try {
      console.log(req.body.images);
      if (!req.body.images) {
        return res.status(403).send('No images to delete');
      }
      await deleteImages(req.params.id, req.user.id, req.body.images);
      res.sendStatus(204);
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
