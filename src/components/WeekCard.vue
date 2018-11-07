<template>
<div class="resident-card__wrapper-all" @click.self='close'>
<div class="week-card__wrapper" @click.self='close'>
    <div class="week-card animated faster fadeInBubble">
        <button-close-mini @click.native='close'></button-close-mini>
        <p class="week-card__title">Week access
        </p>
        <div class="week-card__inner week-card__inner--middle">
            <div class="week-card__label">
                <img src="../assets/image/wi-fi.svg" alt="wi-fi" class="week-card__image">
                <p class="week-card__text">Super-fast Internet</p>
            </div>
            <div class="week-card__label">
                <img src="../assets/image/unlimited-coffee-tea.svg" alt="wi-fi" class="week-card__image">
                <p class="week-card__text">Unlimited coffee, tea, snacks</p>
            </div>
            <div class="week-card__label">
                <img src="../assets/image/printer.svg" alt="wi-fi" class="week-card__image">
                <p class="week-card__text">Wireless Printer/ Scanner/ Copier</p>
            </div>
            <div class="week-card__label">
                <img src="../assets/image/shower.svg" alt="wi-fi" class="week-card__image">
                <p class="week-card__text">Shower</p>
            </div>
            <div class="week-card__label">
                <img src="../assets/image/microwave.svg" alt="wi-fi" class="week-card__image">
                <p class="week-card__text">Kitchen with a microvawe and fridge</p>
            </div>
        </div>
        <div class="week-card__inner week-card__inner--price">
            <p class="week-card__price">
                Price:
                <span class="week-card__sum">{{ price }}</span>
            </p>
            <button class="week-card__button" @click="selectWeek">
                <p class='week-card__button-text'>
                    CHOOSE
                </p>
            </button>
        </div>
       
    </div>
</div>
</div>
</template>

<script>
import ButtonCloseMini from '@/components/buttons/ButtonCloseMini.vue';

export default {
    name: 'WeekCard',
    components: {
        ButtonCloseMini
    },
    methods: {
        close() {
            this.$emit('closeCard');  
        },
        selectWeek() {
            this.$store.commit('change', 'week');
            this.$emit('closeCard', 'week');  
        }     
    },
    computed: {
        price() {
            return this.$store.state.price.week;
        }
}
}
</script>

<style lang="scss">
@import '../assets/scss/style.scss';
.week-card {
    padding: 2rem 2.4rem 3.5rem 2.4rem;
    flex: 0 0 36%;
    border-radius: 3px;
    background-color: $BUTTON-COLOR;
    box-shadow: 0 12px 30px 24px rgba(0, 0, 0, 0.1);
    @extend %flex-col;
    align-items: stretch;
    position: relative;
    @media (min-width: 500px) {
        min-width: 520px;
    }
    @media (max-width: 500px) {
        flex: 0 0 100%;
        align-self: flex-start;
        padding: 2rem;
    }
    &__wrapper {
        padding: 2rem;
        top: 0;
        left: 0;
        right: 0;
        width: 100%;
        min-height: 100vh;
        background-color: transparent;
        @extend %flex-row-c;
        align-items: center;
        position: fixed;
        z-index: 100;
        will-change: opacity;
        @media (max-height: 800px) {
            position: absolute;
        }
        @media (max-width: 600px) {
            padding: 2rem 1rem;
            align-items: flex-start; 
        }
    }
    &__wrapper-all {
        position: absolute;
        z-index: 99;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        min-height: 100vh;
        background-color: rgba(17, 17, 17, 0.7);
    }
    &__button {
	padding: 1rem 2rem;
	background-color: $MERGE-SECONDARY-COLOR;
	outline: none;
	border: none;
	border-radius: 3px;
	@extend %flex-row-c;
	align-items: center;
	position: relative;
	transition: background-color ease-in-out 0.1s;
	z-index: 2;
        &:active {
            background-color: $MERGE-DARK-COLOR;
        }
        &:focus &-text::before {
            visibility: visible;
        }
    }
	&__button-text {
		text-align: center;
		text-transform: uppercase;
		font-family: $base-font;
		font-size: 10px;
		font-weight: 700;
		text-align: center;
		color: $MAIN-DARK-COLOR;
		letter-spacing: 0.7px;
		&::before {
			position: absolute;
			content: '';
			background-color: transparent;
			left: -2px;
			right: -2px;
			top: -2px;
			bottom: -2px;
			border: 1px solid $MERGE-SECONDARY-COLOR;
			border-radius: 4px;
			transition: border ease-in-out 0.1s;
			z-index: 0;
            visibility: hidden;
        }
    }
    &__title {
        font-family: $title-font;
        font-size: 1.5rem;
        font-weight: 500;
        text-align: left;
        color: $TEXT-COLOR;
        margin-bottom: 2.5rem;
    }
    &__description {
        padding: 0.3125rem 0 1.9375rem 0;
        font-family: $base-font;
        font-size: 0.8125rem;
        font-weight: 500;
        line-height: 2;
        text-align: left;
        color: $GREY;
        grid-area: 2 / 1 / 3 / 3;
    }
    &__inner {
        align-items: center;
        &--middle {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: repeat(3, auto);
            grid-row-gap: 1.5rem;
            grid-column-gap: 2rem;
            padding-bottom: 2rem;
            border-bottom: 1px solid $DARK-GREY;
        }
        &--price {
            padding: 2.5rem 0 0;
            @extend %flex-row-sb;
            @media (max-width: 500px) {
                flex-direction: column;
                button {
                    width: 100%;
                }
            }
        }
        @media (max-width: 500px) {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            p {
                margin-bottom: 1rem;
            }
        }
    }
    &__label {
        display: grid;
        grid-template-columns: repeat(2, auto);
        grid-column-gap: 1rem;
        align-items: center;
        justify-content: start;
        &--room {
            grid-area: 3 / 1 / 4 / 2;
        }
        &--lecture {
            grid-area: 3 / 2 / 4 / 3;
        }
        @media (max-width: 500px) {
           margin-bottom: 1rem;
        }
    }

    &__image {
        width: 32px;
        height: 32px;
        fill: $MERGE-MAIN-COLOR;
    }
    &__text {
        font-family: $base-font;
        font-size: 0.625rem;
        font-weight: 500;
        line-height: 1.6;
        text-align: left;
        color: $TEXT-COLOR;
    }
    &__price {
        font-family: $base-font;
        font-size: 0.8125rem;
        font-weight: 500;
        line-height: 1;
        text-align: center;
        color: white;
    }
    &__sum {
        font-family: $title-font;
        font-size: 1.875rem;
        font-weight: 700;
        text-align: left;
        color: white;
        &::after {
            content: ' UAH';
            text-transform: uppercase;
            font-family: $base-font;
            font-size: 0.5rem;
            font-weight: 700;
            line-height: 2;
            letter-spacing: 0.5px;
            text-align: left;
            color: $GREY;
        }
    }
}

</style>
