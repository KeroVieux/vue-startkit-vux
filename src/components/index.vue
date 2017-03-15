<template>
  <div>
    <div class="m-b-10"></div>
    <divider>重点事项</divider>
    <Bulletin :data="data"></Bulletin>
    <div class="m-b-15"></div>
    <divider>发电量总览</divider>
    <div class="bg-white p-b-10">
      <h4 class="m-0 n p-10 fz-14 c-red">火电</h4>
      <TableDefault data=""></TableDefault>
    </div>
    <div class="m-b-15"></div>
    <div class="bg-white p-b-10">
      <h4 class="m-0 n p-10 fz-14 c-green">新能源</h4>
      <TableDefault data=""></TableDefault>
    </div>
    <div class="m-b-15"></div>
    <divider>异常机组总览</divider>
    <div class="m-b-10"></div>
    <MachinesError></MachinesError>
    <div class="m-b-15"></div>
  </div>
</template>
<script type="text/babel">
  import { Divider } from 'vux'
  import Bulletin from './elements/bulletin.vue'
  import TableDefault from './common/table_default.vue'
  import MachinesError from './elements/machines_error.vue'

  export default{
    components: {
      Divider,
      Bulletin,
      TableDefault,
      MachinesError,
    },
    data() {
      return {
        data: null,
      }
    },
  }
</script>
