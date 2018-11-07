<template>
<div class="resident-card__wrapper-all" @click.self='close'>
<div class="resident-card__wrapper" @click.self='close'>
    <div class="resident-card animated faster fadeInBubble">
        <button-close-mini @click.native='close'></button-close-mini>
        <div class="resident-card__inner resident-card__inner--top">
            <p class="resident-card__title">Resident Card
            </p>
            <p class="resident-card__description">Access for the Month
            </p>
            <div class="resident-card__label resident-card__label--room">
                <img src="../assets/image/meeting-room.svg" alt="wi-fi" class="resident-card__image">
                <p class="resident-card__text">1 hour two times per week of Meeting Room's using is free
                </p>
            </div>
            <div class="resident-card__label resident-card__label--lecture">
                <img src="../assets/image/lectures.svg" alt="wi-fi" class="resident-card__image">
                <p class="resident-card__text">Free accessment to paid events in Merge
                </p>
            </div>
        </div>
        <div class="resident-card__line"></div>
        <div class="resident-card__inner resident-card__inner--middle">
            <div class="resident-card__label">
                <img src="../assets/image/wi-fi.svg" alt="wi-fi" class="resident-card__image">
                <p class="resident-card__text">Super-fast Internet</p>
            </div>
            <div class="resident-card__label">
                <img src="../assets/image/unlimited-coffee-tea.svg" alt="wi-fi" class="resident-card__image">
                <p class="resident-card__text">Unlimited coffee, tea, snacks</p>
            </div>
            <div class="resident-card__label">
                <img src="../assets/image/printer.svg" alt="wi-fi" class="resident-card__image">
                <p class="resident-card__text">Wireless Printer/ Scanner/ Copier</p>
            </div>
            <div class="resident-card__label">
                <img src="../assets/image/shower.svg" alt="wi-fi" class="resident-card__image">
                <p class="resident-card__text">Shower</p>
            </div>
            <div class="resident-card__label">
                <img src="../assets/image/microwave.svg" alt="wi-fi" class="resident-card__image">
                <p class="resident-card__text">Kitchen with a microvawe and fridge</p>
            </div>
        </div>
        <div class="resident-card__inner resident-card__inner--price">
            <p class="resident-card__price">
                Price:
                <span class="resident-card__sum">{{ price }}</span>
            </p>
        </div>
        <button-resident class="resident-card__button" @click.native='becomeResident'></button-resident>
    </div>
</div>
</div>

</template>

<script>
import ButtonCloseMini from '@/components/buttons/ButtonCloseMini.vue';
import ButtonResident from '@/components/buttons/ButtonResident.vue';

export default {
    name: 'ResidentCard',
    components: {
        ButtonCloseMini,
        ButtonResident
    },
    methods: {
        close() {
            this.$emit('closeCard');  
        },
        becomeResident() {
            this.$store.commit('change', 'month');
            this.$emit('closeCard', 'month');  
        }  
    },
    computed: {
        price() {
            return this.$store.state.price.month;
        }
    }
}
</script>

<style lang="scss">
@import '../assets/scss/style.scss';
.resident-card {
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
        align-self: center;
    }
    &__title {
        font-family: $title-font;
        font-size: 1.5rem;
        font-weight: 500;
        text-align: left;
        color: $TEXT-COLOR;
        grid-area: 1 / 1 / 2 / 3;
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
    &__line {
        width: 100%;
        height: 1px;
        background-color: $DARK-GREY;
        margin: 2rem 0;
    }
    &__inner {
        display: grid;
        align-items: center;
        &--top {
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: repeat(3, auto);
            grid-column-gap: 2rem;
        }
        &--middle {
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: repeat(3, auto);
            grid-row-gap: 1.5rem;
            grid-column-gap: 2rem;
            margin-bottom: 2.625rem;
        }
        &--price {
            grid-template-rows: repeat(2, auto);
            grid-row-gap: 1.5rem;
            justify-content: center;
            justify-items: center;
            @media (max-width: 500px) {
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
