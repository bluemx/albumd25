// Simple router implementation for Vite + Vue 3 without vue-router
import { ref, computed, h, defineComponent } from 'vue';
import Book from './components/Book.vue';
import SwaggerPage from './components/SwaggerPage.vue';


function normalizeRoute(hash) {
  const r = hash.replace('#', '').trim();
  if (r === '' || r === '/') return '/';
  if (r.startsWith('/')) return r;
  return '/' + r;
}

const route = ref(normalizeRoute(window.location.hash));

window.addEventListener('hashchange', () => {
  route.value = normalizeRoute(window.location.hash);
});

const routes = {
  '/': Book,
  '/swagger': SwaggerPage,
};

export default defineComponent({
  name: 'AppRouter',
  setup() {
    const currentComponent = computed(() => routes[route.value] || Book);
    return () => h(currentComponent.value);
  },
});
