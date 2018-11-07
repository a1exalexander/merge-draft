<template>
<div class="coworking">
<!-- 2 wrappers to implement dual adaptive indents -->
	<div class="coworking__wrapper">
		<div class="coworking__inner">
			<header class="coworking__header">
				<h1 class="coworking__title">Coworking<br>Space
				</h1>
				<button-membership @click.native='becomeMember'></button-membership>
			</header>
			<section class="view-360">
				<div class="view-360__row">
					<button class="view-360__button">360° view</button>
				</div>
				<div class="view-360__inner">
					<img src="../assets/image/merge-4.png" alt="image" class="view-360__image">
				</div>
			</section>
			<section class="beneffits">
				<div class="beneffits__label">
					<img src="../assets/image/wi-fi.svg" alt="wi-fi" class='beneffits__image'>
					<p class="beneffits__text">Super-fast Internet
					</p>
				</div>
				<div class="beneffits__label">
					<img src="../assets/image/meeting-room.svg" alt="wi-fi" class='beneffits__image'>
					<p class="beneffits__text">Meeting Room
					</p>
				</div>
				<div class="beneffits__label">
					<img src="../assets/image/printer.svg" alt="wi-fi" class='beneffits__image'>
					<p class="beneffits__text">Wireless Printer/Scanner/Copier
					</p>
				</div>
				<div class="beneffits__label">
					<img src="../assets/image/unlimited-coffee-tea.svg" alt="wi-fi" class='beneffits__image'>
					<p class="beneffits__text">Unlimited coffee, tea, snacks
					</p>
				</div>
				<div class="beneffits__label">
					<img src="../assets/image/microwave.svg" alt="wi-fi" class='beneffits__image'>
					<p class="beneffits__text">Kitchen with a microvawe and fridge
					</p>
				</div>
				<div class="beneffits__label">
					<img src="../assets/image/shower.svg" alt="wi-fi" class='beneffits__image'>
					<p class="beneffits__text">Shower
					</p>
				</div>
				<div class="beneffits__label">
					<img src="../assets/image/merge-dots.svg" alt="wi-fi" class='beneffits__image'>
					<p class="beneffits__text">Merge community
					</p>
				</div>
				<div class="beneffits__button">
					<button-membership @click.native='becomeMember'></button-membership>
				</div>
			</section>
			<section class="coworking__slider">
				<button class="coworking__label-button">Photos</button>
				<slider></slider>
			</section>
		</div>
	</div>
	<section class="next-page-nav">
		<router-link to='/meeting-room' class="next-page-nav__link next-page-nav__link--meeting-room">
			<div class="next-page-nav__inner">
				<p class="next-page-nav__text">MEETING ROOM</p>
			</div>
		</router-link>
		<router-link to='/events' class="next-page-nav__link next-page-nav__link--events">
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
        @media (max-width: 920px) {
            padding: 0 5%; 
        }
        @media (max-width: 600px) {
            padding: 0;
            
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
        .button-membership {
            grid-area: button;
            @media (max-width: 1000px) {
                justify-self: start;
            }
            @media (max-width: 600px) {
                text-align: center;
                justify-self: center;
            }
            @media (max-width: 450px) {
                width: 90%;
            }
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
            align-self: center;
            text-align: center;
        }
        @media (max-width: 500px) {
            font-size: 3rem;
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
.view-360 {
	@extend %flex-col;
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
	width: 100%;
	padding: 5rem 0;
	border: {
		top: $MIDDLE-GREY 1px solid;
		bottom: $MIDDLE-GREY 1px solid;
	} 
	display: grid;
	grid-template-columns: repeat(2, auto);
	grid-template-rows: repeat(5, auto);
	grid-row-gap: 2.5rem;
	grid-column-gap: 5rem;
	justify-items: start;
	justify-content: start;
	@media (max-width: 750px) {
		padding: 2rem 1rem;
		justify-content: stretch;
		grid-template-columns: none;
		grid-template-rows: repeat(8, auto);
	}
	&__label {
		@extend %flex-row;
		align-items: center;
	}
	&__image {
		margin-right: 2rem;
		width: 40px;
		height: 40px;
	}
	&__img {
		margin-right: 2rem;
		width: 40px;
		height: 40px;
	}
	&__text {
		max-width: 170px;
		font-family: $title-font;
		font-size: 16px;
		font-weight: 500;
		text-align: left;
		color: $TEXT-COLOR;
		white-space: normal;
		@media (max-width: 750px) {
			max-width: 100%;
		}
	}
	&__button {
		padding-top: 2rem;
		grid-area: 5 / 1 / 6 / 2;
		@media (max-width: 750px) {
			grid-area: 8 / 1 / 9 / 2;
		}
		@media (max-width: 600px) {
			justify-self: center;
			width: 100%;
		}
		.button-membership {
            @media (max-width: 450px) {
                width: 100%;
            }
        }
	}

}
</style>
