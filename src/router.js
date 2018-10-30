import Vue from 'vue';
import Router from 'vue-router';

import Hello from './views/Hello.vue';
import BookingWorkplace from './views/BookingWorkplace.vue';
import AboutUs from './views/AboutUs.vue';
import BookMeetingRoom from './views/BookMeetingRoom.vue';
import Coworking from './views/Coworking.vue';
import MeetingRoom from './views/MeetingRoom.vue';
import MergeMenu from './views/MergeMenu.vue';
import Events from './views/Events.vue';

Vue.use(Router);

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	scrollBehavior(to, from, savedPosition) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve({ x: 0, y: 0 });
			}, 200);
		});
	},
	routes: [
		{
			path: '*',
			name: 'other',
			component: Hello
		},
		{
			path: '/',
			name: 'hello',
			component: Hello
		},
		{
			path: '/menu',
			name: 'menu',
			component: MergeMenu
		},
		{
			path: '/coworking',
			name: 'coworking',
			component: Coworking
		},
		{
			path: '/meeting-room',
			name: 'meeting-room',
			component: MeetingRoom
		},
		{
			path: '/events',
			name: 'events',
			component: Events
		},
		{
			path: '/about',
			name: 'about',
			component: AboutUs
		},
		{
			path: '/booking-workplace',
			name: 'booking-workplace',
			component: BookingWorkplace
		},
		{
			path: '/book-meeting-room',
			name: 'book-meeting-room',
			component: BookMeetingRoom
		}
	]
});
