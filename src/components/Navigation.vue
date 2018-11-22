<template>
<nav class="navigation navigation--border" :style='onTransparent'>
    <router-link to='/' class='navigation__logo-wrapper' :style='onVisibility'>
        <svg class="navigation__logo" :class="{'navigation__logo--white': logoColor}">
            <use xlink:href='#logo'/>
        </svg>
    </router-link>
    <router-link href="#" to='/menu' class="navigation__menu-link">MENU</router-link>
    <section class="button-menu__wrapper">
        <div class="button-menu__tooltip" v-if="tooltip">
            <span class="button-menu__text">
            {{ $t('navigation.tooltip') }}
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
    <social-networks class='navigation__social' :style='onVisibility'></social-networks>
    <svg style="display: none">
      <symbol id='logo' viewBox="0 0 31 40">
        <path fill-rule="evenodd" d="M20.4593069,32.8365086 L23.8888332,29.1227295 L31,36.2862209 L27.570731,40 L20.4593069,32.8365086 Z M15.4625816,0 L26.0850832,10.7005349 L18.0964043,10.7005349 L18.0964043,25.4662469 L3.77682656,39.9891419 L0,36.2971308 L12.693955,23.3086219 L12.693955,10.7005349 L4.89641986,10.7005349 L15.4625816,0 Z"
        id="Combined-Shape"></path>
      </symbol>
      <symbol id='close' viewBox="0 0 24 24">
        <polygon id="Shape" points="19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12"></polygon>
      </symbol>
    </svg>
</nav>
</template>

<script>
import SocialNetworks from '@/components/SocialNetworks.vue';

export default {
    name: 'navigation',
    props: {'showNav': Boolean},
    components: {
        SocialNetworks
    },
    data () {
        return {
            tooltip: true,
            visibility: {
                visibility: 'hidden',
                opacity: '0',
                transition: 'opacity linear 0.2s, visibility linear 0.2s'
            },
            transparent: {
                backgroundColor: 'transparent',
                border: 'none'
            },
            onVisibility: null,
            onTransparent: null
        }
    },
    methods: {
        goToMenu() { 
           this.$router.push('/menu');
        },
        setCookie() {
            this.$cookies.set("tooltipCookie","tooltipCookie","1y");
            return this.tooltip = false;
        }
    },
    beforeMount() {
        if(this.$cookies.get("tooltipCookie")) {
            return this.tooltip = false;
        }
    },
    computed: {
        logoColor() {
            let name = this.$route.name;
            if (name == 'Hello') {
                return true;
            }
            return false;
        }
    },
    watch: {
        showNav(boolean) {
            if(!boolean) {
                this.onVisibility = this.visibility;
                this.onTransparent = this.transparent;
            } else {
                this.onVisibility = null;
                this.onTransparent = null;
            }
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
    @media (orientation: landscape) and (max-width: 820px) {
        width: 56pt;
        padding: 24pt 0 16pt;
    }	
    &--border {
        border-right: 1px solid $DARK-GREY;
    }
    @media (max-width: 600px) {
        position: static;
        width: 100%;
        padding: 32pt 32pt 22pt;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        height: auto;
        &--border {
            border: none;
        }
    }
    @media (max-width: 375px) {
        padding: 26pt 26pt 20pt;
    }
    @media (max-width: 320px) {
        padding: 22pt 22pt 16pt;
    }
    &__logo {
        fill: $MERGE-MAIN-COLOR;
        width: 31px;
        height: 40px;
        @media (max-width: 600px) {
            width: 24pt;
            height: 32pt;
        }
        &--white {
            @media (max-width: 600px) {
                fill: $TEXT-COLOR;
            }    
        }
    }
    &__menu-link {
        display: none;
        font-family: $base-font;
        font-size: 12pt;
        color: $MERGE-MAIN-COLOR;
        text-decoration: none;
        letter-spacing: 0.8pt;
        font-weight: 600;
         @media (max-width: 600px) {
            display: block;
        }
    }
    &__logo-wrapper {
        align-self: start;
        animation-name: rotateIn;
        animation-duration: 2s;
        animation-timing-function: ease-in-out;
        text-decoration: none;
        outline: none;
        border: none;
    }
    &__social {
        @media (max-width: 600px) {
            display: none;
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
        @media (orientation: landscape) and (max-width: 820px) {
            align-self: start;
            margin-top: 15pt;
        }
        @media (max-width: 600px) {
            display: none;
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
        @media (max-width: 600px) {
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
</style>
