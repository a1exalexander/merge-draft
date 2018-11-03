<template>
<div class="social-networks">
	<a href="https://t.me/mergeplace" target="_blank" class="social-networks__link">
		<svg class="social-networks__img">
			<use xlink:href='#telegram' />
		</svg>
		<div class="social-networks__outside"></div>
	</a>
	<a href="https://www.facebook.com/merge.place" target="_blank" class="social-networks__link">
		<svg class="social-networks__img">
			<use xlink:href='#facebook' />
		</svg>
		<div class="social-networks__outside"></div>
	</a>
	<a href="https://www.instagram.com/merge.place" target="_blank" class="social-networks__link">
		<svg class="social-networks__img">
			<use xlink:href='#instagram' />
		</svg>
		<div class="social-networks__outside"></div>
	</a>
	<svg style="display: none">
      <symbol id='telegram' viewBox="0 0 448 512">
        <path d="M446.7 98.6l-67.6 318.8c-5.1 22.5-18.4 28.1-37.3 17.5l-103-75.9-49.7 47.8c-5.5 5.5-10.1 10.1-20.7 10.1l7.4-104.9 190.9-172.5c8.3-7.4-1.8-11.5-12.9-4.1L117.8 284 16.2 252.2c-22.1-6.9-22.5-22.1 4.6-32.7L418.2 66.4c18.4-6.9 34.5 4.1 28.5 32.2z"></path>
      </symbol>
      <symbol id='facebook' viewBox="0 0 264 512">
        <path d="M76.7 512V283H0v-91h76.7v-71.7C76.7 42.4 124.3 0 193.8 0c33.3 0 61.9 2.5 70.2 3.6V85h-48.2c-37.8 0-45.1 18-45.1 44.3V192H256l-11.7 91h-73.6v229"></path>
      </symbol>
      <symbol id='instagram' viewBox="0 0 448 512">
        <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path>
      </symbol>
    </svg>
</div>
</template>

<script>

export default {
  name: 'SocialNetworks'
}
</script>

<style lang="scss">
@import '../assets/scss/style.scss';
.social-networks {
    align-self: end;
    display: grid;
    grid-template-rows: repeat(3, auto);
    grid-row-gap: 1.5em;
    align-items: center;
    &__link {
        border-radius: 3px;
        text-decoration: none;
        width: 24px;
        height: 24px;
        @extend %flex-col-c;
        background-color: $BUTTON-COLOR;
        transition: background-color ease-in-out 0.1s;
        position: relative;
        z-index: 2;
       
        
        @media (min-width: 600px) {
            &:hover {
                background-color: $GREY;
            }
            &:hover .social-networks__img {
                fill: $HOVER-ICON-COLOR;
            }
		}
		&:active .social-networks__outside {
            visibility: visible;
		}
		&:active {
            background-color: $BUTTON-COLOR;
        }
        &:active .social-networks__img {
            fill: $GREY;
        }
    }
    &__img {
        width: 16px;
        height: 16px;
        fill: $TEXT-COLOR;
        transition: fill ease-in-out 0.1s;
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
}
</style>
