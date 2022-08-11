<!-- 币币交易 盘口 -->
<template>
  <div class="trade-depth-block depath-index-container" :class="depthClass">
    <div class="depth" ref="depthBox" :style="showGridFlag ? 'height: 830px;' : 'height: 815px;'">
      <div class="block-header a-3-bd a-21-bg b-2-cl">
        <span class="h4 b-1-cl">
          <!-- 盘口 -->
          {{ $t("trade.handicap") }}
        </span>
        <span
          class="title-tab a-12-bd"
          @click="switchBlock('D')"
          :class="{ 'selected b-1-cl': shrinksDdpthNewShow === 'D' }"
        >
          <!-- 盘口 -->
          {{ $t("trade.handicap") }}
        </span>
        <span
          class="title-tab title-new-tab a-12-bd"
          @click="switchBlock('T')"
          :class="{ 'selected b-1-cl': shrinksDdpthNewShow === 'T' }"
        >
          <!-- 实时成交 -->
          {{ $t("trade.latestDeal") }}
        </span>
        <div class="switch-btn">
          <i class="dtIcon" @click="switchDepthType('center')">
            <svg class="icon icon-14" aria-hidden="true">
              <use xlink:href="#icon-a_5"></use>
            </svg>
          </i>
          <i class="dtIcon" @click="switchDepthType('sell')">
            <svg class="icon icon-14" aria-hidden="true">
              <use xlink:href="#icon-a_7"></use>
            </svg>
          </i>
          <i class="dtIcon" @click="switchDepthType('buy')">
            <svg class="icon icon-14" aria-hidden="true">
              <use xlink:href="#icon-a_6"></use>
            </svg>
          </i>
        </div>
      </div>
      <div
        :class="{ 'is-show': shrinksDdpthNewShow === 'D' }"
        class="block-content a-6-bg"
      >
        <tableList
          type="asks"
          :theadList="theadList"
          :dataList="dataList.asksData"
          :maxValue="dataList.depthMaxNumber"
          :cellWidth="cellWidth"
          :lineNumber="sellLineNumber"
          :bodyHeight="sellHeight"
        />
        <div class="current-price a-21-bg">
          <div class="price b-1-cl" :class="getShowEtf(symbolCurrent) ? 'etfPriceClass' : ''">
            <span
              class="sy-price"
              v-if="symbolsData.close.data !== '--'"
              :class="symbolsData.close.class"
            >
              {{ symbolsData.close.data }}
            </span>
            <span
              v-if="symbolsData.close.price !== '--'"
              class="otc-price b-2-cl"
            >
              ≈ {{ symbolsData.close.price }}
            </span>
          </div>
          <div v-if="getShowEtf(symbolCurrent)"
            class="eftJz">
            <div class="eftJz-title">
              <svg class="icon icon-14 eft-box-icon" aria-hidden="true">
                <use xlink:href="#icon-a_15"></use>
              </svg>
              {{$t('etfAdd.jz')}}
            </div>
            <div class="eftJz-value b-1-cl">
              {{etfPrice}}
            </div>
          </div>
          <div class="market-show a-4-bg b-1-cl"
            :style="depthType === 'sell' ? 'bottom: 40px' : 'top: 40px;'">
            <div>{{$t('etfAdd.jzText1')}}</div>
            <div>{{$t('etfAdd.jzText2')}}</div>
          </div>
          <div class="depth-type">
            <span class="num b-1-cl">{{ deptValue }}</span>
            <span class="switch-type-btn b-2-cl b-1-bd">
              <i
                :class="{ noclick: currentdepthClass <= 0 }"
                @click="switchDepth(-1)"
                class="icon-switch icon-minus"
              >
                <svg class="icon icon-14 hoverHide" aria-hidden="true">
                  <use xlink:href="#icon-a_2"></use>
                </svg>
                <svg class="icon icon-14 hoverShow" aria-hidden="true">
                  <use xlink:href="#icon-a_2_1"></use>
                </svg>
              </i>
              <i
                :class="{
                  noclick: currentdepthClass >= depthOption.length - 1
                }"
                @click="switchDepth(1)"
                class="icon-switch icon-add"
              >
                <svg class="icon icon-14 hoverHide" aria-hidden="true">
                  <use xlink:href="#icon-a_3"></use>
                </svg>
                <svg class="icon icon-14 hoverShow" aria-hidden="true">
                  <use xlink:href="#icon-a_3_1"></use>
                </svg>
              </i>
            </span>
          </div>
        </div>
        <tableList
          type="buy"
          :dataList="dataList.buyData"
          :maxValue="dataList.depthMaxNumber"
          :lineNumber="buyLineNumber"
          :cellWidth="cellWidth"
          :bodyHeight="buyHeight"
        />
      </div>
    </div>
    <!-- 实时成交 -->
    <div class="new-tradb" :class="{ 'is-show': shrinksDdpthNewShow === 'T' }">
      <new-trade :moduleType="moduleType"  :showGridFlag="showGridFlag"/>
    </div>
  </div>
</template>
<script>
import mixin from '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/modules/trade/depath/index';
import '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/modules/trade/depath/index/index.styl';
import { myStorage } from '@knoxexchange/blockchain-ui-privatization/utils';
import tableList from '@/components/modules/trade/tableList/index.vue';
// 实时成交
import newTrade from '@/components/modules/trade/newTrade/index.vue';

export default {
  mixins: [mixin],
  components: {
    tableList,
    newTrade,
  },
  mounted() {
    this.init();
  },
  props: {
    showGridFlag: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      minHeight: 352,
      // 卖盘 高度
      sellHeight: 352,
      // 买盘 高度
      buyHeight: 352,
      maxHeeight: 600,
    };
  },
  watch: {
    showGridFlag(v) {
      if (v) {
        this.buyHeight = 359;
        this.sellHeight = 359;
        this.sellLineNumber = 22;
        this.buyLineNumber = 22;
      } else {
        this.buyHeight = 352;
        this.sellHeight = 352;
        this.sellLineNumber = 22;
        this.buyLineNumber = 22;
      }
    },
  },
  methods: {
    init() {
      if (this.moduleType === 'lever') {
        // 卖盘 高度
        this.sellHeight = 416;
        // 买盘 高度
        this.buyHeight = 416;
        // 显示条数
        this.sellLineNumber = 26;
        this.buyLineNumber = 26;
        this.maxHeeight = 840;
        // 当前选中的货币对
        this.symbolCurrent = myStorage.get('leverSymbolName');
      }

      this.setBoxHeight();
      // 监听 深度数据
      this.$bus.$on('DEPTH_DATA', (data) => {
        if (data && this.symbolCurrent === data.symbol) {
          this.dataList = JSON.parse(JSON.stringify(data));
        } else {
          this.dataList = {
            asksData: [],
            buyData: [],
            depthMaxNumber: null,
          };
        }
      });
      // 监听 市场（最新价格） 数据
      this.$bus.$on('MARKET_DATA', (data) => {
        this.marketData = JSON.parse(JSON.stringify(data));
      });
      // 获取 当前选中的货币对
      this.$bus.$on('SYMBOL_CURRENT', (val) => {
        this.dataList = {
          asksData: [],
          buyData: [],
          depthMaxNumber: null,
        };
        this.symbolCurrent = val;
        this.currentdepthClass = 0;
      });
      // 监听 浏览器窗口大小改变
      this.$bus.$on('WINFOW_ON_RESIIZE', () => {
        // 设置国际版TV的高度
        if (document.body.clientWidth < 961) {
          this.sellHeight = 100;
          this.buyHeight = 100;
          this.sellLineNumber = 5;
          this.buyLineNumber = 5;
        } else if (this.moduleType === 'lever') {
          this.sellHeight = 416;
          this.buyHeight = 416;
          this.sellLineNumber = 26;
          this.buyLineNumber = 26;
        } else {
          this.buyHeight = 352;
          if (this.showGridFlag) {
            this.buyHeight = 418;
          }
          this.sellHeight = 352;
          this.sellLineNumber = 24;
          this.buyLineNumber = 24;
        }
        this.setBoxHeight(false);
      });
    },
  },
};
</script>

<style>
  .trade-table-list-container .tbody {
    padding: 0;
  }
  .depath-index-container .depth {
    height: 815px;
  }
  .newTrade-index-container .newTrade-tbody {
    height: 735px;
  }
</style>
