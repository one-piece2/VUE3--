<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isfoldw ? '53px' : '200px'">
        <Aside :isfold="isfoldw" />
      </el-aside>
      <el-container>
        <el-header><Header @fold="handlefold" /></el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import Aside from '@/components/main-menu/aside.vue';
import Header from '@/components/main-header/header.vue';
import Mian from '@/components/main-main/mian.vue';
import { onMounted, ref } from 'vue';
import router from '@/router';
// import { useRouter } from 'vue-router';
// const router = useRouter();
// const handleout = () => {
//   // 退出登录逻辑
//   localStorage.removeItem('token');
//   router.push('/login');

//   // 清除登录状态
// };
const isfoldw = ref(false);
const handlefold = (x: boolean) => {
  isfoldw.value = x;
};
</script>

<style scoped lang="less">
.main {
  width: 100%;
  height: 100%;
}

.main-content {
  height: 100%;

  .el-aside {
    overflow-x: hidden;
    overflow-y: auto;

    text-align: left;
    cursor: pointer;
    background-color: #001529;
    transition: width 0.3s linear;
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .el-main {
    color: #333;

    background-color: #f0f2f5;
  }
}
</style>
