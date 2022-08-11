<template>
  <div class="notice-info home-bg">
    <!-- <c-pageBanner :title="$t('message.help_center')" className="d-1-bg"></c-pageBanner> -->
    <div class="main-content">
      <div class="menu">
        <!-- <div class="menu-tit f-2-cl">{{$t('message.help_center')}}</div> -->
        <ul class="f-2-cl">
          <li
            v-for="(item, index) in sideList"
            :key="index"
            @click="goPage(item.fileName)"
            :class = "{'f-2-cl c-4-bg' : contentId === item.fileName}"
            class="menu-item">
              {{item.title}}
            </li>
        </ul>
      </div>
      <div class="content-box">
        <div class="content-text c-4-bg">
          <h1 class="content-title f-1-cl">{{notieContent.title}}</h1>
          <p class="time f-2-cl">{{notieContent.ctime}}</p>
          <div class="main-text f-2-cl" v-html ="notieContent.content">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import mixin from '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/cms/cms';
import '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/cms/cms.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
