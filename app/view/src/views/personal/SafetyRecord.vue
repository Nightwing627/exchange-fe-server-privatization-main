<template>
  <div class="SafetyRecord a-5-bg">
    <p class="user-management-child-header a-3-bd b-2-cl">
      <c-navTab
        activeClassName="b-1-cl"
        activeColor="a-12-bg"
        class="b-2-cl"
        :currentTab="currentTab"
        :navTab="navTab"
        :lineHeight="lineHeight"
        :marginRight="marginRight"
        @currentType="currentType"
      />
    </p>
    <div>
      <div class="user-management-center a-5-bg">
        <c-table
          :imgMap="imgMap"
          :colorMap="colorMap"
          v-show="currentTab === 1"
          :loading="loading1"
          :classes="classes"
          :headClasses="headClasses"
          :bodyClasses="bodyClasses"
          :lineClasses="lineClass"
          :columns="columns"
          :dataList="dataList"
          :lineNumber="lineNumber"
          :cellHeight="cellHeight"
          :headHeight="headHeight"
        />
        <c-table
          :imgMap="imgMap"
          :colorMap="colorMap"
          v-show="currentTab === 2"
          :classes="classes"
          :loading="loading2"
          :headClasses="headClasses"
          :bodyClasses="bodyClasses"
          :lineClasses="lineClass"
          :columns="columns2"
          :dataList="dataList2"
          :lineNumber="lineNumber"
          :cellHeight="cellHeight"
          :headHeight="headHeight"
        />
      </div>
      <div class="pagination">
        <div v-show="currentTab === 1">
          <c-pagination
            v-if="(count/pageSize) > 1"
            :total="count"
            :current-page="page"
            :display="pageSize"
            classes="a-5-bg"
            @pagechange="pagechange"
          />
        </div>
        <div v-show="currentTab === 2">
          <c-pagination
            v-if="(count2/pageSize2) > 1"
            :total="count2"
            :current-page="page2"
            :display="pageSize2"
            classes="a-5-bg"
            @pagechange="pagechange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mixin from '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/personal/SafetyRecord/SafetyRecord';
import '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/personal/SafetyRecord/SafetyRecord.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
