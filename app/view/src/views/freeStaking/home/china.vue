<template>
  <div class="free-staking" v-if="homeData">
    <div class="banner header" :style="`background-image:url(${homeData.banner})`">
      <div class="article-cont">
        <c-button
          v-if="homeData.url"
          width="120px"
          height="36px"
          @click="navToConfigUrl(homeData.url)"
        >
          {{ $t("freeStaking.home.notice") }}
        </c-button>
      </div>
    </div>
    <div class="free-staking-cont">
      <div class="title">
        <div class="titlel f-1-cl">{{ $t("freeStaking.home.title") }}</div>
        <div class="titler" @click="navToPosHistory">
          <svg class="icon icon-17" aria-hidden="true">
            <use xlink:href="#icon-a_22"></use>
          </svg>
          <span class="f-4-cl">{{ homeData.tipMine }}</span>
        </div>
        <div class="clearfix"></div>
      </div>
      <div class="nav-tab c-5-bd">
        <c-navTab
          minWidth="90px"
          activeClassName="f-1-cl"
          activeColor="c-8-bg"
          class="c-5-bd"
          :currentTab="currentType"
          :navTab="navTab"
          lineHeight="55"
          @currentType="selectType"
        />
        <div class="clearfix"></div>
      </div>
      <div class="min-tab">
        <div
          class="min-tab-item"
          :class="currentStyle(item)"
          v-for="item in statusTab"
          :key="item.index"
          @click="changeCurrentStatus(item)"
        >
          {{ item.name }}
        </div>
        <div class="clearfix"></div>
      </div>
      <div class="project-list" v-if="filterProjectData.length">
        <div
          class="project-item c-4-bg"
          v-for="item in filterProjectData"
          :key="item.index"
        >
          <div class="project-iteml">
            <img class="logo" :src="item.logo" alt="" />
            <div class="coin-base-info c-5-bd">
              <div class="base-coin f-1-cl">
                {{ item.shortName }}
                <div class="label-cont">
                  <div class="label-type" v-if="showLabel(item, 2)">
                    {{ projectLabel(item.labelType) }}
                  </div>
                  <div class="label-type hot f-6-cl" v-if="showLabel(item, 1)">
                    {{ projectLabel(item.labelType) }}
                  </div>
                </div>
              </div>
              <div class="short-name f-2-cl">{{ item.baseCoin }}</div>
            </div>
            <div class="clearfix"></div>
          </div>
          <div class="project-itemc clearfix">
            <div class="project-title f-1-cl">{{ item.name }}</div>
            <div class="label">
              <div class="label-title f-4-cl">{{ item.gainRate }}%</div>
              <div class="label-value">
                {{ $t("freeStaking.home.gainRate") }}
              </div>
            </div>
            <div class="label" v-if="item.projectType === 3">
              <div class="label-title f-1-cl">{{ item.lockDay }}</div>
              <div class="label-value">
                {{ $t("freeStaking.home.lockDay") }}
              </div>
            </div>
            <div class="label" v-if="item.projectType === 3">
              <div class="label-title f-1-cl">{{ item.progress }}</div>
              <div class="label-value">
                {{ $t("freeStaking.home.lockProgress") }}
              </div>
            </div>
          </div>
          <div class="project-itemr">
            <div class="project-status">
              <svg class="icon icon-18" aria-hidden="true">
                <use :xlink:href="iconStyle[Number(item.status)]"></use>
              </svg>
              <span
                class="status-text"
                :class="countStatusIsOn(item)"
                >{{ countStatusText(item) }}</span
              >
            </div>
            <div class="nav-active">
              <c-button
                defaultColorClass="f-4-bd f-2-cl"
                type="hollow"
                width="120px"
                height="40px"
                @click="takeActivityDetail(item)"
              >
                <div class="nav-active-text">
                  {{ $t("freeStaking.home.takeActivity") }}
                </div>
              </c-button>
            </div>
            <div class="clearfix"></div>
          </div>
          <div class="clearfix"></div>
        </div>
      </div>
      <div v-else class="no-data f-2-cl">
        <svg class="icon icon-50" aria-hidden="true">
          <use xlink:href="#icon-g_2"></use>
        </svg>
        <p>
          <!-- 暂无数据 -->
          {{ $t("common.notData") }}
        </p>
      </div>
    </div>
    <div class="banner footer">
      <div class="banner-cont clearfix">
        <img class="banner-logo" :src="homeData.footBanner" />
        <div class="rich-cont">
          <div class="rich-title">{{ homeData.footTitle }}</div>
          <div class="rich-text" v-html="homeData.detail"></div>
          <div class="rich-line"></div>
          <div class="rich-faq" v-if="homeData.faqUrl">
            <a :href="homeData.faqUrl" target="_blank">{{
              $t("freeStaking.home.FQA")
            }}</a>
          </div>
          <div class="rich-eamil" v-if="homeData.contact">
            {{ $t("freeStaking.home.contactUS") }}{{ homeData.contact }}
          </div>
          <div class="clearfix"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import mixin from '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/freeStaking/home/home';
import '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/freeStaking/home/home.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
