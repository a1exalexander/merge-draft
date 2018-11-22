<template>
<button class="button-book-room">
	<p class='button-book-room__text'>
		{{ $t('buttons.bookRoom') }}
		<svg class='button-book-room__img'>
			<use xlink:href='#arrow-button' />
		</svg>
	</p>
	<svg style="display: none">
      <symbol id='arrow-button'>
        <path stroke-width="1" stroke-miterlimit="4" transform="matrix(0.685894 0.685894 -0.685894 0.685894 6.45996 0.409277)"
          d="M2.66654 0L2.66654 1.06667L6.18121 1.06667L-0.00012207 7.248L0.751878 8L6.93321 1.81867L6.93321 5.33333L7.99988 5.33333L7.99988 0L2.66654 0L2.66654 1.06667L6.18121 1.06667L-0.00012207 7.248L0.751878 8L6.93321 1.81867L6.93321 5.33333L7.99988 5.33333L7.99988 0L2.66654 0Z" />
      </symbol>
    </svg>
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
	@media (max-width: 600px) {
		padding: 1.3rem 2rem;
		width: 100%;
	}
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
		@media (max-width: 600px) {
			width: 100%;
			line-height: 1;
			font-size: 0.9rem;
			font-weight: 600;
			display: grid;
			grid-template-columns: repeat(2, auto);
			grid-column-gap: 7px;
			align-items: center;
		}
	}
	&__img {
        fill: $MAIN-DARK-COLOR;
        height: 14px;
        width: 16px;
        stroke: none;
		display: none;
    }
}
</style>
