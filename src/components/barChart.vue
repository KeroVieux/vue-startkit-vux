<template>
  <div>
    <div class="po-rel">
      <div id="barContainer" class="total-charts"></div>
      <div v-show="emptyPieData" class="empty-data tx-c">
        <div>
          <img src="../images/empty-data.png" class="w-150"/>
        </div>
        <div class="fz-17 m-t-10">数据未录入</div>
      </div>
    </div>
  </div>
</template>
<script type="text/babel">

  export default {
    data () {
      return {
        emptyPieData: false,
        machineRun:[]
      }
    },
    methods: {
      buidScatterSeries() {
        // console.log('data = ',JSON.stringify(data))
        let data = this.machineRun
        let arr = []
        for(let i=0;i<data.length;i++){
          let temp = {
            name: data[i][0][7],
            data: data[i],
            type: 'scatter',
            symbolSize: function (data) {
              return Math.sqrt(data[3]) / 3
            }
          }
          arr.push(temp)
        }
        return arr
      },
      getDatas(type) {
        let arr = []
        switch (type){
          case 'area':
            _(this.machineRun).forEach((item) => {
              let areaShortName = item.region.substr(0,2)
              arr.push(areaShortName)
            })
            break;
          case 'machine':
            _(this.machineRun).forEach((item) => {
              arr.push(item.allCapacity)
            })
            break;
          case 'notStop':
            _(this.machineRun).forEach((item) => {
              arr.push(item.notStopCapacity)
            })
            break;
          case 'stop':
            _(this.machineRun).forEach((item) => {
              arr.push(item.stopCapacity)
            })
            break;
          case 'repaire':
            _(this.machineRun).forEach((item) => {
              arr.push(item.repairCapacity)
            })
            break;
          case 'normal':
            _(this.machineRun).forEach((item) => {
              arr.push(item.normalCapactivy)
            })
            break;
        }

        return arr
      },
      drawScatterPlot() {
        let self = this
        let myCharts = echarts.init(document.getElementById('barContainer'))
        myCharts.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            },
            padding: 10,
            backgroundColor: 'rgba(0,0,0,.8)',
            formatter: function(obj){
              let index = obj[0].dataIndex
              let data = self.machineRun[index]
              let str = '<div>装机总量：'+data.allCapacity+'<br>'+
                        '机组非停：'+data.notStopCapacity+'<br>'+
                        '机组调停：'+data.stopCapacity+'<br>'+
                        '机组检修：'+data.repairCapacity+'<br>'+
                        '正常运行：'+data.normalCapactivy+'</div>'
              return str
              // console.log('data = ', JSON.stringify(data))
            }
          },
          legend: {
            top: '10px',
            data: ['正常','调停','非停','检修']
          },
          grid: {
            top: '60px',
            left: '0%',
            right: '7%',
            bottom: '20px',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            // boundaryGap: [0, 0.01]
          },
          yAxis: {
            type: 'category',
            data: this.getDatas('area')
          },
          color: ['#18BC9C','#F39C12','#E74C3C','#0097E2'],
          series: [
            {
              name: '正常',
              type: 'bar',
              stack: '总量',
              data: this.getDatas('normal')
            },
            {
              name: '调停',
              type: 'bar',
              stack: '总量',
              data: this.getDatas('stop')
            },
            {
              name: '非停',
              type: 'bar',
              stack: '总量',
              data: this.getDatas('notStop')
            },
            {
              name: '检修',
              type: 'bar',
              stack: '总量',
              data: this.getDatas('repaire')
            }, 
          ]
        },true)
      }
    }
  }
</script>
