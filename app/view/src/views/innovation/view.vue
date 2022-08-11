<template>
  <div class="innovation">
    <c-pageBanner
      :title="bannerTitle"
      :backgroungImgUrl="bannerImg"
      :imgMap="imgMap"
    />
    <div class="innovation-content">
      <div class="main-content c-4-bg">
        <div class="content-top c-5-bd">
          <div class="img">
            <img :src="pageData.logo" alt />
          </div>
          <div class="info">
            <h2 class="tit f-1-cl">{{ pageData.name }}</h2>
            <div class="share"></div>
            <div class="info-text">
              <!-- {{pageData.projectIntro}} -->
            </div>
          </div>
        </div>
        <div class="main-text" v-html="pageData.details"></div>
      </div>
      <div class="base-info c-4-bg">
        <h3 class="title f-1-cl">
          <!-- 基本信息 -->
          {{ $t("innov.info") }}
        </h3>
        <div class="bf">
          <p>
            <span>
              <!-- 进度 -->
              {{ $t("innov.progress") }}
            </span>
            <span class="f-r">
              <!-- 融资总额 -->
              {{ $t("innov.rz_total") }}
            </span>
          </p>
          <div class="jdt c-5-bg">
            <div
              class="jdt-bar c-8-bg"
              :style="{ width: countScale(pageData.speed, 100) + '%' }"
            ></div>
          </div>
          <p class="f-1-cl">
            <span>{{ countScale(pageData.speed, 100) }}%</span>
            <span class="f-r">
              {{ fixDFun(pageData.money, pageData.coinSymbol) }}
              {{ pageData.coinSymbol | getCoinShowName(coinList) }}
            </span>
          </p>
        </div>
        <div class="infor-list">
          <p class="key">
            <!-- 状态 -->
            {{ $t("innov.state") }}
          </p>
          <p class="val f-1-cl">
            <!-- 募集成功 -->
            {{ setStatusText(pageData) }}
          </p>
          <p class="key">
            <!-- 接受币种 -->
            {{ $t("innov.accepted_currencies") }}
          </p>
          <p class="val f-1-cl">
            {{ pageData.coinSymbol | getCoinShowName(coinList) }}
          </p>
          <p class="key">
            <!-- 货币符号 -->
            {{ $t("innov.Currency_symbol") }}
          </p>
          <p class="val f-1-cl">
            {{ pageData.grantSymbol | getCoinShowName(coinList) }}
          </p>
          <p class="key">
            <!-- 募集金额 -->
            {{ $t("innov.Amount_raised") }}
          </p>
          <p class="val f-1-cl">
            {{ fixDFun(pageData.money, pageData.grantSymbol) }}
          </p>
          <p class="key">
            <!-- 初始价格 -->
            {{ $t("innov.initial_price") }}
          </p>
          <p class="val f-1-cl">
            1 {{ pageData.coinSymbol | getCoinShowName(coinList) }}
            =
            {{ fixDFun(pageData.initPrice, pageData.grantSymbol) }}
            {{ pageData.grantSymbol | getCoinShowName(coinList) }}
          </p>
          <!-- 个人限购次数 -->
          <p class="key">
            <!-- 个人限购次数 -->
            {{ $t("innov.viewInfo2") }}
          </p>
          <p class="val f-1-cl">{{ pageData.singleMaxCount }}</p>
          <!-- 个人限购数量 -->
          <p class="key">
            <!-- 个人限购数量 -->
            {{ $t("innov.viewInfo1") }}
          </p>
          <p class="key" v-if='pageData.holdType === 1'>
              <!-- 持仓时间点 -->
              {{ formatTimeFn(pageData.stime) }}
              {{ $t("innov.timeHold") }}
              {{ pageData.holdCoin | getCoinShowName(coinList) }}
              {{
                pageData.otherType !== 0
                ? (pageData.otherType === 1 ? '、' : $t("innov.or"))
                : ''
              }}
              {{
                pageData.otherType !== 0
                ? pageData.holdCoinOther
                : ''
                | getCoinShowName(coinList)
              }}
              {{ $t("innov.canParticipateExchange") }}
            </p>
          <p class="val f-1-cl" v-if="!pageData.holdCoin || pageData.holdType === 3">
            {{ pageData.singleMinRaiseMoney }} -
            {{ pageData.singleMaxRaiseMoney }}
            {{ pageData.coinSymbol | getCoinShowName(coinList) }}
          </p>
          <template v-else-if="pageData.holdCoin && !pageData.otherType">
            <p class="val f-1-cl" v-for="(item, index) in pageData.holdLevelList" :key="index">
              {{ $t("innov.holdPositions") }}
              {{ pageData.holdCoin | getCoinShowName(coinList) }} ≥
              {{ thousandsComma(item.holdCoinAmount) }} :
              {{ $t("innov.purchaseLimitation") }}
              {{ thousandsComma(item.levelAmount) }}
              {{ pageData.coinSymbol | getCoinShowName(coinList) }}
            </p>
          </template>
          <template v-else>
            <p class="val f-1-cl" v-for="(item, index) in pageData.holdLevelList" :key="index">
              {{
                pageData.holdType === 2
                ? $t("innov.averageHoldPositions")
                : $t("innov.holdPositions")
              }}
              {{ pageData.holdCoin | getCoinShowName(coinList) }} ≥
              {{ thousandsComma(item.holdCoinAmount) }}
              {{ pageData.otherType === 1 ? $t("innov.and") : $t("innov.or") }}<br/>
              {{
                pageData.holdType === 2
                ? $t("innov.averageHoldPositions")
                : $t("innov.holdPositions")
              }}
              {{ pageData.holdCoinOther | getCoinShowName(coinList) }} ≥
              {{ thousandsComma(item.otherHoldCoinAmount) }} :
              {{ $t("innov.purchaseLimitation") }}
              {{ thousandsComma(item.levelAmount) }}
              {{ pageData.coinSymbol | getCoinShowName(coinList) }}
            </p>
          </template>
          <p class="key">
            <!-- 开始时间 -->
            {{ $t("innov.Start_time") }}
          </p>
          <p class="val f-1-cl">{{ formatTimeFn(pageData.startTime) }}</p>
          <p class="key">
            <!-- 结束时间 -->
            {{ $t("innov.End_time") }}
          </p>
          <p class="val f-1-cl">{{ formatTimeFn(pageData.endTime) }}</p>
          <div class="tsm c-3-bg">
            <p class="key">
              <!-- 已兑换金额 -->
              {{ $t("innov.Amount_already") }}
            </p>
            <p class="val f-1-cl">
              {{ fixDFun(pageData.raisedMoney, pageData.coinSymbol) }}
              {{ pageData.coinSymbol | getCoinShowName(coinList) }}
            </p>
          </div>
          <c-inputLine
            name="amount"
            :promptText="promptText"
            :errorHave="errorHave"
            errorText
            :errorFlag="errorFlag"
            marginTop="0px"
            :disabled="amountDisabled"
            :value="amount"
            @onchanges="inputChanges"
          >
            <span class="f-1-cl">{{
              pageData.coinSymbol | getCoinShowName(coinList)
            }}</span>
          </c-inputLine>
          <p class="vol">
            <!-- 剩余 -->
            {{ $t("innov.Surplus") }}
            {{ fixDFun(pageData.u_coinSymbol_amount, pageData.coinSymbol) }}
            {{ pageData.coinSymbol | getCoinShowName(coinList) }}
          </p>
          <c-verify
            v-if="verificationType === '2'"
            :colorMap="colorMap"
            marginTop="6px"
            :errorHave="true"
            product="bind"
            @getCaptchaObj="getCaptchaObj"
            @callback="verifyCallBack"
          />
          <c-button
            type="solid"
            :disabled="submitDisabled"
            height="40px"
            width="100%"
            paddingW="0px"
            @click="submit"
          >
            <!-- 立即申购 -->
            {{ $t("innov.immediate") }}
          </c-button>
          <p
            class="tt"

          >
            {{ $t("innov.Only") }} {{ pageData.holdAmount }}
            {{ pageData.holdSymbol | getCoinShowName(coinList) }}
            <a @click="goTrade()" href="javascript:;">{{ $t("innov.Hold") }}</a>
          </p>
          <p
            v-if="isLogin && userInfo.authLevel !== 1 && pageData.isAuthRealname"
            class="tt"
          >
            <!-- 该项目需实名认证方可申购 -->
            {{ $t("innov.requires") }}
            <router-link class="f-1-cl" to="/personal/userManagement">
              <!-- 立即认证 -->
              {{ $t("innov.Authenticate") }}
            </router-link>
          </p>
          <div
            class="spend-regon"
            :class="spendWarning ? 'f-7-cl' : ''"
            v-if="
              isLogin &&
              is_newcoin_project_entrance &&
                ((userInfo.authLevel === 1 && pageData.isAuthRealname) ||
                  !pageData.isAuthRealname) &&
                Number(pageData.entranceAmount) > 0
            "
          >
            <p>
              {{ $t("innov.spend") }}
              {{ fixFloat(pageData.entranceAmount, precision) }}
              {{ pageData.entranceSymbol | getCoinShowName(coinList) }}
            </p>
            <p>
              {{ $t("innov.currentBalance") }}
              {{ fixFloat(pageData.u_entranceSymbol_account, precision) }}
              {{ pageData.entranceSymbol | getCoinShowName(coinList) }}
              {{ spendWarning ? $t("innov.spendTip") : "" }}
            </p>
          </div>
        </div>
      </div>
      <p style="clear: both"></p>
    </div>
    <!-- 对话框  38-24=14 -->
    <c-dialog
      :showFlag="dialogFlag"
      paddingBottom="14px"
      :confirmLoading="dialogConfirmLoading"
      @close="dialogClose"
      @confirm="dialogConfirm"
      :confirmDisabled="confirmBtnFlag"
      :titleText="$t('login.SecurityVerification')"
    >
      <!-- 谷歌验证框 -->
      <c-inputLine
        v-if="userInfo && googleStatus === 1"
        maxlength="6"
        name="googleVlaue"
        :promptText="googleVlaueForm.text"
        :errorHave="true"
        :errorText="googleErrorText"
        :errorFlag="googleErrorFlag"
        marginTop="0px"
        :value="googleVlaue"
        @onchanges="inputChanges"
      />
      <!-- 短信验证框 -->
      <c-inputLine
        v-if="userInfo && isOpenMobileCheck === 1"
        maxlength="6"
        name="checkValue"
        :promptText="checkPhione.text"
        :errorHave="true"
        :errorText="checkErrorText"
        :errorFlag="checkErrorFlag"
        marginTop="0px"
        :value="checkValue"
        @onchanges="inputChanges"
      >
        <!-- 获取验证码 -->
        <c-getCode
          v-if="checkPhione.haveCode"
          name="loginGetcode"
          @click="getCodeClick"
          buttonName="loginGetcodeBtn"
        />
      </c-inputLine>
      <!-- 邮箱验证框 -->
      <c-inputLine
        v-if="
          userInfo &&
            emailAuthOpen &&
            isOpenMobileCheck !== 1
        "
        maxlength="6"
        name="emailCheckValue"
        :promptText="emailVlaueForm.text"
        :errorHave="true"
        :errorText="checkErrorText"
        :errorFlag="checkEmailErrorFlag"
        marginTop="0px"
        :value="emailCheckValue"
        @onchanges="inputChanges"
      >
        <!-- 获取验证码 -->
        <c-getCode
          v-if="emailVlaueForm.haveCode"
          name="EmailCode"
          @click="postEmailCode"
          buttonName="loginGetcodeBtn"
        />
      </c-inputLine>
    </c-dialog>
  </div>
</template>
<script>
import mixin from '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/innovation/view/view';
import '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/innovation/view/view.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
  computed: {
    submitDisabled() {
      if (
        this.pageData.status === 2 || this.pageData.status === 3
      ) {
        return false;
      }
      return true;
    },
    isLogin() {
      if (this.$store.state.baseData.isLogin) {
        return this.$store.state.baseData.isLogin;
      }
      return false;
    },
    // 二次确认按钮是否开启
    confirmBtnFlag() {
      if (this.googleStatus === 1) {
        if (this.googleErrorFlag || this.googleVlaue.length === 0) {
          return true;
        }
      }
      if (this.isOpenMobileCheck === 1) {
        if (this.checkValue.length === 0 || this.checkErrorFlag) {
          return true;
        }
      }
      if (this.isOpenMobileCheck !== 1 && this.emailAuthOpen) {
        if (this.emailCheckValue.length === 0 || this.checkEmailErrorFlag) {
          return true;
        }
      }
      return false;
    },
  },
  methods: {
    submit() {
      if (!this.isLogin) {
        this.$router.push('/login');
        return;
      }
      // 兑换金额不能小于单次购买最小额度
      if (this.amount < this.pageData.singleMinRaiseMoney) {
        this.$bus.$emit('tip', {
          text: `${this.$t('innov.lowerThanMinAmount')}${this.pageData.singleMinRaiseMoney}`,
          type: 'error',
        });

        return;
      }
      // 单笔兑换金额不能大于单次兑换最大额度
      if (this.amount > this.pageData.singleMaxRaiseMoney) {
        this.$bus.$emit('tip', {
          text: `${this.$t('innov.higherThanMaxAmount')}${this.pageData.singleMaxRaiseMoney}`,
          type: 'error',
        });

        return;
      }
      // 接受币种余额不足
      if (this.amount > this.pageData.u_coinSymbol_amount) {
        this.$bus.$emit('tip', {
          text: `${this.pageData.coinSymbol}${this.$t('innov.balanceNotEnough')}`,
          type: 'error',
        });

        return;
      }
      // 输入额度超出我的剩余可兑换额度
      if (this.pageData.level_amount !== null && this.amount > this.pageData.level_amount) {
        this.$bus.$emit('tip', {
          text: `${this.$t('innov.surplusExchangeAmount')}:${this.pageData.level_amount}`,
          type: 'error',
        });

        return;
      }
      // 手机和邮箱必须有一个开启
      if (
        this.isOpenMobileCheck !== 1 && !this.emailAuthOpen
      ) {
        this.$bus.$emit('tip', {
          text: `${this.$t('innov.bindAlter')}`,
          type: 'error',
        });

        return;
      }

      // 谷歌强制认证开启的时候 判断有没有谷歌没有的话 提示去绑定
      if (this.googleStatus !== 1 && this.enforceGoogleAuth) {
        this.$bus.$emit('tip', {
          text: this.$t('assets.withdraw.bindGoogle'),
          type: 'error',
        });

        return;
      }
      if (this.verificationType === '2') {
        this.captchaObj.verify();
      } else {
        this.dialogFlag = true;
      }
    },
    // 请求数据
    getData() {
      this.axios({
        url: this.$store.state.url.common.newcoin_project_detail,
        params: {
          projectId: Number(this.pageId),
        },
        method: 'post',
      }).then((data) => {
        if (data.code === '0') {
          const params = data.data;
          const { status, projectStatus } = params;
          if (status === 0 || status === 1 || status === 7) {
            this.$router.replace('/innovation');
          }
          if (!projectStatus) {
            params.status = 0;
          }
          // params.email_validate_open = 0;
          this.pageData = params;
          this.bannerImg = params.banner;
        }
      });
    },
  },
};
</script>
