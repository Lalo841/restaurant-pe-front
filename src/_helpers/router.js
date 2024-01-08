import { createRouter, createWebHistory } from 'vue-router'

import LoginForm from '../pages/LoginForm.vue'
import RegisterForm from '../pages/RegisterForm.vue'
import AccessDenied from '../pages/AccessDenied.vue'

import Catalog from '../pages/user_pages/Catalog.vue'
import About from '../pages/user_pages/About.vue'
import UserPage from '../pages/user_pages/UserPage.vue'
import CartPage from '../pages/user_pages/CartPage.vue'

import AdminPage from '../pages/admin_pages/AdminPage.vue'
import CatalogAdmin from '../pages/admin_pages/CatalogAdmin.vue'
import Personal from '../pages/admin_pages/Personal.vue'

import ManagerPage from '../pages/manager_pages/ManagerPage.vue'
import Bron from '../pages/manager_pages/Bron.vue'
import Zakaz from '../pages/manager_pages/Zakaz.vue'

import CourierPage from '../pages/courier_pages/CourierPage.vue'
import ZakazCourier from '../pages/courier_pages/ZakazCourier.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: LoginForm
    },
    {
      path: '/registration',
      name: 'Registration',
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
      path: '/adminpage',
      component: AdminPage,
      name: 'Admin',
      meta: {
        requiredAuth: true,
        role: 0
      },
      children: [
        {
          path: 'catalog-admin',
          name: 'CatalogAdmin',
          component: CatalogAdmin
        },
        {
          path: 'personal',
          name: 'Personal',
          component: Personal
        }
      ]
    },
    {
      path: '/managerpage',
      component: ManagerPage,
      name: 'Manager',
      meta: {
        requiredAuth: true,
        role: 1
      },
      children: [
        {
          path: 'reservations',
          name: 'Reservations',
          component: Bron
        },
        {
          path: 'orders',
          name: 'Orders',
          component: Zakaz
        }
      ]
    },
    {
      path: '/courierpage',
      component: CourierPage,
      name: 'Courier',
      meta: {
        requiredAuth: true,
        role: 2
      },
      children: [
        {
          path: 'orders-courier',
          name: 'OrdersCourier',
          component: ZakazCourier
        }
      ]
    },
    {
      path: '/zapret',
      name: 'Zapret',
      component: AccessDenied
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
