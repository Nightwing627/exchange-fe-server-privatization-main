<template>
  <div class="trade-container">
    <currentSymbol :etfUrl="etfUrl" :etfPrice="etfPrice" :marketShrink="marketShrink"/>

    <div class="content-box" @click="onclickfun">

      <div class="left">
        <!-- 24小时行情 -->
        <!-- 国际版 -->
        <template v-if="templateLayoutType && templateLayoutType === '2'">
          <exchangeMarket @shrinkBlock="shrinkBlock" @serachShrinkBlock="serachShrinkBlock" @tabChange="handlerChangeTab"/>
        </template>

        <!-- 中国版 -->
        <template v-else>
          <exchangeMarket
            @shrinkBlock="shrinkBlock"
            @serachShrinkBlock="serachShrinkBlock"
            :showGridFlag="showGridFlag"
            @tabChange="handlerChangeTab"
            moduleType='ex'/>
        </template>

      </div>

      <div class="center">
        <div class="center-top">
          <trading-view />
        </div>
        <div class="center-bottom" id="layoutBlockTrade">
          <trade-form />
        </div>
      </div>

      <div class="right">
          <!-- 国际版 -->
          <template v-if="templateLayoutType && templateLayoutType === '2'">
            <International-depth :etfPrice="etfPrice"/>
            <div class="transaction a-6-bg">
              <International-tradeForm />
            </div>
          </template>
          
          <!-- 中国版 -->
          <template v-else>
            <Depth :etfPrice="etfPrice" :showGridFlag="showGridFlag"/>
          </template>
        </div>

    </div>

    <div class="content-bottom">
      <orderList v-if="isLogin"  />
    </div>

    <i v-if="!baseInfo"></i>

    <c-alert
      :showFlag="tradeAlertState"
      @close="hideTradeAlert"
      :imgMap="imgMap"
      @confirm="hideTradeAlert">
      <!-- 交易限制提醒 -->
      <div class="alertTitle b-1-cl">
        <!-- 温馨提示 -->
        {{$t('tradeLimt.tradeLimit_text_instructions')}}
      </div>
      <div class="trade-limit-text b-2-cl">{{ tradeLimitAlertText }}</div>
    </c-alert>
    <!-- 免责声明 -->
    <c-noticeDialog
      :showFlag="etfDialog"
      :titleText="$t('etfAdd.dialogTitle')"
      :confirmText="$t('etfAdd.confirmText')"
      paddingTop="0px"
      @confirm="etfDialogConfirm">
      <div class="trade-noticeDialog">
        <div class="trade-noticeDialog-even">
           {{$t('etfAdd.dText1')}}
        </div>
        <div class="trade-noticeDialog-even">
          <!-- {{$t('etfAdd.dText2')}} {{ etfName }} -->
          {{$t('etfAdd.dText3')}}
        </div>
        <div class="trade-noticeDialog-even">
           {{$t('etfAdd.dText4')}} <a class="u-8-cl"
            :href="etfUrl" target="_blank">{{$t('etfAdd.dText5')}}</a>
        </div>
        <div class="trade-noticeDialog-even">
           {{$t('etfAdd.dText6')}}
        </div>
        <div class="trade-noticeDialog-even">
           {{$t('etfAdd.dText7')}}
        </div>
        <div class="trade-noticeDialog-even">
           {{$t('etfAdd.dText8')}}
        </div>
        <div class="trade-noticeDialog-even">
           {{$t('etfAdd.dText9')}}
        </div>
      </div>
    </c-noticeDialog>
  </div>
</template>
<script>
import mixin from '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/modules/trade/index/mixin';

import '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/trade/index/index.styl';

import currentSymbol from '@/components/modules/spotTrade/trade/currentSymbol.vue';
import exchangeMarket from '@/components/modules/spotTrade/trade/exchangeMarket.vue';
// tradingView/ Echarts
import tradingView from '@/components/modules/spotTrade/trade/tradingView.vue';
// 盘口 & 实时成交
import Depth from '@/components/modules/spotTrade/trade/depth.vue';
import InternationalDepth from '@/components/modules/spotTrade/trade/internationalDepth.vue';
import InternationalTradeForm from '@/components/modules/spotTrade/trade/internationalTradeForm.vue';
// 下单交易
import tradeForm from '@/components/modules/spotTrade/trade/ex-tradeForm.vue';
// 订单列表
import orderList from '@/components/modules/spotTrade/trade/orderList.vue';


export default {
  mixins: [mixin],
  components: { 
    currentSymbol,
    exchangeMarket, 
    tradingView,
    Depth,
    InternationalDepth,
    InternationalTradeForm,
    tradeForm,
    orderList
  },
  data() {
    return {
      activeExchange: 'spot',
      coinTabs: [
        { label: this.$t('pageTitle.spot'), value: 'spot' },
        { label: this.$t('pageTitle.futures'), value: 'futures' },
      ],
    };
  },
  created() {
    this.createdInit();
    // this.init();
  },
  computed: {
    //  是否开启了 网格
    gridTradeFlag() {
      const { publicInfo } = this.$store.state.baseData;
      let str = 1;
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
      return this.$store.state.baseData.lan;
    },
  },
  methods: {
    handlerChangeTab(item) {
      this.activeExchange = item.value
      this.$emit('tabChange', item.value);
    },
  }
};
</script>
<style lang="stylus" scoped>
.a-6-bg {
  background-color: #fff;
}
.trade-container {
  padding-top: 37px;
  padding-left: 47px;
  padding-right: 47px;
  box-sizing: border-box;
  background-color: #F7F7F7;
}
.content-box {
  display: flex;
  .left {
    width: 326px;
    margin-right: 16px;
  }
  .center {
    width: calc(100% - 677px);
  }
  .right {
    width: 319px;
    margin-left: 16px;
  }

  .center-top {
    height: 697px;
    background-color: #fff;
    border-radius: 10px;
    margin-bottom: 26px;
  }
}
.content-bottom {
  margin-top: 38px;
}
</style>
