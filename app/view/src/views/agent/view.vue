<template>
  <div class="container">
    <div class="top-wrap">
      <div class="top-content">
        <h4 class="title">{{ userRoleName || $t('agent.title') }}</h4>
        <div class="info">
          <div class="info__item">
            <div class="info__item-num">{{ teamCount || '-' }} <span class="info__item-symbol"></span></div>
            <div class="info__item-text">{{$t('agent.teamNum')}}</div>
          </div>
          <div class="info__item">
            <div class="info__item-num">{{ reward || '-' }} <span class="info__item-symbol">{{backSymbol}}</span></div>
            <div class="info__item-text">{{$t('agent.totalRewards')}}</div>
          </div>
        </div>
      </div>
    </div>
    <!--  -->
    <div class="main-content mining-data">
      <div class="list-tit mining-tit f-2-cl a-3-bd c-3-bg">
        <div v-for="label in labelList" :key="label.labelVar" class="list-tit__item"
          :class="{'list-tit__item-selected': labelVar === label.labelVar }"
          @click="labelClick(label.labelVar)">
          {{ label.labelName }}
        </div>
      </div>

      <c-table
        :colorMap="colorMap"
        :columns="colums"
        :dataList="tableList"
        :loading="loading"
        bodyClasses = 'c-3-bg'
        headClasses = 'c-3-bg'
        :headHeight = 50
      />
      <c-pagination
        v-if="total/pageSize > 1"
        :total="total"
        classes="c-3-bg"
        :current-page="pageNum"
        :display="pppageSize"
        @pagechange="pagechange">
      </c-pagination>
    </div>
  </div>
</template>

<script>
import mixin from '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/broker/view/view';
// import '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/broker/view/view.styl';

export default {
  mixins: [mixin],
  name: 'agentView',
  components: {

  },
  data: () => ({
    teamCount: '', // 团队人数
    reward: '', // 累计奖励
    userRoleName: '', // 合伙人
    backSymbol: '',
    labelList: [],
    labelVar: 'TEAM-SUBSIDIARY',
    dataList: [],
    loading: false,
    pageNum: 1,
    pageSize: 10,
    total: 0,
  }),
  computed: {
    tableList() {
      if (this.dataList && this.dataList.length) {
        const dataArr = [];
        if (this.labelVar === 'TEAM-SUBSIDIARY') {
          this.dataList.forEach((item) => {
            dataArr.push({
              id: item.registerTime,
              data: [
                item.nickName,
                item.registerTime,
                item.account,
                item.authStatus == 1 ? this.$t('agent.authed') : this.$t('agent.unAuth'),
                item.teamNum,
                `${item.holdAmount} ${item.holdSymbol}`,
              ],
            });
          });
        } else if (this.labelVar === 'COMMISSION-RECORD') {
          this.dataList.forEach((item) => {
            dataArr.push({
              id: item.id,
              data: [
                item.account,
                item.tradeTime,
                item.tradeUId,
                `${item.backAmount} ${item.backSymbol}`,
              ],
            });
          });
        }
        return dataArr;
      }
      return [];
    },
    colums() {
      let arr = [];
      if (this.labelVar === 'TEAM-SUBSIDIARY') {
        arr = [
          { title: this.$t('agent.nickName'), width: '150px' },
          { title: this.$t('agent.regTime'), width: '150px' },
          { title: this.$t('agent.account'), width: '200px' },
          { title: this.$t('agent.authStatus'), width: '150px' },
          { title: this.$t('agent.teamNum'), width: '150px' },
          { title: this.$t('agent.holdAmount') },
        ];
      } else if (this.labelVar === 'COMMISSION-RECORD') {
        arr = [
          { title: this.$t('agent.id'), width: '200px' },
          { title: this.$t('agent.tradeTime'), width: '200px' },
          { title: this.$t('agent.tradeUID'), width: '200px' },
          { title: this.$t('agent.backAmount') },
        ];
      }
      return arr;
    },
  },
  mounted() {
    this.getLabel();
    this.getBaseInfo();
  },
  methods: {
    getLabel() {
      this.axios({
        url: 'agent/labelList',
        hostType: 'agent',
        params: {},
        method: 'post',
      }).then((data) => {
        if (data.code === '0') {
          // console.log(data)
          this.labelList = data.data.sort((a, b) => a.sort - b.sort);
          this.labelVar = this.labelList[0].labelVar;
          this.getList();
        }
      });
    },

    getBaseInfo() {
      this.axios({
        url: 'agent/baseInfo',
        hostType: 'agent',
        method: 'post',
      }).then((data) => {
        if (data.code === '0') {
          // console.log(data)
          if (data.data.attributeMap.length > 1) {
            this.teamCount = data.data.attributeMap[0]['团队人数'];
            this.reward = data.data.attributeMap[1]['累计奖励'];
          }
          this.userRoleName = data.data.userRoleName;
          this.backSymbol = data.data.backSymbol;
        }
      });
    },

    getList() {
      const params = {};
      this.loading = true;
      this.axios({
        url: 'agent/list',
        hostType: 'agent',
        params: {
          pageSize: this.pageSize,
          pageNum: this.pageNum,
          labelVar: this.labelVar,
        },
        method: 'post',
      }).then((data) => {
        if (data.code === '0') {
          this.pageNum = parseInt(data.data.pageNum) || 1;
          this.total = parseInt(data.data.total);
          this.dataList = data.data.data;
        }
        this.loading = false;
      });
    },

    labelClick(labelVar) {
      this.labelVar = labelVar;
      this.pageNum = 1;
      this.getList();
    },

    pagechange(num) {
      this.pageNum = num;
      this.getList();
    },
  },
};
</script>

<style scoped>
.top-wrap{
  background: url("https://chaindown-oss.oss-cn-hongkong.aliyuncs.com/static/1/images/90c51538c13c6e94858d447db23ea83d.png") center bottom no-repeat rgb(16, 15, 16);
  background-size: cover;
}
.top-content{
  color: #EDF4F8;
  padding: 70px 0;
}
.top-content, .main-content{
  margin: 0 auto;
  width: 1180px;
}
.main-content{
  margin-top: 40px;
  background: rgba(12,12,8,0.5);
}
.title{
  text-align: center;
  font-size: 32px;
  width: 1180px;
  margin: 0 auto;
  color: #FFFFFF;
}
.info{
  display: flex;
  justify-content: center;
  margin: 50px 0 20px;
}
.info__item{
  min-width: 180px;
  height: 70px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-left: 1px solid #293448;
  padding-left: 20px;
}
.info__item-num{
  font-size: 32px;
}
.info__item-symbol{
  font-size: 14px;
}
.info__item-text{
  color: #828EA1;
  font-size: 14px;
}

.list-tit{
  height: 54px;
  line-height: 51px;
  padding: 0 20px;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  background: rgba(18,18,16,0.5);

}
.list-tit__item-selected{
  border-bottom-width: 2px;
  border-bottom-style: solid;
  border-color: #F39800;
  color:#EDF4F8;
}
.list-tit__item{
  display: inline-block;
  font-size: 14px;
  margin-right: 50px;
  height: 51px;
  user-select: none;
  cursor: pointer;
}
/deep/ .c-3-bg{
 background-color: #0c0c08;
}
/deep/ .a-3-bd {
  border-color: #212121;
}
/deep/.b-2-cl {
  color: #999999;
}
/deep/.f-2-cl{
  color: #999999;
}
</style>