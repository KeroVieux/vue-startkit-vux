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
    data(){
      return {
        pageTitle:'发送消息',
        pathName:null
      }
    },
    computed: {
      currentPath() {
        return store.state.route.path
      },
      pageTitle() {
        this.pathName = store.state.route.name
        switch (this.pathName) {
          case 'Results':
            return '发送结果'
            break
          default:
            return '发送消息'
        }
      }
    },
    methods: {
      closeApp() {
        location.href = "xmppapi:localservice?closeWindow"
      },
      handleBack() {
        history.back()
      }
    },
    created() {

    }
  }
</script>