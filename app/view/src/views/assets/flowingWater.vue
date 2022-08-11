<template>
  <section class="page-flowingWater">
    <div class="flowingWater-nav a-3-bd">
      <c-navTab
        activeClassName="b-1-cl"
        activeColor="a-12-bg"
        className="b-2-cl"
        :currentTab="nowType"
        :navTab="navTab"
        lineHeight="55"
        @currentType="currentType"
      />
    </div>
    <template v-if="nowType === 4">
      <innovations />
    </template>
    <template v-else>
      <div class="flowingWater-options">
        <!-- 币种 -->
        <c-select
          :promptText="$t('assets.flowingWater.coin')"
          :value="symbol"
          :options="symbolList"
          :errorHave="true"
          width="120px"
          :filterable="true"
          @onChanges="symbolChange"
        />
        <!-- 类型 -->
        <c-select
          v-if="nowType === 2  && isInnerTransferOpen"
          :promptText="$t('assets.flowingWater.type')"
          :value="otherTypeInner"
          :options="otherTypeListInner"
          :errorHave="true"
          width="150px"
          @onChanges="otherTypeChangeInner"
        />
        <!-- 类型 -->
        <c-select
          v-if="nowType === 1 && isInnerTransferOpen"
          :promptText="$t('assets.flowingWater.type')"
          :value="topUpTypeInner"
          :options="topUpTypeList"
          :errorHave="true"
          width="150px"
          @onChanges="topUpTypeChange"
        />
        <!-- 类型 -->
        <c-select
          v-if="nowType === 3"
          :promptText="$t('assets.flowingWater.type')"
          :value="otherType"
          :options="otherTypeList"
          :errorHave="true"
          width="150px"
          @onChanges="otherTypeChange"
        />
        <!-- 类型 -->
        <c-select
          v-if="nowType === 5"
          :promptText="$t('assets.flowingWater.type')"
          :value="currentIncomeType"
          :options="incomeType"
          :errorHave="true"
          width="150px"
          @onChanges="setIncomeType"
        />
      </div>
      <div class="flowingWater-table">
        <c-table
          :cellHeight="55"
          :imgMap="imgMap"
          :colorMap="colorMap"
          :loading="tabelLoading"
          :subContent="subTableData"
          :subContentId="subTableDataId"
          :subColumns="subColumns"
          :columns="columns"
          :dataList="tabelList"
          bodyClasses="bodyClasses"
          @elementClick="tableClick"
        />
        <c-pagination
          v-if="paginationObj.total > paginationObj.display"
          :total="paginationObj.total"
          :display="paginationObj.display"
          :currentPage="paginationObj.currentPage"
          @pagechange="pagechange"
        />
      </div>
    </template>
  </section>
</template>
<script>
import mixin from '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/assets/flowingWater/flowingWater';
import '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/assets/flowingWater/flowingWater.styl';
import {
  formatTime,
} from '@knoxexchange/blockchain-ui-privatization/utils';
import innovations from './innovations.vue';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
  components: {
    innovations,
  },
  methods: {
    // 撤销操作
    tableClick(type, id) {
      if (type === 'revoke') {
        let even = {};
        this.tabelList.forEach((item) => {
          if (item.id === id) {
            even = item;
          }
        });
        if (this.revokeList.indexOf(even.id) === -1) {
          this.revokeList.push(even.id);
          this.axios({
            url: '/finance/cancel_withdraw',
            headers: {},
            params: {
              withdrawId: even.id,
            },
            method: 'post',
          }).then((data) => {
            const ind = this.revokeList.indexOf(even.id);
            this.revokeList.splice(ind, 1);
            if (data.code.toString() === '0') {
              this.getData();
              this.$bus.$emit('tip', { text: data.msg, type: 'success' });
            } else {
              this.$bus.$emit('tip', { text: data.msg, type: 'error' });
            }
          });
        }
      }
      if (type === 'subView') {
        this.subTableDataId = id.id;
        this.subTableData = [];
        this.financeListData.forEach((item) => {
          if (item.id === this.subTableDataId) {
            let address = item.addressTo;
            const txidadd = item.txid;
            if (this.isHavePage) {
              const [newAddress] = address.split('_');
              address = newAddress;
            }
            // if (
            //   this.publicInfo.switch.open_txid_addr
            //   && this.publicInfo.switch.open_txid_addr === '1'
            // ) {
            // const txid = `<a href='${item.txidAddr}' target='_blank' class='b-4-cl'>
            // ${item.txid}</a>`;
            //   txidadd = txid;
            // }
            this.subTableData.push([
              address, // 地址
              item.walletTime ? formatTime(item.walletTime) : '---',
              txidadd || '---',
            ]);
          }
        });
      }
    },
  },
};
</script>
