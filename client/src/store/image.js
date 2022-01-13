import getApi from '../getApi';
import sortArray from 'sort-array';

const IMAGES_URL = '/images';
const IMAGE_URL = '/image';

const state = {
  images: [],
  selectedImages: [],
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
  getSelectedImages(state) {
    return state.selectedImages;
  },
  getUploadPercentage(state) {
    return state.uploadPercentage;
  },
};

const mutations = {
  setImages(state, images) {
    state.images = images;
  },
  setSelectedImages(state, selected) {
    state.selectedImages = [...selected];
  },
  addSelectedImages(state, selected) {
    state.selectedImages = [...state.selectedImages, selected];
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

  async deleteImage(context, payload) {
    try {
      await getApi().patch(IMAGE_URL, { images: payload });
      context.commit('setSelectedImages', []);
      context.commit(
        'setAlbums',
        context.getters.getAlbums.map((item) => {
          item.images = item.images.filter((image) => !payload.includes(image._id));
          return item;
        })
      );
      context.commit(
        'setImages',
        context.getters.getImages.filter((image) => {
          if (!payload.includes(image._id)) {
            return image;
          }
        })
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
