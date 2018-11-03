<template>
<div class="booking-workplace__wrapper">
	<transition 
		appear
		name="custom-classes-transition"
		enter-active-class="animated fadeIn"
		mode="out-in">
	<booking-done v-if='bookingDone'></booking-done>
	</transition>
    <transition
    name="custom-classes-transition"
    enter-active-class="animated faster fadeIn"
    leave-active-class="animated faster fadeOut">
    <resident-card v-if='residentCard' @close='residentCard = false'></resident-card>
    </transition>
	<logo></logo>
	<section class="booking-workplace" :style="onStyleAnimate">
		<button-close-mini class="booking-workplace__close" @close='goBack'></button-close-mini>
		<div class="booking-workplace__inner booking-workplace__inner--back-button">
			<button-back class="booking-workplace__button-back" @goBack='goBack'></button-back>
			<p class="booking-workplace__button-text">go back</p>
		</div>
		<h1 class="booking-workplace__title">Booking of the
			workplace
		</h1>
		<div class="booking-workplace__inner booking-workplace__inner--choice">
			<label for='book-month' class="workplace-choice">
				<input id='book-month' 
                    type="radio" 
                    name='booking-type' 
                    form='booking-form' 
                    class="workplace-choice__input"
                    value='month'
                    v-model="form.picked"
                    checked>
				<div class="workplace-choice__inner">
					<p class="workplace-choice__title">Month</p>
					<p class="workplace-choice__resident">Resident card</p>
					<p class="workplace-choice__price">{{ price.month }}</p>
					<a href='#' class="workplace-choice__link-img" @click.prevent="residentCard = true">
						<svg class="workplace-choice__img workplace-choice__img--resident">
							<use xlink:href='#infoborder' />
						</svg>
					</a>

				</div>
			</label>
			<label for='book-week' class="workplace-choice">
				<input id='book-week' 
                    type="radio" 
                    name='booking-type' 
                    form='booking-form' 
                    class="workplace-choice__input" 
                    value='week'
                    v-model="form.picked">
				<div class="workplace-choice__inner">
					<p class="workplace-choice__title">Week</p>
					<p class="workplace-choice__price">{{ price.week }}</p>
					<svg class="workplace-choice__img">
						<use xlink:href='#infoborder' />
					</svg>
				</div>
			</label>
			<label for='book-day' class="workplace-choice">
				<input id='book-day'
                    type="radio" 
                    name='booking-type'
                    form='booking-form'
                    class="workplace-choice__input"
                    value='day'
                    v-model="form.picked">
				<div class="workplace-choice__inner">
					<p class="workplace-choice__title">Day</p>
					<p class="workplace-choice__price">{{ price.day }}</p>
					<svg class="workplace-choice__img">
						<use xlink:href='#infoborder' />
					</svg>
				</div>
			</label>
		</div>
		<div class="booking-workplace__col booking-workplace__col--form">
			<form name='booking-form' 
                id='booking-form' 
                class="booking-workplace__form"
                v-on:submit.prevent="sendForm">
				<div class="booking-workplace__inner booking-workplace__inner--form booking-workplace__inner--name-phone">
					<div class="booking-workplace__input-wrapper">
						<label for="full-name-label" class="booking-workplace__label">FULL NAME*</label>
						<input id='full-name-label' 
                            required autocomplete='on' 
                            type="text" 
                            class="booking-workplace__input" 
                            :class="{inputError: inputError && errors.name}"
                            placeholder="Андрій Малишко"
							@blur="checkName"
                            v-model.trim="form.name">
							<transition 
								name="custom-classes-transition"
								enter-active-class="animated03 pullDown"
								leave-active-class="animated02 pullUp">
							<p class='booking-workplace__validate booking-workplace__validate--name' v-if="errors.name">Please enter {{ errors.name }} to continue</p>
							</transition>
					</div>
					<div class="booking-workplace__input-wrapper">
						<label for="phone-label" class="booking-workplace__label">Phone*</label>
						<input id='phone-label' 
                            required autocomplete='on' 
                            type="tel" 
                            class="booking-workplace__input" 
                            :class="{inputError: inputError && errors.phone}"
                            placeholder="+38 (000) 000 00-00"
							@blur="checkPhone"
                            v-model.trim="form.phone">
						<transition 
							name="custom-classes-transition"
							enter-active-class="animated03 pullDown"
							leave-active-class="animated02 pullUp">
						<p class='booking-workplace__validate booking-workplace__validate--phone' v-if="errors.phone">Please enter {{ errors.phone }} to continue</p>
						</transition>
					</div>
				</div>
				<div class="booking-workplace__inner booking-workplace__inner--form booking-workplace__inner--email-career">
					<div class="booking-workplace__input-wrapper">
						<label for="email-label" class="booking-workplace__label">E-mail*</label>
						<input id='email-label' 
                            required 
                            autocomplete='on' 
                            type="email" 
                            class="booking-workplace__input booking-workplace__input--required" 
                            :class="{inputError: inputError && errors.email}"
                            placeholder="example@mail.com"
							@blur="checkEmail"
                            v-model.trim="form.email">
						<transition 
							name="custom-classes-transition"
							enter-active-class="animated03 pullDown"
							leave-active-class="animated02 pullUp">
						<p class='booking-workplace__validate booking-workplace__validate--email'  v-if="errors.email">Please enter {{ errors.email }} to continue</p>
						</transition>
					</div>
					<div class="booking-workplace__input-wrapper">
						<label for="career-label" class="booking-workplace__label">career</label>
						<input id='career-label' 
                            type="text" 
                            autocomplete='on' 
                            class="booking-workplace__input" 
                            placeholder="UI/UX Designer"
                            v-model="form.career">
					</div>
				</div>
			</form>
		</div>
		<p class="booking-workplace__description">* — Required fields</p>
		<div class="booking-workplace__inner booking-workplace__inner--price">
			<p class="booking-price">
				Price:
				<span class="booking-price__sum">{{ animatedNumber }}</span>
			</p>
			<button-apply 
                :disabled='showSubmit()'
                form='booking-form'
                @click.prevent="sendForm">
            </button-apply>
		</div>
	</section>
    <svg style="display: none">
        <symbol id='infoborder' width="16px" height="16px" viewBox="0 0 24 24">
			<path d="M11,17 L13,17 L13,11 L11,11 L11,17 L11,17 Z M12,2 C6.48,2 2,6.48 2,12 C2,17.52 6.48,22 12,22 C17.52,22 22,17.52 22,12 C22,6.48 17.52,2 12,2 L12,2 Z M12,20 C7.59,20 4,16.41 4,12 C4,7.59 7.59,4 12,4 C16.41,4 20,7.59 20,12 C20,16.41 16.41,20 12,20 L12,20 Z M11,9 L13,9 L13,7 L11,7 L11,9 L11,9 Z" id="Shape"></path>
		</symbol>
    </svg>
</div>	
</template>

<script>
import http from 'axios';
import { TweenLite } from 'gsap';
import ButtonBack from '@/components/buttons/ButtonBack.vue';
import ButtonApply from '@/components/buttons/ButtonApply.vue';
import ResidentCard from '@/components/ResidentCard.vue';
import Logo from '@/components/Logo.vue';
import ButtonCloseMini from '@/components/buttons/ButtonCloseMini.vue';
import BookingDone from '@/views/BookingDone.vue';

export default {
	name: 'BookingWorkplace',
	components: {
		ButtonBack,
		ButtonApply,
		ResidentCard,
		Logo,
		ButtonCloseMini,
		BookingDone
	},
	data() {
		return {
			residentCard: false,
			errors: {
				name: null,
				phone: null,
				email: null,
				career: null,
				arr: []
			},
			form: {
				name: null,
				phone: null,
				email: null,
				career: null,
				picked: 'month'
			},
			price: {
				month: 1000,
				week: 400,
				day: 80
			},
			tweenedNumber: 0,
			inputError: true,
			styleAnimate: {
				transform: 'translateX(-200%)',
				transition: 'transform ease-in-out 0.3s'
			},
			onStyleAnimate: null,
			bookingDone: false
		};
	},
	methods: {
		goBack() {
			this.onStyleAnimate = this.styleAnimate;
			setTimeout(() => {
				if (window.history.length > 1) {
					this.$router.go(-1);
				} else {
					this.$router.push('/');
				}
			}, 100);
		},
		checkName() {
			if (!this.form.name) {
				this.errors.name = 'your name and surname';
				this.showSubmit();
			} else if (!this.validName(this.form.name)) {
				this.errors.name = 'correct name and surname';
				this.showSubmit();
			} else {
				this.errors.name = null;
				this.showSubmit();
			}
		},
		checkPhone() {
			if (!this.form.phone) {
				this.errors.phone = 'your phone';
				this.showSubmit();
			} else if (!this.validPhone(this.form.phone)) {
				this.errors.phone = 'correct phone';
				this.showSubmit();
			} else {
				this.errors.phone = null;
				this.showSubmit();
			}
		},
		checkEmail() {
			if (!this.form.email) {
				this.errors.email = 'your e-mail';
				this.showSubmit();
			} else if (!this.validEmail(this.form.email)) {
				this.errors.email = 'correct e-mail';
				this.showSubmit();
			} else {
				this.errors.email = null;
				this.showSubmit();
			}
		},
		validEmail(email) {
			// eslint-disable-next-line
			let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return re.test(email);
		},
		validPhone(phone) {
			// eslint-disable-next-line
			let re = /^((((\+?)+(3?)+8)?)+((\(|\-)?([0-9]){3}(\)|\-)?)+(\-?)+(([0-9]){3})+(\-?)+(([0-9]){2})+(\-?)+(([0-9]){2}))$/;
			return re.test(phone);
		},
		validName(name) {
			// eslint-disable-next-line
			let re = /^((([A-ZА-ЯА-ЩЬЮЯЇІЄҐ])+([a-zA-Zа-яА-Яа-щА-ЩЬьЮюЯяЇїІіЄєҐґ]{1,}))+\s+(([A-ZА-ЯА-ЩЬЮЯЇІЄҐ])+([a-zA-Zа-яА-Яа-щА-ЩЬьЮюЯяЇїІіЄєҐґ]){1,}))$/;
			return re.test(name);
		},
		showSubmit() {
			if (
				this.form.name &&
				this.form.phone &&
				this.form.email &&
				!this.errors.name &&
				!this.errors.phone &&
				!this.errors.email
			) {
				return false;
			} else {
				return true;
			}
		},
		sendForm() {
			if (!this.showSubmit()) {
				let params = JSON.stringify(this.form);
				http.post('https://jsonplaceholder.typicode.com/posts', params)
					.then(()=> {
						this.bookingDone = true;
					})
					.catch(e => {
						this.errors.arr.push(e);
					});
			}
		}
	},
	computed: {
		animatedNumber() {
			return this.tweenedNumber.toFixed(0);
		}
	},
	watch: {
		'form.name'() {
			if (this.form.name && this.validName(this.form.name)) {
				this.errors.name = null;
				this.showSubmit();
				this.validEmail(this.form.email);
			}
		},
		'form.phone'() {
			if (this.form.phone && this.validPhone(this.form.phone)) {
				this.errors.phone = null;
				this.showSubmit();
			}
		},
		'form.email'() {
			if (this.form.email && this.validEmail(this.form.email)) {
				this.errors.email = null;
				this.showSubmit();
			}
		},
		'form.picked'() {
			let val = this.price[this.form.picked];
			TweenLite.to(this.$data, 0.5, { tweenedNumber: val });
		}
	},
	mounted() {
		TweenLite.to(this.$data, 0.5, {
			tweenedNumber: this.price[this.form.picked]
		});
	}
};
</script>

<style lang="scss">
@import '../assets/scss/style.scss';
.inputError {
	border-bottom: 2px solid $ERROR-COLOR !important;
	animation-name: borderIn;
	animation-timing-function: ease-in-out;
	animation-duration: 0.5s;
}
.booking-workplace {
	padding: 2rem 0;
	flex: 0 0 30%;
	@extend %flex-col-sb;
	will-change: transform;
	align-items: flex-start;
	position: relative;
	@media (min-width: 600px) {
		min-width: 430px;
	}
	@media (max-width: 600px) {
		flex: 0 0 100%;
		align-self: flex-start;
	}
	&__wrapper {
		width: 100%;
		min-height: 100vh;
		@extend %flex-row-c;
		align-items: center;
		@media (max-width: 600px) {
			padding: 2rem;
			padding-top: 3rem;
		}
	}
	&__close {
		right: 0;
		top: 2.2rem;
		animation-name: fadeIn;
		animation-duration: 0.2s;
		animation-timing-function: ease-in-out;
		@media (max-width: 600px) {
			display: none;
		}
	}
	&__button-back {
		margin-right: 1rem;
	}
	&__button-text {
		text-transform: uppercase;
		font-family: $base-font;
		font-size: 0.625rem;
		font-weight: bold;
		letter-spacing: 0.7px;
		text-align: left;
		color: $GREY;
	}
	&__validate {
		font-family: $base-font;
		font-size: 0.625rem;
		font-weight: 500;
		text-align: left;
		color: $ERROR-COLOR;
		padding-top: 0.7rem;
		&--name {
			grid-column: 1;
		}
		&--phone {
			grid-column: 2;
		}
		&--email {
			grid-column: 1;
		}
		&--career {
			grid-column: 2;
		}
	}
	&__inner {
		width: 100%;
		@extend %flex-row;
		align-items: center;

		&--back-button {
			justify-content: flex-start;
			padding-bottom: 1.375rem;
			border-bottom: 1px solid $MIDDLE-GREY;
			@media (max-width: 600px) {
				justify-content: center;
				padding: 2rem 0;
			}
		}
		&--choice {
			justify-content: space-between;
			align-items: center;
			padding-bottom: 30px;
			border-bottom: 1px solid $BUTTON-COLOR;
			@media (max-width: 460px) {
				flex-direction: column;
			}
		}
		&--form {
			width: 100%;
			justify-content: space-between;
			align-items: flex-start;
			padding-bottom: 1.5rem;
			&:last-child {
				padding-bottom: 0;
			}
			@media (max-width: 550px) {
				flex-direction: column;
			}
		}
		&--price {
			justify-content: space-between;
			align-items: center;
			padding-top: 26px;
			border-top: 1px solid $BUTTON-COLOR;
		}
	}

	&__title {
		font-family: $title-font;
		font-size: 40px;
		font-weight: 500;
		text-align: left;
		color: $TEXT-COLOR;
		margin: 24px 0 28px 0;
		@media (max-width: 600px) {
			text-align: center;
		}
	}

	&__col {
		@extend %flex-col;
		&--form {
			padding: 2rem 0 1.1rem 0;
			width: 100%;
		}
	}
	&__input-wrapper {
		@extend %flex-col;
		width: 48%;
		@media (max-width: 550px) {
			width: 100%;
			margin-bottom: 1rem;
		}
	}
	&__description {
		font-family: $base-font;
		font-size: 10px;
		font-weight: 500;
		text-align: left;
		color: $GREY;
		padding-bottom: 1.5rem;
	}

	&__input {
		width: 100%;
		height: 40px;
		background-color: $BUTTON-COLOR;
		border: none;
		outline: none;
		text-indent: 16px;
		font-family: $base-font;
		font-size: 10px;
		font-weight: 500;
		text-align: left;
		color: $TEXT-COLOR;
		border-radius: 3px;
		&::placeholder {
			text-indent: 16px;
			color: $GREY;
			font-size: 10px;
			font-weight: 500;
			font-family: $base-font;
		}
	}

	&__label {
		text-transform: uppercase;
		font-family: $base-font;
		font-size: 8px;
		font-weight: bold;
		text-align: left;
		color: $TEXT-COLOR;
		@extend %flex-col-fs;
		align-items: flex-start;
		margin-bottom: 11px;
	}
}
.workplace-choice {
	flex: 0 0 30%;
	height: 74px;
	border-radius: 3px;
	background-color: $MAIN-DARK-COLOR;
	border: none;
	outline: none;
	position: relative;
	cursor: pointer;
	transition: color ease-in-out 0.3s, background-color ease-out 0.3s;
	@media (max-width: 600px) {
		width: 100%;
	}
	@media (max-width: 460px) {
		margin-right: 0;
		margin-bottom: 1rem;
	}
	&:last-child {
		margin: 0;
	}
	&__input {
		position: absolute;
		left: 1rem;
		top: 1rem;
		z-index: -10;
		outline: none;
		&:checked + .workplace-choice__inner {
			background-color: $MERGE-SECONDARY-COLOR;
			border-color: $MERGE-SECONDARY-COLOR;
			transition: background-color ease-in-out 0.2s,
				border-color ease-in-out 0.2s;
			.workplace-choice__title,
			.workplace-choice__resident {
				color: $MAIN-DARK-COLOR;
				transition: color ease-in-out 0.3s;
			}
			.workplace-choice__price {
				color: #333333;
				transition: color ease-in-out 0.3s;
			}
			.workplace-choice__img {
				fill: $MAIN-DARK-COLOR;
				transition: fill ease-in-out 0.3s;
			}
		}
	}
	&__inner {
		border-radius: 3px;
		background-color: $MAIN-DARK-COLOR;
		border: solid 2px $DARK-GREY;
		outline: none;
		@extend %flex-col-sb;
		align-items: flex-start;
		padding: 10px 13px;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
	}
	&__title {
		font-family: $base-font;
		font-size: 14px;
		font-weight: 700;
		text-align: left;
		color: $GREY;
	}
	&__resident {
		font-family: $base-font;
		font-size: 9px;
		font-weight: 500;
		text-align: left;
		color: $GREY;
		text-decoration: none;
	}

	&__price {
		font-family: $base-font;
		font-size: 10px;
		font-weight: 500;
		text-align: left;
		color: $GREY;
		&::after {
			content: ' uah';
		}
	}
	&__link-img {
		position: absolute;
		width: 16px;
		height: 16px;
		text-decoration: none;
		right: 12px;
		top: 12px;
	}
	&__img {
		position: absolute;
		width: 16px;
		height: 16px;
		fill: $GREY;
		right: 12px;
		top: 12px;
		transition: fill ease-in-out 0.2s;
		&--resident {
			position: static;
			width: 100%;
			height: 100%;
		}
	}
	&:hover .workplace-choice__link-img:hover > svg {
		fill: white;
	}
}
.booking-price {
	font-family: $base-font;
	font-size: 13px;
	font-weight: 500;
	line-height: 2;
	text-align: left;
	color: $TEXT-COLOR;
	&__sum {
		font-family: $title-font;
		font-size: 30px;
		font-weight: 500;
		text-align: left;
		color: $MERGE-MAIN-COLOR;
		&::after {
			content: ' UAH';
			text-transform: uppercase;
			font-family: $base-font;
			font-size: 8px;
			font-weight: 700;
			line-height: 2;
			letter-spacing: 0.5px;
			text-align: left;
			color: $GREY;
		}
	}
}
</style>
