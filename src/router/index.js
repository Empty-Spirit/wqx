import Vue from 'vue'
import Router from 'vue-router'
// import Login from '@/components/Login'
import Login from '@/view/Login'
import Main from '@/view/Main'
import Mine from '@/view/mine/Mine'
import StuList from '@/view/student/StuList'
import StuEdit from '@/view/student/StuEdit'
import Pay from '@/view/order/Pay'
import Home from '@/view/home/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },{
      path: '/Main',
      name: 'Main',
      component: Main,
      redirect:'/Home',
      children:[
        {
          path:'/StuList',
          name: 'StuList',
          component: StuList
        },{
          path: '/Mine',
          name: 'Mine',
          component: Mine
        },{
          path: '/Home',
          name: 'Home',
          component: Home
        }
      ]
    },{
      path: '/StuEdit',
      name: 'StuEdit',
      component: StuEdit
    },{
      path: '/Pay',
      name: 'Pay',
      component: Pay
    }
  ]
})
