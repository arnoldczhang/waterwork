<template>
  <div class="demoPage" v-on:click="goNext()">
    <h1 class="title">demo</h1>
  </div>
</template>

<script>
export default {
  name: 'entrance',
  mounted() {

  },
  methods: {
    getPageId(added = 0) {
      return +this.$route.path.replace(/\//, '') + added;
    },
    goNext() {
      this.$router.push(`/${this.getPageId(1)}`);
    },
  },
  data() {
    return {
    };
  },
};
</script>

<style scoped>

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
.demoPage {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.title{
  font-weight: bold;
  font-size: 72px;
  color: #333;
  text-align: center;
}
</style>
