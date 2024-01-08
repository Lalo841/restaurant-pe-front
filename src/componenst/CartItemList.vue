<script setup>
import { useCartStore } from '@/_helpers/cart.store';
import CartItem from './CartItem.vue'

//const { cart, removeFromCart } = inject('cart')

const cartStore = useCartStore()
const cartProp = cartStore.cart
</script>

<template>
  <div class="flex flex-col gap-4">
    <CartItem
      v-for="item in cartProp"
      :key="item.id"
      :id ="item.id"
      :name="item.name"
      :price="item.price"
      :image-url="item.image"
      @on-click-remove="() => cartStore.removeFromCart(item)"
     
    />
  </div>
</template>
