<template>
  <div id="container" ref="container">
    <div class="icon-container" v-if="showIcon">
      <i class="el-icon-loading"></i>
    </div>
    <div v-if="showCharts" class="main" id="numMonthContainer" ></div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import {getStatisticNumMonth} from '@/api/report'
  import {codeState} from '@/api/config'
  import {getComputedAtt} from '@/common/js/util'
  export default {
    data () {
      return {
        showCharts: false,
        showIcon: false,
        containerWidth: 0,
        containerHeight: 0,
        dataProp: []
      }
    },
    mounted () {
      this._initDom()
      this.getStatisticsNumberHandler()
    },
    methods: {
      getStatisticsNumberHandler () {
        getStatisticNumMonth().then((res) => {
          if (res.data.code !== codeState.ERR_OK) {
            return false
          }
          this.dataProp = res.data.data
          this.showCharts = true
          this.showIcon = false
          let timerInitOptions = setTimeout(() => {
            this._initOptions()
            clearTimeout(timerInitOptions)
          }, 20)
        })
      },
      _initDom () {
        this.container = this.$refs.container
        this.container.style.width = getComputedAtt(this.container, 'width')
        this.container.style.height = parseInt(getComputedAtt(this.container, 'width')) / 2 + 'px'
        this.showIcon = true
      },
      _initOptions () {
        var dom = document.getElementById('numMonthContainer')
        var myChart = echarts.init(dom)
        let option = {
          color: ['#5b9bd5', '#ed7d31', '#ffbf00'],
          tooltip: {
            trigger: 'item',
            formatter: '{b}:\n{c}'
          },
          legend: {
            data: ['下单数量（单）', '完成数量（单）', '下单重量（吨）'],
            x: 'center',
            y: 'bottom'
          },
          toolbox: {
            show: false
          },
          calculable: true,
          xAxis: [
            {
              type: 'category',
              data: this.dataProp.date
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          // 网格
          grid: {
            x: 40,
            y: 60,
            x2: 40,
            y2: 60,
            backgroundColor: 'rgba(0,0,0,0)',
            borderWidth: 1,
            borderColor: '#ccc'
          },
          series: [
            {
              name: '下单数量（单）',
              type: 'bar',
              data: this.dataProp.valNumber

            },
            {
              name: '完成数量（单）',
              type: 'bar',
              data: this.dataProp.valNumberCk

            },
            {
              name: '下单重量（吨）',
              type: 'bar',
              data: this.dataProp.valWeight
            }
          ]
        }
        if (option && typeof option === 'object') {
          myChart.setOption(option, true)
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  #container{
    position: relative;
    width:100%;
    height:100%;
  }
  .main{
    position: relative;
    width:100%;
    height:100%;
    z-index:1;
  }
  .icon-container{
    z-index:2;
    text-align: center;
    position: absolute;
    top:50%;
    left:50%;
    margin-left:-12px;
    margin-top:-12px;
  }

</style>
