(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7a49acd6"],{"0f8a":function(t,i,e){},4982:function(t,i,e){"use strict";e.r(i);var s=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("section",{staticClass:"initQuestions"},[e("div",{staticClass:"title f-1-cl a-3-bd"},[t._v(t._s(t.$t("questions.send")))]),e("div",{staticClass:"content"},[e("c-select",{attrs:{promptText:t.$t("questions.type"),options:t.typeList,value:t.type},on:{onChanges:t.changeType}}),e("c-textAreaLine",{attrs:{name:"leavingText",maxLength:"500",marginTop:"20px",width:"380px",value:t.leavingText,errorHave:!0,warningText:t.leavingText.length+"/500",promptText:t.$t("questions.mess")},on:{onchanges:t.inputLineChange}}),e("div",{staticClass:"uploadImg a-4-bg a-2-bd"},[t.imgLoading?e("div",{staticClass:"uploadLoading"},[e("c-loading",{attrs:{size:"34"}}),e("p",{staticClass:"uploadMark-text u-8-cl"},[t._v(t._s(t.$t("questions.upload4")))])],1):e("div",{staticClass:"uploadMark"},[e("div",[e("svg",{staticClass:"icon icon-24",attrs:{"aria-hidden":"true"}},[e("use",{attrs:{"xlink:href":"#icon-e_9"}})])]),e("p",{staticClass:"uploadMark-text u-8-cl"},[t._v("\n          "+t._s(t.imgUrl?t.$t("questions.upload1"):t.$t("questions.upload2"))+"\n        ")]),e("p",{staticClass:"uploadMark-mess"},[t._v(t._s(t.$t("questions.upload3")))])]),e("c-oldUploadFile",{attrs:{className:"upload_file",name:"questionsImg",url:"common/upload_img",isOpenUploadImg:t.isOpenUploadImg,expand:[],imageType:t.imageType},on:{tellMessage:t.onChangeFileFun,uploadFinish:t.uploadFinish}}),t.imgUrl.length?e("div",{staticClass:"b-2-bg imgmk"}):t._e(),t.imgUrl.length?e("img",{staticClass:"upload-image",attrs:{src:t.imgUrl,alt:""}}):t._e()],1),e("c-button",{attrs:{marginTop:"40px",height:"40px",disabled:t.buttonDisabled,loading:t.buttonLoading,paddingW:"32px"},on:{click:t.submit}},[t._v(t._s(t.$t("questions.summit")))])],1)])},a=[],n=(e("ac6a"),e("f3e2"),e("6b54"),e("87b3"),{name:"initQuestions",data:function(){return{typeList:[],type:"",leavingText:"",imageType:"2",imgUrl:"",imgLoading:!1,imageDataStr:"",buttonLoading:!1}},computed:{buttonDisabled:function(){var t=!0;return(this.type.length&&this.leavingText.length||this.buttonLoading)&&(t=!1),t},isOpenUploadImg:function(){var t=this.$store.state.baseData.publicInfo,i="0";return t&&t.switch&&t.switch.is_open_upload_img&&"1"===t.switch.is_open_upload_img.toString&&(i="1"),i}},methods:{init:function(){this.initTypeList()},onChangeFileFun:function(){this.imgLoading=!0},uploadFinish:function(t){t.error?this.$bus.$emit("tip",{text:t.error,type:"error"}):(this.imgUrl=t.url,this.imgLoading=!1,this.imageDataStr=t.fileName)},initTypeList:function(){var t=this;this.axios({url:"question/problem_tip_list"}).then((function(i){if("0"===i.code.toString()){var e=[];i.data.rqTypeList.forEach((function(t){e.push({value:t.value,code:t.code.toString()})})),t.typeList=e}else t.$bus.$emit("tip",{text:i.msg,type:"error"})}))},inputLineChange:function(t){this.leavingText=t},changeType:function(t){this.type=t.code},submit:function(){var t=this;this.buttonLoading=!0,this.axios({url:"question/create_problem",params:{imageDataStr:this.imageDataStr.length?this.imageDataStr:void 0,rqDescribe:this.leavingText,rqType:this.type}}).then((function(i){t.buttonLoading=!1,"0"===i.code.toString()?(t.$bus.$emit("tip",{text:i.msg,type:"success"}),t.$router.push("/questions/list")):t.$bus.$emit("tip",{text:i.msg,type:"error"})}))}}}),o=(e("0f8a"),{mixins:[n],mounted:function(){this.init()}}),l=o,u=e("2877"),r=Object(u["a"])(l,s,a,!1,null,null,null);i["default"]=r.exports}}]);