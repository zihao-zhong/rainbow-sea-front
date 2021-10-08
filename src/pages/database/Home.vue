<template>
  <div>
    <el-link type="primary">database</el-link>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    axios.get('/api/user/list').then((res) => {
      console.log(res);
    });
    return {};
  },
});
</script>
