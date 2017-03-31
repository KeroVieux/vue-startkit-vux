<template>
  <card :header="{title:'功能展示'}">
    <div slot="content" class="">
      <transition
          name="bounceRight"
      >
        <p v-if="show">hello</p>
      </transition>
      <grid>
        <grid-item link="/bar" label="slots使用">
          <img slot="icon" src="../../assets/images/logo.jpg">
        </grid-item>
        <grid-item :link="{ path: '/404'}" label="404页面">
          <img slot="icon" src="../../assets/images/logo.jpg">
        </grid-item>
        <grid-item @on-item-click="onItemClick">
          <img slot="icon" src="../../assets/images/logo.jpg">
          <span slot="label"><i class="fa fa-hand-grab-o"></i>点击事件</span>
        </grid-item>
        <grid-item label="循环" v-for="i in 6" :key="i">
          <img slot="icon" src="../../assets/images/logo.jpg">
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
        show: false,
      }
    },
    methods: {
      onItemClick() {
        this.show = !this.show
        this.$vux.toast.show({
          type: 'text',
          text: '被戳了一下',
        })
        console.log('1111')
      },
    },
  }
</script>
