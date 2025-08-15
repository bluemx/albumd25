<template>
  <div class="stats shadow bg-gradient-to-br from-yellow-100 to-yellow-300 text-yellow-900 text-center">
    <div class="stat">
      <div class="stat-title text-lg font-bold">Tokens</div>
      <div class="stat-value text-4xl font-extrabold ">
        <Tokens v-if="tokens" :tokens="tokens" />
      </div>
      <div class="stat-desc text-xs mt-2 hidden md:block">Intercámbialos por tarjetas</div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useConfigStore } from '../stores/config.js';
import { storeToRefs } from 'pinia';

const configStore = useConfigStore();
const { albumTokens } = storeToRefs(configStore);

const tokens = albumTokens;
</script>

<style scoped>

</style>
