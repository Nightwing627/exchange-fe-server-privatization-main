<!-- 币币交易 24小时行情 -->
<template>
  <div class="sl-swap-assets a-6-bg a-8-bd" :style="{height: boxHeight + 'px'}">
    <div class="block-header title a-3-bd a-21-bg">
      <!-- 资产 -->
      <span
        class="tab"
        v-if="isLogin && openContract"
        @click="switchBlock(1)"
        :class="{'a-12-bd b-1-cl': blockType === 1 }">
        <!-- 资产 -->
        {{lanText.text1}}
      </span>
      <span
        class=" tab"
        @click="switchBlock(2)"
        :class="{'a-12-bd b-1-cl': blockType === 2 }">
        <!-- 合约信息 -->
        {{lanText.text2}}
      </span>
      <!-- 立即划转 -->
      <a class="b-4-cl" v-if="blockType === 1 && openContract" @click="openTransfer">
        <!-- 立即划转 -->
        {{lanText.text3}}
      </a>
      <a class="b-4-cl" v-else @click="goFuturesData">
        <!-- 合约数据 -->
        {{lanText.text25}}
      </a>
    </div>
    <div :style="{height: boxHeight - 30 + 'px'}">
      <vue-scroll>
        <template v-if="blockType === 1">
          <div v-if="balanceInfor.totalAmount && Number(balanceInfor.totalAmount) !== 0"
          class="assetsChart">
            <assetsChart :balanceInfor="balanceInfor" />
            <div class="total-rate">
              <p class="text-il"><span class="b-1-cl">
                {{ balanceInfor.totalMarginRate }} %
              </span></p>
              <div class="hint-father text-il">
                <a class="b-2-cl a-1-bd">
                  <!-- 账户保证金率 -->
                  {{lanText.text5}}
                </a>
                <p class="hint a-5-bg b-1-cl a-3-bd" :class="hintClass" v-html="lanText.text6">
                  <!-- 账户保证金率=该币种总资产/该币种担保的仓位总价值。此值用来表示担保资产的大致水平。保证金率越低，仓位被强制减仓的风险越大。 -->
                </p>
              </div>
            </div>
          </div>
          <ul class="assets-list">
            <li class="total-amount a-3-bd">
              <i class="bg a-4-bg"></i>
              <!-- 总资产 -->
              <div class="hint-father">
                <a class="b-2-cl">
                  <!-- 总资产 -->
                  {{lanText.text7}}
                </a>
                <p class="hint a-5-bg b-1-cl a-3-bd" :class="hintClass">
                  {{marginCoin}}
                  <!-- 合约账户总权益。账户总权益=全仓总权益+逐仓总权益+冻结保证金。 -->
                  <span v-html="lanText.text8"></span>
                </p>
              </div>
              <span class="b-1-cl">{{thousandsComma(balanceInfor.totalAmount)}}
                {{marginCoin}}</span>
            </li>
            <li>
              <i class="bg a-4-bg"></i>
              <!-- 仓位保证金 -->
              <div class="hint-father">
                <a class="b-2-cl a-1-bd">
                  <i class="clole-style clole-style_1"></i>
                  <!-- 全仓保证金 -->
                  {{lanText.text9}}
                </a>
                <p class="hint a-5-bg b-1-cl a-3-bd" :class="hintClass" v-html="lanText.text10">
                  <!-- 所有用来担保全仓仓位的保证金。当全仓仓位被强制平仓时，会损失这些资产。
                  请注意：转入合约账户的资产会自动作为全仓保证金。 -->
                  <!-- {{}} -->
                  </p>
              </div>
              <span class="b-1-cl">{{thousandsComma(balanceInfor.totalMargin)}}
                {{marginCoin}}</span>
            </li>
            <li>
              <i class="bg a-4-bg"></i>
              <!-- 未实现盈亏 -->
              <div class="hint-father">
                <a class="b-2-cl a-1-bd"> <i class="clole-style clole-style_2"></i>
                <!-- 逐仓保证金 -->
                {{lanText.text11}}
              </a>
                <p class="hint a-5-bg b-1-cl a-3-bd" :class="hintClass" v-html="lanText.text12">
                  <!-- 所有用来担保逐仓仓位的保证金。
                  逐仓保证金和全仓分开，全仓仓位被强制平仓不会影响到这部分资产。 -->
                </p>
              </div>
              <span class="b-1-cl">{{thousandsComma(balanceInfor.isolateMargin)}}
                {{marginCoin}}</span>
            </li>
            <li>
              <i class="bg a-4-bg"></i>
              <!-- 冻结保证金 -->
              <div class="hint-father">
                <a class="b-2-cl"> <i class="clole-style clole-style_3"></i>
                  <!-- 冻结保证金 -->
                  {{lanText.text13}}
                </a>
                <p class="hint a-5-bg b-1-cl a-3-bd" :class="hintClass">
                  <!-- 提交委托时冻结的委托保证金总和。 -->
                  {{lanText.text14}}
                </p>
              </div>
              <span class="b-1-cl">{{thousandsComma(balanceInfor.lockAmount)}} {{marginCoin}}</span>
            </li>
          </ul>
        </template>
        <div class="futures-info-list" v-else>
          <div class="info-item a-3-bd">
              <span class="th">
                <!-- 合约代号 -->
                {{lanText.text15}}
              </span>
              <span class="td">{{ contractNames(contractInfo.symbol)}}</span>
          </div>
          <div class="info-item a-3-bd">
            <!-- 交割日期  -->
              <span class="th"> {{lanText.text16}}</span>
              <span class="td"> {{contractShowType}} </span>
          </div>
          <div class="info-item a-3-bd">
            <!-- 合约标的  -->
              <span class="th"> {{lanText.text17}}</span>
              <span class="td">{{contractInfo.symbol | setSymbolNumer}}
                <!-- 指数 -->
                {{lanText.text18}}
              </span>
          </div>
          <div class="info-item a-3-bd">
            <!-- 保证金币种  -->
              <span class="th"> {{lanText.text19}}</span>
              <span class="td">{{ marginCoin }}</span>
          </div>
          <div class="info-item a-3-bd">
            <!-- 合约面值  -->
              <span class="th"> {{lanText.text20}}</span>
              <span class="td">{{ thousandsComma(contractInfo.multiplier)}}
                {{contractInfo.multiplierCoin}}</span>
          </div>
          <div class="info-item a-3-bd">
            <!-- 最小价格变动单位  -->
              <span class="th">  {{lanText.text21}}</span>
              <span class="td">{{ pricefix | setfixNumer}} {{ priceUnit }}</span>
          </div>
          <div class="info-item a-3-bd">
            <!-- 最低维持保证金率  -->
              <span class="th">  {{lanText.text22}}</span>
              <span class="td">{{minMarginRate}}%</span>
          </div>
          <div class="info-item a-3-bd">
            <!-- 结算周期  -->
              <span class="th">  {{lanText.text23}}</span>
              <span class="td">{{contractInfo.settlementFrequency}}min</span>
          </div>
        </div>
      </vue-scroll>
    </div>

    <common-transfer
      :symbol="marginCoin"
      :isShow="transferIsShow"
      :close="closeDialog">
    </common-transfer>
  </div>
</template>
<script>
import mixin from '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/modules/coTrade/assets/assets';
import '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/modules/coTrade/assets/assets.styl';
import commonTransfer from './component/transfer.vue';
import assetsChart from './echarts/assetsChart.vue';


export default {
  mixins: [mixin],
  components: { commonTransfer, assetsChart },
  mounted() {
    this.init();
  },
};

</script>
