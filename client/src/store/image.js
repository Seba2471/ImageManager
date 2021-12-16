import getApi from '../getApi';

const IMAGES_URL = '/images';
const IMAGE_URL = '/image';

const state = {
  images: [],
  selected: [],
  saveSelected: [],
};

const getters = {
  getImages(state) {
    return state.images;
  },
  getReverseImage(state) {
    return state.images.slice().reverse();
  },
  getSelected(state) {
    return state.selected;
  },
  getSaveSelected(state) {
    return state.saveSelected;
  },
};

const mutations = {
  setImages(state, images) {
    state.images = images;
  },
  setSelected(state, selected) {
    state.selected = selected;
  },
  setSaveSelected(state, selected) {
    state.saveSelected = selected;
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
  async addImages(context, payload) {
    let formData = new FormData();

    let ModifiedDate = [];

    payload.files.map((file) => {
      formData.append('image', file);
      ModifiedDate.push(file.lastModifiedDate.toDateString());
    });

    formData.append('mdates', ModifiedDate);

    try {
      await getApi().post(IMAGE_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      context.dispatch('fetchImages');
    } catch (e) {
      console.log(e);
    }
  },

  async deleteImage(context) {
    try {
      await getApi().delete(IMAGE_URL, { data: { images: context.getters.getSelected } });
      context.commit('setSelected', []);
      context.dispatch('fetchImages');
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
