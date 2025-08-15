<template>
  <div class="countcart">
    <div class="header">
      <span>{{ title }}</span>
      <Aim style="height: 20px" />
    </div>

    <div class="count">
      <span>{{ count1 }}</span>
    </div>
    <div class="bottom">
      <span>{{ tips }}</span>
      <span>{{ count2 }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Iprops {
  title: string;
  tips: string;
  count1: number;
  count2: number;
}
defineProps<Iprops>();
</script>

<style scoped>
.countcart {
  background: white;
  display: flex;
  flex-direction: column;
  height: 130px;
  padding: 0 10px;
  box-shadow: 0px 0px 10px rgb(57, 57, 57);
}
.header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.435);
  height: 20px;
}
.count {
  font-size: 30px;
  display: flex;
  flex: 1;
  font-size: 30px;
  /* justify-content: center; */
  /* flex-direction: column; */
  align-items: center;
}
.bottom {
  display: flex;
  height: 30px;
  display: flex;
  color: rgba(0, 0, 0, 0.812);
  line-height: 30px;
  border-top: 1px solid rgba(42, 41, 39, 0.443);
  font-size: 14px;
  letter-spacing: 1px;
  span {
    padding-right: 5px;
  }
}
</style>
