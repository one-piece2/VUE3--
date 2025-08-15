import { BASE_URL, TIME_OUT } from './config';
import HYRequest from './request';
import type { HYRequestConfig } from './request/type';
// 由于这里是创造了一个封装的类的实例，所以请求拦截器可以在这里添加
const hyRequest = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  // 添加请求成功拦截器
  interceptors: {
    requestSuccessFn: (config) => {
      config.headers.Authorization = localStorage.getItem('token') || '';
      return config;
    },
  },
} as HYRequestConfig);

export default hyRequest;
