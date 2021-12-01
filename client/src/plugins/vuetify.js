import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    light: true,
    dark: false,
    themes: {
      light: {
        primary: '#dddddd',
        secondary: '#5e5669',
        text: '#4A4A4A',
        accent: '#8c9eff',
        error: '#b71c1c',
        background: '#F6F6F6',
      },
    },
  },
});
