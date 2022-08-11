<template>
  <div class="initiateQuestions home-bg">
    <!-- <c-pageBanner :title="$t('message.help_center')" className="d-1-bg"></c-pageBanner> -->
    <div class="main-content">
      <div class="menu">
        <div class="menu-tit f-1-cl">{{ $t('questions.title') }}</div>
        <ul class="f-2-cl">
          <li
            v-for="(item, index) in sideList"
            :key="index"
            :class="{'f-1-cl c-4-bg' : contentId === item.fileName}"
            @click="pushRouter(item.fileName)"
            class="menu-item">
              {{item.title}}
            </li>
        </ul>
      </div>
      <div class="content-box">
        <div class="content-text c-4-bg">
          <!-- <h1 class="content-title f-1-cl">{{notieContent.title}}</h1>
          <p class="time f-2-cl">{{notieContent.ctime}}</p>
          <div class="main-text f-2-cl" v-html ="notieContent.content">
          </div> -->
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mixin from '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/problemCenter/index/index';
import '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/problemCenter/index/index.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
