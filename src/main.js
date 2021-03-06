import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// import '@/assets/css/tailwind.css';

import vuetify from './plugins/vuetify';

import './assets/tailwind.css';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
  mounted() {
    // this.$vuetify.theme.dark = true;
    this.$vuetify.lang.defaultLocale = 'pt';
    this.$vuetify.lang.current = 'pt';
  },
}).$mount('#app');
