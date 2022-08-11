<template>
  <div class="main personalPage">
    <div class="margin-left clearfix a-5-bg">
      <div class="margin-left clearfix">
        <div
          v-if="templateLayoutType !== '2'"
          class="title b-1-cl medium-fonts medium"
        >
          {{ this.$t("personal.navMenu.title") }}
        </div>
        <c-navMenu
          :width="190"
          :lineHidth1="lineHidth1"
          :subLineHidth="subLineHidth"
          activeColor="b-1-cl"
          :navList="navList"
          :navListActive="navListActive"
          @listChange="listChanges"
        />
      </div>
    </div>
    <div class="page-title a-5-bg" v-if="templateLayoutType === '2'">
      <div class="page-title-bar b-1-cl">
        {{ pageTitleText }}
      </div>
    </div>
    <div class="margin-right a-5-bg clearfix">
      <vue-scroll v-if="templateLayoutType === '2'">
        <div class="margin-right-bar">
          <router-view />
        </div>
      </vue-scroll>
      <div class="margin-right-bar" v-else>
        <router-view />
      </div>
    </div>
  </div>
</template>
<script>
import mixin from '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/personal/index/index';
import '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/personal/index/index.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
