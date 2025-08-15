import hyRequest from '../index';
import type { HYRequestConfig } from '../request/type';
// 登录
export function accountLoginRequest(account: any) {
  return hyRequest.post({
    url: '/login',
    data: account,
  } as HYRequestConfig);
}
// 获取用户信息 此处需要token 所以应该在请求拦截器中统一配置
export function getUserInfo(id: number) {
  // 如果有config参数，则合并config和默认配置

  return hyRequest.get({
    url: `/users/${id}`,
  } as HYRequestConfig);
}
export function getUserMenus(id: number) {
  return hyRequest.get({
    url: `/role/${id}/menu`,
  } as HYRequestConfig);
}
