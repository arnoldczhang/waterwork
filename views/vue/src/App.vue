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
  height: 100vh;
  width: 100vw;
}
body, div, section, article {
  margin: 0;
  padding: 0;
}
.contentTitle{
  font-weight: normal;
  font-size: 56px;
  color: #333;
  margin: 0;
  padding-left: 50px;
  position: relative;
}
.contentTitle:before {
  content: '';
  height: 100%;
  width: 20px;
  left: 0;
  display: inline-block;
  position: absolute;
  color: #333;
  background-color: rgb(46, 182, 170);
}
.slide-to-enter-active, .slide-to-leave-active,
.slide-back-enter-active, .slide-back-leave-active {
  transition: .7s
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
