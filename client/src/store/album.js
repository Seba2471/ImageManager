import getApi from '../getApi';

const ALBUMS_URL = '/albums';
const ALBUM_URL = '/album';

const state = {
  albums: [],
};

const getters = {
  getAlbums(state) {
    return state.albums;
  },
};
const mutations = {
  setAlbums(state, albums) {
    state.albums = albums;
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
  async addAlbumImages(context, payload) {
    try {
      await getApi().post(`${ALBUM_URL}/images/${payload.id}`, { images: payload.images });
      context.dispatch('fetchAlbums');
    } catch (e) {
      console.log(e);
    }
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
