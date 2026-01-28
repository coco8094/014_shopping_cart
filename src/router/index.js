import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ProductDetail from '../views/ProductDetail.vue'
import Cart from '../views/Cart.vue'
import Checkout from '../views/Checkout.vue'
import ThankYou from '../views/ThankYou.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/ProductDetail/:id',
      name: 'ProductDetail',
      component: ProductDetail,
    },
    {
      path: '/Cart',
      name: 'Cart',
      component: Cart,
    },
    {
      path: '/Checkout',
      name: 'Checkout',
      component: Checkout,
    },
    {
      path: '/ThankYou',
      name: 'ThankYou',
      component: ThankYou,
    },
  ],
})

export default router
