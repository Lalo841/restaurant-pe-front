<script setup>
import { ref, reactive, watch, provide, computed } from 'vue'
import axios from 'axios'

</script>

<template>
  <div>
    <RouterView />
  </div>
  <!-- <Drawer :total-price="totalPrice" v-if="drawerIsOpen" /> -->
  <!-- min-h-screen Чтобы на всех страницах был залит фон -->
  <!-- <div class="bg-orange-100 min-h-screen">
    <Header :total-price="totalPrice" @open-drawer="oprenDrawer" />
    <div class="p-10">
      <router-view></router-view>
    </div>
  </div> -->
</template>
