<template>
<router-link to='/' class="logo__wrapper">
	<svg class="logo">
		<use xlink:href='#logo' />
	</svg>
    <svg style="display: none">
      <symbol id='logo' viewBox="0 0 31 40">
        <path fill-rule="evenodd" d="M20.4593069,32.8365086 L23.8888332,29.1227295 L31,36.2862209 L27.570731,40 L20.4593069,32.8365086 Z M15.4625816,0 L26.0850832,10.7005349 L18.0964043,10.7005349 L18.0964043,25.4662469 L3.77682656,39.9891419 L0,36.2971308 L12.693955,23.3086219 L12.693955,10.7005349 L4.89641986,10.7005349 L15.4625816,0 Z"
        id="Combined-Shape"></path>
      </symbol>
    </svg>
</router-link>
</template>

<script>

export default {
    name: 'navigation'
}
</script>

<style lang="scss">
@import '../assets/scss/style.scss';

.logo {
    fill: $MERGE-MAIN-COLOR;
    width: 31px;
    height: 40px;
    align-self: start;
    &__wrapper {
        position: fixed;
        left: 40px;
        top: 48px;
        z-index: 11;
        animation-name: rotateIn;
        animation-duration: 2s;
        animation-timing-function: ease-in-out;
        text-decoration: none;
        outline: none;
        border: none;
        @media (max-width: 600px), (max-width: 600px) and (max-height: 400px) {
            position: absolute;
            left: auto;
            right: auto;
            top: 2rem;
        }
    }
}
</style>
