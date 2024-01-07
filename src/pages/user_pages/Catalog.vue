<script setup>
import { onMounted, ref, reactive, watch, inject, provide, computed } from 'vue'
import axios from 'axios'

import { useCartStore } from '@/_helpers/cart.store'

import CardList from '../../componenst/CardList.vue'
import FilterPanel from '@/componenst/FilterPanel.vue'

const cartStore = useCartStore()
const cart = cartStore.cart

//const { addToCart , removeFromCart } = cartStore;
//const cart = ref([])

const items = ref([])
const cuisineNum = ref()

//const totalPrice = computed(() => cartStore.cart.value.reduce((acc, item) => acc + item.price, 0))

//Если хранят объекты то используют reactive, иначе просто ref
const filters = reactive({
  sortBy: 'name',
  searchQuery: '',
  kitchen: ''
})

// const onChangeSelect = (event) => {
//   filters.sortBy = event.target.value
// }

const onChangeSearchInput = (event) => {
  filters.searchQuery = event.target.value
  console.log(filters.searchQuery)
}

//метод пробросил из дочернего компонента FilterPanel через emit, чтобы получать Id кухни
const getCuisineId = (cuisineId) => {
  filters.kitchen = cuisineId
}

const fetchItems = async () => {
  try {
    // const params = {
    //   sortBy: filters.sortBy
    // }
    // if (filters.searchQuery) {
    //   params.title = `*${filters.searchQuery}*`
    // }
    // const { data } = await axios.get('http://185.128.106.222:3000/dish/', {
    //   params
    // })

    const { data } = await axios.get('http://185.128.106.222:3000/dish/')

    /*этот костыль <dataWithCart> сделал по причине того что: добавил товар -> перешел в корзину,всё норм -> 
    -> вернулся в каталог -> товары не добавлены (кнопка неактивна), но в корзине они есть*/

    /*после проверки на принадлежность к корзине, фильтрую , пока только по Поиску*/

    const dataWithCart = data
      .map((item) => {
        let cartItem = cart.find((itemCart) => itemCart.id === item.id)
        return cartItem ? cartItem : item
      })
      .filter((item) => {
        if (filters.kitchen && item.kitchen !== filters.kitchen) {
          return false
        }
        if (
          filters.searchQuery &&
          !item.name.toLowerCase().includes(filters.searchQuery.toLowerCase())
        ) {
          return false
        }
        return true
      })
    items.value = dataWithCart
  } catch (err) {
    console.log(err)
  }
}

//185.128.106.222:3000
//http://82.179.49.231:3000/dish/
//https://604781a0efa572c1.mokky.dev/items

const onClickAddPlus = (item) => {
  if (!item.isAdded) {
    cartStore.addToCart(item)
  } else {
    cartStore.removeFromCart(item)
  }
}

watch(filters, fetchItems)
onMounted(fetchItems)
</script>

<template>
  <div>
    <div class="bg-orange-100 p-10">
      <div class="flex flex-col">
        <h2 class="text-3xl font-bold mb-4">Кухни</h2>
        <FilterPanel
          @input="onChangeSearchInput"
          @cuisine-id="getCuisineId"
          @get-cuisine-all="getCuisineId"
        />
      </div>
      <div class="mt-10">
        <CardList :items="items" @add-to-cart="onClickAddPlus" />
      </div>
    </div>
  </div>
</template>
