import type { InternalAxiosRequestConfig, AxiosResponse } from 'axios';

// 定义一个泛型接口 HYInterceptors，用于配置自定义拦截器函数
export interface HYInterceptors<T = AxiosResponse> {
  requestSuccessFn?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig;
  requestFailureFn?: (err: any) => any;
  responseSuccessFn?: (res: T) => T;
  responseFailureFn?: (err: any) => any;
}
// 定义一个泛型接口 HYRequestConfig，继承自 AxiosRequestConfig
// 新增一个可选的 interceptors 字段，类型为上面定义的 HYInterceptors<T>
// 这允许用户为特定请求配置单独的拦截器
export interface HYRequestConfig<T = AxiosResponse> extends InternalAxiosRequestConfig {
  interceptors?: HYInterceptors<T>;
}
