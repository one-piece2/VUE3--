<template>
  <div class="main-menu">
    <div class="logo">
      <img src="../../assets/img/img/image.png" alt="" />
      <h2 class="title">yy管理系统</h2>
    </div>
    <div class="menu">
      <el-menu
        class="el-menu-vertical-demo"
        :default-active="defaultid"
        text-color="#b7bdc3"
        background-color="#001529"
        active-text-color="#fff"
        active-background-color="#0c2135"
        :collapse="isfold"
      >
        >
        <template v-for="item in menu" :key="item.id">
          <el-sub-menu :index="item.id.toString()">
            <template #title>
              <el-icon>
                <component :is="item.icon.split('-icon-')[1]" />
              </el-icon>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="child in item.children" :key="child.id">
              <el-menu-item
                :index="child.id.toString()"
                @click="
                  () => {
                    router.push(child.url);
                  }
                "
              >
                <span>{{ child.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLoginStore } from '@/store/login/login';

import { useRoute, useRouter } from 'vue-router';
import { firstRoute, MapmenuId } from '@/utils/active';
import { computed, ref } from 'vue';
const route = useRoute();

const router = useRouter();
const loginStore = useLoginStore();
const menu = loginStore.userMenus;
// menu默认选中的菜单
// 获取本地存储的 userMenus 并解析为数组

const defaultid = computed(() => {
  const defaultid = MapmenuId(route.path, menu);
  return defaultid;
});

defineProps({
  isfold: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped>
.main-menu {
  background-color: #001529;
  height: 100%;
}
.logo {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 10px 12px;
}
.logo img {
  margin-right: 20px;
}
.title {
  color: #fff;
  font-size: 20px;
  font-weight: bold;
}
.el-menu-item {
  background-color: #0c2135;
}
.el-menu {
  border-right: none;
}
</style>
