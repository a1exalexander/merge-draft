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
    <resident-card v-if='visible.residentCard' :price='price' @closeCard='closeCard'></resident-card>
    </transition>
	<transition
		name="custom-classes-transition"
		enter-active-class="animated faster fadeIn"
		leave-active-class="animated faster fadeOut">
    <week-card v-if='visible.weekCard' :price='price' @closeCard='closeCard'></week-card>
    </transition>
	<transition
		name="custom-classes-transition"
		enter-active-class="animated faster fadeIn"
		leave-active-class="animated faster fadeOut">
    <day-card v-if='visible.dayCard' :price='price' @closeCard='closeCard'></day-card>
    </transition>
	<logo class='booking-workplace__logo'></logo>
	<section class="booking-workplace" :style="onStyleAnimate">
		<button-close-mini class="booking-workplace__close" @click.native='goBack'></button-close-mini>
		<div class="booking-workplace__inner booking-workplace__inner--back-button" @click='goBack'>
			<button-back class="booking-workplace__button-back" @click.native='goBack'></button-back>
			<p class="booking-workplace__button-text" @click.native='goBack'>{{ $t('bookingWorkplace.back') }}</p>
		</div>
		<h1 class="booking-workplace__title">{{ $t('bookingWorkplace.title') }}</h1>
		<div class="workplace-choice-mobile__wrapper">
			<label for='book-month-mobile' class="workplace-choice-mobile">
				<input id='book-month-mobile' 
                    type="radio" 
                    name='booking-type-mobile' 
                    form='booking-form' 
                    class="workplace-choice-mobile__input"
					value="month"
                    v-model="tariff"
                    checked>
				<div class="workplace-choice-mobile__inner">
					<div class="workplace-choice-mobile__check">
						<div class="workplace-choice-mobile__check-dot"></div>
					</div>
					<div class="workplace-choice-mobile__col">
						<p class="workplace-choice-mobile__title">{{ $t('bookingWorkplace.checkbox.month') }}</p>
						<p class="workplace-choice-mobile__resident">{{ $t('bookingWorkplace.checkbox.feature') }}</p>
					</div>
				</div>
				<div class="workplace-choice-mobile__inner workplace-choice-mobile__inner--price">
					<p class="workplace-choice-mobile__price">{{ price.month }}</p>
					<a href='#' class="workplace-choice-mobile__link-img" @click.prevent="visible.residentCard = true">
						<svg class="workplace-choice-mobile__img">
							<use xlink:href='#infoborder' />
						</svg>
					</a>
				</div>
			</label>
			<label for='book-week-mobile' class="workplace-choice-mobile">
				<input id='book-week-mobile' 
                    type="radio" 
                    name='booking-type-mobile' 
                    form='booking-form' 
                    class="workplace-choice-mobile__input"
					value="week"
                    v-model="tariff">
				<div class="workplace-choice-mobile__inner">
					<div class="workplace-choice-mobile__check">
						<div class="workplace-choice-mobile__check-dot"></div>
					</div>
					<div class="workplace-choice-mobile__col">
						<p class="workplace-choice-mobile__title">{{ $t('bookingWorkplace.checkbox.week') }}</p>
					</div>
				</div>
				<div class="workplace-choice-mobile__inner workplace-choice-mobile__inner--price">
					<p class="workplace-choice-mobile__price">{{ price.week }}</p>
					<a href='#' class="workplace-choice-mobile__link-img" @click.prevent="visible.weekCard = true">
						<svg class="workplace-choice-mobile__img">
							<use xlink:href='#infoborder' />
						</svg>
					</a>
				</div>
			</label>
			<label for='book-day-mobile' class="workplace-choice-mobile">
				<input id='book-day-mobile' 
                    type="radio" 
                    name='booking-type-mobile' 
                    form='booking-form' 
                    class="workplace-choice-mobile__input"
					value="day"
                    v-model="tariff">
				<div class="workplace-choice-mobile__inner">
					<div class="workplace-choice-mobile__check">
						<div class="workplace-choice-mobile__check-dot"></div>
					</div>
					<div class="workplace-choice-mobile__col">
						<p class="workplace-choice-mobile__title">{{ $t('bookingWorkplace.checkbox.day') }}</p>
					</div>
				</div>
				<div class="workplace-choice-mobile__inner workplace-choice-mobile__inner--price">
					<p class="workplace-choice-mobile__price">{{ price.day }}</p>
					<a href='#' class="workplace-choice-mobile__link-img" @click.prevent="visible.dayCard = true">
						<svg class="workplace-choice-mobile__img">
							<use xlink:href='#infoborder' />
						</svg>
					</a>
				</div>
			</label>
		</div>
		<div class="booking-workplace__inner booking-workplace__inner--choice">
			<label for='book-month' class="workplace-choice">
				<input id='book-month' 
                    type="radio" 
                    name='booking-type' 
                    form='booking-form' 
                    class="workplace-choice__input"
					value="month"
                    v-model="tariff"
                    checked>
				<div class="workplace-choice__inner">
					<p class="workplace-choice__title">{{ $t('bookingWorkplace.checkbox.month') }}</p>
					<p class="workplace-choice__resident">{{ $t('bookingWorkplace.checkbox.feature') }}</p>
					<p class="workplace-choice__price">{{ price.month }}</p>
					<a href='#' class="workplace-choice__link-img" @click.prevent="visible.residentCard = true">
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
					value="week"
                    v-model="tariff">
				<div class="workplace-choice__inner">
					<p class="workplace-choice__title">{{ $t('bookingWorkplace.checkbox.week') }}</p>
					<p class="workplace-choice__price">{{ price.week }}</p>
					<a href='#' class="workplace-choice__link-img" @click.prevent="visible.weekCard = true">
						<svg class="workplace-choice__img">
							<use xlink:href='#infoborder' />
						</svg>
					</a>
				</div>
			</label>
			<label for='book-day' class="workplace-choice">
				<input id='book-day'
                    type="radio" 
                    name='booking-type'
                    form='booking-form'
                    class="workplace-choice__input"
					value="day"
                    v-model="tariff">
				<div class="workplace-choice__inner">
					<p class="workplace-choice__title">{{ $t('bookingWorkplace.checkbox.day') }}</p>
					<p class="workplace-choice__price">{{ price.day }}</p>
					<a href='#' class="workplace-choice__link-img" @click.prevent="visible.dayCard = true">
						<svg class="workplace-choice__img">
							<use xlink:href='#infoborder' />
						</svg>
					</a>
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
						<label for="full-name-label" class="booking-workplace__label">{{ $t('bookingWorkplace.label.name') }}</label>
						<input id='full-name-label' 
                            required 
							autocomplete='on' 
                            type="text" 
                            class="booking-workplace__input" 
                            :class="{inputError: errors.name, greenBorder: !errors.name}"
                            placeholder="Andrey Malishko"	
							@blur="checkAll"
                            v-model.trim="form.name">
							<transition 
								name="custom-classes-transition"
								enter-active-class="animated03 pullDown"
								leave-active-class="animated02 pullUp">
							<p class='booking-workplace__validate booking-workplace__validate--name' v-if="errors.name">{{ errors.name }}</p>
							</transition>
					</div>
					<div class="booking-workplace__input-wrapper">
						<label for="phone-label" class="booking-workplace__label">{{ $t('bookingWorkplace.label.phone') }}</label>
						<input id='phone-label' 
                            required autocomplete='on' 
                            type="tel" 
                            class="booking-workplace__input" 
                            :class="{inputError: errors.phone, greenBorder: !errors.phone}"
                            placeholder="+38 (000) 000 00-00"
							@blur="checkAll"
                            v-model.trim="form.phone">
						<transition 
							name="custom-classes-transition"
							enter-active-class="animated03 pullDown"
							leave-active-class="animated02 pullUp">
						<p class='booking-workplace__validate booking-workplace__validate--phone' v-if="errors.phone">{{ errors.phone }}</p>
						</transition>
					</div>
				</div>
				<div class="booking-workplace__inner booking-workplace__inner--form booking-workplace__inner--email-career">
					<div class="booking-workplace__input-wrapper">
						<label for="email-label" class="booking-workplace__label">{{ $t('bookingWorkplace.label.mail') }}</label>
						<input id='email-label' 
                            required 
                            autocomplete='on' 
                            type="email" 
                            class="booking-workplace__input booking-workplace__input--required" 
                            :class="{inputError: errors.email, greenBorder: !errors.email}"
                            placeholder="example@mail.com"
							@blur="checkAll"
                            v-model.trim="form.email">
						<transition 
							name="custom-classes-transition"
							enter-active-class="animated03 pullDown"
							leave-active-class="animated02 pullUp">
						<p class='booking-workplace__validate booking-workplace__validate--email'  v-if="errors.email">{{ errors.email }}</p>
						</transition>
					</div>
					<div class="booking-workplace__input-wrapper">
						<label for="career-label" class="booking-workplace__label">{{ $t('bookingWorkplace.label.career') }}</label>
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
		<p class="booking-workplace__description">{{ $t('bookingWorkplace.required') }}</p>
		<div class="booking-workplace__inner booking-workplace__inner--price">
			<p class="booking-price booking-workplace__price">{{ $t('bookingWorkplace.price') }}
				<span class="booking-price__sum">{{ animatedNumber }}</span>
			</p>
			<button-apply 
                :disabled='showSubmit'
                @click.native="sendForm"
				class="booking-workplace__apply">
            </button-apply>
		</div>
		<button class="booking-workplace__cancel" @click.prevent='goBack'>{{ $t('bookingWorkplace.button') }}</button>
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
import DayCard from '@/components/DayCard.vue';
import WeekCard from '@/components/WeekCard.vue';
import Logo from '@/components/Logo.vue';
import ButtonCloseMini from '@/components/buttons/ButtonCloseMini.vue';
import BookingDone from '@/views/BookingDone.vue';

export default {
	name: 'BookingWorkplace',
	components: {
		ButtonBack,
		ButtonApply,
		ResidentCard,
		DayCard,
		WeekCard,
		Logo,
		ButtonCloseMini,
		BookingDone
	},
	data() {
		return {
			visible: {
				residentCard: false,
				dayCard: false,
				weekCard: false,
			},
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
				picked: this.tariff
			},
			validStatus: {
				name: false,
				phone: false,
				email: false
			},
			tweenedNumber: 0,
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
		closeCard() {
			this.visible.residentCard = false;
			this.visible.dayCard = false;
			this.visible.weekCard = false;
		},
		checkAll() {
			this.checkName();
			this.checkPhone();
			this.checkEmail();
		},
		checkName() {
			if (this.form.name && !this.validName(this.form.name) && this.form.phone && this.form.email) {
				this.errors.name = this.$t('validate.name');
			} else {
				this.errors.name = null;
			}
		},
		checkPhone() {
			if (this.form.phone && !this.validPhone(this.form.phone) && !this.validFormatPhone(this.form.phone) && this.form.name && this.form.email) {
				this.errors.phone = this.$t('validate.phone');
			} else {
				this.errors.phone = null;
			}
		},
		checkEmail() {
			if (this.form.email && !this.validEmail(this.form.email) && this.form.name && this.form.phone) {
				this.errors.email = this.$t('validate.mail');
			} else {
				this.errors.email = null;
			}
		},
		validEmail(email) {
			// eslint-disable-next-line
			let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,10}\.[0-9]{1,10}\.[0-9]{1,10}\.[0-9]{1,10}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,20}))$/;
			return re.test(email);
		},
		validPhone(phone) {
			// eslint-disable-next-line
			let re = /^((((\+?)+(3?)+8)?)0([0-9]){2})(([0-9]){3})(([0-9]){2})(([0-9]){2})$/;
			return re.test(phone);
		},
		validFormatPhone(phone) {
			let re = /^(\+38\s\(0(([0-9]){2})\)\s(([0-9]){3})\s(([0-9]){2})-(([0-9]){2}))$/;
			return re.test(phone);
		},
		validName(name) {
			// eslint-disable-next-line
			let re = /^([A-ZА-ЯА-ЩЬЮЯЇІЄҐ])+([a-zA-Zа-яА-Яа-щА-ЩЬьЮюЯяЇїІіЄєҐґ]{1,40})((\s?)([a-zA-Zа-яА-Яа-щА-ЩЬьЮюЯяЇїІіЄєҐґ]{1,40})){1,3}?$/;
			return re.test(name);
		},
		sendForm() {
			let params = JSON.stringify(this.form);
			http.post('https://jsonplaceholder.typicode.com/posts', params)
			.then(()=> {
				window.scrollTo(0, 0);
				this.bookingDone = true;
			})
			.catch(e => {
				this.errors.arr.push(e);
			});
		},
		updateTariff(value){
			this.$store.commit('change', value.target.value);
		}
	},
	computed: {
		tariff: {
			get () {
				let val = this.$store.state.tariff;
				let price = this.price[val];
				TweenLite.to(this.$data, 0.5, { tweenedNumber: price });
				return val;
			},
			set (value) {
				this.$store.commit('change', value)
			}
		},
		price() {
			return this.$store.state.price;
		},
		animatedNumber() {
			return this.tweenedNumber.toFixed(0);
		},
		showSubmit() {
			if (
				this.form.name &&
				this.form.phone &&
				this.form.email &&
				this.validStatus.name &&
				this.validStatus.phone &&
				this.validStatus.email &&
				!this.errors.name &&
				!this.errors.phone &&
				!this.errors.email
			) {
				return false;
			} else {
				return true;
			}
		},
		formatNumber() {
			if(this.validPhone(this.form.phone)) {
				let phone = this.form.phone,
				lenPhone = phone.length,
				arr = phone.split('');
				if( lenPhone == 10 ){
					arr.splice(0,"", "+38 ");
					arr.splice(1,"", "(");
					arr.splice(5,"", ") ");
					arr.splice(9,"", " ");
					arr.splice(12,"", "-");
				} else if (lenPhone == 11) {
					arr.splice(0,"", "+3");
					arr.splice(2,"", " ");
					arr.splice(3,"", "(");
					arr.splice(7,"", ") ");
					arr.splice(11,"", " ");
					arr.splice(14,"", "-");
				} else if (lenPhone == 12) {
					arr.splice(0,"", "+");
					arr.splice(4,"", " ");
					arr.splice(5,"", "(");
					arr.splice(8,"", ") ");
					arr.splice(12,"", " ");
					arr.splice(15,"", "-");
				} else if (lenPhone == 13) {
					arr.splice(3,"", " ");
					arr.splice(4,"", "(");
					arr.splice(8,"", ") ");
					arr.splice(12,"", " ");
					arr.splice(15,"", "-");
				}
				return arr.join('');
			}
		}
	},
	watch: {
		'form.name'() {
			if (this.form.name && this.validName(this.form.name)) {
				this.errors.name = null;
				this.validStatus.name = true;
			} else {
				this.validStatus.name = false;
			}
		},
		'form.phone'() {
			if (this.form.phone && (this.validPhone(this.form.phone) || this.validFormatPhone(this.form.phone))) {
				if(!this.validFormatPhone(this.form.phone)) {
					this.form.phone = this.formatNumber;
				}
				this.errors.phone = null;
				this.validStatus.phone = true;
				
			} else {
				this.validStatus.phone = false;
			}
		},
		'form.email'() {
			if (this.form.email && this.validEmail(this.form.email)) {
				this.errors.email = null;
				this.validStatus.email = true;
			} else {
				this.validStatus.email = false;
			}
		}
	},
	mounted() {
		this.tariff
	}
};
</script>

<style lang="scss">
@import '../assets/scss/style.scss';
.inputError {
	border-bottom: 2px solid $ERROR-COLOR !important;
	transition: border ease-in-out 0.2s;
	&:active {
		border-bottom: 2px solid $ERROR-COLOR !important;
		background-color: $BUTTON-COLOR;
		outline: none;
	}
	&:focus {
		border-bottom: 2px solid $ERROR-COLOR !important;
	}
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
		padding: 0;
		flex: 0 0 100%;
		align-self: flex-start;
	}
	&__logo {
		@media (max-width: 600px) {
			display: none;
		}
	}
	&__wrapper {
		width: 100%;
		min-height: 100vh;
		@extend %flex-row-c;
		align-items: center;
		@media (max-width: 600px) {
			padding: 32pt;
		}
		@media (max-width: 320px) {
			padding: 24pt;
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
	&__button-text {
		text-transform: uppercase;
		font-family: $base-font;
		font-size: 0.625rem;
		font-weight: bold;
		letter-spacing: 0.7px;
		text-align: left;
		color: $GREY;
		padding-left: 1rem;
		cursor: pointer;
		@media (max-width: 600px) {
			font-size: 0.8rem;
			font-weight: 700;
		}
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
				border: none;
				padding-bottom: 24pt;
			}
		}
		&--choice {
			justify-content: space-between;
			align-items: center;
			padding-bottom: 30px;
			border-bottom: 1px solid $BUTTON-COLOR;
			@media (max-width: 480px) {
				display: none;
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
			@media (max-width: 600px) {
				flex-direction: column;
			}
			@media (max-width: 480px) {
				padding: 0;
			}
		}
		&--price {
			justify-content: space-between;
			align-items: center;
			padding-top: 26px;
			border-top: 1px solid $BUTTON-COLOR;
			@media (max-width: 600px) {
				margin-bottom: 16pt;
			}
			@media (max-width: 480px) {
				padding: 0;
				border: none;
				justify-content: center;
			}
		}
	}
	&__title {
		font-family: $title-font;
		font-size: 2.5rem;
		font-weight: 500;
		text-align: left;
		color: $TEXT-COLOR;
		margin: 24px 0 28px 0;
		@media (max-width: 600px) {
			font-size: 2rem;
			text-align: center;
			margin: 0 0 22pt;
		}
		@media (max-width: 480px) {
			text-align: left;
		}
		@media (max-width: 320px) {
			font-size: 1.8rem;
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
		@media (max-width: 600px) {
			width: 100%;
			margin-bottom: 1.5rem;
		}
		@media (max-width: 480px) {
			margin-bottom: 25pt;
		}
	}
	&__description {
		font-family: $base-font;
		font-size: 10px;
		font-weight: 500;
		text-align: left;
		color: $GREY;
		padding-bottom: 1.5rem;
		@media (max-width: 480px) {
			display: none;
		}
	}

	&__input {
		width: 100%;
		background-color: $BUTTON-COLOR;
		border: none;
		outline: none;
		font-family: $base-font;
		font-size: 10px;
		font-weight: 500;
		text-align: left;
		color: $TEXT-COLOR;
		border-radius: 3px;
		padding: 12px 16px;
		line-height: 1;
		@media (max-width: 480px) {
			padding: 12pt 16pt;
			font-size: 11pt;
			font-weight: 400;
			line-height: 1;
		}
		&:-webkit-autofill,
		&:-webkit-autofill:hover,
		&:-webkit-autofill:focus,
		&:-webkit-autofill:active {
			animation-name: autofill;
			animation-fill-mode: both;
		}
		&::placeholder {
			color: $GREY;
			font-size: 10px;
			font-weight: 500;
			font-family: $base-font;
			line-height: 1;
			@media (max-width: 480px) {
				padding-top: 2pt;
				font-size: 11pt;
				line-height: 1;
				font-weight: 400;
			}
		}
	}
	&__label {
		text-transform: uppercase;
		font-family: $base-font;
		font-size: 0.5rem;
		font-weight: bold;
		text-align: left;
		color: $TEXT-COLOR;
		@extend %flex-col-fs;
		align-items: flex-start;
		margin-bottom: 11px;
		@media (max-width: 600px) {
			font-weight: 500;
			font-size: 9pt;
			margin-bottom: 10pt;
		}
	}
	&__price {
		@media (max-width: 480px) {
			display: none;
		}
	}
	&__apply {
		@media (max-width: 480px) {
			width: 100%;
			align-self: center;
		}
	}
	&__cancel {
		padding: 1rem 2rem;
		width: 100%;
		font-family: $base-font;
		font-size: 10pt;
		text-transform: uppercase;
		font-weight: bold;
		text-align: center;
		outline: none;
		border: none;
		color: $GREY;
		background-color: transparent;
		align-self: center;
		display: none;
		letter-spacing: 0.6pt;
		@media (max-width: 600px) {
			display: block;
		}
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
	@media (max-width: 480px) {
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
		position: static;
		width: 100%;
		height: 100%;
		fill: $GREY;
		right: 12px;
		top: 12px;
		transition: fill ease-in-out 0.2s;
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
.workplace-choice-mobile {
	@extend %flex-row-sb;
	align-items: baseline;
	position: relative;
	width: 100%;
	flex-wrap: nowrap;
	padding: 16pt 0;
	border-bottom: 1pt solid $MIDDLE-GREY-OPACITY;
	&__wrapper {
		display: none;
		width: 100%;
		@media (max-width: 480px) {
			display: block;
		}
	}
	&__inner {
		@extend %flex-row;
		flex-wrap: nowrap;
		align-items: flex-start;
		&--price {
			align-items: center;
		}
	}
	&__title {
		font-family: $base-font;
		font-size: 1.3rem;
		font-weight: 600;
		color: $TEXT-COLOR;
	}
	&__resident {
		font-family: $base-font;
		font-size: 0.7rem;
		font-weight: 500;
		color: $GREY-BORDER-COLOR;
		padding-top: 3pt;
	}
	&__link-img {
		padding: 0;
		@extend %flex-row-c;
		align-items: center;
	}
	&__img {
		fill: $TEXT-COLOR;
		width: 16pt;
		height: 16pt;
	}
	&__price {
		font-family: $base-font;
		font-size: 0.8rem;
		font-weight: 600;
		color: $TEXT-COLOR;
		letter-spacing: 0.7pt;
		margin-right: 12pt;
		&::after {
			content: ' UAH';
		}
	}
	&__input {
		opacity: 0;
		position: absolute;
		left: 4pt;
		top: 20pt;
		z-index: -10;
		outline: none;
		&:checked + .workplace-choice-mobile__inner .workplace-choice-mobile__check{
			background-color: $MERGE-MAIN-COLOR;
			border-color: $MERGE-MAIN-COLOR;
		}
		&:checked + .workplace-choice-mobile__inner .workplace-choice-mobile__check-dot {
			opacity: 1;
		}
	}
	&__check {
		height: 16pt;
		width: 16pt;
		background-color: $DARK-GREY;
		border-radius: 50%;
		border: 1pt solid $MIDDLE-GREY;
		@extend %flex-row-c;
		align-items: center;
		transition: color ease-in-out 0.2s;
		margin-right: 15pt;
	}
	&__check-dot {
		height: 8pt;
		width: 8pt;
		background-color: $MAIN-DARK-COLOR;
		border-radius: 50%;
		opacity: 0;
		transition: opacity ease-in-out 0.2s;
	}
}
</style>
