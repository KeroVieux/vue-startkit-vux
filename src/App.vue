<template>
  <div id="app">
    <PageHeader></PageHeader>
    <div class="p-t-30"></div>
    <div class="p-t-20"></div>
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
  @import url('assets/css/theme.css');
  @import url('assets/css/font-awesome/css/font-awesome.css');
  @import url('assets/css/screen.css');
</style>
<script type="text/babel">
  import PageHeader from './components/page-header.vue'
  import ApiMixin from './assets/js/apis-mixins'

  export default {
    name: 'app',
    components: {
      PageHeader,
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
