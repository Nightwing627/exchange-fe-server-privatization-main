// Created by 任泽阳 on 19/03/14.
// 资产中心 合约账户页面
<template>
  <div class="page-coAccount">

  <!-- 开通合约弹框 -->
    <openFutures
      :isShow="openFuturesDialogShow"
      :close="closeDialog"
    />
    <div class="a-7-bd">
      <div class="exchangeAccount-title a-3-bd">
        <!-- 合约账户 -->
        <div class="text b-1-cl medium">{{$t('futures.coAccount.coAccount')}}</div>
      </div>
      <div class="exchangeAccount-center">
        <c-table
          :cellHeight='55'
          :imgMap="imgMap"
          :colorMap="colorMap"
          :loading="tabelLoading"
          :lineNumber="tableData.length"
          @elementClick="tableClick"
          :columns="columns"
          :dataList="tableData"
        />
      </div>
    </div>

    <common-transfer
      :symbol="symbol"
      :isShow="showFlag"
      :close="closeDialog">
    </common-transfer>

  </div>
</template>

<script>
import mixin from '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/assets/coAccount/coAccount';
import '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/assets/coAccount/coAccount.styl';
// 开通合约交易弹框
import openFutures from '@/components/modules/coTrade/component/openFutures.vue';
// 划转
import commonTransfer from '@/components/modules/coTrade/component/transfer.vue';

export default {
  mixins: [mixin],
  components: {
    openFutures,
    commonTransfer,
  },
  mounted() {
    this.init();
  },
};
</script>
