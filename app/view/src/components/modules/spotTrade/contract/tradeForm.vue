
<!--
// *author: hdd
// *date：2020-09-10
// *des： 合约交易 => 下单模块
// */
 -->
<template>
  <div class="co-trade-box e-2-cl" id="coTradeBox">
    <div class="title-block a-21-bg a-3-bd">

      <span class="show-dialog-btn b-4-cl a-16-bg"
        :class="showClassType === 'depositDialogShow' ? 'a-14-bd' : 'a-12-bd'"
        @mouseenter="evenHandMouseenter('showClassType', 'depositDialogShow')"
        @mouseleave="evenHandMouseleave('showClassType')"
        @click="setShowDialog('depositDialogShow')">
        {{ marginModelText }}
      </span>
      <span class="show-dialog-btn b-4-cl a-16-bg"
      :class="showClassType === 'leverageDialogShow' ? 'a-14-bd' : 'a-12-bd'"
        @mouseenter="evenHandMouseenter('showClassType', 'leverageDialogShow')"
        @mouseleave="evenHandMouseleave('showClassType')"
        @click="setShowDialog('leverageDialogShow')">
        {{nowLevel}}X
      </span>
      <div class="counter-and-set">
        <!-- 合约计算器按钮 -->
        <i class="set-btn-icon" @click="showDialog('OPEN_CALCULATOR_DIALOG')">
          <svg class="icon icon-18 hover-show" aria-hidden="true">
            <use xlink:href="#icon-b_39_1"></use>
          </svg>
          <svg  class="icon icon-18 hover-hide" aria-hidden="true">
            <use xlink:href="#icon-b_39"></use>
          </svg>
        </i>
        <!-- 合约设置按钮 -->
        <i class="set-btn-icon" @click="showDialog('SET_FUTURE_CONFIG')">
          <svg class="icon icon-18 hover-show" aria-hidden="true">
            <use xlink:href="#icon-b_2_1"></use>
          </svg>
          <svg class="icon icon-18 hover-hide" aria-hidden="true">
            <use xlink:href="#icon-b_2"></use>
          </svg>
        </i>
      </div>
    </div>
    <div class="trade-form">
      <!-- 开仓 平仓 (双向持仓可开启)-->
      <div class="category-select-box" v-if="positionModel === 2">
        <span class="tab"
          v-for="(item, index) in switchTradeTypeList"
          :key="index"
          @click="switchTradeType(item.id)"
          :class="item.classes">
          <i class="h">{{item.text}}</i>
          <i class="s b-1-cl">{{item.text}}</i>
        </span>
      </div>
      <!-- 价格类型 限价单、市价单、条件单  -->
      <div class="category-select-box">
        <span class="tab"
          v-for="(item, index) in categoryList"
          :key="index"
          @click="selectCategory(item.id)"
          :class="item.classes">
          <i class="h">{{item.text}}</i>
          <i class="s b-1-cl">{{item.text}}</i>
        </span>
      </div>
      <!-- 价格 -->
      <form-input
        :promptText="formData_1.promptText"
        v-if="formData_1.isShow"
        :fix="formData_1.fix"
        :unit="formData_1.units"
        :title="formData_1.title"
        :default="formData_1.value"
        :isPercentage ="formData_1.percentageVlaue"
        :isError="formData_1.errorText"
        @clearPercentage="clearPercentage"
        @tradeChangeValue="changeInput('formData_1', $event)">
      </form-input>
      <div v-if="formData_1.errorText" class="form-error b-6-cl">{{formData_1.errorText}}</div>
      <!-- 数量 -->
      <form-input
        :promptText="formData_2.promptText"
        v-if="formData_2.isShow"
        :isMarket="isMarket"
        :fix="formData_2.fix"
        :unit="formData_2.units"
        :default="formData_2.value"
        :title="formData_2.title"
        :haveMarket="true"
        :isError="formData_2.errorText"
        :percentageVlaue=percentageVlaue
        @selectMarket="selectMarket"
        @clearPercentage="clearPercentage"
        @tradeChangeValue="changeInput('formData_2', $event)">
      </form-input>
      <div v-if="formData_2.errorText" class="form-error b-6-cl">{{formData_2.errorText}}</div>

      <form-input
        :promptText="formData_3.promptText"
        v-if="formData_3.isShow"
        :fix="formData_3.fix"
        :unit="formData_3.units"
        :title="formData_3.title"
        :default="formData_3.value"
        :isError="formData_3.errorText"
        :isPercentage ="formData_3.percentageVlaue"
        @clearPercentage="clearPercentage"
        @tradeChangeValue="changeInput('formData_3', $event)">
      </form-input>
      <div v-if="formData_3.errorText" class="form-error b-6-cl">{{formData_3.errorText}}</div>
      <!-- 仓位价值  只有 （开仓 || 非只减仓） && 市价 显示 -->
      <p class="convert b-1-cl" v-if="isOpenAndIsMarket && !percentageVlaue">
        ≈ {{ worthRate }} <span> {{multiplierCoin}}</span>
      </p>
      <p  class="convert b-1-cl"
        v-if="currentCategory !== 2 && !isMarket && worthValue && !percentageVlaue">
        <!-- 价值 -->
        {{lanText.textjz}}
        {{ worthValue }}
          <template v-if="contractSide === 1">{{ priceUnit }}</template>
          <template v-else>{{ baseCoin }}</template>
      </p>
      <div class="percentage a-3-bd">
        <span
          v-for="item in percentageList"
          :key="item"
          @mouseenter="evenHandMouseenter('percentageVlaueHover', item)"
          @mouseout="evenHandMouseenter('percentageVlaueHover', null)"
          @click="setPercentageVlaue(item)"
          :class="(percentageVlaue === item || percentageVlaueHover === item)
          ? 'a-12-bd b-4-cl': 'a-3-bd'">
          {{item}}%
        </span>
      </div>
      <!-- 可买  可卖 -->
      <div class="openable">
        <div class="left">
          <label class="u-1-cl">{{openableData.buyText}}</label>
          <span> {{thousandsComma(maxCanBuyNumber)}} {{volUnit}}</span>
        </div>
        <div class="right">
          <label class="u-4-cl">{{openableData.sellText}}</label>
          <span > {{thousandsComma(maxCanSellNumber)}} {{volUnit}} </span>
        </div>
      </div>
      <!-- 选项 -->
      <div class="option" v-if="currentCategory !== 2 || positionModel === 1">
        <template v-if="currentCategory !== 2 && !isMarket">

          <div class="select-order-type">
            <c-checkBox :value="isCheckedOrdeType" @click="checkedOrdeTypeclick"/>
            <label class="ac-type">
              <div class="h-show">
                <span class="tit a-1-bd">{{ordeType.title}}</span>
                <span @click="ordeTypePtions = !ordeTypePtions" class="triangle-down b-4-bd"></span>
              </div>
              <div class="h-hide">
                <span class="tit a-1-bd">{{ordeType.title}}</span>
                <span @click="ordeTypePtions = !ordeTypePtions" class="triangle-down"></span>
              </div>
              <p class="tip-text a-5-bg a-3-bd b-1-cl">
                {{ordeType.text}}
              </p>
            </label>
             <!-- @mouseout="evenHandMouseenter('ordeTypePtions', false)" -->
            <div class="orde-type-ptions a-21-bg" v-show="ordeTypePtions">
              <p
                v-for="(item) in ordeTypeList"
                :key="item.id"
                :class="(ordeType.id === item.id || hoverOrdeType.id === item.id)
                ? 'a-3-bg b-1-cl' : ''"
                @mouseenter.stop="evenHandMouseenter('hoverOrdeType', item)"
                @mouseout.stop="evenHandMouseenter('hoverOrdeType', {})"
                @click.stop="radioClick(item)" >
                {{item.title}}
              </p>
            </div>
          </div>
        </template>
        <!-- 只减仓（只要单向持仓会显示只减仓） -->
        <span v-if="positionModel === 1">
          <c-checkBox :value="zhiJianCang" @click="checkoutClick"/>
          <!-- 只减仓 -->
          <label class="rt-label a-1-bd">{{lanText.text6}}
            <p class="tip-text rt-label-zjc a-5-bg a-3-bd b-1-cl">
              <!-- 只减仓订单只会减少仓位，不会增加仓位。 -->
              {{lanText.text7}}
            </p>
          </label>
        </span>
      </div>
      <!-- 到期时间  有效期-->
      <!-- <form-select
        class="expireTime"
        v-if="currentCategory === 3"
        :label="lanText.text4"
        :list="planTypeList"
        :current="expireTime"
        @selectList="selectPlanType">
      </form-select> -->
      <!-- 买入 卖出 按钮 -->
      <div class="submit-button">
        <c-button
          v-if="!isLogin || !openContract"
          :defaultColorClass='loginButton.class'
          :hoverColorClass='loginButton.class'
          :activeColorClass='loginButton.class'
          @click="loginButtonClick()"
          width="100%">
          {{loginButton.text}}
        </c-button>
        <template v-if="isLogin && openContract">
          <c-button
            :defaultColorClass='buttosContent.buyButton.class'
            :hoverColorClass='buttosContent.buyButton.class'
            :activeColorClass='buttosContent.buyButton.class'
            @click="submitForm('BUY')"
            :disabled='isSubmitDisbled'
            paddingW="10px"
            width="140px">
          {{buttosContent.buyButton.text}}
          </c-button>
          <c-button
            :defaultColorClass='buttosContent.sellButton.class'
            :hoverColorClass='buttosContent.sellButton.class'
            :activeColorClass='buttosContent.sellButton.class'
            @click="submitForm('SELL')"
            :disabled='isSubmitDisbled'
            paddingW = "10px"
            width = "140px">
            {{buttosContent.sellButton.text}}
          </c-button>
        </template>
      </div>
      <!-- 成本 -->
      <div class="hold-position">
        <div class="left">
          <label>
            <!-- 成本 -->
            {{lanText.text5}}
          </label>
          <span>{{ thousandsComma(canBuyCostNumber) }} {{ marginCoin }}</span>
        </div>
        <div class="right">
          <label>
            <!-- 成本 -->
            {{lanText.text5}}
          </label>
          <span>{{ thousandsComma(canSellCostNumber) }} {{ marginCoin }}</span>
        </div>
      </div>
      <!-- 可用 -->
      <div class="available a-3-bd">
        <div>
          <span class="rt-label a-1-bd">
            <!-- 可用 -->
            {{lanText.text2}}
            <p class="tip-text a-5-bg a-3-bd b-1-cl" v-html="lanText.text3">
              <!-- 可用余额为用户可自由支配的资金。可用余额会优先作为全仓保证金，当全仓仓位亏损时，可用就会减少。 -->
            </p>
          </span>
          {{ thousandsComma(canUseAmount) }} {{ marginCoin }}</div>
      </div>
    </div>
    <!-- 强制提醒(二次确认) -->
    <forcedReminder
      :dataInfo ="confirmData"
      :isShow="forcedReminderShow"
      :close="closeDialog"
      @submitOrder="submitOrder"
    />
    <!-- 设置杠杆 -->
    <lever-component
      v-if="leverageDialogShow"
      :isShow="leverageDialogShow"
      :close="closeDialog"
    />
    <!-- 切换 保证金模式 -->
    <depositMode
      v-if="depositDialogShow"
      :isShow="depositDialogShow"
      :close="closeDialog"
    />
  </div>
</template>
<script>
import mixin from '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/modules/coTrade/tradeForm/tradeForm';
import calculateVolumeMixin from '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/modules/coTrade/tradeForm/calculateVolume';
import '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/modules/coTrade/tradeForm/tradeForm.styl';


import formInput from '@/components/modules/coTrade/component/form-input.vue';
import forcedReminder from '@/components/modules/coTrade/component/forced-reminder.vue';
// 调整杠杆弹框
import leverComponent from '@/components/modules/coTrade/component/lever.vue';
// 保证金模式 全仓 逐仓 切换
import depositMode from '@/components/modules/coTrade/component/depositMode.vue';

export default {
  mixins: [mixin, calculateVolumeMixin],
  components: {
    formInput,
    forcedReminder,
    leverComponent,
    depositMode,
  },
  mounted() {
    this.init();
  },
  // 组价离开前执行
  beforeDestroy() {
    clearInterval(this.assetsInter);
  },
};
</script>
<style lang="stylus" scoped>
.trade-form {
  background-color: #fff;
}
</style>
