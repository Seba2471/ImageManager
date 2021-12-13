import getApi from '../getApi.js';
import VueAuthImage from 'vue-auth-image';
// import axios from 'axios';

// const LOGIN_URL = '/login';

const state = {
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
};
const getters = {
  getAccessToken(state) {
    return state.accessToken;
  },
  getRefreshToken(state) {
    return state.refreshToken;
  },
  getIsAuthenticated(state) {
    return state.isAuthenticated;
  },
};

const mutations = {
  setAccessToken(state, accessToken) {
    state.accessToken = accessToken;
  },
  setRefreshToken(state, refreshToken) {
    state.refreshToken = refreshToken;
  },
  setIsAuthenticated(state, isAuthenticated) {
    state.isAuthenticated = isAuthenticated;
  },
};

const actions = {
  async login(context, payload) {
    try {
      const response = await getApi().post('/login', payload);
      context.commit('setAccessToken', response.data.accessToken);
      context.commit('setRefreshToken', response.data.refreshToken);
      context.commit('setIsAuthenticated', true);
      VueAuthImage.setup(response.data.accessToken);
      return true;
    } catch (err) {
      context.dispatch('logout');
      return false;
    }
  },

  async refresh(context) {
    try {
      if (context.getters.isAuthenticated) {
        const response = await getApi().post('/refresh', { refreshToken: context.getters.getRefreshToken });
        context.commit('setAccessToken', response.data.accessToken);
        VueAuthImage.setup(response.data.accessToken);
        return true;
      }
    } catch (e) {
      context.dispatch('logout');
      return false;
    }
  },
  async logout(context) {
    context.commit('setAccessToken', null);
    context.commit('setRefreshToken', null);
    context.commit('setIsAuthenticated', false);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
