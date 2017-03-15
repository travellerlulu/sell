<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="decrease" v-if="food.count > 0" @click.stop.prevent="decreaseCart">
        <i>-</i>
      </div>
    </transition>
    <div class="count" v-if="food.count > 0">{{food.count}}</div>
    <div class="add" @click.stop.prevent="addCart($event)" ref="add-btn"><i>+</i></div>
  </div>
</template>
<script type="text/ecmascript-6">
  import Vue from 'vue';

  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addCart (event) {
        if (!this.food.count) {
          // ue需要通过set改变数组
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }
        // 派发添加事件到父组件，传递当前dom元素以获取位置
        this.$emit('add-cart', event.target);
//        console.log(this.$refs['add-btn']);
      },
      decreaseCart () {
        if (this.food.count) {
          this.food.count--;
        }
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import '../../common/scss/mixin.scss';

  .cartcontrol {
    display: flex;
  }

  .decrease, .add, .count {
    flex: 1;
  }

  .decrease, .add {
    padding: rem(4);
    display: inline-block;
    transition: all .4s linear;
    i {
      display: inline-block;
      width: rem(40);
      height: rem(40);
      font-size: rem(40);
      text-align: center;
      line-height: rem(38);
      border-radius: 50%;
      border: rem(4) solid #00a0dc;
      background-color: #fff;
      color: #00a0dc;
      font-weight: 700;
    }
    &.move-enter, &.move-leave-active {
      opacity: 0;
      transform: translate3d(rem(48), 0, 0) rotate(360deg);
    }
  }

  .add i {
    background-color: #00a0dc;
    color: #fff;
  }

  .count {
    width: rem(48);
    line-height: rem(48);
    font-size: rem(20);
    text-align: center;
    color: rgb(147, 153, 159);
  }
</style>
