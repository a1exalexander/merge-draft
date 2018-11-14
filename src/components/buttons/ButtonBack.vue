<template>
<button class="button-back"> 
	<svg class="button-back__img">
		<use xlink:href='#left-arrow' />
	</svg>
	<div class="button-back__outside"></div>
	<svg style="display: none">
		<symbol id='left-arrow' viewBox="0 0 400.004 400.004" style="enable-background:new 0 0 400.004 400.004;">
			<path d="M382.688,182.686H59.116l77.209-77.214c6.764-6.76,6.764-17.726,0-24.485c-6.764-6.764-17.73-6.764-24.484,0L5.073,187.757
		c-6.764,6.76-6.764,17.727,0,24.485l106.768,106.775c3.381,3.383,7.812,5.072,12.242,5.072c4.43,0,8.861-1.689,12.242-5.072
		c6.764-6.76,6.764-17.726,0-24.484l-77.209-77.218h323.572c9.562,0,17.316-7.753,17.316-17.315
		C400.004,190.438,392.251,182.686,382.688,182.686z"/>
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
	@media (max-width: 600px) {
		width: 32pt;
		height: 32pt;
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
		@media (max-width: 600px) {
			width: 20px;
			height: 20px;
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
