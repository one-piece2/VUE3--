import hyRequest from '@/service';
import type { HYRequestConfig } from '@/service/request/type';

export function GetCount() {
  return hyRequest.get({
    url: '/goods/amount/list',
  } as HYRequestConfig);
}
