<script setup>
const emit = defineEmits(['onClickRemove'])
const props = defineProps({
  id: Number,
  name: String,
  imageUrl: String,
  price: Number
})

const fullUrl = `http://185.128.106.222:9000/images/${props.imageUrl}`
</script>

<template>
  <div class="flex items-center border-b border-red-700 border-dashed p-4 gap-4">
    <img class="w-16 h-16" :src="fullUrl" alt="ProductImg" />

    <div class="flex flex-col flex-1">
      <p>{{ name }}</p>

      <div class="flex justify-between mt-2">
        <b class="flex-1">{{ price }} руб.</b>
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
