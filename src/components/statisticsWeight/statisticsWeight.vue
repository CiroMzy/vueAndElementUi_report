<template>
  <div id="container" ref="container">
    <div class="icon-container" v-if="showIcon">
      <i class="el-icon-loading"></i>
    </div>
    <div v-if="showCharts" class="main" id="weightContainer" ></div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import {getStatisticsWeight} from '@/api/report'
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
        getStatisticsWeight().then((res) => {
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
        this.container.style.height = this.container.style.width = getComputedAtt(this.container, 'width')
        this.showIcon = true
      },
      _initOptions () {
        var dom = document.getElementById('weightContainer')
        dom.style.height = getComputedAtt(this.container, 'width')
        var myChart = echarts.init(dom)
        var option = {
          title: {
            text: '重量（吨）',
            x: 'center'
          },
          color: ['#ffbf00', '#5a99d3', '#ed7d31', '#673AB7'
          ],
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            orient: 'horizontal',
            x: 'center',
            y: '50',
            data: ['上海', '广东', '北京', '天津']
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: '55%',
              center: ['50%', '55%'],
              data: this.dataProp,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
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
