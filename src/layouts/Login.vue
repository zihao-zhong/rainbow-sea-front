<template>
  <div class="rs-login">
    <div class="rs-login-container">
      <a-tabs v-model:activeKey="activeTab">
        <a-tab-pane tab="登录" key="login">
          <a-form :rules="rules" ref="formRef" :model="loginForm" class="rs-login-form" :label-col="{ span: 5 }">
            <a-form-item label="邮箱地址" name="email">
              <a-input v-model:value="loginForm.email"></a-input>
            </a-form-item>
            <a-form-item label="密码" name="password">
              <a-input v-model:value="loginForm.password" type="password"></a-input>
            </a-form-item>
            <a-form-item :wrapper-col="{ offset: 5 }">
              <a-button @click="handleLogin()">登录</a-button>
            </a-form-item>
          </a-form>
        </a-tab-pane>
        <a-tab-pane tab="注册" key="register">
          <a-form :rules="rules" ref="formRef" :model="registerForm" class="rs-register-form" :label-col="{ span: 5 }">
            <a-form-item label="邮箱地址" name="email">
              <a-input v-model:value="registerForm.email"></a-input>
            </a-form-item>
            <a-form-item label="密码" name="password">
              <a-input v-model:value="registerForm.password"></a-input>
            </a-form-item>
            <a-form-item label="确认密码" name="password">
              <a-input v-model:value="registerForm.confirmPassword"></a-input>
            </a-form-item>
            <a-form-item label="验证码" name="code">
              <a-row :gutter="5">
                <a-col :span="15">
                  <a-input v-model:value="registerForm.code"></a-input>
                </a-col>
                <a-col :span="9">
                  <a-button type="primary" @click="handleSendCode">发送验证码</a-button>
                </a-col>
              </a-row>
            </a-form-item>
            <a-form-item :wrapper-col="{ offset: 5 }">
              <a-button type="primary" @click="handleRegister">注册</a-button>
            </a-form-item>
          </a-form>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import { Rules } from '@/types/rules';
import { message } from 'ant-design-vue';
import { sendRegisterCode } from '@/api/user';

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
      validator: (rule, value) => {
        if (value !== 'asd') {
          Promise.reject('两次密码输入不一致');
        }
        Promise.resolve();
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
      validator: (rule, value) => {
        if (value.length !== 6) {
          Promise.reject('验证码只能输入6位数');
        }
        Promise.resolve();
      },
    },
  ],
};

export default defineComponent({
  setup() {
    const formRef = ref();
    const activeTab = ref<string>('register');

    /** 登录模块 */
    const loginForm = reactive({
      email: '',
      password: '',
    });

    const handleLogin = () => {
      formRef.value
        .validate()
        .then(() => {
          console.log('values', loginForm);
        })
        .catch(() => {
          console.log('error');
        });
    };

    /** 注册模块 */
    const registerForm = reactive({
      email: '',
      password: '',
      confirmPassword: '',
      code: '',
    });

    const handleRegister = () => {
      formRef.value
        .validate()
        .then(() => {
          console.log('values', loginForm);
        })
        .catch(() => {
          console.log('error');
        });
    };

    const handleSendCode = async () => {
      await formRef.value.validateFields('email');
      const res = await sendRegisterCode(registerForm.email);
      message.success(res, 5);
    };

    return {
      rules,
      formRef,
      activeTab,
      loginForm,
      handleLogin,
      registerForm,
      handleRegister,
      handleSendCode,
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
