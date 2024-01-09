<script setup>
import { ref } from 'vue'

const emit = defineEmits(['reserveTable'])

const personsCount = ref(0)
const reservationDate = ref('')

const props = defineProps({
  id: Number,
  name: String,
  address: String,
  freePlaces: Number
})

const objReservation = {
  id: props.id,
  personsCount: personsCount,
  reservationDate: reservationDate
}
</script>

<template>
  <tr>
    <td>{{ props.name }}</td>
    <td>{{ props.freePlaces }}</td>
    <td>
      <input type="number" placeholder="места" v-model="personsCount" />
    </td>
    <td><input type="datetime-local" v-model="reservationDate" /></td>
    <td>
      <button
        @click="emit('reserveTable', objReservation)"
        class="bg-red-600 w-36 rounded-2xl py-2 text-white hover:bg-red-800 cursor-pointer"
      >
        Забронировать
      </button>
    </td>
  </tr>
</template>
