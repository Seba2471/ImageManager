import getApi from '../getApi.js';
import VueAuthImage from 'vue-auth-image';
// import axios from 'axios';

// const LOGIN_URL = '/login';

const state = {
  accessToken: null,
  refreshToken: null,
};
const getters = {
  getAccessToken(state) {
    return state.accessToken;
  },
  getRefreshToken(state) {
    return state.refreshToken;
  },
};

const mutations = {
  setAccessToken(state, accessToken) {
    state.accessToken = accessToken;
  },
  setRefreshToken(state, refreshToken) {
    state.refreshToken = refreshToken;
  },
};

const actions = {
  async login(context, payload) {
    try {
      const response = await getApi().post('/login', payload);
      context.commit('setAccessToken', response.data.accessToken);
      context.commit('setRefreshToken', response.data.refreshToken);
      VueAuthImage.setup(response.data.accessToken);
      return true;
    } catch (err) {
      context.commit('setAccessToken', null);
      context.commit('setRefreshToken', null);
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
