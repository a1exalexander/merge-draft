<template>
<div class="glide">
<div class="glide__track" data-glide-el="track">
	<ul class="glide__slides">
		<li class="glide__slide">
			<img src="../assets/image/merge-1.jpg" alt="merge" class="glide__image">
		</li>
		<li class="glide__slide">
			<img src="../assets/image/merge-2.jpg" alt="merge" class="glide__image">
		</li>
		<li class="glide__slide">
			<img src="../assets/image/merge-3.jpg" alt="merge" class="glide__image">
		</li>
		<li class="glide__slide">
			<img src="../assets/image/merge-4.png" alt="merge" class="glide__image">
		</li>
	</ul>
</div>
<div class="glide__arrows" data-glide-el="controls">
	<button class="glide__arrow glide__arrow--left" data-glide-dir="<">
		<svg class='glide__nav-icon'>
			<use xlink:href='#chevron-left' />
		</svg>
		<div class="glide__outside"></div>
	</button>
	<p class="glide__counter-box">
		<span class="glide__counter">{{ slideIndex }}</span>
		/
		<span class="glide__sum">{{ slides }}</span>
	</p>
	<button class="glide__arrow glide__arrow--right" data-glide-dir=">">
		<svg class='glide__nav-icon'>
			<use xlink:href='#chevron-right' />
		</svg>
		<div class="glide__outside"></div>
	</button>
</div>
<svg style="display: none">
	<symbol id='chevron-left' viewBox="0 0 24 24">
		<path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
		<path d="M0 0h24v24H0z" fill="none" />
	</symbol>
	<symbol id='chevron-right' viewBox="0 0 24 24">
		<path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
		<path d="M0 0h24v24H0z" fill="none" />
	</symbol>
</svg>
</div>	
</template>

<script>
import Glide from '@glidejs/glide';

export default {
	name: 'Slider',
	data() {
		return {
			glide: undefined,
			slideIndex: 0,
			slides: 0
		};
	},
	methods: {
		currentSlide() {
			this.slideIndex = this.glide.index + 1;
		},
		slidesCount() {
			this.slides = document.querySelectorAll('.glide__image').length;
		}
	},
	mounted() {
		this.slidesCount();
		this.glide = new Glide(this.$el, {
			type: 'carousel',
			perView: 1
		});
		this.glide.mount();
	},
	watch: {
		'glide.index': function() {
			this.currentSlide();
		}
	}
};
</script>


<style lang="scss" scoped>
@import '../assets/scss/style.scss';
@import 'node_modules/@glidejs/glide/src/assets/sass/glide.core';

.glide {
	&__image {
		width: 100%;
		height: auto;
	}
	&__slides {
		height: 420px;
		@extend %flex-row;
		align-items: center;
		cursor: pointer;
	}
	&__slide {
		@extend %flex-row;
		align-items: center;
	}
	&__arrows {
		width: 100%;
		@extend %flex-row;
		justify-content: flex-end;
		align-items: center;
		height: 96px;
		@media (max-width: 600px) {
			justify-content: center;
		}
	}
	&__arrow {
		width: 32px;
		height: 32px;
		border-radius: 3px;
		background-color: $BUTTON-COLOR;
		outline: none;
		border: none;
		@extend %flex-col-c;
		align-items: center;
		transition: background-color ease-in-out 0.1s;
		position: relative;
		z-index: 2;
		&:active .glide__outside {
			visibility: visible;
		}
		&:active {
			background-color: $BUTTON-COLOR;
		}
		&:active .glide__nav-icon {
			fill: $GREY;
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
	&__nav-icon {
		width: 24px;
		height: 24px;
		fill: $TEXT-COLOR;
		transition: fill ease-in-out 0.1s;
	}
	&__counter-box {
		padding: 1rem;
		width: 7rem;
		font-family: $base-font;
		font-size: 0.875rem;
		font-weight: bold;
		text-align: center;
		color: $TEXT-COLOR;
		transition: all ease-in-out 0.1s;
	}
}
</style>
