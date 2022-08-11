<template>
  <div class="user-management-change-phone a-5-bg">
    <p class="user-management-child-header b-2-cl a-3-bd a-5-bg">
      {{$t('personal.changePhone.title')}}</p>
    <div class="user-management-center a-5-bg">
      <p class="center-title b-7-cl">
        <svg class="icon icon-16" aria-hidden="true">
          <use xlink:href="#icon-c_2"></use>
        </svg>{{$t('personal.prompt.warningChangePhone')}}</p>
      <div class="center-input">
        <c-inputLine
          name="oldPhone"
          inputType="text"
          :promptText="promptText1"
          :errorHave="true"
          :errorText="errorText1"
          :errorFlag="checkErrorFlag1"
          :disabled="true"
          marginTop="0px"
          :value="checkValue1"
          @onchanges="inputChanges"
        >
        </c-inputLine>
        <c-inputLine
          name="oldSmsCode"
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
            name="oldSmsCode"
            @click="getCodeClick"
            :autoStart="false"
            buttonName="loginGetcodeBtn"/>
        </c-inputLine>
        <!-- 选择国家 -->
        <c-select
          :value="country"
          :promptText="promptText"
          @onChanges='countryChange'
          :filterable="true"
          name="country"
          :errorHave="true"
          :errorFlag="countryErrorFlag"
          :errorText="errorText"
          :options="countryList"
        />
        <c-inputLine
          name="newPhone"
          maxLength="20"
          inputType="text"
          :promptText="promptText3"
          :errorHave="true"
          :errorText="errorText3"
          :errorFlag="checkErrorFlag3"
          marginTop="0px"
          :value="checkValue3"
          @onchanges="inputChanges"
        >
        </c-inputLine>
        <c-inputLine
          name="smsCode"
          maxLength="6"
          inputType="text"
          :promptText="promptText4"
          :errorHave="true"
          :errorText="errorText4"
          :errorFlag="checkErrorFlag4"
          marginTop="0px"
          :value="checkValue4"
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
          v-if="googleCode"
          name="googleCode"
          maxLength="6"
          inputType="text"
          :promptText="promptText5"
          :errorHave="true"
          :errorText="errorText5"
          :errorFlag="checkErrorFlag5"
          marginTop="0px"
          :value="checkValue5"
          @onchanges="inputChanges"
        >
        </c-inputLine>
        <c-button type="solid"
                :loading="loading"
                :big="true"
                className=""
                paddingW="0px"
                :disabled="disabled"
                marginTop="18px"
                height="40px"
                width="100%"
                @click="btnLink">{{$t('personal.tool.modify')}}</c-button>
      </div>
    </div>
  </div>
</template>

<script>
import mixin from '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/personal/ChangePhone/ChangePhone';
import '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/personal/ChangePhone/ChangePhone.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
