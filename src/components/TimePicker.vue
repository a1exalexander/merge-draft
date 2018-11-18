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
			date: '',
			dropdown: false
		}
	},
	computed: {
		timeRange() {
			if(this.checkedTime.length == 1) {
				let start = this.items[this.checkedTime[0]].val;
				return `${start} - `
			} else if(this.checkedTime.length == 2) {
				let start = this.items[this.checkedTime[0]].val;
				let end = this.items[this.checkedTime[1]].val;
				return `${start} - ${end}`
			} else {
				return 'Select time'
			}
		}
	},
	watch: {
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
					if (arr[0] < i && i < arr[1] && el.disable == true) {
						arr.pop();
						return;
					}
					if((i == arr[0]) || (i == arr[1]) || (arr[0] < i && i < arr[1]) ) {
						el.color.color = 'red';
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
		'events.length'() {
			let arr = this.events,
				items = this.items,
				indexStart = null,
				indexEnd = null
			arr.forEach(el=>{
				let start = new Date(el.start),
					end = new Date(el.end),
					newStart = `${start.getHours()}:${start.getMinutes()=='0'?'00':start.getMinutes()}`,
					newEnd = `${end.getHours()}:${end.getMinutes()=='0'?'00':end.getMinutes()}`;
				items.forEach((el, i)=>{
					if(el.val == newStart || indexStart && i > indexStart && el.val !== newEnd) {
						if(!indexEnd || i < indexEnd) {
							this.items[i].disable = true;
							indexStart = i;
						} 
					} else if (el.val == newEnd) {
						this.items[i].disable = true;
						indexEnd = i;
					} 
				})
			})
		}
	},
	beforeMount() {
		http.get('https://www.googleapis.com/calendar/v3/calendars/13g6skar8uf2s0um2kmushttnc%40group.calendar.google.com/events?key=AIzaSyCwSdSdIblDFzQbJSzu17XmnqZ4WvOsTPw')
		.then((data)=> {
			let arr = data.data.items;
			let now = Date.now();
			let newArr = arr.map(el=>{
				if(Date.parse(el.end.dateTime) > now) {
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
.timechecked {
	color: red;
}
.timepicker {
	position: relative;
	&__field {
		width: 100%;
		font-size: 1.2rem;
		color: $TEXT-COLOR;
		@media (max-width: 375px) {
			font-size: 1.1rem;
		}
		@media (max-width: 320px) {
			font-size: 0.95rem;
		}
	}
	&__dropdown {
		position: absolute;
		@extend %flex-col;
		align-self: flex-start;
		background-color: dimgray;
		padding: 5pt 20pt;
		height: 50vh;
		left: 0;
		right: 0;
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
			color: red;
		}
		&:disabled + .timepicker__text {
			color: black !important;
		}
	}
	&__label {
		position: relative;
		&:active .timepicker__text {
			opacity: 0.8;
		}
	}
	&__text {
		padding: 2pt 0;
		color: $TEXT-COLOR;
		font-size: 1.2rem;
		transition: color ease-in-out 0.1s,
					opacity ease-in-out 0.1s;
	}
}

</style>
