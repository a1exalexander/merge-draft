<template>
<div class="button-back__wrapper">
    <button class="button-back" onclick="goToHello()">
        <svg class="button-back__img">
            <use xlink:href='#arrow-left' />
        </svg>
        <div class="button-back__outside"></div>
    </button>
    <p class="button-back__text">go back</p>
</div>
</template>

<script>

export default {
  name: 'button-back'
}
</script>

<style lang="scss">
@import '../../assets/scss/style.scss';
.button-back {
    width: 32px;
    height: 32px;
    background-color: $BUTTON-COLOR;
    border: none;
    outline: none;
    border-radius: 3px;
    @extend %flex-row-c;
    align-items: center;
    transition: background-color ease-in-out 0.1s;
    position: relative;
    z-index: 2;
    &:focus {
        background-color: $BUTTON-COLOR;
    }
    &:focus &__img {
        fill: $GREY; 
    }
    &:focus &__outside {
        visibility: visible;
    }
   
    @media (min-width: 600px) {
        &:hover {
            background-color: $GREY;
        }
        &:hover &__img {
            fill: $HOVER-ICON-COLOR;
        }
    }
     &:active {
        background-color: $BUTTON-COLOR;
    }
    &:active &__img {
        fill: $GREY;
    }
    
    &__wrapper {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(2, auto);
        justify-items: start;
        align-items: center;
        justify-content: start;
        grid-column-gap: 1rem;
        @media (max-width: 600px) {
            padding: 2rem 0 0 0;
            justify-items: center;
            justify-content: center;
        }
    }

    &__img {
        width: 17px;
        height: 17px;
        fill: $GREY;
        transition: fill ease-in-out 0.1s;
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

    &__text {
        cursor: default;
        text-transform: uppercase;
        font-family: $base-font;
        font-size: 10px;
        font-weight: 700;
        letter-spacing: 0.7px;
        text-align: left;
        color: $GREY;
    }   
}

</style>
