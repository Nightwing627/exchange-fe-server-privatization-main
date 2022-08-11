<!-- 计算器 -->
<template>
  <c-dialog
    class="calculator-mode"
    paddingBottom="20px"
    :titleText="lanText.text1"
    :showFlag="isShow"
    :haveOption="haveOption"
    :confirmLoading="dialogConfirmLoading"
    :confirmDisabled="dialogConfirmDisabled"
    @close="close"
    @confirm="submit">
    <div class="calculatorMode-box">

      <div class="category-select-box">
        <span class="tab b-1-cl"
          v-for="(item, index) in categoryTypeList"
          :key="index"
          @click="switchType('categoryType', item.id)"
          :class="item.classes">
          {{item.text}}
        </span>
      </div>
      <div class="block-box clearfix">
        <div class="form-block">
          <div class="category-select-box">
            <span class="tab b-1-cl"
              v-for="(item, index) in sideTypeList"
              :key="index"
              @click="switchType('sideType', item.id)"
              :class="item.classes">
              {{item.text}}
            </span>
          </div>
          <div class="add-and-sub a-3-bd" :class="inputActiveClass">
            <label class="label">
              <!-- 杠杆倍数 -->
              {{lanText.text2}}
            </label>
            <div class="content">
              <input
                class="b-1-cl"
                type="text"
                v-model="leverage"
                @focus="inputActiveClass = 'a-12-bd'"
                @blur="inputActiveClass = 'a-3-bd'"
              />
            </div>
            <div class="options">
              <a class="add a-3-bd" @click="add">
                <i>
                  <svg class="icon icon-14 hover-show" aria-hidden="true">
                    <use xlink:href="#icon-a_11" />
                  </svg>
                  <svg class="icon icon-14  hover-hide" aria-hidden="true">
                    <use xlink:href="#icon-a_11_1" />
                  </svg>
                </i>
              </a>
              <a class="sub a-3-bd" @click="subtract">
                <i>
                  <svg class="icon icon-14  hover-show" aria-hidden="true">
                    <use xlink:href="#icon-a_11" />
                  </svg>
                  <svg class="icon icon-14  hover-hide" aria-hidden="true">
                    <use xlink:href="#icon-a_11_1" />
                  </svg>
                </i>
              </a>
            </div>
          </div>
          <div class="transaction-drag" ref="dragStepWrap" @click.stop="onmousedownCick">
            <!-- transition -->
            <span
              class="drag-step c-8-bd a-5-bg"
              @mousedown="onmousedown"
              ref="dragStep"
              :style="{ left: stepPosition + '%' }">
            </span>
            <span class="drag-def a-3-bg">
              <em
                class="drag-bar c-8-bg" :style="{ width: stepPosition + '%' }">
              </em>
            </span>
            <i
              class="c-8-bg a-6-bd drag-step0"
              @click.stop="dragStep(0)" :style="{ left: '1%' }">
              <b class="mark">1X</b>
            </i>
            <i
              v-for="index in 5"
              :key="index"
              class="a-3-bg a-6-bd"
              @click.stop="dragStep(index)"
              :style="{ left: parseInt(index * 20) + '%' }"
              :class="['drag-step' + index, index * 20 > stepPosition ? 'a-3-bg' : 'c-8-bg' ]">
              <b class="mark">{{ nulFun(index, itemLvaue) }} X</b>
            </i>
          </div>
          <div class="max-can-open">
            <!-- 当前杠杆最高可持有头寸数  -->
            {{lanText.text3}}
            <span> {{ maxNumber }} {{volUnit}} </span>
          </div>
          <form-input
            v-if="formData_1.isShow"
            :fix="formData_1.fix"
            :unit="formData_1.units"
            :placeHolder="formData_1.title"
            :default="formData_1.value"
            :isError="formData_1.errorText"
            @tradeChangeValue="changeInput('formData_1', $event)">
          </form-input>
          <form-input
            v-if="formData_2.isShow"
            :fix="formData_2.fix"
            :unit="formData_2.units"
            :default="formData_2.value"
            :placeHolder="formData_2.title"
            :isError="formData_2.errorText"
            @tradeChangeValue="changeInput('formData_2', $event)">
          </form-input>
          <form-input
            v-if="formData_3.isShow"
            :fix="formData_3.fix"
            :unit="formData_3.units"
            :placeHolder="formData_3.title"
            :default="formData_3.value"
            :isError="formData_3.errorText"
            @tradeChangeValue="changeInput('formData_3', $event)">
          </form-input>
          <c-button
          height="40px"
          :disabled="dialogConfirmDisabled"
          paddingW="6px"
          width="100%"
          marginTop="6px"
          @click="submit">
             <!-- 计算 -->
             {{lanText.text4}}
        </c-button>
        </div>
        <div class="form-info a-4-bg">
          <div class="tit a-5-bd">
            <!-- 计算结果 -->
            {{lanText.text5}}
          </div>
          <template v-if="categoryType === 1">
            <div class="info-item a-5-bd">
              <p class="text1">
                <!-- 开仓保证金 -->
                {{lanText.text6}}
              </p>
              <p class="text2 a-5-bd">
                <span :class="openMarginClass">
                  {{ thousandsComma(openMargin) }}</span> {{marginCoin}}</p>
            </div>
            <div class="info-item a-5-bd">
              <p class="text1">
                <!-- 收益额 -->
                {{lanText.text7}}
              </p>
              <p class="text2 a-5-bd">
                <span
                :class="revenueClass">{{ thousandsComma(revenue) }}
                </span> {{marginCoin}}</p>
            </div>
            <div class="info-item a-5-bd">
              <p class="text1">
                <!-- 回报率 -->
                {{lanText.text8}}
              </p>
              <p class="text2 a-5-bd">
                <span :class="reportRateClass">
                  {{ thousandsComma(reportRate) }}</span> %</p>
            </div>
          </template>
          <div class="info-item a-5-bd" v-if="categoryType === 2">
            <p class="text1">
              <!-- 平仓价格 -->
              {{lanText.text9}}
            </p>
            <p class="text2 a-5-bd" v-if="closePrice === 'none'">
              <!-- 无法达到该收益率 -->
              {{lanText.text10}}
            </p>
            <p class="text2 a-5-bd" v-else>
              <span
              :class="closePriceClass">{{ thousandsComma(closePrice) }}</span>
              {{priceUnit}}</p>
          </div>
          <div class="info-item a-5-bd" v-if="categoryType === 3">
            <p class="text1">
              <!-- 强平价格 -->
              {{lanText.text11}}
            </p>
            <p class="text2 a-5-bd">
              <span
              :class="forceClosePriceClass">{{ forceClosePrice }} </span>
               <template v-if="forceClosePriceNUm"> {{priceUnit}} </template>
              </p>
          </div>
        </div>
      </div>

    </div>
  </c-dialog>
</template>
<script>
import mixin from '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/modules/coTrade/components/calculator/calculator';
import '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/modules/coTrade/components/calculator/calculator.styl';
import formInput from './form-input.vue';

export default {
  mixins: [mixin],
  components: {
    formInput,
  },
  mounted() {
    // this.init();
  },
};
</script>
