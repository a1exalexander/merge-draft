<template>
<section class="calendar">
	<div class="calendar__wrapper">
		<h3 class="calendar__title" id='toCal'>
			Availability calenda
		</h3>
		<div id='fullcalendar'></div>
		<div class="calendar__inner">
			<button-book :disabled='buttonShow' @click.native='showBook'></button-book>
			<p class="calendar__text">Choose a time on the calendar when you need a Meeting Room. After click "Reserve"
			</p>
		</div>
	</div>
  <svg style='display: none'>
    <symbol id='close-mini' viewBox="0 0 24 24">
      <path fill-rule="evenodd" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
    </symbol>
  </svg>
</section>

</template>

<script>
import $ from 'jquery';
import 'fullcalendar/dist/gcal';
import 'fullcalendar';
import ButtonBook from '@/components/buttons/ButtonBook.vue';
import BookMeetingRoom from '@/views/BookMeetingRoom.vue';

export default {
  name: 'calendar',
  components: {
    ButtonBook,
    BookMeetingRoom
	},
  data() {
    return {
      buttonShow: true
    }
  },
  methods: {
    showBook() {
      this.$emit('showBook');  
    },
    saveEvent(data) {
      this.$store.commit('changeEvent', data);
    },
    removeEvent(value){
      this.$store.commit('removeEvent', value);
    }
  },
  computed: {
    event() {
      return this.$store.state.event;
    }
  },
  mounted() {
    let _this = this;
    $('#fullcalendar').fullCalendar({
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
      timeFormat: 'h(:mm)T',
      unselectAuto: false,
      header: {
        left: 'prev title next',
        center: '',
        right: ''
      },
      navLinks: false,
      selectable: true,
      selectHelper: true,
      googleCalendarApiKey: 'AIzaSyC-8JGRFhvrAw3gFAS4L7P3lMS0KaV9rJU',
      events: {
        googleCalendarId: '13g6skar8uf2s0um2kmushttnc@group.calendar.google.com'
      },
      eventClick(event){
        if (event.url) {
          return false;
        }
      },
      select(start, end) {
        let hours = Math.floor((end - start)/3600000);
        let eventData = {
          dateStart: start.format(),
          dateEnd: end.format(),
          duration: hours + 'h - ' + Math.abs((+end.format('m') - +start.format('m'))) + 'm',
        }
        _this.saveEvent(eventData);
        if(hours){
          _this.buttonShow = false;
        } else {
          _this.buttonShow = true;
        }
      },
      unselect() {
        _this.removeEvent('');
      }
    });
  }
};
</script>

<style lang="scss">
@import '../assets/scss/style.scss';
@import '../assets/scss/fullcalendar.scss';
#fullcalendar {
	width: 100%;
	border-radius: 4px;
	border: solid 3px rgba(80, 227, 194, 0.5);
  background-color: #000000;
}
.calendar {
	padding-left: 112px;
	width: 100%;
  color: $TEXT-COLOR;
  @media (max-width: 700px) {
    display: none;
  }
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
		padding: 4rem 0 5.6rem 0;
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
.erase-event {
  @extend %flex-row-c;
  align-items: center;
  margin-bottom: 1rem;
  cursor: pointer;
  &__wrapper {
    height: 18px;
    margin-bottom: 2rem;
  }
  &:hover {
    opacity: 0.9;
  }
  &__button {
    pointer-events: visible;
    background-color: transparent;
    outline: none;
    border: none;
    width: 18px;
    height: 18px;
    cursor: pointer;
    margin-right: 1rem;
  }
  &__img {
    fill: $TEXT-COLOR;
    width: 18px;
    height: 18px;
  }
  &__text {
    text-transform: uppercase;
    font-family: $base-font;
		font-size: 0.625rem;
		font-weight: bold;
		letter-spacing: 0.7px;
		text-align: left;
		color: $TEXT-COLOR;
  }
}
</style>
