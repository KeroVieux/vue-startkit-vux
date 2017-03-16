/**
 * Created by PetitKero on 27/9/2016.
 */
/**
 * The map for this entire project .
 * @module routes
 */

export default [
  {
    path: '/bar',
    component(resolve) {
      require(['./components/bar.vue'], resolve)
    },
    name: 'Bar',
  },
  {
    path: '/foo',
    component(resolve) {
      require(['./components/foo.vue'], resolve)
    },
    name: 'Foo',
  },
  {
    path: '/',
    component(resolve) {
      require(['./components/index.vue'], resolve)
    },
    name: 'Index',
  },
  {
    path: '*',
    component(resolve) {
      require(['./components/common/page_error.vue'], resolve)
    },
    name: 'PageError',
  },
]
