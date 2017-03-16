<template>
  <div>
    <card :header="{title:'卡片内容展示'}">
      <div slot="content" class="p-15 fz-14">
        <slot name="article">无内容</slot>
      </div>
    </card>
  </div>
</template>
<script type="text/babel">
  import { Card } from 'vux'

  export default{
    components: {
      Card,
    },
    data() {
      return {
        data: null,
      }
    },
  }
</script>
