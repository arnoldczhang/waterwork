<template>
  <div id="app">
    <transition :name="transitionName"  mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'app',
  data() {
    return {
      transitionName: '',
    };
  },
  watch: {
    '$route'(to, from) {
      const toDepth = +to.path.split('/')[1];
      const fromDepth = +from.path.split('/')[1];
      this.transitionName = toDepth < fromDepth ? 'slide-back' : 'slide-to';
    },
  },
};
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100vh;
  width: 100vw;
}
body, div, section, article {
  margin: 0;
  padding: 0;
}
.slide-to-enter-active, .slide-to-leave-active,
.slide-back-enter-active, .slide-back-leave-active {
  transition: 1s
}

.slide-to-enter, .slide-to-leave-to {
  transform: translateX(-30%);
  opacity: 0;
}

.slide-back-enter, .slide-back-leave-to {
  transform: translateX(30%);
  opacity: 0;
}
</style>
