<template>
  <div class="content">
    <div class="header">
      <h2 class="title">部门列表</h2>
      <el-button type="primary" size="default" @click="handleCreate">新建部门</el-button>
    </div>
    <div class="table">
      <el-table :data="userList" border style="width: 100%">
        <el-table-column align="center" type="selection" width="55" />
        <el-table-column align="center" type="index" label="序号" width="55" />
        <el-table-column align="center" prop="name" label="部门名称" width="180" />
        <el-table-column align="center" prop="leader" label="部门领导" width="180" />
        <el-table-column align="center" prop="parentId" label="上级部门" width="180" />

        <!-- <el-table-column align="center" prop="enable" label="状态" /> -->

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
reqPageList('department');

function handleCurrentChange() {
  reqPageList('department');
}
function handlesizechange() {
  reqPageList('department');
}
// 修改一下 改成获取页面数据
function reqPageList(name: string, data: any = {}) {
  const size = pagesize.value;
  const offset = (currentPage.value - 1) * pagesize.value;
  const alldata = { ...data, offset, size };

  SystermStore.postPageListAction(name, alldata).then(() => {
    userList.value = SystermStore.List;
    totalCount.value = SystermStore.totalcount;
  });
}
const handleDelete = async (x: number) => {
  SystermStore.deletePagebyid('department', x);
};

const handleCreate = () => {
  emit('create');
};
function handleEdit(x: any) {
  emit('Edit', x);
}
defineExpose({ reqPageList });
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
