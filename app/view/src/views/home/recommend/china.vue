<template>
  <div class="recommend">
    <vue-scroll
      :ops="ops"
      ref="vs"
      @handle-scroll="handleScroll">
      <div class="recommend-wrap" :style="{'width': itemWidth + 'px'}">
        <template  v-if="!isCoOpen">
          <div class="recommend-content c-4-bg c-3-cl-h"
              v-for="(item, idx) in headerSymbol" :key="idx">
            <div
              @click="bandLink(item)"
              v-if="dataList[item]"
              class="hvol links f-2-cl">
              <p class="recommendTop">
                <span class="recommendType">
                  {{item | getCoinShowName(symbolAll)}}
                  <div class="coin-label" v-if="dataList[item].coinLabel">
                    <span class="coin-text a-12-cl">{{ dataList[item].coinLabel}}</span>
                    <span class="coin-bg a-12-bg"></span>
                  </div>
                </span>
                <span class="percentage"
                      :class="dataList[item].rose ? dataList[item].rose.class : '' ">
                {{dataList[item].rose ? dataList[item].rose.data : ''}}
              </span>
              </p>
              <p class="recommendPrice f-1-cl">
                <!-- <span :class="dataList[item].close.class"> -->
                <span>
                {{dataList[item].close ? dataList[item].close.data : ''}}
              </span>
              </p>
              <p
                class="recommendTime">
                24H Vol {{dataList[item].vol}}{{isCoOpen ? $t('common.zhang') : ''}}</p>
            </div>
            <div v-else class="hvol f-2-cl">
              <p class="recommendTop">
                <span class="recommendType">
                  {{item | getCoinShowName(symbolAll)}}
                </span>
                <span class="percentage">
                --
              </span>
              </p>
              <p class="recommendPrice">--</p>
              <p class="recommendTime">--</p>
            </div>
            <charts :key="item" :dataList = "klineDataList[item]" :name= "item" />
          </div>
        </template>
        <template  v-if="isCoOpen">
          <div class="recommend-content c-4-bg c-3-cl-h"
              v-for="(item, idx) in coHeaderSymbol" :key="idx">
            <div
              @click="bandLink(item.symbol)"
              v-if="dataList[item.symbol]"
              class="hvol links f-2-cl">
              <p class="recommendTop">
                <span class="recommendType">
                  {{item.symbol | getCoinShowName(symbolAll)}}
                  <div class="coin-label" v-if="dataList[item.symbol].coinLabel">
                    <span class="coin-text a-12-cl">{{ dataList[item.symbol].coinLabel}}</span>
                    <span class="coin-bg a-12-bg"></span>
                  </div>
                </span>
                <span class="percentage"
                      :class="dataList[item.symbol].rose ? dataList[item.symbol].rose.class : '' ">
                {{dataList[item.symbol].rose ? dataList[item.symbol].rose.data : ''}}
              </span>
              </p>
              <p class="recommendPrice f-1-cl">
                <!-- <span :class="dataList[item].close.class"> -->
                <span>
                {{dataList[item.symbol].close ? dataList[item.symbol].close.data : ''}}
              </span>
              </p>
              <p
                class="recommendTime">
                24H Vol {{dataList[item.symbol].vol}}{{isCoOpen ? $t('common.zhang') : ''}}</p>
            </div>
            <div v-else class="hvol f-2-cl">
              <p class="recommendTop">
                <span class="recommendType">
                  {{item.symbol | getCoinShowName(symbolAll)}}
                </span>
                <span class="percentage">
                --
              </span>
              </p>
              <p class="recommendPrice">--</p>
              <p class="recommendTime">--</p>
            </div>
            <charts :key="item.symbol" :dataList="klineDataList[item.symbol]" :name="item.symbol" />
          </div>
        </template>
      </div>
    </vue-scroll>
    <span
      v-if="process > 0"
      @click="scrollRecommend('prev')"
      class="scroll-btn prev">
      <em>
        <svg class="icon icon-24" aria-hidden="true">
          <use xlink:href="#icon-e_11"></use>
        </svg>
      </em>
      <i class="bg c-1-bg"></i>
    </span>
    <span
      v-if="process < 1 && itemWidth > clientWidths"
      @click="scrollRecommend('next')"
      class="scroll-btn next">
      <em>
        <svg class="icon icon-24" aria-hidden="true">
          <use xlink:href="#icon-e_11"></use>
        </svg>
      </em>
      <i class="bg c-1-bg"></i>
    </span>
  </div>
</template>

<script>
import commonMixin from '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/home/recommend/recommend';
import '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/home/recommend/recommend.styl';
import Charts from '../charts/china.vue';

export default {
  name: 'info',
  mixins: [commonMixin],
  components: {
    Charts,
  },
  mounted() {
    this.init();
  },
};
</script>
