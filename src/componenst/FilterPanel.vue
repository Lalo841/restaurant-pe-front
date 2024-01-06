<script setup>
import { ref } from 'vue'

import SelectFilters from './SelectFilters.vue'


const cuisines = [
  {
    title: 'Русская'
  },
  {
    title: 'Французская'
  },
  {
    title: 'Итальянская'
  },
  {
    title: 'Японская'
  },
  {
    title: 'Китайская'
  },
  {
    title: 'Болгарская'
  }
]

const options = [
  { name: 'Напитки', value: 1 },
  { name: 'Первые блюда', value: 2 },
  { name: 'Вторые блюда', value: 3 }
]

let selected = ref('') 

//здесь я могу делать сортировки, или вероятно нужно будет прокинуть ещё выше этот метод
function optionSelect(option) {
  selected.value = option.name
}
</script>

<template>
  <div class="flex items-center gap-12 px-6 py-3 bg-filter-panel rounded-full text-lg">
    <button>
      <span class="text-white">Все</span>
    </button>
    <SelectFilters
      v-for="cuisine in cuisines"
      :key="cuisine.title"
      :title="cuisine.title"
      :options="options"
      @select="optionSelect"
    />

    
    <div class="relative">
      <img class="absolute left-4 top-3" src="/search.svg" />
      <input
        @input="$emit('input', $event)"
        class="border rounded-full py-2 pl-11 pr-4 outline-none focus:border-gray-400"
        type="text"
        placeholder="Поиск..."
      />
    </div>

  </div>
</template>
