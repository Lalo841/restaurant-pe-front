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
        :imageUrl="item.image"
        :price="item.price"
        :weight="item.weight"
        :category="item.category"
        :desc="item.desc"
        :calories="item.calories"
        :kitchen="item.kitchen"
        :is-added="false"
        :is-favorite="false"
        :on-edit="() => emit('editItem', item.id)"
      />
    </div>
  </template>
