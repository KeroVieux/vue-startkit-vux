<template>
  <div id="app">
    <PageHeader></PageHeader>
    <div class="p-t-30"></div>
    <div class="p-t-20"></div>
    <img src="./assets/logo.png">
    <h1>{{ msg }}</h1>
    <transition name="fade-fast">
      <router-view></router-view>
    </transition>
  </div>
</template>
<style>
  @import url('assets/css/theme.css');
  @import url('assets/css/font-awesome/css/font-awesome.css');
  @import url('assets/css/screen.css');
</style>
<script type="text/babel">
  import PageHeader from './components/page-header.vue'
  export default {
    name: 'app',
    components: {
      PageHeader
    },
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>
