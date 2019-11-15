import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
  theme: {
    themes: {
      light: {
        yellow: '#F5C501',
        red: '#F23005',
        pink: '#F29B88',
        cyan: '#05DBF2',
        blue: '#0477BF',
        black: '#000',
        white: '#fff',
      }
    }
  },
});
