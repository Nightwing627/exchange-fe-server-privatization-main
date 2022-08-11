<template>
  <div style="height: 100%">
    <div id="assetsEcharts" class="echart-box"></div>
    </div>
</template>
<script>
import mixin from '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/modules/coTrade/echarts/assetsChart';
import '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/modules/coTrade/echarts/assetsChart.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
