<template>
<div class="book-meeting-room__wrapper">
	<logo class="book-meeting-room__logo"></logo>
	<booking-room-done :bookRoomData='bookRoomData' v-if='visible.bookingRoomDone' @edit='editName'></booking-room-done>
	<booking-room-done-mobile v-if='visible.bookingRoomDoneMobile'></booking-room-done-mobile>
	<div class="book-meeting-room" v-show='!visible.bookingRoomDone || !visible.bookingRoomDoneMobile' :style="onStyleAnimate" >
		<button-close-mini class="book-meeting-room__close" @click.native='goBack'></button-close-mini>
		<div class="book-meeting-room__button-back-wrapper">
			<button-back class="book-meeting-room__button-back" @click.native='goBack'></button-back>
			<p class="book-meeting-room__button-text" @click='goBack'>go back</p>
		</div>
		<h2 class="book-meeting-room__title">Meeting room<br>Reservation
		</h2>
		<form action="" id='book-meeting-room-form' name='book-meeting-room' class="book-meeting-room__form">
			<div class='book-meeting-room__time-wrapper'>
				<p class="book-meeting-room__date-label">Day</p>
				<p class="book-meeting-room__date-choice book-meeting-room__date-choice--day">{{ day }}</p>
				<p class="book-meeting-room__date-label book-meeting-room__date-label--time">Time</p>	
				<p class="book-meeting-room__date-choice book-meeting-room__date-choice--time">{{ duration }}</p>
				<button class="book-meeting-room__edit-date" @click.prevent='editDate'>
					<svg class="book-meeting-room__edit-icon">
						<use xlink:href='#icon-edit'/>
					</svg>
					<p class="book-meeting-room__edit-text">Back to Calendar</p>
				</button>
			</div>
			<div class="book-meeting-room__time-wrapper-mobile">
				<p class="book-meeting-room__date-label">Day</p>
				<label class="datepicker book-meeting-room__datepicker">
					<input type='date' class="datepicker__input" v-model='mobile.day'>
					<p class="datepicker__text">{{ mobileDay }}</p>
				</label>
				<p class="book-meeting-room__date-label book-meeting-room__date-label--time">Time</p>	
				<time-picker class="book-meeting-room__timepicker" @mobileTime='inboxTime' :day='mobile.day'></time-picker>
				<p class="book-meeting-room__mobile-duration">{{ durationMobile }}</p>
			</div>
			<div class="book-meeting-room__input-wrapper">
				<label for="book-meeting-name" class="book-meeting-room__label book-meeting-room__label--name">NAME</label>
				<input type="text" 
					autocomplete='on'
					id="book-meeting-name" 
					class="book-meeting-room__input book-meeting-room__input--name" 
					required 
					placeholder="Andrey Malishko"
					v-model.trim="bookRoomData.name"
					@blur="checkName"
					:class="{inputError: errors.name, greenBorder: !errors.name}">
				<transition 
					name="custom-classes-transition"
					enter-active-class="animated03 pullDown"
					leave-active-class="animated02 pullUp">
				<p class='book-meeting-room__validate book-meeting-room__validate--name' v-if="errors.name">Please enter {{ errors.name }} to continue</p>
				</transition>
				<label for="book-meeting-phone" class="book-meeting-room__label book-meeting-room__label--phone">PHONE</label>
				<input type="tel" 
					id='book-meeting-phone' 
					autocomplete='on'
					class="book-meeting-room__input book-meeting-room__input--phone" 
					required 
					placeholder="+38 (000) 000 00-00"
					v-model.trim="bookRoomData.phone"
					@blur="checkPhone"
					:class="{inputError: errors.phone, greenBorder: !errors.phone}">
				<transition 
					name="custom-classes-transition"
					enter-active-class="animated03 pullDown"
					leave-active-class="animated02 pullUp">
				<p class='book-meeting-room__validate book-meeting-room__validate--phone' v-if="errors.phone">Please enter {{ errors.phone }} to continue</p>
				</transition>
			</div>
			<label for="book-meeting-resident" class="book-meeting-room__resident-label">
				<input type="checkbox" 
				form='meeting-room-form' 
				id='book-meeting-resident' 
				class="book-meeting-room__resident-input" 
				value='checkResident' 
				v-model="bookRoomData.resident">
				<div class="book-meeting-room__resident-check">
					<svg class="book-meeting-room__resident-img">
						<use xlink:href='#icon-checkbox'/>
					</svg>
				</div>
				<p class="book-meeting-room__resident-text">I'm a Resident</p>
			</label>
		</form>
        <div class="book-meeting-room__check-frame" v-if='bookRoomData.resident'>
            <transition 
				appear
				name="custom-classes-transition"
				enter-active-class="animated pullDown"
				leave-active-class="animated02 pullUp">
            <div class="check-free-time__wrapper" v-if='visible.checkFrameIn'>
			<form id='check-free-time' class="check-free-time">
				<p class="check-free-time__text">Put your E-Mail for checking availability of free hours for Meeting Room's using
				</p>
				<input form='check-free-time' 
					type="email" 
					autocomplete='on'
					class="check-free-time__email" 
					placeholder="Email"
					:class="{inputError: errors.email, greenBorder: !errors.email}"
					@blur="checkEmail"
					v-model.trim="bookRoomData.email">
				<transition 
					name="custom-classes-transition"
					enter-active-class="animated03 pullDown"
					leave-active-class="animated02 pullUp">
				<p class='book-meeting-room__validate book-meeting-room__validate--email'  v-if="errors.email">Please enter {{ errors.email }} to continue</p>
				</transition>
				<button	class="check-free-time__button" 
					@click.prevent="checkResidentTime"
					:disabled='showCheck'>
					<p class="check-free-time__button-text">CHECK</p>
				</button>
			</form>
            </div>
            </transition>
			<button	class="check-free-time__button check-free-time__button--mobile" 
				v-if='visile.checkFrameIn'
				@click.prevent="checkResidentTime"
				:disabled='showCheck'>
				<p class="check-free-time__button-text">CHECK</p>
			</button>
            <transition 
				appear
				name="custom-classes-transition"
				enter-active-class="animated pullDown"
				leave-active-class="animated pullUp">
            <div class="resident-time-info__wrapper" v-if='visible.checkFrameOut'>
				<div class="resident-time-info">
					<p class="resident-time-info__title resident-time-info__title--name">Resident</p>
					<p class="resident-time-info__title resident-time-info__title--duration">Duration</p>
					<p class="resident-time-info__title resident-time-info__title--hours">Free Hours</p>
					<p class="resident-time-info__text resident-time-info__text--name">{{ bookRoomData.name }}</p>
					<p class="resident-time-info__text resident-time-info__text--duration">{{ checkFreeDuration }}</p>
					<p class="resident-time-info__text resident-time-info__text--hours"
						:class="{redText: !freeHours}">{{ freeHours? freeHours + 'h.': 'No More' }}</p>
				</div>
            </div>
            </transition>
        </div>
		<div class="book-meeting-room__apply-wrapper">
			<p class="booking-price book-meeting-room__price">Price:
				<span class="booking-price__sum book-meeting-room__sum">{{ price }}</span>
				<span class="booking-price__sum book-meeting-room__sum book-meeting-room__sum--mobile">{{ priceMobile }}</span>
			</p>
			<button-book class='book-meeting-room__book-button' :disabled='showSubmit' @click.native='visible.bookingRoomDone = true'></button-book>
			<button-book class='book-meeting-room__book-button-mobile' :disabled='showSubmitMobile' @click.native='visible.bookingRoomDoneMobile = true'></button-book>
			<button class="book-meeting-room__cancel" @click.prevent='goBack'>CANCEL</button>
		</div>
	</div>
    <svg style="display: none">
        <symbol id='icon-checkbox' viewBox="0 0 24 24">
			<path fill-rule="evenodd" d="M5 12.192l1.4-1.346 3.6 3.462L17.6 7 19 8.346 10 17z"/>
		</symbol> 
        <symbol id='icon-edit' viewBox="0 0 24 24">
			<path fill-rule="evenodd" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
		</symbol>
    </svg>
</div>
</template>

<script>
import http from 'axios';
import DatePicker from 'vue2-datepicker'
import ButtonCloseMini from '@/components/buttons/ButtonCloseMini.vue';
import ButtonBack from '@/components/buttons/ButtonBack.vue';
import ButtonBook from '@/components/buttons/ButtonBook.vue';
import BookingRoomDone from '@/views/BookingRoomDone.vue';
import BookingRoomDoneMobile from '@/views/BookingRoomDoneMobile.vue';
import Logo from '@/components/Logo.vue';
import TimePicker from '@/components/TimePicker'

export default {
	name: 'BookMeetingRoom',
	components: {
		ButtonBack,
		ButtonBook,
		Logo,
		ButtonCloseMini,
		BookingRoomDone,
		BookingRoomDoneMobile,
		DatePicker,
		TimePicker
	},
	data() {
		return {
			errors: {
				name: null,
				phone: null,
				email: null,
				arr: []
			},
			bookRoomData: {
				name: null,
				phone: null,
				email: null,
				resident: false
			},
			checkData: {
				name: null,
				phone: null,
				email: null
			},
			validStatus: {
				name: false,
				phone: false,
				email: false
			},
			mobile: {
				day: '',
				start: '',
				end: '',
			},
			visible: {
				checkFrameIn: false,
				checkFrameOut: false,
				bookCard: true,
				bookingRoomDone: false,
				bookingRoomDoneMobile: false
			},
			styleAnimate: {
				transform: 'translateX(-300%)',
				transition: 'transform ease-in-out 0.3s'
			},
			onStyleAnimate: null,
			freeHours: null,
		};
	},
	methods: {
		editName() {
			this.visible.bookingRoomDone = false;
			this.visible.bookCard = true;
		},
		editDate() {
			this.$emit("editDate");
		},
		goBack() {
			this.onStyleAnimate = this.styleAnimate;
			setTimeout(() => {
				this.$emit('goBack');
				setTimeout(()=>{
					this.onStyleAnimate = null;
				}, 500)
			}, 150);
		},
		checkResidentTime() {
			let params = JSON.stringify(this.checkData);
			http.post('https://jsonplaceholder.typicode.com/posts', params)
			.then(()=> {
				this.freeHours = false;
			})
			.catch(e => {
				this.errors.arr.push(e);
			});
			this.visible.checkFrameIn = false;
			setTimeout(()=> {
				this.visible.checkFrameOut = true;
			}, 200);
		},
		checkName() {
			if (this.bookRoomData.name && !this.validName(this.bookRoomData.name) && this.bookRoomData.phone) {
				this.errors.name = 'your name and surname';
			} else {
				this.errors.name = null;
			}
		},
		checkPhone() {
			if (this.bookRoomData.phone && !this.validPhone(this.bookRoomData.phone) && !this.validFormatPhone(this.bookRoomData.phone) && this.bookRoomData.name) {
				this.errors.phone = 'your phone';
			} else {
				this.errors.phone = null;
			}
		},
		checkEmail() {
			if (this.bookRoomData.email && !this.validEmail(this.bookRoomData.email) && this.bookRoomData.name && this.bookRoomData.phone) {
				this.errors.email = 'your e-mail';
			} else {
				this.errors.email = null;
			}
		},
		validEmail(email) {
			// eslint-disable-next-line
			let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,10}\.[0-9]{1,10}\.[0-9]{1,10}\.[0-9]{1,10}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,20}))$/;
			return re.test(email);
		},
		validPhone(phone) {
			// eslint-disable-next-line
			let re = /^((((\+?)+(3?)+8)?)0([0-9]){2})(([0-9]){3})(([0-9]){2})(([0-9]){2})$/;
			return re.test(phone);
		},
		validFormatPhone(phone) {
			let re = /^(\+38\s\(0(([0-9]){2})\)\s(([0-9]){3})\s(([0-9]){2})-(([0-9]){2}))$/;
			return re.test(phone);
		},
		validName(name) {
			// eslint-disable-next-line
			let re = /^([A-ZА-ЯА-ЩЬЮЯЇІЄҐ])+([a-zA-Zа-яА-Яа-щА-ЩЬьЮюЯяЇїІіЄєҐґ]{1,40})((\s?)([a-zA-Zа-яА-Яа-щА-ЩЬьЮюЯяЇїІіЄєҐґ]{1,40})){1,3}?$/;
			return re.test(name);
		},
		addDataToCheck() {
			this.checkData.name = this.bookRoomData.name;
			this.checkData.phone = this.bookRoomData.phone; 
			this.checkData.email = this.bookRoomData.email;
		},
		inboxTime(data) {
			this.mobile.start = data.start;
			this.mobile.end = data.end;
		}
	},
	computed: {
		mobileDay() {
			if(this.mobile.day) {
				let date = new Date(this.mobile.day);
				return `${date.toLocaleString("en-US", {day: '2-digit'})} ${date.toLocaleString("en-US", {month: 'long'})}, ${date.toLocaleString("en-US", {year: 'numeric'})}`;
			} else {
				return 'Select date';
			}
		},
		checkFreeDuration() {
			return new Date().getDate() + ' - ' + (+new Date().getDate() + 6) + ' ' + new Date().toLocaleString("en-US", {month: 'long'});
		},
		showCheck() {
			if (this.bookRoomData.name &&
			this.bookRoomData.phone &&
			this.bookRoomData.email &&
			this.validStatus.name &&
			this.validStatus.phone &&
			this.validStatus.email &&
			!this.errors.name &&
			!this.errors.phone &&
			!this.errors.email) {
				this.addDataToCheck();
				return false;
			} else {
				return true;
			}
		},
		formatNumber() {
			if(this.validPhone(this.bookRoomData.phone)) {
				let phone = this.bookRoomData.phone,
				lenPhone = phone.length,
				arr = phone.split('');
				if( lenPhone == 10 ){
					arr.splice(0,"", "+38 ");
					arr.splice(1,"", "(");
					arr.splice(5,"", ") ");
					arr.splice(9,"", " ");
					arr.splice(12,"", "-");
				} else if (lenPhone == 11) {
					arr.splice(0,"", "+3");
					arr.splice(2,"", " ");
					arr.splice(3,"", "(");
					arr.splice(7,"", ") ");
					arr.splice(11,"", " ");
					arr.splice(14,"", "-");
				} else if (lenPhone == 12) {
					arr.splice(0,"", "+");
					arr.splice(4,"", " ");
					arr.splice(5,"", "(");
					arr.splice(8,"", ") ");
					arr.splice(12,"", " ");
					arr.splice(15,"", "-");
				} else if (lenPhone == 13) {
					arr.splice(3,"", " ");
					arr.splice(4,"", "(");
					arr.splice(8,"", ") ");
					arr.splice(12,"", " ");
					arr.splice(15,"", "-");
				}
				return arr.join('');
			}
		},
		showSubmit() {
			if(this.bookRoomData.resident) {
				if (this.bookRoomData.name &&
				this.bookRoomData.phone &&
				this.bookRoomData.email &&
				this.freeHours &&
				this.validStatus.name &&
				this.validStatus.phone &&
				this.validStatus.email &&
				this.event &&
				!this.errors.name &&
				!this.errors.phone &&
				!this.errors.email) {
					return false;
				} else {
					return true;
				}
			} else {
				if(this.bookRoomData.name &&
				this.bookRoomData.phone &&
				this.event &&
				this.validStatus.name &&
				this.validStatus.phone &&
				!this.errors.name &&
				!this.errors.phone) {
					return false;
				} else {
					return true;
				}
			}
		},
		showSubmitMobile() {
			if(this.bookRoomData.resident) {
				if (this.bookRoomData.name &&
				this.bookRoomData.phone &&
				this.bookRoomData.email &&
				this.freeHours &&
				this.validStatus.name &&
				this.validStatus.phone &&
				this.validStatus.email &&
				this.mobile.day &&
				this.mobile.start &&
				this.mobile.end &&
				!this.errors.name &&
				!this.errors.phone &&
				!this.errors.email) {
					return false;
				} else {
					return true;
				}
			} else {
				if(this.bookRoomData.name &&
				this.bookRoomData.phone &&
				this.mobile.day &&
				this.mobile.start &&
				this.mobile.end &&
				this.validStatus.name &&
				this.validStatus.phone &&
				!this.errors.name &&
				!this.errors.phone) {
					return false;
				} else {
					return true;
				}
			}
		},
		event() {
			return this.$store.state.event;
		},
		day() {
			if (this.event.dateStart) {
				let date = new Date(this.event.dateStart);
				return `${date.toLocaleString("en-US", {day: '2-digit'})} ${date.toLocaleString("en-US", {month: 'long'})}, ${date.toLocaleString("en-US", {year: 'numeric'})}`;
			} 
			return '';
		},
		start() {
			if (this.event.dateStart) {
				let date = new Date(this.event.dateStart);
				return `${date.getHours()}:${date.getMinutes()=='0'?'00':date.getMinutes()}`;
			} 
			return '';
		},
		end() {
			if (this.event.dateEnd) {
				let date = new Date(this.event.dateEnd);
				return `${date.getHours()}:${date.getMinutes()=='0'?'00':date.getMinutes()}`;
			} 
			return '';
		},
		price() {
			if(this.event.duration) {
				let time = (new Date(this.event.dateEnd) - new Date(this.event.dateStart))/3600000;
				let hours = Math.ceil(time);
				let cash = this.$store.state.price.hour;
				return +hours * +cash;
			} else {
				return '';
			}
		},
		priceMobile() {
			if(this.durationMobile) {
				let startHours = +this.mobile.start.slice(0, 2),
					startMinutes = +this.mobile.start.slice(3, 5),
					endHours = +this.mobile.end.slice(0, 2),
					endMinutes = +this.mobile.end.slice(3, 5),
					hours = Math.ceil(+`${endHours}.${endMinutes}` - +`${startHours}.${startMinutes}`);
				let cash = this.$store.state.price.hour;
				return +hours * +cash;
			} else {
				return '';
			}
		},
		duration() {
			if(this.event.duration) {
				return `${this.start} - ${this.end} (${this.event.duration})`;
			} else {
				return '';
			}
		},
		durationMobile() {
			if(this.mobile.day && this.mobile.start && this.mobile.end) {
				let startHours = +this.mobile.start.slice(0, 2),
					startMinutes = +this.mobile.start.slice(3, 5),
					endHours = +this.mobile.end.slice(0, 2),
					endMinutes = +this.mobile.end.slice(3, 5),
					hours = Math.floor(+`${endHours}.${endMinutes}` - +`${startHours}.${startMinutes}`),
					minutes = Math.abs(endMinutes - startMinutes);
				return `(${hours}h${minutes?' ' + minutes + 'm':''})`;
			} else {
				return '';
			}
		}
	},
	watch: {
		'bookRoomData.resident': function() {
			this.visible.checkFrameIn = true;
			this.visible.checkFrameOut = false;
		},
		'bookRoomData.name'() {
			if (this.bookRoomData.name && this.validName(this.bookRoomData.name)) {
				this.errors.name = null;
				this.validStatus.name = true;
			} else {
				this.validStatus.name = false;
			}
		},
		'bookRoomData.phone'() {
			if (this.bookRoomData.phone && (this.validPhone(this.bookRoomData.phone) || this.validFormatPhone(this.bookRoomData.phone))) {
				if(!this.validFormatPhone(this.bookRoomData.phone)) {
					this.bookRoomData.phone = this.formatNumber;
				}
				this.errors.phone = null
				this.validStatus.phone = true;
			} else {
				this.validStatus.phone = false;
			}
		},
		'bookRoomData.email'() {
			if (this.bookRoomData.email && this.validEmail(this.bookRoomData.email)) {
				this.errors.email = null
				this.validStatus.email = true;
			} else {
				this.validStatus.email = false;
			}
		}
	}
};
</script>

<style lang="scss">
@import '../assets/scss/style.scss';

.redText {
	color: $ERROR-COLOR !important;
}
.greenBorder {
	border: 2px solid $MAIN-DARK-COLOR !important;
	&:active {
		border: 2px solid $GREEN !important;
		outline: none;
	}
	&:focus {
		outline: none;
		border: 2px solid $GREEN !important;
	}
}


.book-meeting-room {
	flex: 0 0 35%;
	display: grid;
	grid-template-rows: repeat(5, auto);
	align-items: center;
	will-change: height;
	transition: height ease-in-out 0.3s;
	position: relative;
	animation-name: fadeInBubble;
	animation-duration: 0.6s;
	animation-timing-function: ease-in-out;
	@media (min-width: 600px) {
		min-width: 430px;
	}
	@media (max-width: 600px) {
		padding: 0;
		flex: 0 0 100%;
		align-self: flex-start;
	}
	&__wrapper {
		padding: 3rem;
		background-color: $MAIN-DARK-COLOR;
		z-index: 1000;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		width: 100%;
		min-height: 100vh;
		@extend %flex-row-c;
		align-items: center;
		@media (max-width: 600px) {
			padding: 32pt;
		}
		@media (max-width: 320px) {
			padding: 24pt;
		}
	}
	&__logo {
		@media (max-width: 600px) {
			display: none;
		}
	}
	&__close {
		right: 0;
		top: 5px;
		animation-name: fadeIn;
		animation-duration: 0.2s;
		animation-timing-function: ease-in-out;
		@media (max-width: 600px) {
			display: none;
		}
	}
	&__button-back-wrapper {
		align-self: start;
		border-bottom: 1px solid $MIDDLE-GREY;
		@extend %flex-row;
		align-items: center;
		padding-bottom: 1.8rem;
		@media (max-width: 600px) {
			padding: 0;
			margin-bottom: 20pt;
			border: none;
		}
	}
	&__button-text {
		text-transform: uppercase;
		font-family: $base-font;
		font-size: 0.625rem;
		font-weight: bold;
		letter-spacing: 0.7px;
		text-align: left;
		color: $GREY;
		padding-left: 1rem;
		@media (max-width: 600px) {
			font-size: 0.8rem;
			font-weight: 700;
		}
	}
	&__title {
		padding: 1.2rem 0 1.8rem 0;
		font-family: $title-font;
		font-size: 2.5rem;
		font-weight: 500;
		text-align: left;
		color: $TEXT-COLOR;
		@media (max-width: 600px) {
			font-size: 2.4rem;
			white-space: normal;
			padding: 0;
			margin-bottom: 20pt;
		}
	}
	&__form {
		padding: 1.8rem 0 1rem 0;
		display: grid;
		grid-template-rows: repeat(2, auto) 1rem;
		width: 100%;
		grid-template-areas:
			'time 		   '
			'input-wrapper '
			'check 		   ';
		border-top: 1px solid $MIDDLE-GREY-OPACITY;
		grid-row-gap: 4px;
		align-items: center;
		justify-items: start;
		justify-content: start;
		@media (max-width: 700px) {
			justify-content: stretch;
		}
		@media (max-width: 600px) {
			grid-template-rows: repeat(2, auto) 2rem;
			grid-row-gap: 10pt;
			justify-items: stretch;
			border: none;
			padding: 0 0 20pt 0;
			width: 100%;
		}
	}
	&__time-wrapper {
		display: grid;
		grid-area: time;
		grid-template-rows: repeat(2, auto);
		grid-template-columns: 1fr 2fr 1fr;
		grid-column-gap: 1rem;
		grid-template-areas:
			'day 	       time 	     .'
			'day-input     time-input    edit';
			@media (max-width: 700px) {
				display: none;
			}
	}
	&__date-label {
		grid-area: day;
		font-family: $base-font;
		font-size: 0.625rem;
		font-weight: 500;
		text-align: left;
		color: $GREY;
		@media (max-width: 600px) {
			text-transform: uppercase;
			color: $TEXT-COLOR;
			font-weight: 500;
			font-size: 0.7rem;
			letter-spacing: 0.4pt;
		}
		@media (max-width: 375px) {
			font-size: 0.65rem;
		}
		&--time {
			grid-area: time;
		}
		&--picker {
			padding: 0 2px;
		}
	}
	&__date-choice {
		grid-area: day-input;
		width: auto;
		height: auto;
		background-color: transparent;
		font-family: $base-font;
		font-size: 0.8125rem;
		font-weight: 500;
		line-height: 2;
		text-align: left;
		color: $TEXT-COLOR;
		outline: none;
		border: none;
		white-space: nowrap;
		&--time {
			grid-area: time-input;
		}
	}

	&__edit-date {
		grid-area: edit;
		@extend %flex-row-fs;
		align-items: center;
		outline: none;
		border: none;
		flex-wrap: nowrap;
		background-color: transparent;
		justify-self: end;
	}
	&__edit-icon {
		width: 12px;
		height: 12px;
		fill: $MERGE-MAIN-COLOR;
		margin-right: 4px;
	}
	&__edit-text {
		text-transform: uppercase;
		font-family: $base-font;
		font-size: 0.625rem;
		font-weight: bold;
		letter-spacing: 0.7px;
		text-align: left;
		color: $MERGE-MAIN-COLOR;
		white-space: nowrap;
	}
	&__input-wrapper {
		padding: 1.5rem 0 0.5rem 0;
		justify-items: start;
		justify-self: stretch;
		grid-area: input-wrapper;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: repeat(3, auto);
		grid-template-areas:
			'label-name label-phone'
			'input-name input-phone'
			'error-name error-phone';
		grid-column-gap: 1.5rem;
		grid-row-gap: 0.6875rem;
		@media (max-width: 480px) {
			padding: 0;
			width: 100%;
			grid-template-columns: none;
			grid-template-rows: repeat(6, auto);
			grid-template-areas:
				'label-name '
				'input-name '
				'error-name'
				'label-phone'
				'input-phone'
				'error-phone';
		}
	}
	&__validate {
		font-family: $base-font;
		font-size: 0.625rem;
		font-weight: 500;
		text-align: left;
		color: $ERROR-COLOR;
		padding-bottom: 0.5rem;
		&--name {
			grid-area: error-name;
		}
		&--phone {
			grid-area: error-phone;
		}
		&--email {
			grid-column: 1;
			grid-row: 3;
			padding-bottom: 1.5rem;
		}
	}
	&__label {
		align-items: stretch;
		font-family: $base-font;
		font-size: 0.5rem;
		font-weight: bold;
		text-align: left;
		color: $TEXT-COLOR;
		@media (max-width: 600px) {
			font-weight: 500;
			font-size: 0.7rem;
			letter-spacing: 0.4pt;
		}
		@media (max-width: 375px) {
			font-size: 0.65rem;
		}
		&--name {
			grid-area: label-name;
		}
		&--phone {
			grid-area: label-phone;
		}
	}
	&__input {
		border-radius: 4px;
		width: 101%;
		border: none;
		outline: none;
		background-color: $BUTTON-COLOR;
		font-family: $base-font;
		font-size: 0.625rem;
		font-weight: 500;
		text-align: left;
		color: $TEXT-COLOR;
		transition: border-color ease-in-out 0.1s;
		border: 2px solid $MAIN-DARK-COLOR;
		box-shadow: none;
		position: relative;
		padding: 12px 16px;
		left: -2px;
		@media (max-width: 480px) {
			font-size: 1rem;
			font-weight: 400;
			line-height: 1;
		}
		&:-webkit-autofill,
		&:-webkit-autofill:hover,
		&:-webkit-autofill:focus,
		&:-webkit-autofill:active {
			animation-name: autofill;
			animation-fill-mode: both;
		}
		&:active {
			background-color: $BUTTON-COLOR;
			outline: none;
			border: 2px solid $MAIN-DARK-COLOR;
		}
		&:focus {
			outline: none;
			background-color: $BUTTON-COLOR;
			border: 2px solid $MAIN-DARK-COLOR;
			outline: none; 
		}
		&:disabled {
			background-color: $BLACK;
		}
		&:disabled &::placeholder {
			color: $MIDDLE-GREY;
		}
		&--name {
			grid-area: input-name;
		}
		&--phone {
			grid-area: input-phone;
		}
		&::placeholder {
			color: $GREY;
			font-size: 10px;
			font-weight: 500;
			font-family: $base-font;
			line-height: 1;
			@media (max-width: 480px) {
				padding-top: 2pt;
				font-size: 1rem;
				line-height: 1;
				font-weight: 400;
			}
		}
	}
	&__resident-label {
		position: relative;
		grid-area: check;
		display: grid;
		grid-template-columns: 16px auto;
		grid-column-gap: 0.75rem;
		align-items: center;
		cursor: pointer;
		@media (max-width: 600px) {
			grid-template-columns: 32px auto;
		}
		@media (max-width: 480px) {
			justify-self: end;
			grid-template-columns: auto 32px;
		}
	}
	&__resident-text {
		grid-column: 2;
		font-family: $base-font;
		font-size: 0.625rem;
		font-weight: 500;
		text-align: left;
		color: $GREY;
		@media (max-width: 600px) {
			font-size: 0.75rem;
			line-height: 1;
			margin-top: 2px;
			color: $TEXT-COLOR;
			text-transform: uppercase;
			letter-spacing: 0.4pt;
		}
		@media (max-width: 480px) {
			grid-column: 1;
		}
	}
	&__resident-input {
		position: absolute;
		top: 4px;
		z-index: -10;
		outline: none;
		border: none;
		visibility: hidden;
		opacity: 0;
	}
	&__resident-check {
		width: 16px;
		height: 16px;
		border-radius: 3px;
		background-color: $DARK-GREY;
		border: solid 1px $MIDDLE-GREY;
		position: absolute;
		display: flex;
		flex-flow: column;
		justify-content: center;
		align-items: center;
		@media (max-width: 600px) {
			width: 28px;
			height: 28px;
		}
		@media (max-width: 480px) {
			width: 30px;
			height: 30px;
			grid-column: 2;
		}
	}
	&__resident-img {
		opacity: 0;
		fill: $MERGE-MAIN-COLOR;
		width: 100%;
		height: 100%;
	}
	&__resident-input:checked + &__resident-check {
		border-color: aquamarine;
		transition: ease-in-out 0.2s border-color;
		@media (max-width: 480px) {
			background-color: $MAIN-DARK-COLOR;
		}
	}
	&__resident-input:not(:checked) + &__resident-check {
		transition: ease-in-out 0.2s border-color;
	}
	&__resident-input:checked + &__resident-check &__resident-img {
		opacity: 1;
		transition: opacity ease-in-out 0.2s;
	}
	&__resident-input:not(:checked) + &__resident-check &__resident-img {
		transition: opacity ease-in-out 0.2s;
	}
	&__apply-wrapper {
		padding-top: 1.2rem;
		border-top: 1px solid $MIDDLE-GREY-OPACITY;
		@extend %flex-row-sb;
		align-items: center;
		@media (max-width: 480px) {
			padding-top: 20pt;
			border-color: $GREY;
			flex-direction: column;
			justify-content: flex-start;
			align-items: flex-start;
		}
	}
	&__book-button {
		@media (max-width: 480px) {
			display: none;
		}
	}
	&__book-button-mobile {
		display: none;
		@media (max-width: 480px) {
			display: flex;
			margin-bottom: 16pt;
			width: 100%;
		}
	}
	&__price {
		@media (max-width: 480px) {
			font-size: 1rem;
			letter-spacing: 0.3pt;
			font-weight: 400;
			margin-bottom: 20pt;
			span {
				padding: 0 6pt;
				font-size: 3rem;
				line-height: 1;
				&::after {
					padding-left: 6pt;
					font-size: 0.7rem;
				}
			}
		}
	}
	&__sum {
		@media (max-width: 700px) {
			display: none;
		}
		&--mobile {
			display: none;
			@media (max-width: 700px) {
				display: inline-block;
			}
		}
	}
	&__check-frame {
		padding-bottom: 2rem;
		transform-origin: 50% 0%;
		@media (max-width: 480px) {
			padding-bottom: 20pt;
		}
	}
	&__cancel {
		padding: 1rem 2rem;
		width: 100%;
		font-family: $base-font;
		font-size: 10pt;
		text-transform: uppercase;
		font-weight: bold;
		text-align: center;
		outline: none;
		border: none;
		color: $GREY;
		background-color: transparent;
		align-self: center;
		letter-spacing: 0.6pt;
		display: none;
		@media (max-width: 480px) {
			display: block;
		}
	}
	&__time-wrapper-mobile {
		grid-area: time;
		width: 100%;
		display: none;
		grid-template-rows: repeat(3, auto);
		grid-template-columns: 56% 40%;
		grid-column-gap: 4%;
		grid-row-gap: 8pt;
		grid-template-areas:
			'day 	       time'
			'day-input     time-input'
			'.  	       duration';
		@media (max-width: 700px) {
			display: grid;
			flex-direction: row;
		}
	}
	&__mobile-duration {
		grid-area: duration;
		justify-self: end;
		font-family: $base-font;
		font-weight: 300;
		font-size: 0.85rem;
		color: $TEXT-COLOR;
		padding-right: 4px;
	}
	&__timepicker {
		grid-area: time-input;
	}
	&__datepicker {
		grid-area: day-input;
	}
}
.check-free-time {
	position: relative;
	background-color: black;
	padding: 1rem 0 0 1.1rem;
	display: grid;
	transform: scaleX(1.04);
	transform-origin: right center;
	grid-template-rows: repeat(3, auto);
	grid-template-columns: repeat(2, 1fr);
	grid-column-gap: 1.5rem;
	grid-row-gap: 1.25rem;
	align-items: center;
	justify-items: start;
	border-radius: 3px;
	@media (max-width: 600px) {
		grid-column-gap: 2rem;
		grid-template-columns: 2fr 1fr;
		padding-right: 1rem;
		justify-items: stretch;
	}
	@media (max-width: 480px) {
		transform-origin: center center;
		transform: scaleX(1.1);
		padding-bottom: 0.5rem;
		margin-bottom: 16pt;
		grid-row-gap: 0.5rem;
	}
	&::before {
		top: -10px;
		left: 1.2rem;
		border: solid transparent;
		content: '';
		height: 0;
		width: 0;
		position: absolute;
		pointer-events: none;
		border-color: transparent;
		border-bottom-color: black;
		border-width: 5px;
		animation-name: pullDown;
		animation-duration: 0.5s;
		animation-timing-function: ease-in-out;
		animation-delay: 1s;
		transform-origin: 50% 100%;
		@media (max-width: 480px) {
			left: auto;
			right: 1.6rem;
		}
	}
	&__text {
		grid-column: 1 / 3;
		color: $TEXT-COLOR;
		font-family: $base-font;
		font-size: 0.625rem;
		font-weight: 500;
		line-height: 1.6;
		text-align: left;
		padding-right: 0.5rem;
		@media (max-width: 480px) {
			font-size: 0.75rem;
			font-weight: 400;
			letter-spacing: 0.3pt;
			line-height: 2;
		}
	}
	&__email {
		width: 100%;
		padding: 12px 16px;
		align-items: stretch;
		border-radius: 4px;
		width: 100%;
		border: none;
		outline: none;
		background-color: $BUTTON-COLOR;
		font-family: $base-font;
		font-size: 0.625rem;
		font-weight: 500;
		text-align: left;
		color: $TEXT-COLOR;
		@media (max-width: 480px) {
			font-size: 11pt;
			font-weight: 400;
			line-height: 1;
			grid-column: 1 / 3;
		}
		&::placeholder {
			color: $GREY;
			font-size: 10px;
			font-weight: 500;
			font-family: $base-font;
			line-height: 1;
			@media (max-width: 480px) {
				padding-top: 2pt;
				font-size: 11pt;
				line-height: 1;
				font-weight: 400;
			}
		}
	}
	&__button {
		padding: 12px 2rem;
		background-color: $BUTTON-COLOR;
		border-radius: 3px;
		outline: none;
		border: none;
		@extend %flex-row-c;
		align-items: center;
		position: relative;
		z-index: 2;
		transition: background-color ease-in-out 0.1s;
		@media (max-width: 480px) {
			display: none;
		}
		&:active .check-free-time__button-text {
			color: $LIGHT-GREY;
		}
		&:focus .check-free-time__button-text::before {
			visibility: visible;
		}
		&:disabled {
			background-color: $BUTTON-COLOR;
			@media (max-width: 480px) {
				background-color: $BLACK;
			}
		}
		&:disabled &-text {
			color: $MIDDLE-GREY;
		}
		&--mobile {
			display: none;
			@media (max-width: 480px) {
				width: 100%;
				display: flex;
			}
		}
	}
	&__button-text {
		font-family: $base-font;
		font-size: 0.625rem;
		font-weight: 600;
		line-height: 1.5;
		letter-spacing: 0.7px;
		color: $TEXT-COLOR;
		text-transform: uppercase;
		transition: color ease-in-out 0.1s;
		&::before {
			position: absolute;
			content: '';
			background-color: transparent;
			left: -2px;
			right: -2px;
			top: -2px;
			bottom: -2px;
			border: 1px solid $LIGHT-GREY;
			border-radius: 4px;
			transition: border ease-in-out 0.2s;
			z-index: 0;
			visibility: hidden;
		}
		@media (max-width: 480px) {
			font-size: 0.75rem;
			font-weight: 600;
		}
	}
}
.resident-time-info {
	position: relative;
	background-color: black;
	border-radius: 3px;
	transform: scaleX(1.04);
	transform-origin: right center;
	padding: 1rem 0 0.7rem 1.1rem;
	display: grid;
	grid-template-rows: repeat(2, auto);
	grid-template-columns: repeat(3, 1fr);
	grid-row-gap: 0.4rem;
	align-items: center;
	justify-items: start;
	@media (max-width: 600px) {
		padding-right: 1rem;
	}
	@media (max-width: 480px) {
		padding: 16pt 20pt;
		grid-template-rows: repeat(3, auto);
		grid-template-columns: 45% 55%;
		transform-origin: center center;
		transform: scaleX(1.1);
		grid-row-gap: 0.3rem;
	}
	&::before {
		top: -10px;
		left: 1.2rem;
		border: solid transparent;
		content: '';
		height: 0;
		width: 0;
		position: absolute;
		pointer-events: none;
		border-color: transparent;
		border-bottom-color: black;
		border-width: 5px;
		animation-name: pullDown;
		animation-duration: 0.5s;
		animation-timing-function: ease-in-out;
		animation-delay: 1s;
		transform-origin: 50% 100%;
		@media (max-width: 480px) {
			left: auto;
			right: 1.6rem;
		}
	}
	&__title {
		font-family: $base-font;
		font-size: 0.625rem;
		font-weight: 500;
		text-align: left;
		color: $GREY;
		&--name {
			@media (max-width: 480px) {
				grid-area: 1 / 1 / 2 / 2;
			}
		}
		&--duration {
			@media (max-width: 480px) {
				grid-area: 2 / 1 / 2 / 2;
			}
		}
		&--hours {
			@media (max-width: 480px) {
				grid-area: 3 / 1 / 4 / 2;
			}
		}
	}
	&__text {
		font-family: $base-font;
		font-size: 0.8125rem;
		font-weight: 500;
		line-height: 2;
		text-align: left;
		color: $TEXT-COLOR;
		&--name {
			@media (max-width: 480px) {
				grid-area: 1 / 2 / 2 / 3;
			}
		}
		&--duration {
			@media (max-width: 480px) {
				grid-area: 2 / 2 / 3 / 3;
			}
		}
		&--hours {
			@media (max-width: 480px) {
				grid-area: 3 / 2 / 4 / 3;
			}
		}
		&--red {
			color: red;
		}
	}
}
.datepicker {
	position: relative;
	width: 100%;
	@extend %flex-row;
	align-items: center;
	border-radius: 3px;
	background-color: $BUTTON-COLOR;
	padding: 1rem 1rem;
	z-index: 10;
	@media (max-width: 375px) {
		padding: 1.094rem 1rem;
	}
	@media (max-width: 320px) {
		padding: 1.157rem 1rem;
	}
	&__input {
		position: absolute;
		width: 100%;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		opacity: 0;
		z-index: -10;
		&::-webkit-calendar-picker-indicator {
			background-color: transparent;
			color: transparent;
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			width: auto;
			height: auto;
			z-index: 20;
		}
	}
	&__text {
		color: $TEXT-COLOR;
		font-family: $base-font;
		line-height: 1;
		font-size: 0.95rem;
		pointer-events: none;
		@media (max-width: 375px) {
			font-size: 0.80rem;
		}
		@media (max-width: 320px) {
			font-size: 0.68rem;
		}
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
			pointer-events: none;
			@media (max-width: 375px) {
				top: 44%;
				right: 0.3rem;
			}
			@media (max-width: 320px) {
				border-width: 5px;
				right: 0.25rem;
			}
		}
	}
}
</style>
