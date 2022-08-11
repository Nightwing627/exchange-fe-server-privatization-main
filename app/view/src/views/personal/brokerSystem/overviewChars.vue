<template>
  <section class="overview-chars a-7-bd">
    <div class="overviewChars-header clearfix">
      <!-- 返佣收益 -->
      <span class="overviewChars-header-tit b-1-cl">
         {{ $t('brokerSystem.overview[0]') }}
      </span>
      <!-- 资产折合每2小时实时更新 -->
      <span class="overviewChars-header-text">
        {{$t('brokerSystem.updateTime')}}
      </span>
    </div>
    <div class="overviewChars-content clearfix">
      <div class="overviewChars-content-left">
        <!-- 累计返佣折合 -->
        <div class="overviewChars-content-sum">
          <div class="overviewChars-content-sumT">
            <!-- 累计返佣折合(USDT) -->
            {{ $t('brokerSystem.overview[2]') }}
          </div>
          <div class="overviewChars-content-sumV b-1-cl a-3-bd">
            {{amountTotal}}
          </div>
        </div>
        <div class="overviewChars-content-mess clearfix">
          <!-- 昨日返佣折合 -->
          <div class="overviewChars-content-messL">
            <div class="overviewChars-content-messT">
              <!-- 昨日返佣折合(USDT) -->
              {{ $t('brokerSystem.overview[3]') }}
            </div>
            <div class="overviewChars-content-messV b-1-cl">
              {{ amountYesterday }}
            </div>
            <div class="overviewChars-content-messC a-4-bg clearfix">
              <span class="overviewChars-content-messCK">
                <!-- 同比上一日 -->
                {{ $t('brokerSystem.overview[5]') }}
              </span>
              <span class="overviewChars-content-messCV"
                :class="getRateClass(amountYesterdayRate)">
                {{ amountYesterdayRate | rateFilter }}
              </span>
            </div>
          </div>
          <!-- 前日返佣折合 -->
          <div class="overviewChars-content-messR">
            <div class="overviewChars-content-messT">
              <!-- 前日返佣折合(USDT) -->
              {{ $t('brokerSystem.overview[4]') }}
            </div>
            <div class="overviewChars-content-messV b-1-cl">
              {{ amountBYesterday }}
            </div>
            <div class="overviewChars-content-messC a-4-bg clearfix">
              <span class="overviewChars-content-messCK">
                <!-- 同比上一日 -->
                {{ $t('brokerSystem.overview[5]') }}
              </span>
              <span class="overviewChars-content-messCV"
                :class="getRateClass(amountBYesterdayRate)">
                 {{ amountBYesterdayRate | rateFilter }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="overviewChars-content-right">
        <!-- 累计返佣占比 -->
        <div class="overviewChars-content-rightT">
          {{ $t('brokerSystem.overview[6]') }}
        </div>
        <div class="overviewChars-bar" id="overviewChars-bar"></div>
      </div>
    </div>
    <div class="overviewChars-line">
      <div class="overviewChars-line-title">
        <!-- 近一周返佣 -->
        {{ $t('brokerSystem.overview[7]') }}
      </div>
      <div class="overviewChars-line-charts"
         id="overviewChars-line"></div>
    </div>
  </section>
</template>

<script>
import mixin from '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/personal/brokerSystem/overviewChars/overviewChars';
import '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/personal/brokerSystem/overviewChars/overviewChars.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
