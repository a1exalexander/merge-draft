<template>
<section class="calendar">
	<div class="calendar__wrapper">
		<h3 class="calendar__title">
			Availability calenda
		</h3>
		<full-calendar :events="events" :config="config"></full-calendar>
		<div class="calendar__inner">
			<button-book :disabled='true'></button-book>
			<p class="calendar__text">Choose a time on the calendar when you need a Meeting Room. After click "Reserve"
			</p>
		</div>
	</div>
</section>

</template>

<script>
import { FullCalendar } from 'vue-full-calendar';
import ButtonBook from '@/components/buttons/ButtonBook.vue';

export default {
	name: 'calendar',
	components: {
		FullCalendar,
		ButtonBook
	},
	data() {
		return {
			events: [
				{
					title: 'event1',
					start: '2018-10-29T09:30:00',
					end: '2018-10-29T10:30:00',
					backgroundColor: 'red',
					borderColor: 'yellow',
					textColor: 'black'
				},
				{
					title: 'event2',
					start: '2018-11-02T14:30:00',
					end: '2018-11-02T16:30:00'
				}
			],
			config: {
				footer: false,
				height: 'auto',
				defaultView: 'agendaWeek',
				allDaySlot: false,
				minTime: '08:00:00',
				maxTime: '20:00:00',
				slotEventOverlap: false,
				selectOverlap: false,
				slotDuration: '00:30:00',
				columnHeaderFormat: 'dddd',
				titleFormat: 'DD MMMM, YYYY',
				nowIndicator: true,
				header: {
					left: 'prev title next',
					center: '',
					right: ''
				},
				navLinks: false,
				selectable: true,
				selectHelper: true
			}
		};
	}
};
</script>

<style lang="scss">
@import '../assets/scss/style.scss';
@import '../assets/scss/fullcalendar.scss';
#calendar {
	width: 100%;
	border-radius: 4px;
	border: solid 3px rgba(80, 227, 194, 0.5);
	background-color: #000000;
}
.calendar {
	padding-left: 112px;
	width: 100%;
	color: $TEXT-COLOR;
	&__wrapper {
		padding: 0 5% 0 10%;
	}
	&__title {
		padding-top: 4.4375rem;
		padding-bottom: 3.1875rem;
		font-family: $title-font;
		font-size: 1.875rem;
		font-weight: bold;
		text-align: left;
		color: $TEXT-COLOR;
	}
	&__inner {
		padding: 58px 0 90px 0;
		width: 100%;
		@extend %flex-col-c;
		align-items: center;
	}
	&__text {
		font-family: $base-font;
		font-size: 0.8125rem;
		font-weight: 500;
		line-height: 2;
		text-align: center;
		color: $TEXT-COLOR;
	}
	.button-book {
		margin-bottom: 29px;
	}
}
</style>
