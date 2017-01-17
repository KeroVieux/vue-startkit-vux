<template>
  <div>
    <div class="machineRunTable">
      <table>
        <thead>
          <tr>
            <td class="t-head" width="32">大区</td>
            <td class="t-head">装机容量</td>
            <td class="t-head">非停{{hiddenTable.label}}</td>
            <td class="t-head">调停{{hiddenTable.label}}</td>
            <td class="t-head">检修{{hiddenTable.label}}</td>
            <td class="t-head" width="60">正常{{hiddenTable.label}}</td>
          </tr>
        </thead>
        <tbody v-show="hiddenTable.percentShow">
          <tr v-for="item in machineRun">
            <td class="tx-c">{{item.region | area}}</td>
            <td class="tx-c">{{item.allCapacity}}</td>
            <td class="tx-c">{{item.notStopScale | percent}}</td>
            <td class="tx-c">{{item.stopScale | percent}}</td>
            <td class="tx-c">{{item.repairScale | percent}}</td>
            <td class="tx-c">{{item.normalScale | percent}}</td>
          </tr>
        </tbody>
        <tbody v-show="!hiddenTable.percentShow">
          <tr v-for="item in machineRun">
            <td class="tx-c">{{item.region | area}}</td>
            <td class="tx-c">{{item.allCapacity}}</td>
            <td class="tx-c">{{item.notStopCapacity}}</td>
            <td class="tx-c">{{item.stopCapacity}}</td>
            <td class="tx-c">{{item.repairCapacity}}</td>
            <td class="tx-c">{{item.normalCapactivy}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="m-b-40 m-t-10 h-30 po-rel">
      <span class="notCenterBtn w-76 btn-pos" @click="switchTableShow">查看{{hiddenTable.title}}</span>
    </div>
  </div>
</template>
<script type="text/babel">

  export default {
    data () {
      return {
        hiddenTable: {
          percentShow: true,
          title: '容量',
          label: '比例'
        },
        machineRun: []
      }
    },
    methods: {
      switchTableShow() {
        if(this.hiddenTable.percentShow){
          this.hiddenTable.title = '比例'
          this.hiddenTable.label = '容量'
        }else{
          this.hiddenTable.title = '容量'
          this.hiddenTable.label = '比例'
        }
        this.hiddenTable.percentShow = !this.hiddenTable.percentShow
      },
    }
  }
</script>