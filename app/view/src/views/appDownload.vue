<template>
  <div class="download-container f-2-cl" v-if="flag" :style="mainBg">
    <div class="download-options c-5-bd">
      <div class="download-options-logo">
        <img :src="appDownload.logo" alt="">
      </div>
      <p class="download-options-name f-8-cl">
        {{ $t('appDownLoad.title') }}
      </p>
      <!-- 随时随地 多平台终端交易 -->
      <p class="download-options-text">{{ $t('appDownLoad.desc') }}</p>
      <div class="download-options-buttons">
        <c-button className="download-button"
          @click="download('ios_ipa')">
          <svg class="icon icon-18" aria-hidden="true">
            <use xlink:href="#icon-b_13"></use>
          </svg>
          &nbsp;
          {{$t('appDownLoad.platform')[0]}}
        </c-button>
        <c-button className="download-button"
          @click="download('android')">
          <svg class="icon icon-18" aria-hidden="true">
            <use xlink:href="#icon-b_14"></use>
          </svg>
          &nbsp;
          {{$t('appDownLoad.platform')[1]}}
        </c-button>
      </div>
      <div class="download-options-rq">
        <img :src="appDownload.app_page_url" alt="">
      </div>
      <!-- 扫描二维码下载 -->
      <p class="download-options-reText">
        {{ $t('appDownLoad.twoDimension') }}
      </p>
    </div>
    <div class="download-nav c-5-bd">
      <ul class="download-nav-list clearfix">
        <li v-for="(item, index) in navList"
          :key="index"
          class="download-nav-even clearfix">
          <img :src="item.url" alt=""
            class="download-nav-img">
          <div class="download-nav-mode">
            <p class="download-nav-title f-1-cl">{{item.title}}</p>
            <p class="download-nav-text">{{item.desc}}</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="download-step">
      <!-- iOS 用户安装教程 -->
      <p class="download-step-title f-1-cl">{{ $t('appDownLoad.setUp.title') }}</p>
      <ul class="download-step-list">
        <li v-for="(item, index) in stepList"
          :key="index"
          class="download-step-even">
          <div class="download-step-label c-5-bd">{{ item.step }}</div>
          <div class="download-step-mode">
            <p class="download-step-h f-1-cl">{{ item.title }}</p>
            <p class="download-step-t">{{ item.desc }}</p>
          </div>
          <div class="download-step-img c-5-bg">
            <img :src="item.url" alt="">
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import mixin from '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/appDownload/appDownload';
import '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/appDownload/appDownload.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
