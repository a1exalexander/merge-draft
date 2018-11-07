<template>
<button class="button-book" form='book-form'>
	<p class="button-book__text">
		book
	</p> 
</button>
</template>

<script>

export default {
  name: 'ButtonBook'
}
</script>

<style lang="scss">
@import '../../assets/scss/style.scss';
.button-book {
	padding: 1rem 2rem;
	background-color: $MERGE-SECONDARY-COLOR;
	border-radius: 3px;
	outline: none;
	border: none;
	text-align: center;
	@extend %flex-row-c;
    align-items: center;
	position: relative;
	z-index: 2;
	transition: background-color ease-in-out 0.1s; 
	&:active {
        background-color: $MERGE-DARK-COLOR;
    }
    &:focus &__text::before {
        visibility: visible;
    }
	&:disabled {
		background-color: $BUTTON-COLOR;
	}
	&:disabled &__text {
		color: $MIDDLE-GREY;
	}
	&__text {
		font-family: $base-font;
		font-size: 0.625rem;
		font-weight: 700;
		line-height: 1.5;
		letter-spacing: 0.7px;
		color: $MAIN-DARK-COLOR;
		text-transform: uppercase;
		transition: color ease-in-out 0.1s; 
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
            transition: border ease-in-out 0.2s;
            z-index: 0;
            visibility: hidden;
        }
	}
	
	
}


</style>
