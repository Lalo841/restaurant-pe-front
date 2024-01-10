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
        <span>{{ manager.fullName }}</span>
        <span class="restaurant1">{{ manager.restaurant ? manager.restaurant.address : '-' }}</span>
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
        <span>{{ courier.fullName }}</span>
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
        <input v-model="newManager.name" placeholder="ФИО" class="input-field" />
        <input
          v-model="newManager.email"
          placeholder="Email"
          class="input-field"
          pattern="^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$"
        />
        <input
          v-model="newManager.password"
          type="password"
          placeholder="Пароль"
          class="input-field"
          minlength="3"
          maxlength="15"
        />
        <label for="restaurantSelect">Ресторан:</label>
        <select id="restaurantSelect" v-model="newManager.restaurantId" class="input-field">
          <option v-for="restaurant in restaurants" :key="restaurant.id" :value="restaurant.id">
            {{ restaurant.address }}
          </option>
        </select>
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
        <input
          v-model="newCourier.email"
          placeholder="Email"
          class="input-field"
          pattern="^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$"
        />
        <input
          v-model="newCourier.password"
          type="password"
          placeholder="Пароль"
          minlength="3"
          maxlength="15"
          class="input-field"
        />
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
import axios from 'axios'

export default {
  data() {
    return {
      managers: [],
      couriers: [],
      newManager: {
        name: '',
        email: '',
        password: '',
        restaurant: '',
        restaurants: []
      },
      newCourier: {
        name: '',
        email: '',
        password: ''
        // Добавьте другие поля по необходимости
      },
      isManagerModalOpen: false,
      isCourierModalOpen: false,
      restaurantAddresses: []
    }
  },
  methods: {
    async fetchManagersAndCouriers() {
      try {
        const response = await axios.get('http://185.128.106.222:3000/auth/staff', {
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjowfQ.bQoM-YvgvSYMcASgpMpgI5-JtaZSDu3lzGjH2soiK3s'
          }
        })

        this.managers = []
        this.couriers = []

        response.data.forEach((staffMember) => {
          if (staffMember.role === 1) {
            this.managers.push(staffMember)
          } else if (staffMember.role === 2) {
            this.couriers.push(staffMember)
          }
        })

        const restaurantResponse = await axios.get('http://185.128.106.222:3000/restaurant/', {
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjowfQ.bQoM-YvgvSYMcASgpMpgI5-JtaZSDu3lzGjH2soiK3s'
          }
        })
        this.restaurants = restaurantResponse.data
        this.restaurantAddresses = restaurantResponse.data.map((restaurant) => restaurant.address)
      } catch (error) {
        console.error('Ошибка при получении менеджеров и курьеров:', error)
      }
    },
    deleteManager(index) {
      const managerId = this.managers[index].id
      this.deleteStaffMember(managerId)
      this.managers.splice(index, 1)
    },
    deleteCourier(index) {
      const courierId = this.couriers[index].id
      this.deleteStaffMember(courierId)
      this.couriers.splice(index, 1)
    },
    async deleteStaffMember(staffId) {
      try {
        await axios.delete(`http://185.128.106.222:3000/auth/staff/${staffId}`, {
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjowfQ.bQoM-YvgvSYMcASgpMpgI5-JtaZSDu3lzGjH2soiK3s'
          }
        })
        console.log(`Сотрудник с ID ${staffId} успешно удален.`)
      } catch (error) {
        console.error(`Ошибка при удалении сотрудника с ID ${staffId}:`, error)
      }
    },
    addManager() {
      const selectedRestaurant = this.restaurants.find(
        (restaurant) => restaurant.id === this.newManager.restaurantId
      )
      const data = {
        email: this.newManager.email,
        password: this.newManager.password,
        fullName: this.newManager.name,
        role: 1,
        restaurant: {
          id: selectedRestaurant ? selectedRestaurant.id : null
        },
        phone: '+79315363563',
        address: 'г. Бузулук'
      }

      axios
        .put('http://185.128.106.222:3000/auth/staff', data, {
          headers: {
            'Content-Type': 'application/json',
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjowfQ.bQoM-YvgvSYMcASgpMpgI5-JtaZSDu3lzGjH2soiK3s'
          }
        })
        .then((response) => {
          console.log('Менеджер успешно добавлен на сервер:', response.data)
          this.managers.push(response.data)
        })
        .catch((error) => {
          console.error('Ошибка при добавлении менеджера на сервер:', error)
        })

      this.closeManagerModal()
    },
    addCourier() {
      const data = {
        email: this.newCourier.email,
        password: this.newCourier.password,
        fullName: this.newCourier.name,
        role: 2,
        phone: '+79315363563',
        address: 'г. Бузулук'
      }

      axios
        .put('http://185.128.106.222:3000/auth/staff', data, {
          headers: {
            'Content-Type': 'application/json',
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjowfQ.bQoM-YvgvSYMcASgpMpgI5-JtaZSDu3lzGjH2soiK3s'
          }
        })
        .then((response) => {
          console.log('Курьер успешно добавлен на сервер:', response.data)
          this.couriers.push(response.data)
        })
        .catch((error) => {
          console.error('Ошибка при добавлении курьера на сервер:', error)
        })

      this.closeCourierModal()
    },
    openManagerModal() {
      this.isManagerModalOpen = true
    },
    closeManagerModal() {
      this.isManagerModalOpen = false
    },
    openCourierModal() {
      this.isCourierModalOpen = true
    },
    closeCourierModal() {
      this.isCourierModalOpen = false
    }
  },
  mounted() {
    this.fetchManagersAndCouriers()
  }
}
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
  border-radius: 50px;
  /* Закругление заголовка */
}

.record {
  display: flex;
  justify-content: space-between;
  background-color: #c4a189;
  color: white;
  /* Текст записей белый */
  padding: 5px;
  margin: 5px 0;
  border-radius: 50px;
  /* Закругление записей */
}

.restaurant {
  flex-grow: 1;
  margin-left: 65px;
  /* Отступ для ресторана */
}

.restaurant1 {
  flex-grow: 1;
  margin-left: 15px;
  /* Отступ для ресторана */
}

.add-btn {
  background-color: #c2191d;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 50px;
  /* Закругление кнопки */
}

.delete-btn {
  background-color: #c2191d;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 50px;
  /* Закругление кнопки */
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
  border-radius: 50px;
  /* Закругление кнопки */
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
