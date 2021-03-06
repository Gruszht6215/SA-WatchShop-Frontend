import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/signUp',
    name: 'SignUp',
    component: () => import('../views/auth/SignUp.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/auth/Login.vue')
  },
  {
    path: '/logout',
    name: 'Logout',
    component: () => import('../views/auth/Logout.vue')
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/Cart.vue')
  },
  {
    path: '/admin/board',
    name: 'AdminBoard',
    component: () => import('../views/admin/AdminBoard.vue')
  },
  {
    path: '/admin/items',
    name: 'AdminEditItems',
    component: () => import('../views/admin/AdminItems.vue')
  },
  {
    path: '/admin/spareparts',
    name: 'AdminEditspareparts',
    component: () => import('../views/admin/AdminSparepart.vue')
  },
  {
    path: '/admin/manufacturer',
    name: 'AdminEditmanufacturer',
    component: () => import('../views/admin/AdminManufacturer.vue')
  },
  {
    path: '/admin/invoice',
    name: 'AdminInvoice',
    component: () => import('../views/admin/AdminInvoice.vue')
  },
  {
    path: '/history/items',
    name: 'HistoryItems',
    component: () => import('../views/History_Items.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
