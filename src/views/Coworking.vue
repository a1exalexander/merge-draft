<template>
<div class="coworking">
<!-- 2 wrappers to implement dual adaptive indents -->
	<div class="coworking__wrapper">
		<div class="coworking__inner">
			<header class="coworking__header animated d06 delay-02s fadeInLeft">
				<h1 class="coworking__title">Coworking<br>space
				</h1>
				<button-membership class="coworking__button coworking__button--header" @click.native='becomeMember'></button-membership>
			</header>
			<section class="view-360 animated d06 delay-03s fadeInLeft">
				<div class="view-360__row">
					<button class="view-360__button">360° view</button>
				</div>
				<div class="view-360__inner">
					<img src="../assets/image/merge-4.png" alt="image" class="view-360__image">
				</div>
			</section>
			<section class="beneffits animated d06 delay-04s fadeInLeft">
				<div class="beneffits__label beneffits__label--wifi">
					<img src="../assets/image/wi-fi.svg" alt="wi-fi" class='beneffits__image'>
					<p class="beneffits__text">Super-fast Internet
					</p>
				</div>
				<div class="beneffits__label beneffits__label--meeting">
					<img src="../assets/image/meeting-room.svg" alt="meeting room" class='beneffits__image'>
					<p class="beneffits__text">Meeting Room
					</p>
				</div>
				<div class="beneffits__label beneffits__label--printer">
					<img src="../assets/image/printer.svg" alt="printer" class='beneffits__image'>
					<p class="beneffits__text">Wireless Printer/Scanner/ Copier
					</p>
				</div>
				<div class="beneffits__label beneffits__label--cofee">
					<img src="../assets/image/unlimited-coffee-tea.svg" alt="cofee and tee" class='beneffits__image'>
					<p class="beneffits__text">Coffee, tea, snacks
					</p>
				</div>
				<div class="beneffits__label beneffits__label--microwave">
					<img src="../assets/image/microwave.svg" alt="microwave" class='beneffits__image'>
					<p class="beneffits__text">Kitchen with a microwave and fridge
					</p>
				</div>
				<div class="beneffits__label beneffits__label--shower">
					<img src="../assets/image/shower.svg" alt="shower" class='beneffits__image'>
					<p class="beneffits__text">Shower
					</p>
				</div>
				<div class="beneffits__label beneffits__label--merge">
					<img src="../assets/image/merge-dots.svg" alt="merge" class='beneffits__image'>
					<p class="beneffits__text">Merge community
					</p>
				</div>
				<div class="beneffits__button animated d06 delay-05s fadeInLeft">
					<button-membership @click.native='becomeMember'></button-membership>
				</div>
			</section>
			<section class="coworking__slider animated d06 delay-06s fadeInLeft">
				<button class="coworking__label-button">Photos</button>
				<slider></slider>
			</section>
		</div>
	</div>
	<section class="next-page-nav animated d06 delay-07s fadeInLeft">
		<router-link to='/meeting-room' class="next-page-nav__link coworking__link-page coworking__link-page--meeting-room">
			<div class="next-page-nav__inner">
				<p class="next-page-nav__text">MEETING ROOM</p>
			</div>
		</router-link>
		<router-link to='/events' class="next-page-nav__link coworking__link-page coworking__link-page--events">
			<div class="next-page-nav__inner">
				<p class="next-page-nav__text">Events</p>
			</div>
		</router-link>
	</section>
	
</div>
</template>

<script>
import ButtonMembership from '@/components/buttons/ButtonMembership.vue';
import Slider from '@/components/Slider.vue';

export default {
	name: 'coworking',
	components: {
		ButtonMembership,
		Slider
	},
	methods: {
		becomeMember() {
			this.$router.push('/booking-workplace');
		}
	}
}
</script>

<style lang="scss">
@import '../assets/scss/style.scss';
.coworking {
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
	&__inner {
        width: 100%;
        padding: 0 10%;
        @extend %flex-col-c;
        align-items: flex-start;
        @media (max-width: 920px) {
            padding: 0 5%; 
        }
        @media (max-width: 600px) {
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			align-items: stretch;
			padding: 0 0 32pt 0;
			flex: 1 0 100%;
		}
	}
	&__button {
		&--header {
			grid-area: button;
            @media (max-width: 1000px) {
                justify-self: start;
            }
			@media (max-width: 600px) {
				display: none;
			}
		}
	}
    &__header {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(2, auto);
        grid-template-rows: 3fr 2fr;
        grid-template-areas: 
            'title button'
            'title .';
        grid-column-gap: 1rem;
        align-items: center;
        justify-content: space-between;
        margin: 0 0 5rem 0;
        @media (max-width: 1000px) {
            grid-template-areas: 
                'title title'
                'button button';
            justify-content: stretch;
		}
		@media (max-width: 600px) {
			order: 0;
			display: block;
			margin-bottom: 40pt;
			padding: 0 32pt;
		}
		@media (max-width: 375px) {
			margin-bottom: 34pt;
			padding: 0 26pt;
		}
		@media (max-width: 320px) {
			margin-bottom: 30pt;
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
        white-space: nowrap;
        margin: 0;
        @media (max-width: 990px) {
            margin-bottom: 2rem;
        }
        @media (max-width: 600px) {
            align-self: flex-start;
			text-align: left;
			font-size: 2.6rem;
			margin: 0;
        }
    }
    &__slider {
		order: 1;
        @extend %flex-col;
        align-items: flex-start;
        padding-top: 5rem;
        padding-bottom: 3rem;
		width: 100%;
		@media (max-width: 600px) {
			padding: 0;
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
		@media (max-width: 600px) {
            display: none;
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
}
.view-360 {
	@extend %flex-col;
	@media (max-width: 600px) {
		display: none;
	}
	&__row {
		@extend %flex-row;
		padding-bottom: 1.5rem;
		@media (max-width: 450px) {
			justify-content: center;
		}
	}
	&__button {
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
		&:hover {
			color: white;
		}
	}
	&__inner {
		cursor: pointer;
		width: 100%;
		padding-bottom: 5rem;
	}
	&__image {
		width: 100%;
		height: auto;
	}
}
.beneffits {
	width: 50%;
	min-width: 600px;
	padding: 5rem 0;
	border: {
		top: $MIDDLE-GREY-OPACITY 1px solid;
		bottom: $MIDDLE-GREY-OPACITY 1px solid;
	} 
	display: grid;
	grid-template-columns: repeat(2, auto);
	grid-template-rows: repeat(5, auto);
	grid-row-gap: 2.5rem;
	grid-column-gap: 4rem;
	justify-items: start;
	justify-content: start;
	@media (max-width: 750px) {
		width: 100%;
		min-width: auto;
	}
	@media (max-width: 600px) {
		grid-template-columns: repeat(2, 47.5%);
		padding: 30pt 32pt 0;
		order: 3;
		border: none;
		grid-row-gap: 30pt;
		grid-column-gap: 5%;
	}
	@media (max-width: 375px) {
		padding: 26pt 26pt 0;
	}
	@media (max-width: 320px) {
		padding: 22pt 22pt 0;
	}
	&__label {
		@extend %flex-row;
		align-items: center;
		@media (max-width: 750px) {
			flex-direction: column;
			align-items: flex-start;
			&--printer {
				grid-area: 1 / 2 / 2 / 3;
			}
			&--meeting {
				grid-area: 2 / 2 / 3 / 3;
			}
			&--microwave {
				grid-area: 2 / 1 / 3 / 2;
			}
		}
	}
	&__image {
		margin-right: 2rem;
		max-width: 40px;
		height: 40px;
		@media (max-width: 750px) {
			margin: 0 0 5pt 0;
		}
	}
	&__text {
		max-width: 170px;
		font-family: $title-font;
		font-size: 1rem;
		font-weight: 500;
		text-align: left;
		line-height: 1.4;
		color: $TEXT-COLOR;
		@media (max-width: 750px) {
			max-width: 100%;
			font-family: $base-font;
			font-size: 1.1rem;
			font-weight: 400;
			margin: 0;
			letter-spacing: 0.3pt;
		}
		@media (max-width: 375px) {
			font-size: 1.05rem;
		}
		@media (max-width: 320px) {
			font-size: 0.88rem;
		}
	}
	&__button {
		padding-top: 2rem;
		grid-area: 5 / 1 / 6 / 2;
		@media (max-width: 600px) {
			grid-area: 5 / 1 / 6 / 3;
			width: 100%;
			padding-top: 30pt;
			border-top: $MIDDLE-GREY-OPACITY 1px solid;
		}
		.button-membership {
            @media (max-width: 600px) {
                width: 100%;
            }
        }
	}

}
</style>
