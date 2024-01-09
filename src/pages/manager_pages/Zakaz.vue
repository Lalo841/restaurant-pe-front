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
        <button @click="openOrderCompositionModal(index)" class="manage-btn">Управление</button>
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
        <span>{{ order.status }}</span>
        <!-- Добавляем кнопку для изменения статуса -->
        <button @click="openStatusModal(index)" class="manage-btn">Изменить статус</button>
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
        <span>Время исполнения</span>
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
          <li v-for="(item, itemIndex) in newOrders[selectedOrderIndex].composition" :key="itemIndex">{{ item }}</li>
        </ul>
        <!-- Выпадающий список с курьерами -->
        <label for="courier">Выберите курьера:</label>
        <select v-model="selectedCourier" id="courier">
          <option v-for="(courier, index) in couriers" :key="index" :value="courier.id" style="color: black;">{{ courier.fullName }}</option>
        </select>

        <button @click="assignOrder" class="modal-btn">Назначить</button>
        <button @click="closeOrderCompositionModal" class="modal-btn">Отмена</button>
      </div>
    </div>

    <!-- Модальное окно для выбора статуса -->
    <div v-if="isStatusModalOpen" class="modal">
      <div class="modal-content">
        <h2>Выберите статус для заказа №{{ selectedOrderIndex + 1 }}</h2>

        <!-- Выпадающий список с статусами -->
        <label for="status">Выберите статус:</label>
        <select v-model="selectedStatus" id="status" style="color: black;">
          <option>Передан курьеру</option>
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
import axios from 'axios';

export default {
  data() {
    return {
      newOrders: [],
      currentOrders: [],
      orderHistory: [],
      selectedOrderIndex: 0,
      isOrderCompositionModalOpen: false,
      selectedCourier: '',
      couriers: [],
      isStatusModalOpen: false,
      selectedStatus: '',
    };
  },
  created() {
    this.fetchOrders(); // Fetch all orders initially
    this.fetchCouriers();
  },
  methods: {
    fetchOrders() {
      this.fetchNewOrders();
      this.fetchCurrentOrders();
      this.fetchOrderHistory();
    },
    fetchNewOrders() {
      axios.get('http://185.128.106.222:3000/delivery/all', {
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoxfQ.tXLyzqivhPuBcehRerTCZj_gkXGb5NAASDcP0nZr5hc'
        }
      })
      .then(response => {
        this.newOrders = response.data
          .filter(order => order.status === 0)
          .map(order => ({
            customerName: order.client ? order.client.name : 'Неизвестный клиент',
            orderNumber: order.id,
            deliveryAddress: order.address,
            orderTime: new Date(order.createDate).toLocaleTimeString(),
            composition: order.dishes.map(dish => dish.name),
          }));
      })
      .catch(error => {
        console.error('Ошибка при получении новых заказов', error);
      });
    },
    fetchCurrentOrders() {
      axios.get('http://185.128.106.222:3000/delivery/all', {
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoxfQ.tXLyzqivhPuBcehRerTCZj_gkXGb5NAASDcP0nZr5hc'
        }
      })
      .then(response => {
        this.currentOrders = response.data
          .filter(order => order.status === 1 || order.status === 2)
          .map(order => ({
            customerName: order.client ? order.client.name : 'Неизвестный клиент',
            orderNumber: order.id,
            deliveryAddress: order.address,
            status: order.status,
          }));
      })
      .catch(error => {
        console.error('Ошибка при получении текущих заказов', error);
      });
    },
    fetchOrderHistory() {
      axios.get('http://185.128.106.222:3000/delivery/all', {
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoxfQ.tXLyzqivhPuBcehRerTCZj_gkXGb5NAASDcP0nZr5hc'
        }
      })
      .then(response => {
        this.orderHistory = response.data
          .filter(order => order.status === 3)
          .map(order => ({
            customerName: order.client ? order.client.name : 'Неизвестный клиент',
            orderNumber: order.id,
            deliveryAddress: order.address,
            courier: order.courier ? order.courier.fullName : 'Неизвестный курьер',
            orderTime: new Date(order.createDate).toLocaleTimeString(),
            executionTime: order.executionTime ? new Date(order.executionTime).toLocaleTimeString() : 'Неизвестно',
          }));
      })
      .catch(error => {
        console.error('Ошибка при получении истории заказов', error);
      });
    },
    fetchCouriers() {
      axios.get('http://185.128.106.222:3000/auth/staff', {
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjowfQ.bQoM-YvgvSYMcASgpMpgI5-JtaZSDu3lzGjH2soiK3s'
        }
      })
      .then(response => {
        this.couriers = response.data.filter(staff => staff.role === 1); // Фильтрация только курьеров
      })
      .catch(error => {
        console.error('Ошибка при получении списка курьеров', error);
      });
    },
      assignOrder() {
  const selectedOrder = this.newOrders[this.selectedOrderIndex];
  selectedOrder.courier = this.selectedCourier;

  // Определите статус в зависимости от сценария
  const status =
    this.selectedStatus === 'Доставлен' ? 3 : // 3 - статус "Доставлен"
    this.selectedStatus === 'Передан курьеру' ? 2 : // 2 - статус "Передан курьеру"
    1; // 1 - статус по умолчанию

  // Отправка данных на сервер
  this.updateOrderOnServer(selectedOrder, status)
    .then(() => {
      // После успешного обновления на сервере, обновляем локальные данные
      if (status === 1) {
        // Если выбран курьер из списка, обновляем статус на "Передан курьеру" (1)
        this.currentOrders.push(selectedOrder);
        this.newOrders.splice(this.selectedOrderIndex, 1);
      } else {
        // Иначе, если выбран статус "Передан курьеру" или "Доставлен", обновляем статус и перемещаем в текущие заказы
        selectedOrder.status = status;
        this.currentOrders.push(selectedOrder);
        this.newOrders.splice(this.selectedOrderIndex, 1);
      }

      // Закрываем модальное окно
      this.closeOrderCompositionModal();
    })
    .catch(error => {
      console.error('Ошибка при обновлении заказа на сервере', error);
      // Обработка ошибок, например, вывод сообщения пользователю
    });
},


    // Функция для обновления заказа на сервере
    updateOrderOnServer(order, status) {
      const data = {
        id: order.id,
        status: status, // 1 - статус "Передан курьеру", адаптируйте под ваш бекенд
        courier: {
          id: this.selectedCourier
        },
        // Дополнительные поля, если необходимо
      };

      // Отправляем запрос на сервер
      return axios.patch(`http://185.128.106.222:3000/delivery/`, data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoxfQ.tXLyzqivhPuBcehRerTCZj_gkXGb5NAASDcP0nZr5hc'
        }
      });
    },

      openOrderCompositionModal(index) {
        this.selectedOrderIndex = index;
        this.isOrderCompositionModalOpen = true;
      },
      assignOrder1() {
        const selectedOrder = this.newOrders[this.selectedOrderIndex];
        selectedOrder.courier = this.selectedCourier;
  
        this.currentOrders.push(selectedOrder);
        this.newOrders.splice(this.selectedOrderIndex, 1);
  
        this.closeOrderCompositionModal();
      },
      closeOrderCompositionModal() {
        this.isOrderCompositionModalOpen = false;
        this.selectedCourier = '';
      },
      openStatusModal(index) {
        this.selectedOrderIndex = index;
        this.isStatusModalOpen = true;
      },
      closeStatusModal() {
        this.isStatusModalOpen = false;
        this.selectedStatus = '';
      },
      updateOrderStatus() {
        const selectedOrder = this.currentOrders[this.selectedOrderIndex];
        selectedOrder.status = this.selectedStatus;
  
        if (this.selectedStatus === 'Доставлен') {
          const originalOrderTime = selectedOrder.orderTime;
          selectedOrder.executionTime = new Date().toLocaleTimeString();
          selectedOrder.orderTime = originalOrderTime;
          this.orderHistory.push(selectedOrder);
          this.currentOrders.splice(this.selectedOrderIndex, 1);
        }
  
        this.closeStatusModal();
        this.updateOrderStatusBackend(selectedOrder); // Вызовите метод для обновления статуса в бекенде
      },

      updateOrderStatusBackend(order) {
        const data = {
          id: order.id, // Замените это на фактическое имя свойства для идентификатора заказа в вашем бекенде
          status: order.status,
          courier: {
            id: order.courier.id // Замените это на фактическое имя свойства для идентификатора курьера в вашем бекенде
          }
        };
  
        axios.patch(`http://185.128.106.222:3000/delivery/`, data, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoxfQ.tXLyzqivhPuBcehRerTCZj_gkXGb5NAASDcP0nZr5hc'
          }
        })
        .then(response => {
          console.log('Статус заказа успешно обновлен', response.data);
        })
        .catch(error => {
          console.error('Ошибка при обновлении статуса заказа', error);
        });
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
  