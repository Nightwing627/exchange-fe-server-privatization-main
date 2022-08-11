<!-- 二次确认 -->
<template>
  <div>
    <c-dialog
      paddingBottom="14px"
      :showFlag="isShow"
      :confirmLoading="dialogConfirmLoading"
      :confirmDisabled="dialogConfirmDisabled"
      :titleText="titleText"
      :confirmText="confirmText"
      confirmBtnClass="toConfirmBtn"
      @close="close"
      @confirm="submitConfirm">
      <section class="forced-reminder-window">
        <div class="stop-profit-and-loss">
          <div class="title">
            {{orderType}} {{ time }}
          </div>
          <div class="dialog-div a-4-bg">
            <!-- 条件单 -->
            <div class="dialog-div-module a-5-bd" v-if="dataInfo.currentCategory === 3">
              <span class="th">
                <!-- 触发价格 -->
                {{lanText.text1}}
              </span>
              <span class="td b-1-cl">{{ dataInfo.triggerPrice }}</span>
            </div>
            <div class="dialog-div-module a-5-bd">
              <span class="th">
                <!-- 价格 -->
                {{lanText.text2}}
              </span>
              <span class="td b-1-cl">{{ dataInfo.price }}</span>
            </div>
            <div class="dialog-div-module a-5-bd">
              <span class="th"> {{volPrice}} </span>
              <span class="td b-1-cl"> {{ dataInfo.vol }} </span>
            </div>
            <div class="dialog-div-module a-5-bd margin-item">
              <span class="th"> {{ marginTitle }} </span>
              <span class="td b-1-cl"> {{ dataInfo.marginCoin }} </span>
            </div>
          </div>
          <p class="not-reconfirm" @click="isReConfirmFun">
            <c-checkBox :value="isNotReConfirm" />
            <!-- 下次不要提示，您可在【交易偏好设置】中重新设置 -->
            {{lanText.text3}}
          </p>
        </div>
      </section>
    </c-dialog>
  </div>
</template>
<script>
import mixin from '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/modules/coTrade/components/forcedReminder/forcedReminder';
import '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/modules/coTrade/components/forcedReminder/forcedReminder.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
