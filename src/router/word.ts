import { RouteRecordRaw } from 'vue-router';

const word: RouteRecordRaw = {
  path: '/word',
  redirect: '/word/home',
  component: () => import('@layouts/Home.vue'),
  children: [
    {
      path: '/word/home',
      component: () => import('@pages/word/Home.vue'),
    },
  ],
};

export default word;
