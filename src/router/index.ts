import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      path: '/',
      name: '/',
      redirect: { name: 'recom' },
      component: () => import('../views/Home.vue'),
      children: [
        {
          path: 'recom',
          name: 'recom',
          meta: {
            keepAlive: true,
          },
          component: () => import('../views/Recom.vue'),
        },
        {
          path: 'hot',
          name: 'hot',
          meta: {
            keepAlive: true,
          },
          component: () => import('../views/Hot.vue'),
        },
        {
          path: 'search',
          name: 'search',
          meta: {
            keepAlive: true,
          },
          component: () => import('../views/Search.vue'),
        },
      ],
    },
    {
      path: '/playlist/:id',
      name: 'playlist',
      component: () => import('../views/PlayList.vue'),
      meta: {
        keepAlive: true,
      },
    },
    {
      path: '/play/:id',
      name: 'play',
      component: () => import('../views/Play.vue'),
      meta: {
        keepAlive: true,
      },
    },
  ],
});
