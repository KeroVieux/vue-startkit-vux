/**
 * Created by PetitKero on 27/9/2016.
 */
/**
 * The map for this entire project .
 * @module routes
 * @requires ./components/elements/error.vue
 * @requires ./components/elements/upload-panel.vue
 */
import Foo from './components/foo.vue'
import Bar from './components/bar.vue'
import PageError from './components/page-error.vue'

export default [
  {
    path: '/bar',
    component: Bar,
    name:'Bar'
  },
  {
    path: '/foo',
    component: Foo,
    name:'Foo'
  },
  {
    path: '*',
    component: PageError,
    name:'PageError'
  }
]
