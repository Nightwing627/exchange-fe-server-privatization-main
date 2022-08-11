<template>
  <div class="divInput">
    <div class="input" @click="openValue">
      <input v-model="value" type="text" readonly v-if="!showLabel">
      <span v-else>{{text}}</span>
      <img src="~@/assets/images/1/arrow-bottom.png" alt="">
    </div>
    <div class="list" v-show="show">
      <ul>
        <li  v-for="(item,index) in options" :key="index" @click="getvalue(item)" :class="{active: item === value || item.value === value}">{{ item.label ? item.label : item }}</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    options: {
      type: Array,
      default: () => []
    },
    showLabel: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return{
      show: false,
      text: ''
    }
  },
  mounted() {
    if (this.showLabel) {
      this.text = this.options.filter(item => item.value === this.value)[0].label
    }
  },
  methods: {
    openValue() {
      this.show = !this.show;
    },
    getvalue(item) {
      this.text = item.label
      this.$emit('change', item.value ? item.value : item)
      this.show = false;
    },
  },
}
</script>
<style lang="stylus">
.divInput {
  position: relative;
  .input {
    height: 24px;
    line-height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    span {
      display: inline-block;
      width: 74px;
      text-align: center;
      font-size: 14px;
      font-weight: 600;
      color: #16161F;
    }
    input {
      width: 74px;
      outline: none;
      border: none;
      text-align: center;
    }
    img {
      width: 12px;
      height: 12px;
    }
  }

  .list {
    width: 150px;
    overflow: hidden;
    border-radius: 15px;
    background-color: #fff;
    border: 1px solid RGB(228, 228, 228);
    position: absolute;
    left: -39px;
    top: 24px;
    z-index: 99;
    li {
      width: 100%;
      height: 24px;
      line-height: 24px;
      cursor: pointer;
      margin-top: 8px;
      color: RGB(128, 129, 145);
      font-weight: 600px;
      font-size: 14px;
      padding-left: 52px;
      box-sizing: border-box;
      position: relative;
      &:hover {
        color: RGB(17, 20, 45);
      }
      &.active {
        color: RGB(17, 20, 45);
        &::before {
          content: '✓';
          color: #1269FF;
          position: absolute;
          left: 24px;
          top: 0;
        }
      }
    }
  }
}
</style>