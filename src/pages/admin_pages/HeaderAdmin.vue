<script setup>
import { ref } from 'vue'

import { useAuthStore } from '@/_helpers/auth.store'
const authStore = useAuthStore()

let isOpenModal = ref(false)
let selectedRecord = ref(null)
let records = ref([
  {
    id: 1,
    address: 'Московское ш. 34Б',
    freeSeats: 15,
    requiredSeats: 3,
    dateTime: '08/02/2002 18:30'
  },
  {
    id: 2,
    address: 'Первомайская 25',
    freeSeats: 15,
    requiredSeats: 3,
    dateTime: '08/02/2002 18:30'
  },
  { id: 3, address: 'Полевая 15', freeSeats: 15, requiredSeats: 3, dateTime: '08/02/2002 18:30' }
])

const openModal = (record) => {
  selectedRecord.value = record ? { ...record } : null
  isOpenModal.value = true
}

const closeModal = () => {
  selectedRecord.value = null
  isOpenModal.value = false
}

const editRecord = () => {
  // Реализуйте логику для редактирования или добавления записи
  if (selectedRecord.value) {
    // Редактирование существующей записи
    const index = records.value.findIndex((record) => record.id === selectedRecord.value.id)
    if (index !== -1) {
      records.value.splice(index, 1, { ...selectedRecord.value })
    }
  } else {
    // Добавление новой записи
    const newRecord = { id: Date.now(), ...selectedRecord.value }
    records.value.push(newRecord)
  }
  closeModal()
}

const deleteRecord = () => {
  // Реализуйте логику для удаления записи
  if (selectedRecord.value) {
    records.value = records.value.filter((record) => record.id !== selectedRecord.value.id)
  }
  closeModal()
}
</script>

<template>
  <div>
    <header class="flex px-4 py-1 bg-red-600 gap-16">
      <div class="flex items-center gap-4">
        <img class="w-28" src="@/../public/logo2.png" alt="Logo" />
      </div>

      <ul class="flex items-center gap-10">
        <router-link to="/adminpage/catalog-admin">
          <li
            class="flex items-center cursor-pointer gap-3 text-lg text-slate-300 hover:text-white"
          >
            <span>Каталог</span>
          </li>
        </router-link>

        <router-link to="/adminpage/personal">
          <li
            class="flex items-center cursor-pointer gap-3 text-lg text-slate-300 hover:text-white"
          >
            <span>Персонал</span>
          </li>
        </router-link>

        <li class="flex items-center gap-3 text-lg text-slate-300">
          <button @click="openModal">Адрес ресторана</button>
        </li>

        <li
          class="flex items-center cursor-pointer gap-4 text-lg text-slate-300 hover:text-white mr-6"
        >
          <span @click="authStore.logout()">Выход</span>
        </li>
      </ul>
    </header>

    <!-- Модальное окно для изменения или удаления записей -->
    <div v-if="isOpenModal" class="modal-overlay">
      <div class="modal" style="background-color: #c4a189">
        <h2>{{ selectedRecord ? 'Edit Record' : 'Add New Record' }}</h2>
        <div v-for="record in records" :key="record.id" class="horizontal-record">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Адрес</label>
            <input v-model="record.address" class="input-box" />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Места</label>
            <input v-model="record.freeSeats" type="number" class="input-box" />
          </div>
          <button @click="editRecord" class="add-button red-button">Изменить</button>
          <button @click="deleteRecord" class="add-button red-button">Удалить</button>
        </div>
        <!-- Пустая графа для добавления нового ресторана -->
        <div class="horizontal-record">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Адрес</label>
            <input v-model="selectedRecord.address" class="input-box" />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Места</label>
            <input v-model="selectedRecord.freeSeats" type="number" class="input-box" />
          </div>
          <button @click="editRecord" class="add-button red-button">Добавить</button>
        </div>
        <button @click="closeModal" class="add-button red-button">Закрыть</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.input-box {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
}

.horizontal-record {
  display: flex;
  flex-direction: row;
  margin-bottom: 20px; /* Отступ между записями */
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  background-color: #fff;
  padding: 1rem;
  border-radius: 0.25rem;
}

.red-button {
  background-color: #c2191d;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 50px;
}

/* Стили вашего компонента */
/* ... */
</style>
