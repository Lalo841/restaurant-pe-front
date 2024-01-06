<template>
    <div>
      <div class="flex justify-between items-center">
        <h2 class="text-3xl font-bold mb-8">Все товары</h2>
        <div class="flex gap-4">
          <select @change="onChangeSelect" class="py-2 px-3 border rounded-md outline-none">
            <option value="name">По названию</option>
            <option value="-price">По цене (дорогие)</option>
            <option value="price">По цене (дешевые)</option>
          </select>
  
          <div class="relative">
            <img class="absolute left-4 top-3" src="/search.svg" />
            <input
              @input="onChangeSearchInput"
              class="border rounded-md py-2 pl-11 pr-4 outline-none focus:border-gray-400"
              type="text"
              placeholder="Поиск..."
            />
          </div>
          <button @click="openAddItemModal" class="add-button">Добавить блюдо</button>
        </div>
      </div>
      <div class="mt-10">
        <CardList :items="items" @add-to-cart="onClickAddPlus" @edit-item="openEditModal" />
      </div>
  
      <!-- Модальное окно для редактирования или добавления товара -->
      <div v-if="isModalOpen" class="modal-overlay">
        <div class="modal">
          <h2>{{ selectedItemId ? 'Edit Item' : 'Add New Item' }}</h2>
  
          <!-- Графа для загрузки изображения -->
          <div class="mb-4">
            <label for="imageUpload" class="block text-sm font-medium text-gray-700">
              Изображение
            </label>
            <input type="file" id="imageUpload" @change="handleImageUpload" />
            <img v-if="itemData.imageUrl" :src="itemData.imageUrl" alt="Preview" class="mt-2 max-h-40" />
          </div>
  
          <!-- Поля для ввода названия, цены и описания -->
          <div class="mb-4">
            <label for="itemName" class="block text-sm font-medium text-gray-700">
              Название
            </label>
            <input v-model="itemData.name" type="text" id="itemName" />
          </div>
  
          <div class="mb-4">
            <label for="itemPrice" class="block text-sm font-medium text-gray-700">
              Цена
            </label>
            <input v-model="itemData.price" type="number" id="itemPrice" />
          </div>
  
          <div class="mb-4">
            <label for="itemDescription" class="block text-sm font-medium text-gray-700">
              Описание
            </label>
            <textarea v-model="itemData.description" id="itemDescription"></textarea>
          </div>
  
          <!-- Кнопка для добавления товара (или редактирования, в зависимости от контекста) -->
          <button v-if="!selectedItemId" @click="addItem" class="add-button">Добавить</button>
          <button v-else @click="editItem" class="add-button">Сохранить</button>
  
          <!-- Кнопка для удаления товара (показывается только при редактировании) -->
          <button v-if="selectedItemId" @click="deleteItem" class="add-button red-button">Удалить</button>
  
          <button @click="closeModal">Закрыть</button>
        </div>
      </div>
  
      <!-- Модальное окно для добавления блюда -->
      <div v-if="isAddItemModalOpen" class="modal-overlay">
        <div class="modal">
          <h2>Добавить блюдо</h2>
  
          <!-- Графа для загрузки изображения -->
          <div class="mb-4">
            <label for="addItemImageUpload" class="block text-sm font-medium text-gray-700">
              Изображение
            </label>
            <input type="file" id="addItemImageUpload" @change="handleAddItemImageUpload" />
            <img v-if="addItemData.imageUrl" :src="addItemData.imageUrl" alt="Preview" class="mt-2 max-h-40" />
          </div>
  
          <!-- Поля для ввода названия, цены и описания -->
          <div class="mb-4">
            <label for="addItemName" class="block text-sm font-medium text-gray-700">
              Название
            </label>
            <input v-model="addItemData.name" type="text" id="addItemName" />
          </div>
  
          <div class="mb-4">
            <label for="addItemPrice" class="block text-sm font-medium text-gray-700">
              Цена
            </label>
            <input v-model="addItemData.price" type="number" id="addItemPrice" />
          </div>
  
          <div class="mb-4">
            <label for="addItemDescription" class="block text-sm font-medium text-gray-700">
              Описание
            </label>
            <textarea v-model="addItemData.description" id="addItemDescription"></textarea>
          </div>
  
          <!-- Кнопка для добавления блюда -->
          <button @click="addNewItem" class="add-button">Добавить</button>
  
          <button @click="closeAddItemModal">Закрыть</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref, reactive, watch } from 'vue';
  import axios from 'axios';
  //import CardList from './src/Admin/components/CardListAdmin.vue';

  import CardList from './components/CardListAdmin.vue'

  
  
  const items = ref([]);
  const selectedItemId = ref(null);
  const isModalOpen = ref(false);
  const isAddItemModalOpen = ref(false);
  
  const filters = reactive({
    sortBy: 'title',
    searchQuery: '',
  });
  
  const itemData = reactive({
    name: '',
    price: 0,
    description: '',
    imageUrl: '',
  });
  
  const addItemData = reactive({
    name: '',
    price: 0,
    description: '',
    imageUrl: '',
  });
  
  const onChangeSelect = (event) => {
    filters.sortBy = event.target.value;
  };
  
  const onChangeSearchInput = (event) => {
    filters.searchQuery = event.target.value;
  };
  
  const fetchItems = async () => {
    try {
      const params = {
        sortBy: filters.sortBy,
      };
  
      if (filters.searchQuery) {
        params.title = `*${filters.searchQuery}*`;
      }
  
      const { data } = await axios.get('https://604781a0efa572c1.mokky.dev/items', {
        params,
      });
      items.value = data;
    } catch (err) {
      console.log(err);
    }
  };
  
  watch(filters, fetchItems);
  
  const openEditModal = (itemId) => {
    if (itemId) {
      const selectedItem = items.value.find((item) => item.id === itemId);
      if (selectedItem) {
        selectedItemId.value = itemId;
        itemData.name = selectedItem.name;
        itemData.price = selectedItem.price;
        itemData.description = selectedItem.description;
        itemData.imageUrl = selectedItem.imageUrl;
      }
    } else {
      selectedItemId.value = null;
      clearItemData();
    }
  
    isModalOpen.value = true;
  };
  
  const openAddItemModal = () => {
    clearAddItemData();
    isAddItemModalOpen.value = true;
  };
  
  const closeEditModal = () => {
    selectedItemId.value = null;
    isModalOpen.value = false;
    clearItemData();
  };
  
  const closeAddItemModal = () => {
    isAddItemModalOpen.value = false;
    clearAddItemData();
  };
  
  const onClickAddPlus = () => {
    console.log('Add to cart clicked');
  };
  
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      itemData.imageUrl = imageUrl;
    }
  };
  
  const handleAddItemImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      addItemData.imageUrl = imageUrl;
    }
  };
  
  const addItem = () => {
    items.value.push({
      id: generateItemId(),
      name: itemData.name,
      price: itemData.price,
      description: itemData.description,
      imageUrl: itemData.imageUrl,
    });
  
    closeEditModal();
  };
  
  const addNewItem = () => {
    items.value.push({
      id: generateItemId(),
      name: addItemData.name,
      price: addItemData.price,
      description: addItemData.description,
      imageUrl: addItemData.imageUrl,
    });
  
    closeAddItemModal();
  };
  
  const editItem = () => {
    const editedItem = items.value.find((item) => item.id === selectedItemId.value);
    if (editedItem) {
      editedItem.name = itemData.name;
      editedItem.price = itemData.price;
      editedItem.description = itemData.description;
      editedItem.imageUrl = itemData.imageUrl;
    }
  
    closeEditModal();
  };
  
  const deleteItem = () => {
    if (selectedItemId.value) {
      items.value = items.value.filter((item) => item.id !== selectedItemId.value);
      closeEditModal();
    }
  };
  
  const clearItemData = () => {
    itemData.name = '';
    itemData.price = 0;
    itemData.description = '';
    itemData.imageUrl = '';
  };
  
  const clearAddItemData = () => {
    addItemData.name = '';
    addItemData.price = 0;
    addItemData.description = '';
    addItemData.imageUrl = '';
  };
  
  const closeModal = () => {
    closeEditModal();
    closeAddItemModal();
  };
  
  const generateItemId = () => {
    return Math.floor(Math.random() * 1000000);
  };
  
  onMounted(fetchItems);
  </script>
  
  <style scoped>
  /* Стили вашего компонента */
  
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal {
    background: #c4a189;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  }
  
  .add-button {
    background-color: #c2191d;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 50px;
  }
  
  .red-button {
    background-color: #c2191d;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 50px;
  }
  
  /* ... (остальные стили) */
  </style>
  