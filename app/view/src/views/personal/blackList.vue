<template>
  <div class="black-list">
    <p class="user-management-child-header b-1-cl a-3-bd">{{$t('personal.blackList.title')}}</p>
    <div class="center clearfix">
      <c-table
        :imgMap="imgMap"
        :colorMap="colorMap"
        :loading = 'loading'
        :classes = 'classes'
        :headClasses = 'headClasses'
        :bodyClasses =  'bodyClasses'
        :lineClasses = 'lineClass'
        :columns = "columns"
        :dataList = "dataList"
        :lineNumber = 'lineNumber'
        :cellHeight = 'cellHeight'
        :headHeight = 'headHeight'
        @elementClick = 'closeData'
      />
      <c-pagination v-show="count > 10"
                  :total="count"
                  :current-page='page'
                  :display='pageSize'
                  @pagechange="pagechange">
      </c-pagination>
    </div>
    <c-dialog :showFlag="dialogFlag"
            paddingBottom="14px"
            :confirmLoading="dialogConfirmLoading"
            :confirmDisabled="dialogConfirmDisabled"
            @close="dialogClose"
            @confirm="dialogConfirm"
            :titleText="titleText">
      <p class="dialog-p">{{$t('personal.dialog.blackPromptText')}}</p>
    </c-dialog>
  </div>
</template>

<script>
import mixin from '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/personal/blackList/blackList';
import '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/personal/blackList/blackList.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
