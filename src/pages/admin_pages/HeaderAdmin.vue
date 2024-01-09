<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/_helpers/auth.store';
import axios from 'axios';

const authStore = useAuthStore();
const isOpenModal = ref(false);
const selectedRecord = ref(null);
const records = ref([]);

const openModal = (record) => {
  selectedRecord.value = record ? { ...record, tablesInfo: record.tables?.map(table => table.capacity).join(' ') } : { tablesInfo: '' };
  isOpenModal.value = true;
};

const closeModal = () => {
  selectedRecord.value = null;
  isOpenModal.value = false;
};

const editRecord = async () => {
  try {
    if (selectedRecord.value.id) {
      // Редактирование существующей записи
      const tablesInfoArray = selectedRecord.value.tablesInfo.split(' ');
      let data = JSON.stringify({
  "id": selectedRecord.value.id,
  "name": "Ресторан Мистер 1",
  "address": selectedRecord.value.address,
  "tables": tablesInfoArray,
  "menu": [
    {
      "id": 3
    }
  ]
});

let config = {
  method: 'patch',
  maxBodyLength: Infinity,
  url: `http://185.128.106.222:3000/restaurant/`,
  headers: { 
    'Content-Type': 'application/json', 
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjowfQ.bQoM-YvgvSYMcASgpMpgI5-JtaZSDu3lzGjH2soiK3s'
  },
  data : data
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});

    } else {
      const tablesInfoArray1 = selectedRecord.value.tablesInfo.split(' ');
      // Добавление новой записи   
      let data = JSON.stringify({
  "name": "Ресторан Мистер 1",
  "address": selectedRecord.value.address,
  "menu": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ],
  "tables": tablesInfoArray1
});

let config = {
  method: 'put',
  maxBodyLength: Infinity,
  url: 'http://185.128.106.222:3000/restaurant/',
  headers: { 
    'Content-Type': 'application/json', 
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjowfQ.bQoM-YvgvSYMcASgpMpgI5-JtaZSDu3lzGjH2soiK3s'
  },
  data : data
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});

    }
    closeModal();
  } catch (error) {
    console.error('Ошибка при сохранении записи:', error);
  }
};

const deleteRecord = async () => {
  let config = {
  method: 'delete',
  maxBodyLength: Infinity,
  url: `http://185.128.106.222:3000/restaurant/${selectedRecord.value.id}`,
  headers: { 
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjowfQ.bQoM-YvgvSYMcASgpMpgI5-JtaZSDu3lzGjH2soiK3s'
  }
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});
};

onMounted(async () => {
  try {
    await loadRecords();
  } catch (error) {
    console.error('Ошибка при загрузке ресторанов:', error);
  }
});

const loadRecords = async () => {
  const response = await axios.get('http://185.128.106.222:3000/restaurant/', {
    headers: {
      'Authorization': 'Bearer ' + authStore.accessToken,
    },
  });

  records.value = response.data;
};
</script>

<template>
  <div>
    <!-- Заголовок и кнопка для добавления нового ресторана -->
    <header class="flex px-4 py-1 bg-red-600 gap-16">
      <div class="flex items-center gap-4">
        <img class="w-28" src="@/../public/logo2.png" alt="Logo" />
      </div>

      <ul class="flex items-center gap-10">
        <router-link to="/adminpage/catalog-admin">
          <li class="flex items-center cursor-pointer gap-3 text-lg text-slate-300 hover:text-white">
            <span>Каталог</span>
          </li>
        </router-link>

        <router-link to="/adminpage/personal">
          <li class="flex items-center cursor-pointer gap-3 text-lg text-slate-300 hover:text-white">
            <span>Персонал</span>
          </li>
        </router-link>

        <li class="flex items-center gap-3 text-lg text-slate-300">
          <button @click="openModal({})">Рестораны</button>
        </li>

        <li class="flex items-center cursor-pointer gap-4 text-lg text-slate-300 hover:text-white mr-6">
          <span @click="authStore.logout()">Выход</span>
        </li>
      </ul>
    </header>


    <!-- Модальное окно для изменения или удаления записей -->
    <div v-if="isOpenModal" class="modal-overlay">
      <div class="modal" style="background-color: #c4a189">
        <ul>
        <li v-for="record in records" :key="record.id">
          {{ record.address }} - {{ record.tables?.map(table => table.capacity).join(', ') }}
          <button @click="openModal(record)">Редактировать</button>
        </li>
      </ul>

        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">Адрес</label>
          <input v-model="selectedRecord.address" class="input-box" />
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">Столики (вместимость через пробел)</label>
          <input v-model="selectedRecord.tablesInfo" class="input-box" />
        </div>
        <button @click="editRecord" class="add-button red-button">{{ selectedRecord.id ? 'Изменить' : 'Добавить' }}</button>
        <button @click="deleteRecord" class="add-button red-button" v-if="selectedRecord.id">Удалить</button>
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
