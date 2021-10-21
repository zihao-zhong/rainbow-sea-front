import { RouteRecordRaw } from 'vue-router';

const system: RouteRecordRaw = {
  path: '/system',
  redirect: '/system/home',
  component: () => import('@layouts/System.vue'),
  children: [
    {
      path: '/system/home',
      component: () => import('@pages/system/home/index.vue'),
    },
  ],
};

export default system;
