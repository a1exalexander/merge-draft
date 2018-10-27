<template>
<button class="button-resident-link" @click="becomeMember">
	<p class='button-resident-link__text'>
		BECOME A RESIDENT
		<svg class='button-resident-link__img'>
			<use xlink:href='#arrow-right-up' />
		</svg>
	</p>
    <svg style="display: none">
        <symbol id='arrow-right-up' width="12" height="12" viewBox=" 0 0 24 24">
            <path fill-rule="evenodd" d="M10 6v1.6h5.272L6 16.872 7.128 18 16.4 8.728V14H18V6z" />
        </symbol>   
    </svg>
</button>
</template>

<script>
export default {
	name: 'button-resident-link',
	methods: {
		becomeMember() {
			this.$router.push('/booking-workplace');
		}
	}
};
</script>

<style lang="scss">
@import '../../assets/scss/style.scss';
.button-resident-link {
	padding: 4px 6px;
	background-color: transparent;
	outline: none;
	border: none;
	text-align: center;
	border-radius: 3px;
	@extend %flex-row-c;
	flex-flow: nowrap;
	position: relative;
	z-index: 2;
	@media (min-width: 600px) {
		&:hover &__text {
			color: $MERGE-MAIN-COLOR;
		}
		&:hover &__img {
			fill: $MERGE-MAIN-COLOR;
		}
	}
	&:focus &__text {
		color: $MERGE-SECONDARY-COLOR;
	}
	&:focus &__text::before {
		visibility: visible;
	}
	&:active &__text {
		color: $MERGE-DARK-COLOR;
	}
	&:active &__img {
		fill: $MERGE-DARK-COLOR;
	}

	&__text {
		text-align: center;
		@extend %flex-row-c;
		align-items: center;
		flex-flow: nowrap;
		text-transform: uppercase;
		font-family: $base-font;
		font-size: 0.625rem;
		font-weight: 700;
		letter-spacing: 0.7px;
		color: $MERGE-SECONDARY-COLOR;
		transition: color ease-in-out 0.1s;
		margin-right: 5px;
		white-space: nowrap;
		&::before {
			position: absolute;
			content: '';
			background-color: transparent;
			left: -2px;
			right: -2px;
			top: -2px;
			bottom: -2px;
			border: solid 2.5px rgba(55, 205, 171, 0.5);
			border-radius: 4px;
			transition: border ease-in-out 0.2s;
			z-index: 0;
			visibility: hidden;
		}
	}
	&__img {
		stroke: none;
		height: 16px;
		width: 16px;
		fill: $TEXT-COLOR;
		fill: $MERGE-SECONDARY-COLOR;
	}
}
</style>
