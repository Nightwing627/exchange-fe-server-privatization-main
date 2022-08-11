<template>
  <div class="futuresData">
    <div class="futuresData-content c-4-bg">
        <div class="mining-tit f-2-cl c-5-bd">
          <span
            class="item"
            :class="{'selected c-8-bd f-1-cl' : tableType === item.key}"
            v-for="(item, index) in tabList"
            :key = "index"
            @click="switcherType(item.key)">{{item.text}}</span>
        </div>
        <div class="filter-box e-2-cl d-5-bd">
          <!--保险基金币种   -->
          <c-select
            v-if="tableType === 1"
            :value="symbol"
            :promptText="$t('futuresData.promptText1')"
            width = "120px"
            name= "symbol"
            :options="symbolOPtion"
            :filterable="true"
            @onChanges = "selectOnChange"
          />
          <!--合约类型   -->
          <c-select
            v-if="tableType > 1"
            :value="type"
            :promptText="$t('futuresData.promptText2')"
            width = "140px"
            name= "type"
            :options="typeTabList"
            :filterable="true"
            @onChanges = "selectOnChange"
          />
          <!--合约   -->
          <c-select
            v-if="tableType > 1"
            :value="contractId"
            :promptText="$t('futuresData.promptText3')"
            width = "140px"
            name= "contractId"
            :options="marketList"
            :filterable="true"
            @onChanges = "selectOnChange"
          />
        </div>
        <div class="con-text" v-if="tableType === 1">
          <!-- 所有以 {{symbol}} 为保证金的永续合约的保险基金余额为： -->
          {{$t('futuresData.text0')}} {{symbol}} {{$t('futuresData.text1')}}
          <span class="f-1-cl">{{amount}}</span> {{symbol}}
        </div>
        <div class="echartsKline" v-if="tableType > 2">
          <echartsKline
            :contractId="contractId"
            :tableType="tableType"
            :acriveContract="acriveContract"
            :contractName="contractName" />
        </div>
        <div id="chartbox" class="chartbox" v-show="tableType < 3"></div>
        <div class="more-link" >
         <span class="x-3-cl" @click="linkMore(moreText.link)"> {{moreText.text}} </span>
        </div>
    </div>
    <div class="data-content" v-if="tableType < 4 && tableType > 1">
      <div class="mining-tit f-2-cl c-5-bd c-4-bg">
        {{tbaleTitle}}
      </div>
      <c-table
          :imgMap="imgMap"
          :colorMap="colorMap"
          :columns ='columns'
          :dataList ='dataList'
          :loading ='tableLoading'
          :bodyClasses ='bodyClasses'
          :headClasses ='headClasses'
        />
         <c-pagination v-if="(pagination.count/pagination.pageSize) > 1"
                  :total="pagination.count"
                  classes="c-4-bg"
                  :current-page='pagination.page'
                  :display='pagination.pageSize'
                  @pagechange="pagechange">
    </c-pagination>
    </div>

  </div>
</template>
<script>
import mixin from '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/futuresData/futuresData';
import '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/futuresData/futuresData.styl';
import echartsKline from '../../components/modules/coTrade/component/echartsKline.vue';

export default {
  mixins: [mixin],
  components: {
    echartsKline,
  },
  mounted() {
    this.init();
  },
};
</script>
