<template>
  <div>
    <x-header :right-options="{showMore: true}" @on-click-more="showMenus = true" style="width:100%;position:fixed;left:0;top:0;z-index:100;">
      开始开发
    </x-header>
    <actionsheet :menus="acMenus" v-model="showMenus" show-cancel></actionsheet>
  </div>
</template>
<script type="text/babel">
  import { XHeader, Actionsheet } from 'vux'

  export default{
    components: {
      XHeader,
      Actionsheet,
    },
    data() {
      return {
        pathName: null,
        acMenus: {
          menu1: 'Take Photo',
          menu2: 'Choose from photos',
        },
        showMenus: false,
      }
    },
    computed: {
      currentPath() {
        return this.$route.path
      },
      pageTitle() {
        this.pathName = this.$route.name
        switch (this.pathName) {
          case 'Bar':
            return 'Bar'
          default:
            return '顶部组件'
        }
      },
    },
    methods: {
      closeApp() {
        location.href = 'xmppapi:localservice?closeWindow'
      },
      handleBack() {
        history.back()
      },
    },
  }
</script>
