(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-199377c6"],{"1c4c":function(t,e,i){"use strict";var n=i("9b43"),s=i("5ca1"),o=i("4bf8"),r=i("1fa8"),a=i("33a4"),c=i("9def"),l=i("f1ae"),u=i("27ee");s(s.S+s.F*!i("5cc5")((function(t){Array.from(t)})),"Array",{from:function(t){var e,i,s,g,h=o(t),d="function"==typeof this?this:Array,f=arguments.length,p=f>1?arguments[1]:void 0,m=void 0!==p,v=0,b=u(h);if(m&&(p=n(p,f>2?arguments[2]:void 0,2)),void 0==b||d==Array&&a(b))for(e=c(h.length),i=new d(e);e>v;v++)l(i,v,m?p(h[v],v):h[v]);else for(g=b.call(h),i=new d;!(s=g.next()).done;v++)l(i,v,m?r(g,p,[s.value,v],!0):s.value);return i.length=v,i}})},"1fa8":function(t,e,i){var n=i("cb7c");t.exports=function(t,e,i,s){try{return s?e(n(i)[0],i[1]):e(i)}catch(r){var o=t["return"];throw void 0!==o&&n(o.call(t)),r}}},"27ee":function(t,e,i){var n=i("23c6"),s=i("2b4c")("iterator"),o=i("84f2");t.exports=i("8378").getIteratorMethod=function(t){if(void 0!=t)return t[s]||t["@@iterator"]||o[n(t)]}},"2fdb":function(t,e,i){"use strict";var n=i("5ca1"),s=i("d2c8"),o="includes";n(n.P+n.F*i("5147")(o),"String",{includes:function(t){return!!~s(this,t,o).indexOf(t,arguments.length>1?arguments[1]:void 0)}})},"33a4":function(t,e,i){var n=i("84f2"),s=i("2b4c")("iterator"),o=Array.prototype;t.exports=function(t){return void 0!==t&&(n.Array===t||o[s]===t)}},"4a59":function(t,e,i){var n=i("9b43"),s=i("1fa8"),o=i("33a4"),r=i("cb7c"),a=i("9def"),c=i("27ee"),l={},u={};e=t.exports=function(t,e,i,g,h){var d,f,p,m,v=h?function(){return t}:c(t),b=n(i,g,e?2:1),y=0;if("function"!=typeof v)throw TypeError(t+" is not iterable!");if(o(v)){for(d=a(t.length);d>y;y++)if(m=e?b(r(f=t[y])[0],f[1]):b(t[y]),m===l||m===u)return m}else for(p=v.call(t);!(f=p.next()).done;)if(m=s(p,b,f.value,e),m===l||m===u)return m};e.BREAK=l,e.RETURN=u},"4f7f":function(t,e,i){"use strict";var n=i("c26b"),s=i("b39a"),o="Set";t.exports=i("e0b8")(o,(function(t){return function(){return t(this,arguments.length>0?arguments[0]:void 0)}}),{add:function(t){return n.def(s(this,o),t=0===t?0:t,t)}},n)},5147:function(t,e,i){var n=i("2b4c")("match");t.exports=function(t){var e=/./;try{"/./"[t](e)}catch(i){try{return e[n]=!1,!"/./"[t](e)}catch(s){}}return!0}},"5cc5":function(t,e,i){var n=i("2b4c")("iterator"),s=!1;try{var o=[7][n]();o["return"]=function(){s=!0},Array.from(o,(function(){throw 2}))}catch(r){}t.exports=function(t,e){if(!e&&!s)return!1;var i=!1;try{var o=[7],a=o[n]();a.next=function(){return{done:i=!0}},o[n]=function(){return a},t(o)}catch(r){}return i}},a2f5:function(t,e,i){},b39a:function(t,e,i){var n=i("d3f4");t.exports=function(t,e){if(!n(t)||t._t!==e)throw TypeError("Incompatible receiver, "+e+" required!");return t}},c26b:function(t,e,i){"use strict";var n=i("86cc").f,s=i("2aeb"),o=i("dcbc"),r=i("9b43"),a=i("f605"),c=i("4a59"),l=i("01f9"),u=i("d53b"),g=i("7a56"),h=i("9e1e"),d=i("67ab").fastKey,f=i("b39a"),p=h?"_s":"size",m=function(t,e){var i,n=d(e);if("F"!==n)return t._i[n];for(i=t._f;i;i=i.n)if(i.k==e)return i};t.exports={getConstructor:function(t,e,i,l){var u=t((function(t,n){a(t,u,e,"_i"),t._t=e,t._i=s(null),t._f=void 0,t._l=void 0,t[p]=0,void 0!=n&&c(n,i,t[l],t)}));return o(u.prototype,{clear:function(){for(var t=f(this,e),i=t._i,n=t._f;n;n=n.n)n.r=!0,n.p&&(n.p=n.p.n=void 0),delete i[n.i];t._f=t._l=void 0,t[p]=0},delete:function(t){var i=f(this,e),n=m(i,t);if(n){var s=n.n,o=n.p;delete i._i[n.i],n.r=!0,o&&(o.n=s),s&&(s.p=o),i._f==n&&(i._f=s),i._l==n&&(i._l=o),i[p]--}return!!n},forEach:function(t){f(this,e);var i,n=r(t,arguments.length>1?arguments[1]:void 0,3);while(i=i?i.n:this._f){n(i.v,i.k,this);while(i&&i.r)i=i.p}},has:function(t){return!!m(f(this,e),t)}}),h&&n(u.prototype,"size",{get:function(){return f(this,e)[p]}}),u},def:function(t,e,i){var n,s,o=m(t,e);return o?o.v=i:(t._l=o={i:s=d(e,!0),k:e,v:i,p:n=t._l,n:void 0,r:!1},t._f||(t._f=o),n&&(n.n=o),t[p]++,"F"!==s&&(t._i[s]=o)),t},getEntry:m,setStrong:function(t,e,i){l(t,e,(function(t,i){this._t=f(t,e),this._k=i,this._l=void 0}),(function(){var t=this,e=t._k,i=t._l;while(i&&i.r)i=i.p;return t._t&&(t._l=i=i?i.n:t._t._f)?u(0,"keys"==e?i.k:"values"==e?i.v:[i.k,i.v]):(t._t=void 0,u(1))}),i?"entries":"values",!i,!0),g(e)}}},cc89:function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("section",{staticClass:"page-login"},[i("div",{staticClass:"go-home-btn a-3-bd",on:{click:function(e){return t.goUrl("/")}}},[i("svg",{staticClass:"icon icon-18",attrs:{"aria-hidden":"true"}},[i("use",{attrs:{"xlink:href":"#icon-e_11"}})]),t._v("\n    "+t._s(t.$t("pageTitle.home"))+"\n  ")]),i("c-intoGuide",{attrs:{imgMap:t.imgMap}},[i("div",{staticClass:"guide-center"},[i("p",{class:t.isInternationTem?"b-1-cl":"b-8-cl"},[t._v("\n        "+t._s(t.loginPageTitle)+"\n      ")]),i("div",{staticClass:"guide-text b-2-cl"},[i("span",{staticClass:"guide-ht"},[t._v(t._s(t.$t("login.NotRegisteredUsersYet")))]),i("c-button",{attrs:{type:"text",className:"goRegister logBtn"},on:{click:function(e){return t.goUrl("/register")}}},[t._v("\n          "+t._s(t.$t("login.goRegister"))+"\n        ")])],1)])]),i("div",{staticClass:"page-login-content"},[i("div",{staticClass:"content-center"},[i("c-inputLine",{attrs:{maxLength:"100",name:"userValue",promptText:t.userInputPrompt,errorHave:!0,errorText:t.$t("login.formatIncorrect"),errorFlag:t.userErrorFlag,value:t.userValue},on:{onchanges:t.inputChanges}}),i("c-inputLine",{attrs:{maxLength:"20",name:"passValue",promptText:t.$t("login.password"),errorHave:!0,errorText:t.$t("login.passwordError"),errorFlag:t.passErrorFlag,marginTop:"0px",value:t.passValue,inputType:"password",isLogin:!0},on:{onchanges:t.inputChanges}}),t.openLoginVerificationMode?i("c-select",{attrs:{value:t.selectValue,promptText:t.$t("login.VerificationMode"),name:"loginType",errorHave:!0,errorFlag:!1,errorText:t.$t("login.AuthenticationMethod"),options:t.selectOptions},on:{onChanges:t.selectChange}}):t._e(),i("c-verify",{attrs:{marginTop:"6px",errorHave:!0,colorMap:t.colorMap},on:{callback:t.verifyCallBack}}),i("c-button",{attrs:{type:"text",className:"logBtn"},on:{click:function(e){return t.goUrl("/resetPass")}}},[t._v("\n        "+t._s(t.$t("login.ForgetPassword"))+"\n      ")]),i("c-button",{attrs:{type:"solid",disabled:t.submitDisabled,loading:t.submitLoading,marginTop:"20px",height:"40px",width:"380px",paddingW:"0px"},on:{click:t.submit}},[t._v(t._s(t.loginButtonText)+"\n      ")]),!t.thirdList||t.singPassCode||t.singpassState?t._e():i("div",{staticClass:"thirdBox"},[i("div",{staticClass:"thirdBoxTitle b-2-cl"},[t._v("\n          "+t._s(t.$t("singPassLogin.mainText1"))+"\n        ")]),i("div",{staticClass:"thirdInfor a-2-bd",class:{"a-4-bg":"0"===t.addHoverclass,notborder:t.thirdList.length<2},on:{click:function(e){return t.goThirdUrl(t.thirdList[0])},mouseover:function(e){return e.stopPropagation(),t.addHover("0")},mouseout:function(e){return e.stopPropagation(),t.removeHover()}}},[i("img",{attrs:{src:t.thirdList[0].img}}),i("div",{staticClass:"thirdName"},[t._v(t._s(t.thirdList[0].value))]),t.thirdList.length>1?i("i",{staticClass:"dowm-icon"}):t._e()]),t.thirdList.length>1?i("div",{staticClass:"third-list a-5-bg b-1-cl"},[t._l(t.thirdList,(function(e,n){return[n>0?i("div",{key:n,staticClass:"third-item",class:{"a-4-bg":n===t.addHoverclass},on:{click:function(i){return t.goThirdUrl(e)},mouseover:function(e){return t.addHover(n)},mouseout:function(e){return t.removeHover()}}},[i("img",{attrs:{src:e.img}}),i("div",{staticClass:"third-val"},[t._v(t._s(e.value))])]):t._e()]}))],2):t._e()]),i("div",{staticClass:"copy z-2-cl",staticStyle:{"border-color":"#293448 !important"}},[t._v("\n        Copyright © 2019 "+t._s(t.companyName)+". All rights reserve\n      ")])],1)]),i("c-dialog",{attrs:{showFlag:t.dialogFlag,paddingBottom:"14px",confirmLoading:t.dialogConfirmLoading,confirmDisabled:t.dialogConfirmDisabled,titleText:t.$t("login.SecurityVerification")},on:{close:t.dialogClose,confirm:t.dialogConfirm}},[i("c-inputLine",{attrs:{maxLength:"6",name:"checkValue",promptText:t.checkOptions.text,errorHave:!0,errorText:t.checkText,errorFlag:t.checkErrorFlag,marginTop:"0px",value:t.checkValue},on:{onchanges:t.inputChanges}},[t.checkOptions.haveCode?i("c-getCode",{attrs:{name:"loginGetcode",buttonName:"loginGetcodeBtn"},on:{click:t.getCodeClick}}):t._e()],1)],1),i("div",{staticClass:"spcpqr-a5c3",staticStyle:{dispaly:"none"}}),i("singPassLogin",{attrs:{isShow:t.singPassDialogFlag}})],1)},s=[],o=(i("1c01"),i("58b2"),i("8e6e"),i("456d"),i("6762"),i("2fdb"),i("75fc")),r=(i("4f7f"),i("5df3"),i("1c4c"),i("d25f"),i("6b54"),i("87b3"),i("bd86")),a=(i("55dd"),i("7f7f"),i("ac6a"),i("f3e2"),i("95d5"));function c(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,n)}return i}function l(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?c(Object(i),!0).forEach((function(e){Object(r["a"])(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):c(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}var u={name:"page-login",data:function(){return{imgMap:a["u"],colorMap:a["c"],userValue:"",passValue:"",checkValue:"",checkType:"0",verifyObj:{},verifyFlag:!1,dialogFlag:!1,submitLoading:!1,userToken:null,dialogConfirmLoading:!1,selectValue:"google",addHoverclass:0,singPassDialogFlag:!1,thirdListShow:!1,loginMode:null}},watch:{checkValue:function(t){var e=this;6===t.length&&this.$nextTick((function(){e.$bus.$emit("button-click","dialogConfirm")}))},loginFlag:function(t){t&&this.goHome()},thirdPartyLoginData:function(t){null!==t&&(this.loading=!1,"success"===t.text?this.singPassDialogFlag=!0:this.$bus.$emit("tip",{text:t.msg,type:"error"}))}},computed:{loginButtonText:function(){return"SingPass"===this.loginMode||this.singPassCode&&this.singpassState&&"reg"===this.singpassSource?this.$t("singPassLogin.mainText13"):this.$t("login.login")},loginPageTitle:function(){return"SingPass"===this.loginMode||this.singPassCode&&this.singpassState&&"reg"===this.singpassSource?this.$t("singPassLogin.mainText2"):this.$t("login.WelcomeToLogin")},isInternationTem:function(){return"2"===this.$store.state.baseData.templateLayoutType},userInputPrompt:function(){var t="";switch(this.loginRegistType){case"1":t=this.$t("login.phoneOrEmail");break;case"2":t=this.$t("resetPass.phone");break;case"3":t=this.$t("resetPass.email");break;default:t=this.$t("login.phoneOrEmail")}return t},loginRegistType:function(){var t="1";return t},selectOptions:function(){var t=[{value:this.$t("login.GoogleAuthenticator"),code:"google"}];return"2"===this.loginRegistType?t.push({value:this.$t("login.MobilePhoneVerification"),code:"phone"}):("3"===this.loginRegistType||t.push({value:this.$t("login.MobilePhoneVerification"),code:"phone"}),t.push({value:this.$t("login.MailboxValidation"),code:"email"})),t},loginFlag:function(){var t=this.$store.state.baseData,e=t.isLogin,i=t.userInfoIsReady;return!(!e||!i)},checkText:function(){switch(this.checkType){case"1":return this.$t("login.googleCodeError");case"2":return this.$t("login.phoneCodeError");case"3":return this.$t("login.emailCodeError");default:return this.$t("login.codeError")}},serverName:function(){var t=this.$store.state.baseData.publicInfo,e="";return t&&t.msg&&t.msg.company_name&&(e=t.msg.company_name),e},userFlag:function(){var t=this.$store.state.regExp,e=t.phone,i=t.email;if("2"===this.loginRegistType){if(e.test(this.userValue))return!0}else if("3"===this.loginRegistType){if(i.test(this.userValue))return!0}else{if(e.test(this.userValue))return!0;if(i.test(this.userValue))return!0}return!1},passFlag:function(){return this.$store.state.regExp.passWord.test(this.passValue)},checkFlag:function(){return this.$store.state.regExp.verification.test(this.checkValue)},checkOptions:function(){switch(this.checkType){case"1":return{text:this.$t("login.googleCode"),haveCode:!1};case"2":return{text:this.$t("login.phoneCode"),haveCode:!0};case"3":return{text:this.$t("login.emailCode"),haveCode:!0};default:return{text:this.$t("login.code"),haveCode:!1}}},userErrorFlag:function(){return 0!==this.userValue.length&&!this.userFlag},passErrorFlag:function(){return 0!==this.passValue.length&&!this.passFlag},checkErrorFlag:function(){return 0!==this.checkValue.length&&!this.checkFlag},submitDisabled:function(){var t=this.userFlag,e=this.passFlag,i=this.verifyFlag,n=this.submitLoading;return!(t&&e&&i||n)},dialogConfirmDisabled:function(){return!this.checkFlag&&!this.dialogConfirmLoading},openLoginVerificationMode:function(){return!1},publicInfo:function(){var t=this.$store.state.baseData.publicInfo;return t},companyName:function(){return this.publicInfo&&this.publicInfo.msg?this.publicInfo.msg.company_name:""},thirdList:function(){if(this.publicInfo&&this.publicInfo.thirdInfo&&this.publicInfo.thirdInfo.length>0){var t=[];this.publicInfo.thirdInfo.forEach((function(e){t.push({value:e.name,img:e.logoAddress,code:e.pcThirdUrl,sort:e.sort,pcJump:e.pcJump})}));var e=this.sortKey(t,"sort");return e}return null},thirdPartyLoginData:function(){return this.$store.state.baseData.thirdPartyLoginData},singPassCode:function(){return this.$route.query.code},singpassState:function(){return this.$route.query.state},singpassSource:function(){return this.$route.query.source}},methods:{init:function(){var t=this;this.loginFlag&&this.goHome(),this.$bus.$off("emailCode"),this.$bus.$on("emailCode",(function(e){var i=JSON.parse(JSON.stringify(e));i.callback=void 0,t.axios({url:"v4/common/emailValidCode",method:"post",header:{},params:i}).then((function(t){e.callback(t)})).catch((function(){}))})),this.$bus.$off("phoneCode"),this.$bus.$on("phoneCode",(function(e){var i=JSON.parse(JSON.stringify(e));i.callback=void 0,t.axios({url:"v4/common/smsValidCode",method:"post",header:{},params:i}).then((function(t){e.callback(t)})).catch((function(){}))})),this.$bus.$on("closeSingPassDialog",(function(){t.singPassDialogFlag=!1})),this.$bus.$on("setLoginMode",(function(e){t.loginMode=e}))},sortKey:function(t,e){return t.sort((function(t,i){var n=t[e],s=i[e];return n-s}))},changeThird:function(t){"1"===t.pcJump&&window.open(t.code,"_blank")},addHover:function(t){this.addHoverclass=t,this.thirdListShow=!0},removeHover:function(){this.addHoverclass=null},goUrl:function(t){"/register"===t&&this.singPassCode&&this.singpassState?this.$router.push("".concat(t,"?singPassCode=").concat(this.singPassCode,"&singPassState=").concat(this.singpassState)):this.$router.push(t)},goHome:function(){window.location.href="/"},inputChanges:function(t,e){this[e]=t},selectChange:function(t){this.selectValue=t.code},submit:function(){var t=this,e=l(l({},this.verifyObj),{mobileNumber:this.userValue,loginPword:this.passValue,nc:null});this.submitLoading=!0,this.axios({url:"user/login_in",headers:{},params:e,method:"post"}).then((function(e){t.verifyObj.nc.reset(),t.verifyFlag=!1,t.submitLoading=!1,"0"===e.code.toString()?(t.dialogFlag=!0,t.checkType=e.data.type,t.userToken=e.data.token,t.$nextTick((function(){t.$bus.$emit("inputLine-focus","checkValue"),t.$bus.$emit("button-click","loginGetcodeBtn")}))):t.$bus.$emit("tip",{text:e.msg,type:"error"})}))},verifyCallBack:function(t){this.verifyObj=t,this.verifyFlag=!0},dialogConfirm:function(){var t=this;this.dialogConfirmLoading=!0;var e={token:this.userToken,authCode:this.checkValue,type:this.selectValue};this.singPassCode&&this.singpassState&&(e.singPassCode=this.singPassCode),this.axios({url:"user/confirm_login",method:"post",params:e}).then((function(e){t.dialogConfirmLoading=!1,"0"===e.code.toString()?(t.dialogClose(),Object(a["B"])("token",t.userToken),t.$bus.$emit("tip",{text:t.$t("login.loginSuccess"),type:"success"}),t.$store.dispatch("getUserInfo"),t.getMySymbol(),window.location.href="/"):t.$bus.$emit("tip",{text:e.msg,type:"error"})}))},dialogClose:function(){this.dialogFlag=!1,this.checkValue=""},getCodeClick:function(){this.sendCode()},sendCode:function(){var t=this;"2"===this.checkType?this.$bus.$emit("phoneCode",{token:this.userToken,operationType:"25",callback:function(e){"0"!==e.code.toString()?(t.$bus.$emit("getCode-clear","loginGetcode"),t.$bus.$emit("tip",{text:e.msg,type:"error"})):t.$bus.$emit("tip",{text:t.$t("login.phoneSendSuccess"),type:"success"})}}):"3"===this.checkType&&this.$bus.$emit("emailCode",{token:this.userToken,operationType:"4",callback:function(e){"0"!==e.code.toString()?(t.$bus.$emit("getCode-clear","loginGetcode"),t.$bus.$emit("tip",{text:e.msg,type:"error"})):t.$bus.$emit("tip",{text:t.$t("login.emailSendSuccess"),type:"success"})}})},getMySymbol:function(){var t=this;this.axios({url:"optional/list_symbol",params:{},method:"post"}).then((function(e){if("0"===e.code){var i=a["w"].get("mySymbol")||[],n=e.data.symbols.filter((function(t){return""!==t}))||[],s=Array.from(new Set([].concat(Object(o["a"])(i),Object(o["a"])(n)))),r=i.filter((function(t){return!n.includes(t)}));0!==r.length&&"0"===e.data.sync_status?(a["w"].set("mySymbol",s),t.axios({url:t.$store.state.url.common.optional_symbol,headers:{},params:{operationType:r.length>"1"?"0":"1",symbols:r.join(",")},method:"post"}).then((function(){}))):a["w"].set("mySymbol",n)}else t.$bus.$emit("tip",{text:e.msg,type:"error"})}))},goThirdUrl:function(t){"1"===t.pcJump?window.open(t.code,"_blank"):this.$store.dispatch("thirdPartyLoginData",{url:t.code,data:{}})}}},g=(i("a2f5"),function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("section",{staticClass:"page-login"},[i("c-dialog",{attrs:{showFlag:t.dialogFlag,paddingBottom:"14px",confirmLoading:t.dialogConfirmLoading,confirmDisabled:t.dialogConfirmDisabled,haveOption:t.dialoghaveOption,titleText:t.titleText},on:{close:t.dialogClose,confirm:t.dialogConfirm}},[i("div",{staticClass:"singPass-dialog-content"},[i("div",{staticClass:"singPass-login-content a-4-bg b-1-cl"},[i("div",{attrs:{id:"qr_wrapper"}}),t.isShowRefresh?i("div",{staticClass:"spcpqr-cent"},[i("p",{staticClass:"b-1-cl"},[t._v(t._s(t.$t("singPassLogin.mainText3")))]),i("c-button",{staticClass:"header-login-button",attrs:{height:"30px"},on:{click:t.refreshHandler}},[t._v("\n                "+t._s(t.$t("singPassLogin.mainText4"))+"\n              ")])],1):t._e(),i("div",{staticClass:"sys"},[i("div",{staticClass:"sys-icon"},[i("svg",{staticClass:"icon icon-32",attrs:{"aria-hidden":"true"}},[i("use",{attrs:{"xlink:href":"#icon-f_5"}})])]),i("div",{staticClass:"sys-text"},[i("p",[t._v(t._s(t.$t("singPassLogin.mainText5"))+"\n                "),i("span",{staticClass:"u-8-cl"},[t._v("\n                "+t._s(t.$t("singPassLogin.mainText6")))])]),i("p",[t._v(t._s(t.$t("singPassLogin.mainText7")))])])])]),i("div",{staticClass:"dow-singpass-app"},[t._v("\n          "+t._s(t.$t("singPassLogin.mainText8"))+"\n          "),i("span",{staticClass:"u-8-cl",on:{click:t.goDow}},[t._v(t._s(t.$t("singPassLogin.mainText9")))])])])]),i("c-dialog",{staticClass:"selselogintype-dialog",attrs:{showFlag:t.assDialogFlag,paddingBottom:"14px",confirmLoading:t.assDialogConfirmLoading,confirmDisabled:t.assDialogConfirmDisabled,titleText:t.titleText},on:{close:t.dialogClosetwo,confirm:t.assDialogConfirm}},[i("div",[i("p",{staticClass:"b-7-cl"},[i("svg",{staticClass:"icon icon-16",staticStyle:{float:"left"},attrs:{"aria-hidden":"true"}},[i("use",{attrs:{"xlink:href":"#icon-c_2"}})]),t._v("\n        "+t._s(t.$t("singPassLogin.mainText10"))+"\n        ")]),i("div",{staticClass:"singPass-login-content b-1-cl"},[i("div",{staticClass:"ass-item a-4-bg u-8-bd",on:{click:function(e){return t.singPassLogin(1)}}},[t._v("\n            "+t._s(t.$t("singPassLogin.mainText11"))+"\n        ")]),i("div",{staticClass:"ass-item a-4-bg u-8-bd",on:{click:function(e){return t.singPassLogin(2)}}},[t._v("\n          "+t._s(t.$t("singPassLogin.mainText12"))+"\n        ")])])])])],1)}),h=[],d={name:"singPassLogin",data:function(){return{ko64:a["u"].ko6_4,dialogFlag:!1,dialogConfirmLoading:!1,dialogConfirmDisabled:!1,dialoghaveOption:!1,assDialogFlag:!1,assDialogConfirmLoading:!1,assDialogConfirmDisabled:!1,isShowRefresh:!1,sTime:0,setInterval:null,clientId:"ECXX",clientCodeRequestUrl:null,redirectUri:null}},props:{isShow:{default:!0,type:Boolean}},watch:{thirdPartyLoginData:function(t){null!==t&&"success"===t.text&&(this.dialogFlag=!0,this.clientId=t.data.client_id,this.clientCodeRequestUrl=t.data.client_code_request_url,this.redirectUri=t.data.redirect_uri,this.initSingPass())}},computed:{titleText:function(){return this.$t("singPassLogin.mainText2")},singPassCode:function(){return this.$route.query.code},singpassState:function(){return this.$route.query.state},singpassSource:function(){return this.$route.query.source},thirdPartyLoginData:function(){return this.$store.state.baseData.thirdPartyLoginData},domainName:function(){return window.location.origin}},methods:{init:function(){Object(a["s"])("../../static/js/jquery-3.3.1.min.js").then((function(){Object(a["s"])("https://saml.singpass.gov.sg/spcpextrest/resources/js/spcp-pvt-qr-v1.0.0.js").then((function(){}))})),this.singPassCode&&this.singpassState&&!this.singpassSource&&this.singPassRelation()},singPassRelation:function(){var t=this;this.axios({url:"thirdPartLogin/singPassRelation",method:"post",header:{},params:{singPassCode:this.singPassCode}}).then((function(e){"0"===e.code.toString()?1===e.data.exitSingPass?(Object(a["B"])("token",e.data.token),t.$bus.$emit("tip",{text:t.$t("login.loginSuccess"),type:"success"}),t.$store.dispatch("getUserInfo"),t.getMySymbol(),t.$router.push("/")):(t.singPassCode=e.data.singPassCode,t.assDialogFlag=!0):t.$bus.$emit("tip",{text:e.msg,type:"error"})})).catch((function(){}))},refreshHandler:function(){window.SPCPQR.refresh(),this.isShowRefresh=!1,this.setsTime()},initSingPass:function(){var t=this;this.sTime=0,this.isShowRefresh=!1,setTimeout((function(){window.SPCPQR.init("qr_wrapper",{state:(new Date).getTime(),nonce:(new Date).getTime(),clientId:t.clientId,responseType:"code",redirectUri:"".concat(t.redirectUri),scope:"openid"},t.refreshHandler),t.setsTime()}))},accountLogin:function(){var t=(new Date).getTime(),e=(new Date).getTime(),i=this.clientId,n="code",s="openid",o="".concat(this.clientCodeRequestUrl,"?response_type=").concat(n,"&scope=").concat(s,"&client_id=").concat(i,"&nonce=").concat(e,"&state=").concat(t,"&redirect_uri=").concat(this.redirectUri);window.open(o)},goDow:function(){window.open("https://singpassmobile.sg/")},dialogClose:function(){this.dialogFlag=!1},dialogClosetwo:function(){this.assDialogFlag=!1,this.$router.push("login")},dialogConfirm:function(){},assDialogConfirm:function(){},setsTime:function(){var t=this;clearInterval(this.setInterval),this.sTime=0,this.setInterval=setInterval((function(){t.sTime+=1,t.sTime>=120&&(t.isShowRefresh=!0,clearInterval(t.setInterval))}),1e3)},singPassLogin:function(t){this.assDialogFlag=!1,1===t?this.$router.push("register?singPassCode=".concat(this.singPassCode,"&singPassState=").concat(this.singpassState)):this.$bus.$emit("setLoginMode","SingPass")}}},f=(i("d0ac"),{mixins:[d],mounted:function(){this.init()}}),p=f,m=i("2877"),v=Object(m["a"])(p,g,h,!1,null,null,null),b=v.exports,y={mixins:[u],components:{singPassLogin:b},mounted:function(){this.init()}},C=y,$=Object(m["a"])(C,n,s,!1,null,null,null);e["default"]=$.exports},d0ac:function(t,e,i){},d2c8:function(t,e,i){var n=i("aae3"),s=i("be13");t.exports=function(t,e,i){if(n(e))throw TypeError("String#"+i+" doesn't accept regex!");return String(s(t))}},dcbc:function(t,e,i){var n=i("2aba");t.exports=function(t,e,i){for(var s in e)n(t,s,e[s],i);return t}},e0b8:function(t,e,i){"use strict";var n=i("7726"),s=i("5ca1"),o=i("2aba"),r=i("dcbc"),a=i("67ab"),c=i("4a59"),l=i("f605"),u=i("d3f4"),g=i("79e5"),h=i("5cc5"),d=i("7f20"),f=i("5dbc");t.exports=function(t,e,i,p,m,v){var b=n[t],y=b,C=m?"set":"add",$=y&&y.prototype,x={},_=function(t){var e=$[t];o($,t,"delete"==t||"has"==t?function(t){return!(v&&!u(t))&&e.call(this,0===t?0:t)}:"get"==t?function(t){return v&&!u(t)?void 0:e.call(this,0===t?0:t)}:"add"==t?function(t){return e.call(this,0===t?0:t),this}:function(t,i){return e.call(this,0===t?0:t,i),this})};if("function"==typeof y&&(v||$.forEach&&!g((function(){(new y).entries().next()})))){var T=new y,P=T[C](v?{}:-0,1)!=T,k=g((function(){T.has(1)})),w=h((function(t){new y(t)})),L=!v&&g((function(){var t=new y,e=5;while(e--)t[C](e,e);return!t.has(-0)}));w||(y=e((function(e,i){l(e,y,t);var n=f(new b,e,y);return void 0!=i&&c(i,m,n[C],n),n})),y.prototype=$,$.constructor=y),(k||L)&&(_("delete"),_("has"),m&&_("get")),(L||P)&&_(C),v&&$.clear&&delete $.clear}else y=p.getConstructor(e,t,m,C),r(y.prototype,i),a.NEED=!0;return d(y,t),x[t]=y,s(s.G+s.W+s.F*(y!=b),x),v||p.setStrong(y,t,m),y}},f605:function(t,e){t.exports=function(t,e,i,n){if(!(t instanceof e)||void 0!==n&&n in t)throw TypeError(i+": incorrect invocation!");return t}}}]);