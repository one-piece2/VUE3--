import { defineStore, type StateTree } from 'pinia';
import { accountLoginRequest, getUserInfo, getUserMenus } from '@/service/login/login';
import { ref } from 'vue';
import router from '@/router';
import { initDynamicRoutes, mapMenustoPermissions } from '@/utils/active';
import UseMainStore from '../main/systerm/main';
import user from '@/router/main/systerm/user/user';
export const useLoginStore = defineStore('login', () => {
  const name = ref('');
  const mainstore = UseMainStore();
  const userInfo = ref<any>(JSON.parse(localStorage.getItem('userInfo') || '{}'));

  const token = ref(localStorage.getItem('token') || '');
  const id = ref<number>(0);
  // const userMenus = ref<{ [key: string]: any }[]>([]);
  const userMenus = ref<any>(JSON.parse(localStorage.getItem('userMenus') || '[]'));
  // 获取登录用户的按钮权限
  const permission = ref<string[]>();
  function getPemission() {
    permission.value = mapMenustoPermissions(userMenus.value);
  }

  const loginw = async (account: { name: string; password: string }) => {
    // 1.请求登录
    const LoginResult = await accountLoginRequest(account);
    name.value = LoginResult.data.name;
    token.value = LoginResult.data.token;
    id.value = LoginResult.data.id;
    localStorage.setItem('token', token.value);
    // 获取部门角色相关数据
    mainstore.GetallData();

    // 2.请求用户信息 根据id获取的
    userInfo.value = (await getUserInfo(id.value)).data;
    // 3.根据角色获取用户的权限信息（也就是菜单）
    userMenus.value = (await getUserMenus(id.value)).data;

    localStorage.setItem('userInfo', JSON.stringify(userInfo.value));
    localStorage.setItem('userMenus', JSON.stringify(userMenus.value));
    //  动态获取路由对象 加载到对应数组 localroutes中
    // 1.先读取router/main中所有的ts文件,由于现在得到的是懒加载的，对象对应的是一个函数，所以要加上eager执行，这样得到的就是一个模块
    // 这里相当于自动化获取，可以直接手动写好所有的路由信息在这个数组中
    initDynamicRoutes();
    router.replace('/main'); // 跳转到main页面
  };

  return {
    loginw,
    name,
    token,
    id,
    userInfo,
    userMenus,
    permission,
    getPemission,
  };
});
