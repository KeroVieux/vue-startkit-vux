<template>
  <div>
    <mt-header fixed :title="pageTitle">
      <span slot="left">
        <mt-button icon="back" @click.native="handleBack" v-show="currentPath !== '/'">返回</mt-button>
        <span class="p-l-10" @click="closeApp" v-show="currentPath == '/'">
          关闭
        </span>
      </span>
    </mt-header>
  </div>
</template>
<script type="text/babel">
  export default{
    components: {

    },
    data() {
      return {
        pageTitle: '顶部组件',
        pathName: null,
      }
    },
    computed: {
      currentPath() {
        return window.store.state.route.path
      },
      pageTitle() {
        this.pathName = window.store.state.route.name
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
