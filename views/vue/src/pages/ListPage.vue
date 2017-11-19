<template>
  <div class="listPage" v-on:click="goNext()">
    <h2 class="contentTitle">{{ title }}</h2>
    <ul class="listUl">
      <li class="listLi" v-for="item in list">{{ item }}</li>
    </ul>
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
    list() {
      return state[this.getPageId()].list;
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
.title{
  font-weight: bold;
  font-size: 56px;
  color: #333;
  margin: 0;

}
.listUl {
  padding: 30px 0;
  height: 75vh;
  padding-left: 50px;
  list-style: disc;
}
.listLi {
  font-size: 36px;
  padding-left: 30px;
  color: #333;
  display: block;
  position: relative;
}
.listLi:before {
  content: '';
  height: 15px;
  width: 15px;
  border-radius: 50%;
  left: 0;
  top: 50%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  display: inline-block;
  position: absolute;
  color: #333;
  background-color: #666;
}
.listPage {
  height: 100%;
  width: 100%;
  padding-top: 5vh;
}
</style>
