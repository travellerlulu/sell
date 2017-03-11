<template>
  <div class="rating-select">
    <div class="select">
      <span class="select-item" :class="{'active':selectType === 2}" @click="select(2,$event)">{{desc.all}} <span
        class="num">{{ratings.length}}</span></span>
      <span class="select-item" :class="{'active':selectType === 0}" @click="select(0,$event)">{{desc.positive}} <span
        class="num">{{positives.length}}</span></span>
      <span class="select-item negative" :class="{'active':selectType === 1}" @click="select(1,$event)">{{desc.negative}} <span
        class="num">{{negatives.length}}</span></span>
    </div>
    <div class="switch" :class="{'on':switchType}" @click="toggle($event)">
      <i class="icon">&#10003</i><span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;

  export default {
    props: {
      ratings: {
        type: Array,
        default () {
          return [];
        }
      },
      selectType: {
        type: Number,
        default () {
          return ALL;
        }
      },
      desc: {
        type: Object,
        default () {
          return {
            all: '全部',
            positive: '好评',
            negative: '差评'
          }
        }
      },
      switchType: {
        type: Boolean,
        default () {
          return false
        }
      }
    },
    computed: {
      positives () {
        return this.ratings.filter((rating) => {
          return rating.rateType === POSITIVE;
        })
      },
      negatives () {
        return this.ratings.filter((rating) => {
          return rating.rateType === NEGATIVE;
        })
      }
    },
    methods: {
      select (type, event) {
        if (!event._constructed) {
          return;
        }
        this.selectType = type;
        // 官方不推荐直接修改父组件传过来的值而是用vuex
        this.$emit('select', type);
      },
      toggle (event) {
        if (!event._constructed) {
          return;
        }
        this.switchType = !this.switchType;
        // 官方不推荐直接修改父组件传过来的值而是用vuex
        this.$emit('toggle', this.switchType);
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import '../../common/scss/mixin.scss';

  .select {
    padding: rem(36) 0;
    border-bottom: rem(2) solid rgba(7, 17, 27, .1);
    font-size: 0;
    .select-item {
      display: inline-block;
      padding: 0 rem(24);
      height: rem(64);
      line-height: rem(64);
      margin-right: rem(16);
      font-size: rem(24);
      background-color: rgba(0, 160, 220, .2);
      color: rgb(77, 85, 93);
      &.active {
        background-color: rgb(0, 160, 220);
        color: #fff;
      }
      .num {
        font-size: rem(16);
      }
      &.negative {
        background-color: rgba(77, 85, 93, .2);
        color: rgb(77, 85, 93);
        &.active {
          background-color: rgba(77, 85, 93, 1);
          color: #fff;
        }
      }
    }
  }

  .switch {
    padding: rem(24) 0;
    .icon {
      display: inline-block;
      width: rem(36);
      height: rem(36);
      line-height: rem(36);
      margin-right: rem(8);
      vertical-align: middle;
      text-align: center;
      border-radius: 50%;
      font-size: rem(26);
      color: #fff;
      background-color: #ADB1B5;
    }
    .text {
      line-height: rem(48);
      font-size: rem(24);
      color: rgb(147, 153, 159);
    }
    &.on {
      .icon {
        background-color: lightgreen;
      }
    }
  }
</style>
