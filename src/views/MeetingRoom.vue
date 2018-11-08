<template>
<div class="meeting-room">
	<transition 
		appear
		name="custom-classes-transition"
		enter-active-class="animated fadeIn"
		leave-active-class="animated fadeOut"
		mode="out-in">
	<book-meeting-room  v-show='showBookMeetingRoom' @editDate='editDate("fullcalendar")' @goBack='goBack'></book-meeting-room>
	</transition>
	<!-- 2 wrappers to implement dual adaptive indents -->
	<div class="meeting-room__wrapper">
		<div class="meeting-room__inner">
			<header class="meeting-room__header" v-show='hideElements'>
				<h1 class="meeting-room__title">Meeting Room</h1>
				<button-book-room @click.native='showBook'></button-book-room>
			</header>
			<section class="meeting-room__slider">
				<button class="meeting-room__label-button">Photos</button>
				<slider v-show='hideElements'></slider>
			</section>
			<section class="meeting-room-inf" v-show='hideElements'>
				<div class="meeting-room-inf__wrapper">
					<div class="meeting-room-inf__buttons">
						<div class="meeting-room-inf__card meeting-room-inf__card--hour">
							<p class="meeting-room-inf__text meeting-room-inf__text--hour">150
								<span class="meeting-room-inf__description meeting-room-inf__description--hour">UAH PER HOUR
								</span>
							</p>
							<button-book-now @click.native='showBook'></button-book-now>
						</div>
						<div class="meeting-room-inf__card meeting-room-inf__card--resident">
							<p class="meeting-room-inf__text meeting-room-inf__text--resident">FREE
								<span class="meeting-room-inf__description meeting-room-inf__description--resident">FOR RESIDENTS 1 HOUR not more than TWO TIMES PER WEEK
								</span>
							</p>
							<button-resident-link></button-resident-link>
						</div>
					</div>
					<div class="meeting-room-inf__labels">
						<div class="beneffits__label">
							<img src="../assets/image/meeting.png" alt="meeting" class="beneffits__img">
							<p class="beneffits__text">Capacity: 10 people</p>
						</div>
						<div class="beneffits__label">
							<img src="../assets/image/tv.svg" class="beneffits__image">
							<p class="beneffits__text">50” TV with internet, Windows 10 and webcam</p>
						</div>
						<div class="beneffits__label">
							<img src="../assets/image/flipchart.svg" class="beneffits__image">
							<p class="beneffits__text">Flipchart with markers</p>
						</div>
						<div class="beneffits__label">
							<img src="../assets/image/wireless-speaker.svg" class="beneffits__image">
							<p class="beneffits__text">Wireless speaker</p>
						</div>
					</div>
				</div>
			</section>
		</div>
	</div>
	<calendar @showBook='showBook' v-show='hideElements'></calendar>
	<section class="next-page-nav" v-show='hideElements'>
		<router-link to="/coworking" class="next-page-nav__link next-page-nav__link--interior">
			<div class="next-page-nav__inner">
				<p class="next-page-nav__text">INTERIOR</p>
			</div>
		</router-link>
		<router-link to="/events" class="next-page-nav__link next-page-nav__link--events">
			<div class="next-page-nav__inner">
				<p class="next-page-nav__text">EVENTS</p>
			</div>
		</router-link>
	</section>
</div>
</template>

<script>
import ButtonBookRoom from '@/components/buttons/ButtonBookRoom.vue';
import ButtonResidentLink from '@/components/buttons/ButtonResidentLink.vue';
import ButtonBookNow from '@/components/buttons/ButtonBookNow.vue';
import Slider from '@/components/Slider.vue';
import Calendar from '@/components/Calendar.vue';
import BookMeetingRoom from '@/views/BookMeetingRoom.vue';

export default {
	name: 'MeetingRoom',
	components: {
		ButtonBookRoom,
		ButtonResidentLink,
		ButtonBookNow,
		Slider,
		Calendar,
		BookMeetingRoom
	},
	data() {
		return {
			hideElements: true,
			showBookMeetingRoom: false
		};
	},
	methods: {
		editDate(href) {
			this.hideElements = true;
			setTimeout(()=>{
				this.showBookMeetingRoom = false;
			},100)
			let time = setInterval(()=>{
				let top = document.getElementById(href).getBoundingClientRect().top;
				if(top > 600) {
					window.scrollTo(0, (top - 2));
					clearInterval(time);	
				}
			}, 10 );
		},
		showBook() {
			this.showBookMeetingRoom = true;
			setTimeout(()=>{
				this.hideElements = false;
			}, 100)
		},
		goBack() {
			this.hideElements = true;
			setTimeout(()=>{
				this.showBookMeetingRoom = false;
			}, 100)
		}
	}
};
</script>

<style lang="scss">
@import '../assets/scss/style.scss';
.meeting-room {
	width: 100%;
	@extend %flex-col;
	align-items: center;
	justify-items: center;
	padding-top: 7rem;
	&__wrapper {
		width: 100%;
		display: flex;
		padding: 0 112px;
		@media (max-width: 920px) {
			justify-content: flex-start;
			padding: 0 0 0 112px;
		}
		@media (max-width: 600px) {
			justify-content: flex-start;
			padding: 0;
		}
	}
	&__inner {
		width: 100%;
		padding: 0 10%;
		@extend %flex-col-c;
		align-items: flex-start;
		&--margin {
			margin-bottom: 4rem;
		}
		@media (max-width: 960px) {
			padding: 0 5%;
		}
		@media (max-width: 600px) {
			padding: 0;
		}
	}
	&__header {
		width: 100%;
		@extend %flex-row-sb;
		align-items: center;
		justify-content: space-between;
		margin: 0 0 5rem 0;
		@media (max-width: 1200px) {
			flex-direction: column;
			align-items: flex-start;
		}
		.button-book-room {
			background-color: $MERGE-SECONDARY-COLOR;
			&__text {
				color: $MAIN-DARK-COLOR;
			}
			&:active {
				background-color: $MERGE-DARK-COLOR;
			}
			&:active .button-book-room__text,
			&:focus .button-book-room__text {
				color: $MAIN-DARK-COLOR;
			}
			&__text::before {
				border-color: $MERGE-SECONDARY-COLOR;
			}
			&:focus &__text::before {
				visibility: visible;
			}

			@media (max-width: 600px) {
				align-self: center;
			}
			@media (max-width: 450px) {
				width: 90%;
			}
		}
	}
	&__title {
		font-family: $title-font;
		font-size: 5rem;
		font-weight: 500;
		text-align: left;
		color: $TEXT-COLOR;
		margin: 0;

		@media (max-width: 1200px) {
			margin-bottom: 2rem;
		}
		@media (max-width: 600px) {
			align-self: center;
			text-align: center;
		}
		@media (max-width: 460px) {
			font-size: 4rem;
		}
	}
	&__slider {
		@extend %flex-col;
		align-items: flex-start;
		padding-top: 5rem;
		padding-bottom: 3rem;
		width: 100%;
		@media (max-width: 450px) {
			align-items: center;
		}
	}
	&__label-button {
		padding: 0.5rem 1rem;
		background-color: black;
		font-family: Montserrat;
		font-size: 0.875rem;
		font-weight: bold;
		text-align: center;
		color: $MIDDLE-GREY;
		outline: none;
		border: none;
		transition: color ease-in-out 0.2s;
		margin-bottom: 1.5rem;
		&:hover {
			color: white;
		}
	}
}
.meeting-room-inf {
	width: 100%;
	border-bottom: 1px solid $MIDDLE-GREY;
	@extend %flex-row;
	@media (max-width: 980px) {
		margin-bottom: 4rem;
	}
	@media (max-width: 720px) {
		justify-content: center;
	}
	&__wrapper {
		flex: 0 0 65%;
		@extend %flex-col;
		@media (max-width: 720px) {
			flex: 0 0 90%;
		}
	}
	&__buttons {
		padding: 5rem 0;
		width: 100%;
		border-top: 2px solid $MIDDLE-GREY;
		border-bottom: 2px solid $MIDDLE-GREY;
		@extend %flex-col;
		align-items: stretch;
		@media (max-width: 720px) {
			align-items: center;
		}
	}
	&__card {
		width: 100%;
		border-radius: 3px;
		padding: 1.875rem 2.3125rem;
		@extend %flex-row-sb;
		align-items: center;
		background: linear-gradient(100deg, #4ddfbf, #31be9e);
		margin-bottom: 2.5rem;
		@media (max-width: 720px) {
			flex-direction: column;
		}
		&:last-child {
			margin: 0;
		}
		&--resident {
			border: solid 2px $DARK-GREY;
			background: transparent;
		}
	}
	&__text {
		@extend %flex-row;
		align-items: center;
		text-transform: uppercase;
		font-family: $title-font;
		font-size: 1.875rem;
		font-weight: 500;
		text-align: left;
		color: $MAIN-DARK-COLOR;
		margin-right: 0.625rem;
		@media (max-width: 720px) {
			margin-right: 0;
			margin-bottom: 1rem;
		}
		@media (max-width: 420px) {
			flex-direction: column;
			align-items: center;
			text-align: center;
		}
		&--hour {
			align-items: baseline;
			@media (max-width: 420px) {
				align-items: center;
			}
		}
		&--resident {
			color: $GREY;
		}
	}
	&__description {
		padding-top: 4px;
		text-transform: uppercase;
		font-family: $base-font;
		font-size: 0.625rem;
		font-weight: bold;
		line-height: 1.4;
		letter-spacing: 0.7px;
		text-align: left;
		color: $DARK-GREY;
		padding-left: 0.625rem;
		@media (max-width: 720px) {
			min-width: 0;
		}
		@media (max-width: 420px) {
			padding: 0;
		}
		&--resident {
			color: $GREY;
			min-width: 220px;
		}
	}
	&__labels {
		width: 100%;
		padding: 5rem 0;
		display: grid;
		grid-template-columns: repeat(2, auto);
		grid-template-rows: repeat(2, auto);
		grid-gap: 3.75rem;
		@media (max-width: 600px) {
			grid-template-columns: none;
			grid-template-rows: repeat(4, auto);
			grid-row-gap: 3.75rem;
		}
	}
}
</style>
