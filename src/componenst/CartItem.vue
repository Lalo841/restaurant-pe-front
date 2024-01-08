<script setup>
import { ref } from 'vue'
import { useCartStore } from '@/_helpers/cart.store'

const emit = defineEmits(['onClickRemove'])
const props = defineProps({
  id: Number,
  name: String,
  imageUrl: String,
  price: Number
})

const cartStore = useCartStore()
const cart = cartStore.cart

const countOfProduct = ref(1)

const incCountProduct = () => {
  countOfProduct.value++
  cart.find((item) => item.id === props.id).countOfProduct = countOfProduct
  //console.log(cart.find((item) => item.id === props.id).countOfProduct)
}

const decCountProduct = () => {
  countOfProduct.value <= 0 ? (countOfProduct.value = 0) : countOfProduct.value--
  cart.find((item) => item.id === props.id).countOfProduct = countOfProduct
  //console.log(cart.find((item) => item.id === props.id).countOfProduct)
}

const fullUrl = `http://185.128.106.222:9000/images/${props.imageUrl}`
</script>

<template>
  <div class="flex items-center border-b border-red-700 border-dashed p-4 gap-4">
    <img class="w-16 h-16" :src="fullUrl" alt="ProductImg" />

    <div class="flex flex-col flex-1">
      <p>{{ name }}</p>

      <div class="flex justify-between mt-2">
        <b class="flex-1">{{ price }} руб.</b>
        <div class="flex mr-36">
          <span class="text-lg mr-8 mt-1">{{ countOfProduct }}</span>
          <div class="flex flex-col">
            <img
              class="cursor-pointer rotate-180 w-5 h-5"
              src="../../public/arrow-up.png"
              alt="ArrowUp"
              @click="incCountProduct"
            />
            <img
              class="cursor-pointer w-5 h-5"
              src="../../public/arrow-down.png"
              alt="ArrowUp"
              @click="decCountProduct"
            />
          </div>
        </div>
        <img
          @click="emit('onClickRemove')"
          class="opacity-40 hover:opacity-100 cursor-pointer transition"
          src="/close.svg"
          alt="closeImg"
        />
      </div>
    </div>
  </div>
</template>
