import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HolidayView from '@/views/HolidayView.vue'
import ParamsView from '@/views/ParamsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/holidays',
      name: 'holidays',
      component: HolidayView
    },
    {
      path: '/params',
      name: 'params',
      component: ParamsView
    },
  ]
})

export default router
