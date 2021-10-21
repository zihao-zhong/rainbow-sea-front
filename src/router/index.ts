import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import app from './app';
import database from './database';
import game from './game';
import word from './word';
import system from './system';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    redirect: '/app',
    component: () => import('@layouts/App.vue'), // 懒加载组件
    children: app,
  },
  database,
  game,
  word,
  system,
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
