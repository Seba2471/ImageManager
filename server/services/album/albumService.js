import Album from '../../db/models/albumModel.js';
import { verifityOwner } from '../auth/ownerService.js';
import { addAlbumToImages } from '../image/imageService.js';

export const addImages = async (albumId, userId, images) => {
  try {
    const album = await Album.findByIdAndUpdate(albumId, { $push: { images: { $each: images } } });
    addAlbumToImages(albumId, images);
    if (!album) {
      throw new Error('Album not found');
    }
    verifityOwner(album.owner, userId);
    await album.save();
  } catch (e) {
    throw new Error(e);
  }
};

export const deleteImages = async (albumId, userId, images) => {
  try {
    const album = await Album.findByIdAndUpdate(albumId, { $pull: { images: { $in: images } } });
    await album.save();
    if (!album) {
      throw new Error('Album not found');
    }
    verifityOwner(album.owner, userId);
  } catch (e) {
    throw new Error(e);
  }
};

export const deleteImageFromAlbums = async (albums, images) => {
  try {
    await Album.updateMany({ _id: { $in: albums } }, { $pull: { images: { $in: images } } });
  } catch (e) {
    console.log(e);
  }
};
