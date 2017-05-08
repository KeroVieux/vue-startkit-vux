import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Tables from '@/components/tables'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Tables',
      component: Tables,
    },
    {
      path: '/hello',
      name: 'Hello',
      component: Hello,
    },
  ],
})
