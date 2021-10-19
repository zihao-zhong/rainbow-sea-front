import { RouteRecordRaw } from 'vue-router';

const database: RouteRecordRaw = {
  path: '/database',
  redirect: '/database/login',
  component: () => import('@layouts/Home.vue'),
  children: [
    {
      path: '/database/login',
      component: () => import('@pages/database/login/index.vue'),
    },
    {
      path: '/database/home',
      component: () => import('@pages/database/Home.vue'),
    },
  ],
};

export default database;
