import getApi from '../getApi';

const IMAGES_URL = '/images';

const state = {
  images: [],
  selected: [],
};

const getters = {
  getImages(state) {
    return state.images;
  },
  getSelected(state) {
    return state.selected;
  },
};

const mutations = {
  setImages(state, images) {
    state.images = images;
  },
  setSelected(state, selected) {
    state.selected = selected;
  },
  addSelected(state, selected) {
    state.selected = [...state.selected, selected];
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