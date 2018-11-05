<template>
  <div id="app">

	<transition 
		appear
		name="custom-classes-transition"
		enter-active-class="animatedInNav fadeIn"
		leave-active-class="animated fast fadeOut">
        <navigation v-show='navi' :navi='navi'></navigation>
    </transition>

    <transition 
		appear
		name="custom-classes-transition"
		enter-active-class="animated fadeInLeft"
		leave-active-class="animated02 fadeOut"
		mode="out-in">
        <router-view/>
    </transition>

  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue';

export default {
	name: 'app',
	components: {
		Navigation
	},
	data() {
		return {
			navi: true
		};
	},
	methods: {
		onNavi() {
			let name = this.$route.name;
			if (
				name == 'Hello' ||
				name == 'Coworking' ||
				name == 'MeetingRoom' ||
				name == 'Events' ||
				name == 'About'
			) {
				return true;
			} else {
				return false;
			}
		},
		checkNav() {
			if (this.navi !== this.onNavi()) {
				if (this.navi) {
					setTimeout(() => {
						this.navi = this.onNavi();
					}, 250);
				} else {
					this.navi = this.onNavi();
				}
			}
		}
	},
	beforeUpdate() {
		this.checkNav();
	}
};
</script>

<style lang="scss">
@import 'assets/scss/style.scss';

#app {
	width: 100%;
	max-width: 100vw;
	min-height: 100vh;
	position: relative;
	@extend %flex-row;
	background-color: $MAIN-DARK-COLOR;
	align-items: center;
}
.routlinks {
	position: fixed;
	top: 0;
	right: 0;
	left: 0;
	z-index: 100000;
}
</style>
