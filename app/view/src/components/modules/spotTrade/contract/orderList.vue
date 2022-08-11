<template>
    <div
      class="order-list-box contract-order-list"
      :class="{'trigge-order-list': orderType === 2}">

        <tabs :list="tabTypeItem" v-model="orderType" @click="switchType"/>

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
         <!-- <div class="is-show-active" v-if="orderType === 0">
          <c-switch :value="isShowCurPosition" @click="switchChange"/>
          <span class="txt">
            {{$t('futures.orderList.newText16')}}
          </span>
        </div> -->
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
          <!-- <positionLis v-if="orderType === 0" /> -->
          <c-table
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
import positionLis from '@/components/modules/coTrade/component/positionLis.vue';
import tabs from '../tab.vue'

export default {
  mixins: [mixin],
  components: { positionLis, tabs},
  mounted() {
    this.init();
  },
  // 组件离开前执行
  beforeDestroy() {
    clearInterval(this.getDataInter);
  },
};
</script>
<style lang="stylus">
.trade-market-index-container.trade-market .market-symbol .tbody {
  height: 710px;
}
.trade-market-index-container.trade-market .market-symbol .grid_tbody {
    height: 723px;
}
  .order_type {
    margin-top: 29px;
    background-color: #fff;
    border-radius: 10px;
    display flex;
    align-items center;
    padding 6px 26px;
    border-bottom-width: 1px;
    border-bottom-style: solid;
  }
  .order-conent {
    margin-top: 29px;
  }
  .common-table {
    background: none !important;
  }
  .tip_title {
    line-height 16px;
    margin-bottom 15px;
  }
  .tip_text {
    font-size 12px;
    line-height 18px;
  }
  .order_type_btn {
    box-sizing border-box;
    border-width: 1px;
    border-style: solid;
    padding 4px 20px;
    cursor pointer;
    font-size 12px;
    line-height 14px;
  }
  .order_type_btn:nth-child(1) {
    // border-right none;
  }
  .order_list-top .notData {
    top 107px;
  }
  .contract-order-list {
    .table-head {
      background-color: rgba(228, 228, 228, .25) !important;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      border-bottom: 0;
      span {
        font-weight: 600;
        color: RGB(167, 180, 203);
      }
    }
    .table-body {
        background-color: #fff !important;
    }
    .table-body td .grid_btn {
      margin-left 0;
    }
  }
  .pro-trade .order-list-box .gridOrder {
    min-height 218px;
  }
  .Int-trade .order-list-box .order-conent.order-content_height {
    height 313px;
    .table-body {
      min-height 280px;
    }
  }
  .pro-trade .order-list-box .order-conent.pro-trade-order {
    height 250px;
  }
</style>

