
import Vue from 'vue';
import BlockChainUI from '@knoxexchange/blockchain-ui-privatization/PC/components';
import vuescroll from 'vuescroll/dist/vuescroll-native';
import { colorMap, getCoinShowName } from '@/utils';
import bus from '@/api/bus';
import { i18n } from '@/locale';
import App from './App.vue';
import router from '../../router/ex-router';
import store from '../../vuex/ex-index';
import axios from '../../api/http/axios';
import '@knoxexchange/blockchain-ui-privatization/static/css/common.styl';


window.HOSTAPI = 'ex';
Vue.use(vuescroll, {
  ops: {
    rail: {
      opacity: '1',
      background: colorMap['c-5-bd'],
      size: '4px',
      gutterOfSide: '0px',
    },
    bar: {
      background: colorMap['a-2-bg'],
      keepShow: true,
      size: '4px',
      minSize: 0.2,
    },
    scrollPanel: {
      easing: 'easeInQuad',
      speed: 800,
    },
  },
});
Vue.use(BlockChainUI);


Vue.config.productionTip = false;
Vue.prototype.axios = axios;
Vue.prototype.$bus = bus;

// Vue.prototype.getCoinShowName = (name) =>{
//   const coinList = this.$store.state.baseData.symbolAll;
//   if (coinList && coinList[name]) {
//     return coinList[name.toUpperCase()].showName || name;
//   }
//   return name;
// }

Vue.filter('getCoinShowName', (name, coinList) => getCoinShowName(name, coinList));

new Vue({
  i18n,
  router,
  store,
  render: h => h(App),
}).$mount('#app');
