import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import PokemonView from '../views/Pokemon.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/pokemon/:poke',
    name: 'pokemon',
    component: PokemonView
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
