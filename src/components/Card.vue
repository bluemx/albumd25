<template>

  <div class="relative cursor-pointer w-full h-full  ">

    <div class="flex flex-col items-center card-pop" @click="emitter.emit('open', {card:usercard.card, usercard:usercard})">
      <CardImageMutation :effect="usercard.mutationType" :card="usercard.card" :usercard="usercard" />
      <img :src="usercard.card.imageUrl" alt="card image" class="w-full h-auto object-cover rounded shadow" />
    </div>

      <div class="bg-gradient-to-br from-yellow-100 to-yellow-300 text-yellow-900 text-center text-sm rounded-full w-8 h-8 absolute -top-4 -left-4 flex items-center justify-center">
          <Tokens :tokens="usercard.tokens" />
      </div>
    </div>

</template>

<script setup>
import Tokens from './Tokens.vue';
import emitter from '../mitt.js';


const props = defineProps({
  usercard: {
    type: Object,
    default: null
  }
});
// Removed defineEmits, using mitt for global event

</script>

<style scoped>
.card-pop {
  transition: transform 0.2s cubic-bezier(.25,.8,.25,1), box-shadow 0.2s;
  will-change: transform;
}
.card-pop:hover {
  transform: perspective(500px) translateZ(20px) scale(1.2) rotateX(-20deg) rotateY(-20deg);
  box-shadow: 0 12px 32px 0 rgba(0,0,0,0.25), 0 1.5px 6px 0 rgba(0,0,0,0.15);
  z-index: 10;
  background: #fff3;
}
</style>
