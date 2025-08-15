import { defineStore } from 'pinia';
import {
  postUserListData,
  postPageListData,
  DeletePagebyid,
  Newpagedata,
  EditPagedata,
} from '@/service/main/systerm/systerm';
import { ref } from 'vue';
const useSystermStore = defineStore('system', () => {
  const List = ref<any>([]);
  const totalcount = ref<number>(0);
  const reqUserList = async (queryInfo: {}) => {
    List.value = await postUserListData(queryInfo);
  };

  // 针对页面做增删改查
  async function postPageListAction(pagename: string, queryInfo: any) {
    const PageList = await postPageListData(pagename, queryInfo);
    List.value = PageList.data.list;
    totalcount.value = PageList.data.totalCount;
  }

  async function deletePagebyid(pagename: string, id: number) {
    await DeletePagebyid(pagename, id);
    postPageListAction(pagename, { offset: 0, size: 10 });
  }

  async function newPagedata(pagename: string, data: any) {
    await Newpagedata(pagename, data);
    postPageListAction(pagename, { offset: 0, size: 10 });
  }
  async function EditPagedatas(pagename: string, data: any, x: number) {
    await EditPagedata(pagename, data, x);
    postPageListAction(pagename, { offset: 0, size: 10 });
  }
  return {
    reqUserList,
    List,
    totalcount,
    postPageListAction,
    deletePagebyid,
    newPagedata,
    EditPagedatas,
  };
});

export default useSystermStore;
