<template>
  <div class="user-management-bind-google a-5-bg">
    <p class="user-management-child-header b-1-cl a-3-bd">
      {{$t('personal.bindGoogle.title')}}</p>
    <div class="user-management-center a-5-bg">
      <div class="center-one a-3-bd">
        <p class="center-one-title b-1-cl"><span class="b-4-cl a-4-bg clearfix">1</span>
          {{$t('personal.bindGoogle.downloadGoogle')[0]}}</p>
        <p class="center-text b-2-cl">{{$t('personal.bindGoogle.downloadGoogle')[1]}}</p>
        <div>
          <c-button type="solid"
                  :big="true"
                  className="center-one-button"
                  paddingW="0px"
                  :disabled="false"
                  marginTop="0px"
                  height="40px"
                  width="180px"
                  @click="btnLink('appstore')">
            <svg class="icon icon-18" aria-hidden="true">
              <use xlink:href="#icon-b_13"></use>
            </svg>
            {{$t('personal.bindGoogle.appStore')}}</c-button>
          <c-button type="solid"
                  :big="true"
                  className="center-one-button"
                  paddingW="0px"
                  :disabled="false"
                  marginTop="0px"
                  height="40px"
                  width="180px"
                  @click="btnLink('googleplay')">
            <svg class="icon icon-18" aria-hidden="true">
              <use xlink:href="#icon-b_15"></use>
            </svg>
            {{$t('personal.bindGoogle.googlePlay')}}</c-button>
          <c-button type="solid"
                  :big="true"
                  className=""
                  paddingW="0px"
                  :disabled="false"
                  marginTop="14px"
                  height="40px"
                  width="180px"
                  @click="btnLink('android')">
            <svg class="icon icon-18" aria-hidden="true">
              <use xlink:href="#icon-b_14"></use>
            </svg>
            {{$t('personal.bindGoogle.android')}}</c-button>
        </div>
      </div>
      <div class="center-two a-3-bd">
        <p class="center-two-title b-1-cl"><span class="b-4-cl a-4-bg clearfix">2</span>
          {{$t('personal.bindGoogle.useGoogle')[0]}}</p>
        <p class="center-text b-2-cl">{{$t('personal.bindGoogle.useGoogle')[1]}}</p>
          <c-button
            type="text"
            @click="reload"
            class="reload-btn"
          >
            {{$t('common.reload')}}
          </c-button>
        <div class="center-two-ewm">
            <img :src="googleImg"/>
          <p class="a-4-bg b-1-cl clearfix">{{googleKey}}
            <span @click="copyClick"
                  @mouseenter="handMouseenter"
                  @mouseleave="handMouseleave">
              <span v-if="svgShow">
                <svg class="icon icon-14"
                     aria-hidden="true">
                  <use xlink:href="#icon-a_9"></use>
                </svg>
              </span>
              <span v-else>
                <svg class="icon icon-14"
                     aria-hidden="true">
                  <use xlink:href="#icon-a_9_1"></use>
                </svg>
              </span>
            </span>
          </p>
        </div>
      </div>
      <div class="center-three a-3-bd">
        <p class="center-three-title b-1-cl"><span class="b-4-cl a-4-bg clearfix">3</span>
          {{$t('personal.bindGoogle.bindGoogle')[0]}}</p>
        <p class="center-three-y-title b-7-cl">
          <svg class="icon icon-16" aria-hidden="true">
            <use xlink:href="#icon-c_2"></use>
          </svg>
          <span>{{$t('personal.bindGoogle.bindGoogle')[1]}}</span></p>
        <div class="center-three-form">
          <c-inputLine
            name="password"
            maxLength="20"
            inputType="password"
            :promptText="promptText4"
            :errorHave="true"
            :errorText="errorText4"
            :errorFlag="checkErrorFlag4"
            marginTop="0px"
            :value="checkValue4"
            @onchanges="inputChanges"
          >
          </c-inputLine>
          <c-inputLine
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
                  :big="true"
                  className=""
                  paddingW="0px"
                  :loading = "loading"
                  :disabled="disabled"
                  marginTop="18px"
                  height="40px"
                  width="100%"
                  @click="btnLink">{{$t('personal.tool.bind')}}</c-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mixin from '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/personal/BindGoogle/BindGoogle';
import '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/personal/BindGoogle/BindGoogle.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
