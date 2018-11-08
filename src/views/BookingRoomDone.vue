<template>
<div class="booking-room-done" :style="onStyleAnimate">
	<div class="booking-room-done__inner booking-room-done__inner--title">
		<h2 class="booking-room-done__title">Waiting for you in</h2>
		<p class="booking-room-done__title booking-room-done__title--merge">MERGE!</p>
	</div>
	<p class="booking-room-done__text">You have reserved a Meeting Room</p>
	<div class="booking-room-done__inner booking-room-done__inner--name">
		<p class="booking-room-done__label booking-room-done__label--name">Full Name</p>
		<p class="booking-room-done__label booking-room-done__label--phone">Phone</p>
		<p class="booking-room-done__text booking-room-done__text--name">{{ bookRoomData.name }}</p>
		<p class="booking-room-done__text booking-room-done__text--phone">{{ bookRoomData.phone }}</p>
		<button class="booking-room-done__edit-button" @click.prevent='edit'>
			<svg class="booking-room-done__edit-icon">
				<use xlink:href='#icon-edit'/>
			</svg>
			<p class="booking-room-done__edit-text">edit</p>
		</button>
	</div>
	<div class="booking-room-done__inner booking-room-done__inner--date">
		<p class="booking-room-done__label booking-room-done__label--day">Date</p>
		<p class="booking-room-done__label booking-room-done__label--time">Time</p>
		<p class="booking-room-done__label booking-room-done__label--price">Price</p>
		<p class="booking-room-done__text booking-room-done__text---day">{{ bookRoomData.day }}</p>
		<p class="booking-room-done__text booking-room-done__text---time">{{ bookRoomData.duration }}</p>
		<p class="booking-room-done__text booking-room-done__text---price">{{ bookRoomData.price }}</p>
		<a href="#" class="booking-room-done__link">put on the calendar</a>
	</div>
	<p class="booking-room-done__text booking-room-done__text--description">Payment occurs in coworking. Wait for a call by our administrator.</p>
	<div class="booking-room-done__inner booking-room-done__inner--back-button">
		<button-back class="booking-room-done__button-back" @click.native='goHome'></button-back>
		<p class="booking-room-done__button-text">BACK TO THE START PAGE</p>
	</div>
	<svg style="display: none;">
		<symbol id='icon-edit' viewBox="0 0 24 24">
			<path fill-rule="evenodd" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
		</symbol>
	</svg>
</div>
</template>

<script>
import ButtonBack from '@/components/buttons/ButtonBack.vue';

export default {
	name: 'BookingDone',
	props: ['bookRoomData'],
	components: {
		ButtonBack
	},
	data () {
		return {
			styleAnimate: {
				transform: 'translateX(-200%)',
				transition: 'transform ease-in-out 0.3s'
			},
			onStyleAnimate: null
		}
	},
	methods: {
		edit() {
			this.$emit('edit');
		},
		goHome() {
			this.onStyleAnimate = this.styleAnimate;
			setTimeout(()=> {
				this.$router.push('/');
			}, 100);
		}
	},
	computed: {
	    event() {
	      return this.$store.state.event;
	    }
  }
};
</script>

<style lang="scss">
@import '../assets/scss/style.scss';
.booking-room-done {
	padding: 2rem 0;
	flex: 0 0 30%;
	@extend %flex-col;
	will-change: transform;
	align-items: flex-start;
	animation-name: fadeInBubble;
	animation-duration: 0.5s;
	animation-timing-function: ease-in-out;
	@media (min-width: 600px) {
		min-width: 435px;
	}
	@media (max-width: 600px) {
		flex: 0 0 100%;
		align-self: flex-start;
		align-items: center;
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
	&__inner {
		width: 100%;
		&--title {
			@extend %flex-col;
			align-items: flex-start;
			margin-bottom: 1.6rem;
		}
		&--back-button {
			@extend %flex-row;
			align-items: center;
			padding-top: 1rem;
			@media (max-width: 600px) {
				justify-content: center;
			}
		}
		&--name {
			padding: 1rem 0;
			display: grid;
			grid-template-columns: 2fr 4fr 1fr;
			grid-template-rows: repeat(2, auto);
			grid-column-gap: 1rem;
			grid-row-gap: 0.2rem;
			justify-items: start;
		}
		&--date {
			padding: 1rem 0;
			display: grid;
			grid-template-columns: repeat(3, auto);
			grid-template-rows: repeat(3, auto);
			grid-column-gap: 1rem;
			grid-row-gap: 0.2rem;
			justify-items: start;
			border-top: 1px solid $BUTTON-COLOR;
			border-bottom: 1px solid $BUTTON-COLOR;
			@media (max-width: 600px) {
				
			}
		}
	}
	&__title {
		font-family: $title-font;
		font-size: 2.5rem;
		font-weight: 500;
		text-align: left;
		color: $TEXT-COLOR;
		@media (max-width: 600px) {
			text-align: center;
		}
		&--merge {
			text-transform: uppercase;
			color: $MERGE-MAIN-COLOR;
			letter-spacing: 0.5rem;
		}
	}
	&__text {
		font-family: $base-font;
		font-size: 0.8125rem;
		font-weight: 500;
		line-height: 2;
		text-align: left;
		color: $TEXT-COLOR;
		@media (max-width: 600px) {
			text-align: center;
		}
		&--name {
			grid-column: 1;
			grid-row: 2;
		}
		&--phone {
			grid-column: 2;
			grid-row: 2;
		}
		&--day {
			grid-column: 1;
			grid-row: 2;
		}
		&--time {
			grid-column: 2;
			grid-row: 2;
		}
		&--price {
			grid-column: 3;
			grid-row: 2;
		}
		&--description {
			line-height: 2;
			padding: 1.2rem 0;
		}
	}
	&__label {
		font-family: $base-font;
		font-size: 0.625rem;
		font-weight: 500;
		text-align: left;
		color: $GREY;
		@media (max-width: 600px) {
			text-align: center;
		}
		&--name {
			grid-column: 1;
			grid-row: 1;
		}
		&--phone {
			grid-column: 2;
			grid-row: 1;
		}
		&--day {
			grid-column: 1;
			grid-row: 1;
		}
		&--time {
			grid-column: 2;
			grid-row: 1;
		}
		&--price {
			grid-column: 3;
			grid-row: 1;
		}
	}
	&__link {
		grid-column: 1/4;
		grid-row: 3;
		font-family: Montserrat;
		font-size: 0.625rem;
		font-weight: 700;
		letter-spacing: 0.7px;
		text-align: left;
		color: $MERGE-MAIN-COLOR;
		text-transform: uppercase;
		text-decoration: none;
		outline: none;
		padding-top: 0.7rem;
	}
	&__edit-button {
		@extend %flex-row;
		align-items: center;
		outline: none;
		border: none;
		background-color: transparent;
		grid-column: 3;
		grid-row: 2;
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
}
</style>
