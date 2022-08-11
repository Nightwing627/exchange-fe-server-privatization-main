<template>
  <div class="innovation">
    <c-pageBanner
      :title="bannerTitle"
      :backgroungImgUrl="bannerImg"
      :imgMap="imgMap"
    ></c-pageBanner>
    <div class="innovation-content">
      <c-navTab
        activeClassName="f-1-cl"
        activeColor="c-8-bg"
        class="c-5-bd"
        :currentTab="nowType"
        :navTab="navTab"
        lineHeight="55"
        @currentType="currentType"
      />
      <div class="innovation-list" v-if="dataList.length">
        <div
          class="innovation-item c-4-bg"
          :key = "index"
          v-for="(item, index) in dataList">
          <div class="img">
            <img :src="item.logo" alt="">
          </div>
          <div class="info" style="cursor: pointer;"
          @click="submit(item.projectId)">
            <h2 class="tit f-1-cl">
              {{item.name}}
              <label :class="statusClass(item)" class="statusLabel">{{setStatusText(item)}}</label>
            </h2>
            <div class="bf">
              <p>
                <span>
                  <!-- 进度 -->
                  {{$t('innov.progress')}}
                </span>
                <span class="f-r">
                  <!-- 融资总额 -->
                  {{$t('innov.rz_total')}}
                </span>
              </p>
              <div class="jdt d-5-bg">
                <div class="jdt-bar c-8-bg"
                :style="{'width':countScale(item.speed ,100)  + '%'}">
                </div>
              </div>
              <p class="f-1-cl">
                <span>{{countScale(item.speed ,100)}}%</span>
                <span class="f-r">
                  {{fixDFun(item.money, item.coinSymbol)}}
                  {{item.coinSymbol | getCoinShowName(coinList)}}
                </span>
              </p>
            </div>
            <div class="cz">
              <div class="timer">
                <span class="tim">
                  <!-- 开始结束日期 -->
                  {{$t('innov.start')}}
                </span>
                <span class="val f-1-cl">
                  {{formatTimeFn(item.startTime)}}
                   ～
                  {{formatTimeFn(item.endTime)}} </span>
              </div>
              <c-button type="solid"
                :disabled="submitDisabled(item)"
                :class="disabledClass(item)"
                height="40px"
                width="120px"
                paddingW="0px"
                @click="submit(item.projectId)">
                <!-- 立即申购 -->
                <!-- <span v-if="item.status === 4">{{$t('innov.dh_end')}}</span>
                <span v-else-if="item.status === 3">{{$t('innov.dh_financing')}}</span>
                <span v-else>{{$t('innov.immediate')}}</span> -->
                <span>{{$t('innov.immediate')}}</span>
              </c-button>
            </div>
            <div class="text c-5-bd">
              {{item.projectIntro}}
            </div>
          </div>
        </div>
        <c-pagination v-if="(pagination.count/pagination.pageSize) > 1"
                :total="pagination.count"
                classes="c-4-bd c-4-bg"
                :current-page='pagination.page'
                :display='pagination.pageSize'
                @pagechange="pagechange">
        </c-pagination>
      </div>
      <div class="no-data" v-else>
        <svg class="icon icon-50" aria-hidden="true">
          <use xlink:href="#icon-g_2"></use>
        </svg>
        <p>
          <!-- 暂无数据 -->
          {{$t('common.notData')}}
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import mixin from '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/innovation/list/list';
import '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/innovation/list/list.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
  methods: {
    submitDisabled() {
      // if (item.status === 2 || item.status === 3) {
      //   return false;
      // }
      return false;
    },
    disabledClass(item) {
      if (item.status === 2 || item.status === 3) {
        return 'u-8-bg';
      }
      return 'u-11-bg';
    },
    submit(data) {
      this.$router.push(`/innovation/${data}`);
    },
  },
};
</script>
