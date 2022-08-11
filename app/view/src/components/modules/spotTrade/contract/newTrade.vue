<!-- 币币交易 实时成交 -->
<template>
  <div class="coNewTrade-container">
    <div class="block-header a-3-bd a-21-bg">
      <span class="h4 b-1-cl">
        <!-- 实时成交 -->
        {{$t('futures.newTrade.text1')}}
      </span>
    </div>
    <div class="block-content a-6-bg">
      <div
        v-if="theadList && theadList.length"
        class="thead a-3-bd e-2-cl">
        <span
          v-for="(item, index) in theadList"
          :key="'thead' + index"
          :style="{ width: cellWidth[index] + 'px' }">
          {{ item }}
        </span>
      </div>
      <div class="tbody">
        <vue-scroll>
          <div
            class="symbol-item a-21-bg-h e-2-cl"
            :class="{ 'change-item': item.change }"
            v-for="(item, index) in dataList"
            :key="kyes(item, index)">
            <div class="bg a-21-bg"></div>
            <!-- 价格 -->
            <span
              class="td-symbol"
              @click="handelPrice(item.price)"
              :class="item.side"
              :style="{ width: cellWidth[0] + 'px' }">
              {{ thousandsComma(item.price) }}
              <!-- <b class="hover_show">{{item.rate}}</b> -->
            </span>
            <!-- 成交量 -->
            <span class="td-price" :style="{ width: cellWidth[1] + 'px' }">
              {{ thousandsComma(item.vol) }}
            </span>
            <!-- 时间 -->
            <span class="td-rose" :style="{ width: cellWidth[2] + 'px' }">
              {{ item.time }}
            </span>
          </div>
          <div
            class="symbol-item a-21-bg-h e-2-cl"
            :key="index + 'diff'"
            v-for="index in differNUmber">
            <span class="td-symbol" :style="{ width: cellWidth[0] + 'px' }">
              --
            </span>
            <span class="td-price" :style="{ width: cellWidth[1] + 'px' }">
              --
            </span>
            <span class="td-rose" :style="{ width: cellWidth[2] + 'px' }">
              --
            </span>
          </div>
        </vue-scroll>
      </div>
    </div>
  </div>
</template>
<script>
import mixin from '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/modules/coTrade/newTrade/newTrade';
import '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/modules/coTrade/newTrade/newTrade.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
<style lang="stylus" scoped>
.a-6-bg {
  background-color: #fff;
}
</style>
