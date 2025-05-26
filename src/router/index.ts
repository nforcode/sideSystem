import { createRouter, createWebHistory } from 'vue-router'
import indexPage from '@/views/indexPage.vue'
import A_1 from '@/views/A_0/A_1.vue'
import A_2 from '@/views/A_0/A_2.vue'
// import dynamicWrapper from '@/router/_DynamicWrapper.vue'
 import notFound from '@/router/notFound.vue'
const routes = [
  {
    path: '/index',
    name: 'home',
    component: indexPage,
  },
  {
    path: '/',
    redirect: '/index',
  },
  // {
  //   path: '/:pageName(\\w+_\\d+)',
  //   name: 'dynamic',
  //   component: dynamicWrapper,
  //   props: true,
  // },
  {
    path: '/A_1',
    name: 'A_1',
    component: A_1,
  },
   {
    path: '/A_2',
    name: 'A_2',
    component: A_2,
  },
 {
    path: '/404',
    name: 'NotFound',
    component: notFound,
  },
  {
    path: '/:pathMatch(.*)*', // 捕捉不存在的路徑
    redirect: '/404',
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
