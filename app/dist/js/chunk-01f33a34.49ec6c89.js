(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-01f33a34"],{"082c":function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticClass:"b2cRecrgeHis"},[a("c-QRcode",{attrs:{flag:t.QRflag,imgUrl:t.imgUrl},on:{QRcodeClick:t.QRcodeClick}}),a("c-table",{attrs:{colorMap:t.colorMap,loading:t.tabelLoading,columns:t.columns,subContent:t.subTableData,subContentId:t.subTableDataId,subColumns:t.subColumns,dataList:t.tabelList},on:{elementClick:t.tableClick}}),t.paginationObj.total>t.paginationObj.display?a("c-pagination",{attrs:{total:t.paginationObj.total,display:t.paginationObj.display,currentPage:t.paginationObj.currentPage},on:{pagechange:t.pagechange}}):t._e()],1)},s=[],n=(a("6b54"),a("87b3"),a("57e7"),a("ac6a"),a("f3e2"),a("95d5")),o={name:"b2cRecrgeHis",props:{symbol:{default:"",type:String},lately:{default:!1,type:Boolean}},data:function(){return{colorMap:n["c"],revokeList:[],paginationObj:{total:0,display:10,currentPage:1},tabelLoading:!0,tabelList:[],subTableData:[],subTableDataId:null,financeListData:[],imgUrl:"",QRflag:!1}},watch:{symbol:function(t){t&&this.market&&this.getTableList()},market:function(t){t&&this.symbol&&this.getTableList()},paginationObjCurrentPage:function(){this.getTableList()}},computed:{market:function(){return this.$store.state.baseData.market},paginationObjCurrentPage:function(){return this.paginationObj.currentPage},columns:function(){return[{title:this.$t("assets.recharge.RechargeTime"),width:"15%"},{title:this.$t("assets.recharge.RechargeCoin"),width:"10%"},{title:this.$t("assets.b2c.b2cRecrgeHisList1"),width:"18%"},{title:this.$t("assets.b2c.b2cRecrgeHisList2"),width:"18%"},{title:this.$t("assets.withdraw.withdrawStatus"),width:"14%"},{title:this.$t("assets.withdraw.withdrawOptions"),width:"25%"}]},subColumns:function(){return[this.$t("assets.b2c.b2cRecrgeHisList3"),this.$t("assets.b2c.firstWay"),this.$t("assets.b2c.addressUserName")]}},methods:{init:function(){var t=this;this.symbol&&this.market&&this.getTableList(),this.$bus.$on("b2cRecrgeHisGet",(function(){t.tabelLoading=!0,t.paginationObj.currentPage=1,t.getTableList()}))},QRcodeClick:function(){this.QRflag=!1},showPrecision:function(t){var e=0,a=this.$store.state.baseData.market;return a&&a.coinList&&a.coinList[t]&&(e=a.coinList[t].showPrecision),e},pagechange:function(t){this.paginationObj.currentPage=t},tableClick:function(t,e){var a=this;if("revoke"===t){var i={};this.tabelList.forEach((function(t){t.id===e&&(i=t)})),-1===this.revokeList.indexOf(i.id)&&(this.revokeList.push(i.id),this.axios({url:"/fiat/cancel_deposit",headers:{},params:{id:i.id},method:"post"}).then((function(t){var e=a.revokeList.indexOf(i.id);a.revokeList.splice(e,1),"0"===t.code.toString()?(a.getTableList(),a.$bus.$emit("tip",{text:t.msg,type:"success"})):a.$bus.$emit("tip",{text:t.msg,type:"error"})})))}if("subView"===t&&(this.subTableDataId=e.id,this.subTableData=[],this.financeListData.forEach((function(t){t.id===a.subTableDataId&&a.subTableData.push([t.updatedAt?Object(n["k"])(t.updatedAt):"--",a.$t("assets.b2c.bankCard"),t.userName])}))),"seePz"===t){var s={};this.tabelList.forEach((function(t){t.id===e&&(s=t)})),this.imgUrl=s.transferVoucher,this.QRflag=!0}},handleButton:function(t){var e=[];return t.transferVoucher&&e.push({type:"button",text:this.$t("assets.b2c.seePz"),iconClass:[""],eventType:"seePz"}),0===t.status&&e.push({type:"button",text:this.$t("assets.flowingWater.Cancel"),iconClass:[""],eventType:"revoke"}),e.push({type:"subTable",text:this.$t("trade.view"),eventType:"subView"}),e},getTableList:function(){var t=this;this.axios({url:"/fiat/deposit/list",params:{pageSize:this.paginationObj.display,page:this.paginationObj.currentPage,symbol:"all"===this.symbol?void 0:this.symbol}}).then((function(e){if(t.tabelLoading=!1,"0"===e.code.toString()){var a=[];t.financeListData=e.data.financeList,e.data.financeList.forEach((function(e){var i="AIKRW"===e.symbol,s=t.showPrecision(e.symbol);a.push({id:e.id,transferVoucher:e.transferVoucher,data:[Object(n["k"])(e.createdAt),e.symbol,Object(n["f"])(e.amount,s)+(i?" KRW":" ".concat(e.symbol)),"".concat(Object(n["f"])(e.settledAmount,s)," ").concat(e.symbol),e.statusText,t.handleButton(e)]})})),t.tabelList=a,t.paginationObj.total=t.lately&&e.data.count>30?30:e.data.count}}))}}},r=(a("c73d"),{mixins:[o],mounted:function(){this.init()}}),c=r,l=a("2877"),u=Object(l["a"])(c,i,s,!1,null,null,null);e["a"]=u.exports},5248:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticClass:"b2cRecrgeHis"},[a("c-QRcode",{attrs:{flag:t.QRflag,imgUrl:t.imgUrl},on:{QRcodeClick:t.QRcodeClick}}),a("c-table",{attrs:{colorMap:t.colorMap,loading:t.tabelLoading,columns:t.columns,subContent:t.subTableData,subContentId:t.subTableDataId,subColumns:t.subColumns,dataList:t.tabelList},on:{elementClick:t.tableClick}}),t.paginationObj.total>t.paginationObj.display?a("c-pagination",{attrs:{total:t.paginationObj.total,display:t.paginationObj.display,currentPage:t.paginationObj.currentPage},on:{pagechange:t.pagechange}}):t._e()],1)},s=[],n=(a("6b54"),a("87b3"),a("57e7"),a("ac6a"),a("f3e2"),a("95d5")),o={props:{symbol:{default:"",type:String},lately:{default:!1,type:Boolean}},data:function(){return{colorMap:n["c"],revokeList:[],paginationObj:{total:0,display:10,currentPage:1},tabelLoading:!0,tabelList:[],subTableData:[],subTableDataId:null,financeListData:[],imgUrl:"",QRflag:!1}},watch:{symbol:function(t){t&&this.market&&this.getTableList()},market:function(t){t&&this.symbol&&this.getTableList()},paginationObjCurrentPage:function(){this.getTableList()}},computed:{market:function(){return this.$store.state.baseData.market},paginationObjCurrentPage:function(){return this.paginationObj.currentPage},columns:function(){return[{title:this.$t("assets.withdraw.withdrawTime"),width:"15%"},{title:this.$t("assets.recharge.RechargeCoin"),width:"10%"},{title:this.$t("assets.b2c.b2cWithdrawHisList1"),width:"18%"},{title:this.$t("assets.b2c.fee"),width:"18%"},{title:this.$t("assets.withdraw.withdrawStatus"),width:"14%"},{title:this.$t("assets.withdraw.withdrawOptions"),width:"25%"}]},subColumns:function(){return[this.$t("assets.b2c.b2cRecrgeHisList3"),this.$t("assets.b2c.firstWay"),this.$t("assets.b2c.addressUserName")]}},methods:{init:function(){var t=this;this.symbol&&this.market&&this.getTableList(),this.$bus.$on("b2cWithdrawHisGet",(function(){t.tabelLoading=!0,t.paginationObj.currentPage=1,t.getTableList()}))},QRcodeClick:function(){this.QRflag=!1},showPrecision:function(t){var e=0,a=this.$store.state.baseData.market;return a&&a.coinList&&a.coinList[t]&&(e=a.coinList[t].showPrecision),e},pagechange:function(t){this.paginationObj.currentPage=t},tableClick:function(t,e){var a=this;if("revoke"===t){var i={};this.tabelList.forEach((function(t){t.id===e&&(i=t)})),-1===this.revokeList.indexOf(i.id)&&(this.revokeList.push(i.id),this.axios({url:"/fiat/cancel_withdraw",headers:{},params:{id:i.id},method:"post"}).then((function(t){var e=a.revokeList.indexOf(i.id);a.revokeList.splice(e,1),"0"===t.code.toString()?(a.getTableList(),a.$bus.$emit("tip",{text:t.msg,type:"success"}),a.lately&&a.$bus.$emit("getMess")):a.$bus.$emit("tip",{text:t.msg,type:"error"})})))}if("subView"===t&&(this.subTableDataId=e.id,this.subTableData=[],this.financeListData.forEach((function(t){t.id===a.subTableDataId&&a.subTableData.push([t.updatedAt?Object(n["k"])(t.updatedAt):"--",a.$t("assets.b2c.bankCard"),t.userName||"--"])}))),"seePz"===t){var s={};this.tabelList.forEach((function(t){t.id===e&&(s=t)})),this.imgUrl=s.transferVoucher,this.QRflag=!0}},handleButton:function(t){var e=[];return t.transferVoucher&&e.push({type:"button",text:this.$t("assets.b2c.seePz"),iconClass:[""],eventType:"seePz"}),0===t.status&&e.push({type:"button",text:this.$t("assets.flowingWater.Cancel"),iconClass:[""],eventType:"revoke"}),e.push({type:"subTable",text:this.$t("trade.view"),eventType:"subView"}),e},getTableList:function(){var t=this;this.axios({url:"/fiat/withdraw/list",params:{pageSize:this.paginationObj.display,page:this.paginationObj.currentPage,symbol:"all"===this.symbol?void 0:this.symbol}}).then((function(e){if(t.tabelLoading=!1,"0"===e.code.toString()){var a=[];t.financeListData=e.data.financeList,e.data.financeList.forEach((function(e){var i=t.showPrecision(e.symbol);a.push({id:e.id,transferVoucher:e.transferVoucher,data:[Object(n["k"])(e.createdAt),e.symbol,"".concat(Object(n["f"])(e.amount,i)," ").concat(e.symbol),"".concat(Object(n["f"])(e.fee,i)," ").concat(e.symbol),e.statusText,t.handleButton(e)]})})),t.tabelList=a,t.paginationObj.total=t.lately&&e.data.count>30?30:e.data.count}}))}}},r=(a("f555"),{mixins:[o],name:"b2cRecrgeHis",mounted:function(){this.init()}}),c=r,l=a("2877"),u=Object(l["a"])(c,i,s,!1,null,null,null);e["a"]=u.exports},"60db":function(t,e,a){},c73d:function(t,e,a){},f555:function(t,e,a){},f916:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticClass:"page-flowingWater"},[a("div",{staticClass:"flowingWater-nav a-3-bd"},[a("c-navTab",{attrs:{activeClassName:"b-1-cl",activeColor:"a-12-bg",className:"b-2-cl",currentTab:t.nowType,navTab:t.navTab,lineHeight:"55"},on:{currentType:t.currentType}})],1),a("div",{staticClass:"flowingWater-options"},[a("c-select",{attrs:{promptText:t.$t("assets.flowingWater.coin"),value:t.symbol,options:t.symbolList,errorHave:!0,width:"120px",filterable:!0},on:{onChanges:t.symbolChange}})],1),1===t.nowType?a("rechangeTable",{attrs:{symbol:t.symbol}}):t._e(),2===t.nowType?a("withdrawTable",{attrs:{symbol:t.symbol}}):t._e()],1)},s=[],n=(a("ac6a"),a("f3e2"),a("6b54"),a("87b3"),{data:function(){return{nowType:1,symbolList:[],symbol:""}},computed:{navTab:function(){var t=[{name:this.$t("assets.flowingWater.RechargeRecord"),index:1},{name:this.$t("assets.flowingWater.WithdrawalsRecord"),index:2}];return t}},methods:{init:function(){this.getMessage()},symbolChange:function(t){this.symbol=t.code},getMessage:function(){var t=this;this.axios({url:"fiat/balance"}).then((function(e){if("0"===e.code.toString()){var a=[{code:"all",value:t.$t("assets.otcFlowingWater.all")}];e.data.allCoinMap.forEach((function(t){a.push({code:t.symbol,value:t.symbol})})),t.symbol="all",t.symbolList=a}else t.$bus.$emit("tip",{text:e.msg,type:"error"})}))},currentType:function(t){this.nowType=t.index}}}),o=(a("60db"),a("082c")),r=a("5248"),c={mixins:[n],name:"page-flowingWater",components:{rechangeTable:o["a"],withdrawTable:r["a"]},mounted:function(){this.init()}},l=c,u=a("2877"),b=Object(u["a"])(l,i,s,!1,null,null,null);e["default"]=b.exports}}]);