import getApi from '../getApi.js';
import VueAuthImage from 'vue-auth-image';

// const LOGIN_URL = '/login';

const state = {
  userEmail: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
};
const getters = {
  getUserEmail(state) {
    return state.userEmail;
  },
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
  setUserEmail(state, userEmail) {
    state.userEmail = userEmail;
  },
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
      context.commit('setUserEmail', response.data.email);
      context.commit('setAccessToken', response.data.accessToken);
      context.commit('setRefreshToken', response.data.refreshToken);
      context.commit('setIsAuthenticated', true);
      if (response.data.accessToken) {
        VueAuthImage.setup(response.data.accessToken);
      }
      return true;
    } catch (err) {
      return false;
    }
  },
  async register(context, payload) {
    try {
      const response = await getApi().post('/register', payload);
      return response;
    } catch (err) {
      return err.response.data;
    }
  },

  async changePassword(context, payload) {
    try {
      await getApi().post('/change-password', payload);
      return true;
    } catch (err) {
      return false;
    }
  },

  async refresh(context) {
    try {
      const response = await getApi().post('/refresh', { refreshToken: context.getters.getRefreshToken });
      context.commit('setAccessToken', response.data.accessToken);
      context.commit('setIsAuthenticated', true);
      return true;
    } catch (e) {
      context.dispatch('logout');
      return false;
    }
  },
  async logout(context) {
    context.commit('setAccessToken', null);
    context.commit('setRefreshToken', null);
    context.commit('setIsAuthenticated', false);
    context.commit('setImages', []);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
