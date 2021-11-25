import getApi from '../getApi';

const IMAGES_URL = '/images';

const state = {
  images: [],
};

const getters = {
  getImages(state) {
    return state.images;
  },
};

const mutations = {
  setImages(state, images) {
    state.images = images;
  },
};

const actions = {
  async fetchImages(context) {
    try {
      const response = await getApi().get(IMAGES_URL);
      context.commit('setImages', response.data);
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
