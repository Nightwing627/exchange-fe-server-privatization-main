<!-- 保证金模式 -->
<template>
  <c-dialog
    paddingBottom="14px"
    class="depositModeDialog"
    :showFlag="isShow"
    :confirmLoading="dialogConfirmLoading"
    :confirmDisabled="dialogConfirmDisabled"
    :confirmText="confirmText"
    :titleText="titleText"
    @close="close"
    @confirm="submit">
    <div class="depositMode-box">
      <div class="category-select-box">
        <span class="tab b-1-cl"
          v-for="(item, index) in categoryList"
          :key="index"
          @click="selectCategory(item.id)"
          :class="item.classes">
          {{item.text}}
        </span>
      </div>
      <div class="text">
        <template v-if="marginModel === 1">
          <!-- 全仓保证金模式: 所有仓位共用合约账户中的保证金来避免仓位被强平。在强平事件中，交易者可能会损失所有的保证金和仓位。 -->
          <p v-html="lanText.text1"></p>
        </template>
        <template v-else>
          <!-- 逐仓保证金模式: 一定数量保证金被分配到仓位上。如果仓位保证金亏损到低于维持保证金的水平，仓位将被强平。在逐仓模式下，您可以为这个仓位添加和减少保证金。 -->
          <p v-html="lanText.text2"></p>
        </template>
      </div>
    </div>
  </c-dialog>
</template>
<script>
import mixin from '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/modules/coTrade/depositMode/depositMode';
import '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/modules/coTrade/depositMode/depositMode.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
