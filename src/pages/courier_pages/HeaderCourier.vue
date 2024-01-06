<script setup>
import { useAuthStore } from '@/_helpers/auth.store'
const authStore = useAuthStore()
</script>

<template>
  <div>
    <header class="flex justify-between px-4 py-1 bg-red-600">
      <div class="flex items-center gap-4">
        <img class="w-20" src="@/../public/logo2.png" alt="Logo" />
      </div>

      <ul class="flex items-center gap-10">
        <!-- <router-link to="/courierpage/orders-courier">
          <li
            class="flex items-center cursor-pointer gap-3 text-lg text-slate-300 hover:text-white"
          >
            <span>Заказы</span>
          </li>
        </router-link> -->

        <!-- <li class="flex items-center cursor-pointer gap-3 text-lg text-slate-300 mr-6">
            <img src="/profile.svg" alt="Profile" />
            <span>Профиль</span>
          </li> -->

        <li
          class="flex items-center cursor-pointer gap-4 text-lg text-slate-300 hover:text-white mr-6"
        >
          <span @click="authStore.logout()">Выход</span>
        </li>
      </ul>
    </header>
  </div>
</template>
