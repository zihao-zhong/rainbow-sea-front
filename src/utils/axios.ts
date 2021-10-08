import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ElMessage } from 'element-plus';
import { IAxiosRequestConfig, IAxioxResponse } from '@/types/common';

const instance = axios.create({
  baseURL: '/api',
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
});

instance.interceptors.request.use((config: AxiosRequestConfig) => {
  // 自定义header，可添加项目token
  const conf = config;
  // debugger;
  // config.token = 'token';
  return conf;
});

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
        ElMessage.warning(res.message);
        break;
      default:
        ElMessage.error(res.message);
        break;
    }
  },
  (err) => {
    console.log(err);
    ElMessage.error('网络请求异常，请稍后重试!');
  },
);

export default async <T>(config: IAxiosRequestConfig): Promise<IAxioxResponse<T>> => {
  return new Promise<IAxioxResponse<T>>((resolve, reject) => {
    instance(config)
      .then((response: AxiosResponse) => {
        const res: IAxioxResponse<T> = response.data;
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
