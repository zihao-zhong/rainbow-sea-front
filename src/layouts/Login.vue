<template>
  <div class="rs-login">
    <div class="rs-login-container">
      <a-tabs v-model:activeKey="activeTab">
        <a-tab-pane tab="登录" key="account">
          <a-form :rules="rules" ref="formRef" :model="loginForm" class="rs-login-form" :label-col="{ span: 5 }">
            <a-form-item label="邮箱地址" name="email">
              <a-input v-model:value="loginForm.email"></a-input>
            </a-form-item>
            <a-form-item label="密码" name="password">
              <a-input v-model:value="loginForm.password" type="password"></a-input>
            </a-form-item>
            <a-form-item :wrapper-col="{ offset: 5 }">
              <a-button @click="hadleeSubmit()">登录</a-button>
            </a-form-item>
          </a-form>
        </a-tab-pane>
        <a-tab-pane tab="注册" key="list">
          <a-form :rules="rules" ref="formRef" :model="registerForm" class="rs-register-form" :label-col="{ span: 5 }">
            <a-form-item label="邮箱地址" name="user">
              <a-input v-model:value="registerForm.email"></a-input>
            </a-form-item>
            <a-form-item label="密码" name="password">
              <a-input v-model:value="registerForm.password"></a-input>
            </a-form-item>
            <a-form-item label="确认密码" name="password">
              <a-input v-model:value="registerForm.confirmPassword"></a-input>
            </a-form-item>
            <a-form-item label="验证码" name="code">
              <a-input-search v-model:value="registerForm.code">
                <template #enterButton>
                  <a-button type="primary">发送验证码</a-button>
                </template>
              </a-input-search>
            </a-form-item>
            <a-form-item :wrapper-col="{ offset: 5 }">
              <a-button @click="hadleeSubmit()">登录</a-button>
            </a-form-item>
          </a-form>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs } from 'vue';
import { Rules } from '@/types/rules';

const rules: Rules = {
  email: {
    type: 'email',
    required: true,
    trigger: 'blur',
    message: '请输入正确的邮箱地址',
  },
  password: [
    {
      required: true,
      message: '请输入密码，且密码不能少于6位',
      trigger: 'blur',
      pattern: /[0-9A-z~!@#$%^&*._]{6,18}/,
    },
  ],
  confirmPassword: [
    {
      required: true,
      message: '请再次输入密码',
      trigger: 'blur',
    },
    {
      validator: (rule, value, callback) => {
        if (value !== 'asd') {
          callback('两次密码输入不一致');
        }
        callback();
      },
    },
  ],
  code: [
    {
      required: true,
      message: '请输入邮箱验证码',
      trigger: 'blur',
    },
    {
      validator: (rule, value, callback) => {
        if (value.length !== 6) {
          callback('验证码只能输入6位数');
        }
        callback();
      },
    },
  ],
};

export default defineComponent({
  setup() {
    const formRef = ref();
    const activeTab = ref<string>('account');

    const form = reactive({
      loginForm: {
        email: '',
        password: '',
      },
      registerForm: {
        email: '',
        password: '',
        confirmPassword: '',
        code: '',
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
.rs-login {
  width: 100%;
  height: 100vh;
  background: url('../assets/imgs/81.webp') no-repeat;
  background-size: cover;

  .rs-login-container {
    position: fixed;
    left: 50%;
    top: 50%;
    margin: -200px 0 0 -200px;
    width: 400px;
    height: 400px;
    padding: 20px;
    border-radius: 4px;
    background-color: #fff;
    .rs-login-form,
    .rs-register-form {
      padding-top: 10px;
    }
  }
}
</style>
