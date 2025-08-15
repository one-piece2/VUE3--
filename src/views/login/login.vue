<template>
  <div class="login">
    <Panel />
  </div>
</template>

<script setup lang="ts">
import Panel from './login-panel/index.vue';
</script>

<style scoped lang="less">
.login {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url('../../assets//img//img/login-bg.svg');
}
</style>
