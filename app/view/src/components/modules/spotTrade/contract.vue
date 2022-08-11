<template>
  <div class="contract-trade-container">

    <currentSymbol />

    <div class="content-box" @click="onclickfun">

      <div class="left">

       <market isShow />

      </div>

      <div class="center">
        <div class="center-top">
          <trading-view moduleType="co" />
        </div>
        <div class="center-bottom">
          <trade-form />
          <!-- <assets /> -->
        </div>
      </div>

      <div class="right">
        <Depth />
      </div>

    </div>

    <div class="content-bottom">
      <orderList />
    </div>

    <!-- 开通合约弹框 -->
    <openFutures
      :isShow="openFuturesDialogShow"
      :close="closeDialog"
    />
    <!-- 交易喜好设置 -->
    <setFutures
      :isShow="setFuturesDialogShow"
      :close="closeDialog"
    />
  <!-- 交易喜好设置 -->
    <calculator
      :isShow="calculatorDialogShow"
      :close="closeDialog"
    />
  </div>
</template>
<script>
import '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/contract/index/index.styl';

import mixin from '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/contract/index/index';

import currentSymbol from '@/components/modules/spotTrade/contract/currentSymbol.vue';
import market from '@/components/modules/spotTrade/contract/market.vue';
import search from '@/components/modules/spotTrade/contract/search.vue'
// tradingView/ Echarts
import tradingView from '@/components/modules/spotTrade/contract/tradingView.vue';
// 盘口 & 实时成交
import Depth from '@/components/modules/spotTrade/contract/depth.vue';
// 下单交易
import tradeForm from '@/components/modules/spotTrade/contract/tradeForm.vue';
// 资产
import assets from '@/components/modules/coTrade/assets.vue';
// 订单列表
import orderList from '@/components/modules/spotTrade/contract/orderList.vue';
// 开通合约交易弹框
import openFutures from '@/components/modules/coTrade/component/openFutures.vue';
// 交易喜好设置弹框
import setFutures from '@/components/modules/coTrade/component/setFutures.vue';
// 计算器弹框
import calculator from '@/components/modules/coTrade/component/calculator.vue';

export default {
  mixins: [mixin],
  components: { 
    currentSymbol, 
    search, 
    market, 
    tradingView,
    Depth,
    tradeForm,
    assets,
    orderList,
    openFutures,
    setFutures,
    calculator
  },
  data() {
    return {
      activeExchange: 'futures',
      coinTabs: [
        { label: this.$t('pageTitle.spot'), value: 'spot' },
        { label: this.$t('pageTitle.futures'), value: 'futures' },
      ],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    handlerChangeTab(item) {
      this.activeExchange = item.value
      this.$emit('tabChange', item.value)
    },
  }
};
</script>
<style lang="stylus" scoped>
.a-6-bg {
  background-color: #fff;
}
.contract-trade-container {
  padding-top: 37px;
  padding-left: 47px;
  padding-right: 47px;
  box-sizing: border-box;
  background-color: #F7F7F7;
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
}

</style>
