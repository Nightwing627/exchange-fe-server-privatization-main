<template>
  <section class="page-coflowingWater">
    <!-- 资金流水 -->
    <div class="flowingWater-nav a-3-bd e-1-cl">
      {{ $t('assets.otcFlowingWater.title') }}
    </div>
     <div class="flowingWater-options">
      <c-calendar
          width = "120px"
          name = "calendar"
          :value ="startTime"
          :promptText="$t('futures.coFlowingWater.startTime')"
          :errorHave="true"
          @onChanges ="startTimeSelect"
        />
        <c-calendar
          width = "120px"
          name = "calendar"
          :value ="endTime"
          :promptText="$t('futures.coFlowingWater.endTime')"
          :errorHave="true"
          @onChanges ="endTimeSelect"
        />
      <c-select :promptText="$t('futures.coFlowingWater.coin')"
        :value="symbol"
        :options="symbolList"
        :errorHave="true"
        width="120px"
        :filterable="true"
        @onChanges="symbolChange"/>
        <c-select :promptText="$t('futures.coFlowingWater.type')"
        :value="type"
        :options="typeList"
        :errorHave="true"
        :filterable="true"
        width="120px"
        @onChanges="typeChange"/>
    </div>
    <div class="flowingWater-table">
      <c-table
        :cellHeight='55'
        :imgMap="imgMap"
        :colorMap="colorMap"
        :loading="tabelLoading"
        :columns="columns"
        :dataList="tabelList"
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
import mixin from '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/assets/coFlowingWater/coFlowingWater';
import '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/assets/coFlowingWater/coFlowingWater.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
