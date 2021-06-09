import Vue from 'vue'
import Router from 'vue-router'
// import Login from '@/components/Login'
import Login from '@/view/Login' //登录页面
import Main from '@/view/Main' //主页面
import Home from '@/view/home/Home' //主页
import Mine from '@/view/mine/Mine' //我的
import StuList from '@/view/student/StuList' //学院列表
import StuEdit from '@/view/student/StuEdit' //修改学员信息
import StuAdd from '@/view/student/StuAdd' //修改学员信息
import Pay from '@/view/order/Pay' //缴费页面
import OrderList from '@/view/order/OrderList' //缴费页面
import UserList from '@/view/user/UserList' //角色管理
import UserAdd from '@/view/user/UserAdd' //授权登录
import Draw from '@/view/activity/Draw' //抽奖页面
import ShowMap from '@/view/map/ShowMap' //地图

Vue.use(Router)

const router =  new Router({
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
        },{
          path: '/UserList',
          name: 'UserList',
          component: UserList
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
    },{
      path: '/UserAdd',
      name: 'UserAdd',
      component: UserAdd
    },{
      path: '/Draw',
      name: 'Draw',
      component: Draw
    } ,{
      path: '/StuAdd',
      name: 'StuAdd',
      component: StuAdd
    } ,{
      path: '/OrderList',
      name: 'OrderList',
      component: OrderList
    },{
      path: '/ShowMap',
      name: 'ShowMap',
      component: ShowMap
    }
  ]
})

function getToken(){
  let cookie = document.cookie
  let token = ''
  if(cookie.indexOf('=token') > -1){
    token = cookie.split('token=')[1].split('=token')[0]
  }
  return token
}
router.beforeEach((to, from, next) => {
  if(to.name === 'Login' || to.name==='StuAdd'|| to.name==='ShowMap' || getToken()){
    next()
  } else {
    next({
      path: '/',
  })
  }
})

export default router;