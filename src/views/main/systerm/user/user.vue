<template>
  <div class="user">
    <Search @query="handlequery" @reset="handlereset" />
    <Content ref="refConent" @create="handlecreate" @Edit="handleEdit" />
    <model ref="refmodel" />
  </div>
</template>

<script setup lang="ts">
import Search from './c-cpns/search.vue';
import Content from './c-cpns/content.vue';
import { ref } from 'vue';
import model from './c-cpns/model.vue';

// 对content组件的操作，先拿到content
const refConent = ref<any>('');
const refmodel = ref<any>('');

const handleEdit = (x: any) => {
  refmodel.value.setModelVisbal(false, x);
};
function handlequery(data: any) {
  refConent.value.reUserList(data);
}
function handlereset() {
  refConent.value.reUserList();
}
function handlecreate() {
  refmodel.value.setModelVisbal();
}
</script>

<style scoped lang="less">
.user {
  border-radius: 20px;
  height: 100%;
  overflow: hidden;
}
</style>
