(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4fd18d99"],{"9ed8":function(e,t,s){},f8f7:function(e,t,s){"use strict";s.r(t);var r=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"modify-settings"},[s("p",{staticClass:"user-management-child-header b-1-cl a-3-bd"},[e._v("\n    "+e._s(0===e.isCapitalPwordSet?e.$t("personal.modifySettings.setTitle"):e.$t("personal.modifySettings.modifyTitle"))+"\n  ")]),s("div",{staticClass:"center clearfix"},[s("p",{staticClass:"center-title b-7-cl"},[s("svg",{staticClass:"icon icon-16",attrs:{"aria-hidden":"true"}},[s("use",{attrs:{"xlink:href":"#icon-c_2"}})]),e._v(e._s(e.$t("personal.prompt.warningPassword")))]),s("c-inputLine",{attrs:{maxLength:"20",name:"password",inputType:"password",promptText:e.moneyPassword,errorHave:!0,errorText:e.errorText3,errorFlag:e.checkErrorFlag3,marginTop:"0px",value:e.checkValue3},on:{onchanges:e.inputChanges}}),s("c-inputLine",{attrs:{maxLength:"20",name:"passwordAgain",inputType:"password",promptText:e.confirmMoneyPassword,errorHave:!0,errorText:e.errorText4,errorFlag:e.checkErrorFlag4,marginTop:"0px",value:e.checkValue4},on:{onchanges:e.inputChanges}}),s("c-inputLine",{directives:[{name:"show",rawName:"v-show",value:e.smsCode,expression:"smsCode"}],attrs:{maxLength:"6",name:"smsCode",inputType:"text",promptText:e.promptText1,errorHave:!0,errorText:e.errorText1,errorFlag:e.checkErrorFlag1,marginTop:"0px",value:e.checkValue1},on:{onchanges:e.inputChanges}},[s("c-getCode",{attrs:{name:"phone",autoStart:!1,buttonName:"loginGetcodeBtn"},on:{click:e.getCodeClick}})],1),s("c-inputLine",{directives:[{name:"show",rawName:"v-show",value:e.googleCode||e.enforceGoogleAuth,expression:"googleCode || enforceGoogleAuth"}],attrs:{maxLength:"6",name:"googleCode",inputType:"text",promptText:e.promptText2,errorHave:!0,errorText:e.errorText2,errorFlag:e.checkErrorFlag2,marginTop:"0px",value:e.checkValue2},on:{onchanges:e.inputChanges}}),s("c-button",{attrs:{type:"solid",loading:e.loading,big:!0,className:"",paddingW:"0px",disabled:e.disabled,marginTop:"18px",height:"40px",width:"100%"},on:{click:e.btnLink}},[e._v(e._s(e.$t("personal.tool.confirm")))])],1)])},o=[],a=(s("c5f6"),{name:"modifySettings",data:function(){return{loading:!1,promptText1:this.$t("personal.label.smsCodeText"),errorText1:this.$t("personal.prompt.errorCode"),checkErrorFlag1:!1,checkValue1:"",promptText2:this.$t("personal.label.googleCodeText"),errorText2:this.$t("personal.prompt.errorCode"),checkErrorFlag2:!1,checkValue2:"",promptText3:"",errorText3:this.$t("personal.prompt.errorPasswordText"),checkErrorFlag3:!1,checkValue3:"",promptText4:"",errorText4:this.$t("personal.prompt.errorPasswordTwo"),checkErrorFlag4:!1,checkValue4:"",disabled:!0,smsCode:!1,googleCode:!1,isCapitalPwordSet:0}},methods:{init:function(){var e=this.$store.state.baseData.userInfo;null!==e&&(this.googleCode=!!Number(e.googleStatus),this.smsCode=!!Number(e.isOpenMobileCheck),this.isCapitalPwordSet=e.isCapitalPwordSet)},passwordFlag:function(e){return this.$store.state.regExp.passWord.test(e)},codeFlag:function(e){return this.$store.state.regExp.verification.test(e)},getCodeClick:function(){this.$bus.$emit("getCode-start","phone");var e={operationType:0===this.isCapitalPwordSet?6:7};this.$store.dispatch("sendSmsCode",e)},inputChanges:function(e,t){switch(t){case"password":this.checkValue3=e,this.passwordFlag(e)?(this.checkErrorFlag3=!1,this.checkValue4&&this.checkValue3!==this.checkValue4?this.checkErrorFlag4=!0:this.checkErrorFlag4=!1):this.checkErrorFlag3=!0;break;case"passwordAgain":this.checkValue4=e,this.checkValue3===this.checkValue4?this.checkErrorFlag4=!1:this.checkErrorFlag4=!0;break;case"smsCode":this.checkValue1=e,this.codeFlag(e)?this.checkErrorFlag1=!1:this.checkErrorFlag1=!0;break;default:this.checkValue2=e,this.codeFlag(e)?this.checkErrorFlag2=!1:this.checkErrorFlag2=!0}!this.checkValue3||!this.checkValue4||this.checkValue3!==this.checkValue4||this.checkErrorFlag3||this.checkErrorFlag4||this.checkErrorFlag1||this.checkErrorFlag2?this.disabled=!0:(this.smsCode&&(this.disabled=!this.checkValue1),this.googleCode&&(this.disabled=!this.checkValue2),this.googleCode&&this.smsCode&&(this.disabled=!(this.checkValue1&&this.checkValue2)))},btnLink:function(){this.loading=!0;var e={newCapitalPwd:this.checkValue3,smsAuthCode:this.checkValue1,googleCode:this.checkValue2};this.$store.dispatch("otcCapitalPasswordSet",e)}},computed:{enforceGoogleAuth:function(){return this.$store.state.baseData.is_enforce_google_auth||0},moneyPassword:function(){return 0===this.isCapitalPwordSet?this.$t("personal.label.moneyPassword"):this.$t("personal.label.oldMoneyPassword")},confirmMoneyPassword:function(){return 0===this.isCapitalPwordSet?this.$t("personal.label.confirmMoneyPassword"):this.$t("personal.label.newConfirmMoneyPassword")},sendSmsCode:function(){return this.$store.state.personal.sendSmsCode},otcCapitalPasswordSet:function(){return this.$store.state.personal.otcCapitalPasswordSet},userInfo:function(){return this.$store.state.baseData.userInfo}},watch:{sendSmsCode:function(e){null!==e&&("success"===e.text?(this.$bus.$emit("tip",{text:e.msg,type:"success"}),this.$store.dispatch("resetType")):(this.$bus.$emit("tip",{text:e.msg,type:"error"}),this.$store.dispatch("resetType"),this.$bus.$emit("getCode-clear","phone")))},otcCapitalPasswordSet:function(e){null!==e&&(this.loading=!1,"success"===e.text?(this.$bus.$emit("tip",{text:e.msg,type:"success"}),this.$store.dispatch("resetType"),this.$router.push("/personal/leaglTenderSet")):(this.$bus.$emit("tip",{text:e.msg,type:"error"}),this.$store.dispatch("resetType"),this.$bus.$emit("getCode-clear","phone")))},userInfo:function(e){null!==e&&(this.googleCode=!!Number(e.googleStatus),this.smsCode=!!Number(e.isOpenMobileCheck),this.isCapitalPwordSet=e.isCapitalPwordSet)}}}),i=(s("9ed8"),{mixins:[a],mounted:function(){this.init()}}),n=i,c=s("2877"),h=Object(c["a"])(n,r,o,!1,null,null,null);t["default"]=h.exports}}]);