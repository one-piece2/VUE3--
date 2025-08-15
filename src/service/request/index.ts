import axios from 'axios';
// AxiosInstance 是 axios 库定义的一个接口类型，表示一个 Axios 实例的类型结构。
// 在定义变量、函数参数或返回值时，需要明确指定 Axios 实例的类型
import type { AxiosInstance } from 'axios';
import type { HYRequestConfig } from './type';

// 拦截器: 蒙版Loading/token/修改配置

/**
 * 两个难点:
 *  1.拦截器进行精细控制
 *    > 全局拦截器
 *    > 实例拦截器
 *    > 单次请求拦截器
 *
 *  2.响应结果的类型处理(泛型)
 */

class HYRequest {
  // 指定 instance 属性的类型为 AxiosInstance
  instance: AxiosInstance;

  // request实例 => axios的实例
  constructor(config: HYRequestConfig) {
    this.instance = axios.create(config);

    // 每个instance实例都添加拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // loading/token

        return config;
      },
      (err) => {
        return err;
      },
    );
    this.instance.interceptors.response.use(
      (res) => {
        return res.data;
      },
      (err) => {
        return err;
      },
    );

    // 针对特定的hyRequest实例添加拦截器
    // 从传入的配置对象 config 中获取 interceptors 下的 requestSuccessFn 和 requestFailureFn 作为请求拦截器。
    // 如果配置中有这些函数，会在全局请求拦截器之后执行，用于处理特定实例的请求相关逻辑。
    this.instance.interceptors.request.use(
      config.interceptors?.requestSuccessFn,
      config.interceptors?.requestFailureFn,
    );
    this.instance.interceptors.response.use(
      config.interceptors?.responseSuccessFn,
      config.interceptors?.responseFailureFn,
    );
  }

  // 封装网络请求的方法
  // T => IHomeData
  request<T = any>(config: HYRequestConfig<T>) {
    // 单次请求的成功拦截处理
    // 将 config 传入进行处理，处理后的结果重新赋值给 config 。
    // 这样可以在发起请求前对请求配置进行个性化的定制，比如添加特定请求的请求头、修改请求参数等。
    if (config.interceptors?.requestSuccessFn) {
      config = config.interceptors.requestSuccessFn(config);
    }

    // 返回Promise
    return new Promise<T>((resolve, reject) => {
      // 这里是原生的axios自带的request方法，上面的request方法只是对其进行了封装
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 单次响应的成功拦截处理
          // 将响应数据 res 传入进行处理，处理后的结果重新赋值给 res 。
          // 这可以用于对响应数据进行个性化的处理，比如数据格式化、提取特定字段等。
          if (config.interceptors?.responseSuccessFn) {
            res = config.interceptors.responseSuccessFn(res);
          }
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  get<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: 'GET' });
  }
  post<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: 'POST' });
  }
  delete<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: 'DELETE' });
  }
  patch<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: 'PATCH' });
  }
}

export default HYRequest;
