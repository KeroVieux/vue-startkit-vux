<template>
  <div>
    <div class="m-t-10 m-b-10 m-l-5 m-r-5">
      <table class="data-table">
        <thead>
          <tr>
            <td>区域</td>
            <td>项目公司</td>
            <td>机组</td>
            <td>容量（MW）</td>
          </tr>
        </thead>
        <tbody>
          <tr v-show="abnormalShow">
            <td colspan="4" height="40">{{emptyTips}}</td>
          </tr>
          <template v-for="data in abnormalData">
            <template v-for="(item,index) in data.data">
              <tr v-if="index == 0">
                <td :rowspan="data.data.length">{{data.region | area}}</td>
                <td>{{item.entity}}</td>
                <td>{{item.unit}}</td>
                <td>{{item.capacity}}</td>
              </tr>
              <tr v-else>
                <td>{{item.entity}}</td>
                <td>{{item.unit}}</td>
                <td>{{item.capacity}}</td>
              </tr>
            </template>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script type="text/babel">

  export default {
    data () {
      return {
        emptyTips: '无非停机组',
        abnormalData: [],
        abnormalShow: false
      }
    },
    watch: {
      "abnormalData"() {
        if(this.abnormalData.length == 0){
          this.abnormalShow = true
        }else{
          this.abnormalShow = false
        }
      }
    }
  }
</script>