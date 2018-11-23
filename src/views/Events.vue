<template>
<div class="events">
<!-- 2 wrappers to implement dual adaptive indents -->
	<div class="events__wrapper">
		<div class="events__inner">
			<header class="events__header">
				<h1 class="events__title animated d05 delay-02s fadeInLeft">{{ $t('events.title') }}</h1>
				<p class="events__subtitle animated d05 delay-03s fadeInLeft">{{ $t('events.subtitle') }}</p>
			</header>
			<main class='events__main animated d05 delay-04s fadeInLeft'>
				<nav class='events__nav'>
					<div class='events__nav-inner'>
						<a class="events__button events__button--future" href="#" :style='toggleButton? style.activeButton: ""' @click.prevent='toggleButton = !toggleButton'>{{ $t('events.nav.future') }}</a>
						<a class="events__button events__button--past" href="#" :style='!toggleButton? style.activeButton: ""' @click.prevent='toggleButton = !toggleButton'>{{ $t('events.nav.past') }}</a>
					</div>
					<div class="events__nav-line">
						<div class='events__nav-active' :class='{"events__nav-active--translate": !toggleButton}'></div>
					</div>
				</nav>
				<transition
					name="custom-classes-transition"
					:enter-active-class="!toggleButton?'animated d04 fadeInLeft':'animated d04 fadeInRight'"
					:leave-active-class="!toggleButton?'animated d04 fadeOutRight':'animated d04 fadeOutLeft'"
					mode='out-in'>
				<section class='events__section events__section--future' v-if='toggleButton' key="future">
					<article class='event' v-for="(event, index) in eventsFuture" :key="event.id">
						<section class="event__content">
							<h2 class="event__title">{{ event.title }}</h2>
							<p class="event__subtitle">{{ event.subtitle }}</p>
							<p class="event__text" :style='+toggleIndex == +index? style.showText: style.hideText'>{{ event.text }}</p>
							<a class="event__button-more" href="#" @click.prevent="+toggleIndex != +index?toggleIndex = index:toggleIndex = -1">{{ $t('events.buttons.more') }}
								<div class='event__triangle' :style='+toggleIndex == +index? style.triangle: ""'></div>
							</a>
							<button class="event__button-details">
								<p class='event__button-text'>{{ $t('events.buttons.open') }}
									<svg class='event__button-img'>
										<use xlink:href='#arrow-right-up' />
									</svg>
								</p>
							</button>
						</section>
						<section class="event__info">
							<p class="event__date">{{ event.date }}</p>
							<p class="event__time">{{ event.time }}</p>
							<p class="event__price">{{ event.price }}</p>
							<button class="event__info-button">
								<p class='event__info-button-text'>{{ $t('events.buttons.mobile') }}</p>
								<svg class='event__info-button-img'>
									<use xlink:href='#arrow-right' />
								</svg>
							</button>
						</section>
					</article>
				</section>
				<section class='events__section events__section--past' v-else key="past">
					<article class='event' v-for="(event, index) in eventsPast" :key="event.id">
						<section class="event__content">
							<h2 class="event__title">{{ event.title }}</h2>
							<p class="event__subtitle">{{ event.subtitle }}</p>
							<p class="event__text" :style='+toggleIndex == +index? style.showText: style.hideText'>{{ event.text }}</p>
							<a class="event__button-more" href="#" @click.prevent="+toggleIndex != +index?toggleIndex = index:toggleIndex = -1">{{ $t('events.buttons.more') }}
								<div class='event__triangle' :style='+toggleIndex == +index? style.triangle: ""'></div>
							</a>
							<button class="event__button-details">
								<p class='event__button-text'>{{ $t('events.buttons.open') }}
									<svg class='event__button-img'>
										<use xlink:href='#arrow-right-up' />
									</svg>
								</p>
							</button>
						</section>
						<section class="event__info">
							<p class="event__date">{{ event.date }}</p>
							<p class="event__time">{{ event.time }}</p>
							<p class="event__price">{{ event.price }}</p>
							<button class="event__info-button">
								<p class='event__info-button-text'>{{ $t('events.buttons.mobile') }}</p>
								<svg class='event__info-button-img'>
									<use xlink:href='#arrow-right' />
								</svg>
							</button>
						</section>
					</article>
				</section>
				</transition>
			</main>
			
		</div>
	</div>
	<section class="next-page-nav animated d05 delay-05s fadeInLeft">
		<router-link to='/meeting-room' class="next-page-nav__link coworking__link-page coworking__link-page--meeting-room">
			<div class="next-page-nav__inner">
				<p class="next-page-nav__text">{{ $t('links.meetingRoom') }}</p>
			</div>
		</router-link>
		<router-link to='/about' class="next-page-nav__link coworking__link-page coworking__link-page--events">
			<div class="next-page-nav__inner">
				<p class="next-page-nav__text">{{ $t('links.about') }}</p>
			</div>
		</router-link>
	</section>
	<svg style="display: none">
        <symbol id='arrow-right-up' width="12" height="12" viewBox=" 0 0 24 24">
            <path fill-rule="evenodd" d="M10 6v1.6h5.272L6 16.872 7.128 18 16.4 8.728V14H18V6z" />
        </symbol>
		<symbol id='arrow-right' viewBox="0 0 268.832 268.832" style="enable-background:new 0 0 400.004 400.004;" xml:space="preserve">
			<path d="M265.171,125.577l-80-80c-4.881-4.881-12.797-4.881-17.678,0c-4.882,4.882-4.882,12.796,0,17.678l58.661,58.661H12.5   c-6.903,0-12.5,5.597-12.5,12.5c0,6.902,5.597,12.5,12.5,12.5h213.654l-58.659,58.661c-4.882,4.882-4.882,12.796,0,17.678   c2.44,2.439,5.64,3.661,8.839,3.661s6.398-1.222,8.839-3.661l79.998-80C270.053,138.373,270.053,130.459,265.171,125.577z"/>
		</symbol>
    </svg>
</div>
</template>

<script>

export default {
	name: 'Events',
	data() {
		return {
			eventsFuture: [
				{
					title: 'Machine Learning Bootcamo. Phase 1',
					subtitle: 'Peer-to-peer studying TensorFlow',
					text: 'Ea dolor ullamco dolore exercitation sint est sunt occaecat reprehenderit proident minim. Veniam occaecat ipsum minim occaecat amet commodo sit sunt nisi. Veniam Lorem quis amet ipsum nostrud est incididunt cillum qui. Ad eiusmod consequat nisi irure nostrud irure ad nisi nulla.',
					date: '6 May, 2018',
					time: '10:00 - 13:00',
					price: 'Free'
				},
				{
					title: 'Insta lunch with @mashawakka',
					subtitle: 'Share secrets, filming and processing',
					text: 'Ea dolor ullamco dolore exercitation sint est sunt occaecat reprehenderit proident minim. Veniam occaecat ipsum minim occaecat amet commodo sit sunt nisi. Veniam Lorem quis amet ipsum nostrud est incididunt cillum qui. Ad eiusmod consequat nisi irure nostrud irure ad nisi nulla.',
					date: '13 May, 2018',
					time: '14:00 - 16:30',
					price: '80 uah'
				}
			],
			eventsPast: [
				{
					title: 'Insta lunch with @mashawakka',
					subtitle: 'Share secrets, filming and processing',
					text: 'Ea dolor ullamco dolore exercitation sint est sunt occaecat reprehenderit proident minim. Veniam occaecat ipsum minim occaecat amet commodo sit sunt nisi. Veniam Lorem quis amet ipsum nostrud est incididunt cillum qui. Ad eiusmod consequat nisi irure nostrud irure ad nisi nulla.',
					date: '13 May, 2018',
					time: '14:00 - 16:30',
					price: '80 uah'
				},
				{
					title: 'Machine Learning Bootcamo. Phase 1',
					subtitle: 'Peer-to-peer studying TensorFlow',
					text: 'Ea dolor ullamco dolore exercitation sint est sunt occaecat reprehenderit proident minim. Veniam occaecat ipsum minim occaecat amet commodo sit sunt nisi. Veniam Lorem quis amet ipsum nostrud est incididunt cillum qui. Ad eiusmod consequat nisi irure nostrud irure ad nisi nulla.',
					date: '6 May, 2018',
					time: '10:00 - 13:00',
					price: 'Free'
				}
			],
			style: {
				hideText: {
					transitionTimingFunction: 'cubic-bezier(0, 1, 0, 1)',
					maxHeight: '3rem'
				},
				showText: {
					maxHeight: '20rem'
				},
				triangle: {
					borderColor: "transparent",
					borderBottomColor: "#898989",
					top: '10%'
				},
				activeButton: {
					color: '#ffffff'
				}
			},
			toggleIndex: -1,
			toggleButton: true
		}
	},
	methods: {
		toggleText(index) {
			window.console.log(index);
		}
	}
}
</script>

<style lang="scss">
@import '../assets/scss/style.scss';

.events {
    width: 100%;
    @extend %flex-col;
    align-items: center;
    justify-items: center;
	padding-top: 7rem;
	@media (orientation: landscape) and (max-width: 820px) {
		padding-top: 20pt;
	}
	@media (max-width: 600px) {
		padding-top: 0;
		padding-bottom: 25pt;
	}
	&__wrapper {
        width: 100%;
        display: flex;
        padding: 0 112px;
		@media (orientation: landscape) and (max-width: 820px) {
			padding: 0 0 0 56pt;
		}
		@media (max-width: 920px) {
            padding: 0 5% 0 112px;
        }
        @media (max-width: 600px) {
            justify-content: flex-start;  
            padding: 0;
        }
	}
	&__main {
		overflow: hidden;
	}
	&__inner {
		flex: 0 0 40%;
		min-width: 576px;
        margin: 0 0 0 10%;
        @extend %flex-col-c;
        align-items: flex-start;
        @media (max-width: 920px) {
            margin: 0 0 0 5%; 
        }
		@media (max-width: 760px) {
			min-width: auto;
			flex: 1 1 100%;
		}
        @media (max-width: 600px) {
			margin: 0;
			padding: 0;
		}
	}
    &__header {
		width: 100%;
		margin-bottom: 4rem;
		@media (max-width: 600px) {
			margin-bottom: 57pt;
			padding: 0 32pt;
		}
		@media (max-width: 375px) {
			margin-bottom: 51pt;
			padding: 0 26pt;
		}
		@media (max-width: 320px) {
			margin-bottom: 45pt;
			padding: 0 22pt;
        }
    }
    &__title {
        grid-area: title;
        font-family: $title-font;
        font-size: 5rem;
        font-weight: 500;
        text-align: left;
		color: $TEXT-COLOR;
		position: relative;
		left: -2px;
        white-space: nowrap;
        margin: 0 0 2.9rem 0;
        @media (max-width: 600px) {
            align-self: flex-start;
			text-align: left;
			font-size: 2.6rem;
			margin-bottom: 32pt;
		}
		@media (max-width: 375px) {
           margin-bottom: 28pt;
		}
		@media (max-width: 320px) {
           margin-bottom: 24pt;
        }
	}
	&__subtitle {
		font-size: 0.8125rem;
		color: $TEXT-COLOR;
		font-family: $base-font;
		line-height: 2;
		@media (max-width: 600px) {
           font-size: 0.85rem;
		}
		@media (max-width: 375px) {
           font-size: 0.8rem;
		}
		@media (max-width: 320px) {
           font-size: 0.75rem;
        }
	}
	&__section {
		padding: 4rem 0 7.5rem 0;
		@media (max-width: 600px) {
			padding: 24pt 24pt;
		}
		@media (max-width: 375px) {
			padding: 24pt 20pt;
		}
		@media (max-width: 320px) {
			padding: 24pt 16pt;
        }
	}
	&__link-page {
		&--meeting-room {
			background-image: url('../assets/image/meeting-room.jpg');
		}
		&--events {
			background-image: url('../assets/image/events.jpg');
		}
	}
	&__nav {
		@media (max-width: 600px) {
			padding: 0 16pt;
		}
		@media (max-width: 375px) {
			padding: 0 12pt;
		}
		@media (max-width: 320px) {
			padding: 0 8pt;
        }
	}
	&__nav-inner {
		@extend %flex-row;
		@media (max-width: 600px) {
			justify-content: space-around;
		}
	}
	&__button {
		font-family: $base-font;
		font-size: 0.875rem;
		font-weight: 700;
		text-align: left;
		color: $GREY;
		text-decoration: none;
		transition: color 0.2s ease-in-out;
		padding: 0 1.6rem 2rem;
		@media (max-width: 600px) {
			text-transform: uppercase;
			letter-spacing: 0.5pt;
			padding: 0 0 17pt;
		}
		&:hover {
			color: $LIGHT-GREY;
		}
		&:last-child {
			padding-right: 0;
		}
	}
	&__nav-line {
		width: 100%;
		height: 1px;
		background-color: $MIDDLE-GREY;
		position: relative;
	}
	&__nav-active {
		width: 9rem;
		height: 2px;
		position: absolute;
		background-color: $MERGE-MAIN-COLOR;
		bottom: 0;
		transition: transform 0.2s ease-in-out;
		@media (max-width: 600px) {
			width: 50%;
		}
		&--translate {
			transform: translateX(8.8rem);
			@media (max-width: 600px) {
				transform: translateX(100%);
			}
		}
	}
}
.event {
	padding: 2rem;
	border: 1px solid $DARK-GREY;
	border-radius: 3px;
	@extend %flex-row;
	margin-bottom: 3.5rem;
	@media (max-width: 760px) {
		flex-direction: column;
		padding: 18pt 24pt;
	}
	@media (max-width: 600px) {
		border-color: $GREY;
		border-radius: 6px;
		margin-bottom: 32pt;
	}
	&:last-child {
		margin: 0;
	}
	&__content {
		flex: 0 0 75%;
		padding-right: 2rem;
		border-right: 1px solid $DARK-GREY;
		@extend %flex-col;
		align-items: flex-start;
		@media (max-width: 760px) {
			border-right: none;
			border-bottom: 1px solid $MIDDLE-GREY;
			padding: 0 0 13pt 0;
		}
	}
	&__info {
		flex: 0 0 25%;
		padding-left: 2rem;
		display: grid;
		grid-template-rows: repeat(3, auto);
		align-content: center;	
		@media (max-width: 760px) {
			grid-template-rows: none;
			grid-template-columns: repeat(3, auto);
			justify-content: space-between;	
			padding: 13pt 0 0 0;
		}
		@media (max-width: 600px) {
			grid-template-rows: repeat(2, auto);
			grid-template-columns: auto 1fr;
			grid-column-gap: 8pt;
			grid-row-gap: 13pt;
			justify-content: space-between;	
			align-items: center;
			padding: 16pt 0 0 0;
		}
	}
	&__title {
		font-family: $title-font;
		font-size: 1.5rem;
		font-weight: 500;
		text-align: left;
		color: $TEXT-COLOR;
		margin-bottom: 0.15rem;
		@media (max-width: 600px) {
			font-size: 1.3rem;
			margin-bottom: 6pt;
		}
		@media (max-width: 375px) {
			font-size: 1.2rem;
		}
		@media (max-width: 320px) {
			font-size: 1.05rem;
		}
	}
	&__subtitle {
		font-family: $base-font;
		font-size: 0.81rem;
		font-weight: 500;
		line-height: 1.9;
		text-align: left;
		color: $GREY;
		margin-bottom: 0.7rem;
		@media (max-width: 600px) {
			font-size: 0.85rem;
			letter-spacing: 0.5pt;
			color: $LIGHT-GREY;
			margin: 0;
		}
		@media (max-width: 375px) {
			font-size: 0.75rem;
		}
		@media (max-width: 320px) {
			font-size: 0.65rem;
		}
	}
	&__text {
		font-family: $base-font;
		font-size: 0.63rem;
		font-weight: 500;
		line-height: 1.8;
		text-align: left;
		color: $TEXT-COLOR;
		max-height: 3rem;
		transition: max-height 1s ease-in-out;
		overflow: hidden;
		margin-bottom: 0.6rem;
		height: auto;
		@media (max-width: 600px) {
			display: none;
		}
	}
	&__date {
		font-family: $base-font;
		font-weight: 700;
		font-size: 0.875rem;
		color: $TEXT-COLOR;
		text-align: left;
		margin-bottom: 0.8rem;
		@media (max-width: 760px) {
			margin: 0;
		}
		@media (max-width: 600px) {
			letter-spacing: 0.5pt;
			font-size: 0.95rem;
		}
		@media (max-width: 375px) {
			font-size: 0.85rem;
		}
		@media (max-width: 320px) {
			font-size: 0.75rem;
		}
	}
	&__time {
		font-family: $base-font;
		font-weight: 700;
		font-size: 0.875rem;
		color: $GREY;
		text-align: left;
		margin-bottom: 1.6rem;
		@media (max-width: 760px) {
			margin: 0;
		}
		@media (max-width: 600px) {
			letter-spacing: 0.5pt;
			font-size: 0.8rem;
		}
		@media (max-width: 375px) {
			font-size: 0.7rem;
		}
		@media (max-width: 320px) {
			font-size: 0.6rem;
		}
	}
	&__price {
		font-family: $base-font;
		font-weight: 700;
		font-size: 0.875rem;
		color: $TEXT-COLOR;
		text-align: left;
		@media (max-width: 600px) {
			letter-spacing: 0.5pt;
			text-transform: uppercase;
			font-size: 0.95rem;
		}
		@media (max-width: 375px) {
			font-size: 0.85rem;
		}
		@media (max-width: 320px) {
			font-size: 0.75rem;
		}
	}
	&__info-button {
		display: none;
		outline: none;
		border: none;
		background-color: transparent;
		justify-self: end;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		flex-wrap: nowrap;
		@media (max-width: 600px) {
			display: flex;
		}
	}
	&__info-button-text {
		text-transform: uppercase;
		color: $MERGE-MAIN-COLOR;
		font-family: $base-font;
		font-weight: 700;
		font-size: 0.95rem;
		margin-right: 8pt;
		@media (max-width: 375px) {
			font-size: 0.85rem;
		}
		@media (max-width: 320px) {
			font-size: 0.75rem;
		}
	}
	&__info-button-img {
		fill: $MERGE-MAIN-COLOR;
		height: 14pt;
		width: 16pt;
		@media (max-width: 375px) {
			height: 12pt;
			width: 14pt;
		}
		@media (max-width: 320px) {
			height: 10pt;
			width: 12pt;
		}
	}
	&__button-more {
		font-family: $base-font;
		font-size: 0.5rem;
		font-weight: 700;
		line-height: 2;
		letter-spacing: 0.5px;
		text-align: left;
		color: $GREY;
		text-transform: uppercase;
		text-decoration: none;
		outline: none;
		position: relative;
		margin-bottom: 1.1rem;
		@media (max-width: 600px) {
			display: none;
		}
	}
	&__triangle {
		right: -0.8rem;
		top: 30%;
		border: solid transparent;
		height: 0;
		width: 0;
		position: absolute;
		pointer-events: none;
		border-color: transparent;
		border-top-color: $GREY;
		border-width: 4px;
	}
	&__button-details {
		padding: 14px 1.5rem;
		background-color: $BUTTON-COLOR;
		outline: none;
		border: none;
		text-align: center;
		border-radius: 3px;
		@extend %flex-row-c;
		flex-flow: nowrap;
		position: relative;
		z-index: 2;
		@media (max-width: 600px) {
			display: none;
		}
		&:active .event__button-text {
			color: $LIGHT-GREY;
		}
		&:active .event__button-img {
			fill: $LIGHT-GREY;
		}
		&:focus .event__button-text::before {
			visibility: visible;
		}
	}
	&__button-text {
		text-align: center;
		@extend %flex-row-c;
		align-items: center;
		flex-flow: nowrap;
		text-transform: uppercase;
		font-family: $base-font;
		font-size: 0.625rem;
		line-height: 1;
		font-weight: 700;
		letter-spacing: 0.7px;
		color: $TEXT-COLOR;
		white-space: nowrap;
		&::before {
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
	}
	&__button-img {
        stroke: none;
        height: 14px;
        width: 16px;
        fill: $TEXT-COLOR;
        margin-left: 10px;
    }
}
</style>
