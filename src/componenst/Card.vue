<script setup>
const props = defineProps({
  id: Number,
  name: String,
  imageUrl: String,
  price: Number,
  isAdded: Boolean,
  onClickAdd: Function,
})


const fullUrl = `http://82.179.49.231:9000/images/${props.imageUrl}`
</script>

<template>
  <div
    class="bg-orange-100 border border-orange-200 rounded-3xl p-8 cursor-pointer transition hover:-translate-y-2 hover:shadow-xl"
  >

    <img class="rounded-xl" :src='fullUrl' alt="ProductPicture" /> 
    <p class="mt-2">{{ name }}</p>

    <div class="flex justify-between mt-5">
      <div class="flex flex-col">
        <span class="text-slate-400 uppercase">Цена:</span>
        <b>{{ price }} руб.</b>
      </div>

      <img @click="onClickAdd" :src="!isAdded ? '/plus.svg' : '/checked.svg'" alt="Plus" />
    </div>
  </div>
</template>
