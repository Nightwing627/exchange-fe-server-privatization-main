<template>
    <div class="broker-system">
      <div class="broker-system-header a-3-bd clearfix">
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
      <div class="broker-user-info a-7-bd" :style="customStyle">
        <!-- 用户名称 -->
        <div class="user-name">
          <div class="top b-2-cl">{{$t('assets.coAccount.accountRight')}}</div>
          <div class="phone b-1-cl">{{ userName }}</div>
        </div>
        <!-- 直推返佣 -->
        <div class="user-text a-4-bg">
          <span class="title b-2-cl">{{$t('brokerSystem.homeText[1]')}}</span>
          <span class="info b-1-cl">{{ scaleReturn }}</span>
        </div>
        <!-- 子经济分佣 -->
        <div class="user-text a-4-bg">
          <span class="title b-2-cl">{{$t('brokerSystem.homeText[2]')}}</span>
          <span class="info b-1-cl">{{ scaleSub }}</span>
        </div>
        <!-- 推广助手 -->
        <c-button
          class="invite-help b-4-cl"
          @click="currentType({index:5})"
          type="text">
          {{$t('brokerSystem.navTab[4]')}}
        </c-button>
      </div>
      <div class="broker-content">
        <overview v-show="currentTab===1" :reqData="reqData"
          :reqReady="reqReady"/>
        <Commission v-if="currentTab===2"/>
        <Lower v-if="currentTab===3"/>
        <TradeSearch v-if="currentTab===4"/>
        <Invite v-if="currentTab===5"/>
      </div>
    </div>
</template>

<script>
import mixin from '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/personal/brokerSystem/index/index';
import '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/personal/brokerSystem/index/index.styl';
import overview from './overview.vue';
import Commission from './commission.vue';
import Lower from './lower.vue';
import TradeSearch from './tradeSearch.vue';
import Invite from './invite.vue';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
  components: {
    Commission,
    Lower,
    TradeSearch,
    Invite,
    overview,
  },
};
</script>
