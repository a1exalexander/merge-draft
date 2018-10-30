<template>
<div class="booking-workplace__wrapper">
    <transition
    name="custom-classes-transition"
    enter-active-class="animated faster fadeIn"
    leave-active-class="animated faster fadeOut">
    <resident-card v-if='residentCard' @closeResidentCard='residentCard = false'></resident-card>
    </transition>
	<div class="logo__wrapper">
		<svg class="logo">
			<use xlink:href='#logo' />
		</svg>
	</div>
	<section class="booking-workplace" :style="onStyleAnimate">
		<div class="booking-workplace__inner booking-workplace__inner--back-button">
			<button-back @goBack='goBack'></button-back>
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
					<p class="workplace-choice__price">1000</p>
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
					<p class="workplace-choice__price">400</p>
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
					<p class="workplace-choice__price">80</p>
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
                            v-model.trim="form.name">
					</div>
					<div class="booking-workplace__input-wrapper">
						<label for="phone-label" class="booking-workplace__label">Phone*</label>
						<input id='phone-label' 
                            required autocomplete='on' 
                            type="tel" 
                            class="booking-workplace__input" 
                            :class="{inputError: inputError && errors.phone}"
                            placeholder="+38 (000) 000 00-00"
                            v-model.trim="form.phone">
					</div>
				</div>
                <transition 
                    name="custom-classes-transition"
                    enter-active-class="animated03 pullDown"
                    leave-active-class="animated02 pullUp">
                <div class="booking-workplace__validate-box" v-if="errors.name || errors.phone">
                    <transition 
                        name="custom-classes-transition"
                        enter-active-class="animated03 pullDown"
                        leave-active-class="animated02 pullUp">
                    <p class='booking-workplace__validate booking-workplace__validate--name' 
                        v-if="errors.name">Please enter {{ errors.name }} to continue</p>
                    </transition>
                    <transition 
                        name="custom-classes-transition"
                        enter-active-class="animated03 pullDown"
                        leave-active-class="animated02 pullUp">
                    <p class='booking-workplace__validate booking-workplace__validate--phone' 
                        v-if="errors.phone">Please enter {{ errors.phone }} to continue</p>
                    </transition>
                </div>
                </transition>
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
                            v-model.trim="form.email">
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
                <transition 
                    name="custom-classes-transition"
                    enter-active-class="animated03 pullDown"
                    leave-active-class="animated02 pullUp">
                <div class="booking-workplace__validate-box" v-if="errors.email || errors.career">
                    <transition 
                        name="custom-classes-transition"
                        enter-active-class="animated03 pullDown"
                        leave-active-class="animated02 pullUp">
                    <p class='booking-workplace__validate booking-workplace__validate--email' 
                        v-if="errors.email">Please enter {{ errors.email }} to continue</p>
                    </transition>
                </div>
                </transition>
			</form>
		</div>
		<p class="booking-workplace__description">* — Required fields</p>
		<div class="booking-workplace__inner booking-workplace__inner--price">
			<p class="booking-price">
				Price:
				<span class="booking-price__sum">1000</span>
			</p>
			<button-apply 
                :disabled='showSubmit()'
                form='booking-form'
                @click.prevent="sendForm">
            </button-apply>
		</div>
	</section>
    <svg style="display: none">
      <symbol id='logo' viewBox="0 0 31 40">
        <path fill-rule="evenodd" d="M20.4593069,32.8365086 L23.8888332,29.1227295 L31,36.2862209 L27.570731,40 L20.4593069,32.8365086 Z M15.4625816,0 L26.0850832,10.7005349 L18.0964043,10.7005349 L18.0964043,25.4662469 L3.77682656,39.9891419 L0,36.2971308 L12.693955,23.3086219 L12.693955,10.7005349 L4.89641986,10.7005349 L15.4625816,0 Z"
        id="Combined-Shape"></path>
        <symbol id='infoborder' width="16px" height="16px" viewBox="0 0 24 24">
			<path d="M11,17 L13,17 L13,11 L11,11 L11,17 L11,17 Z M12,2 C6.48,2 2,6.48 2,12 C2,17.52 6.48,22 12,22 C17.52,22 22,17.52 22,12 C22,6.48 17.52,2 12,2 L12,2 Z M12,20 C7.59,20 4,16.41 4,12 C4,7.59 7.59,4 12,4 C16.41,4 20,7.59 20,12 C20,16.41 16.41,20 12,20 L12,20 Z M11,9 L13,9 L13,7 L11,7 L11,9 L11,9 Z" id="Shape"></path>
		</symbol>
      </symbol>
    </svg>
</div>	
</template>

<script>
import axios from 'axios';

import ButtonBack from '@/components/buttons/ButtonBack.vue';
import ButtonApply from '@/components/buttons/ButtonApply.vue';
import ResidentCard from '@/components/ResidentCard.vue';

export default {
	name: 'booking-workplace',
	components: {
		ButtonBack,
		ButtonApply,
		ResidentCard
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
			inputError: true,
			styleAnimate: {
				transform: 'translateX(-200%)',
				transition: 'transform ease-in-out 0.3s'
			},
			onStyleAnimate: null
		};
	},
	methods: {
        goBack() {
            this.onStyleAnimate = this.styleAnimate;
			let onThis = this;
			setTimeout(function() {
				if (window.history.length > 1) {
					onThis.$router.go(-1);
				} else {
					onThis.$router.go(-1);
				}
			}, 100)	
		},
		checkName: function() {
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
		checkPhone: function() {
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
		checkEmail: function() {
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
		validEmail: function(email) {
            let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
		},
		validPhone: function(phone) {
            let re = /^((((\+?)+(3?)+8)?)+((\(|\-)?([0-9]){3}(\)|\-)?)+(\-?)+(([0-9]){3})+(\-?)+(([0-9]){2})+(\-?)+(([0-9]){2}))$/;
            return re.test(phone);
		},
		validName: function(name) {
            let re = /^((([A-Z])+([a-z]{1,}))+\s+(([A-Z])+([a-z]){1,}))$/;
            return re.test(name);
		},
		showSubmit: function() {
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
		sendForm: function() {
			if (!this.showSubmit()) {
				let params = JSON.stringify(this.form);
				axios.post('https://jsonplaceholder.typicode.com/posts', params)
					.then(response => {
						console.log(response);
					})
					.catch(e => {
						this.errors.arr.push(e);
					});
			}
		}
	},
	watch: {
		'form.name': 'checkName',
		'form.phone': 'checkPhone',
		'form.email': 'checkEmail',
		'form.career': 'checkCareer'
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
	flex: 0 0 30%;
	@extend %flex-col-sb;
	will-change: transform;
	align-items: flex-start;
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
			padding-top: 4rem;
			.logo__wrapper {
				position: absolute;
				left: auto;
				right: auto;
				top: 1rem;
			}
		}
	}
	&__validate-box {
		display: grid;
		grid-template-columns: repeat(2, 48%);
		justify-content: space-between;
		justify-items: start;
		align-items: start;
	}
	&__validate {
		font-family: $base-font;
		font-size: 0.625rem;
		font-weight: 500;
		text-align: left;
		color: $ERROR-COLOR;
		padding: 0;
		&--name {
			grid-column: 1;
		}
		&--phone {
			grid-column: 2;
			min-height: 26px;
		}
		&--email {
			grid-column: 1;
			padding-bottom: 0;
		}
		&--career {
			grid-column: 2;
			padding-bottom: 0;
		}
	}
	&__inner {
		width: 100%;
		@extend %flex-row;
		align-items: center;

		&--back-button {
			justify-content: flex-start;
			padding-bottom: 22px;
			border-bottom: 1px solid $MIDDLE-GREY;
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
			align-items: center;
			@media (max-width: 550px) {
				flex-direction: column;
			}
		}
		&--name-phone {
			padding-bottom: 0.7rem;
		}
		&--email-career {
			padding-top: 0.7rem;
			padding-bottom: 0.7rem;
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
			padding: 2rem 0 1rem 0;
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
		margin-bottom: 24px;
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
	width: 128px;
	height: 74px;
	border-radius: 3px;
	background-color: $MAIN-DARK-COLOR;
	border: none;
	outline: none;
	position: relative;
	cursor: pointer;
	margin-right: 1rem;
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
