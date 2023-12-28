<script setup>
import { onMounted, ref, reactive, watch, inject, provide, computed } from 'vue'
import axios from 'axios'
import { storeToRefs } from 'pinia'

import { useCartStore } from '@/_helpers/cart.store'

import CardList from '../componenst/CardList.vue'

const cartStore = useCartStore()

//const { addToCart , removeFromCart } = cartStore;

//const cart = ref([])
const items = ref([])

const totalPrice = computed(() => cartStore.cart.value.reduce((acc, item) => acc + item.price, 0))

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

// const fetchItems = async () => {
//   try {
//     const params = {
//       sortBy: filters.sortBy
//     }

//     if (filters.searchQuery) {
//       params.title = `*${filters.searchQuery}*`
//     }

//     const { data } = await axios.get('https://604781a0efa572c1.mokky.dev/items', {
//       params
//     })
//     items.value = data
//   } catch (err) {
//     console.log(err)
//   }
// }
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

const fetchItems2 = () => {
  var myHeaders = new Headers()
  myHeaders.append(
    'Authorization',
    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjowfQ.bQoM-YvgvSYMcASgpMpgI5-JtaZSDu3lzGjH2soiK3s'
  )

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  }

  fetch('82.179.49.231:3000/dish/', requestOptions)
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch((error) => console.log('error', error))
}

const onClickAddPlus = (item) => {
  if (!item.isAdded) {
    cartStore.addToCart(item)
    fetchItems2()
  } else {
    cartStore.removeFromCart(item)
    fetchItems2()
  }
}

watch(filters, fetchItems)

provide('cart', {
  totalPrice
})

onMounted(fetchItems)
</script>

<template>
  <div>
    <div class="bg-orange-100 p-10">
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
  </div>
</template>
