import Vue from 'vue';
import Router from 'vue-router';
import EnterPage from '../pages/EnterPage.vue';
// import WordPage from '../pages/WordPage.vue';
import ListPage from '../pages/ListPage.vue';
import ListPage2 from '../pages/ListPage2.vue';
import ImagePage from '../pages/ImagePage.vue';
import Demo from '../pages/Demo.vue';
import EndPage from '../pages/EndPage.vue';

Vue.use(Router);

const routes = [
  {
    path: '/',
    redirect: '/1',
  },
  {
    path: '/1',
    name: 'EnterPage',
    component: EnterPage,
  },
];
const componentMap = {
  list2: ListPage2,
  list: ListPage,
  image: ImagePage,
  demo: Demo,
};
const state = window.INITIAL_STATE;
const keys = Object.keys(state);
const $push = Array.prototype.push;
keys.shift();
$push.apply(routes, keys.map((key, i) => {
  const value = state[key];
  const index = i + 2;
  return {
    path: `/${index}`,
    name: `page${index}`,
    component: componentMap[value.type],
  };
}));
routes.push({
  path: `/${routes.length}`,
  name: 'EndPage',
  component: EndPage,
});

export default new Router({
  routes,
});
