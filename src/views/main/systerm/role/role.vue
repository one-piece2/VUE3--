<template>
  <pageSearch :searchConfig="searchConfig" />
  <pageContent :contentConfig="contentConfig" @Edit="handedit" @create="handlecreate" />

  <pageModel :modelConfig="modelConfig" ref="modelref" :otherInfo="otherInfo">
    <template #span>
      <el-tree
        ref="Treeref"
        @check="handlecheck"
        style="max-width: 600px"
        :data="MenusStore.userMenus"
        show-checkbox
        node-key="id"
        highlight-current
        :props="defaultProps"
      />
    </template>
  </pageModel>
</template>

<script setup lang="ts">
import { useLoginStore } from '@/store/login/login';
import pageSearch from '@/components/page-search/page-search.vue';
import pageContent from '@/components/page-content/page-content.vue';
import contentConfig from './config/content,config';
import searchConfig from './config/search.config';
import pageModel from '@/components/page-model/page-model.vue';
import modelConfig from '@/views/main/systerm/role/config/moder.config';
import usepagemodel from '@/hooks/usePageModel';
import { mapMenuListtoId } from '@/utils/active';
import { nextTick, ref } from 'vue';
import type { ElTree } from 'element-plus';
const Treeref = ref<InstanceType<typeof ElTree>>();
const { modelref, handedit, handlecreate } = usepagemodel(Treeref, EditCallback);
const MenusStore = useLoginStore();
const defaultProps = {
  children: 'children',
  label: 'name',
};
const otherInfo: any = ref({});
function handlecheck(x: any, y: any) {
  const menuList = [...y.checkedKeys, ...y.halfCheckedKeys];

  otherInfo.value = { menuList };
}

function EditCallback(itemData: any) {
  // 注意nextTick用法
  nextTick(() => {
    const menuID = mapMenuListtoId(itemData.menuList);
    Treeref.value?.setCheckedKeys(menuID);
  });
}
</script>

<style scoped></style>
