<!-- 合约设置 -->
<template>
  <div class="contract-dialog">
    <c-dialog
      paddingBottom="14px"
      :showFlag="isShow"
      :titleText="lanText.titleText"
      :confirmText="confirmText"
      @close="close"
      @confirm="submitConfirm">
      <section class="set-up-window">
        <!-- 持仓类型 -->
        <div class="redio-block2">
          <div class="label b-2-cl">
            <!-- 持仓类型 -->
            {{lanText.text1}}：</div>
          <div class="redio-box2">
            <p class="ts-1 u-4-cl">
              <!-- 持有任何合约仓位/有挂单时不可更改持仓类型 -->
              {{lanText.text2}}
            </p>
            <div class="item">
              <span class="b-1-cl" @click="redioChange('positionModel', 1)">
                <c-redio :value="positionModel === 1" />
                <!-- 单向持仓 -->
                {{lanText.text3}}
              </span>
              <p class="ts-2 b-1-cl">
                <!-- 单向持仓模式下，一个合约只允许持有一个方向的仓位 -->
                {{lanText.text4}}
              </p>
            </div>
            <div class="item">
              <span class="b-1-cl" @click="redioChange('positionModel', 2)">
                <c-redio :value="positionModel === 2" />
                <!-- 双向持仓 -->
                {{lanText.text5}}
              </span>
              <p class="ts-2 b-1-cl">
                <!-- 双向持仓模式下，一个合约可允许同时持有多空两个方向的仓位，并且同一合约下不同方向仓位风险对冲 -->
                {{lanText.text6}}
              </p>
            </div>
          </div>
        </div>
         <!-- 合约单位 -->
        <div class="redio-block">
          <span class="label b-2-cl">
            <!-- 合约单位 -->
            {{lanText.text10}}：</span>
          <div class="redio-box">
            <span class="b-1-cl" @click="redioChange('coUnit', 2)">
              <c-redio :value="coUnit === 2" />
              <!-- 张 -->
              {{lanText.text11}}
            </span>
            <span class="b-1-cl" @click="redioChange('coUnit', 1)">
              <c-redio :value="coUnit === 1" /> {{ multiplierCoin }}
            </span>
          </div>
        </div>
        <!-- 有效期 -->
        <div class="redio-block">
          <span class="label b-2-cl">
            <!-- 条件单/止盈止损有效期：-->
            {{$t('futures.setFutures.text13')}}：</span>
          <div class="redio-box">
            <span class="b-1-cl" @click="redioChange('expireTime', 1)">
              <c-redio :value="expireTime === 1" />
              <!-- 24H -->
              {{$t('futures.tradeForm.text16')}}
            </span>
            <span class="b-1-cl" @click="redioChange('expireTime', 7)">
              <c-redio :value="expireTime === 7" />
              <!-- 7天 -->
              {{$t('futures.tradeForm.text17')}}
            </span>
            <span class="b-1-cl" @click="redioChange('expireTime', 14)">
              <c-redio :value="expireTime === 14" />
              <!-- 14天 -->
              {{$t('futures.tradeForm.text18')}}

            </span>
            <span class="b-1-cl" @click="redioChange('expireTime', 30)">
              <c-redio :value="expireTime === 30" />
              <!-- 30天 -->
              {{$t('futures.tradeForm.text19')}}
            </span>
          </div>
        </div>
        <!-- 下单二次确认 -->
        <div class="redio-block">
          <span class="label b-2-cl">
            <!-- 下单前弹框确认 -->
            {{lanText.text7}}：</span>
          <div class="redio-box">
            <c-switch :value="switchFlag" @click="switchChange"/>
            <span class="b-1-cl">
              <!-- 下单前弹框确认 -->
              {{$t('futures.setFutures.text14')}}
            </span>
          </div>
        </div>

      </section>
    </c-dialog>
  </div>
</template>
<script>
import mixin from '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/modules/coTrade/components/set-futures/set-futures';
import '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/modules/coTrade/components/set-futures/set-futures.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
