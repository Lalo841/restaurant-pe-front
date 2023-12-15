<script setup>
import { onMounted, ref, reactive, watch, inject, provide } from 'vue'
import axios from 'axios'

import CardList from '../componenst/CardList.vue'

const items = ref([])

//Если хранят объекты то используют reactive, иначе просто ref
const filters = reactive({
  sortBy: 'title',
  searchQuery: ''
})

const onChangeSelect = (event) => {
  filters.sortBy = event.target.value
}

const onChangeSearchInput = (event) => {
  filters.searchQuery = event.target.value
}

const fetchItems = async () => {
  try {
    const params = {
      sortBy: filters.sortBy
    }

    if (filters.searchQuery) {
      params.title = `*${filters.searchQuery}*`
    }

    const { data } = await axios.get('https://604781a0efa572c1.mokky.dev/items', {
      params
    })
    items.value = data
  } catch (err) {
    console.log(err)
  }
}

watch(filters, fetchItems)
const { onClickAddPlus } = inject('cart')

onMounted(fetchItems)
</script>

<template>
  <div>
    <div class="flex justify-between items-center">
      <h2 class="text-3xl font-bold mb-8">Все товары</h2>
      <div class="flex gap-4">
        <select @change="onChangeSelect" class="py-2 px-3 border rounded-md outline-none">
          <option value="name">По названию</option>
          <option value="-price">По цене (дорогие)</option>
          <option value="price">По цене (дешевые)</option>
        </select>

        <div class="relative">
          <img class="absolute left-4 top-3" src="/search.svg" />
          <input
            @input="onChangeSearchInput"
            class="border rounded-md py-2 pl-11 pr-4 outline-none focus:border-gray-400"
            type="text"
            placeholder="Поиск..."
          />
        </div>
      </div>
    </div>
    <div class="mt-10">
      <CardList :items="items" @add-to-cart="onClickAddPlus" />
    </div>
  </div>
</template>
