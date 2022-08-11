<template>
  <div
    class="ex-canter-echart-box"
    :style="{ height: TvBoxHeight }"
    :class="{ 'canter-echart-full': isfullTv }"
    ref="tv_chart_container"
  >
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
        <Echarts />
      </div>
    </div>
    <div class="slide" v-if="{ selected: chartType === 3 }" :class="{ selected: chartType === 3 }">
      <div class="echarts" style="height: 100%">
      </div>
    </div>
  </div>
</template>
<script>
import mixin from '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/modules/trade/tradingView/tradeTradingView';
import '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/modules/trade/tradingView/tradeTradingView.styl';
import {
  myStorage, getCookie,
} from '@knoxexchange/blockchain-ui-privatization/utils';
import Echarts from '@/components/modules/trade/echarts/index.vue';
// import EchartsKline from '../echartsKline/index.vue';

import tabs from '@/components/modules/spotTrade/tab.vue';
import timeSelect from '../select.vue'


export default {
  mixins: [mixin],
  components: {
    Echarts,
    tabs,
    timeSelect
    // EchartsKline,
  },
  mounted() {
    this.init();
  },
  data() {
    return {
      chartTabs: [
        { label: this.$t('pageTitle.priceChart'), value: 'price'},
        { label: this.$t('pageTitle.deepChart'), value: 'deep'},
      ],
      activeChart: 'price',
      timeLabel: '30min'
    };
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
  computed: {
    //  是否开启了 网格
    gridTradeFlag() {
      const { publicInfo } = this.$store.state.baseData;
      let str = 0;
      if (publicInfo && publicInfo.switch && publicInfo.switch.grid_trade_switch) {
        str = Number(publicInfo.switch.grid_trade_switch);
      }
      return str;
    },
    // 该币对是否开启网格
    showGridFlag() {
      let flag = false;
      if (this.symbolAll && this.symbolCurrent) {
        const symbol = this.symbolAll[this.symbolCurrent];
        if (symbol && symbol.is_grid_open && this.gridTradeFlag) {
          flag = true;
        }
      }
      return flag;
    },
    lan() {
      if (this.$store.state.baseData) {
        return this.$store.state.baseData.lan;
      }
      return null;
    },
  },
  watch: {
    showGridFlag() {
      this.setTvBoxHeight();
    },
  },
  methods: {
    init() {
      // 杠杆当前选中的币对
      if (this.moduleType === 'lever') {
        this.symbolCurrent = myStorage.get('leverSymbolName');
      }
      // 合约当前选中的币对
      if (this.moduleType === 'co') {
        this.TvBoxHeight = '710px';
        this.symbolCurrent = myStorage.get('coNowSymbol');
      }
      // 监听TV 是否是全屏状态
      document.removeEventListener('fullscreenchange', this.quitfullTv);
      document.addEventListener('fullscreenchange', this.quitfullTv);
      this.$bus.$on('SYMBOL_LIST_ALL', (data) => {
        this.coSymbolAll = data;
      });
      // 设置国际版TV的高度
      this.setTvBoxHeight();
      this.$bus.$on('WINFOW_ON_RESIIZE', () => {
        const { topMenuBox = null, topMenuBar = null } = this.$refs;

        // 监听TV 是否是全屏状态
        this.quitfullTv();
        // 设置国际版TV的高度
        this.setTvBoxHeight();
        // 市场 个数的超出宽度

        // if (topMenuBox && topMenuBar) {
        //   this.maxPosition = topMenuBox.offsetWidth - topMenuBar.offsetWidth;
        // }

        this.slideMarket('left');
      });
      if (this.lanArry.indexOf(this.language) <= -1) {
        this.language = 'en';
      }
      if (getCookie('lan') === 'el_GR') {
        this.language = 'zh_TW';
      }
      if (!myStorage.get('lastTimeS')) {
        myStorage.set('lastTimeS', '30min');
        this.lastTimeS = '30min';
        this.timeLabel = '30min'
      }
      // 监听 WebSocket 链接成功
      this.$bus.$on('WEBSOCKET_ON_OPEN', (val) => {
        this.MywebSocket = val;
        if (this.MywebSocket) {
          this.isCreateWidget = false;
          this.initTradingView();
        }
      });
      // 获取 当前选中的货币对
      this.$bus.$on('SYMBOL_CURRENT', (val) => {
        if (this.symbolCurrent !== val) {
          if (this.chartType === 1) {
            this.isshowLoading = true;
          }
          this.symbolCurrent = val;
          if (window.tvWidget) {
            let { showSymbol } = this.symbolName;
            if (this.moduleType === 'co') {
              showSymbol = this.symbolName.symbol;
            }
            window.tvWidget.setSymbol(
              showSymbol,
              this.getTimeMin(true, this.lastTimeS),
              () => {
                this.widget.chart().executeActionById('chartReset');
              },
            );
          }
        }
        this.setTvBoxHeight();
      });
      this.$bus.$on('HIDE_LOADING', () => {
        this.isshowLoading = false;
      });
      const screenWidth = document.body.clientWidth;
      const screenHeight = document.documentElement.clientHeight;
      if (screenWidth < 961) {
        this.isMobile = true;
        this.TvBoxHeight = `${screenHeight - 180}px`;
        this.disabled_features_arr.push('header_settings');
      }
      // 市场 个数的超出宽度
      // this.maxPosition = this.$refs.topMenuBox.offsetWidth - this.$refs.topMenuBar.offsetWidth;
    },
    setTvBoxHeight() {
      let bodyH = document.documentElement.clientHeight;
      const { activeName } = this.$route.meta;
      if (bodyH < 800) bodyH = 800;
      if (this.templateLayoutType === '2') {
        if (this.moduleType === 'co') {
          this.TvBoxHeight = '100%';
        } else {
          this.TvBoxHeight = `${bodyH - 475}px`;
        }
      } else if (this.showGridFlag && this.lan !== 'zh_CN') {
        this.TvBoxHeight = '375px';
      } else {
        this.TvBoxHeight = '400px';
      }
      // 如果是专业版交易页面 则设置 TV的高度为响应式（包含币币和杠杆）
      if (activeName && activeName.indexOf('proTrade') > -1) {
        this.TvBoxHeight = `${bodyH - 398}px`;
      }
    },

    handlerClickChart(value) {
      console.log('handlerClickChart', value)
      if (value === 'price') {
        // price chart
        this.switchChartType(1)
      } else {
        // deep chart
        this.switchChartType(2)
      }
    }
  },
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
    z-index: 9;
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