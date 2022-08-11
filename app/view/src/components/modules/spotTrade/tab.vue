<template>
  <ul class="tab-list">
    <li
      v-for="(item, index) in list"
      :key="index"
      class="tab-item"
      :class="{active: item.value === value}"
      :style="{width: tabItemWidth}"
      @click="handlerClick(item)"
    >{{item.label}}</li>
  </ul>
</template>
<script>
export default {
  model: {
    prop: 'value',
    event: 'click'
  },
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    tabItemWidth: {
      type: String,
      default: '',
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    handlerClick(item) {
      this.$emit('click', item.value)
    },
  },
};
</script>
<style lang="stylus" scoped>
.tab-list {
  display: flex;
  .tab-item {
    width: 173px;
    height: 40px;
    border-radius: 10px;
    line-height: 40px;
    text-align: center;
    font-size: 14px;
    color: #A7B4CB;
    cursor: pointer;
    &.active {
      background-color: rgba(167, 180, 203, .2);
      color: #16161F;
      font-weight: 600;
    }
  }
}
</style>
