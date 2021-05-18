// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueRouter from 'vue-router'
import ViewUI from 'view-design'
import api from './request/api'
import Vant from 'vant';
import 'view-design/dist/styles/iview.css'
import './styles/index.scss'
import './utils/rem'
import filter from './utils/filter'
import meta from './utils/meta'
import searchMessage from './utils/searchMessage'
import BaiduMap from 'vue-baidu-map'
import alert from './utils/alert'
import store from './store'
import 'vant/lib/index.css';

Vue.use(Vant);
Vue.use(BaiduMap, {
  ak: '1CkwlLgmiB8wQkEDfSozBCYQWHO3yGwo'
})
Vue.use(ViewUI)

// 侧边栏点击多次报错，冗余导航
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.config.productionTip = false
Vue.prototype.$api = api
Vue.prototype.$filter = filter
Vue.prototype.$meta = meta
Vue.prototype.$searchMessage = searchMessage
Vue.prototype.$alert = alert

/* eslint-disable no-new */
var vue = new Vue({
  el: '#app',
  router,
  store:store,
  components: { App },
  template: '<App/>'
})

export default vue
