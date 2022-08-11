<template>
<section class="otcDetailOrder-pays  clearfix" v-if="isReady">
  <!-- 卖家支付方式 -->
  <span class="otcDetailOrder-pays-title">{{ $t('otcDetailOrder.SellersPaymentMethod') }}</span>
  <div class="otcDetailOrder-pays-body">
    <ul class="paysList" v-if="showPay">
      <li class="clearfix" v-for="(item, index) in pays" :key="index">
        <!-- 选择框 仅支付方 在未支付情况下展示 -->
        <div class="paysList-redio" v-if="commonData.side==='BUY'" @click="payClick(item)">
          <c-redio :value="payObj.payment === item.payment ? true : false"/>
        </div>
        <!-- 信息 支付宝/微信 -->
        <div class="paysList-message clearfix"
          v-if="item.payment === 'otc.payment.alipay' || item.payment === 'otc.payment.wxpay'">
          <div class="paysList-message-type b-1-cl">{{ item.name }}</div>
          <!-- 姓名 账号 -->
          <div>
            <span class="paysList-message-text">{{item.userName}} {{item.account}}</span>
            <span class="paysList-message-ewm a-2-bg" v-if="commonData.side==='BUY'">
              <svg class="icon icon-18" aria-hidden="true">
                <use xlink:href="#icon-b_18"></use>
              </svg>
              <div class="paysList-message-ewm-mark h-2-bg">
                <img :src="item.qrcodeImg"/>
              </div>
            </span>
          </div>
        </div>
        <!-- 信息 银行卡 -->
        <div class="paysList-message clearfix"
          v-else-if="item.payment === 'otc.payment.domestic.bank.transfer'">
          <div class="paysList-message-type b-1-cl">{{ item.name }}</div>
          <!-- 姓名 卡号 银行 支行 -->
          <div class="paysList-message-bank">
            {{item.userName}} {{item.account}} {{item.bankName}} {{item.bankOfDeposit}}
          </div>
        </div>
        <!-- 其他 -->
        <div class="paysList-message clearfix"
          v-else>
          <div class="paysList-message-type b-1-cl">{{ item.name }}</div>
          <!-- 姓名 账号 -->
          <div>
            <span class="paysList-message-text">{{item.userName}} {{item.account}}</span>
          </div>
        </div>
      </li>
    </ul>
    <div class="b-1-cl text" v-if="showText.length">{{ showText }}</div>
  </div>
</section>
</template>
<script>
import mixin from '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/otcDetailOrder/pays/pays';
import '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/otcDetailOrder/pays/pays.styl';

export default {
  mixins: [mixin],
};
</script>
