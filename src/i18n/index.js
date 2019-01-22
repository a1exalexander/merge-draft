import Vue from 'vue';

Vue.i18n.add('en', require('./en.json'));
Vue.i18n.set('en');

//if text isn't translated
Vue.i18n.fallback('en');
