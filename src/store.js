import Vue from 'vue';
import 'es6-promise/auto';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		tariff: 'month',
		price: {
			month: 1000,
			week: 400,
			day: 80
		}
	},
	mutations: {
		change(state, value) {
			state.tariff = value;
		}
	}
});
