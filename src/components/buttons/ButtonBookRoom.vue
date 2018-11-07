<template>
<button class="button-book-room">
	<p class='button-book-room__text'>
		book a meeting room
	</p>
</button>
</template>

<script>
export default {
	name: 'ButtonBookRoom'
};
</script>

<style lang="scss">
@import '../../assets/scss/style.scss';
.button-book-room {
	padding: 1rem 2rem;
	background-color: $BUTTON-COLOR;
	outline: none;
	border: none;
	text-align: center;
	border-radius: 3px;
	@extend %flex-row-c;
	flex-flow: nowrap;
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
		text-align: center;
		@extend %flex-row-c;
		align-content: center;
		flex-flow: nowrap;
		text-transform: uppercase;
		font-family: $base-font;
		font-size: 0.625rem;
		font-weight: 700;
		color: white;
		letter-spacing: 0.7px;
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
			border: 1px solid $GREY-BORDER-COLOR;
			border-radius: 4px;
			transition: border ease-in-out 0.1s;
			z-index: 0;
			visibility: hidden;
		}
	}
}
</style>
