(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-09b22fc8"],{1603:function(t,i,n){},b749:function(t,i,n){"use strict";n.r(i);var a=function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("div",{staticClass:"mining home-bg"},[n("div",{staticClass:"top-content",style:t.backgroundImg},[n("div",{staticClass:"warp"},[n("h2",{staticClass:"page-title f-8-cl"},[t._v("\n        "+t._s(t.$t("mining.minings"))+"\n      ")]),n("div",{staticClass:"my-minning-pct"},[n("p",{staticClass:"tit f-9-cl"},[n("span",[t._v("\n            "+t._s(t.$t("mining.already_output"))+"\n          ")]),n("span",{staticClass:"f_r"},[t._v("\n            "+t._s(t.$t("mining.dividend_total_amount"))+"\n          ")])]),n("div",{staticClass:"pct-bar c-10-bg"},[n("div",{staticClass:"pct c-8-bg",style:{width:t.speed+"%"}})]),n("p",{staticClass:"num f-8-cl"},[n("span",[t._v("\n            "+t._s(t.fixDFun(t.myData.total_return_number,t.myData.coin))+"\n            "+t._s(t._f("getCoinShowName")(t.myData.coin,t.coinList))+"\n          ")]),n("span",{staticClass:"f_r"},[t._v("\n            "+t._s(t.fixDFun(t.myData.dividend_total_amount,t.myData.coin))+"\n            "+t._s(t._f("getCoinShowName")(t.myData.coin,t.coinList))+"\n          ")])])]),n("div",{staticClass:"wk-info"},[n("div",{staticClass:"item-box"},[n("div",{staticClass:"box-bar c-9-bd"},[n("p",{staticClass:"name f-8-cl"},[t._v("\n              "+t._s(t.fixDFun(t.myData.today_return_number,t.myData.coin))+"\n              "+t._s(t._f("getCoinShowName")(t.myData.coin,t.coinList))+"\n            ")]),n("p",{staticClass:"txt f-9-cl"},[t._v("\n              "+t._s(t.$t("mining.distribution"))+"\n            ")])])]),n("div",{staticClass:"item-box"},[n("div",{staticClass:"box-bar c-9-bd"},[n("p",{staticClass:"name f-8-cl"},[t._v("\n              "+t._s(t.fixDFun(t.myData.today_dividend_number,"BTC"))+"\n              BTC\n            ")]),n("p",{staticClass:"txt f-9-cl"},[t._v("\n              "+t._s(t.$t("mining.dividend_income"))+"\n            ")])])]),n("div",{staticClass:"item-box"},[n("div",{staticClass:"box-bar c-9-bd"},[n("p",{staticClass:"name f-8-cl"},[t._v("\n              "+t._s(t.fixDFun(t.myData.yesterday_return_number,t.myData.coin))+"\n              "+t._s(t._f("getCoinShowName")(t.myData.coin,t.coinList))+"\n            ")]),n("p",{staticClass:"txt f-9-cl"},[t._v("\n              "+t._s(t.$t("mining.mining_output"))+"\n            ")])])]),n("div",{staticClass:"item-box"},[n("div",{staticClass:"box-bar c-9-bd"},[n("p",{staticClass:"name f-8-cl"},[t._v("\n              "+t._s(t.fixDFun(t.myData.yesterday_dividend_number,"BTC"))+"\n              BTC\n            ")]),n("p",{staticClass:"txt f-9-cl"},[t._v("\n              "+t._s(t.$t("mining.distribution_yesterday"))+"\n            ")])])])])])]),n("div",{staticClass:"warp main-content"},[n("div",{staticClass:"my-harvest c-4-bg"},[this.isLogin&&t.isInviteOpen?n("div",{staticClass:"mian-nav c-5-bd"},[n("c-navTab",{attrs:{activeClassName:"f-1-cl",activeColor:"c-8-bg",className:"f-2-cl",currentTab:t.currentTab,navTab:t.navTab,lineHeight:t.lineHeight,marginRight:t.marginRight},on:{currentType:t.currentType}})],1):t._e(),this.isLogin?t._e():n("div",{staticClass:"tit f-1-cl"},[t._v("\n        "+t._s(t.$t("mining.my_earnings"))+"\n      ")]),1===this.currentTab?n("div",{staticClass:"div-earnings"},[n("div",{staticClass:"sy-num clearfix"},[t.myData.userTotalBackAmount?n("span",{staticClass:"f-1-cl"},[t._v("\n            "+t._s(t.fixDFun(t.myData.userTotalBackAmount,t.myData.coin))+"\n          ")]):n("span",{staticClass:"f-1-cl"},[t._v("0")]),n("b",{staticClass:"f-2-cl"},[t._v(t._s(t._f("getCoinShowName")(t.myData.coin,t.coinList)))]),n("p",{staticClass:"f-2-cl"},[t._v("\n            "+t._s(t.$t("mining.total_earnings"))+"\n          ")])]),n("div",{staticClass:"tt-num clearfix"},[n("div",{staticClass:"tt-i c-5-bd"},[n("span",{staticClass:"t f-2-cl"},[t._v("\n              "+t._s(t.$t("mining.total_out"))+"\n            ")]),n("span",{staticClass:"n f-1-cl"},[t._v("\n              "+t._s(t.fixDFun(t.myData.total_return_number,t.myData.coin))+"\n              "+t._s(t._f("getCoinShowName")(t.myData.coin,t.coinList))+"\n            ")])])])]):t._e(),2===this.currentTab?n("div",{staticClass:"center"},[n("div",{staticClass:"center-main"},[n("div",[n("p",{staticClass:"f-2-cl"},[t._v(t._s(t.$t("personal.inviteCodeManagement.showNumber")))]),n("p",{staticClass:"f-1-cl"},[t._v(t._s(t.inviteNumber))])]),n("div",[n("p",{staticClass:"f-2-cl"},[t._v(t._s(t.$t("personal.inviteCodeManagement.showCommission")))]),n("p",{staticClass:"f-1-cl"},[t._v(t._s(t.inviteReturnNumber))])])]),n("div",{staticClass:"invitation-way"},[n("p",[t._v(t._s(t.$t("personal.inviteCodeManagement.commissionWay")))]),n("div",{staticClass:"invitation-ways"},[n("div",{staticClass:"a-4-bg"},[n("svg",{staticClass:"icon icon-18",attrs:{"aria-hidden":"true"}},[n("use",{attrs:{"xlink:href":"#icon-b_16"}})]),n("span",[t._v(t._s(t.inviteCode))]),n("span",{on:{click:function(i){return t.copyClick("inviteCode")},mouseenter:function(i){return t.handMouseenter("inviteCode")},mouseleave:function(i){return t.handMouseleave("inviteCode")}}},[t.inviteCodeShow?n("span",[n("svg",{staticClass:"icon icon-14",attrs:{"aria-hidden":"true"}},[n("use",{attrs:{"xlink:href":"#icon-a_9"}})])]):n("span",[n("svg",{staticClass:"icon icon-14",attrs:{"aria-hidden":"true"}},[n("use",{attrs:{"xlink:href":"#icon-a_9_1"}})])])])]),n("div",{staticClass:"a-4-bg"},[n("svg",{staticClass:"icon icon-18",attrs:{"aria-hidden":"true"}},[n("use",{attrs:{"xlink:href":"#icon-b_17"}})]),n("span",[t._v(t._s(t.inviteUrl))]),n("span",{on:{click:function(i){return t.copyClick("inviteUrl")},mouseenter:function(i){return t.handMouseenter("inviteUrl")},mouseleave:function(i){return t.handMouseleave("inviteUrl")}}},[t.inviteUrlShow?n("span",[n("svg",{staticClass:"icon icon-14",attrs:{"aria-hidden":"true"}},[n("use",{attrs:{"xlink:href":"#icon-a_9"}})])]):n("span",[n("svg",{staticClass:"icon icon-14",attrs:{"aria-hidden":"true"}},[n("use",{attrs:{"xlink:href":"#icon-a_9_1"}})])])]),n("a",{staticClass:"inviteQECode-show",attrs:{href:"javascript:;"}},[n("svg",{staticClass:"icon icon-18",attrs:{"aria-hidden":"true"}},[n("use",{attrs:{"xlink:href":"#icon-b_18"}})]),n("div",{staticClass:"center-img b-2-bg"},[n("img",{attrs:{src:t.inviteQECode}})])])])])])]):t._e()]),1===this.currentTab?n("div",{staticClass:"mining-data"},[n("div",{staticClass:"mining-tit f-2-cl c-5-bd c-4-bg"},t._l(t.tabList,(function(i,a){return n("span",{key:a,staticClass:"item",class:{"selected a-12-bd":t.tableType===i.key},on:{click:function(n){return t.switcherType(i.key)}}},[t._v(t._s(i.text))])})),0),n("c-table",{attrs:{imgMap:t.imgMap,colorMap:t.colorMap,columns:t.columns,dataList:t.dataList,classes:"c-4-bg",loading:t.tableLoading,bodyClasses:t.bodyClasses,headClasses:t.headClasses}})],1):t._e(),t.pagination.count/t.pagination.pageSize>1?n("c-pagination",{attrs:{total:t.pagination.count,classes:"c-4-bg","current-page":t.pagination.page,display:t.pagination.pageSize},on:{pagechange:t.pagechange}}):t._e(),2===this.currentTab?n("div",{staticClass:"invite-bonus"},[n("div",{staticClass:"main-table"},[n("p",{staticClass:"main-table-title f-1-cl c-5-bd c-4-bg"},[t._v("\n          "+t._s(t.$t("personal.inviteCodeManagement.commissionRecor")))]),n("c-table",{attrs:{imgMap:t.imgMap,colorMap:t.colorMap,loading:t.loading,classes:"c-5-bg",headClasses:t.headClasses,bodyClasses:t.bodyClasses,lineClasses:t.lineClass,columns:t.columnsBonus,dataList:t.dataListBonus}}),n("c-pagination",{directives:[{name:"show",rawName:"v-show",value:0!==t.count,expression:"count !== 0"}],attrs:{total:t.count,"current-page":t.page,display:t.pageSize},on:{pagechange:t.pagechangeBonus}})],1)]):t._e()],1)])},s=[],e=(n("c5f6"),n("6d67"),n("ac6a"),n("f3e2"),n("95d5")),o={name:"noticeInfo",data:function(){return{currentTab:1,navTab:[{name:this.$t("mining.my_earnings"),index:1},{name:this.$t("mining.invite_bonus"),index:2}],marginRight:50,lineHeight:"48",headClasses:"",bodyClasses:"",tableLoading:!1,backgroundImg:"background: url(".concat(e["u"].jjrNeaderBg,") center bottom no-repeat"),myData:{},tableType:"return_list",pagination:{count:0,pageSize:10,page:1},inviteNumber:"",inviteReturnNumber:"",inviteCode:"",inviteCodeShow:!0,inviteUrlShow:!0,inviteUrl:"",inviteQECode:"",inviteQECodeShow:!1,page:1,pageSize:10,count:0,loading:!0,classes:"",lineClass:"",columnsBonus:[{title:this.$t("personal.inviteCodeManagement.columns")[0],align:"left",width:"200px",classes:""},{title:this.$t("personal.inviteCodeManagement.columns")[1],align:"center",width:""}],imgMap:e["u"],colorMap:e["c"],dataListBonus:[],isInviteOpen:!0}},watch:{isLogin:function(t){t&&this.getData()},inviteInfoList:function(t){null!==t&&(this.loading=!1,this.inviteNumber=t.invite_number,this.count=Number(t.invite_number),this.inviteReturnNumber=t.invite_return_number,this.inviteCode=t.inviteCode,this.inviteQECode=t.inviteQECode,this.inviteUrl=t.inviteUrl,this.processData(t.invite_list))},publicInfo:function(t){null!==t&&(1===Number(t.switch.is_invite_open)?this.isInviteOpen=!0:this.isInviteOpen=!1)}},computed:{coinList:function(){return this.$store.state.baseData.market?this.$store.state.baseData.market.coinList:null},publicInfo:function(){return this.$store.state.baseData.publicInfo},isLogin:function(){return this.$store.state.baseData.isLogin},inviteInfoList:function(){return this.$store.state.personal.inviteInfoList},speed:function(){if(this.myData.total_return_number){var t=this.myData.total_return_number/this.myData.dividend_total_amount*100;return Object(e["f"])(t,2)}return 0},tabList:function(){return[{key:"return_list",text:this.$t("mining.mining_detail")},{key:"dividend_list",text:this.$t("mining.amount_dividends")},{key:"yesterday_dividend_list",text:this.$t("mining.bonus")}]},columns:function(){return"return_list"===this.tableType?[{title:this.$t("mining.time"),width:"100px"},{title:"".concat(this.$t("mining.trader_volume"),"(BTC)"),width:"30%"},{title:"".concat(this.$t("mining.Produce"),"\n            (").concat(Object(e["l"])(this.myData.coin,this.coinList),")"),width:"30%"},{title:this.$t("mining.state"),width:"30%"}]:[{title:this.$t("mining.coin"),width:"100px"},{title:this.$t("mining.platform"),width:"48%"},{title:this.$t("mining.divided"),width:"48%"}]},dataList:function(){var t=this,i=[],n=this.myData[this.tableType];return n&&n.length&&n.forEach((function(n,a){var s={id:"".concat(t.tableType).concat(a)};if("return_list"===t.tableType){var o=0===n.status?t.$t("mining.replaced"):t.$t("mining.Return");s.data=[Object(e["k"])(n.dtime),t.fixDFun(n.return_number_btc,"BTC"),t.fixDFun(n.return_number,t.myData.coin),o]}else s.data=[Object(e["l"])(n.coin,t.coinList),t.fixDFun(n.fee,t.myData.coin),t.fixDFun(n.dividend_number,t.myData.coin)];i.push(s)})),i}},methods:{currentType:function(t){t.index!==this.currentTab&&(this.currentTab=t.index)},fixDFun:function(t,i){return this.showPrecision(i)?Object(e["f"])(t,this.showPrecision(i)):t},showPrecision:function(t){if(this.coinList&&this.coinList[t]){var i=this.coinList[t].showPrecision;if(i)return i}return 4},pagechange:function(t){this.pagination.page=t,this.getData()},getData:function(){var t=this;this.axios({url:this.$store.state.url.common.return_info_list,params:{page:this.pagination.page,pageSize:this.pagination.pageSize},method:"post"}).then((function(i){"0"===i.code&&(t.myData=i.data,"return_list"===t.tableType&&(t.pagination.count=i.data.return_count),"dividend_list"===t.tableType&&(t.pagination.count=i.data.dividend_count),"yesterday_dividend_list"===t.tableType&&(t.pagination.count=i.data.yesterday_dividend_count))}))},switcherType:function(t){this.tableType=t,this.pagination.page=1,this.getData()},copyClick:function(t){"inviteCode"===t?this.copy(this.inviteCode):this.copy(this.inviteUrl)},copy:function(t){function i(i){i.clipboardData.setData("text/plain",t),i.preventDefault()}this.$bus.$emit("tip",{text:this.$t("personal.prompt.copySucces"),type:"success"}),document.addEventListener("copy",i),document.execCommand("copy"),document.removeEventListener("copy",i)},handMouseenter:function(t){"inviteCode"===t?this.inviteCodeShow=!1:this.inviteUrlShow=!1},handMouseleave:function(t){"inviteCode"===t?this.inviteCodeShow=!0:this.inviteUrlShow=!0},processData:function(t){"Array"===Object(e["m"])(t)&&(this.dataListBonus=t.map((function(t){return{data:[Object(e["k"])(t.register_time),t.invitee]}})))},pagechangeBonus:function(t){this.page=t;var i={page:t,pageSize:this.pageSize};this.$store.dispatch("inviteInfoList",i)}}},c=(n("1603"),{mixins:[o],mounted:function(){var t={page:this.page,pageSize:this.pageSize};this.$store.dispatch("inviteInfoList",t);var i=this.$store.state.baseData.publicInfo;i&&1===Number(i.switch.is_invite_open)?this.isInviteOpen=!0:this.isInviteOpen=!1,this.getData()}}),r=c,l=n("2877"),u=Object(l["a"])(r,a,s,!1,null,null,null);i["default"]=u.exports}}]);