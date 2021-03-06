import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import VueAuthImage from 'vue-auth-image';
import VueSimpleAlert from 'vue-simple-alert';

Vue.use(VueSimpleAlert);
// register vue-auth-image directive
Vue.use(VueAuthImage);

if (store.getters.getAccessToken) {
  VueAuthImage.setup(store.getters.getAccessToken);
}

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
