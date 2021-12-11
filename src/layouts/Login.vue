<template>
  <div class="rs-login">
    <div class="rs-login-container">
      <a-tabs v-model:activeKey="activeTab">
        <a-tab-pane tab="登录" key="login">
          <a-form :rules="rules" ref="loginFormRef" :model="loginForm" class="rs-login-form" :label-col="{ span: 5 }">
            <a-form-item label="邮箱地址" name="email">
              <a-input v-model:value="loginForm.email"></a-input>
            </a-form-item>
            <a-form-item label="密码" name="password">
              <a-input v-model:value="loginForm.password" type="password"></a-input>
            </a-form-item>
            <a-form-item :wrapper-col="{ offset: 5 }">
              <a-button type="primary" @click="handleLogin()">登录</a-button>
            </a-form-item>
          </a-form>
        </a-tab-pane>
        <a-tab-pane tab="注册" key="register">
          <a-form
            :rules="rules"
            ref="registerFormRef"
            :model="registerForm"
            class="rs-register-form"
            :label-col="{ span: 5 }"
          >
            <a-form-item label="邮箱地址" name="email">
              <a-input v-model:value="registerForm.email"></a-input>
            </a-form-item>
            <a-form-item label="密码" name="password">
              <a-input v-model:value="registerForm.password" type="password"></a-input>
            </a-form-item>
            <a-form-item label="确认密码" name="confirmPassword">
              <a-input v-model:value="registerForm.confirmPassword" type="password"></a-input>
            </a-form-item>
            <a-form-item label="验证码" name="code">
              <a-row :gutter="5">
                <a-col :span="13">
                  <a-input v-model:value="registerForm.code"></a-input>
                </a-col>
                <a-col :span="11">
                  <a-button type="primary" :loading="btnLoading" @click="handleSendCode">
                    {{ timerNum === 30 ? '发送验证码' : `${timerNum} 后再次发送` }}
                  </a-button>
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
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';
import { defineComponent, ref, reactive } from 'vue';
import { sendRegisterCode, register, login } from '@/api/user';

export default defineComponent({
  setup() {
    const router = useRouter();
    const activeTab = ref<string>('login');

    /** 登录模块 */
    const loginFormRef = ref();
    const loginForm = reactive({
      email: '',
      password: '',
    });

    const handleLogin = async () => {
      await loginFormRef.value.validate();
      const password = CryptoJS.AES.encrypt(loginForm.password, process.env.VUE_APP_SECRET_KEY).toString();
      const data = await login({
        password,
        email: loginForm.email,
      });
      console.log(data);
      Cookies.set('token', data.token);
      // 用户信息存储到 vuex

      message.success('登录成功');
      router.push('/');
    };

    /** 注册模块 */
    let timerNum = ref<number>(30);
    let btnLoading = ref(false);
    const registerFormRef = ref();
    const registerForm = reactive({
      email: '',
      password: '',
      confirmPassword: '',
      code: '',
    });

    const handleRegister = async () => {
      await registerFormRef.value.validate();
      const password = CryptoJS.AES.encrypt(registerForm.password, process.env.VUE_APP_SECRET_KEY).toString();
      await register({
        password,
        code: registerForm.code,
        email: registerForm.email,
      });
      message.success('注册成功，请登录');
      activeTab.value = 'login';
    };

    const handleSendCode = async () => {
      if (timerNum.value !== 30) {
        message.success('验证码已发送，请查收', 5);
        return;
      }
      await registerFormRef.value.validateFields('email');
      btnLoading.value = true;
      await sendRegisterCode(registerForm.email);
      message.success('验证码已发送至您的邮箱，请查收。10分钟内有效', 5);

      const timer = setInterval(() => {
        timerNum.value -= 1;
        btnLoading.value = false;
        if (timerNum.value === 0) {
          clearInterval(timer);
          timerNum.value = 30;
        }
      }, 1000);
    };

    // 表单校验规则
    const rules = {
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
          validator: (rule: unknown, value: string) => {
            console.log(value, registerForm.password);
            if (value && value !== registerForm.password) {
              return Promise.reject('两次密码输入不一致');
            }
            return Promise.resolve();
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
          validator: (rule: unknown, value: string) => {
            if (value && value.length !== 6) {
              return Promise.reject('验证码只能输入6位数');
            }
            return Promise.resolve();
          },
        },
      ],
    };

    return {
      rules,
      timerNum,
      activeTab,
      loginForm,
      btnLoading,
      handleLogin,
      registerForm,
      loginFormRef,
      registerFormRef,
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
