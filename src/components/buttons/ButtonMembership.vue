<template>
<button class="button-membership button-membership--hello">
	<p class='button-membership__text'>
		BECOME A MEMBER
		<svg class='button-membership__img'>
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
    name: 'button-membership'
}
</script>

<style lang="scss">
@import '../../assets/scss/style.scss';
.button-membership {
    padding: 1rem 2rem;
    flex-shrink: 0;
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
        white-space: nowrap;
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
    &__img {
        fill: $MAIN-DARK-COLOR;
        height: 12px;
        width: 16px;
        stroke: none;
        margin-bottom: 2px;
    }
}


</style>
