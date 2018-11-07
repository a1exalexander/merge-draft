<template>
<div class="booking-done__wrapper">
	<logo></logo>
	<div class="booking-done" :style="onStyleAnimate">
		<div class="booking-done__inner booking-done__inner--title">
			<h2 class="booking-done__title">Waiting for you in</h2>
			<p class="booking-done__title booking-done__title--merge">MERGE!</p>
		</div>
		<p class="booking-done__caption">You have applied for a workplace booking. Wait for a call by our administrator.</p>
		<div class="booking-done__inner booking-done__inner--social">
			<p class="booking-done__text">FOLLOW US IN SOCIAL MEDIA to keep up our latest news and announcements</p>
			<social-networks class="booking-done__social"></social-networks>
		</div>
		<div class="booking-done__inner booking-done__inner--location">
			<svg class="booking-done__image">
				<use xlink:href='#location' />
			</svg>
			<p class="booking-done__location-text">Kremenchug, Nebesna Sotnia st. 17А, “Proletarsky”</p>
		</div>
		<button-map class="booking-done__button-map"></button-map>
		<div class="booking-done__inner booking-done__inner--back-button">
			<button-back class="booking-done__button-back" @click.native='goHome'></button-back>
			<p class="booking-done__button-text">BACK TO THE START PAGE</p>
		</div>
	</div>
	<svg style="display: none;">
		<symbol id='location' viewBox="0 0 24 24">
			<path fill-rule="evenodd" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z" />
		</symbol>
	</svg>
</div>
</template>

<script>
import ButtonMap from '@/components/buttons/ButtonMap.vue';
import SocialNetworks from '@/components/SocialNetworks.vue';
import ButtonBack from '@/components/buttons/ButtonBack.vue';
import Logo from '@/components/Logo.vue';

export default {
	name: 'BookingDone',
	components: {
		ButtonMap,
		SocialNetworks,
		ButtonBack,
		Logo
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
		goHome() {
			this.onStyleAnimate = this.styleAnimate;
			setTimeout(()=> {
				this.$router.push('/');
			}, 100);
		}
	}
};
</script>

<style lang="scss">
@import '../assets/scss/style.scss';
.booking-done {
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
	&__wrapper {
		position: absolute;
		background-color: $MAIN-DARK-COLOR;
		z-index: 100;
		width: 100%;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		min-height: 100vh;
		@extend %flex-row-c;
		align-items: center;
		@media (max-width: 600px) {
			padding: 2rem;
			padding-top: 4rem;
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
	&__inner {
		width: 100%;
		@extend %flex-col;
		align-items: flex-start;
		@media (max-width: 600px) {
			align-items: center;
		}
		&--title {
			margin-bottom: 1.6rem;
		}
		&--back-button {
			flex-direction: row;
			align-items: center;
			padding-top: 2rem;
			justify-content: flex-start;
			padding-top: 1.375rem;
			border-top: 1px solid $MIDDLE-GREY;
			@media (max-width: 600px) {
				justify-content: center;
			}
		}
		&--social {
			padding: 1.1875rem 0 1.5rem 0;
			border-top: 1px solid $BUTTON-COLOR;
			border-bottom: 1px solid $BUTTON-COLOR;
		}
		&--location {
			flex-direction: row;
			align-items: center;
			padding: 1.125rem 0;
			@media (max-width: 600px) {
				justify-content: center;
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
	&__caption {
		font-family: $base-font;
		font-size: 0.8125rem;
		font-weight: 500;
		line-height: 2;
		text-align: left;
		color: $TEXT-COLOR;
		margin-bottom: 1.3rem;
		@media (max-width: 600px) {
			text-align: center;
		}
	}
	&__text {
		font-family: $base-font;
		font-size: 0.5rem;
		font-weight: bold;
		line-height: 2;
		letter-spacing: 0.5px;
		text-align: left;
		color: $GREY;
		margin-bottom:  0.8rem;
		text-transform: uppercase;
		@media (max-width: 600px) {
			text-align: center;
		}
	}
	&__social {
		grid-template-rows: none;
		grid-template-columns: repeat(3, auto);
		grid-row-gap: 0;
		grid-column-gap: 1.25rem;
		align-items: center;
		@media (max-width: 600px) {
			align-self: center;
		}
	}
	&__image {
		fill: $TEXT-COLOR;
		width: 20px;
		height: 20px;
		margin-right: 6px;
	}
	&__location-text {
		font-family: $base-font;
		font-size: 0.8125rem;
		font-weight: 500;
		line-height: 2;
		text-align: left;
		color: $TEXT-COLOR;
	}
	&__button-map {
		margin-bottom: 2rem;
		@media (max-width: 460px) {
			width: 100%;
		}
	}
}
</style>
