<template>
<nav class="navigation navigation--border">
    <svg class="navigation__logo">
        <use xlink:href='#logo' />
    </svg>
    <section class="button-menu__wrapper">
        <div class="button-menu__tooltip" v-if="tooltip">
            <span class="button-menu__text">
                MENU
            </span> 
            <button class="button-menu__tooltip-close" @click="setCookie">
                <svg class="button-menu__tooltip-image">
                    <use xlink:href='#close' />
                </svg>
            </button>					
        </div>
        <button id='go-to-menu' class="button-menu" @click='goToMenu'>
            <div class="button-menu__item"></div>
        </button>
    </section>
    <section class="social-networks">
        <a href="#" class="social-networks__link">
            <svg class="social-networks__img">
                <use xlink:href='#telegram' />
            </svg>
            <div class="social-networks__outside"></div>
        </a>
        <a href="#" class="social-networks__link">
            <svg class="social-networks__img">
                <use xlink:href='#facebook' />
            </svg>
            <div class="social-networks__outside"></div>
        </a>
        <a href="#" class="social-networks__link">
            <svg class="social-networks__img">
                <use xlink:href='#instagram' />
            </svg>
            <div class="social-networks__outside"></div>
        </a>
    </section>
    <svg style="display: none">
      <symbol id='logo' viewBox="0 0 31 40">
        <path fill-rule="evenodd" d="M20.4593069,32.8365086 L23.8888332,29.1227295 L31,36.2862209 L27.570731,40 L20.4593069,32.8365086 Z M15.4625816,0 L26.0850832,10.7005349 L18.0964043,10.7005349 L18.0964043,25.4662469 L3.77682656,39.9891419 L0,36.2971308 L12.693955,23.3086219 L12.693955,10.7005349 L4.89641986,10.7005349 L15.4625816,0 Z"
        id="Combined-Shape"></path>
      </symbol>
      <symbol id='close' viewBox="0 0 24 24">
        <polygon id="Shape" points="19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12"></polygon>
      </symbol>
      <symbol id='telegram' viewBox="0 0 448 512">
        <path d="M446.7 98.6l-67.6 318.8c-5.1 22.5-18.4 28.1-37.3 17.5l-103-75.9-49.7 47.8c-5.5 5.5-10.1 10.1-20.7 10.1l7.4-104.9 190.9-172.5c8.3-7.4-1.8-11.5-12.9-4.1L117.8 284 16.2 252.2c-22.1-6.9-22.5-22.1 4.6-32.7L418.2 66.4c18.4-6.9 34.5 4.1 28.5 32.2z"></path>
      </symbol>
      <symbol id='facebook' viewBox="0 0 264 512">
        <path d="M76.7 512V283H0v-91h76.7v-71.7C76.7 42.4 124.3 0 193.8 0c33.3 0 61.9 2.5 70.2 3.6V85h-48.2c-37.8 0-45.1 18-45.1 44.3V192H256l-11.7 91h-73.6v229"></path>
      </symbol>
      <symbol id='instagram' viewBox="0 0 448 512">
        <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path>
      </symbol>
    </svg>
</nav>
</template>

<script>

export default {
    name: 'navigation',
    data () {
        return {
            tooltip: true
        }
    },
    methods: {
        goToMenu () {
            this.$router.push('/menu');
        },
        setCookie () {
            this.$cookies.set("tooltipCookie","tooltipCookie","1y");
            return this.tooltip = false;
        }
    },
    beforeMount: function() {
        if(this.$cookies.get("tooltipCookie")) {
            return this.tooltip = false;
        }
	}
}
</script>

<style lang="scss">
@import '../assets/scss/style.scss';

.navigation {
    padding: 48px 0;
    width: 112px;
    height: 100vh;
    z-index: 10;
    background-color: $MAIN-DARK-COLOR;
    position: fixed;
    top: 0;
    left: 0;
    display: grid;
    grid-template-rows: repeat(3, 1fr);
    align-items: center;
    justify-items: center;
    align-content: center;	
    &--border {
        border-right: 1px solid $DARK-GREY;
    }
    @media (max-width: 600px) {
        width: 100%;
        height: 60px;
        padding: 0;
        left: 0;
        right: 0;
        grid-template-rows: none;
        grid-template-columns: repeat(2, 1fr);
        &--border {
            border-right: none;
            border-bottom: 1px solid $DARK-GREY;
        }
    }
    @media (max-height: 500px)  {
        width: 80px;
        height: 100vh;
        padding: 0;
        left: 0;
        top: 0;
        bottom: 0;
        grid-template-columns: none;
        grid-template-rows: repeat(2, 1fr);
        &--border {
            border-right: 1px solid $DARK-GREY;
            border-bottom: none;
        }
    }
    &__logo {
    fill: $MERGE-MAIN-COLOR;
    width: 31px;
    height: 40px;
    align-self: start;
    animation-name: rotateIn;
    animation-duration: 2s;
    animation-timing-function: ease-in-out;
    @media (max-width: 600px), (max-height: 500px) {
        grid-column: 1;
        grid-row: 1;
        align-self: center;
    }
}
}
.button-menu {
    height: 24px;
    width: 24px;
    outline: none;
    border: none;
    background-color: transparent;
    position: relative;
    padding: 0 2px;
    border-radius: 3px;
   
    &:focus {
        background-color: $BUTTON-COLOR;
        height: 32px;
        width: 32px;
        transform: rotate(90deg);
        transition: transform 0.2s ease-in-out,
            background-color 0.4s ease-in-out;
    }
    &:focus &__item {
        height: 0;
       
        &::before {
            left: 9px;
            top: 7px;
            transform-origin: center left;
            transform: rotate(45deg);
            transition: transform 0.2s linear;
            width: 20px;
            background-color: $GREY;
        }
        &::after {
            left: 9px;
            bottom: 7px;
            transform-origin: center left;
            transform: rotate(-45deg);
            transition: transform 0.2s linear;
            width: 20px;
            background-color: $GREY;
        }
    }
    &__wrapper {
        cursor: default;
        @extend %flex-col-c;
        height: 30px;
        width: 30px;
        position: relative;
        @media (max-width: 600px) and (orientation: portrait) {
            grid-column: 2;
            animation-name: slideRight;
            animation-duration: 0.5s;
            animation-timing-function: ease-in-out;
        }
        @media (max-height: 500px) {
            grid-column: 1;
            grid-row: 2;
        }
    
    }
    &__tooltip {
        height: 24px;
        width: 64px;
        background-color: $DARK-GREY;
        border-radius: 3px; 
        top: -120%;
        @extend %flex-row;
        justify-content: space-evenly;
        align-items: center;
        position: absolute;
        z-index: 10001;
        animation-name: fadeIn;
        animation-timing-function: ease-in-out;
        animation-duration: 3s;
        @media (max-width: 600px), (max-height: 500px) {
            display: none;
        }
        &:after {
            top: 100%;
            left: 50%;
            border: solid transparent;
            content: '';
            position: absolute;
            pointer-events: none;
            border-color: transparent;
            border-top-color: $DARK-GREY;
            border-width: 5px;
            margin-left: -0.5rem;
        }
    }
    &__tooltip-close {
        width: 14px;
        height: 14px;
        background-color: transparent;
        outline: none;
        border: none;
        cursor: pointer;
        @extend %flex-row-c;
        align-items: center;
        @media (min-width: 601px) {
            &:hover .button-menu__tooltip-image {
                fill: $TEXT-COLOR;
            }
        }
    }
    &__text {
        font-size: 0.625rem;
        font-weight: 500;
        color: $TEXT-COLOR;
        text-transform: uppercase;
        font-family: $base-font;
    }
    &__tooltip-image {
        width: 100%;
        height: 100%;        
		opacity: 0.65;
		fill: $LIGHT-GREY;
        pointer-events: none;
        transition: all ease-in-out 0.1s;
	}
	
    &__item {
        height: 2px;
        background-color: $MERGE-MAIN-COLOR;
        width: 10px;
     
        &::before {
            content: '';
            position: absolute;
            height: 2px;
            background-color: $MERGE-MAIN-COLOR;
            width: 14px;
            top: 5px;
            left: 2px;
        }
        &::after {
            content: '';
            position: absolute;
            height: 2px;
            background-color: $MERGE-MAIN-COLOR;
            width: 18px;
            bottom: 5px;
            left: 2px;
        }
    }

}
.social-networks {
    align-self: end;
    display: grid;
    grid-template-rows: repeat(3, auto);
    grid-row-gap: 1.5em;
    align-items: center;
    @media (max-width: 600px), (max-height: 500px) {
        display: none;
    }
    &__link {
        border-radius: 3px;
        text-decoration: none;
        width: 24px;
        height: 24px;
        @extend %flex-col-c;
        background-color: $BUTTON-COLOR;
        transition: background-color ease-in-out 0.1s;
        position: relative;
        z-index: 2;
         &:focus {
            background-color: $BUTTON-COLOR;
        }
        &:focus .social-networks__img {
            fill: $TEXT-COLOR; 
        }
        &:focus .social-networks__outside {
            visibility: visible;
        }
        @media (min-width: 600px) {
            &:hover {
                background-color: $GREY;
            }
            &:hover .social-networks__img {
                fill: $HOVER-ICON-COLOR;
            }
        }
        @media (max-width: 600px), (max-height: 500px) {
            width: 42px;
            height: 42px;
        }
        &:active {
            background-color: $BUTTON-COLOR;
        }
        &:active .social-networks__img {
            fill: $GREY;
        }
    }

    &__img {
        width: 16px;
        height: 16px;
        fill: $TEXT-COLOR;
        transition: fill ease-in-out 0.1s;
        @media (max-width: 600px), (max-height: 500px) {
            width: 32px;
            height: 32px;
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
    
    &--hello {
        display: none;
        @media (max-width: 600px), (max-height: 500px) {
            padding-top: 2rem;
            display: grid;
            grid-template-columns: repeat(3, auto);
            grid-column-gap: 3rem;
            align-items: center;
            grid-area: social;
        }
    }
}

</style>
