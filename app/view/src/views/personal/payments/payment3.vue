<template>
    <div class="payment1">
      <c-inputLine
        name="userName"
        maxLength="100"
        :promptText="promptText1"
        :errorHave="true"
        :errorText="errorText1"
        :errorFlag="checkErrorFlag1"
        marginTop="0px"
        :disabled="excheifFlag ? false : isCanModifyName"
        :value="checkValue1"
        @onchanges="inputChanges"
      >
      </c-inputLine>
      <c-inputLine
        name="account"
        maxLength="50"
        :promptText="promptText2"
        :errorHave="true"
        :errorText="errorText2"
        :errorFlag="checkErrorFlag2"
        marginTop="0px"
        :value="checkValue2"
        @onchanges="inputChanges"
      >
      </c-inputLine>
    </div>
</template>

<script>
import mixin from '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/personal/payments/payments3/payments3';
import '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/personal/payments/payments3/payments3.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
