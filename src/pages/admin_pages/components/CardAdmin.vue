<script setup>
const props = defineProps({
  id: Number,
  title: String,
  imageUrl: String,
  price: Number,
  weight: Number,
  category: Number,
  desc: String,
  calories: Number,
  kitchen: Number,
  isFavorite: Boolean,
  isAdded: Boolean,
  onClickAdd: Function,
  onEdit: Function
})
const fullUrl = `http://185.128.106.222:9000/images/${props.imageUrl}`
</script>

<template>
  <div>
    <div
      class="bg-orange-100 border border-orange-200 rounded-3xl p-8 cursor-pointer transition hover:-translate-y-2 hover:shadow-xl"
    >
      <img class="rounded-xl" :src="fullUrl" alt="ProductPicture" />
      <p class="mt-2">{{ title }}</p>

      <div class="flex justify-between mt-5">
        <div class="flex flex-col">
          <span class="text-slate-400 uppercase">Цена:</span>
          <b>{{ price }} руб.</b>
          <span class="text-slate-400 uppercase">Вес:</span>
          <b>{{ weight }} гр.</b>
          <span class="text-slate-400 uppercase">Калории:</span>
          <b>{{ calories }} кл.</b>
        </div>

        <button class="edit-button" @click="onEdit">Редактировать</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.edit-button {
  background-color: #c2191d;
  color: #fff;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
}
</style>
