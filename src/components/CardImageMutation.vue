<template>
  <div class="absolute inset-0 pointer-events-none">
    <div v-if="effect === 'Holograma'" class="holo-effect"></div>
    <div v-if="effect === 'Vintage'" class="vintage-effect">
      <img :src="card.vintageUrl" alt="vintage effect" class="w-full h-full object-cover rounded-lg shadow-lg" />
    </div>
    <div v-if="effect === 'Fanatico'" class="w-full h-full">
      <img :src="card.fanaticoUrl" alt="Fanatico" class="w-full h-full object-cover rounded-lg shadow-lg" />
    </div>
    <div v-if="effect === 'Animado'" class="w-full h-full">
      <video autoplay loop muted  webkit-playsinline playsinline class="w-full h-full object-cover rounded-lg shadow-lg">
        <source :src="card.animadoUrl" type="video/mp4"></source>
        </video>
    </div>
  </div>
    <!-- Add more effects here as needed -->
</template>

<script setup>
const props = defineProps({
  effect: String,
  card: Object,
  usercard: Object
});
</script>

<style scoped>
.holo-effect {
  width: 100%;
  height: 100%;
  border-radius: inherit;
  background-image: repeating-linear-gradient(135deg, rgba(0,255,255,0.5) 0 10px, rgba(255,0,255,0.20) 0px 20px, rgba(255,255,255,.1) 50px 30px);
  mix-blend-mode: lighten;
  filter: blur(4px);
  animation: holo-move 5.5s linear infinite;
}
/* Vintage effect: sepia and noise overlay */
.vintage-effect {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  overflow: hidden;
}
.vintage-effect::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  opacity: 1;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"100\" height=\"100\" viewBox=\"0 0 100 100\"><filter id=\"n\" x=\"0\" y=\"0\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.7\" numOctaves=\"2\" seed=\"2\"/></filter><rect width=\"100\" height=\"100\" fill=\"white\" filter=\"url(%23n)\"/></svg>');
  background-size: 120px 120px;
  animation: noise-move 1.45s steps(2) infinite;
  will-change: background-position, filter;
  mix-blend-mode: multiply;
}

@keyframes noise-move {
  0% {
    background-position: 0 0;
    filter: brightness(1) contrast(1.1);
  }
  20% {
    background-position: 20px 40px;
    filter: brightness(1.1) contrast(1.2);
  }
  40% {
    background-position: 60px 10px;
    filter: brightness(0.95) contrast(1.3);
  }
  60% {
    background-position: 80px 60px;
    filter: brightness(1.05) contrast(1.1);
  }
  80% {
    background-position: 40px 80px;
    filter: brightness(1.08) contrast(1.25);
  }
  100% {
    background-position: 0 0;
    filter: brightness(1) contrast(1.1);
  }
}
@keyframes holo-move {
  0% { background-position: 0 0; }
  80% { background-position: 60px 60px;  }
  100% { background-position: 0px 0px; }
}
</style>
