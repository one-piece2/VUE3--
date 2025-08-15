<template>
  <div class="search" v-if="isQuery">
    <el-form label-width="100px" size="large" :model="searchForm">
      <el-row :gutter="20">
        <template v-for="item in searchConfig.formitems" :key="item.prop">
          <el-col :span="8">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type == 'input'">
                <el-input v-model="searchForm[item.prop]" :placeholder="item.placeholder" />
              </template>
              <template v-else-if="item.type == 'date-picker'">
                <el-date-picker
                  v-model="searchForm[item.prop]"
                  type="monthrange"
                  range-separator="To"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                />
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="btn">
      <el-button type="primary" :icon="Loading" @click="handlereset">重置</el-button>
      <el-button :icon="Search" @click="handleQuery">查询</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Loading, Search } from '@element-plus/icons-vue';
import usePermission from '@/hooks/usePemission';
import { ref } from 'vue';
interface IProps {
  searchConfig: {
    pagename: string;
    formitems: any[];
  };
}
const props = defineProps<IProps>();
const isQuery = usePermission(`${props.searchConfig.pagename}:query`);
const innitialform: any = {};
for (const item of props.searchConfig.formitems) {
  innitialform[item.prop] = '';
}
const searchForm = ref<any>(innitialform);

const emit = defineEmits(['query', 'reset']);
const handleQuery = () => {
  emit('query', searchForm.value);
};
const handlereset = () => {
  searchForm.value = { name: '', leader: '', createAt: [] };
  emit('reset');
};
</script>

<style scoped lang="less">
.search {
  background-color: #fff;
  padding: 20px;
  .el-form-item {
    padding: 20px 90px;
    margin-bottom: 0;
  }
  .btn {
    text-align: right;
    padding: 0 50px 15px 0;
  }
}
</style>
