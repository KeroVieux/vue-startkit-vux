<template>
  <div>
    <div class="data-container m-t-10 p-8">
      <div class="po-rel">
        <span class="fz-17">总体机组运行情况</span>
        <span class="top-right-tx" style="top:0px">单位：MW</span>
        <!-- <div class="pie-chart-mask"></div> -->
      </div>
      <div class="po-rel">
        <div id="main" class="total-charts"></div>
        <div v-show="emptyPieData" class="empty-data tx-c">
          <div>
            <img src="../images/empty-data.png" class="w-150"/>
          </div>
          <div class="fz-17 m-t-10">数据未录入</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/babel">

  export default {
    data () {
      return {
        emptyPieData: false,
        machineAll: [],
        colors: ['#18BC9C','#F39C12','#E74C3C','#0097E2']
      }
    },
    methods: {
      getColors(type) {
        switch (type){
          case '正常运行':
            return this.colors[0]
            break
          case '机组调停':
            return this.colors[1]
            break
          case '机组非停':
            return this.colors[2]
            break
          case '机组检修':
            return this.colors[3]
            break
        }
      },
      getPieItems() {
        let array = []
        if(this.machineAll.normalMachineNum != 0){
          array.push('正常运行')
        }
        if(this.machineAll.stopMachineNum != 0){
          array.push('机组调停')
        }
        if(this.machineAll.notStopMachineNum != 0){
          array.push('机组非停')
        }
        if(this.machineAll.repairMachineNum != 0){
          array.push('机组检修')
        }
        return array
      },
      getPieData(data) {
        let array = []
        if(this.machineAll.normalMachineNum != 0){
          array.push(data.normal)
        }
        if(this.machineAll.stopMachineNum != 0){
          array.push(data.stop)
        }
        if(this.machineAll.notStopMachineNum != 0){
          array.push(data.notStop)
        }
        if(this.machineAll.repairMachineNum != 0){
          array.push(data.repair)
        }
        return array
      },
      drawPieChart() {
        let self = this
        let myCharts = echarts.init(document.getElementById('main'))

        let normalMachineNum = this.machineAll.normalMachineNum
        let stopMachineNum = this.machineAll.stopMachineNum
        let notStopMachineNum = this.machineAll.notStopMachineNum
        let repairMachineNum = this.machineAll.repairMachineNum

        let normalPercent = normalMachineNum * 100 / (normalMachineNum+stopMachineNum+notStopMachineNum+repairMachineNum)
        let stopPercent = stopMachineNum * 100 / (normalMachineNum+stopMachineNum+notStopMachineNum+repairMachineNum)
        let notStopPercent = notStopMachineNum * 100 / (normalMachineNum+stopMachineNum+notStopMachineNum+repairMachineNum)
        let repairPercent = repairMachineNum * 100 / (normalMachineNum+stopMachineNum+notStopMachineNum+repairMachineNum)

        let pieInner = {
          normal: {value:normalPercent, name:'正常运行', type:'正常运行'},
          stop: {value:stopPercent, name:'机组调停', type:'机组调停'},
          notStop: {value:notStopPercent, name:'机组非停', type:'机组非停'},
          repair: {value:repairPercent, name:'机组检修', type:'机组检修'}
        }

        let pieOutter = {
          normal: {value:this.machineAll.normalMachineNum, name:this.machineAll.normalMachineNum, type:'正常运行'},
          stop: {value:this.machineAll.stopMachineNum, name:this.machineAll.stopMachineNum, type:'机组调停'},
          notStop: {value:this.machineAll.notStopMachineNum, name:this.machineAll.notStopMachineNum, type:'机组非停'},
          repair: {value:this.machineAll.repairMachineNum, name:this.machineAll.repairMachineNum, type:'机组检修'}
        }

        myCharts.setOption({
          tooltip: {
            trigger: 'item',
            triggerOn: 'click',
            position: 'inside',
            formatter: function(params) {
              let string = ''
              let ret = null
              if(params.seriesIndex == 0){
                string = '占总体机组'
                ret = params.percent+'%'
              }else{
                string = '容量为'
                ret = params.data.value
              }
              let title = params.data.type
              return title+string+ret
            }
          },
          legend: {
            orient: 'horizontal',
            y: 'bottom',
            selectedMode: false,
            data: this.getPieItems()
          },
          series: [
            {
              type:'pie',
              selectedMode: 'single',
              radius: [0, '30%'],
              label: {
                normal: {
                  position: 'inner'
                }
              },
              selectedMode:'single',
              data: this.getPieData(pieInner),
              itemStyle:{
                normal:{
                  color (params){
                    return self.getColors(params.name)
                  },
                  label:{
                    normal: {
                      position: 'inner',
                      show: true,
                    },
                    formatter: '{d}%'
                  },
                  labelLine :{
                    show:false
                  }
                },
              }
            },
            {
              type:'pie',
              radius: ['45%', '65%'],
              label: {
                normal: {
                  position: 'inner'
                }
              },
              selectedMode:'single',
              data: this.getPieData(pieOutter),
              itemStyle:{
                normal:{
                  color (params){
                    return self.getColors(params.data.type)
                  }
                },
              }
            }
          ],
          textStyle: {
            color: '#333'
          }
        })
      },
    }
  }
</script>
