<template>
  <div
    class="future-canter-echart-box"
    :style="{ height: TvBoxHeight }"
    :class="{ 'canter-echart-full': isfullTv }"
    ref="tv_chart_container">
    <div class="top-menu b-3-cl">
      <div class="top-menu-bar">
        <div
          class="top-menu-box">
          <span
            @click="timeClike('Line')"
            :class="{ 'a-4-bg b-1-cl': lastTimeS === 'Line' }"
            class="time-line  a-4-cl-h">
            <i class="hoverHide">Line</i>
            <i class="b-1-cl hoverShow">Line</i>
          </span>
          <span
            v-for="item in baseTimeArry"
            @click="timeClike(item)"
            :key="item"
            :class="{ 'a-4-bg b-1-cl': lastTimeS === item }"
            class="time-line a-4-cl-h">
            <i class="hoverHide">{{ item }}</i>
            <i class="b-1-cl hoverShow">{{ item }}</i>
          </span>
          <span class="time-line full-btn c-5-bd a-4-cl-h" @click="fullTv">
            <template v-if="!isfullTv">
              <i class="hoverHide">{{ $t("trade.full") }}</i>
              <i class="b-1-cl hoverShow">{{ $t("trade.full") }}</i>
            </template>
            <template v-else>
              <i class="hoverHide">{{ $t("trade.outFull") }}</i>
              <i class="b-1-cl hoverShow">{{ $t("trade.outFull") }}</i>
            </template>
          </span>
        </div>

      </div>
    </div>
    <transition name="fade">
      <div v-show="isshowLoading" class="loading">
        <c-loading size="50" />
      </div>
    </transition>
    <p class="c-5-bd inline"></p>
    <div class="kline-bg" v-if="klineLogo">
      <img :src="klineLogo" class="kline-img" alt="" />
    </div>
    <!-- <div class="coverKlineBox"></div> -->
    <div class="slide" :class="{ selected: chartType === 1 }">
      <div id="tv_chart_container" class="tv_chart_container"></div>
    </div>


  </div>
</template>
<script>
import mixin from '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/modules/coTrade/components/echartsKline/echartsKline';
import '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/modules/coTrade/components/echartsKline/echartsKline.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
