// Created by 任泽阳 on 18/12/06.
// 注册页面
<template>
  <div class="page-register">
    <div class="go-home-btn a-3-bd" @click="goUrl('/')">
      <svg class="icon icon-18" aria-hidden="true">
          <use xlink:href="#icon-e_11"></use>
        </svg>
      {{ $t('pageTitle.home') }}
    </div>
    <!-- 引导 -->
    <c-intoGuide :imgMap="imgMap">
      <div class="guide-center">
        <!-- 欢迎注册 -->
        <p :class="isInternationTem?'b-1-cl':'b-8-cl'">
          <!-- {{ $t('register.WelcomeToRegister') }} -->
          {{registerPageTitle}}
        </p>
        <div class="guide-text b-2-cl">
          <!-- 已经是注册用户 -->
          <span class="guide-ht">{{ $t('register.AlreadyAregisteredUser') }} </span>
          <!-- 立即登录 -->
          <!-- <router-link to="/login" class="b-4-cl">
            {{ $t('register.logInImmediately') }}
          </router-link> -->
          <!-- 立即注册 -->
          <c-button type="text"
            className="goLogin logBtn"
            @click="goUrl('/login')">
            {{$t('register.logInImmediately')}}
          </c-button>
        </div>
      </div>
    </c-intoGuide>
    <div class="page-register-content">
      <div class="content-center">
        <c-intoTab
          v-if="tabFlag"
          :list="tabList"
          :nowKey="nowType"
          :disabled="submitLoading"
          className="registerTab"
          @onchenges="setNowType"/>
        <!-- 选择国家 -->
        <c-select
          v-if="nowType === 'phone'"
          :value="country"
          :filterable="true"
          :promptText="$t('register.location')"
          @onChanges='countryChange'
          @opent-chang="countryFocus"
          name="country"
          :errorHave="true"
          :errorFlag="countryErrorFlag"
          :errorText="$t('register.PleaseSelectAcountry')"
          :options="countryList"
        />
        <!-- 手机号/邮箱 -->
        <c-inputLine
          :maxLength="maxLength"
          :key="domKeys.userKey"
          name="userValue"
          :value="userValue"
          :promptText="domTexts.userText"
          :errorHave="true"
          :errorText="domTexts.userError"
          :errorFlag="userErrorFlag"
          @focus="userFocus"
          @onchanges="inputChanges">
        </c-inputLine>
        <!-- 密码 -->
        <c-inputLine
          maxLength="20"
          :key="domKeys.passKey"
          inputType="password"
          name="passValue"
          :value="passValue"
          :promptText="$t('register.password')"
          :errorHave="true"
          :errorText="$t('register.passwordError')"
          :errorFlag="passErrorFlag"
          @onchanges="inputChanges">
        </c-inputLine>
        <!-- 确认密码 -->
        <c-inputLine
          maxLength="20"
          :key="domKeys.comfirmKey"
          inputType="password"
          name="comfirmValue"
          :value="comfirmValue"
          :promptText="$t('register.confirmPassword')"
          :errorHave="true"
          :errorText="$t('register.confirmPasswordError')"
          :errorFlag="comfirmErrorFlag"
          @onchanges="inputChanges">
        </c-inputLine>
        <!-- 邀请码 -->
        <c-inputLine
          v-if="templateType!=='3' || !urlHasinvitedCode"
          :key="domKeys.invitedKey"
          name="invitedValue"
          :value="invitedValue"
          :promptText="invitedText"
          :errorHave="true"
          :errorText="$t('register.InvitationCodeError')"
          :errorFlag="invitedErrorFlag"
          @onchanges="inputChanges">
        </c-inputLine>
        <div class="resgister-opions" v-if="coinsKrwOpen !== '1'">
          <c-checkBox :value="textFlag" @click="checkoutClick"/>
          <span class="text" @click="checkoutClick(!textFlag)">
            <!-- 我已阅读并同意 -->
            {{$t('register.IHaveReadAndAgreed')}}
            {{serverName}}
          </span>
          <!-- <a>服务条款</a> <a>隐私保护</a> -->
          <!-- 用户协议 -->
          <!-- <router-link to="cms/agreement"
            target="_blank"
            class="b-4-cl">{{ $t('register.UserAgreement') }}</router-link> -->
          <c-button type="text"
            className="goLogin"
            @click="goUrl('cms/agreement')">
            {{$t('register.UserAgreement')}}
          </c-button>
        </div>
        <div v-else>
          <div class="resgister-opions">
          <c-checkBox :value="textFlag" @click="checkoutClick"/>
            <span class="text" @click="checkoutClick(!textFlag)">
              <!-- 我已阅读并同意 -->
              {{$t('krwAdd.regstmust')}}
              {{$t('register.IHaveReadAndAgreed')}}
              {{serverName}}
            </span>
            <!-- <a>服务条款</a> <a>隐私保护</a> -->
            <!-- 用户协议 -->
            <!-- <router-link to="cms/agreement"
              target="_blank"
              class="b-4-cl">{{ $t('register.UserAgreement') }}</router-link> -->
            <c-button type="text"
              className="goLogin"
              @click="goUrl('cms/ystk1')">
              <!-- 隐私条款 -->
              {{$t('krwAdd.regst1')}}
            </c-button>
          </div>
          <div class="resgister-opions">
            <c-checkBox :value="textFlag2" @click="checkoutClick2"/>
            <span class="text" @click="checkoutClick2(!textFlag2)">
              <!-- 我已阅读并同意 -->
              {{$t('krwAdd.regstmust')}}
              {{$t('register.IHaveReadAndAgreed')}}
              {{serverName}}
            </span>
            <!-- <a>服务条款</a> <a>隐私保护</a> -->
            <!-- 用户协议 -->
            <!-- <router-link to="cms/agreement"
              target="_blank"
              class="b-4-cl">{{ $t('register.UserAgreement') }}</router-link> -->
            <c-button type="text"
              className="goLogin"
              @click="goUrl('cms/agreement1')">
              <!-- 用户协议 -->
              {{$t('krwAdd.regst2')}}
            </c-button>
          </div>
          <div class="resgister-opions">
            <c-checkBox :value="textFlag3" @click="checkoutClick3"/>
            <span class="text" @click="checkoutClick3(!textFlag3)">
              <!-- 我已阅读并同意 -->
              {{$t('krwAdd.regstother')}}
              {{$t('register.IHaveReadAndAgreed')}}
              {{serverName}}
            </span>
            <!-- <a>服务条款</a> <a>隐私保护</a> -->
            <!-- 用户协议 -->
            <!-- <router-link to="cms/agreement"
              target="_blank"
              class="b-4-cl">{{ $t('register.UserAgreement') }}</router-link> -->
            <c-button type="text"
              className="goLogin"
              @click="goUrl('cms/yxgg')">
              <!-- 营销广告使用同意书 -->
              {{$t('krwAdd.regst3')}}
            </c-button>
          </div>
        </div>

        <!-- 注册 -->
        <c-button
          marginTop="20px"
          height="40px"
          width="380px"
          :disabled="submitDisabled"
          :loading="submitLoading"
          @click="buttonClick"
          paddingW="0px">{{ submitButtonText }}</c-button>
        <!-- 底部区域 -->
        <div class="copy z-2-cl"
            style="border-color: #293448 !important;">
          Copyright © 2019 {{companyName}}. All rights reserve
        </div>
      </div>
    </div>
    <c-dialog :showFlag="dialogFlag"
      :titleText="$t('login.SecurityVerification')"
      :haveOption="haveOption"
      :confirmLoading="dialogConfirmLoading"
      :confirmDisabled="dialogConfirmDisabled"
      @close="dialogClose"
      @confirm="dialogConfirm">
      <c-verify
        :key="domKeys.verifyKey"
        :colorMap="colorMap"
        marginTop="6px"
        :errorHave="true"
        v-if="!haveOption"
        geetestBg="a-5-bg"
        @callback='verifyCallBack'/>
       <c-inputLine
          v-else
          maxLength="6"
          :key="domKeys.checkKey"
          name="checkValue"
          :value="checkValue"
          :promptText="domTexts.codeText"
          :errorHave="true"
          :errorText="domTexts.codeError"
          :errorFlag="checkErrorFlag"
          @onchanges="inputChanges">
          <!-- 获取验证码 -->
          <c-getCode
            name="registerGetcode"
            @click="getCodeClick"
            @clear="getCodeClear"
            :autoStart="false"
            buttonName="registerGetcodeBtn"/>
        </c-inputLine>
    </c-dialog>
  </div>
</template>

<script>
import mixin from '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/register/register';
import '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/register/register.styl';
// 滑动验证
export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
