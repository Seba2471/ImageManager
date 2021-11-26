import Vue from 'vue';
import Vuex from 'vuex';
import Auth from './auth.js';
import Image from './image.js';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {},
  mutations: {},
  actions: {},
  modules: {
    Auth,
    Image,
  },
});
