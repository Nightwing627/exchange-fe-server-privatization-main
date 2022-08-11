<template>
  <section class="page-withdraw">
     <div class="withdraw-details clearfix a-7-bd">
      <div class="clearfix">
      <div class="details-left">
        <div class="symbol b-1-cl">{{showSymbol}}</div>
        <div class="numberList clearfix">
          <ul class="numberList-key">
            <!-- 总额 -->
            <li>{{ $t('assets.withdraw.lumpSum') }}</li>
            <!-- 可用 -->
            <li>{{ $t('assets.withdraw.Available') }}</li>
            <!-- 冻结 -->
            <li>{{ $t('assets.withdraw.freeze') }}</li>
          </ul>
          <ul class="numberList-value b-1-cl">
            <li v-for="(item, index) in detailsList" :key="index">
              {{ item.value }}
            </li>
          </ul>
        </div>
        <div class="details-warking b-7-cl">
          <svg class="icon icon-16" aria-hidden="true" style="marginRight: 10px">
            <use xlink:href="#icon-c_2"></use>
          </svg>
          <!-- 最小提币限额 -->
          <template v-if="idAuth === 1">
          {{ $t('assets.withdraw.MinimumCoinLimit') }} {{withdrawMin}}，
          </template>
          <!-- 最大提币限额 -->
          {{ $t('assets.withdraw.MaximumCoinLimit') }} {{withdrawMax}}
          <br/>
          <div class="dayMax" v-if="switchadd === 1">
            <!-- 今日提现剩余 -->
             {{ $t('assets.withdraw.dayMaximumCoinLimit') }} {{daywithdrawMax}}
          </div>
          <!-- <span></span>小时限额 0.0000 BTC -->
        </div>
      </div>
      <div class="details-right">
        <!-- <div class="details-branch" v-if="haveBranch">
          <mainChain
            :branchTip="branchTip"
            :branchArr="branchArr"
            :activeBranch="activeBranch"
            @setActiveBranch="setActiveBranch"/>
        </div> -->
        <!-- 提币地址 -->
        <!-- <c-select :promptText="$t('assets.withdraw.CoinAddress')"
          :value="addressValue"
          :options="addressList"
          :errorHave="true"
          type="double"
          @onChanges="addressChange"/> -->
          <c-inputLine name="accountValue"
          :errorHave="true"
          :promptText="$t('assets.withdraw.account')"
          @onchanges="inputChange"
          :value="accountValue"
          max-length="30"
          :errorFlag="accountFlag"
          errorText="">
        </c-inputLine>
        <!-- 标签 -->
        <!-- <c-inputLine v-if="isHavePage"
          :errorHave="true"
          :promptText="$t('assets.withdraw.label')"
          :disabled="true"
          :value="pagesValue">
          <div class="addressBox-page-icon">
            <svg class="icon icon-14" aria-hidden="true">
              <use xlink:href="#icon-a_15"></use>
            </svg>
            <div class="addressBox-page-market a-4-bg">
              {{ $t('assets.withdraw.pageText') }}
            </div>
          </div>
        </c-inputLine> -->
        <!-- 提币数量 -->
        <c-inputLine name="numberValue"
          :errorHave="true"
          :promptText="$t('assets.withdraw.NumberOfCoins')"
          @onchanges="inputChange"
          :value="numberValue"
          :errorFlag="numberOptions.error"
          :errorText="numberOptions.text">
          <!-- 全部提现 -->
          <c-button type="text" height="30px" @click="allWithDraw">
            {{ $t('assets.withdraw.allWithdraw') }}
          </c-button>
        </c-inputLine>
        <!-- 矿工手续费 -->
        <c-inputLine name="proceduresValue"
          :errorHave="true"
          :promptText="$t('assets.withdraw.fee')"
          @onchanges="inputChange"
          :value="proceduresValue"
          :disabled="true"
          :errorText="$t('assets.withdraw.feeError')">
          <!-- 范围 -->
          <div class="ServiceSpk">
            <!-- ({{ $t('assets.withdraw.range') }}{{feeMin}}-{{feeMax}}) -->
            {{showSymbol}}
          </div>
        </c-inputLine>
        <!-- 提现按钮 -->
        <c-button width="120px"
          marginTop="32px"
          height="40px"
          @click="withdrawClick"
          :disabled="btnDisabled">{{ $t('assets.withdraw.transfer') }}</c-button>
        <!-- 添加提币地址 -->
        <!-- <span class="goAddress b-4-cl" @click="goAddress">
          {{ $t('assets.withdraw.addAddrss') }}
        </span> -->
      </div>
      </div>
      <div v-if="symbol_withdraw_msg" class="withdrawMsg b-2-cl">
        <p>{{$t('application.applyRegion.focus')}}</p>
        <p>{{symbol_withdraw_msg}}</p>
      </div>
    </div>
    <c-verifyCationc-alert
      :showFlag="alertFlag"
      :imgMap="imgMap"
      :titleText="$t('assets.withdraw.safetyWarning')"
      :detaText="authTitleText"
      :dataList="alertData"
      :buttonText="$t('assets.withdraw.GotoOpen')"
      @close="alertClone"
      @confirm="alertGo"/>
    <!-- 对话框  38-24=14 -->
    <c-dialog :showFlag="dialogFlag"
      paddingBottom="14px"
      :confirmLoading="dialogConfirmLoading"
      :confirmDisabled="dialogConfirmDisabled"
      @close="dialogClose"
      @confirm="dialogConfirm"
      :titleText="$t('assets.withdraw.safetyVerification')">
      <!-- 手机号验证框 -->
      <c-inputLine
        v-if="OpenMobile"
        maxLength="6"
        name="phoneValue"
        :value="phoneValue"
        :promptText="$t('assets.withdraw.phoneCode')"
        :errorHave="true"
        :errorFlag="phoneError"
        :errorText="$t('assets.withdraw.phoneCodeError')"
        @onchanges="inputChange"
      >
        <!-- 获取验证码 -->
        <c-getCode
          name="withdrawGetcode"
          @click="getCodeClick"/>
      </c-inputLine>
      <!-- 谷歌验证码 -->
      <c-inputLine
        v-if="OpenGoogle"
        maxLength="6"
        name="googleValue"
        :value="googleValue"
        :promptText="$t('assets.withdraw.googleCode')"
        :errorHave="true"
        :errorFlag="googleError"
        :errorText="$t('assets.withdraw.googleCodeError')"
        @onchanges="inputChange"
      />
    </c-dialog>
    <!-- 提示框 -->
    <c-alert :showFlag="notIdShowDialog"
        :buttonText="$t('otcRelease.DeCertification')"
        :imgMap="imgMap"
        @close="alertClone"
        @confirm="gotoAuth">
      <div class="ts-content-text">
        {{$t('personal.exccAuthForm.text19')}}
      </div>
    </c-alert>
  </section>
</template>
<script>
import mixin from '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/assets/innerTransfer/innerTransfer';
import '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/assets/innerTransfer/innerTransfer.styl';
import {
  fixD,
} from '@knoxexchange/blockchain-ui-privatization/utils';

export default {
  mixins: [mixin],
  components: {},
  mounted() {
    this.init();
    if (this.market) { this.innerInit(); }
  },
  methods: {
    // 上半部分 左侧数据
    initDetails() {
      const obj = this.exchangeData.allCoinMap[this.symbol];
      const normalBalance = Number(obj.normal_balance) || Number(obj.overcharge_balance);
      this.detailsList = [
        { key: 'sum', value: fixD(obj.total_balance, this.showPrecision) }, // 总额
        { key: 'normal', value: fixD(normalBalance, this.showPrecision) }, // 可用
        { key: 'lock', value: fixD(obj.lock_balance, this.showPrecision) }, // 冻结
      ];
      this.symbol_withdraw_msg = obj.symbol_withdraw_msg || null; // 注意事项
      this.withdrawMin = fixD(obj.withdraw_min, this.showPrecision); // 最小提币额
      this.withdrawMax = fixD(obj.withdraw_max, this.showPrecision);// 最大提币额
      this.daywithdrawMax = fixD(obj.withdraw_max_day, this.showPrecision);// 单日最大提币额
      this.defaultFee = `${obj.innerTransferFee}`;
      this.proceduresValue = `${obj.innerTransferFee}`; // 默认手续费
    },
    // getBranchAddress() {
    //   this.axios({
    //     url: 'cost/Getcost',
    //     params: {
    //       symbol: this.activeBranch,
    //     },
    //   }).then((data) => {
    //     if (data.code.toString() === '0') {
    //       const list = [];
    //       const detailsList = {};
    //       const { userWithdrawAddrList } = data.data;
    //       userWithdrawAddrList.forEach((item) => {
    //         let value = item.address;
    //         if (this.isHavePage) {
    //           [value] = item.address.split('_');
    //         }
    //         list.push({ code: `${item.id}`, value, label: item.label });
    //         detailsList[item.id] = item;
    //       });
    //       this.feeMin = fixD(data.data.feeMin, this.branchShowPrecision);// 最大手续费
    //       this.feeMax = fixD(data.data.feeMax, this.branchShowPrecision);// 最大手续费
    //       if (this.defaultFeeFlag) {
    //         this.defaultFeeFlag = false;
    //         this.defaultFee = `${data.data.defaultFee}`;
    //         this.proceduresValue = `${data.data.defaultFee}`; // 默认手续费
    //       }
    //       this.branchTip = data.data.mainChainNameTip;
    //       this.tabelLoading = false;
    //       this.addressList = list;
    //       this.detailsAddressList = detailsList;
    //     }
    //   });
    // },
  },
};

</script>
