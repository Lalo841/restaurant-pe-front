import { createRouter, createWebHistory } from 'vue-router'

import LoginForm from '../pages/LoginForm.vue'
import RegisterForm from '../pages/RegisterForm.vue'
import Catalog from '../pages/Catalog.vue'
import About from '../pages/About.vue'
import UserPage from '../pages/UserPage.vue'
import CartPage from '../pages/CartPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: RegisterForm
    },
    {
      path: '/userpage',
      component: UserPage,
      name: 'UserPage',
      meta: {
        requiredAuth: true,
        role: 3
      },
      children: [
        {
          path: 'catalog',
          name: 'Catalog',
          component: Catalog
        },
        {
          path: 'about',
          name: 'About',
          component: About
        },
        {
          path: 'sys-info',
          name: 'SystemInfo',
          component: About
        },
        {
          path: 'dev-info',
          name: 'DevInfo',
          component: About
        },
        {
          path: 'cart',
          name: 'Cart',
          component: CartPage
        },
        {
          path: 'profile',
          name: 'Profile',
          component: About
        }
      ]
    },
    {
      path: '/admin',
      component: About,
      name: 'Admin',
      meta: {
        requiredAuth: true,
        role: 0
      }
    },
    {
      path: '/zapret',
      name: 'Zapret',
      component: LoginForm
    }
  ]
})

router.beforeEach(async (to) => {
  if (to.matched.some((record) => record.meta.requiredAuth)) {
    const user = JSON.parse(localStorage.getItem('user'))
    console.log(user.isAuth)
    if (!user.isAuth) {
      return { name: 'Zapret' }
    } else if (to.meta.role !== user.role) {
      return { name: 'Zapret' }
    }
  }
})

export default router
