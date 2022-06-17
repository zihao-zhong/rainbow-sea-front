import { RouteRecordRaw } from 'vue-router';

const worker: RouteRecordRaw = {
  path: '/worker',
  redirect: '/worker/home',
  component: () => import('@layouts/Home.vue'),
  children: [
    {
      path: '/worker/home',
      component: () => import('@pages/worker/Worker.vue'),
    },
  ],
};

export default worker;
