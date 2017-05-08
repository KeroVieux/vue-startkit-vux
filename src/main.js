import axios from 'axios'
import Moment from 'moment'
import Vue from 'vue'
import { ToastPlugin, AlertPlugin, ConfirmPlugin, LoadingPlugin } from 'vux'
import 'vue2-animate/src/vue2-animate.less'
import './assets/sass/screen.scss'
import App from './App'
import router from './router'
import store from './vuex/store'
// import Config from './assets/config/arguments.config'

const _ = require('lodash')

Moment.locale('zh-CN')

_.assign(window, {
  _,
  Vue,
  store,
  Moment,
  axios,
  rtpToken: null,
  userToken: null,
  currentUser: null,
})

// axios.defaults.baseURL = Config.dev.apiUrl
axios.defaults.baseURL = 'https://api.github.com'
Vue.config.devtools = true
Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
Vue.use(LoadingPlugin)
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
})

