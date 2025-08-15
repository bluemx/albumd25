
<template>
  {{ open }}
  <dialog :open="open" class="modal" aria-modal="true" role="dialog">
    <form method="dialog" class="modal-box bg-base-200 max-w-md">
      <button @click="open = false" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      <div v-if="card">
        <div class="flex flex-col items-center">
          <div class="relative w-48 h-64 mb-4 group img-3d-outer card-3d-animate">
            <div class="img-3d-container">
                <CardImageMutation :effect="card.usercard.mutationType" :card="card.card" :usercard="card.usercard" />
                <img :src="card.card.imageUrl || card.card.img" :alt="card.card.identifier || card.card.name" class="rounded-lg shadow-lg w-full h-full object-cover" />
                <div class="beam-shine"></div>
            </div>
          </div>
         
          <div v-if="card.usercard.mutationType" class="badge badge-info mb-2">
            {{ card.usercard.mutationType }}
          </div>



          <div v-if="card.usercard" class="bg-gradient-to-br from-zinc-100 to-zinc-300 text-zinc-900 text-center text-xl rounded-full w-14 h-14 absolute top-4 left-4 flex items-center justify-center">
            {{ card.card.identifier }}
          </div>
          <div v-if="card.usercard" class="bg-gradient-to-br from-yellow-100 to-yellow-300 text-yellow-900 text-center text-xl rounded-full w-14 h-14 absolute top-16 left-4 flex items-center justify-center">
            <Tokens :tokens="card.usercard.tokens" />
           </div>
          
          <div v-if="card.card.tags && card.card.tags.length" class="flex gap-2 mt-2">
            <span v-for="tag in card.card.tags" :key="tag" class="badge badge-outline">{{ tag }}</span>
          </div>


          <p class="text-base-content/80 my-2 bg-base-300 p-5 rounded">{{ card.card.information || card.card.desc || 'No description available.' }}</p>

          <div class="divider"></div>

          <div v-if="card.usercard.inalbum">
            <button class="btn btn-outline" @click.prevent="$emit('claim', card)">Quitar del album</button>            
          </div>
          <div v-else>
            <button class="btn btn-outline" @click.prevent="$emit('claim', card)">Intercambiar mi tarjeta</button>            
          </div>
          

        </div>
      </div>
    </form>
    
  </dialog>
</template>

<script setup>
import { useConfigStore } from '../stores/config';
import emitter from '../mitt.js';
const props = defineProps({
  //open: Boolean,
  //card: Object,
  close: Function
});
import { computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';

const configStore = useConfigStore();
const { userCardsValue } = storeToRefs(configStore);
const card = ref(null)
const open = ref(false)

onMounted(()=>{
  emitter.on('open', (cardData) => {
    card.value = cardData;
    open.value = true
    console.log('CardPopup opened with:', card.value);
  });
})

</script>

<style scoped>
@keyframes card3dloop {
  0% {
    transform: perspective(600px) rotateY(-8deg) rotateX(2deg) scale(1.04);
  }
  25% {
    transform: perspective(600px) rotateY(8deg) rotateX(-2deg) scale(1.08);
  }
  50% {
    transform: perspective(600px) rotateY(-8deg) rotateX(2deg) scale(1.04);
  }
  75% {
    transform: perspective(600px) rotateY(16deg) rotateX(6deg) scale(1.1);
  }
  100% {
    transform: perspective(600px) rotateY(-8deg) rotateX(2deg) scale(1.04);
  }
}
.card-3d-animate {
  animation: card3dloop 10.5s infinite cubic-bezier(.4,1.6,.4,1);
  will-change: transform;
  transition: box-shadow 0.2s;
  box-shadow: 0 12px 32px 0 rgba(0,0,0,0.25), 0 1.5px 6px 0 rgba(0,0,0,0.15);
}
.img-3d-outer {
  display: inline-block;
  border-radius: 1rem;
  overflow: hidden;
  max-width: 100%;
  max-height: 24rem;
  box-shadow: 0 12px 32px 0 rgba(0,0,0,0.25), 0 1.5px 6px 0 rgba(0,0,0,0.15);
}
.img-3d-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
.beam-shine {
  pointer-events: none;
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  border-radius: inherit;
  background: linear-gradient(120deg, rgba(255,255,255,0) 60%, rgba(255,255,255,0.7) 80%, rgba(255,255,255,0) 100%);
  mix-blend-mode: screen;
  opacity: 0.7;
  animation: shine-move 5.5s linear infinite;
  z-index: 2;
}
@keyframes shine-move {
  0% { transform: translateX(-80%) skewX(-20deg);}
  10% { transform: translateX(120%) skewX(-20deg);}
  100% { transform: translateX(120%) skewX(-20deg);}
}
</style>
