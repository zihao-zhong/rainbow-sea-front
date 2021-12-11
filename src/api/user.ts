import axios from '@/utils/axios';
import { RegisterOption, LoginOption, LoginUser } from '@/types/api/user.interface';

/**
 * 注册用户发送邮箱验证码
 * @param {Object} query
 */
export async function sendRegisterCode(email: string): Promise<string> {
  return axios({
    method: 'post',
    url: '/user/register/code',
    data: {
      email,
    },
  });
}

/**
 * 用户注册
 */
export async function register(data: RegisterOption): Promise<string> {
  return axios({
    method: 'post',
    url: '/user/register',
    data,
  });
}

/**
 * 用户注册
 */
export async function login(data: LoginOption): Promise<LoginUser> {
  return axios({
    method: 'post',
    url: '/user/login',
    data,
  });
}
