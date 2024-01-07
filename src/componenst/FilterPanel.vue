<script setup>
import { onMounted, ref, watch, defineEmits } from 'vue'
import axios from 'axios'

import SelectFilters from './SelectFilters.vue'

const emit = defineEmits(['cuisine-id', 'get-cuisine-all'])

const cuisines = ref([])

const getCuisines = async () => {
  try {
    const { data } = await axios.get('http://185.128.106.222:3000/kitchen/')
    cuisines.value = data
  } catch (err) {
    console.log(err)
  }
}

onMounted(getCuisines)

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

const selectedCuisine = (cuisineName) => {
  const cuisineId = cuisines.value.find((cuisine) => {
    if (cuisine.name === cuisineName) {
      return cuisine.id
    } else {
      return null
    }
  })
  emit('cuisine-id', cuisineId.id)
}
</script>

<template>
  <div class="flex items-center justify-between px-6 py-3 bg-filter-panel rounded-full text-lg">
    <div class="flex items-center gap-12">
      <button>
        <span class="text-white" @click="emit('get-cuisine-all', 0)">Все</span>
      </button>
      <SelectFilters
        v-for="cuisine in cuisines"
        :key="cuisine.id"
        :name="cuisine.name"
        :options="options"
        @select="optionSelect"
        @get-cuisine="selectedCuisine"
      />
    </div>

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
