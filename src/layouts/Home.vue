<template>
  <a-layout>
    <Header />
    <a-layout-content>
      <a-config-provider :locale="locale">
        <router-view />
      </a-config-provider>
    </a-layout-content>
    <Footer />
  </a-layout>
</template>

<script lang="ts">
import Header from './Header.vue';
import Footer from './Footer.vue';
import { defineComponent } from 'vue';
import { ConfigProvider } from 'ant-design-vue';

import zhCN from 'ant-design-vue/es/locale/zh_CN';

export default defineComponent({
  components: {
    Header,
    Footer,
    'a-config-provider': ConfigProvider,
  },
  setup() {
    return {
      locale: zhCN,
    };
  },
});
</script>

<style lang="scss" scoped>
.ant-layout-content {
  background-color: #fff;
}
</style>
