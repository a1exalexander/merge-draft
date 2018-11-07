<template>
<button class="button-back"> 
	<svg class="button-back__img">
		<use xlink:href='#arrow-left' />
	</svg>
	<div class="button-back__outside"></div>
	<svg style="display: none">
		<symbol id='arrow-left' width="17" height="17">
			<path stroke="none" transform="matrix(-0.664679 0.664682 0.664682 0.664679 8.66016 0.303762)" d="M4 0L4 1.6L9.272 1.6L0 10.872L1.128 12L10.4 2.728L10.4 8L12 8L12 0L4 0L4 1.6L9.272 1.6L0 10.872L1.128 12L10.4 2.728L10.4 8L12 8L12 0L4 0Z" />
		</symbol>
	</svg>
</button> 
</template>

<script>
export default {
	name: 'ButtonBack'
};
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
