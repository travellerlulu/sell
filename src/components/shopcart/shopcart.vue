<template>
  <div class="cart-wrapper">
    <div class="content">
      <div class="cart-left" @click="toggleList">
        <div class="cart-box">
          <div class="cart" :class="cartClass"></div>
          <span class="num" v-if="totalNum > 0">{{totalNum}}</span>
        </div>
        <div class="total-price" :class="cartClass">¥ {{totalPrice}}</div>
        <div class="delivery">另需配送费 ¥ {{deliveryPrice}}元</div>
      </div>
      <div class="cart-right" :class="btnClass" @click.stop.prevent="pay">
        <span class="btn">{{btnText}}</span>
      </div>
    </div>
    <transition name="mask-fade">
      <div class="cart-mask" v-show="listShow" @click="hideList"></div>
    </transition>
    <transition name="fold">
      <div class="cart-list" v-show="listShow">
        <div class="list-header">
          <h2 class="title">购物车</h2>
          <span class="clear" @click="clearCart">清空</span>
        </div>
        <div class="list-content-wrapper" ref="list-content">
          <ul class="list-content">
            <li class="list-item" v-for="food in selectFoods">
              <span class="name">{{food.name}}</span>
              <div class="price">¥ {{food.price}}</div>
              <div class="cartcon-wrapper">
                <cartcontrol :food="food"></cartcontrol>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <div class="ball-container">
      <transition name="drop" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter"
                  v-for="ball in balls">
        <span class="ball" v-show="ball.show">
          <span class="inner inner-hook"></span>
        </span>
      </transition>
    </div>

  </div>
</template>
<script type="text/ecmascript-6">
  import cartcontrol from '../cartcontrol/cartcontrol.vue';
  import BScroll from 'better-scroll';
  export default {
    props: {
      selectFoods: {
        type: Array,
        default () {
          return [];
        }
      },
      minPrice: {
        type: Number,
        default () {
          return 0;
        }
      },
      deliveryPrice: {
        type: Number,
        default () {
          return 0;
        }
      }
    },
    data () {
      return {
        fold: true,
        balls: [ // 多次点击多个小球飞入
          {show: false},
          {show: false},
          {show: false},
          {show: false},
          {show: false}
        ],
        dropBalls: []
      }
    },
    methods: {
      toggleList () {
        if (!this.totalNum) {
          return;
        }
        this.fold = !this.fold;
      },
      hideList () {
        this.fold = true;
      },
      clearCart () {
        this.selectFoods.forEach((food) => {
          food.count = 0;
        })
      },
      pay () {
        if (this.totalPrice >= this.minPrice) {
          alert(`支付${this.totalPrice}元`);
        }
      },
      drop (el) {
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i];
          if (!ball.show) {
            ball.show = true;
            ball.el = el;
            this.dropBalls.push(ball);
            return;
          }
//          else {
//            ball.show = false;
//            this.dropBalls.shift();
//          }
        }
      },
      // transition 钩子函数
      beforeEnter (el) {
        let count = this.balls.length;
        while (count--) {
          let ball = this.balls[count];
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect();
            let x = (rect.left - 32) + 'px';
            let y = -(window.innerHeight - rect.top - 22) + 'px';
            el.style.display = '';
            el.style.webkitTransform = `translate3d(0,${y},0)`;
            el.style.transform = `translate3d(0,${y},0)`;
            let inner = el.getElementsByClassName('inner-hook')[0];
            inner.style.webkitTransform = `translate3d(${x},0,0)`;
            inner.style.Transform = `translate3d(${x},0,0)`;
          }
        }
      },
      enter (el, done) {
        // 触发浏览器重绘
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight;
        el.style.webkitTransform = 'translate3d(0,0,0)';
        el.style.transform = 'translate3d(0,0,0)';
        let inner = el.getElementsByClassName('inner-hook')[0];
        inner.style.webkitTransform = 'translate3d(0,0,0)';
        inner.style.Transform = 'translate3d(0,0,0)';
        done();
      },
      afterEnter (el) {
        let ball = this.dropBalls.shift();
        if (ball) {
          ball.show = false;
          console.log(el + '232');
//          el.style.display = 'none';
//          console.log(this.balls);
        }
      }
    },
    computed: {
      totalNum () {
        let num = 0;
        this.selectFoods.forEach((food) => {
          num += food.count;
        });
        return num;
      },
      totalPrice () {
        let price = 0;
        this.selectFoods.forEach((food) => {
          price += food.price * food.count;
        });
        return price;
      },
      cartClass () {
        return this.totalNum > 0 ? 'active' : '';
      },
      btnText () {
        var text = '';
        if (this.totalNum === 0) {
          text = '¥ ' + this.minPrice + '起送';
        } else if (this.totalPrice < this.minPrice) {
          text = '还差¥ ' + (this.minPrice - this.totalPrice) + '起送';
        } else {
          text = '去结算';
        }
        return text;
      },
      btnClass () {
        return this.totalPrice >= this.minPrice ? 'pay' : '';
      },
      listShow () {
        if (!this.totalNum) {
          this.fold = true;
          return false;
        }
        let show = !this.fold;
        if (show) {
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs['list-content'], {
                click: true
              })
            } else {
              this.scroll.refresh();
            }
          })
        }
        return show;
      }
    },
    components: {
      cartcontrol
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import '../../common/scss/mixin.scss';

  .cart-wrapper {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 50;
    width: 100%;
    height: rem(100);
    background-color: #141d27;
    .content {
      display: flex;
      position: relative;
      z-index: 99;
    }
    .cart-left {
      display: flex;
      flex: auto;
      margin-right: rem(24);
    }
    .cart-right {
      flex: 0 0 rem(210);
      box-sizing: border-box;
      width: rem(210);
      padding: 0 rem(16);
      text-align: center;
      background-color: #2b333b;
      &.pay {
        background-color: #1bbf76;
        color: #fff;
        .btn {
          color: #fff;
        }
      }
      .btn {
        display: inline-block;
        line-height: rem(100);
        font-size: rem(24);
        font-weight: 700;
        color: rgba(255, 255, 255, .4);
      }
    }
    .cart-box {
      position: relative;
      width: rem(160);
      .cart {
        position: absolute;
        bottom: rem(4);
        left: rem(24);
        width: rem(88);
        height: rem(88);
        border-radius: 50%;
        border: rem(12) solid #141d27;
        background-color: #2b343c;
        &.active {
          background-color: rgb(0, 160, 220);
        }
      }
      .num {
        position: absolute;
        left: rem(90);
        top: rem(-20);
        padding: 0 rem(10);
        font-size: rem(18);
        height: rem(32);
        line-height: rem(32);
        border-radius: rem(32);
        font-weight: 700;
        color: #fff;
        background-color: rgb(240, 20, 20);
        box-shadow: 0 rem(4) rem(8) rgba(0, 0, 0, .4);
      }
    }
    .total-price {
      display: inline-block;
      font-size: rem(32);
      line-height: rem(100);
      font-weight: 700;
      color: rgba(255, 255, 255, .4);
      margin-right: rem(24);
      &.active {
        color: rgba(255, 255, 255, 1);
      }
    }
    .delivery {
      flex: 1;
      position: relative;
      line-height: rem(100);
      padding-left: rem(24);
      font-size: rem(24);
      color: rgba(255, 255, 255, .4);
      &:before {
        content: '';
        width: rem(2);
        height: rem(48);
        position: absolute;
        left: 0;
        top: rem(26);
        background-color: rgba(255, 255, 255, .1);
      }
    }
  }

  .cart-list {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 42;
    width: 100%;
    background-color: #f3f3f3;
    transition: all .5s linear;
    transform: translate3d(0, -100%, 0);
    &.fold-enter, &.fold-leave-active {
      opacity: 0;
      z-index: -1;
      transform: translate3d(0, 0, 0);
    }
  }

  .list-header {
    height: rem(80);
    line-height: rem(80);
    padding: 0 rem(36);
    border-bottom: 1px solid rgba(7, 17, 27, .1);
    background-color: #f3f5f7;
    .title {
      display: inline-block;
      font-size: rem(28);
      color: rgb(7, 17, 27);
    }
    .clear {
      float: right;
      font-size: rem(24);
      color: rgb(0, 160, 220);
    }
  }

  .list-content-wrapper {
    max-height: rem(434);
    overflow: hidden;
  }

  .list-content {
    padding: 0 rem(36);
    background-color: #fff;
    .list-item {
      position: relative;
      padding: rem(24) 0;
      line-height: rem(48);
      height: rem(48);
      border-bottom: rem(2) solid rgba(7, 17, 27, .1);
      .name {
        font-size: rem(28);
        color: rgb(7, 17, 27);
      }
      .price {
        position: absolute;
        right: rem(180);
        bottom: rem(24);
        font-weight: 700;
        font-size: rem(28);
        line-height: rem(48);
        color: rgb(240, 20, 20);
      }
      .cartcon-wrapper {
        position: absolute;
        right: 0;
        bottom: rem(20);
      }
    }
  }

  .cart-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(7, 17, 27, .6);
    backdrop: blur(10px);
    z-index: 40;
    transition: all .5s;
    &.mask-fade-enter, &.mask-fade-leave-active {
      background-color: rgba(7, 17, 27, 0);
      opacity: 0;
    }
  }

  .ball {
    position: fixed;
    left: rem(64);
    bottom: rem(44);
    width: rem(32);
    height: rem(32);
    z-index: 200;
    transition: all .4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
    .inner {
      display: inline-block;
      width: rem(32);
      height: rem(32);
      border-radius: 50%;
      /*background-color: rgb(0, 160, 220);*/
      transition: all .4s linear;
      background-color: #000;
    }
  }
</style>
