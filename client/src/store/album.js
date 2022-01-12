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
    } catch (e) {
      console.log(e);
    }
  },
  async changeAlbumName(context, payload) {
    try {
      await getApi().patch(`${ALBUM_URL}/${payload.id}`, { name: payload.name });
      context.commit(
        'setAlbums',
        context.getters.getAlbums.map((item) => {
          if (item._id == payload.id) {
            item.name = payload.name;
          }
          return item;
        })
      );
    } catch (e) {
      console.log(e);
    }
  },
  async addAlbumImages(context, payload) {
    try {
      const album = context.getters.getAlbumById(payload.id);
      payload.images.forEach((image, index) => {
        album.images.forEach((albumImage) => {
          if (image == albumImage._id) {
            payload.images.splice(index, 1);
          }
        });
      });
      await getApi().post(`${ALBUM_URL}/images/${payload.id}`, { images: payload.images });
      context.dispatch('fetchAlbums');
    } catch (e) {
      console.log(e);
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
    } catch (e) {
      console.log(e);
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
