import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import VeeValidate from 'vee-validate'
import VeeValidateCn from './assets/js/validate-zh'

import Mint from 'mint-ui'
import store from './vuex/store'
import { sync } from 'vuex-router-sync'
import { Toast,Indicator } from 'mint-ui'
import routes from './routes'
import App from './App.vue'

import Moment from 'moment'
Moment.locale('zh-CN')

const _ = require('lodash')
window.Vue = Vue
window.store = store
window.Moment = Moment
window.Toast = Toast
window.Indicator = Indicator
window.userToken = null
window.currentUser = null
const urlParamToObj = function() {
  let fn, item, j, len, p, sear, u
  if (location.search) {
    u = location.search
  } else {
    u = location.href;
    u = u.slice(0, u.indexOf("#"))
  }
  p = {}
  if (-1 !== u.indexOf("?")) {
    sear = u.slice(u.indexOf("?") + 1).split("&")
    fn = function(item) {
      let s
      s = item.split("=")
      return p[s[0]] = s[1]
    }
    for (j = 0, len = sear.length; j < len; j++) {
      item = sear[j]
      fn(item)
    }
  }
  return p;
}
const xhr = new XMLHttpRequest()
let rtp = null
if (urlParamToObj().rtp_token) {
  rtp = urlParamToObj().rtp_token
} else if(location.href.indexOf("rtp_token=") !== -1){
  let str = location.href
  rtp = str.substring(str.indexOf("rtp_token=") + 10,str.length)
}
//xhr.open('post',`${globalArg.apiUrl}/api/users/auth/sso`,false)
//xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded')
//console.log('发送的rtp',rtp)
//xhr.send(`rtp_token=${rtp}`)
//if (xhr.readyState == 4) {
//  if (xhr.status == 200) {
//    let res = JSON.parse(xhr.response)
//    window.userToken = res.authorization
//    window.currentUser = res.result
//  }
//}
//console.log('当前用户',currentUser)
Vue.use(Mint)
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(VeeValidate,{
  locale:'zh_CN',
  dictionary:{
    zh_CN:{
      messages:VeeValidateCn
    }
  }
})
////noinspection JSUnresolvedVariable
//Vue.http.options.root = globalArg.apiUrl
////Vue.http.options.timeout = 10000
//Vue.http.headers.common['authorization'] = window.userToken


const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition
  } else {
    const position = {}
    if (to.hash) {
      position.selector = to.hash
    }
    if (to.matched.some(m => m.meta.scrollToTop)) {
      position.x = 0
      position.y = 0
    }
    return position
  }
}
const router = new VueRouter({
  //mode: 'history',
  scrollBehavior,
  routes
})

window.router = router
sync(store, router)

Vue.config.devtools = true

new Vue({
  store,
  router,
  el: 'App',
  render: h => h(App)
})