<template>
  <div class="tradeModel-exchange">
    <!-- 国际版 -->
    <template v-if="templateLayoutType && templateLayoutType === '2'">
      <div class="Int-trade">
        <div
          v-on:dblclick="ondblclick"
          @click="onclickfun"
          class="trade-content a-8-bg trade-shrinks">
          <div :class="leftClasses">
            <div ref="leftBox" class="left-block">
              <!-- 24小时行情 -->
              <Market @shrinkBlock="shrinkBlock" @serachShrinkBlock="serachShrinkBlock" />
            </div>
            <div class="main-block">
              <div class="center-block">
                <!-- 24小时 当前行情 -->
                <current-symbol :etfUrl="etfUrl" :etfPrice="etfPrice" :marketShrink="marketShrink"/>
                <div class="chart-box a-5-bg">
                  <trading-view />
                </div>
              </div>
              <div class="order-list">
                <orderList />
              </div>
            </div>
            <div class="right-block">
              <International-depth :etfPrice="etfPrice"/>
              <div class="transaction a-6-bg">
                 <International-tradeForm />
                </div>
            </div>
          </div>
          <i v-if="!baseInfo"></i>
        </div>
      </div>
    </template>
    <!-- 中国版 -->
    <template v-else>
      <div
        v-on:dblclick="ondblclick"
        @click="onclickfun"
        class="trade-content a-8-bg"
        :class="{'trade-shrinks': shrink}">
        <div :class="leftClasses">
          <div ref="leftBox" class="left-block">
            <!-- 24小时行情 -->
            <Market @shrinkBlock="shrinkBlock"
              @serachShrinkBlock="serachShrinkBlock"
              :showGridFlag="showGridFlag"
              moduleType='ex' />
              
          </div>
          <div class="main-block" :style="showGridFlag ? 'height: 830px' : ''">
            <div class="center-block">
              <!-- 24小时 当前行情 -->
              <current-symbol :etfUrl="etfUrl" :etfPrice="etfPrice"
                :marketShrink="marketShrink"></current-symbol>
              <div class="chart-box a-5-bg">
                <trading-view />
              </div>
              <div class="transaction a-6-bg"
              :style="showGridFlag && lan !== 'zh_CN'
              ? 'height: 409px' : showGridFlag && lan === 'zh_CN' ? 'height: 384px' : ''">
                <trade-form />
              </div>
            </div>
          </div>
          <div class="right-block">
            <Depth :etfPrice="etfPrice" :showGridFlag="showGridFlag"/>
          </div>
          <div v-if="isLogin" class="order-list">
            <orderList />
          </div>
        </div>
        <i v-if="!baseInfo"></i>
      </div>
    </template>
    <c-alert
      :showFlag="tradeAlertState"
      @close="hideTradeAlert"
      :imgMap="imgMap"
      @confirm="hideTradeAlert">
      <!-- 交易限制提醒 -->
      <div class="alertTitle b-1-cl">
        <!-- 温馨提示 -->
        {{$t('tradeLimt.tradeLimit_text_instructions')}}
      </div>
      <div class="trade-limit-text b-2-cl">{{ tradeLimitAlertText }}</div>
    </c-alert>
    <!-- 免责声明 -->
    <c-noticeDialog
      :showFlag="etfDialog"
      :titleText="$t('etfAdd.dialogTitle')"
      :confirmText="$t('etfAdd.confirmText')"
      paddingTop="0px"
      @confirm="etfDialogConfirm">
      <div class="trade-noticeDialog">
        <div class="trade-noticeDialog-even">
           {{$t('etfAdd.dText1')}}
        </div>
        <div class="trade-noticeDialog-even">
          <!-- {{$t('etfAdd.dText2')}} {{ etfName }} -->
          {{$t('etfAdd.dText3')}}
        </div>
        <div class="trade-noticeDialog-even">
           {{$t('etfAdd.dText4')}} <a class="u-8-cl"
            :href="etfUrl" target="_blank">{{$t('etfAdd.dText5')}}</a>
        </div>
        <div class="trade-noticeDialog-even">
           {{$t('etfAdd.dText6')}}
        </div>
        <div class="trade-noticeDialog-even">
           {{$t('etfAdd.dText7')}}
        </div>
        <div class="trade-noticeDialog-even">
           {{$t('etfAdd.dText8')}}
        </div>
        <div class="trade-noticeDialog-even">
           {{$t('etfAdd.dText9')}}
        </div>
      </div>
    </c-noticeDialog>
  </div>
</template>

<script>
import mixin from '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/modules/trade/index/mixin';
import '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/trade/index/index.styl';
import Market from '@/components/modules/trade/market/index.vue';
// 当前币对信息
import currentSymbol from '@/components/modules/trade/currentSymbol/index.vue';
// 盘口 & 实时成交
import Depth from '@/components/modules/trade/depth/index.vue';
import InternationalDepth from '@/components/modules/trade/depth/internationalDepth.vue';
import InternationalTradeForm from '@/components/modules/trade/tradeForm/internationalTradeForm.vue';
// tradingView/ Echarts
import tradingView from '@/components/modules/trade/tradingView/index.vue';
// 下单交易
import tradeForm from '@/components/modules/trade/tradeForm/ex-tradeForm.vue';
// 订单列表
import orderList from '@/components/modules/trade/orderList/orderList.vue';

export default {
  mixins: [mixin],
  components: {
    Market,
    currentSymbol,
    Depth,
    tradingView,
    tradeForm,
    orderList,
    InternationalDepth,
    InternationalTradeForm,
  },
  created() {
    this.createdInit();
    // this.init();
  },
  computed: {
    //  是否开启了 网格
    gridTradeFlag() {
      const { publicInfo } = this.$store.state.baseData;
      let str = 1;
      if (publicInfo && publicInfo.switch && publicInfo.switch.grid_trade_switch) {
        str = Number(publicInfo.switch.grid_trade_switch);
      }
      return str;
    },
    // 该币对是否开启网格
    showGridFlag() {
      let flag = false;
      if (this.symbolAll && this.symbolCurrent) {
        const symbol = this.symbolAll[this.symbolCurrent];
        if (symbol && symbol.is_grid_open && this.gridTradeFlag) {
          flag = true;
        }
      }
      return flag;
    },
    lan() {
      return this.$store.state.baseData.lan;
    },
  },
};
</script>

<style >
  .trade-content {
    width: 100%;
    box-sizing: border-box;
  }
  .trade-content .main-block {
    height: 815px;
  }
</style>
