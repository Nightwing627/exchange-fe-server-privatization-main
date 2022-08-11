<template>
  <section class="page-otcOrder">
    <div class="otcOrder-nav a-3-bd">
      <c-navTab
        activeClassName="b-1-cl"
        activeColor="a-12-bg"
        className="e-2-cl"
        :currentTab="nowType"
        :navTab="navTab"
        lineHeight="55"
        @currentType="currentType"
      />
      <!-- <div class="otcOrder-nav-switchs" v-if="nowType === 2"> -->
        <!-- 显示已撤单 -->
        <!-- <c-switch
          :value="switchFlag"
          @click="switchChange"/><span class="text">{{ $t('order.otcOrder.haveCancel') }}</span>
      </div> -->
    </div>
    <div class="otcOrder-options">
       <c-calendar
           v-if="nowType === 3 || nowType === 4 || nowType === 5"
            width = "120px"
            name = "calendar"
            :value ="startTime"
            :promptText="$t('futures.order.startTime')"
            class="floatLeft"
            @onChanges ="startTimeSelect"
          />
          <c-calendar
           v-if="nowType === 3 || nowType === 4 || nowType === 5"
            width = "120px"
            name = "calendar"
            :value ="endTime"
            :promptText="$t('futures.order.endTime')"
            class="floatLeft"
            @onChanges ="endTimeSelect"
          />
      <!-- 交割类型 -->
      <c-select :promptText="$t('futures.order.coType')"
        :value="side"
        :options="sideList"
        :errorHave="true"
        width="120px"
        class="floatLeft"
        @onChanges="sideChange"/>
      <!-- 合约类型 -->
      <c-select :promptText="$t('futures.order.coSide')"
        :value="contractType"
        :options="contractTypeList"
        :errorHave="true"
        :filterable="true"
        width="120px"
        class="floatLeft"
        @onChanges="contractTypeChange"/>
        <!-- 合约 -->
      <c-select :promptText="$t('futures.order.contract')"
        :value="contract"
        :options="contractList"
        :errorHave="true"
        :filterable="true"
        width="120px"
        class="floatLeft"
        @onChanges="contractChange"/>
         <!-- 订单类型 -->
      <c-select :promptText="$t('futures.order.orderType')"
        v-if="nowType === 1 || nowType === 3"
        :value="orderType"
        :options="orderTypeList"
        :errorHave="true"
        :filterable="true"
        width="120px"
        class="floatLeft"
        @onChanges="orderTypeChange"/>

        <!-- <div style="float:left;height:70px;">
          <c-button paddingW="20px"
                  height="30px"
                  class="alert-button"
                  @click="search"
                  marginTop="20px">
                  搜索
          </c-button>
        </div> -->

        <div style="float:right;height:70px;" v-if="nowType === 1 || nowType === 2">
          <c-button paddingW="20px"
                  height="30px"
                  class="alert-button"
                  @click="cancelAll"
                  :disabled="!tabelList.length"
                  marginTop="20px">
                  <!-- 撤销全部订单 -->
                  {{ $t('futures.order.cancelAll') }}
          </c-button>
        </div>
         <!-- <div style="float:right;height:70px;" v-if="nowType === 4 || nowType === 5 ">
          <c-button paddingW="20px"
                  height="30px"
                  class="alert-button"
                  @click="exportCSV"
                  :disabled="!tabelList.length"
                  marginTop="20px">
                  导出CSV
          </c-button>
        </div>
        <div style="float:left;height:50px;" v-if="nowType === 3">
          <c-button paddingW="20px"
                  height="30px"
                  class="alert-button"
                  @click="exportCSV"
                  :disabled="!tabelList.length"
                  marginTop="0px">
                  导出CSV
          </c-button>
        </div> -->

    </div>
     <div class="otcOrder-table">
      <c-table
        :imgMap="imgMap"
        :colorMap="colorMap"
        :loading="tabelLoading"
        :columns="columns"
        :dataList="tabelList"
        @elementClick="tableClick"
        :cellHeight='55'
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
import mixin from '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/order/coOrder/coOrder';
import '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/order/coOrder/coOrder.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};

</script>
