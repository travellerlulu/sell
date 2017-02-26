<template>
  <i class="support-icon" :class="iconClass"></i>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      iconSize: {
        type: Number
      },
      iconType: {
        type: Number
      }
    },
    computed: {
      iconClass () {
        return 'icon-' + this.iconSize + ' ' + this.classMap[this.iconType];
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import '../../common/scss/mixin.scss';

  .support-icon {
    display: inline-block;
    vertical-align: top;
    margin-right: rem(8);
    width: rem(24);
    height: rem(24);
    &.icon-1 {
      &.decrease {
        background: url(./decrease_1@2x.png) no-repeat;
        background-size: 100% 100%;
      }
      &.discount {
        background: url(./discount_1@2x.png) no-repeat;
        background-size: 100% 100%;
      }
      &.guarantee {
        background: url(./guarantee_1@2x.png) no-repeat;
        background-size: 100% 100%;
      }
      &.invoice {
        background: url(./invoice_1@2x.png) no-repeat;
        background-size: 100% 100%;
      }
      &.special {
        background: url(./special_1@2x.png) no-repeat;
        background-size: 100% 100%;
      }
    }
    &.icon-3 {
      &.decrease {
        background: url(./decrease_3@2x.png) no-repeat;
        background-size: 100% 100%;
      }
      &.discount {
        background: url(./discount_3@2x.png) no-repeat;
        background-size: 100% 100%;
      }
      &.guarantee {
        background: url(./guarantee_3@2x.png) no-repeat;
        background-size: 100% 100%;
      }
      &.invoice {
        background: url(./invoice_3@2x.png) no-repeat;
        background-size: 100% 100%;
      }
      &.special {
        background: url(./special_3@2x.png) no-repeat;
        background-size: 100% 100%;
      }
    }
  }
</style>
