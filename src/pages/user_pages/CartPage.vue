<script setup>
import { useCartStore } from '@/_helpers/cart.store'
import axios from 'axios'

import CartItemList from '../../componenst/CartItemList.vue'

const cartStore = useCartStore()
const cart = cartStore.cart

const placeOrder = () => {
  let dishesId = []
  cart.forEach((item) => {
    dishesId.push({ id: item.id })
    console.log(item.name, item.id)
    console.log(dishesId)
  })

  let dishesCountCart = []
  dishesId.forEach((item) => {
    dishesCountCart.push(item.countOfProduct)
    console.log(item.name, item.countOfProduct)
  })

  let personsCount = 2
  let addressUser = 'ул. Революционная, 46'
  let data = JSON.stringify({
    dishes: dishesId,
    dishesCount: dishesCountCart,
    personsCount: personsCount,
    address: 'ул. Революционная, 46'
  })

  let config = {
    method: 'put',
    maxBodyLength: Infinity,
    url: 'http://185.128.106.222:3000/delivery/',
    headers: {
      'Content-Type': 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjozLCJpZCI6MX0.W-uQLtte16T4Wgtl2ex7siI4KjsnLLdO0Vz02YLiOXA'
    },
    data: data
  }

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data))
    })
    .catch((error) => {
      console.log(error)
    })
}
</script>

<template>
  <div class="bg-orange-100 p-10 min-h-screen">
    <div class="flex items-center justify-center text-3xl" v-if="cart.length === 0">
      Корзина пуста
    </div>
    <CartItemList />

    <div class="flex flex-col gap-4 my-6" v-if="cart.length !== 0">
      <div class="flex gap-4">
        <span>Итого:</span>
        <div class="flex-1 border-b border-red-600 border-dashed"></div>
        <b>{{ cartStore.totalPrice }}руб.</b>
      </div>
      <div class="flex justify-end">
        <button
          class="bg-red-600 w-36 rounded-xl py-3 text-white hover:bg-lime-600 cursor-pointer"
          @click="placeOrder"
        >
          Оформить заказ
        </button>
      </div>
    </div>
  </div>
</template>
