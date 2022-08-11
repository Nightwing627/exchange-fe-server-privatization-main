<template>
    <div
      class="order-list-box a-6-bg"
      :class="{'trigge-order-list': orderType === 2}">
      <div class="tab-box a-3-bd e-2-cl a-21-bg">
        <span
          class="tab-item"
          v-for="(item, index) in tabTypeItem"
          :key="index + 'tab'"
          @click="switchType(index)"
          :class="{'selected b-1-cl a-12-bd': orderType === index}">
            {{item}}
        </span>
        <c-button
          v-if =" 0 < orderType && orderType < 3 && dataList.length"
          height="26px"
          :disabled="!dataList || !dataList.length"
          paddingW="6px"
          marginTop="6px"
          @click="elementClick('cancelOrder', '{}')">
             <!-- 全部取消 -->
             {{$t('futures.orderList.allCancel')}}
        </c-button>
         <div class="is-show-active" v-if="orderType === 0">
          <c-switch :value="isShowCurPosition" @click="switchChange"/>
          <span class="txt">
            <!-- 仅当前合约 -->
            {{$t('futures.orderList.newText16')}}
          </span>
        </div>
      </div>
      <div class="sub-tab-box a-3-bd e-2-cl a-21-bg" v-if="orderType === 2">
        <span
          class="tab-item"
          v-for="(item, index) in subTabTypeItem"
          :key="index + 'tab'"
          @click="subSwitchType(index)"
          :class="{'a-3-bg b-1-cl': triggeType === index}">
            {{item}}
        </span>
      </div>
      <div class="order-conent">
        <vue-scroll>
          <div class="not-login" v-if="!isLogin">
            <!-- 请 -->
            {{$t('futures.orderList.tstext1')}}
            <span class="b-4-cl" @click="goPage('login')">
              <!-- 登录/注册 -->
              {{$t('futures.orderList.tstext2')}}
            </span>
            <!-- 再进行操作 -->
            {{$t('futures.orderList.tstext3')}}
          </div>
          <template v-else>
          <!-- 持仓列表 -->
          <positionLis v-if="orderType === 0" />
          <c-table
            v-else
            :columns = 'columns'
            :imgMap="imgMap"
            :colorMap="colorMap"
            :dataList = 'dataList'
            :loading = 'tableLoading'
            :cellHeight = 'cellHeight'
            @elementClick = "elementClick"
            :bodyClasses = 'bodyClasses'
           />
          </template>
        </vue-scroll>
      </div>
    </div>
</template>
<script>
import mixin from '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/modules/coTrade/orderList/orderList';
import '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/modules/coTrade/orderList/orderList.styl';
import positionLis from './component/positionLis.vue';

export default {
  mixins: [mixin],
  components: { positionLis },
  mounted() {
    this.init();
  },
  // 组件离开前执行
  beforeDestroy() {
    clearInterval(this.getDataInter);
  },
};
</script>
