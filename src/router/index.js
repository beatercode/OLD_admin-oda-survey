import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SurveyView from '../views/SurveyView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/survey',
    name: 'survey',
    component: SurveyView,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
