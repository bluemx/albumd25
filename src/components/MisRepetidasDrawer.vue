<template>
  <div class="drawer drawer-end">
    <input id="mis-repetidas-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex">
      <slot />
      <label for="mis-repetidas-drawer" class="drawer-button btn btn-outline ml-auto">Mis repetidas</label>
    </div>
    <div class="drawer-side">
      <label for="mis-repetidas-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
      <ul class="menu bg-base-200 text-base-content min-h-full w-80 p-4">
        <li class="font-bold text-lg mb-2">Mis repetidas</li>
        <li v-if="repetidas.length === 0" class="text-gray-500">No tienes repetidas</li>
        <li class="grid grid-cols-2 gap-2">
            <div v-for="usercard in repetidas" :key="usercard.id" class="">
                <Card :usercard="usercard" />
            </div>

        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useConfigStore } from '../stores/config.js';
import { storeToRefs } from 'pinia';

const configStore = useConfigStore();
const { userCards, cards } = storeToRefs(configStore);

const repetidas = computed(() => {
  if (!userCards.value) return [];

  let nonalbumcards = Object.values(userCards.value).filter(uc => uc.inalbum === false);

  return nonalbumcards
});
</script>

<style scoped>
.drawer-button {
  /* Optional: style for the button */
}
</style>
