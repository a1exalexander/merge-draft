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
		<svg class='glide__nav-icon-mobile'>
			<use xlink:href='#arrow-left' />
		</svg>
		<div class="glide__outside"></div>
	</button>
	<p class="glide__counter-box">
		<span class="glide__counter">{{ slideIndex }}</span>
		<span class="glide__slash"> / </span>
		<span class="glide__sum">{{ slides }}</span>
	</p>
	<button class="glide__arrow glide__arrow--right" data-glide-dir=">">
		<svg class='glide__nav-icon'>
			<use xlink:href='#chevron-right' />
		</svg>
		<svg class='glide__nav-icon-mobile'>
			<use xlink:href='#arrow-right' />
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
	<symbol id='arrow-left' viewBox="0 0 400.004 400.004" style="enable-background:new 0 0 400.004 400.004;" xml:space="preserve">
		<path d="M382.688,182.686H59.116l77.209-77.214c6.764-6.76,6.764-17.726,0-24.485c-6.764-6.764-17.73-6.764-24.484,0L5.073,187.757   c-6.764,6.76-6.764,17.727,0,24.485l106.768,106.775c3.381,3.383,7.812,5.072,12.242,5.072c4.43,0,8.861-1.689,12.242-5.072   c6.764-6.76,6.764-17.726,0-24.484l-77.209-77.218h323.572c9.562,0,17.316-7.753,17.316-17.315   C400.004,190.438,392.251,182.686,382.688,182.686z" fill="#FFFFFF"/>
	</symbol>
	<symbol id='arrow-right' viewBox="0 0 268.832 268.832" style="enable-background:new 0 0 400.004 400.004;" xml:space="preserve">
		<path d="M265.171,125.577l-80-80c-4.881-4.881-12.797-4.881-17.678,0c-4.882,4.882-4.882,12.796,0,17.678l58.661,58.661H12.5   c-6.903,0-12.5,5.597-12.5,12.5c0,6.902,5.597,12.5,12.5,12.5h213.654l-58.659,58.661c-4.882,4.882-4.882,12.796,0,17.678   c2.44,2.439,5.64,3.661,8.839,3.661s6.398-1.222,8.839-3.661l79.998-80C270.053,138.373,270.053,130.459,265.171,125.577z" fill='white'/>
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
		@extend %flex-row;
		align-items: center;
		cursor: pointer;
	}
	&__slide {
		@extend %flex-row;
		align-items: center;
		@media (orientation: landscape) and (max-width: 820px) {
			align-items: flex-end;
        }
		@media (max-width: 600px) {
			align-items: flex-end;
		}
	}
	&__arrows {
		width: 100%;
		@extend %flex-row;
		justify-content: flex-end;
		align-items: center;
		height: 96px;
		@media (orientation: landscape) and (max-width: 820px) {
			height: auto;
			padding: 5pt 0;
			justify-content: center;
        }
		@media (max-width: 600px) {
			height: auto;
			padding: 22pt 32pt;
			justify-content: space-between;
		}
		@media (max-width: 375px) {
			padding: 22pt 26pt;
		}
		@media (max-width: 320px) {
			padding: 22pt 22pt;
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
		@media (max-width: 600px) {
			flex: 0 0 26pt;
			height: 26pt;
		}
		&:active .glide__outside {
			visibility: visible;
		}
		&:active {
			background-color: $BUTTON-COLOR;
		}
		&:active .glide__nav-icon {
			fill: $GREY;
		}
		&--right {
			@media (max-width: 600px) {
				order: 2;
			}
		}
		&--left {
			@media (max-width: 600px) {
				order: 1;
				margin-right: 24pt;
			}
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
		@media (max-width: 600px) {
			display: none;
		}
	}
	&__nav-icon-mobile {
		display: none;
		width: 16pt;
		height: 16pt;
		fill: $TEXT-COLOR;
		@media (max-width: 600px) {
			display: block;
		}
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
		@media (max-width: 600px) {
			padding: 0;
			font-size: 1.2rem;
			display: flex;
			order: 0;
			flex: 2 1 100%;
			align-items: baseline;
			&::after {
				content: 'PHOTOS';
				color: $GREY;
				font-family: $base-font;
				padding-left: 1rem;
				font-size: 0.9rem;
				font-weight: 600;
			}
		}
		@media (max-width: 375px) {
			&::after {
				font-size: 0.8rem;
			}
		}
		@media (max-width: 320px) {
			&::after {
				font-size: 0.8rem;
				font-weight: 500;
			}
		}
	}
	&__counter {
		min-width: 1rem;
	}
	&__slash {
		padding: 0 4px;
	}
}
</style>
