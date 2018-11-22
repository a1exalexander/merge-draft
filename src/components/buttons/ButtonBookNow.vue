<template>
<button class="button-book-now">
	<p class="button-book-now__text">
	{{ $t('buttons.now') }}
	</p>
</button>
</template>

<script>
export default {
	name: 'ButtonBookNow'
};
</script>

<style lang="scss">
@import '../../assets/scss/style.scss';
.button-book-now {
	padding: 1rem 2rem;
	background-color: $BUTTON-COLOR;
	border-radius: 3px;
	outline: none;
	border: none;
	text-align: center;
	@extend %flex-row-c;
	align-items: center;
	position: relative;
	z-index: 2;
	transition: background-color ease-in-out 0.1s;
	&:active &__text {
		color: $LIGHT-GREY;
	}
	&:focus &__text::before {
		visibility: visible;
	}
	&__text {
		font-family: $base-font;
		font-size: 0.625rem;
		font-weight: 700;
		line-height: 1.5;
		letter-spacing: 0.7px;
		color: $TEXT-COLOR;
		text-transform: uppercase;
		transition: color ease-in-out 0.1s;
		white-space: nowrap;
		&::before {
			position: absolute;
			content: '';
			background-color: transparent;
			left: -2px;
			right: -2px;
			top: -2px;
			bottom: -2px;
			border: 1px solid $LIGHT-GREY;
			border-radius: 4px;
			transition: border ease-in-out 0.2s;
			z-index: 0;
			visibility: hidden;
		}
	}
}
</style>
