import Vue from 'vue';

Vue.i18n.add('en', require('./en.json'));
Vue.i18n.set('en');
Vue.i18n.fallback('en');
