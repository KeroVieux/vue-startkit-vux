<template>
  <div>
    <div class="m-b-10"></div>
    <divider>示例</divider>
    <Sample :data="data"></Sample>
    <div class="m-b-15"></div>
    <divider>表格</divider>
    <div class="bg-white p-b-10">
      <h4 class="m-0 n p-10 fz-14 c-red">例子</h4>
      <TableDefault data=""></TableDefault>
    </div>
    <divider>组件</divider>
    <div class="m-b-10"></div>
    <SwiperComponent></SwiperComponent>
    <div class="m-b-15"></div>
  </div>
</template>
<script type="text/babel">
  import { Divider } from 'vux'
  import Sample from './elements/sample.vue'
  import TableDefault from './common/table_default.vue'
  import SwiperComponent from './elements/swiper_component.vue'
  import ApisMixins from '../assets/js/apis-mixins'

  export default{
    components: {
      Divider,
      Sample,
      TableDefault,
      SwiperComponent,
    },
    data() {
      return {
        data: null,
      }
    },
    created() {
      console.log('_', _.times(4, _.constant(0)))
      const req = () => {
        return Promise.all([this.usersList(), this.user('keroVieux')])
      }
      req().then((res) => {
        const [resA, resB] = res
        console.log('good resA', resA)
        console.log('good resB', resB)
      }).catch((error) => {
        console.log(error)
      })
    },
    mixins: [ApisMixins],
  }
</script>
