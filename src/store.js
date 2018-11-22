import Vue from 'vue';
import 'es6-promise/auto';
import Vuex from 'vuex';
import VuexI18n from 'vuex-i18n';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		tariff: 'month',
		price: {
			month: 1000,
			week: 400,
			day: 80,
			hour: 150
		},
		event: {
			dateStart: '',
			dateEnd: '',
			duration: ''
		}
	},
	mutations: {
		change(state, value) {
			state.tariff = value;
		},
		changeEvent(state, eventData) {
			state.event.dateStart = eventData.dateStart;
			state.event.dateEnd = eventData.dateEnd;
			state.event.duration = eventData.duration;
		},
		removeEvent(state, value) {
			state.event.dateStart = value;
			state.event.dateEnd = value;
			state.event.duration = value;
		}
	}
});

Vue.use(VuexI18n.plugin, store);

export default store;
