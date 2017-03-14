/**
 * @file Make this project worked .
 * @author Dino Chiu <bigboss@hidoge.cn>
 * @requires Vue
 * @requires VueRouter
 * @requires VeeValidate
 * @requires Moment
 * @requires ./assets/js/validate-zh
 * @requires ./vuex/store
 * @requires vuex-router-sync.sync
 * @requires ./routes
 * @requires ./App.vue
 */
// /* eslint-disable */
import axios from 'axios'
import Vue from 'vue'
import VueRouter from 'vue-router'
import VeeValidate from 'vee-validate'
import Moment from 'moment'
import { sync } from 'vuex-router-sync'
import VeeValidateCn from './assets/js/validate-zh'
import fnMixin from './assets/js/fn-mixins'
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
  rtpToken: null,
  userToken: null,
  currentUser: null,
})
const vueInit = () => {
  Vue.use(VueRouter)
  Vue.use(VeeValidate, {
    locale: 'zh_CN',
    dictionary: {
      zh_CN: {
        messages: VeeValidateCn,
      },
    },
  })

  // axios.defaults.baseURL = globalArg.apiUrl
  // axios.defaults.headers.common['authorization'] = window.userToken || ''
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
}
if (fnMixin.methods.urlParamToObj().rtp_token) {
  window.rtpToken = fnMixin.methods.urlParamToObj().rtp_token
} else if (location.href.indexOf('rtp_token=') !== -1) {
  const str = location.href
  window.rtpToken = str.substring(str.indexOf('rtp_token=') + 10, str.length)
}
if (window.rtpToken) {
  axios.post(`${window.globalArg.apiUrl}/api/users/auth/sso`, { rtp_token: window.rtpToken }).then((response) => {
    console.log('登录成功', response)
    if (response.data.status === 200) {
      window.userToken = response.data.authorization
      window.currentUser = response.data.result
    } else {
      console.log('请登录', response.data.status)
    }
    vueInit()
  }).catch((error) => {
    console.log(error)
    vueInit()
  })
} else {
  vueInit()
}

