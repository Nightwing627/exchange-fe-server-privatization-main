(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-b62dbc58"],{"27ac":function(e,t,a){},"29ab":function(e,t,a){},"680b":function(e,t,a){},ad50:function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"set-up"},[a("p",{staticClass:"user-management-child-header b-2-cl a-3-bd"},[e._v(e._s(0===e.paymentList.length?this.$t("personal.setUp.title1"):this.$t("personal.setUp.title2")))]),a("div",{staticClass:"center clearfix "},[e.cardFlag&&e.excheifFlag?a("p",{staticClass:"center-title b-7-cl"},[a("svg",{staticClass:"icon icon-16",attrs:{"aria-hidden":"true"}},[a("use",{attrs:{"xlink:href":"#icon-c_2"}})]),e._v(e._s(e.$t("personal.setUp.hint")))]):e._e(),a("c-select",{directives:[{name:"show",rawName:"v-show",value:0===e.set,expression:"set === 0"}],attrs:{value:e.collectionWays,promptText:e.$t("personal.setUp.paymentMethods.text"),name:"collectionWays",errorHave:!0,errorFlag:e.certificateTypeErrorFlag,errorText:e.$t("personal.setUp.paymentMethods.errorText"),options:e.certificateTypeList},on:{onChanges:e.paymentsChange}}),a("c-inputLine",{directives:[{name:"show",rawName:"v-show",value:1===e.set,expression:"set === 1"}],attrs:{maxLength:"6",name:"smsCode",inputType:"text",promptText:e.$t("personal.setUp.paymentMethods.text"),errorHave:!0,disabled:!0,marginTop:"0px",value:this.obj.title}}),e.excheifFlag&&e.cardFlag?a("c-select",{attrs:{value:e.paycoinsWays,promptText:e.$t("personal.setUp.paymentMethods.text2"),name:"paycoinsWays",errorHave:!0,errorFlag:e.paycoinsTypeErrorFlag,errorText:e.$t("personal.setUp.paymentMethods.errorText2"),options:e.paycoinsTypeList},on:{onChanges:e.paycoinsChange}}):e._e(),1===e.payment?a("Payment1",{attrs:{isModify:e.set,payments:e.payments},on:{callBack:e.callBack}}):e._e(),2===e.payment?a("Payment2",{attrs:{isModify:e.set,payments:e.payments2},on:{callBack:e.callBack}}):e._e(),3===e.payment?a("Payment3",{attrs:{isModify:e.set,payments:e.payments3},on:{callBack:e.callBack}}):e._e(),4===e.payment?a("Payment4",{attrs:{isModify:e.set,payments:e.payments4},on:{callBack:e.callBack}}):e._e(),a("c-inputLine",{directives:[{name:"show",rawName:"v-show",value:e.smsCode,expression:"smsCode"}],attrs:{maxLength:"6",name:"smsCode",inputType:"text",promptText:e.promptText1,errorHave:!0,errorText:e.errorText1,errorFlag:e.checkErrorFlag1,marginTop:"0px",value:e.checkValue1},on:{onchanges:e.inputChanges}},[a("c-getCode",{attrs:{name:"phone",autoStart:!1,buttonName:"loginGetcodeBtn"},on:{click:e.getCodeClick}})],1),a("c-inputLine",{directives:[{name:"show",rawName:"v-show",value:e.googleCode||e.enforceGoogleAuth,expression:"googleCode || enforceGoogleAuth"}],attrs:{maxLength:"6",name:"googleCode",inputType:"text",promptText:e.promptText2,errorHave:!0,errorText:e.errorText2,errorFlag:e.checkErrorFlag2,marginTop:"0px",value:e.checkValue2},on:{onchanges:e.inputChanges}}),a("c-button",{attrs:{loading:e.loading,type:"solid",big:!0,className:"",paddingW:"0px",disabled:e.disabled,marginTop:"18px",height:"40px",width:"100%"},on:{click:e.btnLink}},[e._v(e._s(e.$t("personal.tool.submit")))])],1)])},i=[],n=(a("ac6a"),a("f3e2"),a("7f7f"),a("c5f6"),{name:"setUp",data:function(){return{loading:!1,paymentList:[],paymentId:"",collectionWays:"",certificateTypeErrorFlag:!1,certificateTypeList:[],paycoinsWays:"",paycoinsTypeErrorFlag:!1,paycoinsTypeList:[],certificateData:[],cardFlag:!1,payment:1,payments:null,payments2:null,payments3:null,payments4:null,disabled:!0,promptText1:this.$t("personal.label.smsCodeText"),errorText1:this.$t("personal.prompt.errorCode"),checkErrorFlag1:!1,checkValue1:"",promptText2:this.$t("personal.label.googleCodeText"),errorText2:this.$t("personal.prompt.errorCode"),checkErrorFlag2:!1,checkValue2:"",smsCode:!1,googleCode:!1,userName:"",account:"",accountType:"",qrcodeImg:"",bank:"",branch:"",set:0,obj:{},id:""}},methods:{init:function(){var e=this.$route.query.paymentId,t=this.$store.state.baseData.otcPublicInfo,a=this.$store.state.baseData.userInfo,s=this.$store.state.personal.otcPaymentFind;this.$store.dispatch("otcPaymentFind"),e?(this.set=1,this.paymentId=e,s?this.modifyData(s):this.$store.dispatch("otcPaymentFind")):(this.set=0,this.payment=1,this.payments={name:this.$t("personal.setUp.paymentMethods.paymentsWA.name"),title:this.$t("personal.setUp.paymentMethods.paymentsWA.title")}),null!==t?(this.collectionWays=t.payments[0].key,this.excheifFlag&&(this.paycoinsWays=t.paycoins[0].key),this.dataProcessing(t)):this.$store.dispatch("getOtcPublicInfo"),null!==a&&(this.googleCode=!!Number(a.googleStatus),this.smsCode=!!Number(a.isOpenMobileCheck))},codeFlag:function(e){return this.$store.state.regExp.verification.test(e)},judge:function(){this.userName&&this.account&&this.qrcodeImg&&!this.checkErrorFlag1&&!this.checkErrorFlag2?(this.smsCode&&(this.disabled=!this.checkValue1),this.googleCode&&(this.disabled=!this.checkValue2),this.$forceUpdate()):this.disabled=!0},judge2:function(){this.userName&&this.account&&this.bank&&!this.checkErrorFlag1&&!this.checkErrorFlag2?(this.smsCode&&(this.disabled=!this.checkValue1),this.googleCode&&(this.disabled=!this.checkValue2),this.$forceUpdate()):this.disabled=!0},judge3:function(){this.userName&&this.account&&!this.checkErrorFlag1&&!this.checkErrorFlag2?(this.smsCode&&(this.disabled=!this.checkValue1),this.googleCode&&(this.disabled=!this.checkValue2),this.$forceUpdate()):this.disabled=!0},judge4:function(){this.userName&&this.account&&""!==this.accountType&&!this.checkErrorFlag1&&!this.checkErrorFlag2?(this.smsCode&&(this.disabled=!this.checkValue1),this.googleCode&&(this.disabled=!this.checkValue2),this.$forceUpdate()):this.disabled=!0},callBack:function(e,t,a){"payment1"===e?(this[t]=a[t],this.judge()):"payment2"===e?(this[t]=a[t],this.judge2()):"payment3"===e?(this[t]=a[t],this.judge3()):(this[t]=a[t],this.accountType=a.accountType,this.judge4())},inputChanges:function(e,t){if("otc.payment.domestic.bank.transfer"===this.collectionWays){switch(t){case"smsCode":this.checkValue1=e,this.codeFlag(e)?this.checkErrorFlag1=!1:this.checkErrorFlag1=!0;break;default:this.checkValue2=e,this.codeFlag(e)?this.checkErrorFlag2=!1:this.checkErrorFlag2=!0}this.judge2()}else if("otc.payment.western.union"===this.collectionWays);else if("otc.payment.alipay"===this.collectionWays||"otc.payment.wxpay"===this.collectionWays){switch(t){case"smsCode":this.checkValue1=e,this.codeFlag(e)?this.checkErrorFlag1=!1:this.checkErrorFlag1=!0;break;default:this.checkValue2=e,this.codeFlag(e)?this.checkErrorFlag2=!1:this.checkErrorFlag2=!0}this.judge()}else if("otc.payment.paypal"===this.collectionWays){switch(t){case"smsCode":this.checkValue1=e,this.codeFlag(e)?this.checkErrorFlag1=!1:this.checkErrorFlag1=!0;break;default:this.checkValue2=e,this.codeFlag(e)?this.checkErrorFlag2=!1:this.checkErrorFlag2=!0}this.judge3()}else{switch(t){case"smsCode":this.checkValue1=e,this.codeFlag(e)?this.checkErrorFlag1=!1:this.checkErrorFlag1=!0;break;default:this.checkValue2=e,this.codeFlag(e)?this.checkErrorFlag2=!1:this.checkErrorFlag2=!0}this.judge4()}},getCodeClick:function(){this.$bus.$emit("getCode-start","phone");var e={operationType:28};this.$store.dispatch("sendSmsCode",e)},btnLink:function(){this.loading=!0;var e={};"otc.payment.domestic.bank.transfer"===this.collectionWays?(e.payment=this.collectionWays,e.userName=this.userName,e.bankName=this.bank,e.bankOfDeposit=this.branch,e.account=this.account,e.smsAuthCode=this.checkValue1,e.googleCode=this.checkValue2,e.coinName=this.paycoinsWays,e.id=this.id):"otc.payment.western.union"===this.collectionWays||("otc.payment.alipay"===this.collectionWays||"otc.payment.wxpay"===this.collectionWays?(e.payment=this.collectionWays,e.userName=this.userName,e.account=this.account,e.qrcodeImg=this.qrcodeImg,e.smsAuthCode=this.checkValue1,e.googleCode=this.checkValue2,e.id=this.id):"otc.payment.paypal"===this.collectionWays?(e.payment=this.collectionWays,e.userName=this.userName,e.account=this.account,e.smsAuthCode=this.checkValue1,e.googleCode=this.checkValue2,e.id=this.id):(e.payment=this.collectionWays,e.userName=this.userName,e.account=this.account,e.accountType=this.accountType,e.smsAuthCode=this.checkValue1,e.googleCode=this.checkValue2,e.id=this.id)),this.set?this.$store.dispatch("otcPaymentUpdate",e):this.$store.dispatch("otcPaymentAdd",e)},paymentsChange:function(e){this.collectionWays=e.code,this.choosePayment(e)},paycoinsChange:function(e){this.paycoinsWays=e.code},choosePayment:function(e){this.checkValue1="",this.checkValue2="",this.cardFlag=!1,"otc.payment.domestic.bank.transfer"===e.code?(this.payment=2,this.payments2={name:this.$t("personal.setUp.paymentMethods.paymentsCard.name"),bank:this.$t("personal.setUp.paymentMethods.paymentsCard.bank"),branch:this.$t("personal.setUp.paymentMethods.paymentsCard.branch"),account:this.$t("personal.setUp.paymentMethods.paymentsCard.account"),obj:this.obj},this.cardFlag=!0):"otc.payment.alipay"===e.code||"otc.payment.wxpay"===e.code?(this.payment=1,this.payments={name:this.$t("personal.setUp.paymentMethods.paymentsWA.name"),title:e.value+this.$t("personal.setUp.paymentMethods.paymentsWA.title"),obj:this.obj}):"otc.payment.paypal"===e.code?(this.payment=3,this.payments3={name:this.$t("personal.setUp.paymentMethods.paymentsWA.name"),title:e.value+this.$t("personal.setUp.paymentMethods.paymentsWA.title"),obj:this.obj}):(this.payment=4,this.payments4={name:this.$t("personal.setUp.paymentMethods.paymentsWA.name"),type:this.$t("personal.setUp.paymentMethods.paymentsWA.type"),title:e.value+this.$t("personal.setUp.paymentMethods.paymentsWA.title"),obj:this.obj})},dataProcessing:function(e){var t=this;this.excheifFlag&&(this.paycoinsTypeList.length=0,e.paycoins.forEach((function(e,a){t.paycoinsTypeList.push({value:e.title,code:e.key}),0===a&&t.choosePayment({value:e.title,code:e.key})}))),this.certificateTypeList.length=0,this.paymentId||e.payments.forEach((function(e,a){t.excheifFlag?t.certificateTypeList.push({value:e.title,code:e.key}):"otc.payment.alipay"!==e.key&&"otc.payment.wxpay"!==e.key&&"otc.payment.domestic.bank.transfer"!==e.key||t.certificateTypeList.push({value:e.title,code:e.key}),0===a&&t.choosePayment({value:e.title,code:e.key})}))},modifyData:function(e){var t=this;e.data.forEach((function(e){e.id===Number(t.paymentId)&&(t.obj=e,"otc.payment.domestic.bank.transfer"===t.obj.payment?(t.cardFlag=!0,t.payment=2,t.payments2={name:t.$t("personal.setUp.paymentMethods.paymentsCard.name"),bank:t.$t("personal.setUp.paymentMethods.paymentsCard.bank"),branch:t.$t("personal.setUp.paymentMethods.paymentsCard.branch"),account:t.$t("personal.setUp.paymentMethods.paymentsCard.account"),obj:t.obj},t.paycoinsWays=t.obj.coinName,t.collectionWays=t.obj.payment,t.userName=t.obj.userName,t.bank=t.obj.bankName,t.branch=t.obj.bankOfDeposit,t.account=t.obj.account,t.id=t.obj.id):"otc.payment.alipay"===t.obj.payment||"otc.payment.wxpay"===t.obj.payment?(t.payment=1,t.payments={name:t.$t("personal.setUp.paymentMethods.paymentsWA.name"),title:t.obj.title+t.$t("personal.setUp.paymentMethods.paymentsWA.title"),obj:t.obj},t.collectionWays=t.obj.payment,t.userName=t.obj.userName,t.account=t.obj.account,t.qrcodeImg=t.obj.qrcodeImg,t.id=t.obj.id):"otc.payment.paypal"===t.obj.payment?(t.payment=3,t.payments3={name:t.$t("personal.setUp.paymentMethods.paymentsWA.name"),title:t.obj.title+t.$t("personal.setUp.paymentMethods.paymentsWA.title"),obj:t.obj},t.collectionWays=t.obj.payment,t.userName=t.obj.userName,t.account=t.obj.account,t.id=t.obj.id):(t.payment=4,t.payments4={name:t.$t("personal.setUp.paymentMethods.paymentsWA.name"),type:t.$t("personal.setUp.paymentMethods.paymentsWA.type"),title:t.obj.title+t.$t("personal.setUp.paymentMethods.paymentsWA.title"),obj:t.obj},t.collectionWays=t.obj.payment,t.userName=t.obj.userName,t.account=t.obj.account,t.accountType=t.obj.accountType,t.id=t.obj.id))}))}},computed:{enforceGoogleAuth:function(){return this.$store.state.baseData.is_enforce_google_auth||0},getOtcPublicInfo:function(){return this.$store.state.baseData.otcPublicInfo},sendSmsCode:function(){return this.$store.state.personal.sendSmsCode},otcPaymentAdd:function(){return this.$store.state.personal.otcPaymentAdd},setPayment:function(){return this.$store.state.personal.setPayment},otcPaymentUpdate:function(){return this.$store.state.personal.otcPaymentUpdate},otcPaymentFind:function(){return this.$store.state.personal.otcPaymentFind},userInfo:function(){return this.$store.state.baseData.userInfo},excheifFlag:function(){return Boolean(this.$store.state.baseData.exchief_project_switch)}},watch:{userInfo:function(e){null!==e&&(this.googleCode=!!Number(e.googleStatus),this.smsCode=!!Number(e.isOpenMobileCheck))},otcPaymentFind:function(e){null!==e&&(this.paymentList=e.data,this.modifyData(e))},getOtcPublicInfo:function(e){null!==e&&(this.dataProcessing(e),this.collectionWays=e.payments[0].key,this.excheifFlag&&(this.paycoinsWays=e.paycoins[0].key))},sendSmsCode:function(e){null!==e&&("success"===e.text?(this.$bus.$emit("tip",{text:e.msg,type:"success"}),this.$store.dispatch("resetType")):(this.$bus.$emit("tip",{text:e.msg,type:"error"}),this.$store.dispatch("resetType"),this.$bus.$emit("getCode-clear","phone")))},otcPaymentAdd:function(e){null!==e&&(this.loading=!1,"success"===e.text?(this.$bus.$emit("tip",{text:e.msg,type:"success"}),this.$store.dispatch("resetType"),this.$router.push("/personal/leaglTenderSet")):(this.$bus.$emit("tip",{text:e.msg,type:"error"}),this.$store.dispatch("resetType")))},setPayment:function(e){null!==e&&(this.set=e.set)},otcPaymentUpdate:function(e){null!==e&&(this.loading=!1,"success"===e.text?(this.$bus.$emit("tip",{text:e.msg,type:"success"}),this.$store.dispatch("resetType"),this.$router.push("/personal/leaglTenderSet")):(this.$bus.$emit("tip",{text:e.msg,type:"error"}),this.$store.dispatch("resetType")))}}}),o=(a("680b"),function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"payment1"},[a("c-inputLine",{attrs:{name:"userName",maxLength:"50",promptText:e.promptText1,errorHave:!0,errorText:e.errorText1,errorFlag:e.checkErrorFlag1,marginTop:"0px",disabled:!e.excheifFlag&&e.isCanModifyName,value:e.checkValue1},on:{onchanges:e.inputChanges}}),a("c-inputLine",{attrs:{name:"account",maxLength:"50",promptText:e.promptText2,errorHave:!0,errorText:e.errorText2,errorFlag:e.checkErrorFlag2,marginTop:"0px",value:e.checkValue2},on:{onchanges:e.inputChanges}}),a("div",{staticClass:"upload_div a-4-bg a-2-bd"},[e.imgLoading?a("div",[a("c-loading",{attrs:{size:"34",className:"common-button-loading a-12-bd"}}),a("p",{staticClass:"b-4-cl loading-text"},[e._v(e._s(e.$t("personal.prompt.uploading")))])],1):a("div",[""!==e.imgSrc?a("div",{staticClass:"loading-mc"},[a("img",{staticClass:"loading-img",attrs:{src:e.imgSrc}}),a("div",{staticClass:"b-2-bg"})]):e._e(),a("div",{staticClass:"loading-text2"},[a("svg",{staticClass:"icon icon-24",attrs:{"aria-hidden":"true"}},[a("use",{attrs:{"xlink:href":"#icon-e_10"}})]),a("p",{staticClass:"b-4-cl"},[e._v("\n          "+e._s(e.imgSrc?e.$t("personal.prompt.uploadQrCodAgain"):e.$t("personal.prompt.uploadQrCod"))+"\n        ")])])]),a("c-oldUploadFile",{attrs:{className:"upload_file",maxSize:"8",name:"qrCode",url:"common/upload_qrcode",isOpenUploadImg:e.isOpenUploadImg,imageType:"2",expand:[],isWaterMark:!0},on:{tellMessage:e.onChangeFileFun,uploadFinish:e.uploadFinish}})],1),a("p",{staticClass:"upload_p"},[e._v(e._s(e.$t("personal.prompt.uploadType")))])],1)}),r=[],c={name:"aliwe",data:function(){return{promptText1:"",errorText1:"",checkErrorFlag1:!1,imageType:"2",checkValue1:"",promptText2:"",errorText2:"",checkErrorFlag2:!1,checkValue2:"",isOpenUploadImg:"0",imgLoading:!1,imgSrc:"",imgFile:""}},props:{payments:{default:function(){},type:Object},isModify:{type:Number}},methods:{init:function(){null!==this.payments&&(this.promptText1=this.payments.name,this.promptText2=this.payments.title,this.payments.obj&&(this.checkValue1=this.payments.obj.userName,this.checkValue2=this.payments.obj.account,this.imgSrc=this.payments.obj.qrcodeImg));var e=this.$store.state.baseData.publicInfo;if(null!==e&&(this.isOpenUploadImg=e.switch.is_open_upload_img),(0===this.isModify||this.isCanModifyName)&&this.userInfo){this.checkValue1=this.userInfo.realName;var t={};t.userName=this.userInfo.realName,this.$emit("callBack","payment1","userName",t)}},inputChanges:function(e,t){"userName"===t?this.checkValue1=e:this.checkValue2=e;var a={};a[t]=e,this.$emit("callBack","payment1",t,a)},uploadFinish:function(e){if(e.error)this.$bus.$emit("tip",{text:e.error,type:"error"});else{this.imgLoading=!1,this.imgSrc=e.url,this.imgFile=e.fileName;var t=Number(this.clientUploadType)?this.imgFile:this.imgSrc;this.$emit("callBack","payment1","qrcodeImg",{qrcodeImg:t})}},onChangeFileFun:function(){this.imgLoading=!0}},computed:{userInfo:function(){return this.$store.state.baseData.userInfo},isCanModifyName:function(){return this.userInfo&&0===Number(this.userInfo.userCompanyInfo.status)},excheifFlag:function(){return this.$store.state.baseData.exchief_project_switch}},watch:{userInfo:function(e){if((0===this.isModify||this.isCanModifyName)&&e){this.checkValue1=e.realName;var t={};t.userName=e.realName,this.$emit("callBack","payment1","userName",t)}},payments:function(e){null!==e&&(this.checkValue2=e.obj.account,this.imgSrc=e.obj.qrcodeImg,this.promptText1=e.name,this.promptText2=e.title)}}},h=(a("27ac"),{mixins:[c],mounted:function(){this.init()}}),p=h,l=a("2877"),m=Object(l["a"])(p,o,r,!1,null,null,null),u=m.exports,y=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"payment2"},[a("c-inputLine",{attrs:{name:"userName",maxLength:"50",promptText:e.promptText1,errorHave:!0,errorText:e.errorText1,errorFlag:e.checkErrorFlag1,marginTop:"0px",disabled:!e.excheifFlag&&e.isCanModifyName,value:e.checkValue1},on:{onchanges:e.inputChanges}}),a("c-inputLine",{attrs:{name:"bank",maxLength:"50",promptText:e.promptText2,errorHave:!0,errorText:e.errorText2,errorFlag:e.checkErrorFlag2,marginTop:"0px",value:e.checkValue2},on:{onchanges:e.inputChanges}}),a("c-inputLine",{attrs:{name:"branch",maxLength:"50",promptText:e.promptText3,errorHave:!0,errorText:e.errorText3,errorFlag:e.checkErrorFlag3,marginTop:"0px",value:e.checkValue3},on:{onchanges:e.inputChanges}}),a("c-inputLine",{attrs:{name:"account",maxLength:"50",promptText:e.promptText4,errorHave:!0,errorText:e.errorText4,errorFlag:e.checkErrorFlag4,marginTop:"0px",value:e.checkValue4},on:{onchanges:e.inputChanges}})],1)},d=[],g={name:"bankcard",data:function(){return{promptText1:"",errorText1:"",checkErrorFlag1:!1,checkValue1:"",promptText2:"",errorText2:"",checkErrorFlag2:!1,checkValue2:"",promptText3:"",errorText3:"",checkErrorFlag3:!1,checkValue3:"",promptText4:"",errorText4:"",checkErrorFlag4:!1,checkValue4:""}},props:{payments:{default:function(){},type:Object},isModify:{type:Number}},methods:{init:function(){if(null!==this.payments&&(this.promptText1=this.payments.name,this.promptText2=this.payments.bank,this.promptText3=this.payments.branch,this.promptText4=this.payments.account,this.payments.obj&&(this.checkValue1=this.payments.obj.userName,this.checkValue2=this.payments.obj.bankName,this.checkValue3=this.payments.obj.bankOfDeposit,this.checkValue4=this.payments.obj.account)),(0===this.isModify||this.isCanModifyName)&&this.userInfo){this.excheifFlag||this.checkValue1||(this.checkValue1=this.userInfo.realName);var e={};e.userName=this.userInfo.realName,this.$emit("callBack","payment2","userName",e)}},inputChanges:function(e,t){switch(t){case"userName":this.checkValue1=e;break;case"bank":this.checkValue2=e;break;case"branch":this.checkValue3=e;break;default:this.checkValue4=e}var a={};a[t]=e,this.$emit("callBack","payment2",t,a)}},computed:{userInfo:function(){return this.$store.state.baseData.userInfo},isCanModifyName:function(){return this.userInfo&&0===Number(this.userInfo.userCompanyInfo.status)},excheifFlag:function(){return this.$store.state.baseData.exchief_project_switch}},watch:{userInfo:function(e){if((0===this.isModify||this.isCanModifyName)&&e){this.excheifFlag||this.checkValue1||(this.checkValue1=e.realName);var t={};t.userName=e.realName,this.$emit("callBack","payment2","userName",t)}},payments:function(e){null!==e&&(this.promptText1=e.name,this.promptText2=e.bank,this.promptText3=e.branch,this.promptText4=e.account)}}},f=(a("cc83"),{mixins:[g],mounted:function(){this.init()}}),b=f,k=Object(l["a"])(b,y,d,!1,null,null,null),x=k.exports,T=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"payment1"},[a("c-inputLine",{attrs:{name:"userName",maxLength:"100",promptText:e.promptText1,errorHave:!0,errorText:e.errorText1,errorFlag:e.checkErrorFlag1,marginTop:"0px",disabled:!e.excheifFlag&&e.isCanModifyName,value:e.checkValue1},on:{onchanges:e.inputChanges}}),a("c-inputLine",{attrs:{name:"account",maxLength:"50",promptText:e.promptText2,errorHave:!0,errorText:e.errorText2,errorFlag:e.checkErrorFlag2,marginTop:"0px",value:e.checkValue2},on:{onchanges:e.inputChanges}})],1)},C=[],$={name:"paypal",data:function(){return{promptText1:"",errorText1:"",checkErrorFlag1:!1,checkValue1:"",promptText2:"",errorText2:"",checkErrorFlag2:!1,checkValue2:""}},props:{payments:{default:function(){},type:Object}},methods:{init:function(){if(null!==this.payments&&(this.promptText1=this.payments.name,this.promptText2=this.payments.title,this.payments.obj&&(this.checkValue1=this.payments.obj.userName,this.checkValue2=this.payments.obj.account)),this.isCanModifyName&&this.userInfo){this.checkValue1=this.userInfo.realName;var e={};e.userName=this.userInfo.realName,this.$emit("callBack","payment3","userName",e)}},inputChanges:function(e,t){"userName"===t?this.checkValue1=e:this.checkValue2=e;var a={};a[t]=e,this.$emit("callBack","payment3",t,a)}},computed:{userInfo:function(){return this.$store.state.baseData.userInfo},isCanModifyName:function(){return this.userInfo&&0===Number(this.userInfo.userCompanyInfo.status)},excheifFlag:function(){return this.$store.state.baseData.exchief_project_switch}},watch:{userInfo:function(e){if(this.isCanModifyName&&e){this.checkValue1=e.realName;var t={};t.userName=e.realName,this.$emit("callBack","payment3","userName",t)}},payments:function(e){null!==e&&(this.checkValue2=e.obj.account,this.promptText1=e.name,this.promptText2=e.title)}}},F=(a("b013"),{mixins:[$],mounted:function(){this.init()}}),N=F,v=Object(l["a"])(N,T,C,!1,null,null,null),j=v.exports,V=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"payment1"},[a("c-inputLine",{attrs:{name:"userName",maxLength:"50",promptText:e.promptText1,errorHave:!0,errorText:e.errorText1,errorFlag:e.checkErrorFlag1,marginTop:"0px",disabled:!e.excheifFlag&&e.isCanModifyName,value:e.checkValue1},on:{onchanges:e.inputChanges}}),a("c-select",{attrs:{value:e.mobile,promptText:e.$t("personal.setUp.paymentMethods.paymentsWA.type"),errorHave:!0,name:"mobile",options:e.mobileList},on:{onChanges:e.typeChanges}}),a("c-inputLine",{attrs:{name:"account",maxLength:"50",promptText:e.promptText2,errorHave:!0,errorText:e.errorText2,errorFlag:e.checkErrorFlag2,marginTop:"0px",value:e.checkValue2},on:{onchanges:e.inputChanges}})],1)},I=[],E={name:"paypal",data:function(){return{promptText1:"",errorText1:"",checkErrorFlag1:!1,checkValue1:"",promptText2:"",errorText2:"",checkErrorFlag2:!1,checkValue2:"",mobile:""}},props:{payments:{default:function(){},type:Object}},methods:{init:function(){if(null!==this.payments&&(this.promptText1=this.payments.name,this.promptText2=this.payments.title,this.payments.obj&&(this.checkValue1=this.payments.obj.userName,this.checkValue2=this.payments.obj.account)),this.isCanModifyName&&this.userInfo){this.checkValue1=this.userInfo.realName;var e={};e.userName=this.userInfo.realName,this.$emit("callBack","payment4","userName",e)}this.mobile=this.mobileList[0].code},inputChanges:function(e,t){"userName"===t?this.checkValue1=e:this.checkValue2=e;var a={};a[t]=e,a.accountType=this.mobile,this.$emit("callBack","payment4",t,a)},typeChanges:function(e){this.mobile=e.code}},computed:{mobileList:function(){return[{value:this.$t("otcDetailOrder.phone"),code:"1"},{value:this.$t("personal.label.email"),code:"0"}]},userInfo:function(){return this.$store.state.baseData.userInfo},isCanModifyName:function(){return this.userInfo&&0===Number(this.userInfo.userCompanyInfo.status)},excheifFlag:function(){return this.$store.state.baseData.exchief_project_switch}},watch:{userInfo:function(e){if(this.isCanModifyName&&e){this.checkValue1=e.realName;var t={};t.userName=e.realName,this.$emit("callBack","payment4","userName",t)}},payments:function(e){null!==e&&(this.checkValue2=e.obj.account,this.promptText1=e.name,this.promptText2=e.title,this.mobile=String(e.obj.accountType))}}},M=(a("29ab"),{mixins:[E],mounted:function(){this.init()}}),W=M,_=Object(l["a"])(W,V,I,!1,null,null,null),U=_.exports,L={mixins:[n],components:{Payment1:u,Payment2:x,Payment3:j,Payment4:U},mounted:function(){this.init()}},w=L,P=Object(l["a"])(w,s,i,!1,null,null,null);t["default"]=P.exports},b013:function(e,t,a){},cc83:function(e,t,a){}}]);