// Created by 任泽阳 on 18/12/24.
// 资产中心 币币账户页面
<template>
  <section class="page-exchangeAccount">
    <div class="exchangeAccount-header-bg">
      <div class="exchangeAccount-header" :style="exchangeHeader">
        <!-- canvas盒子 -->
        <div class="canvasBox">
          <canvas ref="canvas" width="100" height="100"></canvas>
        </div>
        <!-- 资产折合 -->
        <ul class="assetsSum f-8-cl">
          <!-- 总资产折合 -->
          <li class="text">{{ $t("assets.exchangeAccount.TotalAssets") }}</li>
          <li class="num">
            {{ totalBalance }}<span>{{ showTotalBalanceSymbol }}</span>
          </li>
          <li class="conversion">≈ {{ totalRate }}</li>
        </ul>
        <!-- 参考列表 -->
        <ul class="colorList f-8-cl">
          <li v-for="(item, index) in canvasPagesFilter" :key="index">
            <span :style="`background: ${item.color}`"></span>
            {{ item.symbol }}
          </li>
        </ul>
      </div>
    </div>
    <div class="exchangeAccount-body a-7-bd a-5-bg">
      <div class="exchangeAccount-title a-3-bd">
        <!-- 资金列表 -->
        <div class="text b-1-cl medium">
          {{ $t("assets.exchangeAccount.ListOfFunds") }}
        </div>
        <div class="hide">
          <!-- 隐藏零资产 -->
          <c-switch :value="switchFlag" @click="switchChange" />
          <span class="hodetext">{{ $t("assets.hideMinAssets") }}</span>
        </div>
        <div class="find">
          <!-- 搜索币种 -->
          <c-inputFind
            :promptText="$t('assets.exchangeAccount.SearchCurrency')"
            :value="findValue"
            @onchanges="findChanges"
            className="findClass"
          />
        </div>
      </div>
      <div class="exchangeAccount-center" :class="{'hide-smaill-account':switchFlag}">
        <c-table
          :loading="tabelLoading"
          :imgMap="imgMap"
          :colorMap="colorMap"
          :lineNumber="tabelLength"
          @elementClick="tableClick"
          :columns="columns"
          :dataList="search ? searchListResult : dataList"
        />
      </div>
    </div>
    <c-alert :showFlag="isShowDialog"
        :buttonText="$t('otcRelease.DeCertification')"
        :imgMap="imgMap"
        @close="dialogClose"
        @confirm="gotoAuth">
      <div class="ts-content-text">
        {{$t('personal.exccAuthForm.text19')}}
      </div>
    </c-alert>

  </section>
</template>

<script>
import mixin from '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/assets/exchangeAccount/exchangeAccount';
import '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/assets/exchangeAccount/exchangeAccount.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
