import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/products',
      name: 'products',
      component: () => import('../views/ProductsView.vue')
    },
    {
      path: '/about',
      name: 'about us',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/course',
      name: 'course',
      component: () => import('../views/CourseView.vue')
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('../views/CartView.vue')
    },
    {
      path: '/record',
      name: 'record',
      component: () => import('../views/RecordView.vue')
    }
  ]
})

export default router
