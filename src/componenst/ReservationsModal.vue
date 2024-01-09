<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import TableRowReservation from './TableRowReservation.vue'

const emit = defineEmits(['closeModal'])

const restaurants = ref([])

const reservationTable = async (object) => {
  const client = {
    id: JSON.parse(localStorage.getItem('user'))
  }
  const tables = restaurants.value.find((item) => item.id === object.id).tables
  let arrTable = []
  tables.forEach((element) => {
    arrTable.push(element.capacity)
  })

  //console.log(arrTable)

  const personsCount = object.personsCount.value
  //let dat = object.reservationDate.replace('T', ' ')
  const reservationDate = object.reservationDate.value.replace('T', ' ')

  let data = JSON.stringify({
    personsCount: personsCount,
    reservationDate: reservationDate,
    tables: arrTable,
    client: client
  })

  let config = {
    method: 'put',
    maxBodyLength: Infinity,
    url: 'http://185.128.106.222:3000/reservations/',
    headers: {
      'Content-Type': 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjozLCJpZCI6MX0.W-uQLtte16T4Wgtl2ex7siI4KjsnLLdO0Vz02YLiOXA'
    },
    data: data
  }

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data))
    })
    .catch((error) => {
      console.log(error)
    })
}

const getAllRestaurants = async () => {
  try {
    const { data } = await axios.get('http://185.128.106.222:3000/restaurant/')
    restaurants.value = data
    console.log(data)
  } catch (err) {
    console.log(err)
  }
}

onMounted(getAllRestaurants)
</script>

<template>
  <div>
    <div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-30"></div>
    <div
      class="flex flex-col bg-modal-panel rounded-xl fixed z-20 w-5/6 h-5/6 left-36 shadow-sm shadow-red-200"
    >
      <div class="flex justify-between text-black text-2xl font-semibold mt-3 mb-5 px-5">
        <span class="flex justify-center w-full">Бронирование</span>
        <img
          class="opacity-40 hover:opacity-100 cursor-pointer"
          src="/close.svg"
          alt="closeSvg"
          @click="emit('closeModal')"
        />
      </div>
      <table class="border-separate border-spacing-x-24 border-spacing-y-2">
        <thead class="text-red-600 text-center text-base text-lg">
          <tr>
            <th>Адрес</th>
            <th>Свободные места</th>
            <th>Нужно мест</th>
            <th>Дата и время бронирования</th>
            <th></th>
          </tr>
        </thead>
        <tbody class="text-black text-center text-base text-lg">
          <TableRowReservation
            v-for="rest in restaurants"
            :key="rest.id"
            :id="rest.id"
            :name="rest.name"
            :free-places="rest.freePlaces"
            :address="rest.address"
            @reserve-table="reservationTable"
          />
        </tbody>
      </table>
    </div>
  </div>
</template>
