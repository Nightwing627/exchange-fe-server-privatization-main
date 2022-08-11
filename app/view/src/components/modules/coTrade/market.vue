<!-- 合约交易 24小时行情 -->
<template>
  <div class="co-market-box a-21-bg">
    <div class="market-tab">
      <div class="search">
        <!-- 搜索 -->
        <c-inputFind
          :promptText="$t('futures.market.text8')"
          :value="listfilterVal"
          @onchanges="inputchanges"
          name="trade"
          ref="tradeFind"
          className="search-input"/>
      </div>
      <div class="category-select-box">
        <template v-for="(item, index) in typeTabList">
          <span class="tab"
            :key="index"
            v-if="item.isShow"
            @click="changeTypeTab(item.id)"
            :class="item.classes">
            <i class="h">{{item.text}}</i>
            <i class="s b-1-cl">{{item.text}}</i>
          </span>
        </template>
      </div>
    </div>
    <div class="co-market-symbol a-6-bg b-2-cl">
      <div class="thead a-3-bd">
        <span class="td-symbol">
          <!-- 合约  -->
          {{$t('futures.market.text1')}}
        </span>
        <span class="td-price" @click="sorteEvent('close')">
          <!-- 最新价 -->
          {{$t('futures.market.text2')}}
          <div :class="{selected: sortName === 'close'}"
            class="sorte">
            <svg
              v-if="sortName === 'close' && sortType === 'down'"
              class="icon icon-16"
              aria-hidden="true">
              <use xlink:href="#icon-a_17_1"></use>
            </svg>
            <svg
              v-else-if="sortName === 'close' && sortType === 'up'"
              class="icon icon-16"
              aria-hidden="true">
              <use xlink:href="#icon-a_17_2"></use>
            </svg>
            <svg
              v-else
              class="icon icon-16"
              aria-hidden="true">
              <use xlink:href="#icon-a_17"></use>
            </svg>
          </div>
        </span>
        <span class="td-rose" @click="sorteEvent('rose')">
          <!-- 涨跌幅 -->
          {{$t('futures.market.text3')}}
          <div :class="{selected: sortName === 'rose'}"
            class="sorte">
            <svg
              v-if="sortName === 'rose' && sortType === 'down'"
              class="icon icon-16"
              aria-hidden="true">
              <use xlink:href="#icon-a_17_1"></use>
            </svg>
            <svg
              v-else-if="sortName === 'rose' && sortType === 'up'"
              class="icon icon-16"
              aria-hidden="true">
              <use xlink:href="#icon-a_17_2"></use>
            </svg>
            <svg
              v-else
              class="icon icon-16"
              aria-hidden="true">
              <use xlink:href="#icon-a_17"></use>
            </svg>
          </div>
        </span>
      </div>
      <div class="tbody">
        <vue-scroll>
          <div>
            <template v-for="(item, index) in marketList">
            <div class="tr a-3-bd"
              v-if="item.type === contractSide"
              @click="switchSymbol(item.contractName)"
              :key="index"
              :class="{'a-4-bg': item.contractName === contractName}">
              <div class="bg a-4-bg"></div>
              <span class="td-symbol"> {{item.symbol}}</span>
              <span class="td-price">
                {{ fixPrice(item.close, item.priceFix)}}
              </span>
              <span class="td-rose"
                :class="roseClasses(item.rose)">
                {{item.rose | fixdRose}}%
              </span>
            </div>
            </template>
          </div>
        </vue-scroll>
      </div>
    </div>
  </div>
</template>

<script>
import mixin from '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/modules/coTrade/market/market';
import '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/modules/coTrade/market/market.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
