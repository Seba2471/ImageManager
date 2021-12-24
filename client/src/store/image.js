import getApi from '../getApi';
import sortArray from 'sort-array';

const IMAGES_URL = '/images';
const IMAGE_URL = '/image';

const state = {
  images: [],
  selected: [],
  uploadPercentage: 0,
};

const getters = {
  getImages(state) {
    return state.images;
  },
  getReverseImage(state) {
    return state.images.slice().reverse();
  },
  getSortByModifityDateDesc(state) {
    return sortArray(state.images.slice(), {
      by: 'last_modifity',
      order: 'desc',
    });
  },
  getSortByModifityDateAsc(state) {
    return sortArray(state.images.slice(), {
      by: 'last_modifity',
      order: 'asc',
    });
  },
  getSelected(state) {
    return state.selected;
  },
  getUploadPercentage(state) {
    return state.uploadPercentage;
  },
};

const mutations = {
  setImages(state, images) {
    state.images = images;
  },
  setSelected(state, selected) {
    state.selected = [...selected];
  },
  addSelected(state, selected) {
    state.selected = [...state.selected, selected];
  },
  setUploadPercentage(state, uploadPercentage) {
    state.uploadPercentage = uploadPercentage;
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
      await getApi()
        .post(IMAGE_URL, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) =>
            context.commit('setUploadPercentage', parseInt(Math.round((progressEvent.loaded / progressEvent.total) * 100))),
        })
        .then(() => {
          setTimeout(() => context.commit('setUploadPercentage', 0), 2000);
          context.dispatch('fetchImages');
        });
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
