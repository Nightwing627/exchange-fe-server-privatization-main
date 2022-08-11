import Vue from 'vue';
import Vuex from 'vuex';
import axios from '@/api/http/axios';
import { getComplexType } from '@knoxexchange/blockchain-ui-privatization//utils';
import {
  baseData,
  url,
  personal,
  ordercenter,
  assets,
  regExp,
  tradeOrderList,
  fiatdeal,
  trade,
} from '@knoxexchange/blockchain-ui-privatization/PC/vuex';

// 网格
tradeOrderList.actions.getOrderListData = function getOrderListData({ commit }, data) {
  const headers = {};
  if (data.auto) {
    headers['exchange-auto'] = '1';
  }
  axios({
    url: data.url,
    method: 'post',
    hostType: data.hostType || '',
    headers,
    params: data.params,
  }).then((rs) => {
    if (rs.code.toString() === '0') {
      const rep = rs;
      rep.data.orderType = data.orderType;
      commit('ORDER_LIST_DATA', rep.data);
      // if (data.orderType === 1) {
      //   commit('ORDER_LIST_DATA', rs.data);
      // } else {
      //   commit('HISTORY_DATA', rs.data);
      // }
    }
  });
};

assets.actions.assetsExchangeData = function assetsExchangeData({ commit }, payLoad) {
  let auto = false;
  let coinSymbols = '';
  if (getComplexType(payLoad) === 'Object') {
    // eslint-disable-next-line prefer-destructuring
    auto = payLoad.auto;
    // eslint-disable-next-line prefer-destructuring
    coinSymbols = payLoad.coinSymbols;
  } else {
    auto = payLoad;
  }

  const headers = {};
  if (auto) {
    headers['exchange-auto'] = '1';
  }
  axios({
    url: 'finance/v4/account_balance',
    headers,
    params: { coinSymbols },
  }).then((data) => {
    if (data.code.toString() === '0') {
      if (coinSymbols) {
        commit('assetsCoin', data.data);
      } else {
        commit('assetsExchangeData', data.data);
      }
    }
  });
};
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    website: 'ex',
  },
  mutations: {},
  actions: {},
  modules: {
    baseData,
    url,
    personal,
    ordercenter,
    assets,
    regExp,
    tradeOrderList,
    fiatdeal,
    trade,
  },
});
