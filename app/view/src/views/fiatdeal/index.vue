<template>
  <div class="main">
    <div class="margin-left clearfix a-5-bg">
      <div class="margin-left clearfix">
        <div class="title b-1-cl medium-fonts medium">
          {{
            fiatTradeOpen
            ? $t('assets.b2c.otcShow.fiatdealTitle')
            : $t('fiatdeal.title')}}
        </div>
        <c-navMenu
          :width="190"
          :lineHidth1="56"
          :navList="navList"
          :navListActive="navListActive"
          @listChange="listChanges"
        />
      </div>
    </div>
    <div class="otc-page-title a-5-bg" v-if="templateLayoutType === '2'">
      <div class="page-title-bar b-1-cl">
          {{pageTitleText}}
      </div>
    </div>
    <div class="margin-right a-5-bg clearfix">
      <vue-scroll>
        <Center />
      </vue-scroll>
    </div>
  </div>
</template>

<script>
import mixin from '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/fiatdeal/index/index';
import '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/fiatdeal/index/index.styl';
import Center from '@/views/fiatdeal/center.vue';

export default {
  mixins: [mixin],
  components: {
    Center,
  },
  mounted() {
    this.init();
  },
};
</script>
