<!-- 币币交易 24小时行情 hdd -->
<template>
  <div class="currentSymbol">
    <div class="operations-btn">
      <div class="symbol-total"
       @click.stop="showMarket">
        <i class="hoverHide" :class="{'b-4-cl' : isShowMarket}">
          {{ activeContractName }}
          <!-- <span class="triangle-down" :class="{'b-4-bd' : isShowMarket}"></span> -->
        </i>
        <i class="hoverShow"> {{ activeContractName }}
          <!-- <span class="triangle-down b-4-bd"></span> -->
        </i>
      </div>

      <div class="info-item activePrice-item">
        <!-- 当前价格 -->
        <span class="tit activePrice" :class="activePriceClass">
          {{thousandsComma(activeWsData.close)}}
          <i class="rose" :class="activeWsData.roseClass">
            {{activeWsData.rose}}%
          </i>
        </span>
      </div>
    </div>
    <div class="symbol-info">
      <!-- <div class="info-item activePrice-item">
        <span class="tit activePrice" :class="activePriceClass">
          {{thousandsComma(activeWsData.close)}}
          <i class="rose" :class="activeWsData.roseClass">
            {{activeWsData.rose}}%
          </i>
        </span>
      </div> -->
      <div class="info-item">
        <!-- 标记价格 -->
        <span class="tit explain"> {{ $t('futures.currentSymbol.title1')}} </span>
        <span class="vla b-1-cl"> {{ thousandsComma(publicMarkertInfo.tagPrice)}} </span>
        <div class="explain-text a-5-bg a-3-bd b-1-cl">
          <i class="triangle a-5-bg a-3-bd"></i>
          <p v-html="lantext.explain1">
            <!-- 标记价格用于结算盈亏和触发强制减仓。标记价格可能会偏离市场最新价格，以防因市场被恶意操纵造成损失。 -->
            <!-- {{ $t('futures.currentSymbol.explain1')}} -->
          </p>
        </div>
      </div>
      <div class="info-item">
        <!-- 指数价格 -->
        <span class="tit explain"> {{ $t('futures.currentSymbol.title2')}}  </span>
        <span class="vla b-1-cl"> {{ thousandsComma(publicMarkertInfo.indexPrice)}} </span>
        <div class="explain-text a-5-bg a-3-bd b-1-cl">
          <i class="triangle a-5-bg a-3-bd"></i>
          <p>
            <!-- 标的货币的市场公允现货价格。 -->
            {{ $t('futures.currentSymbol.explain2')}}
          </p>
        </div>
      </div>
      <div class="info-item">
        <!-- 本期资金费率 -->
        <span class="tit explain">
          {{$t('futures.currentSymbol.title3')}}/{{capitalFrequency}}H
        </span>
        <span class="vla b-1-cl"> {{ publicMarkertInfo.currentFundRate }}% /
          {{ countDownTime }} </span>
          <div class="explain-text a-5-bg a-3-bd b-1-cl">
          <i class="triangle a-5-bg a-3-bd"></i>

          <p>
            <!-- 本期结束资金费率时将以此值进行结算。 -->
            {{activeTimer}}{{$t('futures.currentSymbol.explain3')}}
          </p>
          <p v-html="lantext.explain4">
            <!-- 本期资金费率，由上一期的数据进行计算而得，
            在本期开始时已经确定，期内不会改变，并应用于本期结束时的资金费用结算。
            资金费率为正则多头支付空头资金费，资金费率为负则空头支付多头资金费。 -->
            </p>
        </div>
      </div>
      <div class="info-item">
        <!-- 预测下期资金费率 -->
        <span class="tit explain">{{$t('futures.currentSymbol.title4')}} </span>
        <span class="vla b-1-cl"> {{ publicMarkertInfo.nextFundRate }}%</span>
        <div class="explain-text a-5-bg a-3-bd b-1-cl">
          <i class="triangle a-5-bg a-3-bd"></i>
          <p>
            <!-- 下期结算资金费时将以值进行结算。 -->
            {{nextTimer}}{{$t('futures.currentSymbol.explain5')}}
          </p>
          <p>
            <!-- 资金费率为正则多头支付空头资金费，资金费率为负则空头支付多头资金费。 -->
            {{$t('futures.currentSymbol.explain6')}}
          </p>
        </div>
      </div>
      <div class="info-item">
        <!-- 24H成交量 -->
        <span class="tit">{{$t('futures.currentSymbol.title5')}}</span>
        <span class="vla b-1-cl"> {{thousandsComma(activeWsData.vol)}} {{coUnit}}  </span>
      </div>

    </div>

    <!-- 市场 -->
    <div class="market-shade u-7-bg" v-if="isShowMarket" @click="onClickOutside"></div>
    <!-- <div class="market-block"
      v-show="isShowMarket">
      <Market :isShow="isShowMarket" :close="closeDialog" />
    </div> -->
  </div>
</template>
<script>
import { directive as clickOutside } from 'v-click-outside-x';
import mixin from '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/modules/coTrade/currentSymbol/currentSymbol';
import '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/modules/coTrade/currentSymbol/currentSymbol.styl';
// 24小时行情
import Market from './market.vue';

export default {
  mixins: [mixin],
  components: { Market },
  directives: { clickOutside },
  mounted() {
    this.init();
  },
};
</script>
<style lang="stylus" scoped>
.currentSymbol {
  height: 112px;
  display: flex;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.04);
  margin-bottom: 30px;
  border-bottom: none;
  .operations-btn {
    width: 223px;
    padding-left: 24px;
    padding-right: 0;
    border-right: 0;
    height: 100%;
    display: flex;
    align-items: baseline;
    justify-content: center;
    flex-direction: column;
  }
  .symbol-info {
    width: calc(100% - 223px);
    display: flex;
    height: 100%;
    .info-item {
      width: 16.7%;
      height: 100%;
      display: flex;
      padding-left: 24px;
      padding-right: 0;
      border-left: 1px solid #EEEEEF;
      text-align: left;
      flex-direction: column;
      align-items: baseline;
      justify-content: center;
    }
    .tit {
      font-size: 14px;
      line-height: 22px;
      border-bottom: none;
    }
    .vla {
      font-size: 14px;
      line-height: 20px;
      font-weight: 600;
      color: #16161F;
    }
  }
  .activePrice i {
    background: none;
  }
}
</style>
