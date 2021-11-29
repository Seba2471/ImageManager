import getApi from '../getApi';

const ALBUMS_URL = '/albums';

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
  addAlbumImage(state) {
    console.log(state.albums);
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
};

export default {
  state,
  getters,
  mutations,
  actions,
};
