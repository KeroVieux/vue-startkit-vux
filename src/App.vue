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
<!--suppress CssUnknownTarget -->
<style lang="less">
  @import '~vux/src/styles/reset';
</style>
<script type="text/babel">
  import PageHeader from './components/common/page_header.vue'

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
  }
</script>
