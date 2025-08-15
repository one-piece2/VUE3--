<template>
  <div class="mian-header">
    <div class="menu-icon" @click="handleclick">
      <Fold v-show="isfold" />
      <Expand v-show="!isfold" />
    </div>
    <div class="content">
      <div class="breadcrumb">
        <el-breadcrumb separator-icon="ArrowRight">
          <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
          <el-breadcrumb-item v-for="(item, index) in breads" :key="index">{{
            item.name
          }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="info">
        <info />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Expand } from '@element-plus/icons-vue';
import { onMounted, ref, watch } from 'vue';
import info from '@/components/main-header/info/info.vue';
import { useRoute } from 'vue-router';
import { MaptoBread } from '@/utils/active';
import { useLoginStore } from '@/store/login/login';
const route = useRoute();
const loginStore = useLoginStore();
const breads = ref();
// 想到点击后 面包屑导航的值直接变化而不用刷新，可使用watch或者computed
watch(
  () => route.path,
  () => {
    breads.value = MaptoBread(route.path, loginStore.userMenus);
  },
);

const isfold = ref(false);
// 内部自定义事件
const emit = defineEmits(['fold']);
const handleclick = () => {
  // 处理菜单折叠逻辑
  isfold.value = !isfold.value;
  // 2.将事件传递出去使得菜单真正折叠
  emit('fold', isfold.value);
};
</script>

<style scoped lang="less">
.mian-header {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  flex: 1;
  .menu-icon {
    height: 18px;
    width: 20px;

    align-items: center;
  }
  .content {
    display: flex;
    justify-content: space-between;
    flex: 1;
    align-items: center;
    padding: 0 28px;
  }
  /* .info {
    height: 100%;
    width: 100%;
  } */
}
</style>
