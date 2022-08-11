<template>
  <div
    class="future-canter-echart-box a-6-bg"
    :style="{ height: TvBoxHeight }"
    :class="{ 'canter-echart-full': isfullTv }"
    ref="tv_chart_container">

    <div class="chart-tab">
      <tabs :list="chartTabs" v-model="activeChart" tabItemWidth="133px" @click="handlerClickChart" class="tabs"/>
      <timeSelect v-if="activeChart === 'price'" :options="baseTimeArry" v-model="timeLabel" @change="timeClike" class="time-select"/>
    </div>

    <transition name="fade">
      <div v-show="isshowLoading" class="loading">
        <c-loading size="50" />
      </div>
    </transition>

    <div class="kline-bg" v-if="klineLogo">
      <img :src="klineLogo" class="kline-img" alt="" />
    </div>
    <div class="coverKlineBox"></div>
    <div class="slide" :class="{ selected: chartType === 1 }">
      <div id="tv_chart_container" class="tv_chart_container"></div>
    </div>
    <div class="slide" :class="{ selected: chartType === 2 }">
      <div class="echarts" style="height: 100%">
        <Echarts :chartType="chartType" />
      </div>
    </div>


  </div>
</template>
<script>
import mixin from '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/modules/coTrade/tradingView/tradingView';
import '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/modules/coTrade/tradingView/tradingView.styl';
import Echarts from '@/components/modules/coTrade/echarts/index.vue';
import tabs from '@/components/modules/spotTrade/tab.vue';
import timeSelect from '../select.vue'

export default {
  mixins: [mixin],
  components: {
    tabs,
    timeSelect,
    Echarts,
  },
  data() {
    return {
      chartTabs: [
        { label: this.$t('pageTitle.priceChart'), value: 'price'},
        { label: this.$t('pageTitle.deepChart'), value: 'deep'},
      ],
      activeChart: 'price',
      timeLabel: '30min'
    }
  },
  mounted() {
    this.init();
  },
  destroyed() {
    this.$bus.$off('SYMBOL_LIST_ALL');
    // 监听 WebSocket 链接成功
    this.$bus.$off('WEBSOCKET_ON_OPEN');
    // 获取 当前选中的货币对
    this.$bus.$off('SYMBOL_CURRENT');
  },
  beforeDestroy() {
    this.MywebSocket = false;
  },
  methods: {
    handlerClickChart(value) {
      if (value === 'price') {
        // price chart
        this.switchChartType(1)
      } else {
        // deep chart
        this.switchChartType(2)
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
.chart-tab {
  padding: 14px 20px 12px;
  border-bottom: 1px solid RGB(228, 228, 228);
  display: flex;
  align-items: center;
  .tabs {
    position: relative;
    left: 0;
    z-index: 4;
  }
  .time-select {
    width: 151px;
    position: relative;
    left: 80px;
    z-index: 99;
    option {
      background-color: #fff;
    }
  }
}
</style>