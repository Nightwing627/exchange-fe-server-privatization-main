<template>
  <div
    class="ex-canter-echart-box a-6-bg"
    :style="{ height: TvBoxHeight }"
    :class="{ 'canter-echart-full': isfullTv }"
    ref="tv_chart_container"
  >
    <div class="top-menu b-3-cl" :class="{hide: chartType === 2, lefts: chartType === 3 }">
      <div class="top-menu-bar" ref="topMenuBar">
        <i
          class="slide-btn icon-left a-6-bg"
          :class="{ 'slide-btn-cur': parseFloat(slidePosition) < 0 }"
          @click="slideMarket('left')"
        >
          <svg class="icon icon-14 hover_hide" aria-hidden="true">
            <use xlink:href="#icon-a_10_1"></use>
          </svg>
          <svg class="icon icon-14 hover_show" aria-hidden="true">
            <use xlink:href="#icon-a_10"></use>
          </svg>
        </i>
        <div
          class="top-menu-box"
          :style="{ left: slidePosition }"
          ref="topMenuBox"
        >
          <span
            @click="timeClike('Line')"
            :class="{ 'a-4-bg b-1-cl': lastTimeS === 'Line' }"
            class="time-line  a-4-cl-h"
          >
            <i class="hoverHide">Line</i>
            <i class="b-1-cl hoverShow">Line</i>
          </span>
          <span
            v-for="item in baseTimeArry"
            @click="timeClike(item)"
            :key="item"
            :class="{ 'a-4-bg b-1-cl': lastTimeS === item }"
            class="time-line a-4-cl-h"
          >
            <i class="hoverHide">{{ item }}</i>
            <i class="b-1-cl hoverShow">{{ item }}</i>
          </span>
          <span class="time-line full-btn a-8-bd a-4-cl-h" @click="fullTv">
            <template v-if="!isfullTv">
              <i class="hoverHide">{{ $t("trade.full") }}</i>
              <i class="b-1-cl hoverShow">{{ $t("trade.full") }}</i>
            </template>
            <template v-else>
              <i class="hoverHide">{{ $t("trade.outFull") }}</i>
              <i class="b-1-cl hoverShow">{{ $t("trade.outFull") }}</i>
            </template>
          </span>
        </div>
        <i
          class="slide-btn icon-right a-6-bg"
          :class="{
            'slide-btn-cur':
              maxPosition > 0 && parseFloat(slidePosition) > -maxPosition
          }"
          @click="slideMarket('right')"
        >
          <svg class="icon icon-14 hover_hide" aria-hidden="true">
            <use xlink:href="#icon-a_11_1"></use>
          </svg>
          <svg class="icon icon-14 hover_show" aria-hidden="true">
            <use xlink:href="#icon-a_11"></use>
          </svg>
        </i>
      </div>
    </div>
    <transition name="fade">
      <div v-show="isshowLoading" class="loading">
        <c-loading size="50" />
      </div>
    </transition>
    <p class="a-8-bg inline"></p>
    <div class="top-tab">
      <!-- <span class="switch-chart-type"
        @mouseenter="enter(3)"
        @mouseleave="leave()"
        @click="switchChartType(3)"
        :class="{'u-8-cl':chartTypeShow(3) }">
        {{$t('trade.dataType1')}}
      </span> -->
      <span
        @click="switchChartType(1)"
        @mouseenter="enter(1)"
        @mouseleave="leave()"
        class="switch-chart-type"
        :class="{'u-8-cl':chartTypeShow(1) }"
      >
        <!-- {{$t('trade.dataType2')}} -->
        <svg v-if="chartTypeShow(1)" class="icon icon-16" aria-hidden="true">
          <use xlink:href="#icon-c_12_1"></use>
        </svg>
        <svg v-else class="icon icon-16" aria-hidden="true">
          <use xlink:href="#icon-c_12"></use>
        </svg>
      </span>
      <span
        @click="switchChartType(2)"
        @mouseenter="enter(2)"
        @mouseleave="leave()"
        class="switch-chart-type"
        :class="{'u-8-cl':chartTypeShow(2) }"
      >
        <!-- 深度图 -->
        <!-- {{$t('trade.dataType3')}} -->
        <svg v-if="chartTypeShow(2)" class="icon icon-16" aria-hidden="true">
          <use xlink:href="#icon-c_13_1"></use>
        </svg>
        <svg v-else class="icon icon-16" aria-hidden="true">
          <use xlink:href="#icon-c_13"></use>
        </svg>
      </span>
    </div>
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
        <!-- <EchartsKline /> -->
      </div>
    </div>
  </div>
</template>
<script>
import mixin from '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/modules/trade/tradingView/tradingView';
import '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/modules/trade/tradingView/tradingView.styl';
import {
  myStorage, getCookie,
} from '@knoxexchange/blockchain-ui-privatization/utils';
import Echarts from '../echarts/index.vue';
// import EchartsKline from '../echartsKline/index.vue';


export default {
  mixins: [mixin],
  components: {
    Echarts,
    // EchartsKline,
  },
  mounted() {
    this.init();
  },
  data() {
    return {
      TvBoxHeight: '400px',
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

        if (topMenuBox && topMenuBar) {
          this.maxPosition = topMenuBox.offsetWidth - topMenuBar.offsetWidth;
        }

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
      this.maxPosition = this.$refs.topMenuBox.offsetWidth - this.$refs.topMenuBar.offsetWidth;
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
  },
};
</script>
