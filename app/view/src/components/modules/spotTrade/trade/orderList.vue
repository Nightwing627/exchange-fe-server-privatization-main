<!-- 币币交易 实时成交 -->
<template>
    <div class="order-list-box trade-order-list">

      <tabs :list="tabTypeItem" v-model="orderType" @click="switchType"/>

      <div class="order_type" v-if="orderType === 3">
        <div class="order_type_btn"
        :class="filterGridStatus === 1 ? 'u-8-bd u-8-cl' : ''"
         @click="() => {this.filterGridStatus = 1;this.pagination.page = 1;
      this.tableLoading = true;this.getData();}">
          <!-- 正在执行 -->
          {{$t('gridTrade.orderType1')}}
        </div>
        <div class="order_type_btn"
        :class="filterGridStatus === 0 ? 'u-8-bd u-8-cl' : ''"
         @click="() => {this.filterGridStatus = 0;this.pagination.page = 1;
      this.tableLoading = true;this.getData();}">
          <!-- 已完成 -->
          {{$t('gridTrade.orderType2')}}
        </div>
      </div>
      <div class="order-conent"
       :class="orderType === 3
       && $store.state.baseData.templateLayoutType === '2'
       ? 'order-content_height'
       : orderType === 3
       && $store.state.baseData.templateLayoutType != '2'
       ? 'pro-trade-order' : ''">
        <vue-scroll>
          <c-table
            :columns = 'columns'
            :imgMap="imgMap"
            :colorMap="colorMap"
            :dataList = 'dataList'
            :subContent = 'subTableData'
            :subContentId = 'subTableDataId'
            :subColumns = 'subColumns'
            :loading = 'tableLoading'
            :subLoading = 'subLoading'
            :cellHeight = 'cellHeight'
            @elementClick = "elementClick"
            :bodyClasses="orderType === 3 ? 'gridOrder': ''"
           />
           <c-pagination v-if="(pagination.count/pagination.pageSize) > 1"
                    :total="pagination.count"
                    :current-page='pagination.page'
                    :display='pagination.pageSize'
                    @pagechange="pagechange">
            </c-pagination>
        </vue-scroll>
      </div>
      <!-- <div class="notData" v-if="!dataList.length && !tableLoading">
        <svg class="icon icon-50" aria-hidden="true">
          <use xlink:href="#icon-g_2"></use>
        </svg>
        <p>
          {{$t('common.notData')}}
        </p>
      </div> -->
      <grid-dialog
       :dataId="gridItemId"
       :type="filterGridStatus"
       :fixValue="fixValue"
        :gridShowFlag="gridDoliog" @gridDialogClose="gridClose"></grid-dialog>
        <!-- 未认证 提示框 -->
      <c-alert :showFlag="gridCancelDoliog"
          :buttonText="$t('application.confirm')"
          :imgMap="imgMap"
          @close="() => this.gridCancelDoliog = false"
          :btnEventFlag="true"
          @confirm="gridCancelEvent">
          <div class="tip_title b-1-cl">
            <!-- 交易须知 -->
            {{$t('gridTrade.tip')}}
          </div>
          <!-- 终止网格后，会撤消所有未成交订单，确定要终止此网格交易？ -->
          <p class="tip_text">{{$t('gridTrade.tipContent')}}</p>
      </c-alert>
    </div>
</template>
<script>
import mixin from '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/modules/trade/orderList/orderList';
import {
  getCoinShowName, formatTime, fixD, myStorage,
} from '@knoxexchange/blockchain-ui-privatization/utils';
import GridDialog from '@/components/modules/trade/gridDialog/GridDialog.vue';
import '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/modules/trade/orderList/tradeOrderList.styl';
import tabs from '../tab.vue'


export default {
  mixins: [mixin],
  components: {
    GridDialog,
    tabs,
  },
  mounted() {
    this.init();
  },
  // 组价离开前执行
  beforeDestroy() {
    clearInterval(this.getDataInter);
  },
  data() {
    return {
      gridType: 0, // 网格类型 0: 网格详情； 1: 正在执行(20)； 2: 已完成
      gridDoliog: false, // 网格弹窗
      gridItemId: null, // list单个的数据
      gridCancelDoliog: false,
      filterGridStatus: 1, // 策略状态 0:启动中  1:正在执行   2:停止中   3:已关闭
      timer: 15000,
    };
  },
  watch: {
    filterGridStatus(v) {
      if (!v) {
        clearInterval(this.getDataInter);
        this.getDataInter = null;
      } else {
        this.intervalGet();
      }
    },
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

        if (symbol && symbol.is_grid_open) {
          flag = true;
        }
      }
      return flag;
    },
    // tab 项
    tabTypeItem() {
      const arr = [
        {label: this.$t('trade.activeOrder'), value: 1}, // 当前委托
        {label: this.$t('trade.historyOrder'), value: 2}, // 历史委托
      ];
      if (this.gridTradeFlag && this.showGridFlag) {
        arr.push({label: this.$t('gridTrade.title'), value: 3});
      }
      return arr;
    },
    // 表头
    columns() {
      if (this.orderType === 2) {
        return [
          {
            title: this.$t('trade.time'), // '时间',
            width: '100px',
          },
          {
            title: this.$t('trade.class'), // '类别'
            width: '200px',
          },
          {
            title: this.$t('trade.transaction'), // '交易对'
          },
          {
            title: `${this.$t('trade.price')}
            (${getCoinShowName(this.symbolUnit.units, this.coinList)})`, // 价格
          },
          {
            title: `${this.$t('trade.number')}
            (${getCoinShowName(this.symbolUnit.symbol, this.coinList)})`, // 数量
          },
          {
            title: this.$t('trade.average'), // '成交均价'
          },
          {
            title: this.$t('trade.status'), // '状态'
          },
          {
            title: this.$t('trade.opera'), // '操作'
            width: '100px',
          },
        ];
      }
      if (this.orderType === 3) {
        return [
          {
            title: this.$t('trade.time'), // '时间',
            width: '100px',
          },
          {
            title: this.$t('trade.transaction'), // '交易对'
            width: '100px',
          },
          {
            title: this.$t('gridTrade.clounms1'), // '总投入',
            width: '200px',
          },
          {
            title: this.$t('gridTrade.clounms2'), // 已产生利润
            width: '200px',
          },
          {
            title: this.$t('gridTrade.clounms3'), // 持仓盈亏
            width: '200px',
          },
          {
            title: this.$t('gridTrade.clounms4'), // '年化收益率'
            width: '200px',
          },
          {
            title: this.$t('gridTrade.clounms5'), // '运行时长'
            width: '200px',
          },
          {
            title: this.$t('trade.opera'), // '操作'
            width: '150px',
          },
        ];
      }
      return [
        {
          title: this.$t('trade.time'), // '时间',
          width: '100px',
        },
        {
          title: this.$t('trade.class'), // '类别'
          width: '150px',
        },
        {
          title: `${this.$t('trade.price')}
          (${getCoinShowName(this.symbolUnit.units, this.coinList)})`, // 价格
        },
        {
          title: `${this.$t('trade.number')}
          (${getCoinShowName(this.symbolUnit.symbol, this.coinList)})`, // 数量
        },
        {
          title: `${this.$t('trade.dealMoney')}
          (${getCoinShowName(this.symbolUnit.units, this.coinList)})`, // 交易额
        },
        {
          title: this.$t('trade.average'), // '成交均价'
        },
        {
          title: `${this.$t('trade.deal')}/${this.$t('trade.noDeal')}`, // 已成交/未成交
        },
        {
          title: this.$t('trade.opera'), // '操作'
          width: '100px',
          classes: 'opera',
        },
      ];
    },
    dataList() {
      if (this.orderData && this.orderData.orderType === this.orderType) {
        if (this.orderType === 1) {
          return this.formData(this.orderData.orderList, this.cancelOrderId);
        }
        if (this.orderType === 3) {
          return this.formGridData(this.orderData.strategyVoList);
        }
        return this.formHistoryData(this.orderData.orderList);
      }
      return [];
    },
  },
  methods: {
    init() {
      // 获取 当前选中的货币对
      this.symbolCurrent = myStorage.get('sSymbolName');
      if (this.moduleType === 'lever') {
        this.symbolCurrent = myStorage.get('leverSymbolName');
      }
      if (this.isLogin) {
        this.getData();
        // 轮训请求数据
        this.intervalGet();
      }
      this.$bus.$on('SYMBOL_CURRENT', (val) => {
        this.symbolCurrent = val;
        if (this.isLogin) {
          this.pagination.page = 1;
          this.subTableDataId = null;
          this.tableLoading = true;
          this.getData();
        }
        if (this.orderType === 3 && (!this.showGridFlag || !this.gridTradeFlag)) {
          this.orderType = 1;
        }
      });
      // 监听下单成功
      this.$bus.$on('ORDER_CREATE', () => {
        this.pagination.page = 1;
        this.getData();
      });
    },
    gridClose() {
      this.gridDoliog = false;
    },
    // 请求订单数据
    getData(auto) {
      if (this.symbolCurrent && this.isLogin) {
        let url = this.$store.state.url.cointran.orderNew;

        if (this.orderType === 2) {
          url = this.$store.state.url.ordercenter.historyNew;
        } else if (this.orderType === 3) { // 如果是网格直接请求网格接口
          url = 'quant/getStrategyList';
        }

        if (this.moduleType === 'lever') {
          url = this.$store.state.url.lever.new;
          if (this.orderType === 2) {
            url = this.$store.state.url.lever.all;
          }
        }
        const symbolArr = this.symbolCurrent.split('/');
        const symbol = symbolArr[0].toLowerCase() + symbolArr[1].toLowerCase();
        const data = {
          url,
          orderType: this.orderType,
          params: {
            symbol,
            pageSize: this.pagination.pageSize,
          },
        };
        if (this.orderType === 3) {
          data.hostType = 'quant';
          data.params.symbol = this.symbolCurrent;
          data.params.status = this.filterGridStatus;
        }
        if (this.orderIdArrar.length && this.orderType === 2) {
          data.params.idList = this.orderIdArrar;
        } else {
          data.params.page = this.pagination.page;
        }
        if (auto) {
          data.auto = true;
        }
        this.$store.dispatch('getOrderListData', data);
      }
    },
    // 轮训请求数据
    intervalGet() {
      if (this.filterGridStatus) {
        clearInterval(this.getDataInter);
        this.getDataInter = setInterval(() => {
          this.getData(true);
        }, this.timer);
      } else {
        clearInterval(this.getDataInter);
        this.getDataInter = null;
      }
    },
    // 网格交易数据格式化
    formGridData(data) {
      const dataArray = data || [];
      const newData = [];
      if (dataArray.length) {
        dataArray.forEach((item) => {
          let tableData = null;
          const symbolArr = item.symbol.split('/');
          // 网格状态 0:启动中 1:正在执行 2:停止中 3:已关闭
          if (this.filterGridStatus.toString() === '0') {
            tableData = {
              id: item.id,
              data: [
                formatTime(item.ctime),
                [
                  {
                    text: `${getCoinShowName(symbolArr[0], this.coinList)}/${getCoinShowName(symbolArr[1], this.coinList)}`,
                  },
                ],
                // 总投入
                [
                  {
                    text: `${fixD(item.configParamMap.totalQuoteAmount, this.fixValue.priceFix)}
                      ${getCoinShowName(symbolArr[1], this.coinList)} + ${fixD(item.configParamMap.totalBaseAmount, this.fixValue.priceFix)}
                      ${getCoinShowName(symbolArr[0], this.coinList)}`,
                  },
                ],
                // 已产生利润
                [
                  {
                    text: `${fixD(item.totalProfit, this.fixValue.priceFix)}
                      ${getCoinShowName(symbolArr[1], this.coinList)}(${fixD(item.totalProfitRate, 2)}%)`,
                  },
                ],
                // 持仓盈亏
                [
                  {
                    text: `${fixD(item.positionProfit, this.fixValue.priceFix)}
                      ${getCoinShowName(symbolArr[1], this.coinList)}`,
                  },
                ],
                // 年华收益率
                [
                  {
                    text: `${fixD(item.annualizedYield, 2)}%`,
                  },
                ],
                // 运行时长
                [
                  {
                    text: this.setTime(item.startTime, item.endTime),
                  },
                ],
                [
                  {
                    type: 'link',
                    text: this.$t('trade.view'), // 详情
                    eventType: 'gridDetail',
                  },
                ],
              ],
            };
          } else if (this.filterGridStatus.toString() === '1') {
            tableData = {
              id: item.id,
              data: [
                formatTime(item.ctime),
                [
                  {
                    text: `${getCoinShowName(symbolArr[0], this.coinList)}/${getCoinShowName(symbolArr[1], this.coinList)}`,
                  },
                ],
                // 总投入
                [
                  {
                    text: `${fixD(item.configParamMap.totalQuoteAmount, this.fixValue.priceFix)}
                      ${getCoinShowName(symbolArr[1], this.coinList)} + ${fixD(item.configParamMap.totalBaseAmount, this.fixValue.priceFix)}
                      ${getCoinShowName(symbolArr[0], this.coinList)}`,
                  },
                ],
                // 已产生利润
                [
                  {
                    text: `${fixD(item.totalProfit, this.fixValue.priceFix)}
                      ${getCoinShowName(symbolArr[1], this.coinList)}(${fixD(item.totalProfitRate, 2)}%)`,
                  },
                ],
                // 持仓盈亏
                [
                  {
                    text: `${fixD(item.positionProfit, this.fixValue.priceFix)}
                      ${getCoinShowName(symbolArr[1], this.coinList)}`,
                  },
                ],
                // 年华收益率
                [
                  {
                    text: `${fixD(item.annualizedYield, 2)}%`,
                  },
                ],
                // 运行时长
                [
                  {
                    text: this.setTime(item.startTime),
                  },
                ],
                [
                  {
                    type: 'link',
                    text: this.$t('trade.view'), // 详情
                    eventType: 'gridDetail',
                  },
                  {
                    type: 'link',
                    text: this.$t('gridTrade.close'), // 终止网格
                    eventType: 'gridCancel',
                    classes: 'grid_btn',
                  },
                ],
              ],
            };
          }
          if (tableData) {
            newData.push(tableData);
          }
        });
        return newData;
      }
      return [];
    },
    setTime(startTime, endTime) {
      if (!Number(startTime)) {
        return `0${this.$t('otcDetailOrder.day')}0${this.$t('gridTrade.hours')}0${this.$t('otcDetailOrder.min')}`;
      }
      let dateEnd = new Date().getTime();
      if (endTime) {
        dateEnd = endTime;
      }
      const dateDiff = dateEnd - startTime;// 时间差的毫秒数
      const day = Math.floor(dateDiff / (24 * 3600 * 1000));// 计算出相差天数\
      const leave1 = dateDiff % (24 * 3600 * 1000); // 计算天数后剩余的毫秒数
      const hours = Math.floor(leave1 / (3600 * 1000));// 计算出小时数
      // 计算相差分钟数
      const leave2 = leave1 % (3600 * 1000); // 计算小时数后剩余的毫秒数
      const minutes = Math.floor(leave2 / (60 * 1000));// 计算相差分钟数
      function s(t) {
        return t < 10 && t > 0 ? `0${t}` : t;
      }
      return `${s(day)}${this.$t('otcDetailOrder.day')}${s(hours)}${this.$t('gridTrade.hours')}${s(minutes)}${this.$t('otcDetailOrder.min')}`;
    },
    elementClick(type, data) {
      if (type === 'cancel') {
        this.cancelOrderEvent(data);
      } else if (type === 'gridDetail') {
        this.gridItemId = data;
        this.gridDoliog = true;
      } else if (type === 'gridCancel') {
        this.gridItemId = data;
        this.gridCancelDoliog = true;
      } else {
        this.getSubTableData(data);
      }
    },
    // 终止网格
    gridCancelEvent() {
      this.axios({
        url: 'quant/stopStrategy',
        hostType: 'quant',
        method: 'post',
        params: { strategyId: this.gridItemId },
      }).then((rep) => {
        if (rep.code.toString() === '0') {
          this.getData();
          // 重新请求资产
          this.$store.dispatch('assetsExchangeData', {
            auto: false,
            coinSymbols: this.coinSymbols,
          });
          // 撤单成功 提示
          this.$bus.$emit('tip', { text: rep.msg, type: 'success' });
        } else {
          this.$bus.$emit('tip', { text: rep.msg, type: 'error' });
        }
        this.gridCancelDoliog = false;
      });
    },
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
  .trade-order-list {
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
