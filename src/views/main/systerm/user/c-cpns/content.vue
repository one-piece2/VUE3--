<template>
  <div class="content">
    <div class="header">
      <h2 class="title">用户列表</h2>
      <el-button type="primary" size="default" @click="handleCreate">新建用户</el-button>
    </div>
    <div class="table">
      <el-table :data="userList" border style="width: 100%">
        <el-table-column align="center" type="selection" width="55" />
        <el-table-column align="center" type="index" label="序号" width="55" />
        <el-table-column align="center" prop="name" label="用户名" width="180" />
        <el-table-column align="center" prop="realname" label="真实姓名" width="180" />
        <el-table-column align="center" prop="cellphone" label="手机号码" />
        <!-- <el-table-column align="center" prop="enable" label="状态" /> -->
        <el-table-column label="状态" align="center">
          <template #default="scop"> {{ scop.row.enable == 1 ? '启动' : '禁用' }} </template>
        </el-table-column>
        <el-table-column label="创建时间" align="center">
          <template #default="scop"> {{ formattime(scop.row.createAt) }} </template>
        </el-table-column>

        <el-table-column label="更新时间" align="center">
          <template #default="scop"> {{ formattime(scop.row.upda) }} </template>
        </el-table-column>

        <el-table-column align="center" label="操作" min-width="120">
          <template #default="scop">
            <el-button
              link
              type="primary"
              size="small"
              icon="Delete"
              @click="handleDelete(scop.row.id)"
            >
              Delete
            </el-button>
            <el-button link type="primary" size="small" icon="Edit" @click="handleEdit(scop.row)"
              >Edit</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="footer">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pagesize"
        :page-sizes="[5, 10, 15, 20]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
        @current-change="handleCurrentChange"
        @size-change="handlesizechange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { formattime } from '@/utils/dayjs';
import { ref } from 'vue';
import useSystermStore from '../../../../../store/main/systerm/systerm';
import { DeleteUser } from '@/service/main/systerm/systerm';

const userList = ref<any>([]);
const totalCount = ref<number>();
const currentPage = ref<number>(1);
const pagesize = ref<number>(5);
const emit = defineEmits(['create', 'Edit']);
// 获取数据
const SystermStore = useSystermStore();
SystermStore.reqUserList({
  size: pagesize.value,
  offset: (currentPage.value - 1) * pagesize.value,
}).then(() => {
  userList.value = SystermStore.List.data.list;
  totalCount.value = SystermStore.List.data.totalCount;
});
function handleCurrentChange() {
  SystermStore.reqUserList({
    size: pagesize.value,
    offset: (currentPage.value - 1) * pagesize.value,
  }).then(() => {
    userList.value = SystermStore.List.data.list;
    totalCount.value = SystermStore.List.data.totalCount;
  });
}
function handlesizechange(x: any) {
  SystermStore.reqUserList({
    size: pagesize.value,
    offset: (currentPage.value - 1) * pagesize.value,
  }).then(() => {
    userList.value = SystermStore.List.data.list;
    totalCount.value = SystermStore.List.data.totalCount;
  });
}
function reUserList(data: any = {}) {
  const size = pagesize.value;
  const offset = (currentPage.value - 1) * pagesize.value;
  const alldata = { ...data, offset, size };

  SystermStore.reqUserList(alldata).then(() => {
    userList.value = SystermStore.List.data.list;
    totalCount.value = SystermStore.List.data.totalCount;
  });
  console.log(userList.value);
}
const handleDelete = async (x: number) => {
  await DeleteUser(x);
  reUserList();
};
const handleCreate = () => {
  emit('create');
};
function handleEdit(x: any) {
  emit('Edit', x);
}
defineExpose({ reUserList });
</script>

<style scoped lang="less">
.content {
  background-color: #fff;
  margin-top: 20px;
  padding: 20px;
  .header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 10px;

    .title {
      font-size: 20px;
      font-weight: bold;
    }
  }
}
.footer {
  display: flex;
  justify-content: end;
  margin-top: 10px;
}
</style>
