<!-- 保证金模式 -->
<template>
  <c-dialog
    class="stop-order-mode"
    paddingBottom="14px"
    :titleText="lanText.titleText"
    :showFlag="isShow"
    :confirmLoading="dialogConfirmLoading"
    :confirmDisabled="dialogConfirmDisabled"
    @close="close"
    @confirm="submit">
    <div class="stopOrderMode-box">
      <table class="positionLis-table">
        <thead class="thead a-3-bd a-4-bg">
          <tr>
            <th v-for="(item, index) in columns" :key="index">
              <div>{{ item.title }}</div>
            </th>
          </tr>
        </thead>
        <tbody class="tbody" v-if="dataInfo && dataInfo.sideClass">
          <tr class="a-3-bd">
            <!-- 合约 -->
            <td>
                <div>
                  <i class="sideBg" v-if="dataInfo.sideClass" :class="dataInfo.sideClass.bg"></i>
                  <p class="symbol-name"> {{dataInfo.name}}</p>
                </div>
            </td>
            <!-- 仓位/可平 -->
            <td>
              <div>
                <p :class="dataInfo.sideClass.color">
                  <template
                  v-if="dataInfo.orderSide === 'SELL'">-</template>
                  {{thousandsComma(dataInfo.positionVolume)}}
                  / {{thousandsComma(dataInfo.canCloseVolume)}}
                </p>
              </div>
            </td>
            <!-- 成本价 -->
            <td> <div>{{thousandsComma(dataInfo.openAvgPrice)}} </div> </td>
            <!-- 最新价格-->
            <td>
              <div>
                <p> {{thousandsComma(newPrice)}}  </p>
                <!-- {{thousandsComma(dataInfo.indexPrice)}} -->
              </div>
            </td>
            <!-- 强平价格 -->
            <td> <div> {{thousandsComma(dataInfo.reducePrice)}} </div> </td>
          </tr>
        </tbody>
      </table>
      <div class="block-title">
        <span class="tit u-1-cl">
          <!-- 止盈 -->
          {{lanText.text1}}
        </span>
        <c-button
          height="26px"
          :disabled="!takeProfitCount"
          paddingW="6px"
          @click="cancelOrder(1)">
            <!-- 撤销所有止盈单 -->
            {{lanText.text2}}
            {{ takeProfitCount }}
        </c-button>
        <div class="condition-list" v-if="takeProfitCount">
          <span class="a-4-bg-h a-3-bd">
            <!-- 数量 单位 @ 触发价-->
            {{takeOutProfit.volume}} {{volUnit}} @{{takeOutProfit.triggerPrice}}
          </span>
          <div class="condition-box a-5-bg a-3-bd">
            <div class="order-c-table">
              <div class="thead a-3-bd a-5-bg">
                <div class="th" v-for="(item, index) in columns2" :key="index">
                  {{ item.title }}
                </div>
              </div>
              <div class="tbody-box">
                <vue-scroll>
                  <div class="tbody a-3-bd" v-for="(item, index) in takeProfitList" :key="index">
                    <!-- 止盈触发价 -->
                    <div class="td"> {{thousandsComma(item.triggerPrice)}} </div>
                    <!-- 委托价格 -->
                    <div class="td"> {{item.price}} </div>
                    <!-- 委托数量 -->
                    <div class="td">{{thousandsComma(item.volume)}} </div>
                  </div>
                </vue-scroll>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="block-box clearfix">
        <div class="form-block">
          <p v-if="dataInfo.orderSide === 'BUY'">
            <!-- 止盈价需大于标记价格 -->
            {{lanText.text3}}
          </p>
          <p v-else>
            <!-- 止盈价需小于标记价格 -->
            {{lanText.text4}}
          </p>
          <!-- 止盈触发价 -->
          <form-input
            :fix="formData_1.fix"
            :unit="formData_1.units"
            :title="formData_1.title"
            :placeHolder="placeHolder_one"
            :default="formData_1.value"
            :isError="formData_1.errorText"
            @tradeChangeValue="changeInput('formData_1', $event)">
          </form-input>
          <!-- 委托价格 -->
          <form-input
            :isMarket="isMarket_profit"
            :fix="formData_2.fix"
            :unit="formData_2.units"
            :default="formData_2.value"
            :placeHolder="formData_2.title"
            :haveMarket="true"
            :isError="formData_2.errorText"
            @selectMarket="selectMarket('isMarket_profit')"
            @tradeChangeValue="changeInput('formData_2', $event)">
          </form-input>
          <!-- 委托数量 -->
          <form-input
            :fix="formData_3.fix"
            :unit="formData_3.units"
            :placeHolder="formData_3.title"
            :default="formData_3.value"
            :isError="formData_3.errorText"
            @tradeChangeValue="changeInput('formData_3', $event)">
          </form-input>
        </div>
        <div class="form-info">
          <div class="info-item a-4-bg">
            <p class="text1">
              <!-- 预计盈亏 -->
              {{lanText.text5}}
            </p>
            <p v-if="takeAmount" class="text2 a-5-bd">
              <span :class="returnColor(takeAmount)">{{setAmountFix(takeAmount)}}</span>
              {{ dataInfo.quote }}</p>
          </div>
          <div class="info-item a-4-bg">
            <p class="text1">
              <!-- 预计收益率 -->
              {{lanText.text6}}
            </p>
            <p class="text2 a-5-bd">
              <span :class="returnColor(takeAmountRate)">{{takeAmountRate}}</span> %</p>
          </div>
        </div>
      </div>
      <div class="block-title">
        <span class="tit u-4-cl">
          <!-- 止损 -->
          {{lanText.text7}}
        </span>
        <c-button
          :disabled="!stopLossCount"
          height="26px"
          paddingW="6px"
          @click="cancelOrder(2)">
          <!-- 撤销所有止损单 -->
          {{lanText.text8}}
          {{stopLossCount}}
        </c-button>
        <div class="condition-list" v-if="stopLossCount">
          <span class="a-4-bg-h a-3-bd">
            <!-- 数量 单位 @ 触发价-->
            {{takeLoss.volume}} {{volUnit}} @{{takeLoss.triggerPrice}}
          </span>
          <div class="condition-box a-5-bg a-3-bd">
            <div class="order-c-table">
              <div class="thead a-3-bd a-5-bg">
                <div class="th" v-for="(item, index) in columns3" :key="index">
                  {{ item.title }}
                </div>
              </div>
              <div class="tbody-box">
                <vue-scroll>
                  <div class="tbody a-3-bd" v-for="(item, index) in stopLossList" :key="index">
                    <!-- 止损触发价 -->
                    <div class="td"> {{thousandsComma(item.triggerPrice)}} </div>
                    <!-- 委托价格 -->
                    <div class="td"> {{item.price}} </div>
                    <!-- 委托数量 -->
                    <div class="td">{{thousandsComma(item.volume)}} </div>
                  </div>
                </vue-scroll>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="block-box clearfix">
        <div class="form-block">
          <p v-if="dataInfo.orderSide === 'BUY'">
            <!-- 止损价需小于标记价格，大于强平价格 -->
            {{lanText.text9}}
          </p>
          <p v-else>
            <!-- 止损价需大于标记价格，小于强平价格 -->
            {{lanText.text10}}
          </p>
          <!-- 止盈触发价 -->
          <form-input
            :fix="formData_4.fix"
            :unit="formData_4.units"
            :title="formData_4.title"
            :placeHolder="placeHolder_two"
            :default="formData_4.value"
            :isError="formData_4.errorText"
            @tradeChangeValue="changeInput('formData_4', $event)">
          </form-input>
          <!-- 委托价格 -->
          <form-input
            :isMarket="isMarket_loss"
            :fix="formData_5.fix"
            :unit="formData_5.units"
            :default="formData_5.value"
            :placeHolder="formData_5.title"
            :haveMarket="true"
            :isError="formData_5.errorText"
            @selectMarket="selectMarket('isMarket_loss')"
            @tradeChangeValue="changeInput('formData_5', $event)">
          </form-input>
          <!-- 委托数量 -->
          <form-input
            :fix="formData_3.fix"
            :unit="formData_6.units"
            :placeHolder="formData_6.title"
            :default="formData_6.value"
            :isError="formData_6.errorText"
            @tradeChangeValue="changeInput('formData_6', $event)">
          </form-input>
        </div>
        <div class="form-info">
          <div class="info-item a-4-bg">
            <p class="text1">
              <!-- 预计盈亏 -->
              {{lanText.text11}}
            </p>
            <p v-if="lossAmount" class="text2 a-5-bd">
              <span :class="returnColor(lossAmount)">{{setAmountFix(lossAmount)}}</span>
              {{ dataInfo.quote }}</p>
          </div>
          <div class="info-item a-4-bg">
            <p class="text1">
              <!-- 预计收益率 -->
              {{lanText.text12}}
            </p>
            <p class="text2 a-5-bd">
              <span :class="returnColor(takelossAmount)">{{takelossAmount}}</span> %
            </p>
          </div>
        </div>
      </div>
      <div class="block-expireTime">
        <!-- 到期时间  有效期-->
      <!-- <form-select
        class="expireTime"
        :label="lanText.text29"
        :list="planTypeList"
        :current="expireTime"
        @selectList="selectPlanType">
      </form-select> -->
      </div>
    </div>
  </c-dialog>
</template>
<script>
import mixin from '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/modules/coTrade/components/stopOrder/stopOrder';
import '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/modules/coTrade/components/stopOrder/stopOrder.styl';
import formInput from './form-input.vue';
// import formSelect from './form-select.vue';

export default {
  mixins: [mixin],
  components: {
    formInput,
    // formSelect,
  },
  mounted() {
    this.init();
  },
};
</script>
