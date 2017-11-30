<template>
  <div class="endPage">
    <h1 class="title">{{ title }}</h1>
  </div>
</template>

<script>
export default {
  name: 'entrance',
  mounted() {
  },
  methods: {
  },
  computed: {
  },
  data() {
    return {
      title: 'end',
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
.endPage {
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
