<template>
  <div>
    <!-- Заголовок "Новые брони" -->
    <h2 class="title">Новые брони</h2>
    <div>
      <!-- Заголовки под Новые брони -->
      <div class="header1">
        <span style="margin-right: 250px">ФИО заказчика</span>
        <span>Номер брони</span>
        <span>Адрес</span>
        <span>Дата и время бронирования</span>
      </div>

      <!-- Записи с новыми бронями -->
      <div v-for="(reservation, index) in newReservations" :key="index" class="record">
        <span>{{
          reservation.client && reservation.client.fullName
            ? reservation.client.fullName
            : 'Неизвестный клиент'
        }}</span>
        <span>{{ reservation.id }}</span>
        <span>{{
          reservation.client && reservation.client.address
            ? reservation.client.address
            : 'Неизвестный адрес'
        }}</span>
        <span>{{ formatDateTime(reservation.reservationDate) }}</span>
        <button @click="openReservationModal(index)" class="manage-btn">Назначить столик</button>
      </div>
    </div>

    <!-- Заголовок "Текущие брони" -->
    <h2 class="title">Текущие брони</h2>
    <div>
      <!-- Заголовки под Текущие брони -->
      <div class="header2">
        <span>ФИО заказчика</span>
        <span>Номер брони</span>
        <span>Адрес</span>
        <span>Столик</span>
      </div>

      <!-- Записи с текущими бронями -->
      <div v-for="(reservation, index) in currentReservations" :key="index" class="record">
        <span>{{
          reservation.client && reservation.client.fullName
            ? reservation.client.fullName
            : 'Неизвестный клиент'
        }}</span>
        <span>{{ reservation.id }}</span>
        <span>{{
          reservation.client && reservation.client.address
            ? reservation.client.address
            : 'Неизвестный адрес'
        }}</span>
        <span>{{ reservation.tables.join(', ') }}</span>
        <!-- Добавляем кнопку для завершения брони -->
        <button @click="completeReservation(index)" class="manage-btn">Закончить бронь</button>
      </div>
    </div>

    <!-- Заголовок "История бронирования" -->
    <h2 class="title">История бронирования</h2>
    <div>
      <!-- Заголовки под Историю бронирования -->
      <div class="header3">
        <span>ФИО заказчика</span>
        <span>Номер брони</span>
        <span>Адрес</span>
        <span>Столик</span>
        <span>Дата и время бронирования</span>
        <span>Дата и время окончания бронирования</span>
      </div>

      <!-- Записи с историей бронирования -->
      <div v-for="(reservation, index) in reservationHistory" :key="index" class="record">
        <span>{{ reservation.client.fullName }}</span>
        <span>{{ reservation.id }}</span>
        <span>{{ reservation.client.address }}</span>
        <span>{{ reservation.tables.join(', ') }}</span>
        <span>{{ formatDateTime(reservation.reservationDate) }}</span>
        <span>{{ formatDateTime(reservation.endTime) }}</span>
      </div>
    </div>

    <!-- Модальное окно для бронирования столика -->
    <div v-if="isReservationModalOpen" class="modal">
      <div class="modal-content">
        <h2>Бронирование столика №{{ selectedReservationIndex + 1 }}</h2>

        <!-- Выпадающий список со столиками -->
        <label for="table">Выберите столик:</label>
        <select v-model="selectedTable" id="table" style="color: black">
          <option v-for="(table, index) in tables" :key="index" style="color: black">
            {{ table }}
          </option>
        </select>

        <!-- Кнопки для бронирования и отмены -->
        <button @click="reserveTable" class="modal-btn">Назначить</button>
        <button @click="closeReservationModal" class="modal-btn">Отмена</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      newReservations: [],
      currentReservations: [],
      reservationHistory: [],
      selectedReservationIndex: 0,
      isReservationModalOpen: false,
      selectedTable: '',
      tables: [] // Replace with real table data
    }
  },
  created() {
    this.fetchReservations() // Fetch reservations initially
  },
  methods: {
    fetchReservations() {
      this.fetchNewReservations()
      this.fetchCurrentReservations()
      this.fetchReservationHistory()
    },
    fetchNewReservations() {
      axios
        .get('http://185.128.106.222:3000/reservations/all', {
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoxfQ.tXLyzqivhPuBcehRerTCZj_gkXGb5NAASDcP0nZr5hc'
          }
        })
        .then((response) => {
          this.newReservations = response.data
            .filter((reservation) => !reservation.tables || reservation.tables.length === 0)
            .map((reservation) => ({
              id: reservation.id,
              client: reservation.client,
              deliveryAddress: reservation.client
                ? reservation.client.address
                : 'Неизвестный адрес',
              reservationDate: reservation.reservationDate
            }))
        })
        .catch((error) => {
          console.error('Ошибка при получении новых броней', error)
        })
    },
    fetchCurrentReservations() {
      axios
        .get('http://185.128.106.222:3000/reservations/all', {
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoxfQ.tXLyzqivhPuBcehRerTCZj_gkXGb5NAASDcP0nZr5hc'
          }
        })
        .then((response) => {
          this.currentReservations = response.data
            .filter(
              (reservation) =>
                reservation.tables && reservation.tables.length > 0 && reservation.personsCount > 0
            )
            .map((reservation) => ({
              id: reservation.id,
              client: reservation.client,
              deliveryAddress: reservation.client
                ? reservation.client.address
                : 'Неизвестный адрес',
              tables: reservation.tables
            }))
        })
        .catch((error) => {
          console.error('Ошибка при получении текущих броней', error)
        })
    },

    fetchReservationHistory() {
      axios
        .get('http://185.128.106.222:3000/reservations/all', {
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoxfQ.tXLyzqivhPuBcehRerTCZj_gkXGb5NAASDcP0nZr5hc'
          }
        })
        .then((response) => {
          this.reservationHistory = response.data
            .filter((reservation) => reservation.endTime || reservation.personsCount === 0)
            .map((reservation) => ({
              id: reservation.id,
              client: reservation.client,
              deliveryAddress: reservation.client
                ? reservation.client.address
                : 'Неизвестный адрес',
              tables: reservation.tables,
              reservationDate: reservation.reservationDate,
              endTime: reservation.endTime
            }))
        })
        .catch((error) => {
          console.error('Ошибка при получении истории бронирования', error)
        })
    },

    openReservationModal(index) {
      this.selectedReservationIndex = index
      this.isReservationModalOpen = true
    },
    reserveTable() {
      const selectedReservation = this.newReservations[this.selectedReservationIndex]
      const reservationId = selectedReservation.id

      const data = {
        tables: [this.selectedTable],
        client: {
          id: selectedReservation.client.id
        }
      }

      axios
        .patch(`http://185.128.106.222:3000/reservations/`, data, {
          headers: {
            'Content-Type': 'application/json',
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoxfQ.tXLyzqivhPuBcehRerTCZj_gkXGb5NAASDcP0nZr5hc'
          }
        })
        .then((response) => {
          // Update the local data after a successful reservation
          selectedReservation.tables = [this.selectedTable]
          this.currentReservations.push(selectedReservation)
          this.newReservations.splice(this.selectedReservationIndex, 1)

          // Close the reservation modal
          this.closeReservationModal()
        })
        .catch((error) => {
          console.error('Ошибка при бронировании столика', error)
        })
    },
    closeReservationModal() {
      this.isReservationModalOpen = false
      this.selectedTable = ''
    },
    completeReservation(index) {
      const selectedReservation = this.currentReservations[index]
      const reservationId = selectedReservation.id

      axios
        .patch(
          `http://185.128.106.222:3000/reservations/`,
          { personsCount: 0 },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization:
                'Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoxfQ.tXLyzqivhPuBcehRerTCZj_gkXGb5NAASDcP0nZr5hc'
            }
          }
        )
        .then((response) => {
          // Move the completed reservation to the history
          this.reservationHistory.push(selectedReservation)
          this.currentReservations.splice(index, 1)
          this.fetchNewReservations() // Fetch new reservations again to update the data
        })
        .catch((error) => {
          console.error('Ошибка при завершении брони', error)
        })
    },
    formatDateTime(dateTime) {
      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
      }
      return new Date(dateTime).toLocaleDateString('ru-RU', options)
    }
  }
}
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
  margin-right: 200px;
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
