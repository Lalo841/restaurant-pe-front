import { defineStore } from 'pinia'

import router from './router.js'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    // initialize state from local storage to enable user to stay logged in
    //userState: JSON.parse(localStorage.getItem('user')),
    returnUrl: null
  }),

  actions: {
    async login(email, password) {
      let reqPath = 'http://185.128.106.222:3000/auth'

      const { data } = await axios.get('http://185.128.106.222:3000/auth/staff', {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjowfQ.bQoM-YvgvSYMcASgpMpgI5-JtaZSDu3lzGjH2soiK3s'
        }
      })

      const staffEmails = data.map((item) => item.email)
      if (staffEmails.includes(email)) {
        reqPath = 'http://185.128.106.222:3000/auth/staff'
      }

      // if (email === 'example@mail.ru') {
      //   reqPath = 'http://185.128.106.222:3000/auth/staff'
      // }

      // const user = { email: 'hui', password: 123, role: 3, isAuth: true }
      // localStorage.setItem('user', JSON.stringify(user))
      // if (user.role === 0) {
      //   router.push('/adminpage/catalog-admin')
      // } else if (user.role === 3) {
      //   router.push('/userpage/catalog')
      // } else if (user.role === 1) {
      //   router.push('/managerpage/orders')
      // } else if (user.role === 2) {
      //   router.push('/courierpage/orders-courier')
      // }

      axios
        .post(reqPath, {
          // email: "example2@mail.ru",
          // password: "1234"
          email: email,
          password: password
        })
        .then(function (response) {
          let user = response.data.user
          user.isAuth = true

          localStorage.setItem('user', JSON.stringify(user))

          if (user.role === 0) {
            router.push('/adminpage/catalog-admin')
          } else if (user.role === 3) {
            router.push('/userpage/catalog')
          } else if (user.role === 1) {
            router.push('/managerpage/orders')
          } else if (user.role === 2) {
            router.push('/courierpage/orders-courier')
          }
        })
        .catch(function (error) {
          console.log(error)
        })

      // запрос на получение данных пользователя
      // пока жестко , сделаем позже уже нормально получение, когда регистрацию доделаю. Пока для перехода по ролям, нужно менять поле role
      // 0 - admin, 1 - manager, 2 - courier, 3 - user
      // const user = { username: email, password: password, isAuth: true, role: 3 }
    },

    logout() {
      //this.userState = null
      localStorage.removeItem('user')
      router.push('/')
    },

    registration(email, password, fullName, phone, address) {
      let data = JSON.stringify({
        email: email,
        password: password,
        fullName: fullName,
        phone: phone,
        address: address
      })

      let config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: 'http://185.128.106.222:3000/auth',
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      }

      axios
        .request(config)
        .then((response) => {
          console.log('Регистрация прошла успешно')
          let user = response.data.user
          user.isAuth = true
          localStorage.setItem('user', JSON.stringify(user))
          router.push('/userpage/catalog')
          console.log(JSON.stringify(response.data))
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
})
