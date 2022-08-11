<!-- 币币交易 24小时行情 -->
<template>
  <div class="curren-symbol">
    <div class="symbol-total">
      <span
        class="symbol-name"
        @mouseleave="hideCurrencyModal"
      >
        {{symbolCurrent | getCoinShowName(symbolAll)}}
        <div class="coin-label"
          v-if="currentCoinLabel && coinTagOpen">
          <span class="coin-label a-12-cl">{{currentCoinLabel}}</span>
          <span class="coin-bg a-12-bg"></span>
        </div>
        <transition name="fade">
          <div
            v-if="symbol_profile"
            class="currency-notes-modal"
            v-show="currencyModalState"
          >
            <currencyNotes :coinName="symbolCurrentCoinName">
            </currencyNotes>
          </div>
        </transition>
      </span>
      <div class="eft-box" v-if="getShowEtf(symbolCurrent)">
        <span class="eft-class u-8-bd u-8-cl">
          ETF
        </span>
        <div class="eft-box-icon-box">
          <svg class="icon icon-14 eft-box-icon" aria-hidden="true">
            <use xlink:href="#icon-a_15"></use>
          </svg>
          <div class="page-market a-4-bg">
            <div class="page-market-even">{{$t('etfAdd.sbyText1')}}</div>
            <div class="page-market-even">{{$t('etfAdd.sbyText2')}}</div>
            <div class="page-market-even">{{$t('etfAdd.sbyText3')}}</div>
            <div class="page-market-even">{{$t('etfAdd.sbyText4')}}</div>
            <div class="page-market-even">{{$t('etfAdd.sbyText5')}}</div>
            <div class="page-market-click">
              <a :href="etfUrl"
                class="u-8-cl"
                target="_block">{{$t('etfAdd.sbyText6')}}</a>
            </div>
          </div>
        </div>
      </div>
      <div class="price-box" :class="getShowEtf(symbolCurrent) ? 'price-box-eft ' : ''">
        <span
          v-show="symbolsData.close.data !== '--'"
          class="symbol-number"
          :class="symbolsData.close.class"
        >{{symbolsData.close.data}}</span>
        <span
          v-show="symbolsData.close.price !== '--'"
          class="symbol-property"
        >≈ {{symbolsData.close.price}}</span>
      </div>
    </div>
  <div class="symbol-info" v-if="getShowEtf(symbolCurrent)" style="margin-left: 0">
    <!-- 净值 -->
    <span class="tit jzTit">
      <svg class="icon icon-14 eft-box-icon" aria-hidden="true">
        <use xlink:href="#icon-a_15"></use>
      </svg>
      {{$t('etfAdd.jz')}}
    </span>
      <span
        class="vla"
      >{{etfPrice}}</span>
      <div class="page-market-jz a-4-bg">
        <div>{{$t('etfAdd.jzText1')}}</div>
        <div>{{$t('etfAdd.jzText2')}}</div>
      </div>
    </div>
    <div class="symbol-info" :style="!marketShrink ? 'margin-left: 10px' : ''">
      <span class="tit">
        <!-- 涨跌幅  -->
        {{$t('trade.applies')}}
      </span>
      <span
        class="vla"
        :class="symbolsData.rose.class"
      >{{symbolsData.rose.data}}</span>
    </div>
    <div class="symbol-info" :style="!marketShrink ? 'margin-left: 10px' : ''">
      <span class="tit">
        <!-- 最高价 -->
        {{$t('trade.height')}}
      </span>
      <span class="vla">{{symbolsData.high}}</span>
    </div>
    <div class="symbol-info" :style="!marketShrink ? 'margin-left: 10px' : ''">
      <span class="tit">
        <!-- 最低价 -->
        {{$t('trade.low')}}
      </span>
      <span class="vla">{{symbolsData.low}}</span>
    </div>
    <div class="symbol-info" :style="!marketShrink ? 'margin-left: 10px' : ''">
      <span class="tit">
        <!-- 24小时成交量 -->
        {{$t('trade.H_volume')}}
      </span>
      <span class="vla">
        {{symbolsData.vol}}
        {{symbolsData.symbol.symbol | getCoinShowName(coinList)}}
      </span>
    </div>
    <!--  <div class="symbol-info">
        <span class="tit">24小时成交额</span>
        <span class="vla">
          {{symbolsData.amount}}
          {{symbolsData.symbol.unit}}
        </span>
    </div>-->
  </div>
</template>
<script>
import mixin from '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/modules/trade/currentSymbol/index/tradeIndex';
import '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/modules/trade/currentSymbol/index/tradeIndex.styl';
import currencyNotes from '@/components/modules/trade/currentSymbol/currencyNotes.vue';

export default {
  mixins: [mixin],
  components: {
    currencyNotes,
  },
  mounted() {
    this.init();
  },
};
</script>

<style lang="stylus" scoped>
.currency-notes-modal {
  top: 39px!important;
}

.curren-symbol {
  height: 112px;
  display: flex;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.04);
  margin-bottom: 30px;
  .symbol-total, .symbol-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 24px;
  }
  .symbol-name {
    font-size: 14px;
    color: #16161F;
    font-weight: 600;
    margin-bottom: 5px;
  }
  .symbol-info {
    border-left: 1px solid #EEEEEF;
    .tit {
      font-size: 14px;
      color: #A7B4CB;
      line-height: 22px;
    }
    .vla {
      font-size: 14px;
      line-height: 20px;
      font-weight: 600;
      color: #16161F;
      &.u-4-cl {
        color: #eb4d5c;
      }
      &.u-1-cl {
        color: #13b887;
      }
    }
  }
}
</style>
