<template>
  <div class="imagePage" v-on:click="goNext()">
    <h1 class="title">{{ title }}</h1>
    <img class="imgImage" :src="img" />
  </div>
</template>

<script>
const state = window.INITIAL_STATE;
export default {
  name: 'hello',
  create() {
  },
  methods: {
    getPageId(added = 0) {
      return +this.$route.path.replace(/\//, '') + added;
    },
    goNext() {
      this.$router.push(`/${this.getPageId(1)}`);
    },
  },
  computed: {
    title() {
      return state[this.getPageId()].title;
    },
    img() {
      return state[this.getPageId()].image;
    },
  },
  data() {
    return {
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
.title{
  font-weight: bold;
  font-size: 56px;
  color: #333;
}
.imgImage {

}
.imagePage {
  height: 100%;
  width: 100%;
}
</style>
