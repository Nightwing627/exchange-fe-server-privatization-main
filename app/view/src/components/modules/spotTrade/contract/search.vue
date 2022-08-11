<template>
  <c-inputFind
    :promptText="$t('trade.searchSy')"
    :value="listfilterVal"
    @onchanges="inputchanges"
    name="trade"
    ref="tradeFind"
    className="search-input spot-search"/>
</template>
<script>
import mixin from '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/modules/coTrade/market/market';
export default {
  mixins: [mixin],
}
</script>
<style lang="stylus">
.spot-search {
  border: none;
  .iconbox {
    display: none;
  }
  .clones {
    display: none;
  }
  input {
    height: 28px;
    line-height: 29px;
    color: RGB(167, 180, 203);
  }
}
</style>