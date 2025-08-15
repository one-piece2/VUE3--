<template>
  <pageContent :contentConfig="contentconfig" />
</template>

<script setup lang="ts" name="menu">
import pageContent from '@/components/page-content/page-content.vue';
import contentconfig from './config/pagecontent.config';
</script>

<style scoped>
.menu {
}
</style>
