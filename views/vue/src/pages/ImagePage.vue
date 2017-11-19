<template>
  <div class="imagePage" v-on:click="goNext()">
    <h2 class="contentTitle">{{ title }}</h2>
    <section class="imgBox">
      <img
        class="imgImage"
        v-for="item in img"
        :src="item"
        v-bind:style="styleObject"
      />
    </section>
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
      let img = state[this.getPageId()].image;
      if (typeof img === 'string') {
        img = [img];
      }
      this.styleObject.width = `${100 / img.length - 5}%`;
      return img;
    },
  },
  data() {
    return {
      styleObject: {
        width: '100%',
      },
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.imgBox {
  margin-top: 5vh;
  padding: 30px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  height: 75vh;
  overflow: hidden;
  box-sizing: border-box;
}
.imgImage {
  object-fit: cover;
}
.imagePage {
  height: 100%;
  width: 100%;
  padding-top: 5vh;
}
</style>
