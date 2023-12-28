<script setup>
import Card from './Card.vue'

defineProps({
  items: Array
})

const emit = defineEmits(['addToCart'])

// const b = {
//   id: 1,
//   name: 'Кофе',
//   weight: 200,
//   category: 0,
//   desc: 'Ароматный напиток для бодрящего утра',
//   calories: 5,
//   price: 80,
//   image: '7892195c-8ea9-448a-8d53-875be1498d0a-coffe.png'
// }
</script>

<template>
  <div class="grid grid-cols-4 gap-5">
    <Card
      v-for="item in items"
      :key="item.id"
      :id="item.id"
      :name="item.name"
      :image-url="item.image"
      :price="item.price"
      :is-added="false"
      :onClickAdd="() => emit('addToCart', item)"
      :isAdded="item.isAdded"
    />
  </div>
</template>
