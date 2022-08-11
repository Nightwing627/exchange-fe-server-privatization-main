<template>
  <broker v-if="!excheifFlag"></broker>
  <excheif v-else></excheif>
</template>

<script>
import mixin from '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/personal/broker/index/index';
import '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/personal/broker/index/index.styl';
import Broker from './broker.vue';
import Excheif from './excheif.vue';

export default {
  mixins: [mixin],
  components: {
    Broker,
    Excheif,
  },
};

</script>
