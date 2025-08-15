<template>
  <div class="search">
    <el-form label-width="100px" size="large">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="部门名称">
            <el-input v-model="searchForm.name"></el-input> </el-form-item
        ></el-col>
        <el-col :span="8">
          <el-form-item label="部门领导">
            <el-input v-model="searchForm.leader"></el-input> </el-form-item
        ></el-col>

        <el-col :span="8">
          <el-form-item label="创建时间">
            <el-date-picker
              v-model="searchForm.createAt"
              type="monthrange"
              range-separator="To"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            /> </el-form-item
        ></el-col>
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

import { ref } from 'vue';
const searchForm = ref<any>({
  name: '',

  leader: '',
  createAt: '',
});

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
