function _slicedToArray(arr,i){return _arrayWithHoles(arr)||_iterableToArrayLimit(arr,i)||_unsupportedIterableToArray(arr,i)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(o,minLen){if(!o)return;if(typeof o==="string")return _arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);if(n==="Object"&&o.constructor)n=o.constructor.name;if(n==="Map"||n==="Set")return Array.from(o);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _arrayLikeToArray(o,minLen)}function _arrayLikeToArray(arr,len){if(len==null||len>arr.length)len=arr.length;for(var i=0,arr2=new Array(len);i<len;i++){arr2[i]=arr[i]}return arr2}function _iterableToArrayLimit(arr,i){var _i=arr==null?null:typeof Symbol!=="undefined"&&arr[Symbol.iterator]||arr["@@iterator"];if(_i==null)return;var _arr=[];var _n=true;var _d=false;var _s,_e;try{for(_i=_i.call(arr);!(_n=(_s=_i.next()).done);_n=true){_arr.push(_s.value);if(i&&_arr.length===i)break}}catch(err){_d=true;_e=err}finally{try{if(!_n&&_i["return"]!=null)_i["return"]()}finally{if(_d)throw _e}}return _arr}function _arrayWithHoles(arr){if(Array.isArray(arr))return arr}var currentData=[];var pYname=null;var aYname="";var setEchartsData=function setEchartsData(dataList,type,currentSymbol){var volumeFix=currentSymbol.volume;var defaultThreshold=currentSymbol.defaultThreshold||0.1;if(type==="current"){pYname=currentSymbol.name;if(dataList){currentData[0]=Number(dataList.price);currentData[1]=Number(dataList.vol)}return}if(!type){aYname=currentSymbol.name}if(pYname!==aYname)return false;var middlePrice=currentData[0];var j=0;var minval=null;var maxval=null;var yminval=null;var ymaxval=null;var buysArr=[];var asksArr=[];var asksKey=Object.keys(dataList.asks);var buysKey=Object.keys(dataList.buys);if(dataList&&asksKey.length>1||buysKey.length>1){var EachartDat={};var keyArr=Object.keys(dataList);keyArr.forEach(function(key){if(key!=="newData"){var i=0;EachartDat[key]=[];var objItem=dataList[key];var objKeys=key==="asks"?Object.keys(objItem).sort(function(a,b){return a-b}):Object.keys(objItem).sort(function(a,b){return b-a});objKeys.forEach(function(item,index){if(Number(objItem[item][1])!==0){objItem[item][0]=Number(objItem[item][0]);objItem[item][1]=Number(fixD(objItem[item][1]+i,volumeFix));var _objItem$item=_slicedToArray(objItem[item],2);i=_objItem$item[1];EachartDat[key].push(objItem[item])}})}});buysArr=EachartDat.buys.reverse();asksArr=EachartDat.asks;var buyMax=buysArr.length&&buysArr[buysArr.length-1][0]||0;var asksMin=asksArr[0]&&asksArr[0][0]||0;if(!middlePrice||middlePrice===0){middlePrice=(buyMax+asksMin)/2}minval=middlePrice-middlePrice*defaultThreshold;maxval=middlePrice+middlePrice*defaultThreshold;buysArr=buysArr.filter(function(item){return item[0]>=minval});asksArr=asksArr.filter(function(item){return item[0]<=maxval});buysArr.length&&buysArr.unshift([minval,buysArr[0][1]]);asksArr.length&&asksArr.push([maxval,asksArr[asksArr.length-1][1]]);var buySpks=minval===0?0:(middlePrice-minval)/middlePrice;var askSpks=maxval===0?0:(maxval-middlePrice)/middlePrice;var spks=0.15;if(buySpks>spks&&askSpks>spks){spks=buySpks>=askSpks?askSpks:buySpks}else{spks=buySpks>=askSpks?buySpks:askSpks}spks>1&&(spks=1);if(!buysArr.length&&asksArr.length){yminval=asksArr[0][1];ymaxval=asksArr[asksArr.length-1][1]}else if(!asksArr.length&&buysArr.length){yminval=buysArr[buysArr.length-1][1];ymaxval=buysArr[0][1]}else{yminval=buysArr[buysArr.length-1][1]>asksArr[0][1]?asksArr[0][1]:buysArr[buysArr.length-1][1];ymaxval=buysArr[0][1]>asksArr[asksArr.length-1][1]?buysArr[0][1]:asksArr[asksArr.length-1][1]}}return{buysArr:buysArr,asksArr:asksArr,minval:minval,maxval:maxval,yminval:yminval,ymaxval:ymaxval}};