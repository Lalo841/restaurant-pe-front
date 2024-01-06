<script setup>
import Card from './CardAdmin.vue'

defineProps({
  items: Array
})

const emit = defineEmits(['addToCart'])
</script>

<template>
    <div class="grid grid-cols-4 gap-5">
      <Card
        v-for="item in items"
        :key="item.id"
        :id="item.id"
        :title="item.name"
        :image-url="item.imageUrl"
        :price="item.price"
        :is-added="false"
        :is-favorite="false"
        :on-edit="() => emit('editItem', item.id)"
      />
    </div>
  </template>
