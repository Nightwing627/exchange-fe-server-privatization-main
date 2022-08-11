<!-- 币币交易 24小时行情 -->
<template>
  <div class="trade-input trade-input-china-container" :class="{'disabledForm' : content.disabled}">
    <div class="tit">{{content.title}}</div>
    <div class="input-item"
        @click="inputFocus"
        :class="ItemClass">
      <input
          class="inputs b-1-cl"
          v-if="!content.disabled"
          ref="inputs"
          @input="handleInput($event.target.value)"
          @focus="handle('focus',$event.target.value)"
          @blur="handle('blur', $event.target.value)"
          v-model="valueData"
          type="text" />
      <p v-if="content.disabled" class="disabledText b-3-cl">{{content.disabledText}}</p>
      <span>
        <span class="price-rate"
          v-if="content.subText && !content.disabled">
          ≈ {{content.subText}}
        </span>
        <span v-if="!content.disabled" class="units">
          {{content.units | getCoinShowName(coinList)}}
        </span>
      </span>
      
    </div>
    
    <transition name="slide-fade">
      <div class="error-msg a-19-bg"
            v-if="content.isError">
        <p style="color:#EDF4F8">{{content.errorText}}</p>
      </div>
    </transition>
  </div>
</template>
<script>
import mixin from '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/modules/trade/tradeForm/tradeInput/tradeInput';
import '@knoxexchange/blockchain-ui-privatization/PC/common-mixin/modules/trade/tradeForm/tradeInput/tradeInput.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};

</script>

<style lang="stylus">
  .trade-grid {
  .input-item {
    height: 34px!important;
    .tit {
      float: left
    }
    .inputs {
      height: 32px!important;
      line-height: 32px!important;
      font-size: 14px!important;
      width: 80%!important;
      margin-top: 1px!important;
      margin-left: 5px!important;
      position: absolute;
    }
    .units {
      top: 10px!important;
    }
    .disabledText {
      line-height: 34px;
      margin-left: 27px;
      white-space: nowrap;
    }
  }
  .trade-input-china-container {
    height: 64px!important;

  }
}
</style>
