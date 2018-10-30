<template>
  <div id="app">

	<transition 
	appear
    name="custom-classes-transition"
    enter-active-class="animatedInNav fadeIn"
    leave-active-class="animated middle fadeOut">
        <navigation v-show='navi'></navigation>
    </transition>

    <transition 
	appear
    name="custom-classes-transition"
    enter-active-class="animated fadeInLeft"
    leave-active-class="animatedOut02 fadeOut"
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
				name == 'hello' ||
				name == 'coworking' ||
				name == 'meeting-room' ||
				name == 'events' ||
				name == 'about'
			) {
				return true;
			} else {
				return false;
			}
		}
	},
	beforeUpdate: function() {
		if (this.navi !== this.onNavi()) {
			let onThis = this;
			if (this.navi) {
				setTimeout(function() {
					onThis.navi = onThis.onNavi();
				}, 150);
			} else {
				this.navi = this.onNavi();
			}
		}
	},
	beforeMount: function() {
		if (this.navi !== this.onNavi()) {
			let onThis = this;
			if (this.navi) {
				setTimeout(function() {
					onThis.navi = onThis.onNavi();
				}, 350);
			} else {
				this.navi = this.onNavi();
			}
		}
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
