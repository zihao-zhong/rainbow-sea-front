<template>
  <a-layout-header theme="light">
    <div class="rs-header rs-main">
      <nav class="rs-nav">
        <router-link
          class="rs-nav-list"
          :class="{ 'rs-active': $route.path.startsWith(item.path) }"
          v-for="item in navList"
          :key="item.path"
          :to="item.path"
        >
          {{ item.text }}
        </router-link>
      </nav>
      <div class="rs-user">
        <a-button type="link" @click="handleToLogin">登录/注册</a-button>
      </div>
    </div>
  </a-layout-header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

interface Nav {
  path: string;
  text: string;
}

const navList: Nav[] = [
  {
    path: '/app',
    text: '首页',
  },
  {
    path: '/database',
    text: '数据库',
  },
  {
    path: '/game',
    text: '游戏',
  },
  {
    path: '/word',
    text: '文档',
  },
  {
    path: '/system',
    text: '管理台',
  },
];

export default defineComponent({
  name: 'Header',
  setup() {
    const router = useRouter();

    // 跳转登录
    const handleToLogin = () => {
      router.push('/login');
    };

    return {
      navList,
      handleToLogin,
    };
  },
});
</script>

<style lang="scss" scoped>
.ant-layout-header {
  height: 60px;
  background-color: $rs-primary-black;
}
.rs-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .rs-nav {
    display: flex;
    line-height: 60px;
    color: $rs-primary-gray;
    .rs-nav-list {
      user-select: none;
      cursor: pointer;
      transition: all 0.3s ease;
      &:not(:first-child) {
        margin-left: 30px;
      }
      @include common-hover;
      @include common-active;
    }
  }
}
</style>
