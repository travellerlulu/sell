<template>
  <div class="star-group" :class="starClass">
    <span class="star-item" :class="itemClass" v-for="itemClass in itemClasses"></span>
  </div>
</template>
<script type="text/ecmascript-6">
    const LENGTH = 5;
    const CLS_ON = 'on';
    const CLS_OFF = 'off';
    const CLS_HALF = 'half';
    export default {
      props: {
          starSize: {
              type: Number
          },
          score: {
              type: Number
          }
      },
      computed: {
          starClass () {
              return 'star-' + this.starSize
          },
          itemClasses () {
            let result = [];
            let score = Math.floor(this.score * 2) / 2;
            let integer = Math.floor(score);
            let decimal = score % 1;
            for (var i = 0; i < integer; i++) {
              result.push(CLS_ON);
            }
            if (decimal !== 0) {
                result.push(CLS_HALF);
            }
            while (result.length < LENGTH) {
                result.push(CLS_OFF);
            }
            return result;
          }
      }
    }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import '../../common/scss/mixin.scss';
  .star-group {
    font-size: 0;
    .star-item {
      display: inline-block;
      &:last-child {
        margin-right: 0;
      }
    }
    &.star-24 {
      .star-item {
        width: rem(20);
        height: rem(20);
        margin-right: rem(6);
        &.on {
          background: url(./star24_on@2x.png) no-repeat;
          background-size: 100% 100%;
        }
        &.off {
          background: url(./star24_off@2x.png) no-repeat;
          background-size: 100% 100%;
        }
        &.half {
          background: url(./star24_half@2x.png) no-repeat;
          background-size: 100% 100%;
        }
      }
    }
    &.star-36 {
      .star-item {
        width: rem(30);
        height: rem(30);
        margin-right: rem(12);
        &.on {
          background: url(./star36_on@2x.png) no-repeat;
          background-size: 100% 100%;
        }
        &.off {
          background: url(./star36_off@2x.png) no-repeat;
          background-size: 100% 100%;
        }
        &.half {
          background: url(./star36_half@2x.png) no-repeat;
          background-size: 100% 100%;
        }
      }
    }
    &.star-48 {
      .star-item {
        width: rem(40);
        height: rem(40);
        margin-right: rem(44);
        &.on {
          background: url(./star48_on@2x.png) no-repeat;
          background-size: 100% 100%;
        }
        &.off {
          background: url(./star48_off@2x.png) no-repeat;
          background-size: 100% 100%;
        }
        &.half {
          background: url(./star48_half@2x.png) no-repeat;
          background-size: 100% 100%;
        }
      }
    }
  }


</style>
