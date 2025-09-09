<template>
  <div style="height: 100vh; width: 100vw; background: #fff;">
    <div id="swagger-ui" style="height: 100%; width: 100%;"></div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { renderSwaggerUI } from '../api/swagger';

onMounted(() => {
  renderSwaggerUI('#swagger-ui');
});
</script>
