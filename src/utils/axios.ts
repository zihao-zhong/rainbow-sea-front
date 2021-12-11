import axios, { AxiosResponse } from 'axios';
import { IAxiosRequestConfig, IAxioxResponse } from '@/types/common';
import { message } from 'ant-design-vue';

const instance = axios.create({
  baseURL: '/api',
  timeout: 10000,
  validateStatus: null,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
});

instance.interceptors.request.use(
  (config: IAxiosRequestConfig) => {
    const conf = config;
    return conf;
  },
  (err) => Promise.reject(err),
);

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    const res: IAxioxResponse = response.data;
    switch (res.code) {
      case 200:
        return res;
      case 401: // 没登录，或者登录状态过期
        window.location.href = '/';
        break;
      case 403: // 没权限
        window.location.href = '/#/403';
        break;
      case 400: // 用户填写错误
        message.warning(res.message);
        break;
      default:
        message.error(res.message);
        break;
    }
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default async <T>(config: IAxiosRequestConfig): Promise<T> => {
  return instance(config).then((response: AxiosResponse) => {
    const data = response.data;
    return data;
  });
};
