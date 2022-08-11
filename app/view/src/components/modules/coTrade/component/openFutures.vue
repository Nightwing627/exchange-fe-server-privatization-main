<!-- 保证金模式 -->
<template>
  <c-dialog
    paddingBottom="14px"
    :showFlag="isShow"
    :confirmLoading="dialogConfirmLoading"
    :confirmDisabled="dialogConfirmDisabled"
    :titleText="lanText.titleText"
    :confirmText="lanText.confirmText"
    @close="close"
    @confirm="submit">
    <div class="openFutures-box">
      <div class="text">
        <vue-scroll>
         <p>{{lanText.text1}}</p>
         <p>{{lanText.text2}}</p>
         <p>{{lanText.text3}}</p>
         <p>{{lanText.text4}}</p>
         <p>{{lanText.text5}}</p>
         <p>{{lanText.text6}}</p>
         <p>{{lanText.text7}}</p>
        </vue-scroll>
      </div>
    </div>
  </c-dialog>
</template>
<script>
import mixin from '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/modules/coTrade/openFutures/openFutures';
import '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/modules/coTrade/openFutures/openFutures.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
