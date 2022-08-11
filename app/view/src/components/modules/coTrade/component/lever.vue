<!-- 杠杆 -->
<template>
  <c-dialog
    paddingBottom="14px"
    :titleText="dialogTitle"
    :showFlag="isShow"
    :confirmLoading="dialogConfirmLoading"
    :confirmDisabled="dialogConfirmDisabled"
    :confirmText="confirmText"
    @close="close"
    @confirm="submitLeverage">
    <div class="lever-box" :class="{ 'no-drop': !levelSwitch }">
      <div class="add-and-sub a-3-bd" :class="inputActiveClass">
        <label class="label">
          <!-- 杠杆倍数 -->
          {{lanText.text1}}
        </label>
        <div class="content">
          <input
            class="b-1-cl"
            type="text"
            v-model="leverage"
            :disabled="inputDisabled"
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
          class="a-6-bd"
          @click.stop="dragStep(index)"
          :style="{ left: parseInt(index * 20) + '%' }"
          :class="['drag-step' + index, index * 20 > stepPosition ? 'a-3-bg' : 'c-8-bg' ]">
          <b class="mark">{{ nulFun(index, itemLvaue) }} X</b>
        </i>
      </div>
      <div class="max-can-open f-6-cl" v-if="isShowUserMaxLevel">
        <!-- 当前持仓最高支持杠杆 -->
        *{{lanText.text2}}
        {{userMaxLevel}}X
      </div>
      <!-- 当前杠杆最大可开多/开空 -->
      <div class="max-can-open">
        <!-- 当前杠杆最高可持有仓位上限约 -->
        {{lanText.text3}}
        <span> {{ thousandsComma(maxNumber) }} {{coUnit}} </span>
      </div>
    </div>
  </c-dialog>
</template>
<script>
import mixin from '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/modules/coTrade/lever/lever';
import '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/modules/coTrade/lever/lever.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
