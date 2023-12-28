<script setup>
//ЭТО Header для пользователя, пока индус версия
import { ref } from 'vue'

defineProps({
  totalPrice: Number
})
const emit = defineEmits(['openDrawer'])

// //инпут в heade не работает , надо сделать глобальным его состояние
// let headerSearchValue;
// const onChangeSearchInput = (event) =>{
//   headerSearchValue = event.target.value
// }

//переменная выпадющего меню для бронирования
let isOpen = ref(false)

import { useAuthStore } from '@/_helpers/auth.store'
const authStore = useAuthStore()
</script>

<template>
  <header class="flex justify-between px-4 py-1 bg-red-600">
    <div class="flex items-center gap-4">
      <img class="w-28" src="../../public/logo2.png" alt="Logo" />
      <!-- Инпут можно вынести в компонент в дальнейшем -->
      <div class="relative">
        <img class="absolute left-4 top-3" src="/search.svg" />
        <input
          @input="onChangeSearchInput"
          class="border rounded-full py-2 pl-11 pr-4 outline-none focus:border-gray-400"
          type="text"
          placeholder="Поиск..."
        />
      </div>
    </div>

    <ul class="flex items-center gap-10">
      <router-link to="/userpage/catalog">
        <li class="flex items-center cursor-pointer gap-3 text-lg text-slate-300 hover:text-white">
          <span>Каталог</span>
        </li>
      </router-link>

      <li>
        <span @click="authStore.logout()">Выход</span>
      </li>

      <router-link to="/userpage/about">
        <li class="flex items-center cursor-pointer gap-3 text-lg text-slate-300 hover:text-white">
          <span>О нас</span>
        </li>
      </router-link>

      <!-- Меню с ресторанами -->
      <li class="flex items-center gap-3 text-lg text-slate-300">
        <div class="relative flex items-center gap-2">
          <span class="cursor-pointer hover:text-white" @click="isOpen = !isOpen"
            >Адрес ресторана</span
          >

          <svg viewBox="0 0 1030 638" width="10">
            <path
              d="M1017 68L541 626q-11 12-26 12t-26-12L13 68Q-3 49 6 24.5T39 0h952q24 0 33 24.5t-7 43.5z"
              fill="#FFF"
            ></path>
          </svg>
          <!-- Отдельный компонент -->
          <div class="absolute top-8 py-4 border bg-orange-100 rounded-xl shadow-xl" v-if="isOpen">
            <table class="border-separate border-spacing-x-8 border-spacing-y-2">
              <thead class="text-red-700 text-center text-base">
                <tr>
                  <th>Адрес</th>
                  <th>Свободные места</th>
                  <th>Нужно мест</th>
                  <th>Дата и время бронирования</th>
                </tr>
              </thead>
              <tbody class="text-slate-600 text-center text-base">
                <tr>
                  <td>Московское ш. 34Б</td>
                  <td>15</td>
                  <td>3</td>
                  <td>08/02/2002 18:30</td>
                </tr>
                <tr>
                  <td>Первомайская 25</td>
                  <td>15</td>
                  <td>3</td>
                  <td>08/02/2002 18:30</td>
                </tr>
                <tr>
                  <td>Полевая 15</td>
                  <td>15</td>
                  <td>3</td>
                  <td>08/02/2002 18:30</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </li>
      <router-link to="/userpage/sys-info">
        <li
          class="flex items-center cursor-pointer gap-3 text-lg text-slate-300 hover:text-white w-36"
        >
          <span>Информация о системе</span>
        </li>
      </router-link>
      <router-link to="/userpage/dev-info">
        <li
          class="flex items-center cursor-pointer gap-3 text-lg text-slate-300 hover:text-white w-36"
        >
          <span>Информация о разработчиках</span>
        </li>
      </router-link>

      <router-link to="/userpage/cart">
        <li
          class="flex items-center cursor-pointer gap-3 text-lg text-slate-300 hover:text-white"
        >
          <img src="/cart.svg" alt="Cart" />
          Корзина
          <!-- <b>{{ totalPrice }} руб.</b> -->
        </li>
      </router-link>
      
      <router-link to="/userpage/profile">
        <li
          class="flex items-center cursor-pointer gap-3 text-lg text-slate-300 hover:text-white mr-6"
        >
          <img src="/profile.svg" alt="Profile" />
          <span>Профиль</span>
        </li>
      </router-link>
    </ul>
  </header>
</template>
