import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    light: true,
    themes: {
      light: {
        primary: '#9A9A9A',
        secondary: '#B0B0B0',
        grey: '#CBCBCB',
        greyLight: 'EDEDED',
        text: '#4A4A4A',
        accent: '#8c9eff',
        error: '#b71c1c',
        background: '#F6F6F6',
      },
    },
  },
});
