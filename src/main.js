/**
 * @file Make this project worked .
 * @author Dino Chiu <bigboss@hidoge.cn>
 * @requires Vue
 * @requires VueRouter
 * @requires VeeValidate
 * @requires Moment
 * @requires ./vuex/store
 * @requires vuex-router-sync.sync
 * @requires ./routes
 * @requires ./App.vue
 */
import axios from 'axios'
import Vue from 'vue'
import { ToastPlugin, AlertPlugin, ConfirmPlugin, LoadingPlugin } from 'vux'
import VueRouter from 'vue-router'
import Moment from 'moment'
import { sync } from 'vuex-router-sync'
import store from './vuex/store'
import routes from './routes'
import App from './App.vue'

const _ = require('lodash')

Moment.locale('zh-CN')

_.assign(window, {
  Vue,
  store,
  Moment,
  axios,
})
Vue.use(VueRouter)
Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
Vue.use(LoadingPlugin)

axios.defaults.baseURL = 'https://api.github.com'
const router = new VueRouter({
  // mode: 'history',
  routes,
})
sync(store, router)
_.assign(window, {
  router,
})
Vue.config.devtools = true
const app = new Vue({
  store,
  router,
  render: (h) => { return h(App) },
}).$mount('App')
_.assign(window, {
  app,
})

