import axios from 'axios'
import Moment from 'moment'
import Vue from 'vue'
import { ToastPlugin, AlertPlugin, ConfirmPlugin, LoadingPlugin } from 'vux'
import 'vue2-animate/src/vue2-animate.less'
import './assets/sass/screen.scss'
import App from './App'
import router from './router'
import store from './vuex/store'
import Config from './assets/config/arguments.config'

const _ = require('lodash')

const currentEnv = Config.dev

Moment.locale('zh-CN')

_.assign(window, {
  _,
  Vue,
  store,
  Moment,
  axios,
  currentEnv,
})

axios.defaults.baseURL = currentEnv.apiUrl
Vue.config.devtools = currentEnv.testingMode
Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
Vue.use(LoadingPlugin)
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App },
})

