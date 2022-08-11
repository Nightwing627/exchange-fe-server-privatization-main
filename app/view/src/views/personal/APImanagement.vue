<template>
  <div>
    <ModifyApi v-if="modifyApiShow" :getApiList="getApiList"></ModifyApi>
    <div class="api-management a-5-bg" v-if="!modifyApiShow">
      <div class="api-management-header a-3-bd clearfix">
        <c-navTab
          activeClassName="b-1-cl"
          activeColor="a-12-bg"
          className="b-2-cl"
          :currentTab="currentTab"
          :navTab="navTab"
          :lineHeight="lineHeight"
          :marginRight="marginRight"
          @currentType="currentType"
        />
      </div>
      <div class="api-management-center">
        <div class="center1 clearfix" v-show="currentTab === 1">
          <img class="center1-img" :src="api"/>
          <div class="center1-header">
            <p class="center1-title b-7-cl">
              <svg class="icon icon-16" aria-hidden="true">
                <use xlink:href="#icon-c_2"></use>
              </svg>
              <span class="clearfix">{{$t('personal.prompt.warningApi')}}</span>
            </p>
          </div>
          <div class="center1-inputs clearfix">
            <div  class="center1-input clearfix">
              <c-inputLine
                name="ip"
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
            </div>
            <div class="center1-input clearfix">
              <c-inputLine
                name="note"
                maxLength="25"
                inputType="text"
                :promptText="promptText2"
                :errorHave="true"
                :errorText="errorText2"
                :errorFlag="checkErrorFlag2"
                marginTop="0px"
                :value="checkValue2"
                @onchanges="inputChanges"
              >
              </c-inputLine>
            </div>
            <div class="center1-input clearfix" v-show="smsCode">
              <c-inputLine
                maxLength="6"
                name="phoneCode"
                inputType="text"
                :promptText="promptText3"
                :errorHave="true"
                :errorText="errorText3"
                :errorFlag="checkErrorFlag3"
                marginTop="0px"
                :value="checkValue3"
                @onchanges="inputChanges"
              >
                <!-- 获取验证码 -->
                <c-getCode
                  name="phone"
                  :autoStart="autoStart"
                  @click="getCodeClick"
                  buttonName="loginGetcodeBtn"/>
              </c-inputLine>
            </div>
            <div class="center1-input clearfix" v-show="googleCode">
              <c-inputLine
                name="googleCode"
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
              </c-inputLine>
            </div>
            <div class="center1-button clearfix">
              <c-button type="solid"
                      :big="true"
                      className=""
                      :loading="loading2"
                      paddingW="0px"
                      :disabled="disabled"
                      marginTop="18px"
                      height="40px"
                      width="25%"
                      @click="btnLink">{{$t('personal.tool.create')}}</c-button>
            </div>
          </div>
          <div class="center1-table clearfix a-7-bd">
            <p class="center1-title2 a-3-bd b-1-cl">{{$t('personal.APImanagement.recordTitle')}}</p>
            <c-table
              :imgMap="imgMap"
              :colorMap="colorMap"
              :loading = 'loading'
              :classes = 'classes'
              :headClasses = 'headClasses'
              :bodyClasses =  'bodyClasses'
              :lineClasses = 'lineClass'
              :columns = "columns"
              :dataList = "apiList"
              :lineNumber = 'lineNumber'
              :cellHeight = 'cellHeight'
              :headHeight = 'headHeight'
              @elementClick = 'deleteData'
            />
            <c-pagination v-show="count !== 0"
                        :total="count"
                        :current-page='page'
                        :display='pageSize'
                        @pagechange="pagechange">
            </c-pagination>
          </div>
        </div>
        <div class="center2 clearfix" v-show="currentTab === 2">
          <a href="https://github.com/exchange-doc/api/blob/master/api/zh_cn/api_doc_cn.md"
             @mouseenter="handMouseenter"
             @mouseleave="handMouseleave"
             target="_blank"
             class="api-down a-12-bd b-2-cl">{{$t('personal.APImanagement.downloadDocumen')}}</a>
          <c-table
            :imgMap="imgMap"
            :colorMap="colorMap"
            :classes = 'classes'
            :headClasses = 'headClasses'
            :bodyClasses =  'bodyClasses'
            :lineClasses = 'lineClass'
            :columns = "columns2"
            :dataList = "apiList2"
            :lineNumber = 'lineNumber'
            :cellHeight = 'cellHeight'
            :headHeight = 'headHeight'
            @elementClick = 'deleteData'
          />
        </div>
        <div class="center3 clearfix" v-show="currentTab === 3">
          <a href="https://github.com/exchange-doc/api/blob/master/api/zh_cn/api_doc_cn.md"
             target="_blank"
             @mouseenter="handMouseenter"
             @mouseleave="handMouseleave"
             class="api-down a-12-bd b-2-cl">{{$t('personal.APImanagement.downloadDocumen')}}</a>
          <c-table
            :imgMap="imgMap"
            :colorMap="colorMap"
            :classes = 'classes'
            :headClasses = 'headClasses'
            :bodyClasses =  'bodyClasses'
            :lineClasses = 'lineClass'
            :columns = "columns2"
            :dataList = "apiList3"
            :lineNumber = 'lineNumber'
            :cellHeight = 'cellHeight'
            :headHeight = 'headHeight'
            @elementClick = 'deleteData'
          />
        </div>
      </div>
      <c-dialog :showFlag="dialogFlag"
              paddingBottom="14px"
              :confirmLoading="dialogConfirmLoading"
              :confirmDisabled="dialogConfirmDisabled"
              @close="dialogClose"
              @confirm="dialogConfirm"
              :titleText="titleText">
        <div class="dialog-div a-4-bg">
          <ul>
            <li class="a-5-bd">
              <p class="b-2-cl">{{$t('personal.APImanagement.secretKey')}}</p>
              <p class="b-2-cl">{{secretKey}}
                <span @click="copyClick('secretKey')"
                      @mouseenter="handMouseenters('secretKey')"
                      @mouseleave="handMouseleaves('secretKey')">>
                <span v-if="secretKeyShow">
                  <svg class="icon icon-14" aria-hidden="true">
                    <use xlink:href="#icon-a_9"></use>
                  </svg>
                </span>
                <span v-else>
                  <svg class="icon icon-14" aria-hidden="true">
                    <use xlink:href="#icon-a_9_1"></use>
                  </svg>
                </span>
              </span>
              </p>
            </li>
            <li class="a-5-bd">
              <p class="b-2-cl">{{$t('personal.APImanagement.APIKye')}}</p>
              <p class="b-2-cl">{{apiKey}}
                <span @click="copyClick('apiKey')"
                      @mouseenter="handMouseenters('apiKey')"
                      @mouseleave="handMouseleaves('apiKey')">
                <span v-if="apiKeyShow">
                  <svg class="icon icon-14" aria-hidden="true">
                    <use xlink:href="#icon-a_9"></use>
                  </svg>
                </span>
                <span v-else>
                  <svg class="icon icon-14" aria-hidden="true">
                    <use xlink:href="#icon-a_9_1"></use>
                  </svg>
                </span>
              </span>
              </p>
            </li>
            <li class="b-4-bd">
              <p class="b-2-cl">{{$t('personal.APImanagement.ip')}}</p>
              <p class="b-2-cl">{{checkValue1}}</p>
            </li>
          </ul>
        </div>
      </c-dialog>
      <!-- 提示框 -->
      <c-alert :showFlag="alertFlag"
             :buttonText="$t('assets.addressMent.GotoOpen')"
             :imgMap="imgMap"
             @close="alertClose"
             @confirm="alertGo">
        <div class="alertTitle b-2-cl">{{$t('personal.alert.title')}}</div>
        <div class="alertText">{{$t('personal.alert.text')}}</div>
        <div class="alertError a-2-bd">
          <span class="alertError-text b-4-cl">{{$t('personal.alert.alertErrorTextGoogle')}}</span>
          <span class="alertError-icon">+</span>
        </div>
        <div class="alertError alertBot a-2-bd">
          <span class="alertError-text b-4-cl">{{$t('personal.alert.alertErrorTextPhone')}}</span>
          <span class="alertError-icon">+</span>
        </div>
      </c-alert>
    </div>
  </div>
</template>

<script>
import mixin from '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/personal/APImanagement/APImanagement';
import '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/personal/APImanagement/APImanagement.styl';
import ModifyApi from './modifyApi.vue';

export default {
  mixins: [mixin],
  components: {
    ModifyApi,
  },
  mounted() {
    this.init();
  },
};
</script>
