<template>
<div class="page relative">
    <div class="pageshadows"></div>
    <div class="page-content h-full bg-cover bg-center" :style="{backgroundImage: computedBg ? `url(${computedBg})` : ''}">

        <div class="page-cards flex gap-10 flex-wrap p-5 mx-auto justify-center items-center w-full h-full">
            <div v-for="card in cardsInPage" :key="card" class="relative card aspect-[247/317] border-2 border-dashed bg-black/20 border-white/50 w-1/4 flex justify-center items-center text-xl md:text-3xl font-bold text-white">
                <template v-if="configStore.userCards?.[card.identifier]">
                    <Card :card="card" :usercard="configStore.userCards?.[card.identifier]" @open="$emit('open', $event)" />
                </template>
                <template v-else>
                    {{ card.identifier }}
                </template>

            </div>
        </div>  
    </div>
    <div class="page-number absolute bottom-2  text-lg font-light text-white w-full text-center px-2 py-1 opacity-45 ">
        {{ pageNumber }}
    </div>
</div>
</template>


<script setup>
import { useConfigStore } from '../stores/config.js';
import { computed } from 'vue';

const props = defineProps({
    pageNumber: {
        type: Number,
        required: true
    },
    
    bg: {
        type: String,
        default: ''
    }
});

// Get config from Pinia store
const configStore = useConfigStore();


const cardsInPage = computed(() => {
    // Return the configStore.cards where page is props.pageNumber
    if (configStore.cards && configStore.cards.length > 0) {

        // Filter cards for the current page Number
        return configStore.cards.filter(card => (card.page === props.pageNumber))
    }

});

const computedBg = computed(() => {
    if (props.bg) return props.bg;
    const config = configStore.config;
    if (config && config.bgs) {
        return config.bgs[`bg${props.pageNumber}`] || '';
    }
    return '';
});
</script>