<!-- 币币交易 24小时行情 -->
<template>
  <div>
    <div class="input-box">
      <img src="~@/assets/images/1/search.png" alt="">
      <c-inputFind
        :promptText="$t('trade.searchSy')"
        :value="listfilterVal"
        @onchanges="inputchanges"
        name="trade"
        ref="tradeFind"
        className="search-input spot-search"/>
    </div>

    <div class="left-content">
      <ul class="coin-tabs">
        <li class="coin-item" 
          v-for="(item, index) in coinTabs" 
          :key="index" 
          :class="{active: activeExchange === item.value}"
          @click="handlerChangeTab(item)"
        >
          {{ item.label }}
        </li>
      </ul>

      <div class="coin-container">
        <div class="trade-market trade-market-index-container" :class="marketClass">
          <div class="market-header">

            <div class="market-title-box">
              <div class="market-title-bar" ref="marketBar">
                <i
                  class="slide-btn icon-left"
                  :class="{'slide-btn-cur': parseFloat(slidePosition) < 0}"
                  @click="slideMarket('left')">
                    <svg class="icon icon-14 hover_hide" aria-hidden="true">
                      <use xlink:href="#icon-a_10_1"></use>
                    </svg>
                    <svg class="icon icon-14 hover_show" aria-hidden="true">
                      <use xlink:href="#icon-a_10"></use>
                    </svg>
                </i>
                <ul class="market-title"
                  :style="{left:slidePosition}"
                  ref="marketUl">
                  <li class="a-12-bd"
                      :class="{'selected':'myMarket' === marketCurrent}"
                      @click="switchMarket('myMarket')">
                      {{$t('trade.marketSet')}}
                  </li>
                  <li
                      v-for="(item, index) in marketList"
                      :key="index"
                      :class="{'selected': marketCurrent === item}"
                      @click="switchMarket(item)"
                      class="a-12-bd">{{item  | getCoinShowName(coinList)}}</li>
                </ul>
                <i
                  class="slide-btn icon-right"
                  :class="{'slide-btn-cur': maxPosition > 0
                  && parseFloat(slidePosition) > -maxPosition}"
                  @click="slideMarket('right')">
                  <svg class="icon icon-14 hover_hide" aria-hidden="true">
                    <use xlink:href="#icon-a_11_1"></use>
                  </svg>
                  <svg class="icon icon-14 hover_show" aria-hidden="true">
                    <use xlink:href="#icon-a_11"></use>
                  </svg>
                </i>
              </div>
            </div>
          </div>
          <div class="market-symbol">
            <div class="thead">
              <span class="td-symbol">
                <!-- 市场 -->
                {{$t('trade.market')}}
              </span>
              <span
                @click="sorteEvent('closes')"
                class="td-price">
                <!-- 最新价 -->
                {{$t('trade.close')}}
                <div
                  :class="{selected: sortName === 'closes'}"
                  class="sorte">
                  <svg
                    v-if="sortName === 'closes' && sortType === 'down'"
                    class="icon icon-14"
                    aria-hidden="true">
                    <use xlink:href="#icon-a_17_1"></use>
                  </svg>
                  <svg
                    v-else-if="sortName === 'closes' && sortType === 'up'"
                    class="icon icon-14"
                    aria-hidden="true">
                    <use xlink:href="#icon-a_17_2"></use>
                  </svg>
                  <svg
                    v-else
                    class="icon icon-14"
                    aria-hidden="true">
                    <use xlink:href="#icon-a_17"></use>
                  </svg>
                </div>
              </span>
              <span
                @click="sorteEvent('roses')"
                class="td-rose">
                <!-- 涨跌幅 -->
                {{$t('trade.applies')}}
                <div
                  :class="{selected: sortName === 'roses'}"
                  class="sorte">
                  <svg
                    v-if="sortName === 'roses' && sortType === 'down'"
                    class="icon icon-14"
                    aria-hidden="true">
                    <use xlink:href="#icon-a_17_1"></use>
                  </svg>
                  <svg
                    v-else-if="sortName === 'roses' && sortType === 'up'"
                    class="icon icon-14"
                    aria-hidden="true">
                    <use xlink:href="#icon-a_17_2"></use>
                  </svg>
                  <svg
                    v-else
                    class="icon icon-14"
                    aria-hidden="true">
                    <use xlink:href="#icon-a_17"></use>
                  </svg>
                </div>
              </span>
            </div>
            <div class="tbody" :class="showGridFlag ? 'grid_tbody' : ''">
              <template v-if="dataList.length">
                <vue-scroll>
                  <!-- 减半区 -->
                  <div
                    v-if="(newcoinFlag || seecoinFlag || maincoinFlag)
                    && halvecoinFlag && !listfilterVal"
                    class="block-title a-3-bd b-2-cl">
                    {{$t('trade.halving')}}
                    <!-- 减半区 -->
                  </div>
                  <template v-for="(item, index) in dataList">
                    <!-- <template v-if="cancelStoreSymbol.indexOf(item.name) === -1"> -->
                    <div
                      class="symbol-item a-7-bg-h"
                      v-if="countSymbolItemState(item,3) && !unsealCountSymbolItemState(item)"

                      @click="switchSymbol(item.name)"
                      :key="index + 'new'"
                      :class="{'a-4-bg':item.name === symbolCurrent}">
                      <div class="bg a-4-bg"></div>
                      <span class="td-symbol b-1-cl"
                        :title="symbolTitle(item.symbol)">
                        <i
                          @click.stop="setMyMarket(item.name)"
                          class="iconMy">
                          <svg class="icon icon-16"
                          v-if="mySymbolList.indexOf(item.name) === -1"
                          aria-hidden="true">
                            <use xlink:href="#icon-c_11"></use>
                          </svg>
                          <svg class="icon icon-16"
                            v-else
                            aria-hidden="true">
                            <use xlink:href="#icon-c_11_1"></use>
                          </svg>
                        </i>
                        {{item.symbol.symbol | getCoinShowName(coinList)}}
                        <template v-if="marketCurrent === 'myMarket' || marketCurrent === 'ETF'">
                          /{{item.symbol.unit | getCoinShowName(coinList)}}
                        </template>
                        <span
                          class="st u-4-cl"
                          v-if="moduleType === 'ex' && item.IsST === 1 && marketCurrent !== 'myMarket'">
                          (ST)
                        </span>
                        <span class="multiple b-7-cl"
                          v-if="moduleType === 'lever' && marketCurrent !== 'myMarket'">
                          {{item.multiple}}x
                        </span>
                      </span>
                      <!-- 最新价 -->
                      <span class="td-price b-2-cl"
                        :class="item.close.class">
                        <span class="td-price-1">
                          <b v-if="item.close.data === -999999">--</b>
                          <b v-else>{{item.close.data}}</b>
                        </span>
                        <span class="td-price-2">
                          <b v-if="item.close.price === -999999">--</b>
                          <b v-else>{{item.close.price}}</b>
                        </span>
                      </span>
                      <!-- 涨跌幅 -->
                      <span class="td-rose b-2-cl" :class="item.rose.class">
                        <template v-if="item.rose.data === -999999">
                          --
                        </template>
                        <template v-else>
                          {{item.rose.data}}
                        </template>
                      </span>
                    </div>
                    <!-- </template> -->
                  </template>
                  <!-- 主区 -->
                  <div
                    v-if="(newcoinFlag || seecoinFlag || halvecoinFlag)
                    && maincoinFlag && !listfilterVal"
                    class="block-title a-3-bd b-2-cl">

                    {{$t('trade.maincon')}}
                  </div>
                  <template v-for="(item, index) in dataList">
                    <template v-if="cancelStoreSymbol.indexOf(item.name) === -1">
                    <div
                      class="symbol-item a-7-bg-h"
                      v-if="countSymbolItemState(item,0) && !unsealCountSymbolItemState(item)"

                      @click="switchSymbol(item.name)"
                      :key="index"
                      :class="{'a-4-bg':item.name === symbolCurrent}">
                      <div class="bg a-4-bg"></div>
                      <span class="td-symbol b-1-cl"
                        :title="symbolTitle(item.symbol)">
                        <i
                          @click.stop="setMyMarket(item.name)"
                          class="iconMy">
                          <svg class="icon icon-16"
                          v-if="mySymbolList.indexOf(item.name) === -1"
                          aria-hidden="true">
                            <use xlink:href="#icon-c_11"></use>
                          </svg>
                          <svg class="icon icon-16"
                            v-else
                            aria-hidden="true">
                            <use xlink:href="#icon-c_11_1"></use>
                          </svg>
                        </i>
                        {{item.symbol.symbol | getCoinShowName(coinList)}}
                        <template v-if="marketCurrent === 'myMarket' || marketCurrent === 'ETF'">
                          /{{item.symbol.unit | getCoinShowName(coinList)}}
                        </template>
                        <span
                          class="st u-4-cl"
                          v-if="moduleType === 'ex' && item.IsST === 1 && marketCurrent !== 'myMarket'">
                          (ST)
                        </span>
                        <span class="multiple b-7-cl"
                          v-if="moduleType === 'lever' && marketCurrent !== 'myMarket'">
                          {{item.multiple}}x
                        </span>
                      </span>
                      <!-- 最新价 -->
                      <span class="td-price b-2-cl"
                        :class="item.close.class">
                        <span class="td-price-1">
                          <b v-if="item.close.data === -999999">--</b>
                          <b v-else>{{item.close.data}}</b>
                        </span>
                        <span class="td-price-2">
                          <b v-if="item.close.price === -999999">--</b>
                          <b v-else>{{item.close.price}}</b>
                        </span>
                      </span>
                      <!-- 涨跌幅 -->
                      <span class="td-rose b-2-cl" :class="item.rose.class">
                        <template v-if="item.rose.data === -999999">
                          --
                        </template>
                        <template v-else>
                          {{item.rose.data}}
                        </template>
                      </span>
                    </div>
                    </template>
                  </template>
                  <!-- 创新区 -->
                  <div
                    v-if="(maincoinFlag || seecoinFlag || halvecoinFlag)
                    && newcoinFlag && !listfilterVal"
                    class="block-title a-3-bd b-2-cl">

                    {{$t('trade.newcon')}}
                  </div>
                  <template v-for="(item, index) in dataList">
                    <div
                      class="symbol-item a-7-bg-h"
                      v-if="countSymbolItemState(item,1) && !unsealCountSymbolItemState(item)"
                      @click="switchSymbol(item.name)"
                      :key="index + 'new'"
                      :class="{'a-7-bg':item.name === symbolCurrent}">
                      <div class="bg a-4-bg"></div>
                      <span
                        :title="symbolTitle(item.symbol)"
                        class="td-symbol b-1-cl">
                        <i
                          @click.stop="setMyMarket(item.name)"
                          class="iconMy">
                          <svg class="icon icon-16"
                          v-if="mySymbolList.indexOf(item.name) === -1"
                          aria-hidden="true">
                            <use xlink:href="#icon-c_11"></use>
                          </svg>
                          <svg class="icon icon-16"
                            v-else
                            aria-hidden="true">
                            <use xlink:href="#icon-c_11_1"></use>
                          </svg>
                        </i>
                        {{item.symbol.symbol | getCoinShowName(coinList)}}
                        <template v-if="marketCurrent === 'myMarket' || marketCurrent === 'ETF'">
                          /{{item.symbol.unit | getCoinShowName(coinList)}}
                        </template>
                        <span class="st u-4-cl"
                          v-if="moduleType === 'ex' && item.IsST === 1 && marketCurrent !== 'myMarket'">
                          (ST)
                        </span>
                        <span class="multiple b-7-cl"
                          v-if="moduleType === 'lever' && marketCurrent !== 'myMarket'">
                          {{item.multiple}}x
                        </span>
                      </span>
                      <!-- 最新价 -->
                      <span class="td-price b-2-cl"
                        :class="item.close.class">
                        <span class="td-price-1">
                          <b v-if="item.close.data === -999999">--</b>
                          <b v-else>{{item.close.data}}</b>
                        </span>
                        <span class="td-price-2">
                          <b v-if="item.close.price === -999999">--</b>
                          <b v-else>{{item.close.price}}</b>
                        </span>
                      </span>
                      <!-- 涨跌幅 -->
                      <span class="td-rose b-1-cl" :class="item.rose.class">
                        <template v-if="item.rose.data === -999999">
                          --
                        </template>
                        <template v-else>
                          {{item.rose.data}}
                        </template>
                      </span>
                    </div>
                  </template>
                  <!-- 观察区 -->
                  <div
                    v-if="(maincoinFlag || newcoinFlag || halvecoinFlag)
                    && seecoinFlag && !listfilterVal"
                    class="block-title a-3-bd b-2-cl">
                    {{$t('trade.seecon')}}
                  </div>
                  <template v-for="(item, index) in dataList">
                    <div
                      class="symbol-item a-7-bg-h"
                      v-if="countSymbolItemState(item,2) && !unsealCountSymbolItemState(item)"
                      @click="switchSymbol(item.name)"
                      :key="index + 'new'"
                      :class="{'a-7-bg':item.name === symbolCurrent}">
                      <div class="bg a-4-bg"></div>
                      <span
                        :title="symbolTitle(item.symbol)"
                        class="td-symbol b-1-cl">
                        <i
                          @click.stop="setMyMarket(item.name)"
                          class="iconMy">
                          <svg class="icon icon-16"
                          v-if="mySymbolList.indexOf(item.name) === -1"
                          aria-hidden="true">
                            <use xlink:href="#icon-c_11"></use>
                          </svg>
                          <svg class="icon icon-16"
                            v-else
                            aria-hidden="true">
                            <use xlink:href="#icon-c_11_1"></use>
                          </svg>
                        </i>
                        {{item.symbol.symbol | getCoinShowName(coinList)}}
                        <template v-if="marketCurrent === 'myMarket' || marketCurrent === 'ETF'">
                          /{{item.symbol.unit | getCoinShowName(coinList)}}
                        </template>
                        <span class="st u-4-cl"
                          v-if="moduleType === 'ex' && item.IsST === 1 && marketCurrent !== 'myMarket'">
                          (ST)
                        </span>
                        <span class="multiple b-7-cl"
                          v-if="moduleType === 'lever' && marketCurrent !== 'myMarket'">
                          {{item.multiple}}x
                        </span>
                      </span>
                      <!-- 最新价 -->
                      <span class="td-price b-2-cl"
                        :class="item.close.class">
                        <span class="td-price-1">
                          <b v-if="item.close.data === -999999">--</b>
                          <b v-else>{{item.close.data}}</b>
                        </span>
                        <span class="td-price-2">
                          <b v-if="item.close.price === -999999">--</b>
                          <b v-else>{{item.close.price}}</b>
                        </span>
                      </span>
                      <!-- 涨跌幅 -->
                      <span class="td-rose b-1-cl" :class="item.rose.class">
                        <template v-if="item.rose.data === -999999">
                          --
                        </template>
                        <template v-else>
                          {{item.rose.data}}
                        </template>
                      </span>
                    </div>
                  </template>
                  <!-- 解封区 -->
                    <div
                    v-if="(maincoinFlag || seecoinFlag  || halvecoinFlag)
                    && unsealcoinFlag && !listfilterVal"
                    class="block-title a-3-bd b-2-cl">
                    <!-- 解封区 -->
                    {{$t('trade.unseal')}}
                  </div>
                  <template v-for="(item, index) in dataList">
                    <div
                      class="symbol-item a-7-bg-h"
                      v-if="unsealCountSymbolItemState(item)"
                      @click="switchSymbol(item.name)"
                      :key="index + 'new'"
                      :class="{'a-7-bg':item.name === symbolCurrent}">
                      <div class="bg a-4-bg"></div>
                      <span
                        :title="symbolTitle(item.symbol)"
                        class="td-symbol b-1-cl">
                        <i
                          @click.stop="setMyMarket(item.name)"
                          class="iconMy">
                          <svg class="icon icon-16"
                          v-if="mySymbolList.indexOf(item.name) === -1"
                          aria-hidden="true">
                            <use xlink:href="#icon-c_11"></use>
                          </svg>
                          <svg class="icon icon-16"
                            v-else
                            aria-hidden="true">
                            <use xlink:href="#icon-c_11_1"></use>
                          </svg>
                        </i>
                        {{item.symbol.symbol | getCoinShowName(coinList)}}
                        <template v-if="marketCurrent === 'myMarket' || marketCurrent === 'ETF'">
                          /{{item.symbol.unit | getCoinShowName(coinList)}}
                        </template>
                        <span class="st u-4-cl"
                          v-if="moduleType === 'ex' && item.IsST === 1 && marketCurrent !== 'myMarket'">
                          (ST)
                        </span>
                        <span class="multiple b-7-cl"
                          v-if="moduleType === 'lever' && marketCurrent !== 'myMarket'">
                          {{item.multiple}}x
                        </span>
                      </span>
                      <!-- 最新价 -->
                      <span class="td-price b-2-cl"
                        :class="item.close.class">
                        <span class="td-price-1">
                          <b v-if="item.close.data === -999999">--</b>
                          <b v-else>{{item.close.data}}</b>
                        </span>
                        <span class="td-price-2">
                          <b v-if="item.close.price === -999999">--</b>
                          <b v-else>{{item.close.price}}</b>
                        </span>
                      </span>
                      <!-- 涨跌幅 -->
                      <span class="td-rose b-1-cl" :class="item.rose.class">
                        <template v-if="item.rose.data === -999999">
                          --
                        </template>
                        <template v-else>
                          {{item.rose.data}}
                        </template>
                      </span>
                    </div>
                  </template>
                </vue-scroll>
              </template>
              <!-- 暂无数据 -->
              <div v-else class="not-data">
                <svg class="icon icon-50" aria-hidden="true">
                  <use xlink:href="#icon-g_2"></use>
                </svg>
                <p>
                  <!-- 暂无数据 -->
                  {{$t('trade.notData')}}
                </p>
              </div>
            </div>
          </div>
        </div>     
      </div>
    </div>
  </div>
</template>
<script>
import mixin from '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/modules/trade/market/market';
import '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/modules/trade/market/tradeMarket.styl';

export default {
  mixins: [mixin],
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
      coinTabs: [
        { label: this.$t('pageTitle.spot'), value: 'spot' },
        { label: this.$t('pageTitle.futures'), value: 'futures' },
      ],
      activeExchange: 'spot',
    }
  },
  computed: {
    linkurl() {
      if (this.$store.state.baseData.publicInfo) {
        return this.$store.state.baseData.publicInfo.url;
      }
      return {};
    },
  },
  methods: {
    handlerChangeTab(item) {
      let tradeUrl = ''
      let contractUrl = ''
      if (process.env.NODE_ENV === 'development') {
        tradeUrl = this.linkurl.exUrl ? '/ex/zh_CN/trade' : '';
        contractUrl = this.linkurl.coUrl ? '/co/zh_CN/trade' : '';
      } else {
        tradeUrl = this.linkurl.exUrl ? `${this.linkurl.exUrl}/${this.$store.state.baseData.lan}/trade` : '';
        contractUrl = this.linkurl.coUrl ? `${this.linkurl.coUrl}/${this.$store.state.baseData.lan}/trade` : '';
      }
      window.location.href = item.value === 'spot' ? tradeUrl : contractUrl
    }
  }
};
</script>

<style lang="stylus" scoped>
  .trade-market-index-container.trade-market .market-symbol .grid_tbody {
    height: 723px;
  }
  .en_US .trade-market-index-container.trade-market .market-symbol .grid_tbody {
    height: 735px;
  }
  /deep/.spot-search {
    border: none;
    .iconbox {
      display: none;
    }
    .clones {
      display: none;
    }
    input {
      height: 28px;
      line-height: 28px;
      color: RGB(167, 180, 203);
    }
  }
	.symbol-item {
		border-bottom: 1px solid rgb(167, 180, 203);
		padding: 0 15px !important;
		box-sizing: border-box;
		background-color: #fff;
		display: flex;
		align-items: center;
		.td-symbol {
			font-size: 14px;
			font-weight: 600;
			color: rgb(22, 22, 31);
		}
		.td-price {
			line-height: 19px !important;
			.td-price-1 {
				font-size: 14px;
				font-weight: 600;
				color: rgb(22, 22, 31);
				line-height: 14px !important;
			}
			.td-price-2 {
				font-size: 12px;
				font-weight: 600;
				color: rgb(167, 180, 203);
				line-height: 14px !important;
			}
		}
		.td-rose {
			font-weight: 700;
			font-size: 14px;
		}
	}
  .input-box {
    width: 326px;
    height: 36px;
    border-radius: 18px;
    display: flex;
    align-items: center;
    padding-left: 16px;
    padding-right: 16px;
    box-sizing: border-box;
    background-color: #fff;
    margin-bottom: 30px;
    img {
      width: 24px;
      height: 24px;
      margin-right: 16px;
    }
  }
  .left-content {
    height: 1157px;
    border-radius: 10px;
    background-color: #fff;
    .coin-tabs {
      display: flex;
      margin-bottom: 19px;
      .coin-item {
        width: 50%;
        height: 45px;
        line-height: 45px;
        text-align: center;
        background-color: rgba(167, 180, 203, .1);
        font-size: 14px;
        font-weight: 700;
        color: #16161F;
        cursor: pointer;
        &:first-child {
          border-top-left-radius: 10px;
        }
        &:last-child {
          border-top-right-radius: 10px;
        }
        &.active {
          background-color: #fff;
          color: #1269FF;
          border-bottom: 1px solid rgba(167, 180, 203, .1);
        }
      }
    }
    .coin-container {
      height: calc(100% - 65px);
      background-color: #fff;
      border-radius: 10px;
    }
  }
</style>
