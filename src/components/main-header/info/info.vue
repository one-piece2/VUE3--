<template>
  <div class="info">
    <div class="operation">
      <span><bell /></span>
      <span> <span class="dot"></span><ChatDotRound /></span>
      <span>
        <Postcard />
      </span>
    </div>
    <div class="man">
      <el-dropdown>
        <div class="man-info">
          <!-- 头像 -->
          <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
          <span class="name"> coderwhy </span>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleexit">
              <el-icon><CircleCloseFilled /></el-icon> 退出系统</el-dropdown-item
            >
            <el-dropdown-item>
              <el-icon><InfoFilled /></el-icon> 个人信息</el-dropdown-item
            >
            <el-dropdown-item>
              <el-icon><Unlock /></el-icon> 修改密码</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Edit, Postcard } from '@element-plus/icons-vue';
const handleexit = () => {
  // 退出登录逻辑
  localStorage.removeItem('token');
  // 跳转到登录页面
  window.location.href = '/login';
};
</script>

<style scoped lang="less">
.info {
  display: flex;
  align-items: center;
}
.operation {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  span {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 25px;
    margin-right: 10px;
    .dot {
      position: absolute;
      top: 4px;
      right: 3px;
      z-index: 10;
      width: 6px;
      height: 6px;
      background: red;
      border-radius: 100%;
    }
  }
}
.man-info {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.man {
  :global(.el-dropdown-menu__item) {
    line-height: 36px !important;
    padding: 6px 22px;
  }
}
</style>
