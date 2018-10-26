<template>
<div class="booking-workplace__wrapper">
	<div class="logo__wrapper">
		<svg class="logo">
			<use xlink:href='#logo' />
		</svg>
	</div>
	<section class="booking-workplace">
		<div class="booking-workplace__inner booking-workplace__inner--back-button">
			<button-back></button-back>
		</div>
		<h1 class="booking-workplace__title">
			Booking of the
			workplace
		</h1>
		<div class="booking-workplace__inner booking-workplace__inner--choice">
			<label for='book-month' class="workplace-choice">
				<input id='book-month' type="radio" name='booking-type' form='booking-form' class="workplace-choice__input"
					onclick="radioUncheck(this)" checked>
				<div class="workplace-choice__inner">
					<p class="workplace-choice__title">Month</p>
					<a href='../resident-card/resident-card.html' class="workplace-choice__resident">Resident card</a>
					<p class="workplace-choice__price">1000</p>
					<a href='../resident-card/resident-card.html' class="workplace-choice__link-img">
						<svg class="workplace-choice__img workplace-choice__img--resident">
							<use xlink:href='#infoborder' />
						</svg>
					</a>

				</div>
			</label>
			<label for='book-week' class="workplace-choice">
				<input id='book-week' type="radio" name='booking-type' form='booking-form' class="workplace-choice__input" onclick="radioUncheck(this)">
				<div class="workplace-choice__inner">
					<p class="workplace-choice__title">Week</p>
					<p class="workplace-choice__price">400</p>
					<svg class="workplace-choice__img">
						<use xlink:href='#infoborder' />
					</svg>
				</div>
			</label>
			<label for='book-day' class="workplace-choice">
				<input id='book-day' type="radio" name='booking-type' form='booking-form' class="workplace-choice__input" onclick="radioUncheck(this)">
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
			<form action="" name='booking-form' id='booking-form' class="booking-workplace__form">
				<div class="booking-workplace__inner booking-workplace__inner--form">
					<div class="booking-workplace__input-wrapper">
						<label for="full-name-label" class="booking-workplace__label">FULL NAME*</label>
						<input id='full-name-label' required autocomplete='on' type="text" class="booking-workplace__input" placeholder="Андрій Малишко">
					</div>
					<div class="booking-workplace__input-wrapper">
						<label for="phone-label" class="booking-workplace__label">Phone*</label>
						<input id='phone-label' required autocomplete='on' type="tel" class="booking-workplace__input" placeholder="+38 (000) 000 00-00">
					</div>
				</div>
				<div class="booking-workplace__inner booking-workplace__inner--form">
					<div class="booking-workplace__input-wrapper">
						<label for="email-label" class="booking-workplace__label">E-mail*</label>
						<input id='email-label' required autocomplete='on' type="email" class="booking-workplace__input" placeholder="example@mail.com">
					</div>
					<div class="booking-workplace__input-wrapper">
						<label for="career-label" class="booking-workplace__label">career</label>
						<input id='career-label' type="text" autocomplete='on' class="booking-workplace__input" placeholder="Програміст на Джава">
					</div>
				</div>
			</form>
		</div>
		<p class="booking-workplace__description">* — Required fields</p>
		<div class="booking-workplace__inner booking-workplace__inner--price">
			<p class="booking-price">
				Price:
				<span class="booking-price__sum">1000</span>
			</p>
			<button-apply disabled></button-apply>
		</div>
	</section>
</div>	
</template>

<script>
import ButtonBack from '@/components/buttons/ButtonBack.vue';
import ButtonApply from '@/components/buttons/ButtonApply.vue';

export default {
  name: 'booking-workplace',
  components: {
    ButtonBack,
    ButtonApply
  }
}
</script>

<style lang="scss">
@import '../assets/scss/style.scss';
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
            margin-bottom: 22px;
            &:last-child {
                margin-bottom: 0;
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
            padding: 32px 0 29px 0;
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
    transition: color ease-in-out 0.3s,
    background-color ease-out 0.3s;
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
