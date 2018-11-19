<template>
<div class="timepicker">
	<p class="timepicker__field" @click="dropdown = !dropdown">{{ timeRange }}</p>
	<div class="timepicker__dropdown" v-show='dropdown'>
		<label class="timepicker__label" v-for="(item, index) in items" :key="item.id">
			<input name="time" class="timepicker__input" :disabled='item.disable' type='checkbox' :value='index' v-model='checkedTime'>
			<p class="timepicker__text" :style="item.color? item.color: ''">{{ item.val }}</p>
		</label>
	</div>
</div>
</template>

<script>
import http from 'axios';

export default {
	name: 'TimePicker',
	props: {day: String},
	data() {
		return {
			events: [],
			items: [
				{val: '08:00', color: {color: ''}, disable: false},
				{val: '08:30', color: {color: ''}, disable: false},
				{val: '09:00', color: {color: ''}, disable: false},
				{val: '09:30', color: {color: ''}, disable: false},
				{val: '10:00', color: {color: ''}, disable: false},
				{val: '10:30', color: {color: ''}, disable: false},
				{val: '11:00', color: {color: ''}, disable: false},
				{val: '11:30', color: {color: ''}, disable: false},
				{val: '11:30', color: {color: ''}, disable: false},
				{val: '12:00', color: {color: ''}, disable: false},
				{val: '12:30', color: {color: ''}, disable: false},
				{val: '13:00', color: {color: ''}, disable: false},
				{val: '13:30', color: {color: ''}, disable: false},
				{val: '14:00', color: {color: ''}, disable: false},
				{val: '14:30', color: {color: ''}, disable: false},
				{val: '15:00', color: {color: ''}, disable: false},
				{val: '15:30', color: {color: ''}, disable: false},
				{val: '16:00', color: {color: ''}, disable: false},
				{val: '16:30', color: {color: ''}, disable: false},
				{val: '17:00', color: {color: ''}, disable: false},
				{val: '17:30', color: {color: ''}, disable: false},
				{val: '18:00', color: {color: ''}, disable: false},
				{val: '18:30', color: {color: ''}, disable: false},
				{val: '19:00', color: {color: ''}, disable: false},
				{val: '19:30', color: {color: ''}, disable: false},
				{val: '20:00', color: {color: ''}, disable: false}
			],
			checkedTime: [],
			dropdown: false
		}
	},
	computed: {
		// function to display the selected time
		timeRange() {
			if(this.checkedTime.length == 1) {
				let start = this.items[this.checkedTime[0]].val;
				return `${start}-`
			} else if(this.checkedTime.length == 2) {
				let start = this.items[this.checkedTime[0]].val;
				let end = this.items[this.checkedTime[1]].val;
				this.$emit('mobileTime', {start: start, end: end});
				return `${start}-${end}`
			} else {
				return 'Select time'
			}
		}
	},
	watch: {
		// watcher for sort the array of the selected time
		'checkedTime.length'() {
			if(this.checkedTime.length == 1) {
				let arr = this.items;
				arr.forEach((el) => {
					el.color.color = '';
				});
			}
			if(this.checkedTime.length == 2) {
				let arr = this.checkedTime;
				let items = this.items;
				arr.sort(function(a, b) {
					if(a > b) return 1;
					if(a < b) return -1;
				});
				items.forEach((el, i) => {
					if (arr[0] < i && i < arr[1] && el.disable == true || (arr[0] + 1) == arr[1]) {
						arr.pop();
						return;
					}
					if((i == arr[0]) || (i == arr[1]) || (arr[0] < i && i < arr[1]) ) {
						el.color.color = '#50e3c2';
					} else {
						el.color.color = '';
					}
					if (i == items.length - 1 && arr.length == 2) {
						setTimeout(()=>{
							this.dropdown = false;
						}, 100);
					}
				});
			}
			if(this.checkedTime.length > 2) {
				let arr = this.checkedTime;
				arr.splice(0, 2);
			}
		},
		// watcher to mark unavailable time from google calendar
		'day'() {
			this.checkedTime = [];
			let arr = this.events,
				items = this.items,
				// create breakpoints
				day = Date.parse(new Date(this.day).toDateString());
			items.forEach((el, i)=>{
				items[i].disable = false;
				items[i].color.color = '';
			})
			arr.forEach(el=>{
				let start = new Date(el.start),
					end = new Date(el.end),
					// create variables of day to comparison
					eventDay = Date.parse(new Date(end).toDateString()),
					newStart = `${start.getHours()}:${start.getMinutes()=='0'?'00':start.getMinutes()}`,
					newEnd = `${end.getHours()}:${end.getMinutes()=='0'?'00':end.getMinutes()}`,
					indexStart = null,
					indexEnd = null;
				if(day == eventDay) {
					items.forEach((el, i)=>{
						if(el.val == newStart || indexStart && i > indexStart && el.val !== newEnd) {
							if(!indexEnd || i < indexEnd) {
								items[i].disable = true;
								indexStart = i;
							} 
						} else if (el.val == newEnd) {
							items[i].disable = true;
							indexEnd = i;
						} 
					})
				}
			})
		}
	},
	beforeMount() {
		// get events from google calendar
		http.get('https://www.googleapis.com/calendar/v3/calendars/13g6skar8uf2s0um2kmushttnc%40group.calendar.google.com/events?key=AIzaSyCwSdSdIblDFzQbJSzu17XmnqZ4WvOsTPw')
		.then((data)=> {
			let arr = data.data.items,
				now = Date.parse(new Date().toDateString());
			let newArr = arr.map(el=>{
				let date = Date.parse(new Date(el.end.dateTime).toDateString());
				if( date >= now) {
					return {start: el.start.dateTime, end: el.end.dateTime};
				} 
			});
			this.events = newArr.filter(el=>{
				return el;
			});
		})
		.catch(e => {
			window.console.log(e);
		});
	}
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/style.scss';

.timepicker {
	border-radius: 3px;
	background-color: $BUTTON-COLOR;
	padding: 12px 1rem;
	position: relative;
	@extend %flex-row;
	align-items: center;
	&__field {
		@extend %flex-row;
		align-items: center;
		font-family: $base-font;
		width: 100%;
		line-height: 1;
		font-size: 0.95rem;
		color: $TEXT-COLOR;
		white-space: nowrap;
		&::before {
			top: 41%;
			right: 0.4rem;
			border: solid transparent;
			content: '';
			height: 0;
			width: 0;
			position: absolute;
			pointer-events: none;
			border-color: transparent;
			border-top-color: $GREY;
			border-width: 6px;
			z-index: 20;
			@media (max-width: 375px) {
				top: 44%;
				right: 0.3rem;
			}
			@media (max-width: 320px) {
				border-width: 5px;
				right: 0.25rem;
			}
		}
		@media (max-width: 375px) {
			font-size: 0.8rem;
		}
		@media (max-width: 320px) {
			font-size: 0.68rem;
		}
	}
	&__dropdown {
		position: absolute;
		@extend %flex-col;
		align-self: flex-start;
		background-color: $DARK-GREY;
		padding: 5pt 15pt;
		height: 60vh;
		left: 0;
		right: 0;
		top: 100%;
		z-index: 10;
		border-radius: 3px;
		overflow-y: scroll;
	}
	&__input {
		position: absolute;
		top: 4px;
		visibility: hidden;
		opacity: 0;
		z-index: -10;
		&:checked + .timepicker__text {
			color: $MERGE-MAIN-COLOR;
		}
		&:disabled + .timepicker__text {
			color: $BLACK !important;
		}
	}
	&__label {
		position: relative;
		&:active .timepicker__text {
			opacity: 0.6;
		}
	}
	&__text {
		letter-spacing: 0.6pt;
		line-height: 1;
		padding: 4pt 0;
		font-family: $base-font;
		color: $TEXT-COLOR;
		font-size: 1rem;
		transition: color ease-in-out 0.1s,
					opacity ease-in-out 0.1s;
	}
}
</style>
