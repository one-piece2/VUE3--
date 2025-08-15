import { firstRoute, initDynamicRoutes } from '@/utils/active';
import { createRouter, createWebHashHistory } from 'vue-router';
import UseMainStore from '@/store/main/systerm/main';
import { useLoginStore } from '@/store/login/login';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      // 路由重定向
      redirect: '/main',
    },
    {
      path: '/login',
      // 懒加载
      component: () => import('../views/login/login.vue'),
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('../views/main/main.vue'),
      children: [],
    },
    {
      path: '/:pathMatch(.*)*',
      // 404页面
      component: () => import('../views/not-found/404.vue'),
    },
  ],
});
let hasAddRoutes = false; // 是否已经添加过动态路由
// 全局前置守卫
router.beforeEach((to) => {
  const LoginStore = useLoginStore();
  const mainstore = UseMainStore();
  const token = localStorage.getItem('token');
  // 如果没有token，并且访问的不是登录页
  if (!token && to.path !== '/login') {
    // 清除旧的路由和权限信息
    localStorage.removeItem('userMenus');
    localStorage.removeItem('userInfo');
    // 重定向到登录页
    return {
      path: '/login',
      query: { redirect: to.fullPath },
    };
  }
  // 如果有token，访问main相关页面
  if (token && to.path.startsWith('/main')) {
    if (to.path == '/main') {
      return firstRoute;
    }
    if (!hasAddRoutes) {
      initDynamicRoutes(); //添加动态路由
      mainstore.GetallData();
      LoginStore.getPemission();
      hasAddRoutes = true;
      return { ...to, replace: true };
    }
    return;
  }
});

export default router;
