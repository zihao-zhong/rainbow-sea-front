<template>
  <div class="worker">
    <a-input v-model:value="form.input1" style="width: 300px"></a-input>
    <a-input v-model:value="form.input2" style="width: 300px"></a-input>
    <h2>计算结果为: {{ result }}</h2>
    <a-button type="primary" @click="handleWorkerSum">相乘</a-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  setup() {
    const result = ref<number>(0);
    const form = reactive({
      input1: '',
      input2: '',
    });

    const worker = new Worker('/js/basic_worker.js');

    worker.onmessage = (event) => {
      result.value = event.data;
    };

    worker.onerror = (err) => {
      console.log(err);
    };

    const handleWorkerSum = () => {
      worker.postMessage([form.input1, form.input2]);
    };

    return {
      form,
      result,
      handleWorkerSum,
    };
  },
});
</script>

<style scoped lang="scss">
.worker {
  height: calc(100vh - 60px);
}
</style>
