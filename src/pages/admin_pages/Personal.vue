<template>
    <div>
      <!-- Заголовок "Менеджеры" -->
      <h2 class="title">Менеджеры</h2>
      <div>
        <!-- Заголовки под Менеджеры -->
        <div class="header">
          <span>ФИО</span>
          <span class="restaurant">Ресторан</span>
        </div>
  
        <!-- Записи с менеджерами -->
        <div v-for="(manager, index) in managers" :key="index" class="record">
          <span>{{ manager.name }}</span>
          <span class="restaurant1">{{ manager.restaurant }}</span>
          <button @click="deleteManager(index)" class="delete-btn">Удалить</button>
        </div>
  
        <!-- Кнопка "Добавить менеджера" -->
        <button @click="openManagerModal" class="add-btn">Добавить менеджера</button>
      </div>
  
      <!-- Заголовок "Курьеры" -->
      <h2 class="title">Курьеры</h2>
      <div>
        <!-- Заголовки под Курьеры -->
        <div class="header">
          <span>ФИО</span>
          <!-- Добавьте другие заголовки для курьеров по необходимости -->
        </div>
  
        <!-- Записи с курьерами -->
        <div v-for="(courier, index) in couriers" :key="index" class="record">
          <span>{{ courier.name }}</span>
          <!-- Добавьте другие поля для курьеров по необходимости -->
          <button @click="deleteCourier(index)" class="delete-btn">Удалить</button>
        </div>
  
        <!-- Кнопка "Добавить курьера" -->
        <button @click="openCourierModal" class="add-btn">Добавить курьера</button>
      </div>
  
      <!-- Модальное окно для менеджера -->
      <div v-if="isManagerModalOpen" class="modal">
        <div class="modal-content">
          <h2>Добавить менеджера</h2>
          <input v-model="newManager.name" placeholder="ФИО" class="input-field"/>
          <input v-model="newManager.restaurant" placeholder="Ресторан" class="input-field" />
          <div class="modal-buttons">
            <button @click="addManager" class="modal-btn">Добавить</button>
            <button @click="closeManagerModal" class="modal-btn">Отмена</button>
          </div>
        </div>
      </div>
  
      <!-- Модальное окно для курьера -->
      <div v-if="isCourierModalOpen" class="modal">
        <div class="modal-content">
          <h2>Добавить курьера</h2>
          <input v-model="newCourier.name" placeholder="ФИО" class="input-field" />
          <!-- Добавьте другие поля по необходимости -->
          <div class="modal-buttons">
            <button @click="addCourier" class="modal-btn">Добавить</button>
            <button @click="closeCourierModal" class="modal-btn">Отмена</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        managers: [
          { name: 'Менеджер1', restaurant: 'Ресторан1' },
          { name: 'Менеджер2', restaurant: 'Ресторан2' },
          // Добавьте другие записи по необходимости
        ],
        couriers: [
          { name: 'Курьер1' },
          // Добавьте другие записи по необходимости
        ],
        newManager: {
          name: '',
          restaurant: '',
        },
        newCourier: {
          name: '',
          // Добавьте другие поля по необходимости
        },
        isManagerModalOpen: false,
        isCourierModalOpen: false,
      };
    },
    methods: {
      deleteManager(index) {
        this.managers.splice(index, 1);
      },
      deleteCourier(index) {
        this.couriers.splice(index, 1);
      },
      addManager() {
        this.managers.push({ name: this.newManager.name, restaurant: this.newManager.restaurant });
        this.closeManagerModal();
      },
      addCourier() {
        this.couriers.push({ name: this.newCourier.name });
        this.closeCourierModal();
      },
      openManagerModal() {
        this.isManagerModalOpen = true;
      },
      closeManagerModal() {
        this.isManagerModalOpen = false;
      },
      openCourierModal() {
        this.isCourierModalOpen = true;
      },
      closeCourierModal() {
        this.isCourierModalOpen = false;
      },
    },
  };
  </script>
  
  <style scoped>
  /* Ваши стили здесь */
  
  .title {
    font-size: 1.5em;
    color: #c2191d;
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    color: #c2191d;
    padding: 5px;
    border-radius: 50px; /* Закругление заголовка */
  }
  
  .record {
    display: flex;
    justify-content: space-between;
    background-color: #c4a189;
    color: white; /* Текст записей белый */
    padding: 5px;
    margin: 5px 0;
    border-radius: 50px; /* Закругление записей */
  }
  
  .restaurant {
    flex-grow: 1;
    margin-left: 65px; /* Отступ для ресторана */
  }
  
  .restaurant1 {
    flex-grow: 1;
    margin-left: 15px; /* Отступ для ресторана */
  }
  
  .add-btn {
    background-color: #c2191d;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 50px; /* Закругление кнопки */
  }
  
  .delete-btn {
    background-color: #c2191d;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 50px; /* Закругление кнопки */
  }
  
  /* Стили модальных окон */
  .modal {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    color: white;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
  
  .modal-content {
    background-color: #c4a189;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  }
  
  .modal-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }
  
  .modal-btn {
    background-color: #c2191d;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 50px; /* Закругление кнопки */
  }
  /* Стили для полей ввода */
.input-field {
  color: black;
  border: 1px solid black;
  padding: 5px;
  margin-bottom: 10px;
  border-radius: 5px;
}
  </style>