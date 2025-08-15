import type { RouteRecordRaw } from 'vue-router';
import router from '@/router';
export let firstRoute: any = null;
export function initDynamicRoutes() {
  // 如果已经注册过，直接返回

  // 获取菜单数据
  const userMenus: any = JSON.parse(localStorage.getItem('userMenus') || '[]');

  // 加载本地路由配置
  const localRoutes: RouteRecordRaw[] = [];
  const modules = import.meta.glob('@/router/main/**/*.ts', { eager: true });

  // 收集本地路由
  for (const key in modules) {
    const module: any = modules[key];
    localRoutes.push(module.default);
  }

  // 注册新的动态路由
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      const route = localRoutes.find((item) => item.path === submenu.url);
      if (route) {
        // 添加到主路由的子路由中
        router.addRoute('main', route);
      }
      if (firstRoute === null && route) {
        // 如果是第一个路由，设置为默认路由
        firstRoute = submenu.url;
      }
    }
  }
}
export function MapmenuId(path: string, userMenus: any[]) {
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url == path) {
        return submenu.id + '';
      }
    }
  }
}

export function MaptoBread(path: string, userMenus: any[]) {
  const breads = [];
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url == path) {
        breads.push(menu);
        breads.push(submenu);
      }
    }
  }
  return breads;
}
// 菜单映射到id
export function mapMenuListtoId(menuList: any[]) {
  const ids: number[] = [];
  function Getids(menus: any[]) {
    for (const item of menus) {
      if (item.children && item.children.length) {
        Getids(item.children);
      } else {
        ids.push(item.id);
      }
    }
  }

  Getids(menuList);

  return ids;
}
// c菜单列表映射到权限
export function mapMenustoPermissions(menuList: any[]) {
  const permissions: string[] = [];
  function getPemission(menuList: any) {
    for (const item of menuList) {
      if (item.children && item.children.length) {
        getPemission(item.children);
      } else {
        if (item.permission) {
          permissions.push(item.permission);
        }
      }
    }
  }
  getPemission(menuList);
  return permissions;
}
