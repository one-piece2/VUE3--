<template>
  <div class="content">
    <div class="header">
      <h2 class="title">{{ prop.contentConfig.header?.title ?? '数据列表' }}</h2>
      <el-button type="primary" size="default" @click="handleCreate" v-if="isCreate">{{
        prop.contentConfig.header?.btntitle ?? '新建数据'
      }}</el-button>
    </div>
    <div class="table">
      <el-table :data="userList" border style="width: 100%" row-key="id">
        <template v-for="item in prop.contentConfig.propsList" :key="item.prop">
          <template v-if="item.type == 'timer'">
            <el-table-column :label="item.label" align="center">
              <template #default="scop"> {{ formattime(scop.row[item.prop]) }} </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type == 'handler'">
            <el-table-column align="center" :label="item.label" min-width="120">
              <template #default="scop">
                <el-button
                  v-if="isDelete"
                  link
                  type="primary"
                  icon="Delete"
                  @click="handleDelete(scop.row.id)"
                >
                  Delete
                </el-button>
                <el-button
                  v-if="isUpdata"
                  link
                  type="primary"
                  size="small"
                  icon="Edit"
                  @click="handleEdit(scop.row)"
                  >Edit</el-button
                >
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type == 'custom'">
            <el-table-column :label="item.label" align="center">
              <template #default="scope">
                <slot v-bind="scope" :name="item.slotName"></slot>
              </template>
            </el-table-column>
          </template>
          <template v-else>
            <el-table-column
              align="center"
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
              :type="item.type"
            >
            </el-table-column>
          </template>
        </template>
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

import usePermission from '@/hooks/usePemission';
import useSystermStore from '@/store/main/systerm/systerm';
interface IProps {
  contentConfig: {
    pagename: string;
    header?: {
      title?: string;
      btntitle?: string;
    };
    propsList: any[];
  };
}
const prop = defineProps<IProps>();
// 对应的权限按钮

const isCreate = usePermission(`${prop.contentConfig.pagename}:create`);

const isDelete = usePermission(`${prop.contentConfig.pagename}:delete`);

const isUpdata = usePermission(`${prop.contentConfig.pagename}:update`);

const isQuery = usePermission(`${prop.contentConfig.pagename}:query`);

const userList = ref<any>([]);
const totalCount = ref<number>();
const currentPage = ref<number>(1);
const pagesize = ref<number>(5);
const emit = defineEmits(['create', 'Edit']);
// 获取数据
const SystermStore = useSystermStore();
reqPageList(prop.contentConfig.pagename);

function handleCurrentChange() {
  reqPageList(prop.contentConfig.pagename);
}
function handlesizechange() {
  reqPageList(prop.contentConfig.pagename);
}
// 修改一下 改成获取页面数据
function reqPageList(name: string, data: any = {}) {
  if (!isQuery) return;

  const size = pagesize.value;
  const offset = (currentPage.value - 1) * pagesize.value;
  const alldata = { ...data, offset, size };

  SystermStore.postPageListAction(name, alldata).then(() => {
    userList.value = SystermStore.List;
    totalCount.value = SystermStore.totalcount;
  });
}
const handleDelete = async (x: number) => {
  SystermStore.deletePagebyid(prop.contentConfig.pagename, x);
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
