<script setup>
import HeaderRegLog from '@/componenst/HeaderRegLog.vue'
import router from '../_helpers/router.js'
import { ref } from 'vue'
import { useAuthStore } from '@/_helpers/auth.store'

const email = ref('')
const password = ref('')
const fullName = ref('')
const phone = ref('')
const address = ref('')

function registrationFunction() {
  const authStore = useAuthStore();
  authStore.registration(email.value, password.value, fullName.value, phone.value, address.value)
}
</script>

<template>
  <div class="bg-orange-100 min-h-screen">
    <HeaderRegLog />
    <div class="flex flex-col items-center max-w-screen mt-16">
      <p class="font-semibold text-3xl text-center">Регистрация</p>
      <form class="w-2/5 px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <input
            v-model="email"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Почта"
          />
        </div>
        <div class="mb-5">
          <input
            v-model="password"
            class="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Пароль"
          />
        </div>
        <div class="mb-5">
          <input
            v-model="fullName"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="fullname"
            type="text"
            placeholder="ФИО"
          />
        </div>
        <div class="mb-5">
          <input
            v-model="phone"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="phone"
            type="text"
            placeholder="Телефон"
          />
        </div>
        <div class="mb-6">
          <input
            v-model="address"
            class="shadow appearance-none border rounded w-full py-2 px-3 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="address"
            type="text"
            placeholder="Адрес"
          />
        </div>
        <div class="flex flex-col items-center justify-around">
          <button
            @click="registrationFunction"
            class="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
            type="button"
          >
            Зарегистрироваться
          </button>
          <span class="mt-2 hover:text-red-500 cursor-pointer" @click="router.push('/')"
            >Войти</span
          >
        </div>
      </form>
    </div>
  </div>
</template>
