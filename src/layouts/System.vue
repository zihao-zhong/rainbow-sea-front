<template>
  <a-layout style="height: 100vh">
    <Header />
    <a-layout>
      <a-layout-sider width="200">
        <a-menu v-model:selectedKeys="selectedKeys" mode="inline" theme="dark" style="height: 100%">
          <a-menu-item key="1"><user-outlined /> 用户列表</a-menu-item>
          <a-menu-item key="2"><setting-outlined /> 系统设置</a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout-content>
        <a-config-provider :locale="locale">
          <router-view />
        </a-config-provider>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { UserOutlined, SettingOutlined } from '@ant-design/icons-vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import Header from './Header.vue';
import { ConfigProvider } from 'ant-design-vue';

export default defineComponent({
  components: {
    Header,
    UserOutlined,
    SettingOutlined,
    'a-config-provider': ConfigProvider,
  },
  setup() {
    const selectedKeys = ref<string[]>(['1']);
    return {
      selectedKeys,
      locale: zhCN,
    };
  },
});
</script>

<style lang="scss" scoped>
.ant-layout-content {
  background-color: #fff;
}
.ant-menu.ant-menu-dark {
  background: $rs-primary-black;
}
</style>
