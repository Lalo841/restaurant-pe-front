import { defineStore } from 'pinia'

import router from './router.js'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    // initialize state from local storage to enable user to stay logged in
    //userState: JSON.parse(localStorage.getItem('user')),
    returnUrl: null
  }),

  actions: {
    async login(username, password) {
      var myHeaders = new Headers()
      myHeaders.append('Content-Type', 'application/json')

      var raw = JSON.stringify({
        email: 'example@mail.ru',
        password: '1234'
      })

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      }

      // fetch('http://ioann44.ddns.net:3000/auth/staff', requestOptions)
      //   .then((response) => response.json())
      //   .then((result) => {
      //     ///const receivedObject = JSON.parse(result)
      //     user = result.user
      //     this.user = user
      //     this.user.isAuth = true
      //     localStorage.setItem('user', JSON.stringify(user))

      //   })
      //   .catch((error) => console.log('error', error))

      //запрос на получение данных пользователя
      //пока жестко , сделаем позже уже нормально получение, когда регистрацию доделаю. Пока для перехода по ролям, нужно менять поле role
      // 0 - admin, 1 - manager, 2 - courier, 3 - user
      const user = { username: username, password: password, isAuth: true, role: 0 }
      //const user = await fetchWrapper.post(`${baseUrl}/authenticate`, { username, password })

      // update pinia state
      //this.userState = user
      // store user details and jwt in local storage to keep user logged in between page refreshes

      localStorage.setItem('user', JSON.stringify(user))

      // redirect to previous url or default to home page
      if (user.role === 0) {
        router.push('/adminpage/catalog-admin')
      } else if (user.role === 3) {
        router.push('/userpage/catalog')
      } else if (user.role === 1) {
        router.push('/managerpage/orders')
      } else if (user.role === 2) {
        router.push('/courierpage/orders-courier')
      }

      // router.push(this.returnUrl || '/catalog')
    },

    logout() {
      //this.userState = null
      localStorage.removeItem('user')
      router.push('/')
    }
  }
})
