<template>
  <div id="app">
    <PageHeader></PageHeader>
    <div class="p-t-30"></div>
    <div class="p-t-10"></div>
    <transition name="fade-fast">
      <router-view></router-view>
    </transition>
  </div>
</template>
<style>
  @import '../src/assets/sass/screen.css';
</style>
<!--suppress CssUnknownTarget -->
<style lang="less">
  @import '~vux/src/styles/reset';
</style>
<script type="text/babel">
  import PageHeader from './components/common/page_header.vue'
  import ApiMixin from './assets/js/apis-mixins'

  export default {
    name: 'app',
    components: {
      PageHeader,
    },
    data() {
      return {
        data: null,
      }
    },
    created() {
      this.comment().then((res) => {
        console.log('test api', res)
        this.data = res
      })
    },
    mixins: [ApiMixin],
  }
</script>
