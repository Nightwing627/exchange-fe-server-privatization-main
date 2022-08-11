<template>
  <div
    class="form-select"
    :class="isShow ? 'a-12-bd' : 'a-3-bd'"
    :style="{height: height ? height : '26px'}"
    v-click-outside.capture="onClickOutside"
    v-click-outside:mousedown.capture="onClickOutside"
  >
    <div
      class="name"
      @click="toggle"
      :class="isShow ? 'active' : ''"
      @mouseover="triangleClass='a-12-bd'"
      @mouseout="triangleClass='a-1-bd'">
      <label>{{label}}</label>
      <span class="value b-1-cl">{{currentItem}}</span>
      <i class="icon icon-triangle a-1-bd" :class="triangleClass + ' ' + triangleActiveClass"></i>
    </div>
    <ul class="list a-5-bg a-3-bd b-1-cl" v-if="isShow">
      <li
        v-for="item in list"
        :key="item.id"
        :class="{ 'a-4-bg': currentItem === item.name || item.id === overInx }"
        @mouseover="mouseOver(item.id)"
        @mouseout="mouseOut(item.id)"
        @click="selectList(item)"
      >{{item.name}}</li>
    </ul>
  </div>
</template>
<script>
import { directive as clickOutside } from 'v-click-outside-x';

export default {
  name: 'form-select',
  directives: { clickOutside },
  props: {
    list: {
      default() {
        return [];
      },
      type: Array,
    },
    label: {
      default: '',
      type: String,
    },
    height: {
      default: '',
      type: String,
    },
    current: {
      default: '',
      type: [Number, String],
    },
  },
  data() {
    return {
      currentItem: 1,
      isShow: false,
      overInx: null,
      featuresBtnHover: null,
      triangleClass: '',
      triangleActiveClass: '',
    };
  },
  mounted() {
    this.currentItem = this.list.filter(
      item => item.id === this.current,
    )[0].name;
  },
  watch: {
    current(val) {
      this.currentItem = this.list.filter(item => item.id === val)[0].name;
    },
    list(val) {
      this.currentItem = val.filter(item => item.id === this.current)[0].name;
    },
    isShow(val) {
      if (val) {
        this.triangleActiveClass = 'a-12-bd active';
      } else {
        this.triangleActiveClass = 'a-1-bd';
      }
    },
  },
  methods: {
    mouseOver(inx) {
      this.overInx = inx;
    },
    mouseOut() {
      this.overInx = null;
    },
    selectList(item) {
      this.currentItem = item.name;
      this.$emit('selectList', item.id);
      this.isShow = false;
    },
    toggle() {
      this.isShow = !this.isShow;
    },
    onClickOutside() {
      this.isShow = false;
    },
  },
};
</script>
<style scoped lang="stylus">
.form-select {
  position: relative;
  width: 100%;
  border-style: solid;
  border-width: 1px;
  border-radius: 2px;
  margin-top: 15px;

  .name {
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0px 10px;
    box-sizing: border-box;

    .value {
      flex: 1;
      text-align: right;
    }

    &:hover, &.active {
      .icon-triangle {
        transform: rotate(180deg);
      }
    }

    .icon-triangle {
      width: 0px;
      height: 0px;
      border-width: 4px 4px 0px;
      border-style: solid;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      margin-left: 4px;
    }
  }

  .list {
    position: absolute;
    left: 0px;
    top: 30px;
    width: 100%;
    cursor: pointer;
    z-index: 1;

    li {
      height: 30px;
      line-height: 30px;
      padding: 0px 10px;
      font-size: 12px;
    }
  }
}
</style>
