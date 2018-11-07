<template>
	<button class="button-close">
		<svg class='button-close__img'>
			<use xlink:href='#close' />
		</svg>
		<div class="button-close__outside"></div>
		<svg style="display: none;">
			<symbol id='close' viewBox="0 0 24 24">
				<polygon id="Shape" points="19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12"></polygon>
			</symbol>
		</svg>
	</button>
</template>

<script>

export default {
	name: 'ButtonClose'
}
</script>

<style lang="scss">
@import '../../assets/scss/style.scss';
.button-close {
	height: 32px;
	width: 32px;
	outline: none;
	border: none;
	border-radius: 3px;
	background-color: $BUTTON-COLOR;
	@extend %flex-row-c;
	align-items: center;
	transition: background-color ease-in-out 0.1s;
	position: relative;
	@media (min-width: 600px) {
		&:hover {
			background-color: $GREY;
		}
		&:hover &__img {
			fill: $HOVER-ICON-COLOR;
		}
	}
	&:focus {
		background-color: $BUTTON-COLOR;
	}
	&:focus &__img {
		fill: $GREY;
	}
	&:focus &__outside {
		visibility: visible;
	}
	&:active {
		background-color: $BUTTON-COLOR;
	}
	&:active &__img {
		fill: $GREY;
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
	&__img {
		width: 28px;
		height: 28px;
		fill: $GREY;
		stroke: none;
		@extend %flex-row-c;
		align-items: center;
		transition: fill ease-in-out 0.1s;
	}
}
	
</style>
