<template>
  <section class="page-otcOrder">
    <div class="otcOrder-nav a-3-bd">
      <c-navTab
        activeClassName="b-2-cl"
        activeColor="a-12-bg"
        className="b-2-cl"
        :currentTab="nowType"
        :navTab="navTab"
        lineHeight="55"
        @currentType="currentType"
      />
      <div class="otcOrder-nav-switchs" v-if="nowType === 2">
        <!-- 显示已撤单 -->
        <c-switch
          :value="switchFlag"
          @click="switchChange"/><span class="text">{{ $t('order.otcOrder.haveCancel') }}</span>
      </div>
    </div>
    <div class="otcOrder-options">
      <c-select :promptText="$t('order.otcOrder.coin')"
        :value="symbol"
        :options="symbolList"
        :errorHave="true"
        width="120px"
        :filterable="true"
        @onChanges="symbolChange"/>
    </div>
     <div class="otcOrder-table">
      <c-table
        :imgMap="imgMap"
        :colorMap="colorMap"
        :loading="tabelLoading"
        :columns="columns"
        :dataList="tabelList"
        @elementClick="tableClick"
      />
      <c-pagination v-if="paginationObj.total > paginationObj.display"
        :total='paginationObj.total'
        :display='paginationObj.display'
        :currentPage='paginationObj.currentPage'
        @pagechange="pagechange"/>
    </div>
  </section>
</template>
<script>
import mixin from '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/order/otcOrder/otcOrder';
import '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/order/otcOrder/otcOrder.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
