import Vue from 'vue';
import Router from 'vue-router';

import Hello from './views/Hello.vue';
import BookingWorkplace from './views/BookingWorkplace.vue';
import AboutUs from './views/AboutUs.vue';
import Coworking from './views/Coworking.vue';
import MeetingRoom from './views/MeetingRoom.vue';
import MergeMenu from './views/MergeMenu.vue';
import Events from './views/Events.vue';

Vue.use(Router);

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	scrollBehavior() {
		return new Promise(resolve => {
			setTimeout(() => {
				resolve({ x: 0, y: 0 });
			}, 200);
		});
	},
	routes: [
		{
			path: '*',
			name: 'Start',
			component: Hello
		},
		{
			path: '/',
			name: 'Hello',
			component: Hello
		},
		{
			path: '/menu',
			name: 'Menu',
			component: MergeMenu
		},
		{
			path: '/coworking',
			name: 'Coworking',
			component: Coworking
		},
		{
			path: '/meeting-room/:calendar?',
			name: 'MeetingRoom',
			component: MeetingRoom,
			props: true
		},
		{
			path: '/events',
			name: 'Events',
			component: Events
		},
		{
			path: '/about',
			name: 'About',
			component: AboutUs
		},
		{
			path: '/booking-workplace',
			name: 'BookingWorkplace',
			component: BookingWorkplace
		}
	]
});
