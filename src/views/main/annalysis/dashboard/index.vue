<template>
  <div class="dashborad">
    <el-row :gutter="30">
      <template v-for="item in data" :key="item.title">
        <el-col :span="6"
          ><countCart
            :count1="item.number1"
            :count2="item.number2"
            :tips="item.tips"
            :title="item.title"
        /></el-col>
      </template>
    </el-row>
    <chart header="Hew111ader">w </chart>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import countCart from './ccpns/count-cart.vue';
import chart from '@/components/chart/chart.vue';
import { GetCount } from '@/service/main/systerm/sole/sale';
const data = ref<any>([]);
async function Getdata() {
  const res = await GetCount();
  data.value = res.data;
}
Getdata();
</script>

<style scoped></style>
