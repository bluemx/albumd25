
import { defineStore } from 'pinia';
import { getConfiguration, getCards, getUserCards, getUser, getChallenges } from '../api/configuration.js';

export const useConfigStore = defineStore('config', {
  state: () => ({
    config: null,
    cards: null,
    userCards: null,
    userData: null,
    loading: false,
    error: null,
    challenges: null,
    mutations: null,
    totalPages: 10,
  }),
  getters: {
    albumTokens: (state) => {
      return Object.values(state.userCards || {}).reduce((total, card) => {
        return total + (card.tokens || 0);
      }, 0);
    }
  },
  actions: {
    async calcUserCardTokens(ucard) {      
      const card = this.cards.find(c => c.identifier === ucard);
      const mutation = this.mutations.find(m => m.id === this.userCards[ucard].mutationId)
      const usercardTokens = card.tokens * mutation.multiplier
      this.userCards[ucard].mutationType = mutation.name
      this.userCards[ucard].tokens = usercardTokens
      this.userCards[ucard].card = card
    },
    async fetchAllData(userId = 'oysif1862q3gp01') {
      this.loading = true;
      this.error = null;
      try {
        const fetches = [
          this.fetchConfig().catch(e => console.error('fetchConfig error', e)),
          this.fetchCards().catch(e => console.error('fetchCards error', e)),
          this.fetchUserCards(userId).catch(e => console.error('fetchUserCards error', e)),
          this.fetchUserData(userId).catch(e => console.error('fetchUserData error', e)),
          this.fetchChallenges?.().catch?.(e => console.error('fetchChallenges error', e)),
          this.fetchMutations?.().catch?.(e => console.error('fetchMutations error', e)),
        ];
        await Promise.all(fetches);
        
        for(var ucard in this.userCards) {
          this.calcUserCardTokens(ucard)
        }

      } catch (e) {
        this.error = e;
      } finally {
        this.loading = false;
      }
    },
    async fetchMutations() {
      try {
        const { getMutations } = await import('../api/configuration.js');
        this.mutations = await getMutations();
      } catch (e) {
        console.error('fetchMutations error', e);
      }
    },
    async fetchChallenges() {
      try {
        this.challenges = await getChallenges();
      } catch (e) {
        console.error('fetchChallenges error', e);
      }
    },
    async fetchConfig() {
      try {
        this.config = await getConfiguration();
      } catch (e) {
        console.error('fetchConfig error', e);
      }
    },
    async fetchCards() {
      try {
        this.cards = await getCards();
        //get the highest value from this.cards.page and set it on this.totalPages
        const maxPage = Math.max(...this.cards.map(card => card.page));
        this.totalPages = maxPage;
      } catch (e) {
        console.error('fetchCards error', e);
      }
    },
    async fetchUserCards(userId) {
      try {
        this.userCards = await getUserCards(userId);
      } catch (e) {
        console.error('fetchUserCards error', e);
      }
    },
    async fetchUserData(userId) {
      try {
        this.userData = await getUser(userId);
      } catch (e) {
        console.error('fetchUserData error', e);
      }
    },
  }
});
