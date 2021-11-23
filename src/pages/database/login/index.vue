<template>
  <div class="rs-db-login">
    <div class="rs-db-login-container">
      <a-tabs v-model:activeKey="activeTab">
        <a-tab-pane tab="账号登录" key="account">
          <a-form :rules="rules" ref="formRef" :model="loginForm" class="rs-login-form" :label-col="{ span: 5 }">
            <a-form-item label="IP地址" name="host">
              <a-input v-model:value="loginForm.host"></a-input>
            </a-form-item>
            <a-form-item label="端口号" name="port">
              <a-input v-model:value="loginForm.port"></a-input>
            </a-form-item>
            <a-form-item label="数据库" name="database">
              <a-input v-model:value="loginForm.database"></a-input>
            </a-form-item>
            <a-form-item label="用户名" name="user">
              <a-input v-model:value="loginForm.user"></a-input>
            </a-form-item>
            <a-form-item label="密码" name="password">
              <a-input v-model:value="loginForm.password"></a-input>
            </a-form-item>
            <a-form-item :wrapper-col="{ offset: 5 }">
              <a-button @click="hadleeSubmit()">登录</a-button>
            </a-form-item>
          </a-form>
        </a-tab-pane>
        <a-tab-pane tab="列表登录" key="list">该功能暂不支持，请先使用账号登录...</a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs } from 'vue';

const rules = {
  host: {
    required: true,
    message: '请输入IP地址',
    trigger: 'blur',
  },
  port: {
    required: true,
    message: '请输入端口号',
    trigger: 'blur',
  },
  database: {
    required: true,
    message: '请输入数据库',
    trigger: 'blur',
  },
  user: {
    required: true,
    message: '请输入用户名',
    trigger: 'blur',
  },
  password: {
    required: true,
    message: '请输入密码',
    trigger: 'blur',
  },
};

export default defineComponent({
  name: 'DatabaseLogin',
  setup() {
    const formRef = ref();
    const activeTab = ref<string>('account');

    const form = reactive({
      loginForm: {
        host: '',
        port: '',
        database: '',
        user: '',
        password: '',
      },
    });

    const hadleeSubmit = () => {
      formRef.value
        .validate()
        .then(() => {
          console.log('values', form);
        })
        .catch(() => {
          console.log('error');
        });
    };

    return {
      rules,
      formRef,
      activeTab,
      hadleeSubmit,
      ...toRefs(form),
    };
  },
});
</script>

<style lang="scss" scoped>
$img: 'https://static.pexels.com/photos/373934/pexels-photo-373934.jpeg';

.rs-db-login {
  width: 100%;
  height: calc(100vh - 60px);
  background: url('../../../assets/imgs/362.jpg') center center;
  .rs-db-login-container {
    position: fixed;
    top: 160px;
    left: 100px;
    width: 400px;
    height: 430px;
    padding: 20px;
    border-radius: 4px;
    background-color: #fff;
    .rs-login-form {
      padding-top: 20px;
    }
  }
}
</style>
