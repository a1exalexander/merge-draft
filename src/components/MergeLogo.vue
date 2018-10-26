<template>
<div class="logo__wrapper">
    <svg class="logo">
        <use xlink:href='#logo' />
    </svg>
</div>
</template>

<script>

export default {
  name: 'merge-logo'
}
</script>

<style lang="scss">
@import '../assets/scss/style.scss';
.logo {
    fill: $MERGE-MAIN-COLOR;
    width: 31px;
    height: 40px;
    align-self: start;
    animation-name: rotateIn;
    animation-duration: 1.5s;
    animation-timing-function: ease-in-out;
    animation-delay: 100ms;
    &__wrapper {
        position: fixed;
        left: 40px;
        top: 48px;
        z-index: 100;
        animation-name: fadeIn;
        animation-duration: 0.3s;
        animation-timing-function: ease-in-out;
    }
    @media (max-width: 600px), (max-height: 500px) {
        grid-column: 1;
        grid-row: 1;
        align-self: center;
    }
}

</style>
