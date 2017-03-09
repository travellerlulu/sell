<template>
  <div class="rating-select">
    <div class="select">
      <span class="select-item">{{selects.ALL}} <span class="num">34</span></span>
      <span class="select-item positive">{{selects.POSITIVE}} <span class="num"></span></span>
      <span class="select-item negative">{{selects.NEGATIVE}} <span class="num"></span></span>
    </div>
    <div class="switch">
      <i class="icon">&#10003</i><span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  const ALL = 0;
//  const POSITIVE = 1;
//  const NEGATIVE = 2;
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
          return ALL
        }
      },
      selects: {
        type: Object,
        default () {
          return {
            'ALL': '全部',
            'POSITIVE': '好评',
            'NEGATIVE': '差评'
          }
        }
      },
      switchType: {
        type: Boolean,
        default () {
          return false
        }
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import '../../common/scss/mixin.scss';
  .rating-select {
    padding: 0 rem(36);
  }
  .select {
    padding: rem(36) 0;
    border-bottom: rem(2) solid rgba(7,17,27,.1);
    font-size: 0;
    .select-item {
      display: inline-block;
      padding: 0 rem(24);
      height: rem(64);
      line-height: rem(64);
      margin-right: rem(16);
      font-size: rem(24);
      background-color: rgba(0,160,220,.2);
      color: rgb(77,85,93);
      &.active {
        background-color: rgb(0,160,220);
        color: #fff;
      }
      .num {
        font-size: rem(16);
      }
      &.negative {
        background-color: rgba(77,85,93,.2);
        color: rgb(77,85,93);
      }
    }
  }
  .switch {
    padding: rem(24) 0;
    .icon {
      display: inline-block;
      width: rem(48);
      height: rem(48);
      line-height: rem(48);
      margin-right: rem(8);
      vertical-align: top;
      text-align: center;
      border-radius: 50%;
      font-size: rem(32);
      color: #fff;
      background-color: #ADB1B5;
    }
    .text {
      line-height: rem(48);
      font-size: rem(24);
      color: rgb(147,153,159);
    }
  }
</style>
