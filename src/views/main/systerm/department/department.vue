<template>
  <div class="department">
    <pageSearch @query="handlequery" @reset="handlereset" :searchConfig="searchConfig" />
    <pageContent
      ref="contentRef"
      @create="handlecreate"
      @Edit="handedit"
      :content-config="contentConfig"
    >
      <template #部门="scope">hhh:{{ scope.row.leader }} </template>
    </pageContent>
    <pageModel ref="modelref" :modelConfig="refmodelConfig" />
  </div>
</template>

<script setup lang="ts" name="department">
import UseMainStore from '@/store/main/systerm/main';
import searchConfig from './config/search.config';
import pageSearch from '@/components/page-search/page-search.vue';
import pageContent from '@/components/page-content/page-content.vue';
import contentConfig from '@/views/main/systerm/department/config/content.config';
import pageModel from '@/components/page-model/page-model.vue';
import modelConfig from './config/model.config';
import { computed, ref } from 'vue';
import usepagecontent from '@/hooks/usePageContent';
import usepagemodel from '@/hooks/usePageModel';
const MainStore = UseMainStore();
// const modelref = ref<InstanceType<typeof pageModel>>();
// const contentRef = ref<InstanceType<typeof pageContent>>();
// const handlequery = (queryinfo: any) => {
//   contentRef.value?.reqPageList('department', queryinfo);
// };
// const handlereset = () => {
//   contentRef.value?.reqPageList('department');
// };
// 上面的代码直接变成hooks了,一行可以等价
const { contentRef, handlequery, handlereset } = usepagecontent();
// const handlecreate = () => {
//   modelref.value?.setModelVisbal(true);
// };
// const handedit = (x: any) => {
//   modelref.value?.setModelVisbal(false, x);
// };
const { modelref, handedit, handlecreate } = usepagemodel();
const refmodelConfig = computed(() => {
  // 改造一下
  const department = MainStore.deparmentlist.map((item: any) => {
    return { label: item.name, value: item.id };
  });
  modelConfig.formItems.forEach((item: any) => {
    if (item.prop == 'parentId') {
      item.options?.push(...department);
    }
  });
  return modelConfig;
});
</script>

<style scoped>
.department {
}
</style>
