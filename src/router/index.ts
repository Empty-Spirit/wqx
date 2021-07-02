import { createRouter, RouteRecordRaw, createWebHistory } from 'vue-router'

import Login from '@/views/login/Index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/Main',
    name: 'Main',
    component: () => import('@/views/Main.vue'),
    redirect: '/Home',
    children: [
      {
        path: '/Home',
        name: 'Home',
        component: () => import('@/views/home/Home.vue'),
      },
      {
        path: '/StuList',
        name: 'StuList',
        component: () => import('@/views/student/StuList.vue'),
      },
      {
        path: '/Mine',
        name: 'Mine',
        component: () => import('@/views/Mine/index.vue'),
      },
    ],
  },
]

const index = createRouter({
  history: createWebHistory(),
  routes,
})

function getToken() {
  let cookie = document.cookie
  let token = ''
  if (cookie.indexOf('=token') > -1) {
    token = cookie.split('token=')[1].split('=token')[0]
  }
  return token
}

index.beforeEach((to, from, next) => {
  if (to.name === 'Login' || to.name === 'StuAdd' || getToken()) {
    next()
  } else {
    next({
      path: '/',
    })
  }
})

export default index
