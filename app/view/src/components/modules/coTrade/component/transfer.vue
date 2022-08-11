<!--
// *author: hdd
// *date：2020-09-10
// *des：资金划转
// */
 -->
<template>
  <div >
    <c-dialog
      :showFlag="isShow"
      :titleText="$t('futures.transfer.transfer')"
      @close="close"
      @confirm="dialogConfirm"
      :confirmLoading="dialogConfirmLoading"
      :confirmText="confirmText"
      :confirmDisabled="dialogConfirmDisabled">
        <c-select :promptText="$t('futures.transfer.coin')"
        :value="axiosSymbol"
        :options="symbolList"
        :errorHave="true"
        width="100%"
        :filterable="true"
        @onChanges="symbolChange"/>
      <section class="transfer-box">
          <!-- 方向 -->
          <ul class="transfer-content a-4-bg">
            <li class="transfer-page">
              <!-- 从 -->
              <div class="transfer-page-side">{{ $t('futures.transfer.from') }}</div>
              <div class="transfer-page-name b-1-cl">{{ side.from }}</div>
            </li>
            <li class="transfer-icon">
              <svg class="icon icon-36" aria-hidden="true"  @click="setTransferSide">
                <use xlink:href="#icon-f_4"></use>
              </svg>
            </li>
            <li class="transfer-page">
              <!-- 划转到 -->
              <div class="transfer-page-side">{{ $t('futures.transfer.to') }}</div>
              <div class="transfer-page-name b-1-cl">{{ side.to }}</div>
            </li>
          </ul>
          <!-- 划转数量 -->
          <c-inputLine
            name='transferValue'
            :value="transferValue"
            :promptText="$t('futures.transfer.volume')"
            :errorHave="true"
            :errorFlag="transferError"
            :errorText="$t('futures.transfer.volumeError')"
            :warningText="transferWarningText"
            @onchanges="inputLineChange">
            <!-- 全部 -->
            <c-button type="text" height="30px" @click="allTransfer">
              {{ $t('futures.transfer.all') }}
            </c-button>
          </c-inputLine>
        </section>
    </c-dialog>
  </div>
</template>
<script>
import mixin from '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/modules/coTrade/components/transfer/transfer';
import '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/modules/coTrade/components/transfer/transfer.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
<style lang="stylus" scoped>
.transfer-box {
    padding-top: 10px;
    padding-bottom: 16px;
    .transfer-content {
      width: 400px;
      height: 70px;
      margin-bottom: 23px;
      user-select: none;
      li {
        float: left;
      }
      .transfer-page {
        width: 160px;
        padding-left: 15px;
        height: 70px;
      }
      .transfer-page-side {
        font-size: 12px;
        line-height: 16px;
        margin-top: 13px;
      }
      .transfer-page-name {
        margin-top: 5px;
        font-size: 14px;
      }
      .transfer-icon {
        width: 50px;
        height: 70px;
        line-height: 85px;
        text-align: center;
        .icon { cursor: pointer }
      }
    }
  }
</style>
