<template>
<div class="booking-done-mobile__wrapper">
	<div class="booking-done-mobile" :style="onStyleAnimate">
		<button-close-mini class="booking-done-mobile__close" @click.native="goHome"></button-close-mini>
		<div class="booking-done-mobile__inner booking-done-mobile__inner--title">
			<h2 class="booking-done-mobile__title">{{ $t('bookinRoomDone.mobile.title') }}</h2>
			<p class="booking-done-mobile__title booking-done-mobile__title--merge">{{ $t('bookinRoomDone.mobile.titleLogo') }}</p>
		</div>
		<p class="booking-done-mobile__caption">{{ $t('bookinRoomDone.mobile.caption') }}</p>
		<p class="booking-done-mobile__info">{{ $t('bookinRoomDone.mobile.response.0') }}</p>
		<p class="booking-done-mobile__info">{{ $t('bookinRoomDone.mobile.response.1') }}</p>
		<p class="booking-done-mobile__info">{{ $t('bookinRoomDone.mobile.response.2') }}</p>
		<div class="booking-done-mobile__inner booking-done-mobile__inner--social">
			<p class="booking-done__text">{{ $t('bookinRoomDone.mobile.text') }}</p>
			<social-networks class="booking-done-mobile__social"></social-networks>
		</div>
		<div class="booking-done-mobile__inner booking-done-mobile__inner--location">
			<svg class="booking-done-mobile__image">
				<use xlink:href='#location' />
			</svg>
			<p class="booking-done-mobile__location-text">{{ $t('bookinRoomDone.mobile.location') }}</p>
		</div>
		<button-map class="booking-done-mobile__button-map"></button-map>
		<div class="booking-done-mobile__inner booking-done-mobile__inner--back-button">
			<button-back class="booking-done-mobile__button-back" @click.native='goHome'></button-back>
			<p class="booking-done-mobile__button-text" @click='goHome'>{{ $t('bookinRoomDone.mobile.toStart') }}</p>
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
import ButtonCloseMini from '@/components/buttons/ButtonCloseMini';

export default {
	name: 'BookingRoomDoneMobile',
	components: {
		ButtonMap,
		SocialNetworks,
		ButtonBack,
		ButtonCloseMini
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
}
</script>
<style lang="scss">
@import '../assets/scss/style.scss';

.booking-done-mobile {
	padding: 2rem 0;
	flex: 0 0 30%;
	flex-direction: column;
	will-change: transform;
	align-items: flex-start;
	display: flex;
	animation-name: fadeInBubble;
	animation-duration: 0.5s;
	animation-timing-function: ease-in-out;
	position: relative;
	@media (min-width: 600px) {
		min-width: 435px;
	}
	@media (max-width: 600px) {
		flex: 0 0 100%;
		align-self: flex-start;
		padding: 0;
	}
	&__close {
		display: none;
		right: -10pt;
		top: 5pt;
		@media (max-width: 600px) {
			display: block;
			width: 32pt;
			height: 32pt;
			display: flex;
			justify-content: center;
			align-items: center;
            svg {
                width: 24pt;
                height: 24pt;
            }
        }
        @media (max-width: 375px) {
			top: 2pt;
        }
        @media (max-width: 320px) {
			top: -1px;
        }
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
		flex-direction: row;
		display: none;
		justify-content: center;
		align-items: center;
		@media (max-width: 700px) {
			display: flex;
		}
		@media (max-width: 600px) {
			padding: 28pt;
		}
		@media (max-width: 320px) {
			padding: 24pt;
		}
	}
	&__button-back {
		margin-right: 1rem;
		@media (max-width: 600px) {
			width: 32pt;
			height: 32pt;
			background-color: $MERGE-MAIN-COLOR;
			svg {
				fill: $MAIN-DARK-COLOR;
				width: 16pt;
				height: 16pt;
				stroke: $MAIN-DARK-COLOR;
			}
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
		cursor: pointer;
		@media (max-width: 600px) {
			color: $TEXT-COLOR;
			letter-spacing: 0.7pt;
			font-size: 0.8rem;
			font-weight: 600;
		}
	}
	&__inner {
		width: 100%;
		@extend %flex-col;
		align-items: flex-start;
		@media (max-width: 600px) {
			text-align: left;
		}
		&--title {
			margin-bottom: 1.6rem;
			@media (max-width: 600px) {
				margin-bottom: 18pt;
			}
			@media (max-width: 375px) {
				margin-bottom: 14pt;
			}
			@media (max-width: 320px) {
				margin-bottom: 12pt;
			}
		}
		&--back-button {
			flex-direction: row;
			align-items: center;
			padding-top: 2rem;
			justify-content: flex-start;
			padding-top: 1.375rem;
			border-top: 1px solid $MIDDLE-GREY;
			@media (max-width: 600px) {
				padding-top: 20pt;
				border-color: $GREY;
			}
			@media (max-width: 320px) {
				padding-top: 16pt;
			}
		}
		&--social {
			padding: 1.1875rem 0 1.5rem 0;
			border-top: 1px solid $MIDDLE-GREY-OPACITY;
			border-bottom: 1px solid $MIDDLE-GREY-OPACITY;
			@media (max-width: 600px) {
				border-top: none;
				padding: 14pt 0;
			}
			@media (max-width: 320px) {
				padding: 10pt 0;
			}
		}
		&--location {
			flex-direction: row;
			align-items: center;
			padding: 1.125rem 0;
			@media (max-width: 600px) {
				padding: 16pt 0;
				align-items: flex-start;
			}
			@media (max-width: 320px) {
				padding: 12pt 0;
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
			display: inline-block;
			font-size: 2.4rem;
			line-height: 1.4;
			letter-spacing: 0.5pt;
		}
		@media (max-width: 375px) {
			line-height: 1.3;
			font-size: 2.2rem;
		}
		@media (max-width: 320px) {
			line-height: 1.2;
			font-size: 1.9rem;
		}
		&--merge {
			text-transform: uppercase;
			color: $MERGE-MAIN-COLOR;
			letter-spacing: 0.5rem;
			@media (max-width: 600px) {
				font-size: 2.4rem;
			}
			@media (max-width: 375px) {
				font-size: 2.2rem;
			}
			@media (max-width: 320px) {
				font-size: 1.9rem;
			}
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
			font-size: 1rem;
			line-height: 1.6;
			margin-bottom: 18pt;
			font-weight: 500;
			letter-spacing: 0.4pt;
		}
		@media (max-width: 375px) {
			font-size: 0.8rem;
			letter-spacing: 0.6pt;
			margin-bottom: 14pt;
		}
		@media (max-width: 320px) {
			font-size: 0.75rem;
			letter-spacing: 0.6pt;
			margin-bottom: 12pt;
		}
	}
	&__info {
		font-family: $base-font;
		font-size: 0.8125rem;
		font-weight: 500;
		line-height: 2;
		text-align: left;
		color: $TEXT-COLOR;
		@media (max-width: 600px) {
			font-size: 1rem;
			font-weight: 500;
			letter-spacing: 0.4pt;
		}
		@media (max-width: 375px) {
			font-size: 0.8rem;
			letter-spacing: 0.6pt;
		}
		@media (max-width: 320px) {
			font-size: 0.75rem;
			letter-spacing: 0.6pt;
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
			font-size: 0.8rem;
			letter-spacing: 0.5pt;
			margin-bottom:  12pt;
			font-weight: 600;
		}
		@media (max-width: 375px) {
			font-size: 0.7rem;
			line-height: 1.8;
			margin-bottom:  10pt;
		}
		@media (max-width: 320px) {
			font-size: 0.6rem;
			line-height: 1.6;
			margin-bottom:  8pt;
		}
	}
	&__social {
		grid-template-rows: none;
		grid-template-columns: repeat(3, auto);
		grid-row-gap: 0;
		grid-column-gap: 1.25rem;
		align-items: center;
		@media (max-width: 600px) {
			grid-column-gap: 24pt;
			a {
				width: 32pt;
				height: 32pt;
				svg {
					width: 18pt;
					height: 18pt;
				}
			}
		}
		@media (max-width: 775px) {
			a {
				width: 30pt;
				height: 30pt;
				svg {
					width: 16pt;
					height: 16pt;
				}
			}
		}
		
	}
	&__image {
		fill: $TEXT-COLOR;
		width: 20px;
		height: 20px;
		margin-right: 6px;
		@media (max-width: 600px) {
			width: 20pt;
			height: 20pt;
		}
	}
	&__location-text {
		font-family: $base-font;
		font-size: 0.8125rem;
		font-weight: 500;
		line-height: 2;
		text-align: left;
		color: $TEXT-COLOR;
		@media (max-width: 600px) {
			font-weight: 500;
			font-size: 1rem;
			line-height: 1.5;
			letter-spacing: 0.6pt;
		}
		@media (max-width: 375px) {
			font-size: 0.9rem;
			letter-spacing: 0.6pt;
		}
	}
	&__button-map {
		margin-bottom: 2rem;
		@media (max-width: 600px) {
			margin-bottom: 20pt;
			width: 100%;
		}
		@media (max-width: 320px) {
			margin-bottom: 14pt;
		}
	}
}
</style>
