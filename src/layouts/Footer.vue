<template>
  <a-layout-footer>
    <div class="rs-footer rs-main">
      <a class="rs-footer-link" target="_blank" href="https://beian.miit.gov.cn/">
        <img src="../assets/imgs/records.png" />
        <span>粤ICP备2021131263号-1</span>
      </a>
    </div>
  </a-layout-footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Footer',
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.rs-footer {
  height: 50px;
  .rs-footer-link {
    line-height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    img {
      margin-right: 5px;
    }
  }
}
</style>
