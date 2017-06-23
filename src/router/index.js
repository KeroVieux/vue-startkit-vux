import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Tables',
      component(resolve) {
        require(['@/components/Hello'], resolve)
      },
    },
    {
      path: '/hello',
      name: 'Hello',
      component(resolve) {
        require(['@/components/tables'], resolve)
      },
    },
  ],
})
