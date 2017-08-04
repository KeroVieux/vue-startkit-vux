<template>
  <div>
    <div class="m-b-30"></div>
    <div class="m-b-10 c-g9 tc">
      <flexbox>
        <flexbox-item></flexbox-item>
        <flexbox-item><img src="http://img.hidoge.cn/crp/error.png" alt="" class="max-100"></flexbox-item>
        <flexbox-item></flexbox-item>
      </flexbox>
      <div class="p-t-10"></div>
      {{errorText}}
    </div>
  </div>
</template>
<script>
  import { Flexbox, FlexboxItem } from 'vux'

  export default{
    components: {
      Flexbox,
      FlexboxItem,
    },
    computed: {
      errorText() {
        return this.$store.getters.temporaryData || '发生了错误...'
      },
    },
  }
</script>
