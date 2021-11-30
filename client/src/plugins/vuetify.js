import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    light: true,
    themes: {
      light: {
        primary: '#9155fd',
        secondary: '#5e5669',
        text: '#5e5669',
        accent: '#8c9eff',
        error: '#b71c1c',
        background: '#f4f5fa',
      },
    },
  },
});
