<template>
<div class="resident-card__wrapper-all" @click.self='close'>
<div class="week-card__wrapper" @click.self='close'>
    <div class="week-card animated faster fadeInBubble">
        <button-close-mini class="week-card__close" @click.native='close'></button-close-mini>
        <p class="week-card__title"> {{ $t('weekCard.price') }}
        </p>
        <div class="week-card__inner week-card__inner--middle">
            <div class="week-card__label">
                <img src="../assets/image/wi-fi.svg" alt="wi-fi" class="week-card__image">
                <p class="week-card__text"> {{ $t('weekCard.features.wifi') }}</p>
            </div>
            <div class="week-card__label">
                <img src="../assets/image/unlimited-coffee-tea.svg" alt="coffe" class="week-card__image">
                <p class="week-card__text">{{ $t('weekCard.features.coffee') }}</p>
            </div>
            <div class="week-card__label">
                <img src="../assets/image/printer.svg" alt="printer" class="week-card__image">
                <p class="week-card__text">{{ $t('weekCard.features.printer') }}</p>
            </div>
            <div class="week-card__label">
                <img src="../assets/image/shower.svg" alt="shower" class="week-card__image">
                <p class="week-card__text">{{ $t('weekCard.features.shower') }}</p>
            </div>
            <div class="week-card__label">
                <img src="../assets/image/microwave.svg" alt="kitchen" class="week-card__image">
                <p class="week-card__text">{{ $t('weekCard.features.kitchen') }}</p>
            </div>
        </div>
        <div class="week-card__inner week-card__inner--price">
            <p class="week-card__price">
                {{ $t('weekCard.price') }}
                <span class="week-card__sum">{{ price }}</span>
            </p>
            <button class="week-card__button" @click="selectWeek">
                <p class='week-card__button-text'>
                {{ $t('weekCard.button') }}
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
    @media (min-width: 600px) {
        min-width: 520px;
    }
    @media (max-width: 600px) {
        flex: 0 0 100%;
        align-self: flex-start;
        padding: 20pt 24pt;
    }
    @media (max-width: 320px) {
        padding: 20pt 18pt;
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
            padding: 54pt 20pt;
            align-items: flex-start; 
        }
        @media (max-width: 320px) {
            padding: 24pt 20pt;
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
    &__close {
        @media (max-width: 600px) {
            svg {
                width: 20pt;
                height: 20pt;
            }
            top: 20pt;
            right: 20pt;
        }
        @media (max-width: 375px) {
           top: 22pt;
        }
        @media (max-width: 320px) {
           top: 22pt;
           right: 14pt;
        }
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
        @media (max-width: 600px) {
            display: none;
        }
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
        @media (max-width: 600px) {
            font-size: 1.5rem;
            letter-spacing: 0.4pt;
            margin-bottom: 20pt;
            line-height: 1;
        }
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
        @media (max-width: 600px) {
            font-size: 0.75rem;
            padding: 0;
            margin-bottom: 22pt;
        }
        @media (max-width: 320px) {
            margin-bottom: 12pt;
        }
    }
    &__inner {
        align-items: center;
        @media (max-width: 600px) {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
        }
        &--middle {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: repeat(3, auto);
            grid-row-gap: 1.5rem;
            grid-column-gap: 2rem;
            padding-bottom: 2rem;
            border-bottom: 1px solid $DARK-GREY;
            @media (max-width: 600px) {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                margin: 0;
                border: none;
                padding: 0;
            }
        }
        &--price {
            padding: 2.5rem 0 0;
            @extend %flex-row-sb;
            @media (max-width: 600px) {
                display: none;
            }
        }
    }
    &__label {
        display: grid;
        grid-template-columns: repeat(2, auto);
        grid-column-gap: 1rem;
        align-items: center;
        justify-content: start;
        @media (max-width: 600px) {
            margin-bottom: 18pt;
            &:last-child {
                margin: 0;
            }
        }
        @media (max-width: 320px) {
            margin-bottom: 12pt;
        }
        &--room {
            grid-area: 3 / 1 / 4 / 2;
        }
        &--lecture {
            grid-area: 3 / 2 / 4 / 3;
        }
    }

    &__image {
        width: 32px;
        height: 32px;
        fill: $MERGE-MAIN-COLOR;
        @media (max-width: 600px) {
            width: 24pt;
            height: 24pt;
        }
    }
    &__text {
        font-family: $base-font;
        font-size: 0.625rem;
        font-weight: 500;
        line-height: 1.6;
        text-align: left;
        color: $TEXT-COLOR;
        @media (max-width: 600px) {
            font-size: 0.8rem;
        }
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
