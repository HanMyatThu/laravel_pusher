require('./bootstrap');

window.Vue = require('vue');
import Vuetify from 'vuetify';
Vue.use(Vuetify);

import User from '../js/Helpers/User'
window.User = User;

window.EventBus = new Vue();

import md from 'marked'
window.md = md;

Vue.component('AppHome', require('./components/AppHome.vue').default);
import router from './Router/router.js';

const app = new Vue({
    el: '#app',
    router,
    vuetify: new Vuetify(),
});
