import './main.css'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Catalog from './pages/Catalog.vue'
import About from './pages/About.vue'

const app = createApp(App)

const routes = [
  { path: '/', name: 'Catalog', component: Catalog },
  { path: '/about', name: 'About', component: About }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

app.use(router)

app.mount('#app')
