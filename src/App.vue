<script setup>
import { ref, reactive, watch, provide, computed } from 'vue'
import axios from 'axios'

import Header from './componenst/Header.vue'
import Drawer from './componenst/Drawer.vue'
import Catalog from './pages/Catalog.vue'

const cart = ref([])
const drawerIsOpen = ref(false)

const totalPrice = computed(
  () => cart.value.reduce((acc, item) => acc + item.price , 0)
)

const closeDrawer = () => {
  drawerIsOpen.value = false
}

const oprenDrawer = () => {
  drawerIsOpen.value = true
}

const addToCart = (item) => {
  cart.value.push(item)
  item.isAdded = true
}

const removeFromCart = (item) => {
  cart.value.splice(cart.value.indexOf(item), 1)
  item.isAdded = false
}

const onClickAddPlus = (item) => {
  if (!item.isAdded) {
    addToCart(item)
  } else {
    removeFromCart(item)
  }
}

provide('cart', {
  cart,
  closeDrawer,
  oprenDrawer,
  addToCart,
  removeFromCart,
  onClickAddPlus
})
</script>

<template>
  <Drawer :total-price="totalPrice" v-if="drawerIsOpen" />
  <!-- min-h-screen Чтобы на всех страницах был залит фон -->
  <div class="bg-orange-100 min-h-screen">
    <Header :total-price="totalPrice" @open-drawer="oprenDrawer" />
    <div class="p-10">
      <router-view></router-view>
    </div>
  </div>
</template>
