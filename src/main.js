import axios from 'axios'
import Moment from 'moment'
import Vue from 'vue'
import { ToastPlugin, AlertPlugin, ConfirmPlugin, LoadingPlugin } from 'vux'
import _ from 'lodash'
import LocalForage from 'localforage'
import 'vue2-animate/src/vue2-animate.less'
import './assets/sass/screen.scss'
import App from './App'
import router from './router'
import store from './vuex/store'
import fnMixin from './assets/js/fn-mixins'
import Config from './assets/config/arguments.config'
import ConsoleTrigger from './assets/config/consoleTrigger'

const currentEnv = Config.dev

Moment.locale('zh-CN')
LocalForage.setDriver(LocalForage.LOCALSTORAGE)
if (currentEnv.DEBUG || fnMixin.methods.urlParam('console') === 'true') {
  if ((/micromessenger/i).test(navigator.userAgent)) {
    require('vconsole/dist/vconsole.min')
  }
  Vue.config.devtools = true
} else {
  Vue.config.devtools = false
  ConsoleTrigger(false)
}

_.assign(Vue.prototype, {
  _,
  Moment,
  currentEnv,
})

_.assign(window, {
  _,
  Vue,
  store,
  Moment,
  axios,
  LocalForage,
  currentEnv,
})

axios.defaults.baseURL = currentEnv.wxServer
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

router.beforeEach((to, from, next) => {
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
  next()
})

