<template>
<div class="book-meeting-room__wrapper">
	<logo></logo>
	<booking-room-done :bookRoomData='bookRoomData' v-show='bookingRoomDone' @edit='editName'></booking-room-done>
	<div class="book-meeting-room" v-show='!bookingRoomDone' :style="onStyleAnimate" >
		<button-close-mini class="book-meeting-room__close" @click.native='goBack'></button-close-mini>
		<div class="book-meeting-room__button-back-wrapper">
			<button-back class="book-meeting-room__button-back" @click.native='goBack'></button-back>
			<p class="book-meeting-room__button-text">go back</p>
		</div>
		<h2 class="book-meeting-room__title">Meeting Room<br>Reservation
		</h2>
		<form action="" id='book-meeting-room-form' name='book-meeting-room' class="book-meeting-room__form">
			<p class="book-meeting-room__date-label">Day</p>
			<p class="book-meeting-room__date-choice book-meeting-room__date-choice--day">{{ day }}</p>
			<p class="book-meeting-room__date-label book-meeting-room__date-label--time">Time</p>	
			<p class="book-meeting-room__date-choice book-meeting-room__date-choice--time">{{ duration }}</p>
			<button class="book-meeting-room__edit-date" @click.prevent='editDate'>
				<svg class="book-meeting-room__edit-icon">
					<use xlink:href='#icon-edit'/>
				</svg>
				<p class="book-meeting-room__edit-text">edit</p>
			</button>
			<div class="book-meeting-room__input-wrapper">
				<label for="book-meeting-name" class="book-meeting-room__label book-meeting-room__label--name">NAME</label>
				<input type="text" 
					autocomplete='on'
					id="book-meeting-name" 
					class="book-meeting-room__input book-meeting-room__input--name" 
					required 
					placeholder="Andrey Malishko"
					v-model.trim="bookRoomData.name"
					:class="{inputError: errors.name, greenBorder: !errors.name}"
					@blur="checkName">
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
					:class="{inputError: errors.phone, greenBorder: !errors.phone}"
					@blur="checkPhone">
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
            <div class="check-free-time__wrapper" v-show='checkFrameIn'>
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
            <transition 
				appear
				name="custom-classes-transition"
				enter-active-class="animated pullDown"
				leave-active-class="animated pullUp">
            <div class="resident-time-info__wrapper" v-show='checkFrameOut'>
				<div class="resident-time-info">
					<p class="resident-time-info__title">Resident</p>
					<p class="resident-time-info__title">Duration</p>
					<p class="resident-time-info__title">Count of Free Hours</p>
					<p class="resident-time-info__text">({{ bookRoomData.name }})</p>
					<p class="resident-time-info__text">{{ checkFreeDuration }}</p>
					<p class="resident-time-info__text"
						:class="{redText: !freeHours}">{{ freeHours? freeHours + 'h.': 'No More' }}</p>
				</div>
            </div>
            </transition>
        </div>
		<div class="book-meeting-room__apply-wrapper">
			<p class="booking-price book-meeting-room__price">Price:
				<span class="booking-price__sum">{{ price }}</span>
			</p>
			<button-book :disabled='showSubmit' @click.native='bookingRoomDone = true'></button-book>
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
import ButtonCloseMini from '@/components/buttons/ButtonCloseMini.vue';
import ButtonBack from '@/components/buttons/ButtonBack.vue';
import ButtonBook from '@/components/buttons/ButtonBook.vue';
import BookingRoomDone from '@/views/BookingRoomDone.vue';
import Logo from '@/components/Logo.vue';

export default {
	name: 'BookMeetingRoom',
	components: {
		ButtonBack,
		ButtonBook,
		Logo,
		ButtonCloseMini,
		BookingRoomDone
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
				resident: false,
				day: null,
				start: null,
				end: null,
				duration: null,
				price: null
			},
			checkData: {
				name: null,
				phone: null,
				email: null
			},
			freeHours: null,
			validStatus: {
				name: false,
				phone: false,
				email: false
			},
			checkFrameIn: false,
			checkFrameOut: false,
			styleAnimate: {
				transform: 'translateX(-300%)',
				transition: 'transform ease-in-out 0.3s'
			},
			onStyleAnimate: null,
			bookCard: true,
			bookingRoomDone: false
		};
	},
	methods: {
		editName() {
			this.bookingRoomDone = false;
			this.bookCard = true;
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
			this.checkFrameIn = false;
			setTimeout(()=> {
				this.checkFrameOut = true;
			}, 200);
		},
		checkName() {
			if (!this.bookRoomData.name) {
				this.errors.name = 'your name and surname';
			} else if (!this.validName(this.bookRoomData.name)) {
				this.errors.name = 'correct name and surname';
			} else {
				this.errors.name = null;
			}
		},
		checkPhone() {
			if (!this.bookRoomData.phone) {
				this.errors.phone = 'your phone';
			} else if (!this.validPhone(this.bookRoomData.phone)) {
				this.errors.phone = 'correct phone';
			} else {
				this.errors.phone = null;
			}
		},
		checkEmail() {
			if (!this.bookRoomData.email) {
				this.errors.email = 'your e-mail';
			} else if (!this.validEmail(this.bookRoomData.email)) {
				this.errors.email = 'correct e-mail';
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
			let re = /^((((\+?)+(3?)+8)?)+(((\(|\-)?)+0+([0-9]){2}(\)|\-)?)+(\-?)+(([0-9]){3})+(\-?)+(([0-9]){2})+(\-?)+(([0-9]){2}))$/;
			return re.test(phone);
		},
		validName(name) {
			// eslint-disable-next-line
			let re = /^((([A-ZА-ЯА-ЩЬЮЯЇІЄҐ])+([a-zA-Zа-яА-Яа-щА-ЩЬьЮюЯяЇїІіЄєҐґ]{1,30}))+\s+(([A-ZА-ЯА-ЩЬЮЯЇІЄҐ])+([a-zA-Zа-яА-Яа-щА-ЩЬьЮюЯяЇїІіЄєҐґ]){1,30}))$/;
			return re.test(name);
		},
		addDataToCheck() {
			this.checkData.name = this.bookRoomData.name;
			this.checkData.phone = this.bookRoomData.phone; 
			this.checkData.email = this.bookRoomData.email;
		}
	},
	computed: {
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
		showSubmit() {
			if(this.bookRoomData.resident) {
				if (this.bookRoomData.name &&
				this.bookRoomData.phone &&
				this.bookRoomData.email &&
				this.freeHours &&
				this.validStatus.name &&
				this.validStatus.phone &&
				this.validStatus.email &&
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
				return this.bookRoomData.day = `${date.toLocaleString("en-US", {day: '2-digit'})} of ${date.toLocaleString("en-US", {month: 'long'})}, ${date.toLocaleString("en-US", {year: 'numeric'})}`;
			} 
			return '';
		},
		start() {
			if (this.event.dateStart) {
				let date = new Date(this.event.dateStart);
				return this.bookRoomData.start = `${date.getHours()}:${date.getMinutes()=='0'?'00':date.getMinutes()}`
			} 
			return '';
		},
		end() {
			if (this.event.dateEnd) {
				let date = new Date(this.event.dateEnd);
				return this.bookRoomData.end = `${date.getHours()}:${date.getMinutes()=='0'?'00':date.getMinutes()}`
			} 
			return '';
		},
		price() {
			if(this.event.duration) {
				let time = (new Date(this.event.dateEnd) - new Date(this.event.dateStart))/3600000;
				let hours = Math.ceil(time);
				let cash = this.$store.state.price.hour;
				return this.bookRoomData.price = +hours * +cash;
			} else {
				return '';
			}
		},
		duration() {
			if(this.event.duration) {
				return this.bookRoomData.duration = `${this.start} - ${this.end} (${this.event.duration})`;
			} else {
				return '';
			}
		}
	},
	watch: {
		'bookRoomData.resident': function() {
			this.checkFrameIn = true;
			this.checkFrameOut = false;
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
			if (this.bookRoomData.phone && this.validPhone(this.bookRoomData.phone)) {
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
.ui-timepicker-wrapper {
	background-color: $MAIN-DARK-COLOR;
	border: none;
	.ui-timepicker-am {
		font-family: $base-font;
		color: $TEXT-COLOR;
		transition: color ease-in-out 0.1s;
		&:hover {
			background-color: transparent;
			color: $GREY;
		}
		
	}
	.ui-timepicker-am.ui-timepicker-selected {
		background-color: transparent;
		color:$MERGE-MAIN-COLOR;
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
			padding: 3rem 1rem;
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
	&__picker {
		grid-area: picker;
		@extend %flex-row;
		align-items: center;
	}
	&__picker-time {
		outline: none;
		height: auto;
		width: 5rem;
		border: none;
		text-align: center;
		background-color: transparent;
		color: $TEXT-COLOR;
		font-family: $base-font;
		cursor: pointer;
	}
	&__picker-date {
		outline: none;
		background-color: transparent;
		border: none;
		height: auto;
		width: 6rem;
		color: $TEXT-COLOR;
		font-family: $base-font;
		cursor: pointer;
		margin-right: 1rem;
	}
	&__button-back-wrapper {
		align-self: start;
		border-bottom: 1px solid $MIDDLE-GREY;
		@extend %flex-row;
		align-items: center;
		padding-bottom: 1.8rem;
		@media (max-width: 600px) {
			justify-content: center;
			padding: 2rem 0;
		}
	}
	&__button-back {
		margin-right: 1rem;
	}
	&__button-text {
		text-transform: uppercase;
		font-family: $base-font;
		font-size: 0.625rem;
		font-weight: bold;
		letter-spacing: 0.7px;
		text-align: left;
		color: $GREY;
	}
	&__title {
		padding: 1.2rem 0 1.8rem 0;
		font-family: $title-font;
		font-size: 2.5rem;
		font-weight: 500;
		text-align: left;
		color: $TEXT-COLOR;
		@media (max-width: 600px) {
			white-space: normal;
			text-align: center;
		}
	}
	&__form {
		padding: 1.8rem 0 1rem 0;
		display: grid;
		grid-template-rows: repeat(5, auto);
		grid-template-columns: 1fr 2fr 1fr;
		grid-column-gap: 1rem;
		grid-template-areas:
			'day 	       time 	     .'
			'day-input     time-input    edit'
			'picker 	   picker 		 picker'
			'input-wrapper input-wrapper input-wrapper'
			'check 		   check 		 check';
		border-top: 1px solid $BUTTON-COLOR;
		grid-row-gap: 4px;
		align-items: center;
		justify-items: start;
		justify-content: start;
		@media (max-width: 500px) {
			grid-template-rows: repeat(6, auto);
			grid-template-columns: repeat(2, auto);
			grid-template-areas:
				'day 	       edit'
				'day-input     edit'
				'time          edit'
				'time-input    edit'
				'input-wrapper input-wrapper'
				'check         check';
			justify-content: stretch;
		}
	}
	&__date-label {
		grid-area: day;
		font-family: $base-font;
		font-size: 0.625rem;
		font-weight: 500;
		text-align: left;
		color: $GREY;
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
		@media (max-width: 500px) {
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
		&--name {
			grid-area: label-name;
		}
		&--phone {
			grid-area: label-phone;
		}
	}
	&__input {
		text-indent: 1rem;
		border-radius: 4px;
		width: 100%;
		height: 40px;
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
	}
	&__input::placeholder {
		color: $GREY;
	}

	&__resident-label {
		position: relative;
		grid-area: check;
		display: grid;
		grid-template-columns: 16px auto;
		grid-column-gap: 0.75rem;
		align-items: center;
		cursor: pointer;
	}
	&__resident-text {
		grid-column: 2;
		font-family: $base-font;
		font-size: 0.625rem;
		font-weight: 500;
		text-align: left;
		color: $GREY;
	}
	&__resident-input {
		position: absolute;
		z-index: -1;
		outline: none;
		border: none;
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
		border-top: 1px solid $BUTTON-COLOR;
		@extend %flex-row-sb;
		align-items: center;
	}
	&__check-frame {
		padding-bottom: 2rem;
		transform-origin: 50% 0%;
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
		transform: scaleX(1);
		transform-origin: center;
		grid-template-rows: repeat(3, auto);
		padding: 1rem;
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
	}
	&__email {
		width: 100%;
		text-indent: 1rem;
		align-items: stretch;
		border-radius: 4px;
		width: 100%;
		height: 40px;
		border: none;
		outline: none;
		background-color: $BUTTON-COLOR;
		font-family: $base-font;
		font-size: 0.625rem;
		font-weight: 500;
		text-align: left;
		color: $TEXT-COLOR;
		@media (max-width: 600px) {
			grid-column: 1 / 3;
		}
	}
	&__email::placeholder {
		color: $GREY;
	}
	&__button {
		padding: 0 2rem;
		height: 40px;
		background-color: $BUTTON-COLOR;
		border-radius: 3px;
		outline: none;
		border: none;
		@extend %flex-row-c;
		align-items: center;
		position: relative;
		z-index: 2;
		transition: background-color ease-in-out 0.1s;
		@media (max-width: 600px) {
			grid-column: 1 / 3;
			width: 100%;
		}
		&:active .check-free-time__button-text {
			color: $LIGHT-GREY;
		}
		&:focus .check-free-time__button-text::before {
			visibility: visible;
		}
		&:disabled {
		background-color: $BUTTON-COLOR;
		}
		&:disabled &-text {
			color: $MIDDLE-GREY;
		}
	}

	&__button-text {
		font-family: $base-font;
		font-size: 0.625rem;
		font-weight: 700;
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
		transform: scaleX(1);
		transform-origin: center;
		padding: 1rem;
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
	}
	&__title {
		font-family: $base-font;
		font-size: 0.625rem;
		font-weight: 500;
		text-align: left;
		color: $GREY;
	}
	&__text {
		font-family: $base-font;
		font-size: 0.8125rem;
		font-weight: 500;
		line-height: 2;
		text-align: left;
		color: $TEXT-COLOR;
		&--red {
			color: red;
		}
	}
}
</style>
