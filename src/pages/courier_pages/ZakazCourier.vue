<template>
    <div>
      <!-- Заголовок "Новые заказы" -->
      <h2 class="title">Новые заказы</h2>
      <div>
        <!-- Заголовки под Новые заказы -->
        <div class="header1">
          <span style="margin-right: 350px;">ФИО заказчика</span>
          <span>Номер заказа</span>
          <span>Адрес доставки</span>
          <span>Время поступления</span>
        </div>
  
        <!-- Записи с новыми заказами -->
        <div v-for="(order, index) in newOrders" :key="index" class="record">
          <span>{{ order.customerName }}</span>
          <span>{{ order.orderNumber }}</span>
          <span>{{ order.deliveryAddress }}</span>
          <span>{{ order.orderTime }}</span>
          <!-- Добавляем кнопку "Принять заказ" -->
          <button @click="acceptOrder(index)" class="manage-btn">Принять заказ</button>
        </div>
      </div>
  
       <!-- Заголовок "Текущие заказы" -->
    <h2 class="title">Текущие заказы</h2>
    <div>
      <!-- Заголовки под Текущие заказы -->
      <div class="header2">
        <span>ФИО заказчика</span>
        <span>Номер заказа</span>
        <span>Адрес доставки</span>
        <span>Статус</span>
      </div>

      <!-- Записи с текущими заказами -->
<div v-for="(order, index) in currentOrders" :key="index" class="record">
  <span>{{ order.customerName }}</span>
  <span>{{ order.orderNumber }}</span>
  <span>{{ order.deliveryAddress }}</span>
  <span>
    {{ order.status }}
  </span>
  <!-- Изменяем кнопку на "Доставлен" -->
  <button @click="completeOrder(index)" class="manage-btn">Доставлен</button>
</div>
</div>
  
      <!-- Заголовок "История заказов" -->
      <h2 class="title">История заказов</h2>
      <div>
        <!-- Заголовки под Историю заказов -->
        <div class="header3">
          <span>ФИО заказчика</span>
          <span>Номер заказа</span>
          <span>Адрес доставки</span>
          <span>Курьер</span>
          <span>Время поступления</span>
          <span>Время доставки</span>
        </div>
  
        <!-- Записи с историей заказов -->
        <div v-for="(order, index) in orderHistory" :key="index" class="record">
          <span>{{ order.customerName }}</span>
          <span>{{ order.orderNumber }}</span>
          <span>{{ order.deliveryAddress }}</span>
          <span>{{ order.courier }}</span>
          <span>{{ order.orderTime }}</span>
          <span>{{ order.executionTime }}</span>
          <button @click="openOrderCompositionModal(index)" class="manage-btn">Состав заказа</button>
        </div>
      </div>
  
      <!-- Модальное окно для состава заказа -->
      <div v-if="isOrderCompositionModalOpen" class="modal">
        <div class="modal-content">
          <h2>Состав заказа №{{ selectedOrderIndex + 1 }}</h2>
          <ul>
            <li v-for="(item, itemIndex) in orderHistory[selectedOrderIndex].composition" :key="itemIndex">{{ item }}</li>
          </ul>
  
          
        </div>
      </div>
      <!-- Модальное окно для выбора статуса -->
      <div v-if="isStatusModalOpen" class="modal">
        <div class="modal-content">
          <h2>Выберите статус для заказа №{{ selectedOrderIndex + 1 }}</h2>
  
          <!-- Выпадающий список с статусами -->
          <label for="status">Выберите статус:</label>
          <select v-model="selectedStatus" id="status" style="color: black;">
            <option>Принят</option>
            <option>Доставляется</option>
            <option>Доставлен</option>
          </select>
  
          <!-- Кнопки для применения и отмены -->
          <button @click="updateOrderStatus" class="modal-btn">Применить</button>
          <button @click="closeStatusModal" class="modal-btn">Отмена</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        newOrders: [
          { customerName: 'Иванов Иван Иванович', orderNumber: '12345', deliveryAddress: 'ул. Пушкина, д.10', orderTime: '12:00', composition: ['Блюдо 1', 'Блюдо 2'] },
          // Добавьте другие записи по необходимости
        ],
        currentOrders: [],
        orderHistory: [],
        selectedOrderIndex: 0,
        isOrderCompositionModalOpen: false,
        isStatusModalOpen: false,
        selectedCourier: '',
        selectedStatus: '',
        couriers: ['Курьер 1', 'Курьер 2', 'Курьер 3'], // Замените на реальных курьеров
      };
    },
    methods: {
      openOrderCompositionModal(index) {
        this.selectedOrderIndex = index;
        this.isOrderCompositionModalOpen = true;
      },
      assignOrder() {
        // Добавляем выбранного курьера к текущему заказу
        const selectedOrder = this.newOrders[this.selectedOrderIndex];
        selectedOrder.courier = this.selectedCourier;
  
        // Перемещаем заказ из новых заказов в текущие заказы
        this.currentOrders.push(selectedOrder);
  
        // Удаляем заказ из новых заказов
        this.newOrders.splice(this.selectedOrderIndex, 1);
  
        // Закрываем модальное окно
        this.closeOrderCompositionModal();
      },
      closeOrderCompositionModal() {
        this.isOrderCompositionModalOpen = false;
        // Сбрасываем выбранного курьера при закрытии модального окна
        this.selectedCourier = '';
      },
      // Открывает модальное окно для изменения статуса
      openStatusModal(index) {
        this.selectedOrderIndex = index;
        this.isStatusModalOpen = true;
      },
      closeStatusModal() {
        this.isStatusModalOpen = false;
        this.selectedStatus = '';
      },

      // Применяет изменения статуса заказа
      updateOrderStatus() {
        const selectedOrder = this.currentOrders[this.selectedOrderIndex];
        selectedOrder.status = this.selectedStatus;
  
        if (this.selectedStatus === 'Доставлен') {
          const originalOrderTime = selectedOrder.orderTime;
          // Перемещаем заказ из текущих заказов в историю заказов
          selectedOrder.executionTime = new Date().toLocaleTimeString();
          selectedOrder.orderTime = originalOrderTime;
          this.orderHistory.push(selectedOrder);
          this.currentOrders.splice(this.selectedOrderIndex, 1);
        }
  
        this.closeStatusModal();
      },
      // Принять заказ
      acceptOrder(index) {
        const selectedOrder = this.newOrders[index];
        // Задаем статус "Принят" и добавляем в текущие заказы
        selectedOrder.status = 'Принят';
        this.currentOrders.push(selectedOrder);
        // Удаляем из новых заказов
        this.newOrders.splice(index, 1);
      },
      // Отказаться от заказа
      cancelOrder(index) {
        // Удаляем из текущих заказов
        this.currentOrders.splice(index, 1);
      },
      // Закончить заказ
// Добавляем метод для кнопки "Доставлен" в текущих заказах
completeOrder(index) {
  const selectedOrder = this.currentOrders[index];
  // Задаем статус "Доставлен" и добавляем в историю заказов
  selectedOrder.status = 'Доставлен';
  selectedOrder.executionTime = new Date().toLocaleTimeString();
  this.orderHistory.push(selectedOrder);
  // Удаляем из текущих заказов
  this.currentOrders.splice(index, 1);
},
    },
  };
  </script>
  
  <style scoped>
  /* Ваши стили здесь */
  
  .title {
    font-size: 1.5em;
    color: #c2191d;
    margin-bottom: 10px; /* Уменьшил расстояние между заголовками и записями */
  }
  
  .header1,
  .header2,
  .header3 {
    display: flex;
    margin-right: 100px;
    font-weight: bold;
    color: #c2191d;
    padding: 5px;
    border-radius: 50px; /* Закругление заголовка */
    margin-bottom: 10px; /* Уменьшил расстояние между заголовками и записями */
  }
  
  .header1 span {
    margin-right: 300px;
  }
  
  .header2 span {
    margin-right: 100px;
  }
  
  .header3 span {
    margin-right: 100px;
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
  
  .manage-btn {
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
  
  /* Стили для выпадающего списка */
  select {
    color: black; /* Черный текст внутри списка */
  }
  </style>
  