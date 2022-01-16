import getApi from '../getApi';

const ALBUMS_URL = '/albums';
const ALBUM_URL = '/album';

const state = {
  albums: [],
  selectedAlbums: [],
};

const getters = {
  getAlbums(state) {
    return state.albums;
  },
  getAlbumById(state) {
    return (id) => state.albums.find((album) => album._id == id);
  },
  getSelectedAlbums(state) {
    return state.selectedAlbums;
  },
};
const mutations = {
  setAlbums(state, albums) {
    state.albums = albums;
  },
  addSelectedAlbums(state, selected) {
    state.selectedAlbums = [...state.selectedAlbums, selected];
  },
  setSelectedAlbums(state, selected) {
    state.selectedAlbums = selected;
  },
};

const actions = {
  async fetchAlbums(context) {
    try {
      const response = await getApi().get(ALBUMS_URL);
      context.commit('setAlbums', response.data);
      return true;
    } catch (e) {
      return false;
    }
  },
  async createAlbum(context, payload) {
    try {
      await getApi().post(ALBUM_URL, payload);
      context.dispatch('fetchAlbums');
      return true;
    } catch (e) {
      return false;
    }
  },
  async changeAlbumName(context, payload) {
    try {
      await getApi().patch(`${ALBUM_URL}/name/${payload.id}`, { name: payload.name });
      context.commit(
        'setAlbums',
        context.getters.getAlbums.map((item) => {
          if (item._id == payload.id) {
            item.name = payload.name;
          }
          return item;
        })
      );
      return true;
    } catch (e) {
      return false;
    }
  },
  async changeAlbumThumbnail(context, payload) {
    try {
      const album = context.getters.getAlbumById(payload.id);
      let newImage = '';
      album.images.map((image) => {
        if (image._id == payload.image) {
          newImage = image.file_name;
        }
      });
      await getApi().patch(`${ALBUM_URL}/thumbnail/${payload.id}`, { file_name: newImage });
      context.commit(
        'setAlbums',
        context.getters.getAlbums.map((item) => {
          if (item._id == payload.id) {
            item.thumbnail = newImage;
          }
          return item;
        })
      );
      return true;
    } catch (e) {
      return false;
    }
  },
  async addAlbumImages(context, payload) {
    try {
      const albumImages = context.getters.getAlbumById(payload.id).images.map((image) => {
        return image._id;
      });

      payload.images = payload.images.filter((image) => {
        return !albumImages.includes(image);
      });

      await getApi().post(`${ALBUM_URL}/images/${payload.id}`, { images: payload.images });
      context.dispatch('fetchAlbums');

      return true;
    } catch (e) {
      return false;
    }
  },

  async deleteAlbumImages(context, payload) {
    try {
      await getApi().patch(`${ALBUM_URL}/images/${payload.id}`, { images: payload.images });
      context.commit(
        'setAlbums',
        context.getters.getAlbums.map((item) => {
          if (item._id == payload.id) {
            item.images = item.images.filter((image) => !payload.images.includes(image._id));
          }
          return item;
        })
      );
      return true;
    } catch (e) {
      return false;
    }
  },

  async deleteAlbum(context, payload) {
    try {
      await getApi().delete(`${ALBUM_URL}/${payload.id}`);
      context.commit(
        'setAlbums',
        context.getters.getAlbums.filter((album) => album._id != payload.id)
      );
      return true;
    } catch (e) {
      return false;
    }
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
