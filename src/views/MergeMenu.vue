<template>

<div class="menu" :style='onStyleAnimate'>
	<div class="menu-button-close__wrapper">
		<button id='back-to-home' class="menu-button-close" @click="goBack">
			<svg class='menu-button-close__img'>
				<use xlink:href='#close' />
			</svg>
			<div class="menu-button-close__outside"></div>
		</button>
		<p class="menu-button-close__description">CLOSE</p>
	</div>
	<div class="menu__col">
	</div>
	<div class="menu__col menu__col--links">
	</div>
	<div class="menu__col menu__col--links-second">
	</div>
	<div class="menu__inner">
		<ul class="menu__list">
			<li class="menu__item">
				<router-link to="/" class="menu__link">Merge</router-link>
			</li>
			<li class="menu__item">
				<router-link to="/coworking" class="menu__link">Coworking space</router-link>
			</li>
			<li class="menu__item">
				<router-link to="/meeting-room" class="menu__link">Meeting Room</router-link>
			</li>
			<li class="menu__item">
				<router-link to="/" class="menu__link">Events</router-link>
			</li>
			<li class="menu__item">
				<router-link to="/about" class="menu__link">About us</router-link>
			</li>
		</ul>
		<div class="menu__language">
			<label class="menu__language-link">
				<input class="menu__language-input" type="radio" name='language' value='ua' v-model='language'>
				<p class="menu__language-text">UA</p>
			</label>
			<label class="menu__language-link">
				<input class="menu__language-input" type="radio" name='language' value='ru' v-model='language'>
				<p class="menu__language-text">RU</p>
			</label>
			<label class="menu__language-link">
				<input class="menu__language-input" type="radio" name='language' value='en' v-model='language' checked>
				<p class="menu__language-text">EN</p>
			</label>
		</div>
	</div>
	<div class="menu__col menu__col--locate">
		<div class="menu__image-wrapper menu-row-1">
			<svg class="menu__image menu__image--calendar">
				<use xlink:href='#calendar' />
			</svg>
		</div>
		<p class="menu__text menu__text--day menu-row-2">MON—FRI:
		</p>
		<p class="menu__text menu__text--time menu-row-3">9:00 – 20:00
		</p>
		<p class="menu__text menu__text--day menu-row-5">SAT, SUN:
		</p>
		<p class="menu__text menu__text--time menu-row-6">10:00 – 18:00
		</p>
		<div class="menu__image-wrapper menu-row-7">
			<svg class="menu__image menu__image--location">
				<use xlink:href='#location' />
			</svg>
		</div>
		<p class="menu__text menu__text--city menu-row-8">Kremenchug
		</p>
		<p class="menu__text menu__text--adress menu-row-9">Nebesna Sotnia st. 17А
			“Proletarsky”
		</p>
		<div class="menu-row-10">
			<button-map></button-map>
		</div>
		
	</div>
	<div class="menu__col menu__col--contact">
		<div class="menu__image-wrapper menu-row-1">
			<svg class="menu__image menu__image--phone">
				<use xlink:href='#phone' />
			</svg>
		</div>
		<a href="callto: 0970313451" class="menu__contact menu__contact--phone menu-row-2">097 031 3451
		</a>
		<div class="menu__image-wrapper menu-row-4">
			<svg class="menu__image menu__image--mail">
				<use xlink:href='#mail' />
			</svg>
		</div>
		<a href="mailto: hello@merge.place" class="menu__contact menu__contact--mail menu-row-6">hello@merge.place
		</a>
		<div class="menu-row-10">
			<button-membership @click.native='becomeMember'></button-membership>
		</div>
	</div>
	<svg style="display: none;">
		<symbol id='menu' viewBox="0 0 24 24">
			<path d="M12,11 L20,11 L20,13 L12,13 L12,11 Z M8,6 L20,6 L20,8 L8,8 L8,6 Z M4,16 L20,16 L20,18 L4,18 L4,16 Z" id="Combined-Shape" transform="translate(12.000000, 12.000000) scale(-1, 1) translate(-12.000000, -12.000000)"></path>
		</symbol>
		<symbol id='close' viewBox="0 0 24 24">
			<polygon id="Shape" points="19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12"></polygon>
		</symbol>
		<symbol id='calendar' viewBox="0 0 24 24">
			<path fill-rule="nonzero" d="M19 20H5V9h14v11zM16 2v2H8V2H6v2H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1V2h-2zm1 11h-5v5h5v-5z" />
		</symbol>
		<symbol id='mail' viewBox="0 0 24 24">
			<path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
		</symbol>
		<symbol id='phone' viewBox="0 0 24 24">
			<path fill-rule="evenodd" d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
		</symbol>
		<symbol id='location' viewBox="0 0 24 24">
			<path fill-rule="evenodd" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z" />
		</symbol>
	</svg>
</div>

</template>

<script>
import ButtonMembership from '@/components/buttons/ButtonMembership.vue';
import ButtonMap from '@/components/buttons/ButtonMap.vue';

export default {
	name: 'mergeMenu',
	components: {
		ButtonMembership,
		ButtonMap
	},
	data() {
		return {
			styleAnimate: {
				transform: 'translateX(-200%)',
				transition: 'transform ease-in-out 0.4s'
			},
			onStyleAnimate: null,
			language: 'en'
		};
	},

	methods: {
		goBack() {
			this.onStyleAnimate = this.styleAnimate;
			setTimeout(()=> {
				if (window.history.length > 1) {
					this.$router.go(-1);
				} else {
					this.$router.go(-1);
				}
			}, 100);
		},
		becomeMember() {
			this.$router.push('/booking-workplace');
		}
	}
};
</script>

<style lang="scss">
@import '../assets/scss/style.scss';
.menu-button-close {
	height: 30px;
	width: 30px;
	outline: none;
	border: none;
	border-radius: 3px;
	background-color: $BUTTON-COLOR;
	@extend %flex-row-c;
	align-items: center;
	transition: background-color ease-in-out 0.1s;
	position: relative;
	z-index: 2;
	animation-name: fadeIn;
	animation-duration: 1s;
	animation-timing-function: ease-in-out;
	@media (min-width: 600px) {
		&:hover {
			background-color: $GREY;
		}
		&:hover &__img {
			fill: $HOVER-ICON-COLOR;
		}
	}
	&:focus {
		background-color: $BUTTON-COLOR;
	}
	&:focus &__img {
		fill: $GREY;
	}
	&:focus &__outside {
		visibility: visible;
	}
	&:active {
		background-color: $BUTTON-COLOR;
	}
	&:active &__img {
		fill: $GREY;
	}
	&__description {
		font-family: $base-font;
		color: $GREY;
		text-transform: uppercase;
		font-size: 0.625rem;
		font-weight: 700;
		letter-spacing: 0.7px;
		position: absolute;
		right: -2em;
		animation-name: fadeIn;
		animation-duration: 1.5s;
		animation-timing-function: ease-in-out;
		@media (max-width: 950px) {
			left: auto;
			right: auto;
			top: -45%;
		}
		@media (max-width: 850px) {
			display: none;
		}
	}
	&__outside {
		pointer-events: none;
		position: absolute;
		content: '';
		background-color: transparent;
		left: -2px;
		right: -2px;
		top: -2px;
		bottom: -2px;
		border: 1px solid $GREY-BORDER-COLOR;
		border-radius: 4px;
		transition: border ease-in-out 0.2s;
		z-index: 0;
		visibility: hidden;
	}
	&__wrapper {
		position: fixed;
		width: 112px;
		height: 100vh;
		@extend %flex-col-c;
		align-items: center;
		z-index: 50;
		@media (max-width: 850px) {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			width: 100%;
			height: 4rem;
			animation-name: slideLeft;
			animation-duration: 0.5s;
			animation-timing-function: ease-in-out;
		}
	}
	&__img {
		width: 26px;
		height: 26px;
		fill: $GREY;
		stroke: none;
		@extend %flex-row-c;
		align-items: center;
		transition: fill ease-in-out 0.1s;
	}
}
.menu {
	width: 100%;
	min-height: 100vh;
	background-color: black;
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	justify-items: stretch;
	align-items: stretch;
	@media (max-width: 950px) {
		grid-template-columns: 112px repeat(2, auto) repeat(2, 1fr);
	}
	@media (max-width: 850px) {
		grid-template-columns: none;
		grid-template-rows: 4rem repeat(4, auto);
	}

	&__col {
		height: 100%;
		grid-column: 1;
		grid-row: 1;
		border-right: 0.5px solid $DARK-GREY;
		@extend %flex-col-c;
		align-items: flex-start;

		&--links {
			grid-column: 2;
			grid-row: 1;
		}
		&--links-second {
			grid-column: 3;
			grid-row: 1;
		}
		&--locate {
			grid-column: 4;
		}
		&--contact {
			grid-column: 5;
		}
		&--locate,
		&--contact {
			grid-row: 1;
			display: grid;
			align-content: center;
			align-items: center;
			justify-items: start;
			justify-content: start;
			grid-template-rows:
				3rem repeat(2, 1.3rem)
				2rem repeat(2, 1.3rem)
				5.5rem 2.5rem 3rem
				4rem;
		}
		@media (max-width: 850px) {
			padding: 2rem 0;
			height: auto;
			width: 100%;
			border-right: none;
			border-bottom: 0.5px solid $DARK-GREY;
			justify-content: center;
			justify-items: center;
			&--links {
				grid-column: 1;
				grid-row: 2;
				border-bottom: none;
			}
			&--links-second {
				grid-column: 1;
				grid-row: 3;
			}
			&--locate {
				grid-column: 1;
				grid-row: 4 / 5;
				> :nth-child(odd),
				.menu-row-9 {
					margin-bottom: 2rem;
				}
				.menu-row-8 {
					margin: 0;
				}
			}
			&--contact {
				grid-column: 1;
				grid-row: 5;
				> :nth-child(even) {
					margin-bottom: 2rem;
				}
			}
			&--locate,
			&--contact {
				text-align: center;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
			}
		}
		@media (max-width: 460px) {
			.menu-row-10 {
				width: 100%;
				padding: 0 1rem;
				button {
					width: 100%;
				}
			}
		}
	}
	&__inner {
		grid-column: 2 / 4;
		grid-row: 1;
		display: grid;
		grid-template-rows: repeat(2, auto);
		grid-row-gap: 3em;
		align-content: center;
		align-items: center;
		justify-items: start;
		@media (min-width: 850px) {
			justify-content: start;
			justify-items: start;
		}
		@media (max-width: 850px) {
			padding: 1rem 0;
			justify-items: center;
			grid-column: 1;
			grid-row: 2 / 4;
		}
	}
	&__list {
		width: 100%;
		display: grid;
		grid-template-rows: repeat(5, auto);
		grid-row-gap: 2rem;
		justify-content: center;
		align-items: center;
		justify-items: start;
		@media (max-width: 850px) {
			justify-items: center;
		}
	}
	&__item {
		@media (max-width: 850px) {
			text-align: center;
		}
	}
	&__text {
		font-family: $base-font;
		font-size: 13px;
		color: $TEXT-COLOR;
		letter-spacing: 0.9px;
		text-align: left;
		line-height: 1.69;
		@media (max-width: 850px) {
			text-align: center;
		}
		&--day {
			font-weight: 400;
			white-space: nowrap;
		}
		&--time {
			font-weight: 700;
			white-space: nowrap;
		}
		&--city {
			font-weight: 400;
			line-height: 1.85;
		}
		&--adress {
			font-weight: 700;
			line-height: 1.85;
		}
	}
	&__link {
		text-decoration: none;
		font-family: $title-font;
		font-size: 2.5rem;
		font-weight: 500;
		color: $TEXT-COLOR;
		white-space: nowrap;
		transition: font-size linear 0.3s;
		@media (max-width: 910px) {
			font-size: 2.1rem;
		}
		@media (max-width: 420px) {
			font-size: 1.8rem;
		}
		&:hover {
			color: $MERGE-MAIN-COLOR;
			transition: color ease-in-out 0.2s;
		}
		&:not(:hover) {
			transition: color ease-in-out 0.2s;
		}
	}
	&__language {
		display: grid;
		grid-template-columns: repeat(3, auto);
		grid-column-gap: 0.5em;
		@media (max-width: 850px) {
			padding-bottom: 2rem;
		}
	}
	&__language-link {
		background-color: transparent;
		outline: none;
		margin-right: 1.5rem;
		position: relative;
		text-align: left;
		cursor: pointer;
		&:last-child {
			margin: 0;
		}
	}
	&__language-input {
		visibility: hidden;
		position: absolute;
		&:checked + .menu__language-text {
			color: $TEXT-COLOR;
		}
		&:hover + .menu__language-text{
			opacity: .8;
		}
		&:active + .menu__language-text{
			opacity: .6;
		}
	}
	&__language-text {
		position: absolute;
		left: 0;
		font-family: $base-font;
		font-weight: 700;
		font-size: 10px;
		color: $GREY;
		letter-spacing: 0.7px;
		text-transform: uppercase;
		text-align: left;
		transition: color ease-in-out 0.1s,
					opacity ease-in-out 0.1s;
	}
	&__image {
		fill: $TEXT-COLOR;
		width: 24px;
		height: 24px;
		position: relative;
		&--calendar {
			left: -3px;
		}
		&--location {
			left: -5px;
		}
		&--phone {
			left: -3px;
		}
		&--mail {
			left: -2px;
		}
	}
	&__image-wrapper {
		height: 24px;
		width: 24px;
	}
	&__contact {
		font-family: $base-font;
		font-size: 13px;
		color: $MERGE-MAIN-COLOR;
		letter-spacing: 0.9px;
		text-align: left;
		font-weight: 500;
		text-decoration: none;
		white-space: nowrap;
	}
}
@for $i from 1 to 11 {
	.menu-row-#{$i} {
		grid-row: #{$i};
	}
}
@media (min-width: 850px) {
	.menu-row-1 {
		align-self: start;
	}
	.menu-row-4,
	.menu-row-7,
	.menu-row-8,
	.menu-row-10 {
		align-self: end;
	}
}
</style>
