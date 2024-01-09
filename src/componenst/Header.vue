<script setup>
//ЭТО Header для пользователя, пока индус версия
import { ref } from 'vue'
import ReservationsModal from './ReservationsModal.vue'

defineProps({
  totalPrice: Number
})
const emit = defineEmits(['openDrawer'])

//переменная  для модального окна бронирования
let isOpen = ref(false)

import { useAuthStore } from '@/_helpers/auth.store'
const authStore = useAuthStore()
</script>

<template>
  <header class="flex justify-between px-4 py-1 bg-red-600">
    <div class="flex items-center">
      <img class="w-28" src="../../public/logo2.png" alt="Logo" />
    </div>

    <ul class="flex items-center gap-14">
      <router-link to="/userpage/catalog">
        <li class="flex items-center cursor-pointer gap-4 text-lg text-slate-300 hover:text-white">
          <span>Каталог</span>
        </li>
      </router-link>

      <router-link to="/userpage/about">
        <li class="flex items-center cursor-pointer gap-4 text-lg text-slate-300 hover:text-white">
          <span>О нас</span>
        </li>
      </router-link>

      <!-- Меню с ресторанами -->
      <li class="flex items-center gap-4 text-lg text-slate-300">
        <div class="relative flex items-center gap-2">
          <span class="cursor-pointer hover:text-white" @click="isOpen = !isOpen"
            >Бронирование</span
          >
          <ReservationsModal v-if="isOpen" @closeModal="(isOpen = !isOpen)" />
        </div>
      </li>
      <router-link to="/userpage/sys-info">
        <li
          class="flex items-center cursor-pointer gap-4 text-lg text-slate-300 hover:text-white w-36"
        >
          <span>Информация о системе</span>
        </li>
      </router-link>
      <router-link to="/userpage/dev-info">
        <li
          class="flex items-center cursor-pointer gap-4 text-lg text-slate-300 hover:text-white w-36"
        >
          <span>Информация о разработчиках</span>
        </li>
      </router-link>

      <router-link to="/userpage/cart">
        <li class="flex items-center cursor-pointer gap-4 text-lg text-slate-300 hover:text-white">
          <img src="/cart.svg" alt="Cart" />
          Корзина
          <!-- <b>{{ totalPrice }} руб.</b> -->
        </li>
      </router-link>

      <router-link to="/userpage/profile">
        <li
          class="flex items-center cursor-pointer gap-4 text-lg text-slate-300 hover:text-white mr-6"
        >
          <img src="/profile.svg" alt="Profile" />
          <span>Профиль</span>
        </li>
      </router-link>

      <li
        class="flex items-center cursor-pointer gap-4 text-lg text-slate-300 hover:text-white mr-6"
      >
        <span @click="authStore.logout()">Выход</span>
      </li>
    </ul>
  </header>
</template>
