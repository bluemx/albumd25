
<template>
  <ul class="list bg-base-100 rounded-box shadow-md border-2 border-base-100  max-h-32 md:max-h-52 overflow-y-scroll" v-if="challenges && challenges.length">
    <li class="p-2 text-xs opacity-60 tracking-wide flex justify-between">
      
      <div>Desafíos del álbum: 0/{{ challenges.length }}</div>
      <div class="w-20 text-center ">Tokens</div>
    </li>
    <li v-if="loading" class="p-4 text-center text-xs opacity-60">Cargando desafíos...</li>
    <li v-else-if="error" class="p-4 text-center text-xs text-red-500">Error cargando desafíos</li>
    <li v-else v-for="(challenge, idx) in challenges" :key="challenge.id" class="list-row flex gap-2 p-2 flex-wrap">
      <div class="text-2xl font-thin opacity-30 tabular-nums hidden md:block">{{ (idx+1).toString().padStart(2, '0') }}</div>
      <div class="flex-grow w-full md:w-auto">
        <div class="font-semibold">{{ challenge.title }}</div>
        <div class="text-xs opacity-80">{{ challenge.description }}</div>
        <!--
          <div class="text-xs opacity-50 mt-1">{{ formatDate(challenge.start) }} - {{ formatDate(challenge.end) }}</div>
        -->
      </div>
      <div class="flex flex-col  justify-center items-center font-thin w-20 ml-auto ">
        <div class="text-2xl leading-8 flex items-center"><span class="text-sm font-extrabold text-amber-500">+</span><Tokens :tokens="challenge.tokens" /></div>
        
        <button class="btn text-xs btn-xs btn-warning">Reclamar</button>
      </div>
    </li>
    <li class="bg-zinc-200 py-10 px-5 text-center opacity-60">Regresa todos los días para encontrar nuevos desafios.</li>
  </ul>
</template>

<script setup>

import { useConfigStore } from '../stores/config.js';
import { storeToRefs } from 'pinia';

const configStore = useConfigStore();
const { challenges, loading, error } = storeToRefs(configStore);

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString();
}
</script>
