<template>
	<button class='button-close-mini'>
		<svg class="button-close-mini__img">
			<use xlink:href='#close' />
		</svg>
		<svg style="display: none;">
			<symbol id='close' viewBox="0 0 24 24">
				<polygon id="Shape" points="19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12"></polygon>
			</symbol>
		</svg>
	</button>
</template>

<script>

export default {
	name: 'residentCard'
}
</script>

<style lang="scss">
@import '../../assets/scss/style.scss';
.button-close-mini {
        position: absolute;
        right: 1.5rem;
        top: 1.5rem;
        width: 24px;
        height: 24px;
        @extend %flex-col-c;
        align-items: center;
        outline: none;
        border: none;
        background-color: transparent;
        @media (min-width: 600px) {
			&:hover {
            background-color: $MAIN-DARK-COLOR;
            transition: background-color ease-in-out 0.2s;
			}
			&:not(:hover) {
				transition: background-color ease-in-out 0.2s;
			}
			&:hover .resident-card__close-img {
				fill: $TEXT-COLOR;
				transition: fill ease-in-out 0.2s;
			}
			&:not(:hover) .resident-card__close-img {
				transition: fill ease-in-out 0.2s;
			}
		}
        &:focus {
            opacity: 0.1;
            transition: opacity ease-in-out 0.4s;
        }
        &:focus .button-close-mini__img {
            transform: rotate(-90deg);
            transition: transform ease-in-out 0.2s;
        }
		&__img {
            width: 20px;
            height: 20px;
            fill: $GREY;
		}
}
	
</style>
