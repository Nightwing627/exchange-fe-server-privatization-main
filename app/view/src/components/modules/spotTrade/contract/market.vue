<!-- 合约交易 24小时行情 -->
<template>
  <div>
    <div class="input-box">
      <img src="~@/assets/images/1/search.png" alt="">
      <c-inputFind
        :promptText="$t('futures.market.text8')"
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
        <div class="co-market-box a-21-bg">
          <div class="market-tab">
            <div class="category-select-box">
              <template v-for="(item, index) in typeTabList">
                <span class="tab"
                  :key="index"
                  v-if="item.isShow"
                  @click="changeTypeTab(item.id)"
                  :class="item.classes">
                  <i class="h">{{item.text}}</i>
                  <!-- <i class="s b-1-cl">{{item.text}}</i> -->
                </span>
              </template>
            </div>
          </div>
          <div class="co-market-symbol b-2-cl">
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
      </div>
      
    </div>

  </div>
</template>

<script>
import mixin from '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/modules/coTrade/market/market';
import '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/modules/coTrade/market/market.styl';

export default {
  mixins: [mixin],
  data() {
    return {
      coinTabs: [
        { label: this.$t('pageTitle.spot'), value: 'spot' },
        { label: this.$t('pageTitle.futures'), value: 'futures' },
      ],
      activeExchange: 'futures',
    }
  },
  mounted() {
    this.init();
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
  .spot-search {
    border: none;
    .iconbox {
      display: none;
    }
    .clones {
      display: none;
    }
    input {
      height: 28px;
      line-height: 29px;
      color: RGB(167, 180, 203);
    }
  }
	.symbol-item {
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

