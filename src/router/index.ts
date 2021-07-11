import { createRouter, RouteRecordRaw, createWebHistory, createWebHashHistory } from 'vue-router'

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
  {
    path: '/StuAdd',
    name: 'StuAdd',
    component: () => import('@/views/student/StuAdd.vue'),
  },
  {
    path: '/OrderAdd',
    name: 'OrderAdd',
    component: () => import('@/views/order/OrderAdd.vue'),
  },
  {
    path: '/OrderList',
    name: 'OrderList',
    component: () => import('@/views/order/OrderList.vue'),
  },
  {
    path: '/UserAdd',
    name: 'UserAdd',
    component: () => import('@/views/user/UserAdd.vue'),
  },
  {
    path: '/UserList',
    name: 'UserList',
    component: () => import('@/views/user/UserList.vue'),
  },
]

const index = createRouter({
  // history: createWebHistory(process.env.NODE_ENV === 'development' ? '' : '/tlwqx/'),
  history: createWebHashHistory(),
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
