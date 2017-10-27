<template>
  <div id="container">
    <h3 class="title">
      数量及重量统计
    </h3>
    <section class="chart chart1">
      <el-row :gutter="20">
        <el-col :md="24" :lg="12">
          <statistics-number v-if="showStatisticsNumber"></statistics-number>
        </el-col>
        <el-col :md="24" :lg="12">
          <statistics-weight v-if="showStatisticsWeight"></statistics-weight>
        </el-col>
      </el-row>
    </section>
    <h3 class="title">
      数量及重量统计
    </h3>
    <section class="chart chart2">
      <el-row :gutter="20">
        <el-col :md="24" :lg="24">
          <statistics-num-month v-if="showStatisticsNumMonth"></statistics-num-month>
        </el-col>
      </el-row>
    </section>
  </div>
</template>

<script>
  import {report1} from '@/api/report'
  import StatisticsNumber from '@/components/statisticsNumber/statisticsNumber'
  import StatisticsWeight from '@/components/statisticsWeight/statisticsWeight'
  import StatisticsNumMonth from '@/components/statisticNumMonth/statisticNumMonth'
  export default {
    data () {
      return {
        showStatisticsNumber: false,
        showStatisticsWeight: false,
        showStatisticsNumMonth: false
      }
    },
    mounted () {
      this.showStatisticsNumber = true
      this.showStatisticsWeight = true
      this.showStatisticsNumMonth = true
    },
    methods: {
      axiosFn () {
        this._report1()
      },
      _report1 () {
        report1().then((res) => {
          console.log(res)
        })
      }
    },
    components: {
      StatisticsNumber,
      StatisticsWeight,
      StatisticsNumMonth
    }
  }
</script>
<style lang="less" scoped>
@import "../../common/less/variable";
#container{
  .mar;
  .title{
    text-align: center;
    height: 30px;
    line-height: 30px;
    margin: 30px auto 50px;
    font-size:30px;
  }
  .chart2{
    padding-bottom:50px;
  }
}
</style>
