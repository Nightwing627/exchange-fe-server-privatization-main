<template>
  <div id="assets" class="assets">
    <div class="assets-main">
      <div class="margin-left a-5-bg">
        <!-- 资产中心 -->
        <p
          v-if="templateLayoutType !== '2'"
          class="assets-title b-1-cl medium-fonts medium">
          {{ $t('assets.index.title') }}
        </p>
        <c-navMenu
          :width="190"
          :lineHidth1="lineHidth1"
          :subLineHidth = "subLineHidth"
          :navList="navList"
          :navListActive="navListActive"
          @listChange="listChanges"
        />
      </div>
      <div class="assets-page-title a-5-bg" v-if="templateLayoutType === '2'">
        <div class="page-title-bar b-1-cl">
            {{pageTitleText}}
        </div>
      </div>
      <div class="margin-right a-5-bg clearfix">
      <vue-scroll>
        <router-view/>
      </vue-scroll>
    </div>
    </div>
  </div>
</template>
<script>
import mixin from '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/assets/index/index';
import '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/assets/index/index.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
