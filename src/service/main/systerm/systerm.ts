import hyRequest from '@/service';
import type { HYRequestConfig } from '@/service/request/type';
// 用户的网络请求
export function postUserListData(queryInfo: {}) {
  // @ts-ignore
  return hyRequest.post({
    url: '/users/list',

    data: queryInfo,
  });
}

// 删除用户
export function DeleteUser(x: number) {
  return hyRequest.delete({
    url: `/users/${x}`,
  } as HYRequestConfig);
}

//角色
export function getRoles() {
  return hyRequest.post({
    url: '/role/list',
  } as HYRequestConfig);
}

// 部门
export function getDepartment() {
  return hyRequest.post({
    url: '/department/list',
  } as HYRequestConfig);
}

// 创建用户
export function CreatUser(data: any) {
  return hyRequest.post({
    url: '/users',
    data,
  } as HYRequestConfig);
}
// 修改数据
export function EditUser(data: any, x: number) {
  return hyRequest.patch({
    url: `/users/${x}`,
    data,
  } as HYRequestConfig);
}
// 针对页面的网络请求：增删改查  通用型
export function postPageListData(pagename: string, queryInfo: any) {
  return hyRequest.post({
    url: `/${pagename}/list`,
    data: queryInfo,
  } as HYRequestConfig);
}

export function DeletePagebyid(pagename: string, x: number) {
  return hyRequest.delete({
    url: `/${pagename}/${x}`,
  } as HYRequestConfig);
}

export function Newpagedata(pagename: string, data: any) {
  return hyRequest.post({
    url: `/${pagename}`,
    data,
  } as HYRequestConfig);
}
export function EditPagedata(pagename: string, data: any, x: number) {
  return hyRequest.patch({
    url: `/${pagename}/${x}`,
    data,
  } as HYRequestConfig);
}
