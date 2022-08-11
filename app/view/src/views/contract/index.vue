<template>
  <!-- 中国版 -->
  <div
    v-on:dblclick="ondblclick"
    @click="onclickfun"
    class="contract-content a-8-bg">
    <template>
      <div class="layout-block-Klinw">
        <current-symbol />
        <trading-view moduleType="co" />
      </div>
      <div class="layout-block-depth">
        <!-- 深度盘口  和 实时成交 -->
        <depth />
      </div>
      <div class="layout-block-trade a-6-bg" id="layoutBlockTrade">
        <trade-form />
        <assets />
      </div>
      <div class="layout-block-order">
        <orderList />
      </div>
    </template>
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
// 当前币对信息
import currentSymbol from '@/components/modules/coTrade/currentSymbol.vue';
// 盘口 && 实时成交
import depth from '@/components/modules/coTrade/depth.vue';
// tradingView && Echarts
import tradingView from '@/components/modules/coTrade/tradingView/index.vue';
// 下单交易
import tradeForm from '@/components/modules/coTrade/tradeForm.vue';
// 订单列表
import orderList from '@/components/modules/coTrade/orderList.vue';
// 资产
import assets from '@/components/modules/coTrade/assets.vue';
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
    depth,
    tradingView,
    tradeForm,
    orderList,
    assets,
    openFutures,
    setFutures,
    calculator,
  },
  mounted() {
    this.init();
  },
};
</script>
