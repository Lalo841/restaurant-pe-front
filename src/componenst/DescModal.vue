<script setup>
import { useCartStore } from '../_helpers/cart.store.js'
import { ref } from 'vue'
const emit = defineEmits(['closeModalWindow'])

const props = defineProps({
  name: String,
  desc: String,
  price: Number,
  imageUrl: String,
  onClickAdd: Function,
  addString: String
})

const cartStore = useCartStore()

const fullUrl = `http://185.128.106.222:9000/images/${props.imageUrl}`
</script>

<template>
  <div>
    <div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-30"></div>
    <div
      class="flex bg-modal-panel rounded-md fixed w-2/3 h-2/3 left-64 top-28 z-20 shadow-sm shadow-red-100"
    >
      <div class="p-6 w-7/12">
        <img class="rounded-lg w-full h-full" :src="fullUrl" alt="ProductPicture" />
      </div>
      <div class="flex flex-col justify-between p-6">
        <div>
          <div class="flex items-center justify-between">
            <span class="text-2xl font-semibold">{{ props.name }}</span>
            <img
              class="cursor-pointer opacity-40 hover:opacity-100"
              src="../../public/close.svg"
              alt="CloseSvg"
              @click="emit('closeModalWindow')"
            />
          </div>
          <div class="mt-5">{{ props.desc }}</div>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-xl"><strong>Цена:</strong> {{ props.price }} ₽ </span>
          <button
            class="bg-red-600 w-36 rounded-2xl py-2 text-white hover:bg-red-800 cursor-pointer"
            @click="onClickAdd"
          >
            {{ addString }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
