<script setup>
import DrawerHead from './DrawerHead.vue'
import CartItemList from './CartItemList.vue'
</script>

<template>
  <div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-30"></div>
  <div class="bg-white w-96 h-full fixed right-0 top-0 z-20 p-8">
    <DrawerHead />

    <CartItemList />

    <div class="flex flex-col gap-4 my-6">

      <div class="flex gap-4">
        <span>Итого:</span>
        <div class="flex-1 border-b border-dashed"></div>
        <b>12999 руб.</b>
      </div>

      <button
        disabled=""
        class="bg-lime-500 w-full rounded-xl py-3 text-white hover:bg-lime-600 cursor-pointer"
      >
        Оформить заказ
      </button>
    </div>

  </div>
</template>
