import { AxiosRequestConfig } from 'axios';

export interface IAxiosRequestConfig extends AxiosRequestConfig {
  token?: string;
  loading?: boolean;
}

export interface IAxioxResponse<T = unknown> {
  code: number;
  message: string;
  data: T;
}
