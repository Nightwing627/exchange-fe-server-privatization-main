<!-- // Created by 任泽阳 on 18/12/06.
// 登录页面 -->
<template>
  <section class="page-login" >
    <div class="go-home-btn a-3-bd" @click="goUrl('/')" >
      <svg class="icon icon-18" aria-hidden="true">
          <use xlink:href="#icon-e_11"></use>
        </svg>
      {{ $t('pageTitle.home') }}
    </div>
    <!-- 引导 -->
    <c-intoGuide :imgMap="imgMap" >
      <div class="guide-center">
        <!-- 欢迎登录 -->
        <p :class="isInternationTem?'b-1-cl':'b-8-cl'">
          {{loginPageTitle}}
        </p>
        <div class="guide-text b-2-cl">
          <span class="guide-ht">{{ $t('login.NotRegisteredUsersYet') }}</span>
          <!-- 立即注册 -->
          <c-button type="text"
            className="goRegister logBtn"
            @click="goUrl('/register')">
            {{$t('login.goRegister')}}
          </c-button>
        </div>
      </div>
    </c-intoGuide>
    <!-- 主体 -->
    <div class="page-login-content">
      <div class="content-center">
        <!-- 手机/邮箱 -->
        <c-inputLine
          maxLength="100"
          name="userValue"
          :promptText="userInputPrompt"
          :errorHave="true"
          :errorText="$t('login.formatIncorrect')"
          :errorFlag="userErrorFlag"
          :value="userValue"
          @onchanges="inputChanges">
        </c-inputLine>
        <!-- 密码 -->
        <c-inputLine
          maxLength="20"
          name="passValue"
          :promptText="$t('login.password')"
          :errorHave="true"
          :errorText="$t('login.passwordError')"
          :errorFlag="passErrorFlag"
          marginTop="0px"
          :value="passValue"
          inputType="password"
          @onchanges="inputChanges"
          :isLogin="true"
        />
        <!-- 选择验证方式 -->
        <c-select
          v-if="openLoginVerificationMode"
          :value="selectValue"
          :promptText="$t('login.VerificationMode')"
          name="loginType"
          :errorHave="true"
          :errorFlag='false'
          :errorText="$t('login.AuthenticationMethod')"
          :options="selectOptions"
          @onChanges="selectChange"
        />
        <!-- 极验 -->
        <!-- marginTop 70-40-24=4 -->
        <c-verify
          marginTop="6px"
          :errorHave="true"
          :colorMap="colorMap"
          @callback='verifyCallBack'/>
        <c-button type="text" className="logBtn"
          @click="goUrl('/resetPass')">
          {{$t('login.ForgetPassword')}}
        </c-button>
        <c-button type="solid"
          :disabled="submitDisabled"
          :loading="submitLoading"
          marginTop="20px"
          height="40px"
          width="380px"
          paddingW="0px"
          @click="submit">{{loginButtonText}}
        </c-button>
        <div class="thirdBox" v-if="thirdList && !singPassCode && !singpassState">
          <!-- 其他登录方式 -->
          <div class="thirdBoxTitle b-2-cl">
            {{$t('singPassLogin.mainText1')}}
          </div>
          <div class="thirdInfor a-2-bd"
            @click="goThirdUrl(thirdList[0])"
            @mouseover.stop="addHover('0')"
            @mouseout.stop="removeHover()"
            :class="{ 'a-4-bg':  '0' === addHoverclass, 'notborder': thirdList.length < 2}">
            <img :src="thirdList[0].img" >
            <div class="thirdName">{{thirdList[0].value}}</div>
            <i v-if="thirdList.length > 1" class="dowm-icon"></i>
          </div>
          <div v-if="thirdList.length > 1" class="third-list a-5-bg b-1-cl">
            <template v-for = "(item, index) in thirdList">
              <div class="third-item"
                :key="index"
                v-if="index > 0"
                :class="{ 'a-4-bg':  index === addHoverclass }"
                @click="goThirdUrl(item)"
                @mouseover="addHover(index)"
                @mouseout="removeHover()">
                  <img :src="item.img" >
                  <div class="third-val">{{item.value}}</div>
              </div>
            </template>
            </div>
        </div>
        <!-- 底部区域 -->
        <div class="copy z-2-cl"
            style="border-color: #293448 !important;">
          Copyright © 2019 {{companyName}}. All rights reserve
        </div>
      </div>
    </div>
    <!-- 对话框  38-24=14 -->
    <c-dialog :showFlag="dialogFlag"
      paddingBottom="14px"
      :confirmLoading="dialogConfirmLoading"
      :confirmDisabled="dialogConfirmDisabled"
      @close="dialogClose"
      @confirm="dialogConfirm"
      :titleText="$t('login.SecurityVerification')">
      <!-- 验证框 -->
      <c-inputLine
        maxLength="6"
        name="checkValue"
        :promptText="checkOptions.text"
        :errorHave="true"
        :errorText="checkText"
        :errorFlag="checkErrorFlag"
        marginTop="0px"
        :value="checkValue"
        @onchanges="inputChanges"
      >
        <!-- 获取验证码 -->
        <c-getCode v-if="checkOptions.haveCode"
          name="loginGetcode"
          @click="getCodeClick"
          buttonName="loginGetcodeBtn"/>
      </c-inputLine>
    </c-dialog>
    <div class="spcpqr-a5c3" style="dispaly: none;"></div>
    <singPassLogin :isShow="singPassDialogFlag" />
  </section>
</template>
<script>
import mixin from '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/login/login';
import '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/login/login.styl';
import singPassLogin from './singPassLogin.vue';

export default {
  mixins: [mixin],
  components: {
    singPassLogin,
  },
  mounted() {
    this.init();
  },
};
</script>
