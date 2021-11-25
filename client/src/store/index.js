import Vue from 'vue';
import Vuex from 'vuex';
import Auth from './auth.js';
import Image from './image.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    Auth,
    Image,
  },
});
