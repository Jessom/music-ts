import Vue from 'vue';
import App from './App.vue';
import router from './router/index';
import store from './store/index';
import { Component } from 'vue-property-decorator';
import CellHead from './components/CellHead.vue';
import MusicCell from './components/MusicCell.vue';
import BlendSkeleton from '@/components/Skeleton/BlendSkeleton.vue';
import CellHeadSkeleton from '@/components/Skeleton/CellHeadSkeleton.vue';
import MusicCellSkeleton from '@/components/Skeleton/MusicCellSkeleton.vue';
import Loading from '@/components/Loading.vue';
import * as filters from './filter/index';

Object.keys(filters).forEach((key: string) => {
  Vue.filter(key, filters[key]);
});

Vue.config.productionTip = false;
Vue.component(Loading.name, Loading);
Vue.component(CellHead.name, CellHead);
Vue.component(MusicCell.name, MusicCell);
Vue.component(BlendSkeleton.name, BlendSkeleton);
Vue.component(CellHeadSkeleton.name, CellHeadSkeleton);
Vue.component(MusicCellSkeleton.name, MusicCellSkeleton);
Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate',
]);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
