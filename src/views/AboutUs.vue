<template>
<div class="about-us">
	<transition
		name="custom-classes-transition"
		enter-active-class="animated faster fadeIn"
		leave-active-class="animated faster fadeOut">
    <resident-card v-if='visible.residentCard' @closeCard='closeCard'></resident-card>
    </transition>
	<transition
		name="custom-classes-transition"
		enter-active-class="animated faster fadeIn"
		leave-active-class="animated faster fadeOut">
    <week-card v-if='visible.weekCard' @closeCard='closeCard'></week-card>
    </transition>
	<transition
		name="custom-classes-transition"
		enter-active-class="animated faster fadeIn"
		leave-active-class="animated faster fadeOut">
    <day-card v-if='visible.dayCard' @closeCard='closeCard'></day-card>
    </transition>
	<div class="about-us__wrapper">
		<div class="about-us__main about-us__main--margin">
			<header class="about-us__header animated d06 delay-02s fadeInLeft">
				<h1 class="about-us__title">{{ $t('aboutUs.title') }}</h1>
				<button-membership @click.native='closeCard'></button-membership>
			</header>
			<section class="work-time work-time--margin animated d06 delay-03s fadeInLeft">
				<img src="../assets/image/time.svg" class="work-time__clock" alt="clock">
				<p class="work-time__text work-time__text--weekday">{{ $t('aboutUs.time.weekdayText') }}</p>
				<p class="work-time__text work-time__text--weekend">{{ $t('aboutUs.time.weekendText') }}</p>
				<p class="work-time__text work-time__text--time">{{ $t('aboutUs.time.weekdayTime') }}</p>
				<p class="work-time__text work-time__text--weekend-time">{{ $t('aboutUs.time.weekendTime') }}</p>
			</section>
			<section class="subscription-type__wrapper subscription-type__wrapper--margin">
				<div class="subscription-type subscription-type--resident animated d06 delay-04s fadeInLeft" @click="visible.residentCard = true">
					<p class="subscription-type__title">{{ $t('aboutUs.subscription.month.title') }}</p>
					<p class="subscription-type__resident">{{ $t('aboutUs.subscription.month.feature') }}</p>
					<p class="subscription-type__price">{{ price.month }}</p>
					<a href='#' class="subscription-type__link-img">
						<svg class="subscription-type__img">
							<use xlink:href='#infoborder' />
						</svg>
					</a>
				</div>
				<div class="subscription-type animated d06 delay-05s fadeInLeft" @click="visible.weekCard = true">
					<p class="subscription-type__title">{{ $t('aboutUs.subscription.week.title') }}</p>
					<p class="subscription-type__price">{{ price.week }}</p>
					<a href='#' class="subscription-type__link-img">
						<svg class="subscription-type__img">
							<use xlink:href='#infoborder' />
						</svg>
					</a>
				</div>
				<div class="subscription-type animated d06 delay-06s fadeInLeft" @click="visible.dayCard = true">
					<p class="subscription-type__title">{{ $t('aboutUs.subscription.day.title') }}</p>
					<p class="subscription-type__price">{{ price.day }}</p>
					<a href='#' class="subscription-type__link-img">
						<svg class="subscription-type__img">
							<use xlink:href='#infoborder' />
						</svg>
					</a>
				</div>
			</section>
			<section class="about-us__inf about-us__inf--margin">
				<div class="about-us__inner">
					<p class="about-us__caption animated d06 delay-07s fadeInLeft">{{ $t('aboutUs.caption') }}</p>
					<h2 class="about-us__subtitle animated d06 delay-08s fadeInLeft">{{ $t('aboutUs.subtitle') }}</h2>
					<p class="about-us__text animated d06 delay-09s fadeInLeft">{{ $t('aboutUs.text') }}</p>
				</div>
			</section>
			<slider class="about-us__slider animated d06 delay-1s fadeInLeft"></slider>
		</div>
	</div>
	<section class="next-page-nav animated d06 delay-11s fadeInLeft" >
		<router-link to='/coworking' class="next-page-nav__link about-us__link-page about-us__link-page--interior">
			<div class="next-page-nav__inner">
				<p class="next-page-nav__text">{{ $t('links.interior') }}</p>
			</div>
		</router-link>
		<router-link to='/meeting-room' class="next-page-nav__link about-us__link-page about-us__link-page--meeting-room">
			<div class="next-page-nav__inner">
				<p class="next-page-nav__text">{{ $t('links.meetingRoom') }}</p>
			</div>
		</router-link>
	</section>
	<div class="about-us__button-member">
		<button-membership @click.native='closeCard'></button-membership>
	</div>
	<svg style="display: none">
		<symbol id='infoborder' viewBox="0 0 24 24">
			<path d="M11,17 L13,17 L13,11 L11,11 L11,17 L11,17 Z M12,2 C6.48,2 2,6.48 2,12 C2,17.52 6.48,22 12,22 C17.52,22 22,17.52 22,12 C22,6.48 17.52,2 12,2 L12,2 Z M12,20 C7.59,20 4,16.41 4,12 C4,7.59 7.59,4 12,4 C16.41,4 20,7.59 20,12 C20,16.41 16.41,20 12,20 L12,20 Z M11,9 L13,9 L13,7 L11,7 L11,9 L11,9 Z" id="Shape">
			</path>
		</symbol>
	</svg>
</div>
</template>

<script>
import ButtonMembership from '@/components/buttons/ButtonMembership.vue';
import ResidentCard from '@/components/ResidentCard.vue';
import DayCard from '@/components/DayCard.vue';
import WeekCard from '@/components/WeekCard.vue';
import Slider from '@/components/Slider.vue';

export default {
	name: 'about',
	components: {
		ButtonMembership,
		ResidentCard,
		DayCard,
		WeekCard,
		Slider
	},
	data() {
		return {
			visible: {
				residentCard: false,
				dayCard: false,
				weekCard: false
			}	
		};
	},
	methods: {
		closeCard(type) {
			if (type) {
				this.$router.push('/booking-workplace');
			} else {
				this.visible.residentCard = false;
				this.visible.dayCard = false;
				this.visible.weekCard = false;
			}
			
		}
	},
	computed: {
        price() {
            return this.$store.state.price;
		}
	}
}
</script>

<style lang="scss">
@import '../assets/scss/style.scss';
.about-us {
	width: 100%;
	@extend %flex-col;
	align-items: center;
	justify-items: center;
	flex-shrink: 1;
	flex-grow: 0;
	padding-top: 7rem;
	@media (orientation: landscape) and (max-width: 820px) {
		padding-top: 30pt;
	}
	@media (max-width: 600px) {
		padding: 0;
	}
	&__wrapper {
		width: 100%;
		display: flex;
		padding: 0 112px;
		@media (max-width: 920px) {
			justify-content: flex-start;
			padding: 0 0 0 112px;
		}
		@media (orientation: landscape) and (max-width: 820px) {
			padding: 0 0 0 56pt;
		}
		@media (max-width: 600px) {
			justify-content: flex-start;
			padding: 0;
		}
	}
	&__main {
		width: 100%;
		padding: 0 10%;
		@extend %flex-col-c;
		align-items: flex-start;
		&--margin {
			margin-bottom: 68px;
			@media (max-width: 600px) {
				margin-bottom: 2rem;
			}
		}
		@media (max-width: 920px) {
			padding: 0 5%;
		}
		@media (max-width: 600px) {
			padding: 0;
			margin: 0;
		}
	}
	&__header {
		width: 100%;
		@extend %flex-row-sb;
		align-items: center;
		margin: 0 0 78px 0;
		@media (max-width: 990px) {
			flex-direction: column;
			align-items: flex-start;
		}
		@media (max-width: 600px) {
			margin: 0 0 35pt 0;
			padding: 0 32pt;
		}
		@media (max-width: 375px) {
			padding: 0 26pt;
		}
		@media (max-width: 320px) {
			padding: 0 22pt;
		}
		.button-membership {
			@media (max-width: 990px) {
				align-self: flex-start;
			}
			@media (max-width: 600px) {
				display: none;
			}
		}
	}
	&__title {
		font-family: $title-font;
		font-size: 5rem;
		font-weight: 500;
		text-align: left;
		color: $TEXT-COLOR;
		white-space: nowrap;
		margin: 0;
		@media (max-width: 990px) {
			margin-bottom: 2rem;
		}
		@media (max-width: 600px) {
			font-family: $title-font;
			font-size: 2.6rem;
			white-space: normal;
			align-self: flex-start;
			line-height: 1;
			text-align: left;
			margin: 0;
		}
	}
	&__inf {
		@extend %flex-row;
		justify-content: flex-end;
		transition: flex ease-in-out 0.3s;
		&--margin {
			margin-bottom: 90px;
			@media (orientation: landscape) and (max-width: 820px) {
				margin-bottom: 10pt;
			}
			@media (max-width: 600px) {
				margin-bottom: 10pt;
			}
		}
		@media (max-width: 920px) {
			flex-grow: 1;
			flex-shrink: 1;
			justify-content: flex-start;
		}
		@media (max-width: 600px) {
			padding: 0 32pt;
			margin-bottom: 32pt;
		}
		@media (max-width: 375px) {
			padding: 0 26pt;
		}
		@media (max-width: 320px) {
			padding: 0 22pt;
        }
	}
	&__slider {
		width: 100%;
	}
	&__inner {
		flex: 0 0 60%;
		text-align: left;
		@extend %flex-col;
		align-items: flex-start;
		@media (max-width: 920px) {
			flex-grow: 1;
			flex-shrink: 1;
		}
	}
	&__caption {
		cursor: default;
		padding: 4px 7px;
		background-color: $MERGE-MAIN-COLOR;
		text-align: center;
		font-family: $title-font;
		font-size: 0.625rem;
		font-weight: bold;
		letter-spacing: 0.7px;
		color: $MAIN-DARK-COLOR;
		white-space: nowrap;
		@media (max-width: 600px) {
			display: none;
		}
	}
	&__subtitle {
		padding: 22px 0;
		font-family: $title-font;
		font-size: 1.875rem;
		font-weight: bold;
		text-align: left;
		color: $TEXT-COLOR;
		position: relative;
		@media (max-width: 600px) {
			padding-top: 0;
		}
		&::after {
			content: '';
			width: 32px;
			height: 3px;
			background-color: #ffffff;
			position: absolute;
			right: -51px;
			top: 50%;
		}
	}
	&__text {
		flex-grow: 1;
		flex-shrink: 1;
		font-family: $base-font;
		font-size: 0.8125rem;
		font-weight: 500;
		line-height: 2.38;
		letter-spacing: 0.9px;
		text-align: left;
		color: $TEXT-COLOR;
		@media (max-width: 600px) {
			font-size: 1rem;
			font-weight: 400;
		}
	}
	&__link-page {
		&--meeting-room {
			background-image: url('../assets/image/meeting-room.jpg');
		}
		&--interior {
			background-image: url('../assets/image/interior.jpg');
		}
	}
	&__button-member {
		display: none;
		@media (max-width: 600px) {
			position: relative;
			width: 100%;
			display: flex;
			padding: 32pt 32pt 40pt;
		}
		@media (max-width: 375px) {
			padding: 32pt 26pt 40pt;
		}
		@media (max-width: 320px) {
			padding: 32pt 22pt 40pt;
		}
		button {
			@media (max-width: 600px) {
				&::before {
					position: absolute;
					content: '';
					top: -32pt;
					right: 0;
					left: 0;
					border-top: 1px solid $MIDDLE-GREY-OPACITY;
					width: 100%;
				}
			}
		}
	}
}

.subscription-type {
	padding-left: 14px;
	width: 128px;
	height: 68px;
	border-radius: 3px;
	background-color: transparent;
	border: solid 2px $DARK-GREY;
	outline: none;
	cursor: pointer;
	@extend %flex-col-se;
	align-items: flex-start;
	position: relative;
	margin-right: 1.5rem;
	@media (max-width: 700px) {
		margin-right: 0;
		margin-bottom: 1rem;
		width: 100%;
	}
	&:last-of-type {
		margin: 0;
	}
	&--resident {
		height: 84px;
	}
	&__wrapper {
		width: 100%;
		@extend %flex-row;
		align-items: flex-start;
		@media (max-width: 700px) {
			flex-direction: column;
			align-items: flex-start;
			padding: 0 2rem;
		}
		@media (max-width: 600px) {
			display: none;
		}
		&--margin {
			margin-bottom: 100px;
		}
	}
	&__title {
		font-family: $base-font;
		font-size: 0.875rem;
		font-weight: 700;
		text-align: left;
		color: $TEXT-COLOR;
	}
	&__resident {
		font-family: $base-font;
		font-size: 0.5625rem;
		font-weight: 500;
		text-align: left;
		color: $GREY;
		text-decoration: none;
	}
	&__price {
		font-family: $base-font;
		font-size: 0.625rem;
		font-weight: 500;
		text-align: left;
		color: $TEXT-COLOR;
		&::after {
			content: ' uah';
		}
	}
	&__link-img {
		position: absolute;
		width: 16px;
		height: 16px;
		text-decoration: none;
		right: 11px;
		top: 11px;
	}
	&__img {
		width: 100%;
		height: 100%;
		fill: $GREY;
	}
	@media (min-width: 600px) {
		&:hover {
			border-color: $TEXT-COLOR;
			transition: border-color ease-in-out 0.2s;
		}
		&:not(:hover) {
			transition: border-color ease-in-out 0.2s;
		}
		&:hover .subscription-type__img {
			fill: white;
			transition: fill ease-in-out 0.1s;
		}
		&:not(:hover) .subscription-type__img {
			transition: fill ease-in-out 0.1s;
		}
	}
}

.work-time {
	display: grid;
	grid-template-columns: repeat(3, auto);
	grid-template-rows: repeat(2, auto);
	grid-column-gap: 21px;
	align-items: center;
	
	@media (max-width: 600px) {
		justify-items: start;
		justify-content: start;
		padding: 0 32pt;
		width: 100%;
		grid-column-gap: 20pt;
	}
	@media (max-width: 375px) {
		padding: 0 26pt;
		grid-column-gap: 18pt;
	}
	@media (max-width: 320px) {
		padding: 0 22pt;
		grid-column-gap: 11pt;
	}
	&--margin {
		margin-bottom: 56px;
		@media (max-width: 600px) {
			margin-bottom: 36pt;
		}
	}
	&__clock {
		grid-area: 1 / 1 / 3 / 2;
		width: 42px;
		height: 42px;
		background-color: transparent;
		fill: $MERGE-MAIN-COLOR;
		justify-self: start;
		align-self: center;
		@media (max-width: 600px) {
			width: 46pt;
			height: 46pt;
		}
		@media (max-width: 320px) {
			width: 42pt;
			height: 42pt;
		}
	}
	&__text {
		font-family: $base-font;
		font-size: 0.8125rem;
		font-weight: 400;
		line-height: 1.69;
		letter-spacing: 0.9px;
		text-align: left;
		color: $TEXT-COLOR;
		@media (max-width: 320px) {
			font-size: 0.74rem;
		}
		&--weekday {
			grid-area: 1 / 2 / 2 / 3;
		}
		&--weekend {
			grid-area: 1 / 3 / 2 / 4;
		}
		&--time {
			font-weight: 700;
			grid-area: 2 / 2 / 3 / 3;
		}
		&--weekend-time {
			font-weight: 700;
			grid-area: 2 / 3 / 3 / 4;
		}
	}
}
</style>
