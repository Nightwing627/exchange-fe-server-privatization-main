<!-- 修改保证金 -->
<template>
  <c-dialog
    class="setMargin-dialog"
    paddingBottom="14px"
    :titleText="lanText.titleText"
    :showFlag="isShow"
    :confirmLoading="dialogConfirmLoading"
    :confirmDisabled="dialogConfirmDisabled"
    :confirmText="marginPromptText"
    @close="close"
    @confirm="dialogConfirm">
    <div class="setMarginCoin" v-if="isShow">
      <div class="form-info">
        <div class="category-select-box">
          <span class="tab b-1-cl"
            v-for="(item, index) in categoryList"
            :key="index"
            @click="selectCategory(item.id)"
            :class="item.classes">
            {{item.text}}
          </span>
        </div>
        <div class="info-item a-4-bg">
          <p class="text1"></p>
          <p class="text2 a-5-bd">
            <!-- 当前 -->
            {{lanText.text1}}
          </p>
          <p class="text2 a-5-bd">
            <!-- 变更后 -->
            {{lanText.text2}}
          </p>
        </div>
        <div class="info-item a-4-bg">
          <p class="text1">
            <!-- 仓位 -->
            {{lanText.text3}}
          </p>
          <p class="text2 b-1-cl a-5-bd">
            {{ thousandsComma(marginData.positionVolume) }} {{marginData.coUnit}}
          </p>
          <p class="text2 b-1-cl a-5-bd">
            {{ thousandsComma(marginData.positionVolume) }} {{marginData.coUnit}}
          </p>
        </div>
        <div class="info-item a-4-bg">
          <p class="text1">
            <!-- 仓位保证金 -->
            {{lanText.text4}}
          </p>
          <p class="text2 b-1-cl a-5-bd">
            {{ thousandsComma(marginData.holdAmount) }} {{marginData.marginCoin}}
          </p>
          <p class="text2 b-1-cl a-5-bd">
            {{ thousandsComma(modifiedMargin) }} {{marginData.marginCoin}}
          </p>
        </div>
        <div class="info-item a-4-bg">
          <p class="text1">
            <!-- 实际杠杆 -->
            {{lanText.text5}}
          </p>
          <p class="text2 b-1-cl a-5-bd">
            {{ activeLeverage() }} x
          </p>
          <p class="text2 b-1-cl a-5-bd">
            {{ activeLeverage(2) }} x
          </p>
        </div>
        <div class="info-item a-4-bg">
          <p class="text1">
            <!-- 强平价-->
            {{lanText.text6}}
          </p>
          <p class="text2 b-1-cl a-5-bd">
            {{ thousandsComma(marginData.reducePrice) }} {{marginData.marginCoin}}
          </p>
          <p class="text2 b-1-cl a-5-bd">
            <template v-if="modifiedReducePrice === '--'">
              {{modifiedReducePrice}}
            </template>
            <template>
              {{ thousandsComma(modifiedReducePrice) }}
            </template>

            {{marginData.marginCoin}}
          </p>
        </div>
        <div class="info-item a-4-bg" style="margin-top: 10px;" v-if="marginReviseType === 1">
          <p class="text1">
            <!-- 可用 -->
            {{lanText.text7}}
          </p>
          <p class="text2 b-1-cl a-5-bd">
            {{ thousandsComma(marginData.canUseAmount) }} {{ marginData.marginCoin }}
          </p>
        </div>
        <div class="info-item a-4-bg" style="margin-top: 10px;" v-else>
          <p class="text1">
            <!-- 可减少保证金 -->
            {{lanText.text8}}
          </p>
          <p class="text2 b-1-cl a-5-bd">
            {{ thousandsComma(marginData.canSubMarginAmount) }} {{ marginData.marginCoin }}
          </p>
        </div>
      </div>
      <div class="inline-input">
        <c-inputLine
          name="marginValue"
          :value="marginValue"
          :promptText="marginPromptText"
          :errorHave="true"
          :errorText="marginErrorText"
          :errorFlag="marginErrorFlag"
          @onchanges="inputChanges">
          <div>
            <i class="inp-marginCoin">{{ marginData.marginCoin }}</i>
            <c-button type="text" height="30px" @click="allevent">
              <!-- 全部 -->
              {{lanText.text9}}
            </c-button>
          </div>

        </c-inputLine>
      </div>
    </div>
  </c-dialog>
</template>
<script>
import mixin from '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/modules/coTrade/components/setMarginCoin/setMarginCoin';
import '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/modules/coTrade/components/setMarginCoin/setMarginCoin.styl';

export default {
  mixins: [mixin],
  mounted() {},
};
</script>
