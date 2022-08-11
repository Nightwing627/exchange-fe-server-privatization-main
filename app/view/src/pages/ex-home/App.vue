<template>
  <div id="app" :class="pageTheme" class="b-2-cl" style="position: relative; min-height: 800px">
    <c-tip/>
    <c-header :class="headClass" v-if="!hideheade"/>
    <div
      class="page-content"
      :class="{'page-content-chain' : hideheade || navigationType === '1'}"
      style="position: relative; min-height: 800px">
      <transition
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
        mode="out-in"
        duration="200"
      >
        <router-view />
      </transition>
    </div>
    <c-footer :class="footerClass" v-if="!hideFooter"/>
  </div>
</template>

<script>
import commonMixin from '@knoxexchange/blockchain-ui-privatization/PC/pages/pages';
import mixin from '@knoxexchange/blockchain-ui-privatization/PC/pages/ex-home/ex-home';
import '@knoxexchange/blockchain-ui-privatization/PC/pages/ex-home/ex-home.styl';

export default {
  mixins: [commonMixin, mixin],
  mounted() {
    this.init();
  },
};
</script>
