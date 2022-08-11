<template>
  <section>
    <!-- {{index_international_open}} -->
    <component v-bind:is="index_international_open" v-if="swiperFlag"></component>
    <c-homeDialog></c-homeDialog>
  </section>
</template>
<script>
import mixin from '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/home/index';
import China from './homes/china.vue';
import International from './homes/international.vue';
import Biki from './homes/biki.vue';
import Momo from './homes/momo.vue';
import Japanese from './homes/japanese.vue';
import Korea from './homes/korea.vue';
import Europe from './homes/europe.vue';
import bitWind from './homes/bitWind.vue';
import king from './homes/king.vue';
import bitsg from './homes/bitsg.vue';

export default {
  mixins: [mixin],
  components: {
    China,
    International,
    Biki,
    Momo,
    Japanese,
    Korea,
    Europe,
    bitWind,
    king,
    bitsg,
  },
};
</script>
