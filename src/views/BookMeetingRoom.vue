<template>
<div class="book-meeting-room__wrapper">
	<logo></logo>
	<transition 
		appear
		name="custom-classes-transition"
		enter-active-class="animated fadeInBubble"
		mode="out-in">
	<div class="book-meeting-room" :style="onStyleAnimate">
		<button-close-mini class="book-meeting-room__close" @close='goBack'></button-close-mini>
		<div class="book-meeting-room__button-back-wrapper">
			<button-back class="book-meeting-room__button-back" @goBack='goBack'></button-back>
			<p class="book-meeting-room__button-text">go back</p>
		</div>
		<h2 class="book-meeting-room__title">Meeting Room<br>Resevation
		</h2>
		<form action="" id='book-meeting-room-form' name='book-meeting-room' class="book-meeting-room__form">
			<p class="book-meeting-room__date-label">
				Day
			</p>
			<p class="book-meeting-room__date-choice book-meeting-room__date-choice--day">
				12 May, 2018
			</p>
			<p class="book-meeting-room__date-label book-meeting-room__date-label--time">
				Time
			</p>	
			<p class="book-meeting-room__date-choice book-meeting-room__date-choice--time">
				11:00 — 12:20 (1h 20m)
			</p>
			<button class="book-meeting-room__edit-date">
				<svg class="book-meeting-room__edit-icon">
					<use xlink:href='#icon-edit' />
				</svg>
				<p class="book-meeting-room__edit-text">edit</p>
			</button>
			<div class="book-meeting-room__input-wrapper">
				<label for="book-meeting-name" class="book-meeting-room__label book-meeting-room__label--name">
					NAME
				</label>
				<input type="text" id="book-meeting-name" class="book-meeting-room__input book-meeting-room__input--name" required placeholder="Andrey Malishko">
				<label for="book-meeting-phone" class="book-meeting-room__label book-meeting-room__label--phone">
					PHONE
				</label>
				<input type="tel" id='book-meeting-phone' class="book-meeting-room__input book-meeting-room__input--phone" required placeholder="+38 (000) 000 00-00">
			</div>
			<label for="book-meeting-resident" class="book-meeting-room__resident-label">
				<input type="checkbox" form='meeting-room-form' id='book-meeting-resident' class="book-meeting-room__resident-input" value='checkResident' v-model="checked">
				<div class="book-meeting-room__resident-check">
					<svg class="book-meeting-room__resident-img">
						<use xlink:href='#icon-checkbox'/>
					</svg>
				</div>
				<p class="book-meeting-room__resident-text">
					I'm a Resident
				</p>
			</label>
		</form>
        <div class="book-meeting-room__check-frame" v-if='checked'>
            <transition 
            appear
            name="custom-classes-transition"
            enter-active-class="animated pullDown"
            leave-active-class="animatedOut02 pullUp">
            <div class="check-free-time__wrapper" v-show='checkFrameIn'>
			<form id='check-free-time' class="check-free-time">
				<p class="check-free-time__text">Put your E-Mail for checking availability of free hours for Meeting Room's using
				</p>
				<input form='check-free-time' type="email" class="check-free-time__email" placeholder="Email">
				<button form='check-free-time' class="check-free-time__button" @click.prevent="checkResidentTime">
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
				<p class="resident-time-info__title">
					Resident
				</p>
				<p class="resident-time-info__title">
					Duration
				</p>
				<p class="resident-time-info__title">
					Count of Free Hours
				</p>
				<p class="resident-time-info__text">
					(Pasha Tseluyko)
				</p>
				<p class="resident-time-info__text">
					14 – 20 May
				</p>
				<p class="resident-time-info__text resident-time-info__text--red">
					(1 h.)
				</p>
			</div>
            </div>
            </transition>
        </div>
		<div class="book-meeting-room__apply-wrapper">
			<p class="booking-price book-meeting-room__price">
				Price:
				<span class="booking-price__sum">1000</span>
			</p>
			<button-book disabled></button-book>
		</div>
	</div>
	</transition>
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
import ButtonCloseMini from '@/components/buttons/ButtonCloseMini.vue';
import ButtonBack from '@/components/buttons/ButtonBack.vue';
import ButtonBook from '@/components/buttons/ButtonBook.vue';
import Logo from '@/components/Logo.vue';

export default {
	name: 'book-meeting-room',
	components: {
		ButtonBack,
		ButtonBook,
		Logo,
		ButtonCloseMini
	},
	data() {
		return {
			checkFrameIn: false,
			checkFrameOut: false,
			checked: null,
			styleAnimate: {
				transform: 'translateX(-200%)',
				transition: 'transform ease-in-out 0.3s'
			},
			onStyleAnimate: null
		};
	},
	methods: {
		goBack() {
			this.onStyleAnimate = this.styleAnimate;
			setTimeout(() => {
				this.$emit('goBack');
			}, 150);
		},
		checkResidentTime() {
			this.checkFrameIn = false;
			setTimeout(()=> {
				this.checkFrameOut = true;
			}, 200);
		}
	},
	watch: {
		checked: function() {
			this.checkFrameIn = true;
			this.checkFrameOut = false;
		}
	}
};
</script>

<style lang="scss">
@import '../assets/scss/style.scss';
.book-meeting-room {
	padding: 2rem 0;
	flex: 0 0 30%;
	display: grid;
	grid-template-rows: repeat(5, auto);
	align-items: center;
	will-change: height;
	transition: height ease-in-out 0.3s;
	position: relative;
	@media (min-width: 600px) {
		min-width: 430px;
	}
	@media (max-width: 600px) {
		flex: 0 0 100%;
		align-self: flex-start;
	}
	&__wrapper {
		background-color: $MAIN-DARK-COLOR;
		z-index: 1000;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		min-height: 100vh;
		@extend %flex-row-c;
		align-items: center;
		@media (max-width: 600px) {
			padding: 2rem;
			padding-top: 4rem;
			.logo__wrapper {
				position: absolute;
				left: auto;
				right: auto;
				top: 1rem;
			}
		}
	}
	&__close {
		right: 0;
		top: 2.2rem;
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
		grid-template-areas:
			'day 	       time 	     .'
			'day-input     time-input    edit'
			'input-wrapper input-wrapper input-wrapper'
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
		padding: 1.5rem 0 1.375rem 0;
		justify-items: start;
		justify-self: stretch;
		grid-area: input-wrapper;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: repeat(2, auto);
		grid-template-areas:
			'label-name label-phone'
			'input-name input-phone';
		grid-column-gap: 1.5rem;
		grid-row-gap: 0.6875rem;
		@media (max-width: 500px) {
			width: 100%;
			grid-template-columns: none;
			grid-template-rows: repeat(4, auto);
			grid-template-areas:
				'label-name '
				'input-name '
				'label-phone'
				'input-phone';
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
	padding: 1rem 0 0.7rem 1.1rem;
	display: grid;
	transform: scaleX(1.04);
	transform-origin: right center;
	grid-template-rows: repeat(2, auto);
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
