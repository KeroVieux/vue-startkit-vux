<template>
  <div>
    <div v-show="normal">
      <div v-show="!tableShow">
        <!-- 顶部搜索栏 -->
        <!-- <div class="header bg-deep-blue p-t-8 p-b-8">
          <div class="search bg-light-blue m-l-10 m-r-10 c-white" @click="openDatePicker">
            <i class="fa fa-search" aria-hidden="true"></i>
            <b>{{dateValue}}</b>
          </div>
          <mt-datetime-picker
            ref="datePicker"
            type="date"
            :startDate="minDate"
            :endDate="maxDate"
            v-model="pickerValue"
            @confirm="onDateChange">
          </mt-datetime-picker>
        </div> -->

        <!-- title -->
        <div class="fz-17 tx-c m-t-10 m-b-10">{{dateValue}} 生产信息</div>

        <!-- 主体内容 -->
        <div class="p-8">
          <div class="data-container">
            <!-- 重点事项 -->
            <div class="p-8 bor-b-com">
              <div class="fz-17 m-b-5">重点事项（{{titleList.length}}）</div>
              <div class="p-t-5 fz-12" v-for="msg in titleListShow">
                {{msg}}
              </div>
              <div v-show="moreBtnShow" class="btn w-105 m-t-10 m-b-5" @click="showMoreImportantItems">{{btnText}}</div>
            </div>
            <!-- 发电量 -->
            <div class="p-8 po-rel">
              <span class="fz-17">发电量总览</span>
              <span class="top-right-tx">单位：亿kWh</span>
            </div>
            <div class="m-l-10 m-r-10">              
              <template v-for="data in generation">      
                <div class="">{{data.entity}}</div>
                <div class="m-t-10 m-b-10 m-l-5 m-r-5">
                  <table class="data-table">
                    <thead>
                      <tr>
                        <td></td>
                        <td>今年</td>
                        <td>去年同期</td>
                        <td>同比</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in data.data">
                        <td>{{item.item}}</td>
                        <td>{{item.thisYear | saveFloat}}</td>
                        <td>{{item.lastYear | saveFloat}}</td>
                        <td>{{item.increase | percent}}</td>
                        <!-- <td v-if="item.increase > 0" class="elect-increase">
                          {{item.increase | percent}}
                        </td>
                        <td v-else class="elect-decrease">
                          {{item.increase | percent}}
                        </td> -->
                      </tr>
                    </tbody>
                  </table>
                </div>
              </template>
            </div>
          </div>
          <div class="data-container m-t-10">
            <div class="m-t-10 m-l-10 fz-17">异常机组总览</div>
            <div class="m-t-10 m-l-10 m-r-10">
              <div class="inline c-lightGray" :class="{'bor-b-deepBlue c-deepBlue': machineTableShowType.notStopShow }" @click="openMachineTable('notStop')">非停机组({{notStopDataNum}})</div>
              <div class="inline c-lightGray" :class="{'bor-b-deepBlue c-deepBlue': machineTableShowType.stopShow }" @click="openMachineTable('stop')">调停机组({{stopDataNum}})</div>
              <div class="inline c-lightGray" :class="{'bor-b-deepBlue c-deepBlue': machineTableShowType.repairShow }" @click="openMachineTable('repair')">检修机组({{repairDataNum}})</div>
            </div>
            <!-- 异常数据表格组件 -->
            <abnormalTable ref="abnormalTable"></abnormalTable>
          </div>
          <!-- 饼图组件 -->
          <pieChart ref="pieChart"></pieChart>
          <div class="data-container m-t-10">
            <div class="p-5">
              <!-- 柱状图组件 -->
              <div class="po-rel">
                <span class="fz-17">各大区机组运行情况</span>
                <span class="top-right-tx" style="top:0px">单位：MW</span>
              </div>

              <mt-navbar v-model="selected">
                <mt-tab-item id="1">柱状图</mt-tab-item>
                <mt-tab-item id="2">数据表格</mt-tab-item>
              </mt-navbar>

              <!-- tab-container -->
              <mt-tab-container v-model="selected">
                <mt-tab-container-item id="1">
                  <barChart ref="barChart"></barChart>
                </mt-tab-container-item>
                <mt-tab-container-item id="2">
                  <machineRunTable ref="machineRunTable"></machineRunTable>
                </mt-tab-container-item>
              </mt-tab-container>

            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="tx-c p-t-20" v-show="unnormal">
      <div>
        <img class="w-150" src="../images/warn.svg"/>
      </div>
      <div class="m-t-10 fz-17">{{errorTips}}</div>
    </div>
  </div>
</template>
<style>
  @import url('../css/theme.css');
  @import url('../css/global.css');
  @import url('../css/screen.css');
  @import url('../css/font-awesome/css/font-awesome.css');
</style>
<script type="text/babel">

  import { DatetimePicker,Indicator,MessageBox,Navbar,TabItem,TabContainer, TabContainerItem } from 'mint-ui'
  import apiMethods from '../assets/api'
  import pieChart from './pieChart.vue'
  import barChart from './barChart.vue'
  import abnormalTable from './abnormalTable.vue'
  import machineRunTable from './machineRunTable.vue'

  export default {
    data () {
      return {
        selected: "1",
        normal: false,
        unnormal: false,
        tableShow: false,
        moreBtnShow: false,
        pickerValue: '',
        dateValue:'',
        maxDate: null,
        timestamp:'',
        generation: [],
        machineRun: [],
        machineTable: {},
        machineTableShowType: {
          notStopShow: true,
          stopShow: false,
          repairShow: false,          
        },
        repairDataNum: 0,
        stopDataNum: 0,
        notStopDataNum: 0,
        daySecond: 86400,
        titleList:[],
        titleListShow:[],
        titleListPart:[],
        hideItems: true,
        btnText: '查看更多事项',
        timeParams:null,
        errorTips:''
      }
    },
    methods: {
      getToken() {
        return this.$route.query.rtp_token
      },
      getRouterDate() {
        return this.$route.params
      },
      combineData(entity) {
        let thisYear = Moment().year()
        let array = []
        let dayData = {"item":"当日"}
        let monthData = {"item":"月累"}
        let yearData = {"item":"年累"}
        _(entity).forEach((item) => {
          if(item){
            if(item.year == thisYear){
              dayData.thisYear = item.daily_generation
              monthData.thisYear = item.mtd_generation
              yearData.thisYear = item.ytd_generation
            }else{
              dayData.lastYear = item.daily_generation
              monthData.lastYear = item.mtd_generation
              yearData.lastYear = item.ytd_generation
            }
          }
        })
        dayData.increase = dayData.thisYear / dayData.lastYear
        monthData.increase = monthData.thisYear / monthData.lastYear
        yearData.increase = yearData.thisYear / yearData.lastYear
        array.push(dayData)
        array.push(monthData)
        array.push(yearData)
        return array
      },
      getGenerationTranscript(data) {
        let energy = []
        let fire = []
        _(data).forEach((item) => {
          let energyTemp = _(item).find({'entity':'新能源'})
          let fireTemp = _(item).find({'entity':'火电'})
          energy.push(energyTemp)
          fire.push(fireTemp)
        })
        let energyData = this.combineData(energy)
        let fireData = this.combineData(fire)

        let completeGeneration = [
          {"entity":"火电",data:fireData},
          {"entity":"新能源",data:energyData}
        ]
        return completeGeneration
      },
      getMachineTable(data) {
        let array = []    
        let obj = {         // 大区对象
          data: []          // 机组数据
        }
        _(data).forEach((item, key) => {
          if(key == 0){
            obj.region = item.region
          }else{
            if(item.region != data[key-1].region){
              array.push(obj)
              obj = {
                data: []
              }
              obj.region = item.region
            }
          }
          let temp = {
            entity: item.entity,
            unit: item.unit,
            capacity: item.capacity
          }
          obj.data.push(temp)
          if(key == data.length - 1){
            array.push(obj)
          }
        })
        return array
      },
      onDateChange() {
        this.resetData()
        this.dateValue = Moment(this.pickerValue).format('YYYY-MM-DD')
        this.timestamp = Moment(this.pickerValue).valueOf()
        this.drawEcharts()
        console.log('timestamp = ' ,this.timestamp)
      },
      // openDatePicker() {
      //   this.$refs.datePicker.open()
      // },
      openMachineTable(type) {
        this.machineTableShowType.repairShow = false
        this.machineTableShowType.stopShow = false
        this.machineTableShowType.notStopShow = false
        if(type == 'repair'){
          this.machineTableShowType.repairShow = true
          this.$refs.abnormalTable.abnormalData = this.machineTable.repairData
          this.$refs.abnormalTable.emptyTips = '无检修机组'
        }else if(type == 'stop'){
          this.machineTableShowType.stopShow = true
          this.$refs.abnormalTable.abnormalData = this.machineTable.stopData
          this.$refs.abnormalTable.emptyTips = '无调停机组'
        }else{
          this.machineTableShowType.notStopShow = true
          this.$refs.abnormalTable.abnormalData = this.machineTable.notstopData
          this.$refs.abnormalTable.emptyTips = '无非停机组'
        }
      },
      hasData() {
        this.$refs.abnormalTable.abnormalData = this.machineTable.notstopData
        if(this.machineTable.repairData.length != 0){
          _(this.machineTable.repairData).forEach((item) => {
            this.repairDataNum += parseInt(item.data.length)
          })
        }
        if(this.machineTable.stopData.length != 0){
          _(this.machineTable.stopData).forEach((item) => {
            this.stopDataNum += parseInt(item.data.length)
          })
        }
        if(this.machineTable.notstopData.length != 0){
          _(this.machineTable.notstopData).forEach((item) => {
            this.notStopDataNum += item.data.length
          })
        }
      },
      drawEcharts() {
        Indicator.open()
        let obj = {
          year: parseInt(this.timeParams.year),
          month: parseInt(this.timeParams.month),
          day: parseInt(this.timeParams.day),
          rtp_token: this.getToken()
        }
        this.getData(obj).then((res) => {
          Indicator.close()
          if(res.status != 200){
            this.unnormal = true
            this.errorTips = res.error
          }else{
            this.normal = true
            let ret = res.result
            this.generation = this.getGenerationTranscript(ret.generation)
            if(ret.machineAll.normalMachineNum == 0 && ret.machineAll.stopMachineNum == 0 && ret.machineAll.notStopMachineNum == 0 && ret.machineAll.repairMachineNum == 0){
              this.$refs.pieChart.emptyPieData = true
            }else{
              this.$refs.pieChart.machineAll = ret.machineAll       // 传递数据给饼图子组件
              setTimeout(() => {
                this.$refs.pieChart.drawPieChart()
              }, 0)
            }
            this.machineTable.stopData = this.getMachineTable(ret.machineTable.stopData)
            this.machineTable.repairData = this.getMachineTable(ret.machineTable.repairData)
            this.machineTable.notstopData = this.getMachineTable(ret.machineTable.notstopData)
            this.titleList = ret.titleList
            _(ret.machineRun).forEach((item) => {
              let temp = {
                repairScale: parseFloat((item.repairCapacity / item.allCapacity) * 100),
                stopScale: parseFloat((item.stopCapacity / item.allCapacity) * 100),
                notStopScale: parseFloat((item.notStopCapacity / item.allCapacity) * 100),
                normalScale: parseFloat((item.normalCapactivy / item.allCapacity) * 100),
                allCapacity: item.allCapacity,
                stopCapacity: item.stopCapacity,
                notStopCapacity: item.notStopCapacity,
                repairCapacity: item.repairCapacity,
                normalCapactivy: item.normalCapactivy,
                region: item.region
              }
              this.machineRun.push(temp)
            })
            if(this.machineRun.length != 0){
              this.$refs.barChart.machineRun = this.machineRun        // 传递数据给柱状图子组件
              setTimeout(() => {
                this.$refs.barChart.drawScatterPlot()
              }, 0)
              this.$refs.machineRunTable.machineRun = this.machineRun 
            }else{
              this.$refs.barChart.emptyPieData = true
            }
            this.hasData()
            this.getImportanItems()
          }
        })
      },
      getImportanItems(){
        if(this.titleList.length > 3){
          this.moreBtnShow = true
          for(let i=0;i<3;i++){
            this.titleListPart.push(this.titleList[i])
          }
          this.titleListShow = this.titleListPart
        }else{
          this.moreBtnShow = false
          this.titleListShow = this.titleList
        }
      },
      showMoreImportantItems(){
        if(this.hideItems){
          this.btnText = '隐藏部分事项'
          this.titleListShow = this.titleList
        }else{
          this.btnText = '查看更多事项'
          this.titleListShow = this.titleListPart
        }
        this.hideItems = !this.hideItems
      },
      resetData(){
        this.titleListShow = []
        this.titleListPart = []
        this.repairDataNum = 0
        this.stopDataNum = 0
        this.notstopData = 0
        this.notStopDataNum = 0
        this.stopDataNum = 0
        this.repairDataNum = 0
        this.machineTableShowType.notStopShow = true
        this.machineTableShowType.repairShow = false
        this.machineTableShowType.stopShow = false
        this.normal = false
        this.unnormal = false
        this.machineRun = []
      }
    },
    computed: {
      hasBarChartData(){
        if(this.machineRun.length == 0){
          return false
        }else{
          return true
        }
      }
    },
    mounted(){
      this.drawEcharts()
    },
    created() {
      let time = this.getRouterDate()
      if(!_.isEmpty(time)){
        this.timeParams = time
        let checkDay = time.year+'-'+time.month+'-'+time.day
        this.dateValue = Moment(checkDay).format('YYYY-MM-DD')
      }else{
        let day = null
        let hour = Moment().hour()
        if(hour >= 10){
          day = Moment().subtract(1,'days')
        }else{
          day = Moment().subtract(2,'days')
        }
        this.dateValue = Moment(day).format('YYYY-MM-DD')
        let timeObj = {
          year: Moment().year(),
          month: Moment().month()+1,
          day: Moment().date()-1
        }
        this.timeParams = timeObj
      }
    },
    components: {
      DatetimePicker,
      Indicator,
      MessageBox,
      Navbar,
      TabItem,
      TabContainer,
      TabContainerItem,
      pieChart,
      barChart,
      abnormalTable,
      machineRunTable
    },
    mixins: [apiMethods]
  }
</script>