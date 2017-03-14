<template>
  <div id="app">
    <!--<PageHeader></PageHeader>-->
    <div class="p-t-30"></div>
    <div class="p-t-20"></div>
    <group>
      <cell title="title" value="value"></cell>
    </group>
    <img src="./assets/logo.jpg" />
    <h1>{{ msg }}</h1>
    <p><router-link to="bar">go to bar</router-link></p>
    <p><router-link to="foo">go to foo</router-link></p>
    <transition name="fade-fast">
      <router-view></router-view>
    </transition>
  </div>
</template>
<style>
  @import '../src/assets/sass/screen.css';
</style>
<style lang="less">
  @import '~vux/src/styles/reset';
</style>
<script type="text/babel">
  import { Group, Cell } from 'vux'
  import PageHeader from './components/page-header.vue'
  import ApiMixin from './assets/js/apis-mixins'

  export default {
    name: 'app',
    components: {
      PageHeader,
      Group,
      Cell,
    },
    data() {
      return {
        msg: 'gogogo',
      }
    },
    created() {
      this.comment().then((res) => {
        console.log('test api', res)
      })
    },
    mixins: [ApiMixin],
  }
</script>
