<template>

<section id="hello" class="hello">
	<p class="hello__title">Hello!<br>We’re
		<span class="hello__logo">MERGE</span>
	</p>
	<h2 class="hello__subtitle">COWORKING IN THE CENTRE OF KREMENCHUK
	</h2>
	<div class="hello-link__wrapper">
		<a href="#" class="hello-link hello-link--how-get">
			<svg class='hello-link__img'>
				<use xlink:href='#videocamera' />
			</svg>
			<p class="hello-link__text">how to get to the MERGE
			</p>
		</a>
		<a href="#" class="hello-link hello-link--prices">
			<svg class='hello-link__img'>
				<use xlink:href='#infoborder' />
			</svg>
			<p class="hello-link__text">PRICES AND WORKING HOURS
			</p>
		</a>
	</div>
	<p class="hello__text">We offer
		<a class='hello__text--link'>comfortable conditions</a>
		for remote work and we are dreaming to organize
		<a href='#' class='hello__text--link'>Merge Community</a>
		. Also, we have a
		<a href='#' class='hello__text--link'>meeting room</a>
		with a 50 inch TV. We regularly organize
		<a href='#' class='hello__text--link'>lectures and workshops</a>
		in various specialties.
	</p>
	<div class="hello__button-wrapper">
		<button-membership @click.native='becomeMember'></button-membership>
		<button-book-room @click.native='meetingRoom'></button-book-room>
	</div>
	<social-networks class="hello__social"></social-networks>
    <svg style="display: none">
       <symbol id='videocamera' viewBox="0 0 24 24">
        <path d="M17,10.5 L17,7 C17,6.45 16.55,6 16,6 L4,6 C3.45,6 3,6.45 3,7 L3,17 C3,17.55 3.45,18 4,18 L16,18 C16.55,18 17,17.55 17,17 L17,13.5 L21,17.5 L21,6.5 L17,10.5 L17,10.5 Z"
          id="Shape"></path>
      </symbol>
      <symbol id='infoborder' viewBox="0 0 24 24">
        <path d="M11,17 L13,17 L13,11 L11,11 L11,17 L11,17 Z M12,2 C6.48,2 2,6.48 2,12 C2,17.52 6.48,22 12,22 C17.52,22 22,17.52 22,12 C22,6.48 17.52,2 12,2 L12,2 Z M12,20 C7.59,20 4,16.41 4,12 C4,7.59 7.59,4 12,4 C16.41,4 20,7.59 20,12 C20,16.41 16.41,20 12,20 L12,20 Z M11,9 L13,9 L13,7 L11,7 L11,9 L11,9 Z"
          id="Shape"></path>
      </symbol>
    </svg>
</section>

</template>

<script>
import ButtonMembership from '@/components/buttons/ButtonMembership.vue';
import ButtonBookRoom from '@/components/buttons/ButtonBookRoom.vue';
import SocialNetworks from '@/components/SocialNetworks.vue';

export default {
    name: 'Hello',
    components: {
    ButtonMembership,
    ButtonBookRoom,
    SocialNetworks
  },
  methods: {
      meetingRoom() {
          this.$router.push('/meeting-room');
      },
      becomeMember() {
          this.$router.push('/booking-workplace');
      }
  }
};
</script>

<style lang="scss">
@import '../assets/scss/style.scss';
.hello {
    padding: 3rem 0 3rem 112px;
    width: 100%;
    grid-column: 2;
    display: grid;
    grid-template-columns: 10% auto auto;
    grid-template-rows: repeat(5, auto);
    grid-template-areas:
        '. title    '
        '. subtitle '
        '. link     '
        '. text     '
        '. btn      ';
    grid-row-gap: 2rem;
    align-content: center;
    justify-items: start;
    justify-content: start;
    @media (max-width: 810px) {
        padding-right: 10%;
    }
    @media (max-width: 600px) {
        grid-template-rows: repeat(6, auto);
        padding: 5rem 1rem 3rem 1rem;
        grid-template-areas:
        'title title    '
        'subtitle subtitle '
        'link link     '
        'text text     '
        'btn btn      '
        'social social';
        justify-items: center;
        justify-content: center;
        animation-name: slideDown;
        animation-duration: 0.5s;
        animation-timing-function: ease-in-out;
    }
    @media (min-width: 600px) {
        grid-template-rows: repeat(6, auto);
        grid-template-areas:
        '. title    '
        '. subtitle '
        '. link     '
        '. text     '
        '. btn      '
        '. social   ';
    }
    &__title {
        grid-area: title;
		@extend %flex-row;
		justify-content: flex-start;
        margin: 0;
        font-size: 5rem;
        text-align: left;
		font-family: $title-font;
		white-space: nowrap;
        color: white;
        font-weight: 500;
        @media (min-width: 600px) and (max-width: 810px) {
            flex-direction: column;
            align-items: flex-start;
            text-align: left;
        }
        @media (max-width: 600px) {
            flex-direction: column;
            font-size: 3.5rem;
            align-items: center;
            text-align: center;
            width: 100%;
        }
    }
    &__logo {
        align-self: flex-end;
        margin: 0;
        font-size: 5rem;
        text-align: left;
        font-family: $title-font;
        font-weight: 500;
        color: $MERGE-MAIN-COLOR;
		letter-spacing: 20px;
		white-space: normal;
        @media (max-width: 600px) {
            width: 100%;
            font-size: 3.5rem;
            text-align: center;
        }
    }

    &__subtitle {
        margin: 0;
        grid-area: subtitle;
        text-transform: uppercase;
        font-family: $base-font;
        color: white;
        font-size: 17px;
        font-weight: 700;
        white-space: nowrap;
        @media (max-width: 460px) {
            white-space: normal;
            text-align: center;
        }
    }

    &__text {
        max-width: 45%;
        min-width: 553px;
        grid-area: text;
        align-items: start;
        font-family: $base-font;
        color: white;
        font-size: 13px;
        font-weight: 500;
        text-align: left;
        line-height: 2.5;
        border-top: 1px solid $BUTTON-COLOR;
        padding: 1.8rem 0 1.2rem 0;
        @media (max-width: 810px) {
            min-width: fit-content;
            width: 100%;
        }
        &--link {
            text-decoration: none;
            color: $TEXT-LINK-COLOR;
            font-weight: 600;
        }
    }
    &__button-wrapper {
        @extend %flex-row;
        grid-area: btn;
        .button-membership {
            margin-right: 2rem;
        }
        @media (max-width: 460px) {
           flex-direction: column;
           width: 100%;
            .button-membership,
            .button-book-room {
                width: 100%;
            }
            .button-membership {
                margin-right: 0;
                margin-bottom: 2rem;
            }
        }
    }
    &__social {
        display: none;
        @media (max-width: 600px) {
            padding-top: 2rem;
            display: grid;
            grid-template-columns: repeat(3, auto);
            grid-column-gap: 3rem;
            align-items: center;
            grid-area: social;
        }
        .social-networks__link {
            @media (max-width: 600px) {
                width: 42px;
                height: 42px;
            }
        }
        .social-networks__img {
            @media (max-width: 600px) {
                width: 32px;
                height: 32px;
            }
        }
        
    }
}

.hello-link {
	text-decoration: none;
	display: grid;
	grid-template-columns: repeat(2, auto);
	justify-items: start;
	align-items: center;
	grid-column-gap: 0.6em;
	border-radius: 3px;
	border: solid 2.5px transparent;
    padding: 4px 6px;
    transition: border-color ease-in-out 0.1s;
	@media (max-width: 460px) {
		grid-template-columns: 2rem auto;
		padding-left: 2rem;
		width: 100%;
		&:first-child {
			margin-right: 0;
			margin-bottom: 2rem;
		}
    }
    @media (min-width: 601px) {
        &:hover .hello-link__text,
        &:hover .hello-link__img {
            color: $MERGE-MAIN-COLOR;
            fill: $MERGE-MAIN-COLOR;
        }
    }
	&:focus {
		border: solid 2.5px rgba(55, 205, 171, 0.5);
	}
	&:active .hello-link__text,
	&:active .hello-link__img {
		color: $MERGE-DARK-COLOR;
		fill: $MERGE-DARK-COLOR;
	}
	&__wrapper {
		justify-self: start;
		grid-area: link;
		@extend %flex-row;
		a:first-child {
			margin-right: 2rem;
		}
		@media (max-width: 600px) {
			justify-self: center;
		}

		@media (max-width: 460px) {
			flex-direction: column;
			width: 100%;
		}
	}

	&__img {
		width: 16px;
		height: 16px;
        fill: $MERGE-SECONDARY-COLOR;
        transition: fill ease-in-out 0.1s;
	}

	&__text {
		text-transform: uppercase;
		font-size: 10px;
		font-family: $base-font;
		color: $MERGE-SECONDARY-COLOR;
		font-weight: 700;
        white-space: nowrap;
        transition: color ease-in-out 0.1s;
	}

	&--how-get {
		grid-area: link-1;
	}

	&--prices {
		grid-area: link-2;
	}
}
</style>
