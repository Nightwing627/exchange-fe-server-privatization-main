<!-- 币币交易 下单 -->
<template>
  <div class="trade-box trade-box-ex-container">
    <div class="header-title">
      <tabs :list="tabs" v-model="activeTab" />
      <TypeSelect :options="tradeTypeOpts" v-model="transactionType" @change="switchTradeType" showLabel/>
    </div>

    <div class="trade-form" v-if="transactionType === 3">
      <div class="trade-block">
        <div class="form-block">
          <div class="top-mag">
            <!-- 占位 -->
          </div>
          <trade-input
            v-model="formData_5.value"
            @onChanes = "onChaneForm"
            name="formData_5"
            :fixValue = 'fixValue.priceFix'
            :datas="formData_5"/>
          <trade-input
            v-model="formData_6.value"
            @onChanes = "onChaneForm"
            name="formData_6"
            :fixValue = 'fixValue.volumeFix'
            :datas="formData_6"/>
          <c-button
            :defaultColorClass = 'buttosContent.sellButton.class'
            :hoverColorClass = 'buttosContent.sellButton.class'
            :activeColorClass = 'buttosContent.sellButton.class'
            @click="unlockSell"
            width="100%">
            <!-- 一键解锁卖出 -->
            {{buttosContent.unlockSellButton.text}}
          </c-button>
        </div>
      </div>
      <div class="trade-block">
        <div class="form-block model-info">
          <div class="tit">
            <svg class="icon icon-14 hover_show" aria-hidden="true">
            <use xlink:href="#icon-b_27"></use>
          </svg>
            <!-- 模式说明 -->
            {{$t('trade.modelInfo')}}
          </div>
          <div class="main-text b-1-cl">
            <!-- 模式说明说明 -->
            {{overchargeMsg}}
          </div>
        </div>
      </div>
    </div>
    <div class="trade-form trade-grid" v-else-if="transactionType === 4">
      <template>
        <div class="trade-block">
          <div class="form-block">
            <div class="top-mag">
              <span class="trade-type b-1-cl">
                <!-- 自定义策略 -->
                {{$t('gridTrade.type1')}}：
              </span>
              <span class="lov" v-if="lan === 'zh_CN'">
                <!-- 可用 -->
                {{$t('gridTrade.setText1')}}:
                <span class="lovText">
                  {{currenTaccount.unitsAccoubt}}
                </span>
                <span class="mr-text">
                  {{symbolUnit.units | getCoinShowName(coinList)}}
                </span>
                <span class="lovText">{{currenTaccount.symbolAccoubt}}
                </span>
                {{symbolUnit.symbol | getCoinShowName(coinList)}}
              </span>
            </div>
            <p class="lov_val" v-if="lan !== 'zh_CN'">
                <!-- 可用 -->
                <span class="lovText mr-text">{{$t('gridTrade.setText1')}}:
                  {{currenTaccount.unitsAccoubt}}
                    {{symbolUnit.units | getCoinShowName(coinList)}}
                </span>
                <span class="lovText">{{currenTaccount.symbolAccoubt}}
                      {{symbolUnit.symbol | getCoinShowName(coinList)}}
                </span>
              </p>
            <!-- 价格区间 -->
            <p style="lineHeight: 16px;">{{$t('gridTrade.setText2')}}: </p>
            <div class="input-inline-box clearfix">
              <div class="input-inline-item">
                <grid-trade-input
                  v-model="gridSetMin.value"
                  @onChanes="onChaneForm"
                  name="gridSetMin"
                  :fixValue='fixValue.priceFix'
                  :placeText="$t('gridTrade.setText3')"
                  :datas="gridSetMin"/>
              </div>
              <b class="a-3-bd"></b>
              <div class="input-inline-item">
                <grid-trade-input
                  v-model="gridSetMax.value"
                  @onChanes="onChaneForm"
                  name="gridSetMax"
                  :fixValue='fixValue.priceFix'
                  :placeText="$t('gridTrade.setText4')"
                  :datas="gridSetMax"/>
              </div>
            </div>
            <!-- 网格数量 -->
            <p>{{$t('gridTrade.setText5')}}: </p>
            <div class="input-inline-box clearfix">
              <div class="input-inline-item">
                <grid-trade-input
                  v-model="gridSetNum.value"
                  @onChanes="onChaneForm"
                  name="gridSetNum"
                  :fixValue='fixValue.priceFix'
                  :placeText="'2-100'"
                  :datas="gridSetNum"/>
              </div>
              <div style="width: 28px;"></div>
              <div class="input-inline-item clearfix set-type">
                <div class="set-type-btn"
                :class="setType === 1 ? 'u-8-bd u-8-cl' : 'a-3-bd'" @click="() => this.setType = 1">
                  <!-- 等差网格 -->
                  {{$t('gridTrade.setText6')}}
                </div>
                <div class="set-type-btn"
                :class="setType === 2 ? 'u-8-bd u-8-cl' : 'a-3-bd'" @click="() => this.setType = 2">
                  <!-- 等比网格 -->
                  {{$t('gridTrade.setText7')}}
                </div>
              </div>
            </div>
            <p>
              <!-- 每格利润 -->
              {{$t('gridTrade.setText8')}}
              {{setType === 1 ?
              `${gridSetMinProfits}%～${gridSetMaxProfits}`
              : gridSetMaxProfits}}%({{$t('gridTrade.setText9')}})</p>
            <div class="set-num clearfix">
              <div class="setn-num-list">
                <!-- 投入资产 -->
                <p>{{$t('gridTrade.setText10')}}</p>
                <grid-trade-input
                  v-model="gridSetAccount.value"
                  @onChanes="onChaneForm"
                  name="gridSetAccount"
                  :fixValue='fixValue.priceFix'
                  :datas="gridSetAccount"/>
              </div>
              <div class="setn-num-list">
                <!-- 止损价格 -->
                <p>{{$t('gridTrade.setText12')}}({{$t('gridTrade.optional')}})</p>
                <grid-trade-input
                  v-model="gridSetMinBalance.value"
                  @onChanes="onChaneForm"
                  name="gridSetMinBalance"
                  :fixValue='fixValue.priceFix'
                  :datas="gridSetMinBalance"/>
              </div>
              <div class="setn-num-list">
                <!-- 止盈价格 -->
                <p>{{$t('gridTrade.setText11')}}({{$t('gridTrade.optional')}})</p>
                <grid-trade-input
                  v-model="gridSetMaxBalance.value"
                  @onChanes="onChaneForm"
                  name="gridSetMaxBalance"
                  :fixValue='fixValue.priceFix'
                  :datas="gridSetMaxBalance"/>
              </div>
            </div>
            <div class="set-btc">
              <!-- 使用原有 -->
                <span>
                  {{$t('gridTrade.setText13')}} {{symbolUnit.symbol | getCoinShowName(coinList)}}
                </span>
                <div class="switch-inline">
                  <c-switch :value="gridSetFormFlag"
                  @click="() => this.gridSetFormFlag = !this.gridSetFormFlag"/>
                </div>
              </div>
            <c-button
              @click="gradSub('gradTrad')"
              height="35px"
              width="100%">
              {{gridbuttosContent.gridButton.text}}
            </c-button>
          </div>
        </div>
        <div class="trade-block">
          <div class="form-block">
            <div class="top-mag">
              <span class="trade-type b-1-cl">
                <!-- AI策略： -->
                {{$t('gridTrade.type2')}}：
              </span>
              <span class="lov" v-if="lan === 'zh_CN'">
                <!-- 可用 -->
                {{$t('gridTrade.setText1')}}:
                <span class="lovText">
                  {{currenTaccount.unitsAccoubt}}
                </span>
                <span class="mr-text">
                  {{symbolUnit.units | getCoinShowName(coinList)}}
                </span>
                <span class="lovText">{{currenTaccount.symbolAccoubt}}
                </span>
                {{symbolUnit.symbol | getCoinShowName(coinList)}}
              </span>
            </div>
            <p class="lov_val" v-if="lan !== 'zh_CN'">
                <!-- 可用 -->
                <span class="lovText mr-text">{{$t('gridTrade.setText1')}}:
                  {{currenTaccount.unitsAccoubt}}
                    {{symbolUnit.units | getCoinShowName(coinList)}}
                </span>
                <span class="lovText">{{currenTaccount.symbolAccoubt}}
                      {{symbolUnit.symbol | getCoinShowName(coinList)}}
                </span>
              </p>
            <p class="fee_love">
              <span>
                <!-- 价格区间: -->
                {{$t('gridTrade.setText2')}}:
              </span>
              <b></b>
              <label for="">
                <b>
                  <!-- 七日年化收益率 -->
                  {{$t('gridTrade.aiText1')}}
                </b>
                &nbsp;&nbsp;
                <span class="u-1-cl">
                  {{sevenDay}} %
                </span>
              </label>
            </p>
            <div class="input-inline-box clearfix">
              <div class="input-inline-item">
                <grid-trade-input
                  v-model="gridAiBlance.value"
                  @onChanes="onChaneForm"
                  name="gridAiBlance"
                  :fixValue='fixValue.priceFix'
                  :placeholder="$t('gridTrade.setText2')"
                  :datas="gridAiBlance"/>
              </div>
            </div>
            <!-- 网格数量 -->
            <p>{{$t('gridTrade.setText5')}}: </p>
            <div class="input-inline-box clearfix">
              <div class="input-inline-item">
                <grid-trade-input
                  v-model="gridAiNum.value"
                  @onChanes="onChaneForm"
                  name="gridAiNum"
                  :fixValue='fixValue.priceFix'
                  :placeholder="$t('gridTrade.setText5')"
                  :datas="gridAiNum"/>
              </div>
            </div>
            <!-- 每格利润 {{gridAiMin}}%～{{gridAiMax}}%(已去除手续费) -->
            <p>{{$t('gridTrade.setText8')}}
              {{gridAiMin}}%～{{gridAiMax}}%({{$t('gridTrade.setText9')}})</p>
            <div class="set-num clearfix">
              <div class="setn-num-list">
                <!-- 投入资产 -->
                <p>{{$t('gridTrade.setText10')}}</p>
                <grid-trade-input
                  v-model="gridAiAccount.value"
                  @onChanes="onChaneForm"
                  name="gridAiAccount"
                  :fixValue='fixValue.priceFix'
                  :datas="gridAiAccount"/>
              </div>
              <div class="setn-num-list">
                <!-- 止损价格 -->
                <p>{{$t('gridTrade.setText12')}}({{$t('gridTrade.optional')}})</p>
                <grid-trade-input
                  v-model="gridAiMinBalance.value"
                  @onChanes="onChaneForm"
                  name="gridAiMinBalance"
                  :fixValue='fixValue.priceFix'
                  :datas="gridAiMinBalance"/>
              </div>
              <div class="setn-num-list">
                <!-- 止盈价格 -->
                <p>{{$t('gridTrade.setText11')}}({{$t('gridTrade.optional')}})</p>
                <grid-trade-input
                  v-model="gridAiMaxBalance.value"
                  @onChanes="onChaneForm"
                  name="gridAiMaxBalance"
                  :fixValue='fixValue.priceFix'
                  :datas="gridAiMaxBalance"/>
              </div>
            </div>
            <div class="set-btc">
                <span>
                  {{$t('gridTrade.setText13')}} {{symbolUnit.symbol | getCoinShowName(coinList)}}
                </span>
                <div class="switch-inline">
                  <c-switch :value="gridAiFormFlag"
                  @click="() => this.gridAiFormFlag = !this.gridAiFormFlag"/>
                </div>
              </div>
            <c-button
              @click="gradSub('GridAi')"
              height="35px"
              width="100%">
              {{gridbuttosContent.gridAiButton.text}}
            </c-button>
          </div>
        </div>
      </template>
    </div>
    <div class="trade-form" v-else>
      <div class="trade-block">
        <div class="form-block">
          <div class="top-mag">
            <span class="trade-type">
            <!-- 买入 -->
            {{$t('trade.buy')}}
            {{symbolUnit.symbol | getCoinShowName(coinList)}}
          </span>
            <span class="lov b-1-cl">
              <c-button type="text" className="lovButton"
                v-if="this.isLogin && currenTaccount.unitsOpen.toString() === '1'"
                @click="goCz(symbolUnit.units)">{{ $t('manageFinances.goRecharge') }}</c-button>
              <span class="lovText">{{currenTaccount.unitsAccoubt}}
                {{symbolUnit.units | getCoinShowName(coinList)}}
              </span>
            </span>
          </div>
          <trade-input
            v-model="formData_1.value"
            :fixValue = 'fixValue.priceFix'
            @onChanes = "onChaneForm"
            name="formData_1"
            :datas="formData_1"/>
          <trade-input
            v-model="formData_2.value"
            :fixValue = 'formData2Fix'
            @onChanes = "onChaneForm"
            name="formData_2"
            :datas="formData_2"/>
          <div class="percentage">
            <span
              v-for="(item, index) in perArr"
              :key="index + 'buy'"
              @click="setPerNumber('buy', item)"
              class="per-item">{{item}}%</span>
          </div>
          <div class="volume-trade">
            <div v-if="transactionType === 1">
              <!-- 交易额: -->
              {{$t('trade.dealMoney')}}
              <span class="vol"
                    v-if="tradeVolumeBuy !== '--'">
                    {{tradeVolumeBuy}}
                    {{symbolUnit.units | getCoinShowName(coinList)}}
              </span>
            </div>
          </div>
          <c-button
            :defaultColorClass = 'buttosContent.buyButton.class'
            :hoverColorClass = 'buttosContent.buyButton.class'
            :activeColorClass = 'buttosContent.buyButton.class'
            @click="submit('BUY')"
            width="100%">
            {{buttosContent.buyButton.text}}
          </c-button>
        </div>
      </div>
      <div class="trade-block">
        <div class="form-block">
          <div class="top-mag">
            <span class="trade-type">
              <!-- 卖出 -->
              {{$t('trade.sell')}}
              {{symbolUnit.symbol | getCoinShowName(coinList)}}
            </span>
            <span class="lov b-1-cl">
              <c-button type="text" className="lovButton"
                v-if="this.isLogin && currenTaccount.symbolOpen.toString() === '1'"
                @click="goCz(symbolUnit.symbol)">{{ $t('manageFinances.goRecharge') }}</c-button>
              <span class="lovText">{{currenTaccount.symbolAccoubt}}
              {{symbolUnit.symbol | getCoinShowName(coinList)}}
            </span>
            </span>
          </div>
          <trade-input
            v-model="formData_3.value"
            @onChanes = "onChaneForm"
            name="formData_3"
            :fixValue = 'fixValue.priceFix'
            :datas="formData_3"/>
          <trade-input
            v-model="formData_4.value"
            @onChanes = "onChaneForm"
            name="formData_4"
            :fixValue = 'fixValue.volumeFix'
            :datas="formData_4"/>
          <div class="percentage">
            <span
              v-for="(item, index) in perArr"
              :key="index + 'sell'"
              @click="setPerNumber('sell', item)"
              class="per-item">{{item}}%</span>
          </div>
          <div class="volume-trade">
            <div v-if="transactionType === 1" class="volume-trade-opt">
              <!-- 交易额: -->
              {{$t('trade.dealMoney')}}
              <span class="vol"
                    :class="volumeTradeClass(tradeVolumeSell, currenTaccount.symbolAccoubt)"
                    v-if="tradeVolumeSell !== '--'">
                    {{tradeVolumeSell}}
                    {{symbolUnit.units | getCoinShowName(coinList)}}
              </span>
              <!-- 解锁卖出 -->
             <!--  <c-button v-if="showUnlockSell"
                @click="unlockSell"
                type="text" className="volume-trade-opt-sell">
                解锁卖出
              </c-button> -->
            </div>
          </div>
          <c-button
            :defaultColorClass = 'buttosContent.sellButton.class'
            :hoverColorClass = 'buttosContent.sellButton.class'
            :activeColorClass = 'buttosContent.sellButton.class'
            @click="submit('SELL')"
            width="100%">
            {{buttosContent.sellButton.text}}
          </c-button>
        </div>
      </div>
    </div>
    <!-- 未认证 提示框 -->
    <c-alert :showFlag="isShowDialog"
        :buttonText="$t('otcRelease.DeCertification')"
        :imgMap="imgMap"
        @close="dialogClose"
        @confirm="gotoAuth">
      <div class="ts-content-text">
        <span v-if="tsTexttype === 1">{{$t('personal.exccAuthForm.text18')}}</span>
        <span v-else>{{$t('personal.exccAuthForm.text19')}}</span>
      </div>
    </c-alert>
  </div>
</template>
<script>
import mixin from '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/modules/trade/tradeForm/ex-tradeForm/ex-tradeForm';
import '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/modules/trade/tradeForm/ex-tradeForm/ex-tradeForm.styl';
import {
  myStorage, nul, getCoinShowName, fixD, division, cut,
} from '@knoxexchange/blockchain-ui-privatization/utils';
import tradeInput from '@/components/modules/trade/tradeForm/tradeInput.vue';
import GridTradeInput from '@/components/modules/trade/tradeForm/GridTradeInput.vue';
import tabs from '../tab.vue'
import TypeSelect from '../select.vue'

export default {
  mixins: [mixin],
  components: {
    tradeInput,
    GridTradeInput,
    tabs,
    TypeSelect
  },
  mounted() {
    this.init();
  },
  // 组价离开前执行
  beforeDestroy() {
    clearInterval(this.assetsInter);
  },
  data() {
    return {
      tabs: [{ label: this.$t('pageTitle.spot'), value: 'spot' }],
      activeTab: 'spot',
      marketData: [],
      gridType: 1, // 专业版选择自定义或者ai
      setType: 1, // 类型1等差2 等比
      gridSetFormFlag: false,
      gridAiFormFlag: false,
      minimumOrderQuantity: 0, // 最小下单金额
      // 七日年化收益率
      sevenDay: '--',
      gridAiMin: '--', // 最大利润率
      gridAiMax: '--', // 最小利润率
      gridAiMinPrice: '--', // Ai 最小值
      gridAiMaxPrice: '--', // Ai 最大值
      fee: null, // 手续费
      // set代表自定义
      gridSetMin: {
        units: myStorage.get('sSymbolName') ? myStorage.get('sSymbolName').split('/')[1] : 'USDT',
        errorText: '',
        isError: false,
        disabled: false,
        disabledText: '',
        errorHeight: '-30px',
        value: '',
      },
      gridSetMax: {
        units: myStorage.get('sSymbolName') ? myStorage.get('sSymbolName').split('/')[1] : 'USDT',
        errorText: '',
        isError: false,
        disabled: false,
        disabledText: '',
        errorHeight: '-30px',
        value: '',
      },
      // 数量
      gridSetNum: {
        units: '',
        errorText: '',
        isError: false,
        disabled: false,
        disabledText: '',
        errorHeight: '-30px',
        value: '',
      },
      // 资产
      gridSetAccount: {
        units: myStorage.get('sSymbolName') ? myStorage.get('sSymbolName').split('/')[1] : 'USDT',
        errorText: '',
        isError: false,
        disabled: false,
        disabledText: '',
        style: 'width: 63%',
        errorHeight: '-30px',
        value: '',
      },
      // 止盈价格
      gridSetMaxBalance: {
        units: myStorage.get('sSymbolName') ? myStorage.get('sSymbolName').split('/')[1] : 'USDT',
        errorText: '',
        isError: false,
        disabled: false,
        disabledText: '',
        style: 'width: 63%',
        errorHeight: '-30px',
        value: '',
      },
      // 止损价格
      gridSetMinBalance: {
        units: myStorage.get('sSymbolName') ? myStorage.get('sSymbolName').split('/')[1] : 'USDT',
        errorText: '',
        isError: false,
        disabled: false,
        disabledText: '',
        style: 'width: 63%',
        errorHeight: '-30px',
        value: '',
      },
      gridAiBlance: {
        units: myStorage.get('sSymbolName') ? myStorage.get('sSymbolName').split('/')[1] : 'USDT',
        errorText: '',
        isError: false,
        disabled: true,
        disabledText: '',
        errorHeight: '-30px',
        value: '',
      },
      gridAiNum: {
        units: myStorage.get('sSymbolName') ? myStorage.get('sSymbolName').split('/')[1] : 'USDT',
        errorText: '',
        isError: false,
        disabled: true,
        disabledText: '',
        errorHeight: '-30px',
        value: '',
      },
      gridAiAccount: {
        units: myStorage.get('sSymbolName') ? myStorage.get('sSymbolName').split('/')[1] : 'USDT',
        errorText: '',
        isError: false,
        disabled: false,
        disabledText: '',
        style: 'width: 63%',
        errorHeight: '-30px',
        value: '',
      },
      gridAiMaxBalance: {
        units: myStorage.get('sSymbolName') ? myStorage.get('sSymbolName').split('/')[1] : 'USDT',
        errorText: '',
        isError: false,
        disabled: false,
        disabledText: '',
        style: 'width: 63%',
        errorHeight: '-30px',
        value: '',
      },
      gridAiMinBalance: {
        units: myStorage.get('sSymbolName') ? myStorage.get('sSymbolName').split('/')[1] : 'USDT',
        errorText: '',
        isError: false,
        disabled: false,
        disabledText: '',
        style: 'width: 63%',
        errorHeight: '-30px',
        value: '',
      },
    };
  },
  computed: {
    tradeTypeOpts() {
      const arr = [
        { label: this.$t('trade.limitPriceTrade'), value: 1 },
        { label: this.$t('trade.marketPriceTrade'), value: 2 },
      ]
      if (this.showUnlockSell) {
        arr.push({ label: this.$t('trade.unlockTrade'), value: 3 })
      }
      if (this.gridTradeFlag && this.showGridFlag) {
        arr.push({ label: this.$t('gridTrade.title'), value: 4 })
      }
      return arr
    },
    lan() {
      return this.$store.state.baseData.lan;
    },
    //  是否开启了 网格
    gridTradeFlag() {
      const { publicInfo } = this.$store.state.baseData;
      let str = 0;
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
    // 按钮信息
    gridbuttosContent() {
      return {
        gridButton: {
          // 开启网格交易
          text: this.isLogin
            ? this.$t('gridTrade.btn1')
            : this.$t('trade.loginReg'), // '登录/注册',
          class: this.isLogin ? 'u-1-bg buyBtn u-16-cl' : 'u-8-bg buyBtn u-16-cl',
        },
        // 开启AI网格策略
        gridAiButton: {
          text: this.isLogin
            ? this.$t('gridTrade.btn2')
            : this.$t('trade.loginReg'), // '登录/注册',
          class: this.isLogin ? 'u-1-bg buyBtn u-16-cl' : 'u-8-bg buyBtn u-16-cl',
        },
      };
    },
    // 等差网格（动态利润）： min ~ max

    // max =（（最高价-最低价）/ （网格数量 - 1）/ 最低价）  - 买入手续费率 - 卖出手续费率

    // min =（ (最高价-最低价）/ （网格数量 - 1））/ （最高价 - （ (最高价-最低价）/ （网格数量 - 1）））  - 买入手续费率 - 卖出手续费率

    // 最低利润
    gridSetMinProfits() {
      // 1: 等差 2 等比
      let val = null;
      if (this.gridSetMax.value
        && this.gridSetMin.value
        && this.gridSetNum.value) {
        if (this.setType === 1) {
          const card = division(
            cut(this.gridSetMax.value, this.gridSetMin.value),
            (this.gridSetNum.value - 1),
          );
          val = nul(cut(
            cut(
              division(
                card,
                cut(
                  this.gridSetMax.value,
                  card,
                ),
              ),
              this.fee,
            ),
            this.fee,
          ), 100);
        }
      }
      if (val === Infinity || val === -Infinity) {
        val = null;
      }
      return fixD(val, 2) || '--';
    },
    // 最高利润
    gridSetMaxProfits() {
      // 1: 等差 2 等比
      let val = null;
      if (this.gridSetMax.value
        && this.gridSetMin.value
        && this.gridSetNum.value) {
        if (this.setType === 1) {
          val = nul(cut(
            cut(
              division(
                division(
                  cut(this.gridSetMax.value, this.gridSetMin.value),
                  (this.gridSetNum.value - 1),
                ), this.gridSetMin.value,
              ),
              this.fee,
            ),
            this.fee,
          ), 100);
          // 等比网格（固定利润）=（（最高价/最低价）开（网格数量-1）次方） - 手续费率*2-1
        } else if (this.setType === 2) {
          val = nul(cut(
            cut(
              division(
                this.gridSetMax.value,
                this.gridSetMin.value,
              )
                ** (1 / (this.gridSetNum.value - 1)),
              nul(this.fee, 2),
            ),
            1,
          ), 100);
        }
      }
      if (val === Infinity || val === -Infinity) {
        val = null;
      }
      return fixD(val, 2) || '--';
    },
    setNumVal() {
      return this.gridSetNum.value;
    },
    symbolsData() {
      if (this.marketData[this.symbolCurrent]) {
        return this.marketData[this.symbolCurrent];
      }
      return {
        name: '--',
        symbol: {
          symbol: '--',
          unit: '--',
        },
        close: {
          class: '',
          data: 0,
          price: '--',
        },
        amount: '--',
        rose: {
          class: '',
          data: '--',
        },
      };
    },
  },
  watch: {
    // 切换自定义和ai
    gridType() {
      this.clearGridValue();
      this.getAiData();
    },
    // 切换 限价交易 和 市价交易
    transactionType(val) {
      // 2 市价交易
      this.$bus.$emit('tradeType', false);
      if (val === 2) {
        this.formData_1.disabled = true;
        this.formData_1.disabledText = this.$t('trade.mPriceBuy'); // 以市场最优价买入
        this.formData_2.title = this.$t('trade.dealMoney'); // '交易额';
        this.formData_2.units = this.symbolUnit.units;
        this.formData_3.disabled = true;
        this.formData_3.disabledText = this.$t('trade.mPriceSell'); // 以市场最优价卖出
      } else if (val === 1) {
        this.formData_1.disabled = false;
        this.formData_1.disabledText = '';
        this.formData_2.title = this.$t('trade.number'); // '数量';
        this.formData_2.units = this.symbolUnit.symbol;
        this.formData_3.disabled = false;
        this.formData_3.disabledText = '';
      } else if (val === 4) {
        this.clearGridValue();
        this.getAiData();
        // 改变父组件样式
        this.$bus.$emit('tradeType', 'grid');
      }
    },
    setNumVal(v) {
      if (v) {
        this.$nextTick(() => {
          this.gridSetNum.value = fixD(v, 0);
        });
      }
    },
    // 各个输入框的 单位
    symbolUnit(val) {
      this.formData_1.units = this.getShowName(val.units);
      this.formData_2.units = this.getShowName(val.symbol);
      this.formData_3.units = this.getShowName(val.units);
      this.formData_4.units = this.getShowName(val.symbol);
      this.gridSetMin.units = this.getShowName(val.units);
      this.gridSetMax.units = this.getShowName(val.units);
      this.gridSetAccount.units = this.getShowName(val.units);
      this.gridSetMaxBalance.units = this.getShowName(val.units);
      this.gridSetMinBalance.units = this.getShowName(val.units);
      this.gridAiAccount.units = this.getShowName(val.units);
      this.gridAiMaxBalance.units = this.getShowName(val.units);
      this.gridAiMinBalance.units = this.getShowName(val.units);
    },
  },
  methods: {
    init() {
      // 两秒让报错消失
      this.$bus.$on('errorMsg', () => {
        const formKey = [
          'gridAiAccount',
          'gridAiMaxBalance',
          'gridAiMinBalance',
          'gridAiNum',
          'gridSetMin',
          'gridSetMax',
          'gridSetNum',
          'gridSetAccount',
          'gridSetMaxBalance',
          'gridSetMinBalance',
        ];
        formKey.forEach((item) => {
          this[item].isError = false;
        });
      });
      // 监听 当前货币对切换
      this.$bus.$on('SYMBOL_CURRENT', (val) => {
        this.clearValue();
        this.clearGridValue();
        this.symbolCurrent = val;
        if (this.transactionType === 3) {
          this.transactionType = 1;
        }
        if (this.transactionType === 4 && this.showGridFlag && this.gridTradeFlag) {
          this.getAiData();
        } else if (this.transactionType === 4 && (!this.showGridFlag || !this.gridTradeFlag)) {
          this.transactionType = 1;
        }
      });
      if (this.isLogin) {
        this.$store.dispatch('assetsExchangeData', {
          auto: false,
          coinSymbols: this.coinSymbols,
        });
        // clearInterval(this.assetsInter);
        // this.assetsInter = setInterval(() => {
        //   this.$store.dispatch('assetsExchangeData', {
        //     auto: true,
        //     coinSymbols: this.symbolUnit.symbol,
        //   });
        // }, 10000);
      }
      // 监听 市场（最新价格） 数据
      this.$bus.$on('MARKET_DATA', (data) => {
        this.marketData = JSON.parse(JSON.stringify(data));
      });
      // 监听 价格点击
      this.$bus.$on('HANDEL_PRICE', (data) => {
        if (data) {
        // const obj = {name: 'formData_1', data };
          const arr = ['formData_1', 'formData_3'];
          arr.forEach((item) => {
            this.onChaneForm({ name: item, value: data });
          });
        // onChaneForm
        // this.formData_1.value = data;
        // this.formData_3.value = data;
        }
      });
    },
    switchGrid() {
      this.clearValue();
      this.transactionType = 4;
    },
    gradSub(type) {
      if (!this.isLogin) {
        this.$router.push('/login');
      } else {
        const {
          formKey,
          lowestPrice,
          highestPrice,
          gridNumber,
          totalQuoteAmount,
          stopHighPrice,
          stopLowPrice,
          quantType,
          flag,
          useOwnBase,
          totalBaseAmount,
          gridLineType,
        } = this.submitGridFormKey(type);
        let fal = true;
        if (formKey.length) {
          formKey.forEach((item) => {
            const { value } = this[item];
            if (!value) {
              this[item].errorText = `${this.$t('trade.pleaseInput')}`;
              this[item].isError = true;
              fal = false;
            }
            if (parseFloat(value) <= 0) {
              this[item].errorHeight = '-30px';
              this[item].errorText = `${this.$t('trade.inputError')}`; // 输入有误
              this[item].isError = true;
              fal = false;
            }
          });
          if (this.fal && fal && flag) {
            // 单格利润过小，请重新设置ai
            if (type !== 'gradTrad') {
              // 判断投入资金是否有足够余额，如无，则提示：USDT余额不足
              if (Number(totalQuoteAmount) > Number(this.currenTaccount.unitsAccoubt)) {
                this.$bus.$emit('tip', { text: `${getCoinShowName(this.symbolUnit.units, this.coinList)} ${this.$t('gridTrade.error3')}` });
                fal = false;
                return;
              } if (// 总投入资金/网格数量，不能小于当前币对的最小下单金额
                division(Number(totalQuoteAmount), gridNumber) < Number(this.minimumOrderQuantity)
              ) {
                this.$bus.$emit('tip', { text: this.$t('gridTrade.error4') });
                fal = false;
                return;
              } if (this.gridAiMax === '--' || this.gridAiMax <= 0 || this.gridAiMin === '--' || this.gridAiMin <= 0) {
                fal = false;
                this.$bus.$emit('tip', { text: this.$t('gridTrade.error9') });
                return;
              }
            } else if (type === 'gradTrad') { // 单格利润过小，请重新设置自定义
              // 判断投入资金是否有足够余额，如无，则提示：USDT余额不足
              if (Number(totalQuoteAmount) > Number(this.currenTaccount.unitsAccoubt)) {
                this.$bus.$emit('tip', { text: `${getCoinShowName(this.symbolUnit.units, this.coinList)} ${this.$t('gridTrade.error3')}` });
                fal = false;
                return;
                // 总投入资金/网格数量，不能小于当前币对的最小下单金额
              } if (division(Number(totalQuoteAmount), gridNumber)
              < Number(this.minimumOrderQuantity)) {
                this.$bus.$emit('tip', { text: this.$t('gridTrade.error4') });
                // 每格投入资金小于当前币对的最小下单金额
                fal = false;
                return;
              } if (gridLineType === 1) { // 等差
                if (this.gridSetMinProfits === '--' || this.gridSetMinProfits <= 0 || this.gridSetMaxProfits === '--' || this.gridSetMaxProfits <= 0) {
                  this.$bus.$emit('tip', { text: this.$t('gridTrade.error9') });
                  fal = false;
                  return;
                }
              } else if (gridLineType === 2) { // 等比只校验最大
                if (this.gridSetMaxProfits === '--' || this.gridSetMaxProfits <= 0) {
                  this.$bus.$emit('tip', { text: this.$t('gridTrade.error9') });
                  fal = false;
                  return;
                }
              }
            }
            if (Number(stopHighPrice) && Number(stopHighPrice) <= Number(highestPrice)) {
              // 止盈价格必须高于网格最高价
              this.$bus.$emit('tip', { text: this.$t('gridTrade.error5') });
              fal = false;
            } else if (Number(stopHighPrice)
              && Number(stopHighPrice) <= Number(this.symbolsData.close.data)) {
              this.$bus.$emit('tip', { text: this.$t('gridTrade.error7') });
              fal = false;
            } else if (Number(stopLowPrice)
              && Number(stopLowPrice) >= Number(lowestPrice)) {
              // 止损价格必须低于网格最低价
              this.$bus.$emit('tip', { text: this.$t('gridTrade.error6') });
              fal = false;
            } else if (Number(stopLowPrice)
              && Number(stopLowPrice) >= Number(this.symbolsData.close.data)) {
              this.$bus.$emit('tip', { text: this.$t('gridTrade.error8') });
              fal = false;
            }
          }
          if (this.fal && fal && flag) {
            this.fal = false;
            const submitData = {
              symbol: this.symbolCurrent,
              lowestPrice,
              highestPrice,
              gridNumber,
              totalQuoteAmount,
              stopHighPrice,
              stopLowPrice,
              quantType,
              useOwnBase,
              totalBaseAmount,
              gridLineType, // 网格类型 1:等差 2:等比
              fee: this.fee,
            };
            if (useOwnBase) {
              submitData.currentPrice = this.symbolsData.close.data;
              if (submitData.currentPrice) {
                this.gridCancelEvent(submitData);
              }
            } else {
              this.gridSubData(submitData);
            }
          }
        }
      }
    },
    submitGridFormKey(type) {
      let formKey = [];
      let lowestPrice = null;
      let highestPrice = null;
      let gridNumber = null;
      let totalQuoteAmount = null;
      let stopHighPrice = null;
      let stopLowPrice = null;
      let quantType = null;
      let flag = true;
      let gridLineType = 1;
      let useOwnBase = 0;
      const BoxHeight = document.body.clientWidth;
      if (type === 'gradTrad') {
        this.gridSetAccount.errorHeight = '-30px';
        formKey = ['gridSetMin', 'gridSetMax', 'gridSetNum', 'gridSetAccount'];
        lowestPrice = fixD(this.gridSetMin.value, this.fixValue.priceFix);
        highestPrice = fixD(this.gridSetMax.value, this.fixValue.priceFix);
        gridNumber = fixD(this.gridSetNum.value, this.fixValue.volumeFix);
        totalQuoteAmount = fixD(this.gridSetAccount.value, this.fixValue.priceFix);
        stopHighPrice = this.gridSetMaxBalance.value
          ? fixD(this.gridSetMaxBalance.value, this.fixValue.priceFix) : 0;
        stopLowPrice = this.gridSetMinBalance.value
          ? fixD(this.gridSetMinBalance.value, this.fixValue.priceFix) : 0;
        quantType = 1; // 网格
        gridLineType = this.setType;
        useOwnBase = this.gridSetFormFlag ? 1 : 0;

        // 判断最高价不能低于最低价的1.02倍。如低于，则提示：价格区间过小，请重新设置
        if (Number(highestPrice) < nul(lowestPrice, 1.02)) {
          this.gridSetMax.isError = true;
          // 价格区间过小，请重新设置
          if (BoxHeight < 1325) {
            this.gridSetMax.errorHeight = '-40px';
          }
          this.gridSetMax.errorText = this.$t('gridTrade.error1');
          flag = false;
        }
        if (Number(gridNumber) < 2 || Number(gridNumber) > 100) {
          this.gridSetNum.isError = true;
          // 数量区间为：2-100
          this.gridSetNum.errorText = this.$t('gridTrade.error2');
          flag = false;
        }
      } else {
        this.gridAiAccount.errorHeight = '-30px';
        formKey = ['gridAiAccount'];
        lowestPrice = this.gridAiMinPrice;
        highestPrice = this.gridAiMaxPrice;
        gridNumber = this.gridAiNum.value;
        totalQuoteAmount = fixD(this.gridAiAccount.value, this.fixValue.priceFix);
        stopHighPrice = this.gridAiMaxBalance.value
          ? fixD(this.gridAiMaxBalance.value, this.fixValue.priceFix) : 0;
        stopLowPrice = this.gridAiMinBalance.value
          ? fixD(this.gridAiMinBalance.value, this.fixValue.priceFix) : 0;
        quantType = 1; // 网格
        gridLineType = 1;
        useOwnBase = this.gridAiFormFlag ? 1 : 0; // 是否使用Base资产 0:不使用 1:使用
        // 单格利润过小，请重新设置
        // 判断最高价不能低于最低价的1.02倍。如低于，则提示：价格区间过小，请重新设置
        if (Number(highestPrice) < nul(lowestPrice, 1.02)) {
          this.gridAiMaxPrice.isError = true;
          if (BoxHeight < 1325) {
            this.gridAiMaxPrice.errorHeight = '-40px';
          }
          // 价格区间过小，请重新设置
          this.gridAiMaxPrice.errorText = this.$t('gridTrade.error1');
          flag = false;
        }

        if (Number(gridNumber) < 2 || Number(gridNumber) > 100) {
          this.gridAiNum.isError = true;
          this.gridAiNum.errorText = this.$t('gridTrade.error2');
          flag = false;
        }
      }
      return {
        formKey,
        lowestPrice,
        highestPrice,
        gridNumber,
        totalQuoteAmount,
        stopHighPrice,
        stopLowPrice,
        quantType,
        flag,
        useOwnBase,
        totalBaseAmount: useOwnBase ? this.currenTaccount.symbolAccoubt : 0,
        gridLineType,
      };
    },
    getShowName(v) {
      let str = '';
      const showNameMarket = this.$store.state.baseData.market;
      if (showNameMarket) {
        const { coinList } = showNameMarket;
        str = getCoinShowName(v, coinList);
      }
      return str;
    },
    // 清空 表单数据
    clearGridValue() {
      const formKey = [
        'gridAiAccount',
        'gridAiMaxBalance',
        'gridAiMinBalance',
        'gridAiNum',
        'gridSetMin',
        'gridSetMax',
        'gridSetNum',
        'gridSetAccount',
        'gridSetMaxBalance',
        'gridSetMinBalance',
      ];
      formKey.forEach((item) => {
        this[item].value = '';
        this[item].isError = false;
        this[item].subText = null;
      });
    },
    // 请求ai数据
    getAiData() {
      this.axios({
        url: 'noToken/quant/getAIStrategyInfo',
        hostType: 'quant',
        params: {
          symbol: this.symbolCurrent,
        },
        method: 'post',
      }).then((data) => {
        if (data.code.toString() === '0') {
          if (data.data && data.data.configParamMap) {
            this.gridAiMinPrice = fixD(
              data.data.configParamMap.lowestPrice, this.fixValue.priceFix,
            );
            this.gridAiMaxPrice = fixD(
              data.data.configParamMap.highestPrice, this.fixValue.priceFix,
            );
            this.gridAiBlance.disabledText = `${this.gridAiMinPrice} ~ ${this.gridAiMaxPrice}`;
            this.gridAiNum.disabledText = fixD(data.data.configParamMap.gridNumber, 0);
            this.gridAiNum.value = fixD(data.data.configParamMap.gridNumber, 0);
            this.gridAiMin = fixD(data.data.everyProfitMin, 2);
            this.gridAiMax = fixD(data.data.everyProfitMax, 2);
            this.fee = data.data.makerFee;
            // 最小下单数量
            this.minimumOrderQuantity = data.data.minimumOrderQuantity;
            this.sevenDay = fixD(data.data.sevenAnnualizedYield, 2); // 7日年华收益
          }
        } else {
          this.$bus.$emit('tip', { text: data.msg, type: 'error' });
        }
      });
    },
    // 给服务端传参数和当前行情用于判断是否够每格消耗
    gridCancelEvent(params) {
      this.axios({
        url: 'quant/calBaseAmount',
        hostType: 'quant',
        method: 'post',
        params,
      }).then((req) => {
        if (req.code.toString() === '0' && req.data) {
          if (Number(req.data.baseAmount) > Number(this.currenTaccount.symbolAccoubt)) {
            this.$bus.$emit('tip', {
              text: `${this.$t('gridTrade.least')}${req.data.baseAmount}
            ${getCoinShowName(this.symbolUnit.symbol, this.coinList)}`,
              type: 'error',
            });
            this.fal = true;
          } else {
            const obj = { ...params, totalBaseAmount: Number(req.data.baseAmount) };
            this.gridSubData(obj);
          }
        } else {
          this.$bus.$emit('tip', { text: req.msg, type: 'error' });
          this.fal = true;
        }
      });
    },
    gridSubData(params) {
      this.axios({
        url: 'quant/saveStrategy',
        hostType: 'quant',
        params,
        method: 'post',
      }).then((data) => {
        if (data.code.toString() === '0') {
          // 清空表单
          this.clearGridValue();
          // 重新请求资产
          this.$store.dispatch('assetsExchangeData', {
            auto: false,
            coinSymbols: this.coinSymbols,
          });
          this.getAiData();
          // 发送下单成功的事件
          this.$bus.$emit('ORDER_CREATE', { type: 'success' });
          // 提示成功 下单成功
          this.$bus.$emit('tip', { text: this.$t('trade.dealCussess'), type: 'success' });
          this.fal = true;
        } else {
          this.$bus.$emit('tip', { text: data.msg, type: 'error' });
          this.fal = true;
        }
      }).catch(() => {
        this.fal = true;
      });
    },
    dialogClose() {
      this.isShowDialog = false;
    },
  },
};

</script>

<style lang="stylus" scoped>
.page-content-chain .tradeModel-exchange .title-block {
  height: 29px!important;
  line-height: 29px!important;
  .tab {
    height: 28px!important;
  }
  .total-assets {
    height 28px;
  }
}
.trade-box.trade-box-ex-container .trade_block_width {
  width 100%;
  .trade-input.trade-grid {
    margin-top 6px;
  }
}

.trade-box.trade-box-ex-container .trade-form .top-mag-line {
  height: 40px;
  line-height: 40px;
  .lov {
    line-height: 40px;
  }
}
.trade-box.trade-box-ex-container .trade-form .volume-trade-line {
      height: 44px;
    line-height: 44px;
}

.trade-box p {
  margin-bottom 0;
}
.trade-box .lov_val {
  margin-bottom: 10px;
}
.trade-box label {
  margin-bottom 0;
}
.set_grid_type {
  height 30px;
  font-size 12px;
  line-height 30px;
  padding 0 30px;
  margin-bottom 10px;
  >span {
    margin-right 30px;
    float left;
    cursor: pointer;
  }
  p {
    float right;
  }
}
  .mr-text {
    margin-right 10px;
  }
  .trade-box.trade-box-ex-container .trade-grid .top-mag .lov {
    display: flex;
    align-items: center;
    height: 42px;
    line-height: 16px;
    justify-content: center;
  }
  .trade-box.trade-box-ex-container .trade-grid .top-mag .lov .lovText {
    vertical-align: middle;
    line-height: 16px;
    display: inline-block;
    word-wrap: break-word;
  }
  .trade-box.trade-box-ex-container .trade-grid .top-mag {
    height: 42px;
    line-height: 42px;
  }
  .input-inline-box {
    display flex;
    align-items: center;
    justify-content space-between;
    .input-inline-item {
      flex 1;
    }
    >b {
      display inline-block;
      width 10px;
      margin 0 9px;
      border-bottom-width 2px;
      border-bottom-style solid;
      position relative;
      top -2px;
    }
  }
  .set-type {
    margin-bottom: 6px;
  }
  .set-type-btn {
    cursor pointer;
    height 35px;
    display inline-block;
    width 45%;
    border-radius: 2px;
    border-width: 1px;
    border-style: solid;
    margin-right 5%;
    box-sizing border-box;
    float left;
    line-height 35px;
    text-align center;
  }
  .set-type-btn:nth-child(2) {
    float right;
    margin-right 0;
  }
  .set-num {
    margin-top 14px;
    .setn-num-list {
      width 33.33%;
      float left;
      padding-right 10px;
      box-sizing: border-box;
      .trade-input.trade-input-china-container .input-item {
        padding 8px 10px 0 15px;
        .inputs {
          width 62%;
        }
        .units {
          right 10px;
        }
      }
    }
    .setn-num-list:last-child {
      padding-right 0;
    }
  }
  .set-btc {
    margin-bottom 10px;
  }
  .switch-inline {
    margin-left 40px;
    display inline-block;
    vertical-align: middle;
  }
  .fee_love {
    display flex;
    justify-content space-between;
    align-items center;
    width: 100%;
    label {
      display: flex;
      align-items: center;
      >span {
        font-size: 16px;
        line-height 16px;
      }
    }
  }
  .en_US .trade-box.trade-box-ex-container .trade-grid .top-mag {
    margin-bottom 2px;
  }

  .header-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .trade-block {
    height: 430px;
    background-color: #fff;
    border-radius: 10px;
    margin-top: 29px;
    padding: 18px 24px 16px 25px;
    box-sizing: border-box;
    &:first-child {
      margin-right: 10px;
    }
    &:last-child {
      margin-left: 10px;
    }
    .top-mag {
      margin-bottom: 16px;
    }
    .trade-type {
      font-size: 16px;
      font-weight: 600;
      color: RGB(22, 22, 31);
    }
  }
  .trade-box.trade-box-ex-container .trade-form {
    .percentage {
      margin: 0;
      .per-item {
        height: 20px;
        line-height: 20px;
        border: 1px solid rgba(167, 180, 203, .3);
        color: #A7B4CB;
        margin-left: 0;
        margin-right: 10px;
        &:last-child {
          margin-right: 0;
        }
      }
    }
    .volume-trade {
      height: 59px;
      line-height: 59px;
      div {
        color: #16161F;
        font-size: 14px;
        font-weight: 600;
      }
    }
    .common-button {
      height: 56px;
      border-radius: 10px;
      background-color: RGB(18, 105, 255);
    }
  } 
</style>
