import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import InvoiceDetails from '../views/InvoiceDetails.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Invoice/:id',
    name: 'InvoiceDetails',
    props: true,
    component: InvoiceDetails
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router