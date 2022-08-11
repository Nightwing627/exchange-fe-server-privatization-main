<!-- 合约交易 盘口 -->
<template>
  <div class="codepath-container">
    <div class="block-header title-tab a-3-bd a-21-bg">
      <span
        class="tab"
        @click="switchBlock('D')"
        :class="{'a-12-bd b-1-cl': shrinksDdpthNewShow === 'D' }">
        <!-- 委托列表 -->
        {{$t('futures.depth.text1')}}
      </span>
      <!-- <span
        class="tab tab-rtwo"
        @click="switchBlock('T')"
        :class="{'a-12-bd b-1-cl': shrinksDdpthNewShow === 'T' }">
        {{$t('futures.depth.text2')}}
      </span> -->
      <div class="depath-class h-2-bd"
        v-if="shrinksDdpthNewShow === 'D'">
        <span class="hoverHide">
            <!-- 深度 -->
            {{$t('futures.depth.text4')}}
            {{ fixDepthNumber(depathList[activeDepat]) }}
            <span class="triangle-down"></span>
          </span>
          <span class="hoverShow b-4-cl">
            <!-- 深度 -->
            {{$t('futures.depth.text4')}}
            {{ fixDepthNumber(depathList[activeDepat]) }}
            <span class="triangle-down b-4-bd"></span>
          </span>
        <ul class="type-item a-21-bg">
          <template  >
            <li
              v-for="(item, index) in depathList"
              :key="index"
              :class="(activeDepat === index || depatHover === index) ? 'a-3-bg b-1-cl' : ''"
              @mouseenter="handMouseenter(index)"
              @mouseout="handMouseleave(index)"
              @click.stop="switchDepat(index)">
              {{ fixDepthNumber(item) }}
            </li>
          </template>
        </ul>
      </div>
    </div>
    <div class="tab-item" :class="{ 'is-show': shrinksDdpthNewShow === 'D' }">
      <div class="block-header a-3-bd a-21-bg e-2-cl">
        <span class="h4 b-1-cl">
          <!-- 委托列表 -->
          {{$t('futures.depth.text1')}}
        </span>
        <div class="depath-class h-2-bd"
          v-if="shrinksDdpthNewShow === 'D'"
          @click.stop="isShowDepat = !isShowDepat">
          <span class="hoverHide">
            <!-- 深度 -->
            {{$t('futures.depth.text4')}}
            {{ fixDepthNumber(depathList[activeDepat]) }}
            <span class="triangle-down"></span>
          </span>
          <span class="hoverShow b-4-cl">
            <!-- 深度 -->
            {{$t('futures.depth.text4')}}
            {{ fixDepthNumber(depathList[activeDepat]) }}
            <span class="triangle-down b-4-bd"></span>
          </span>
          <ul class="type-item a-21-bg" v-if="isShowDepat">
            <template  >
              <li
                v-for="(item, index) in depathList"
                :key="index"
                :class="(activeDepat === index || depatHover === index) ? 'a-3-bg b-1-cl' : ''"
                @mouseenter="handMouseenter(index)"
                @mouseout="handMouseleave(index)"
                @click.stop="switchDepat(index)">
                {{ fixDepthNumber(item) }}
              </li>
            </template>
          </ul>
        </div>
      </div>
      <div class="block-content a-6-bg">
        <tableList
          type="asks"
          :theadList="theadList"
          :dataList="dataList.asksData"
          :maxValue="dataList.depthMaxNumber"
          :cellWidth="cellWidth"
          :lineNumber="sellLineNumber"
          :bodyHeight="sellHeight"
        />
        <div class="current-price a-21-bg">
          <div class="price-box">
            <span class="indexPrice" :class="priceClsss">{{ thousandsComma(activePrice) }}
             <i v-if="priceClsss === 'u-1-cl'">↑</i>
             <i v-if="priceClsss === 'u-4-cl'">↓</i>
            </span>
            <span class="tagPrice">
              <i class="b-1-cl">
                {{ thousandsComma(publicMarkertInfo.tagPrice) }}
              </i>
              <!-- 标价价格 -->
              {{$t('futures.depth.text5')}}
            </span>
          </div>
        </div>
        <tableList
          type="buy"
          :dataList="dataList.buyData"
          :maxValue="dataList.depthMaxNumber"
          :lineNumber="buyLineNumber"
          :cellWidth="cellWidth"
          :bodyHeight="buyHeight"
        />
      </div>
    </div>
    <!-- 实时成交 -->
    <new-trade />
  </div>
</template>
<script>
import mixin from '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/modules/coTrade/depth/depth';
import '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/modules/coTrade/depth/depth.styl';
import tableList from '@/components/modules/coTrade/component/tableList.vue';
// 实时成交
import newTrade from './newTrade.vue';

export default {
  mixins: [mixin],
  components: {
    tableList,
    newTrade,
  },
  mounted() {
    this.init();
  },
};
</script>
<style lang="stylus" scoped>
.layout-block-depth, .codepath-container {
  height: 611px;
  background-color: #ffffff;
  border-radius: 10px;
}
.a-21-bg, .a-6-bg {
  background-color: #fff;
}
.tab-item {
  height: calc(100% - 57px);
}
</style>
