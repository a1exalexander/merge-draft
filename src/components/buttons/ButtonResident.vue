<template>
<button class="button-resident">
	<p class='button-resident__text'>
	{{ $t('buttons.resident') }}
	</p>
</button>
</template>

<script>
export default {
    name: 'ButtonResident',
};
</script>

<style lang="scss">
@import '../../assets/scss/style.scss';
.button-resident {
	width: 187px;
	flex-shrink: 0;
	height: 40px;
	background-color: $MERGE-SECONDARY-COLOR;
	outline: none;
	border: none;
	border-radius: 3px;
	@extend %flex-row-c;
	align-items: center;
	position: relative;
	transition: background-color ease-in-out 0.1s;
	z-index: 2;
	&:active {
		background-color: $MERGE-DARK-COLOR;
	}
	&:focus &__text::before {
		visibility: visible;
	}
	&__text {
		display: grid;
		grid-template-columns: repeat(2, auto);
		grid-column-gap: 7px;
		align-items: center;
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
}
</style>
