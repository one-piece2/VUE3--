import { defineStore } from 'pinia';
import { getRoles, getDepartment, CreatUser, EditUser } from '@/service/main/systerm/systerm';
import { ref } from 'vue';
import useSystermStore from './systerm';
const UseMainStore = defineStore('main', () => {
  const systermStore = useSystermStore();
  const rolelist = ref<any>([]);
  const deparmentlist = ref<any>([]);
  async function GetallData() {
    rolelist.value = (await getRoles()).data.list;
    deparmentlist.value = (await getDepartment()).data.list;
  }
  async function Auser(data: any) {
    await CreatUser(data);
    systermStore.reqUserList({ size: 10, offset: 0 });
  }
  async function Edit(x: any, y: number) {
    await EditUser(x, y);
    systermStore.reqUserList({ size: 10, offset: 0 });
  }
  return { GetallData, rolelist, deparmentlist, Auser, Edit };
});
export default UseMainStore;
