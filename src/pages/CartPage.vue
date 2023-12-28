<script setup>
import { useCartStore } from '@/_helpers/cart.store'

import CartItemList from '../componenst/CartItemList.vue'

const cartStore = useCartStore()
</script>

<template>
  <div class="bg-orange-100 p-10">
    <CartItemList />

    <div class="flex flex-col gap-4 my-6">
      <div class="flex gap-4">
        <span>Итого:</span>
        <div class="flex-1 border-b border-red-600 border-dashed"></div>
        <b>{{ cartStore.totalPrice }}руб.</b>
      </div>

      <button
        disabled=""
        class="bg-red-600 w-full rounded-xl py-3 text-white hover:bg-lime-600 cursor-pointer"
      >
        Оформить заказ
      </button>
    </div>
  </div>
</template>
