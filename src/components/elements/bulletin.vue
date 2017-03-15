<template>
  <card :header="{title:'我的钱包'}">
    <div slot="content" class="">
      <grid>
        <grid-item label="循环" v-for="i in 9" :key="i">
          <img slot="icon" src="../../assets/images/logo.jpg">
        </grid-item>
        <grid-item link="/component/cell" label="自定义1">
          <img slot="icon" src="../../assets/images/logo.jpg">
        </grid-item>
        <grid-item :link="{ path: '/component/cell'}" label="自定义2">
          <img slot="icon" src="../../assets/images/logo.jpg">
        </grid-item>
        <grid-item link="/component/cell" @on-item-click="onItemClick">
          <img slot="icon" src="../../assets/images/logo.jpg">
          <span slot="label">自定义3</span>
        </grid-item>
      </grid>
    </div>
  </card>
</template>
<script type="text/babel">
  import { Divider, Card, Grid, GridItem } from 'vux'

  export default{
    components: {
      Divider,
      Card,
      Grid,
      GridItem,
    },
    props: ['data'],
    data() {
      return {
        header: {
          title: '重点事项',
        },
      }
    },
    methods: {
      onItemClick() {
        console.log('1111')
      },
    },
  }
</script>
