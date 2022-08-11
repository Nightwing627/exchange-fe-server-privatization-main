<template>
  <div class="notice-info clearfix">
    <!-- <c-pageBanner :title="$t('message.mesage')" className="d-1-bg"></c-pageBanner> -->
    <div class="main-content">
      <div class="menu">
        <h3 class="menu-tit f-1-cl">{{$t('message.mesage')}}</h3>
        <ul class="f-2-cl">
          <li
            v-for="(item, index) in sideList"
            :key="index"
            :class = "{'f-1-cl c-4-bg' : messageType === item.tid}"
            @click="switchType(item.tid, item.title)"
            class="menu-item">
              {{item.title}}
          </li>
        </ul>
      </div>
      <div class="content-box">
        <div class="content-list c-4-bg">
          <h1 class="content-title f-1-cl c-5-bd">{{title}}</h1>
          <ul class="message-list" v-if="notieContent.length">
            <li class="all-select c-5-bd">
              <i class="status">
                <c-checkBox
                  :value="dataListId.length === selectArr.length"
                  @click="checkoutSelect('all')" />
              </i>
              <div class="message-text">
                <div class="main-text f-2-cl">
                  <!-- 全选 -->
                  {{$t('message.selectAll')}}
                </div>
              </div>
              <c-button
                type = 'text'
                className="delete-btn"
                marginTop = "0"
                @click="deleteMsg(selectArr, 'all')">
                <!-- 删除 -->
                {{$t('message.delete')}}
              </c-button>
              <c-button
                type = 'text'
                className="delete-btn"
                marginTop = "0"
                @click="onChangeRead(0, 'all')">
                <!-- 全部标记为已读 -->
                {{$t('message.readAll')}}
              </c-button>
            </li>
            <li class="c-5-bd"
                :key="index"
                v-for="(item, index) in notieContent">
                <i class="status">
                <c-checkBox
                  :value="selectArr.indexOf(item.id) !== -1"
                  @click="checkoutSelect(item.id)"/>
              </i>
              <div class="message-text">
                <div
                  @click="onChangeRead(item.id, index)"
                  :class="item.status === 1 ? 'f-1-cl' : 'f-2-cl'"
                  v-html ="item.messageContent">
                </div>
                <p class="time f-2-cl">{{formatTimeFn(item.ctime)}}</p>
              </div>
              <c-button
                type = 'text'
                marginTop = "5px"
                className="delete-btn"
                @click="deleteMsg(item.id, index)">
                <!-- 删除 -->
                {{$t('message.delete')}}
              </c-button>
            </li>
          </ul>
          <div v-else class="no-data f-2-cl">
            <svg class="icon icon-50" aria-hidden="true">
              <use xlink:href="#icon-g_2"></use>
            </svg>
            <p>
              <!-- 暂无数据 -->
              {{$t('common.notData')}}
            </p>
          </div>
          <transition name="fade">
            <div v-show="isshowLoading" class="loading">
              <c-loading size="50" />
            </div>
          </transition>
          <c-pagination v-if="(pagination.count/pagination.pageSize) > 1"
                :total="pagination.count"
                classes="c-3-bg"
                :current-page='pagination.page'
                :display='pagination.pageSize'
                @pagechange="pagechange">
        </c-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import mixin from '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/message/message';
import '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/message/message.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
