<template>
  <div class="user-management-close-google a-5-bg">
    <p class="user-management-child-header b-2-cl a-3-bd">{{$t('personal.closeGoogle.title')}}</p>
    <div class="user-management-center a-5-bg">
      <div class="management-center">
      <c-inputLine
        name="smsCode"
        maxLength="6"
        inputType="text"
        :promptText="promptText2"
        :errorHave="true"
        :errorText="errorText2"
        :errorFlag="checkErrorFlag2"
        marginTop="0px"
        :value="checkValue2"
        @onchanges="inputChanges"
      >
        <!-- 获取验证码 -->
        <c-getCode
          name="smsCode"
          @click="getCodeClick"
          :autoStart="false"
          buttonName="loginGetcodeBtn"/>
      </c-inputLine>
        <c-inputLine
          name="googleCode"
          maxLength="6"
          inputType="text"
          :promptText="promptText1"
          :errorHave="true"
          :errorText="errorText1"
          :errorFlag="checkErrorFlag1"
          marginTop="0px"
          :value="checkValue1"
          @onchanges="inputChanges"
        >
        </c-inputLine>
      <c-button type="solid"
              :big="true"
              :loading = "loading"
              className=""
              paddingW="0px"
              :disabled="disabled"
              marginTop="18px"
              height="40px"
              width="100%"
              @click="btnLink">{{$t('personal.tool.submit')}}</c-button>
      </div>
    </div>
  </div>
</template>

<script>
import mixin from '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/personal/CloseGoogle/CloseGoogle';
import '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/personal/CloseGoogle/CloseGoogle.styl';

export default {
  mixins: [mixin],
};
</script>
