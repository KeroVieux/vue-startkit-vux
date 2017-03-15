/**
 * Created by PetitKero on 27/9/2016.
 */
/**
 * The map for this entire project .
 * @module routes
 */
import Foo from './components/foo.vue'
import Bar from './components/bar.vue'
import Index from './components/index.vue'
import PageError from './components/common/page_error.vue'

export default [
  {
    path: '/bar',
    component: Bar,
    name: 'Bar',
  },
  {
    path: '/foo',
    component: Foo,
    name: 'Foo',
  },
  {
    path: '/',
    component: Index,
    name: 'Index',
  },
  {
    path: '*',
    component: PageError,
    name: 'PageError',
  },
]
