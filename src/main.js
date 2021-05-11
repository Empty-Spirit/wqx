// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueRouter from 'vue-router'
import ViewUI from 'view-design'
import api from './request/api'
import 'view-design/dist/styles/iview.css'
import './styles/index.scss'
import './utils/rem'
import filter from './utils/filter'
import searchMessage from './utils/searchMessage'
import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap, {
  ak: '1CkwlLgmiB8wQkEDfSozBCYQWHO3yGwo'
})

// 侧边栏点击多次报错，冗余导航
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.config.productionTip = false
Vue.prototype.$api = api
Vue.prototype.$filter = filter
Vue.prototype.$searchMessage = searchMessage
Vue.use(ViewUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
