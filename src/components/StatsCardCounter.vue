<template>
  <div class="stats shadow bg-white">
    <div class="stat place-items-center">
      <div class="stat-title">Porcentaje <span class="hidden md:inline">de avance</span></div>
      <div class="stat-value text-xl md:text-3xl">{{ percent }}%</div>
      <div class="stat-desc hidden md:block">{{ collected }} tarjetas de un total de {{ total }}</div>
      <div class="stat-desc md:hidden">{{ collected }} de {{ total }} tarjetas</div>
      <progress class="progress progress-success w-full" :value="collected" :max="total"></progress>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
const props = defineProps({
  cardsValue: { type: [Array, Object], required: true },
  userCardValue: { type: Object, required: true }
});

const total = computed(() => Array.isArray(props.cardsValue) ? props.cardsValue.length : Object.keys(props.cardsValue || {}).length);
const collected = computed(() => {
  if (!props.userCardValue) return 0;
  return Object.values(props.userCardValue).filter(card => card.inalbum).length;
});
const percent = computed(() => total.value ? Math.round((collected.value / total.value) * 100) : 0);
</script>
