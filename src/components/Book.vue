<template>
    <div v-if="!loading">

        <div class="grid grid-cols-3 gap-2 mb-2">
            <div></div>
            <div class="join ">
                <button class="join-item btn btn-neutral btn-outline" @click="prevPage">«</button>
                <button class="join-item btn btn-neutral">BIENVENIDO A TU ÁLBUM</button>
                <button class="join-item btn btn-neutral btn-outline" @click="nextPage">»</button>
            </div>
            <div>
                <MisRepetidasDrawer />
            </div>

        </div>
        <div id="book" ref="thebook" class=" w-full ">
            <div class="page page-cover page-cover-top " data-density="hard">
                <div class="page-content h-full bg-cover bg-center" :style="bgStyle(configValue?.bgs['bg0'])"></div>
            </div>

            <!-- INFOOOOO -->
            <div class="page page-cover page-cover-top relative">
                <div class="page-content h-full bg-cover bg-center flex flex-col justify-evenly items-center"
                    :style="bgStyle(configValue?.bgs['bg1'])">
                    
                    <!-- The user-->
                    <div class="text-center" v-if="userDataValue" >
                        <div class="avatar border-2 border-dashed border-white p-1 rounded-full">
                            <div class="ring-primary ring-offset-base-100 w-16 md:w-24 rounded-full">
                                <img :src="userDataValue?.avatarUrl" />
                            </div>
                        </div>
                        <div class="font-extrabold text-white text-md md:text-xl mt-2">{{ userDataValue.name }}</div>
                    </div>

                    <!-- Stats card counter -->
                     <div class="grid grid-cols-2 gap-2 p-4">
                         <StatsCardCounter v-if="cardsValue && userCardValue" :cards-value="cardsValue" :user-card-value="userCardValue" />
                         <TokensCounter v-if="userDataValue" />
                         <!-- Challenges list -->
                         <div class="col-span-2">
                             <ChallengesList />
                         </div>

                     </div>
                </div>
                <div class="page-number absolute bottom-2  text-lg font-light text-white w-full text-center px-2 py-1 opacity-45 ">1</div>
            </div>


            <!-- PAGES .... -->
            <Page v-for="page in configStore.totalPages-1" :page-number="page+1" @open="openCardPopup" />


            <!-- The END-->
            <div class="page page-cover page-cover-bottom bg-zinc-600" data-density="hard">
                <div class="page-content h-full bg-cover bg-center" :style="bgStyle(configValue?.bgs['bg99'])">
                    <h2>THE END</h2>
                </div>
            </div>
        </div>
        
        
        <!-- Pagination -->
        <div class="flex justify-center mt-2">
            <div class="join ">
                <button class="join-item btn btn-neutral btn-outline btn-xs" @click="prevPage">«</button>
                <template v-if="thebookLandscape">
                    <button
                        v-for="pair in Math.ceil(configStore.totalPages / 2)"
                        :key="pair"
                        class="join-item btn btn-neutral btn-outline btn-xs"
                        @click="toPage((pair - 1) * 2 + 1)"
                    >
                        {{ (pair - 1) * 2 + 1 }}-{{ Math.min(pair * 2, configStore.totalPages) }}
                    </button>
                </template>
                <template v-else>
                    <button
                        v-for="page in configStore.totalPages"
                        :key="page"
                        class="join-item btn btn-neutral btn-outline btn-xs"
                        @click="toPage(page)"
                    >
                        {{ page }}
                    </button>
                </template>
                <button class="join-item btn btn-neutral btn-outline btn-xs" @click="nextPage">»</button>
            </div>
        </div>



        <CardPopup  />
    </div>
</template>
<script setup>

import { PageFlip } from '../vendor/page-flip.module.js';

import { useConfigStore } from '../stores/config.js';
import CardPopup from './CardPopup.vue';
import StatsCardCounter from './StatsCardCounter.vue';
import ChallengesList from './ChallengesList.vue';
import { ref, onMounted } from 'vue';
import { startFlip as startFlipUtil, goToPageFromHash as goToPageFromHashUtil } from '../utils/pageflip.js';
import TokensCounter from './TokensCounter.vue';
import MisRepetidasDrawer from './MisRepetidasDrawer.vue';

// Helper to generate background style
function bgStyle(url) {
    return url ? {
        backgroundImage: `url(${url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    } : {};
}

const thebook = ref(null);
const thebookLandscape = ref(null); 

const configStore = useConfigStore();
const { config: configValue, cards: cardsValue, userCards: userCardValue, userData: userDataValue, loading, error } = storeToRefs(configStore);

let pageFlipInstance = null;

const popupOpen = ref(false);
const popupCard = ref(null);

function openCardPopup(card) {
    popupCard.value = card;
    popupOpen.value = true;
}
function closeCardPopup() {
    popupOpen.value = false;
    popupCard.value = null;
}
function toPage(pageNumber) {
    if (pageFlipInstance) {
        pageFlipInstance.flip(pageNumber);
    }
}

function goToPageFromHash() {
    if(pageFlipInstance) {
        goToPageFromHashUtil(pageFlipInstance);
    }
}

async function startFlip() {
    pageFlipInstance = await startFlipUtil(thebook, (e) => {
        const pageNum = (e.data || 0);
        window.location.hash = `p${pageNum}`;
    });
    thebookLandscape.value = pageFlipInstance.getOrientation() === 'landscape';
    pageFlipInstance.on('changeOrientation', (e) => {
        thebookLandscape.value = pageFlipInstance.getOrientation() === 'landscape';
    });
    goToPageFromHash();
    window.addEventListener('hashchange', goToPageFromHash);
}

function nextPage() {
    if (pageFlipInstance) {
        pageFlipInstance.flipNext();
    }
}

function prevPage() {
    if (pageFlipInstance) {
        pageFlipInstance.flipPrev();
    }
}






onMounted(async () => {
    try {
        await configStore.fetchAllData('oysif1862q3gp01');
        console.log('All fetches complete. Attempting to start PageFlip.');
        await startFlip();
    } catch (e) {
        console.error('Unexpected erroyer in onMounted:', e);
    }
});




console.log('Book component mounted');
</script>
