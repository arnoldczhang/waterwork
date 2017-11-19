<template>
  <div class="wordPage" v-on:click="goNext()">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
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
    msg() {
      return window.INITIAL_STATE[this.getPageId()];
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
.wordPage {
  height: 100%;
  width: 100%;
}
</style>
