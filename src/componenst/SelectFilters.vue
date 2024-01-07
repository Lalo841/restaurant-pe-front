<script setup>
import { ref } from 'vue'

defineProps({
  options: Array,
  name: String
})

let optionIsOpen = ref(false)


</script>

<template>
  <div class="relative">
    <div class="flex items-center gap-2">
      <!-- <p class="cursor-pointer text-white" @click="optionIsOpen = !optionIsOpen">{{ name }}</p> -->
      <p class="cursor-pointer text-white" @click="$emit('get-cuisine',name)">{{ name }}</p>
      <svg
        class="mt-1 cursor-pointer"
        @click="optionIsOpen = !optionIsOpen"
        viewBox="0 0 1030 638"
        width="10"
      >
        <path
          d="M1017 68L541 626q-11 12-26 12t-26-12L13 68Q-3 49 6 24.5T39 0h952q24 0 33 24.5t-7 43.5z"
          fill="#FFF"
        ></path>
      </svg>
    </div>
    <div
      class="absolute top-8 w-36 px-2 py-2 border rounded-md border-amber-700 bg-filter-panel text-white"
      v-if="optionIsOpen"
    >
      <p v-for="option in options" :key="option.value" @click="$emit('select', option)">
        {{ option.name }}
      </p>
    </div>
  </div>
</template>
