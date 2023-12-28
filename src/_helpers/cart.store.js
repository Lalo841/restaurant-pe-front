import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCartStore = defineStore('cart', {
  state: () => {
    return {
      cart: []
    }
  },
  getters: {
    totalPrice: (state) => state.cart.reduce((acc, item) => acc + item.price, 0)
  },

  actions: {
    addToCart(item) {
      this.cart.push(item)
      item.isAdded = true
      localStorage.setItem(item.id, item)
    },

    removeFromCart(item) {
      this.cart.splice(this.cart.indexOf(item), 1)
      item.isAdded = false
      localStorage.removeItem(item.id)
    }
  }
})
