<template>
<div>
	<button class='cal' @click="sendCal">CHECK</button>
	<div>{{ date }}</div>
</div>
</template>

<script>
import http from 'axios';

export default {
	name: 'WeekCard',
	data() {
		return {
			date: ''
		}
	},
	methods: {
		sendCal() {
			http.get('https://www.googleapis.com/calendar/v3/calendars/13g6skar8uf2s0um2kmushttnc%40group.calendar.google.com/events?key=AIzaSyCwSdSdIblDFzQbJSzu17XmnqZ4WvOsTPw')
			.then((data)=> {
				window.console.log(data);
			})
			.catch(e => {
				window.console.log(e);
			});
		}
	}
   
}
</script>

<style lang="scss">
@import '../assets/scss/style.scss';

.cal {
	color: red;
}

</style>
