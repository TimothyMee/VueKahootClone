
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');
import store from './store/store'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

import router from './routes.js'

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */


// Vue.component('example-component', require('./components/ExampleComponent.vue'));
// Vue.component('single-player', require('./components/SinglePlayer.vue'));
// Vue.component('new-player', require('./components/NewPlayer.vue'));

const app = new Vue({
    el: '#app',
    store,
    router
});
