<template>
  <transition name="slide">
    <div class="food" v-show="showFlag" ref="food">
      <div class="food-wrapper">
        <div class="food-top">
          <div class="food-image">
            <img :src="food.image" alt="">
            <i class="close" @click="close"></i>
          </div>
          <div class="food-info">
            <div class="info-left">
              <h2 class="title">{{food.name}}</h2>
              <h3 class="info"><span class="sale">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span></h3>
              <h4 class="price-wrapper">
                <span class="new">¥{{food.price}}</span>
                <span v-if="food.oldPrice" class="old">¥{{food.oldPrice}}</span>
              </h4>
            </div>
            <transition name="fade">
              <div class="buy" v-show="!food.count || food.count === 0" @click.stop.prevent="_toggleCart($event)">加入购物车
              </div>
            </transition>
            <div class="cartcontrol-wrapper" v-show="food.count > 0">
              <cartcontrol :food="food" ref="cartcontrol"></cartcontrol>
            </div>
          </div>
        </div>
        <div class="food-card">
          <h2 class="title">商品介绍</h2>
          <p class="des">{{food.info}}</p>
        </div>
        <div class="food-card card-ratings">
          <h2 class="title">商品评价</h2>
          <div class="ratings-select">
            <ratingSelect :ratings="food.ratings" :select-type="selectType" :switch-type="switchType"
                          :desc="desc" @select="ratingSelect" @toggle="ratingSwitch"></ratingSelect>
          </div>
          <ul class="ratings-list" v-show="food.ratings && food.ratings.length > 0">
            <li v-for="rating in food.ratings" class="rating-item" v-show="_needShow(rating.rateType,rating.text)">
              <div class="user">
                <span class="name">{{rating.username}}</span>
                <img :src="rating.avatar" alt="" class="avatar">
              </div>
              <div class="time">{{rating.rateTime | formatTime}}</div>
              <p class="content"><i class="icon" :class="{'on':rating.rateType===0}"></i>{{rating.text}}</p>
            </li>
          </ul>
          <div v-show="!food.ratings || food.ratings.length === 0" class="no-rating">暂无评价</div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import {formatDate} from '../../common/js/date';
  import cartcontrol from '../cartcontrol/cartcontrol.vue';
  import ratingSelect from '../ratingSelect/ratingSelect.vue';

  const ALL = 2;
  export default {
    props: {
      food: {
        type: Object
      }
    },
    data () {
      return {
        showFlag: false,
        selectType: ALL,
        switchType: false,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      }
    },
    components: {
      cartcontrol,
      ratingSelect
    },
    methods: {
      show () {
        this.selectType = ALL;
        this.switchType = false;
        this.showFlag = true;
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs['food'], {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        })
      },
      close () {
        this.showFlag = false;
      },
      _toggleCart (event) {
        if (!event._constructed) {
          return;
        }
        this.$refs.cartcontrol.addCart();
      },
      ratingSelect (value) {
        this.selectType = value;
        this.$nextTick(() => {
          this.scroll.refresh();
        })
      },
      ratingSwitch (value) {
        this.switchType = value;
        this.$nextTick(() => {
          this.scroll.refresh();
        })
      },
      _needShow (type, text) {
        if (this.switchType && !text) {
          return false;
        }
        if (this.selectType === ALL) {
          return true;
        } else {
          return type === this.selectType;
        }
      }
    },
    filters: {
      formatTime (time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-DD hh:mm');
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import '../../common/scss/mixin.scss';

  .food {
    position: fixed;
    top: 0;
    left: 0;
    bottom: rem(80);
    width: 100%;
    z-index: 30;
    background-color: #f3f5f7;
  }

  .food-top {
    margin-bottom: rem(30);
    border-bottom: rem(2) solid rgba(7, 17, 27, .1);
    background-color: #fff;
    .food-info {
      position: relative;
    }
    .info-left {
      padding: rem(36) rem(190) rem(36) rem(36);
      .title {
        font-size: rem(28);
        line-height: rem(28);
        margin-bottom: rem(16);
        font-weight: 700;
        color: rgb(7, 17, 27);
      }
      .info {
        font-size: rem(20);
        line-height: rem(20);
        margin-bottom: rem(36);
        color: rgb(147, 153, 159);
        .sale {
          margin-right: rem(24);
        }
      }
      .price-wrapper {
        font-size: 0;
        font-weight: 700;
        line-height: rem(48);
        .new {
          font-size: rem(28);
          color: rgb(240, 20, 20);
          margin-right: rem(24);
        }
        .old {
          font-size: rem(20);
          color: rgb(147, 153, 159);
          text-decoration: line-through;
        }
      }
    }
    .buy {
      position: absolute;
      right: rem(36);
      bottom: rem(36);
      width: rem(148);
      height: rem(48);
      line-height: rem(48);
      text-align: center;
      border-radius: rem(48);
      font-size: rem(20);
      background-color: rgb(0, 160, 220);
      color: #fff;
    }
    .cartcontrol-wrapper {
      position: absolute;
      right: rem(36);
      bottom: rem(36);
      z-index: 10;
    }
  }

  .food-image {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 100%;
    img {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
    }
    .close {
      position: absolute;
      top: rem(30);
      left: rem(30);
      width: rem(40);
      height: rem(40);
      border-radius: 50%;
      font-size: rem(30);
      color: #fff;
      background-color: rgba(7, 17, 27, .5);
      &:before {
        content: '';
        display: inline-block;
        width: rem(10);
        height: rem(10);
        border-left: 1px solid #fff;
        border-top: 1px solid #fff;
        margin-left: rem(16);
        transform: rotate(-45deg);
      }
    }
  }

  .food-card {
    padding: rem(36);
    border-top: rem(2) solid rgba(7, 17, 27, .1);
    border-bottom: rem(2) solid rgba(7, 17, 27, .1);
    margin-bottom: rem(30);
    background-color: #fff;
    .title {
      font-size: rem(28);
      line-height: rem(28);
      font-weight: 700;
      margin-bottom: rem(12);
      color: rgb(7, 17, 27);
    }
    .des {
      padding: 0 rem(16);
      font-size: rem(24);
      line-height: rem(48);
      color: rgb(77, 85, 93);
    }
    &.card-ratings {
      padding: rem(36) 0;
      .title {
        padding: 0 rem(36);
        margin-bottom: 0;
      }
      .ratings-select {
        padding: 0 rem(36);
      }
    }
    .ratings-list {
      padding: 0 rem(36);
      border-top: rem(2) solid rgba(7, 17, 27, .1);
      .rating-item {
        position: relative;
        padding: rem(32) 0;
        border-bottom: rem(2) solid rgba(7, 17, 27, .1);
      }
      .time {
        font-size: rem(20);
        line-height: rem(24);
        margin-bottom: rem(12);
        color: rgb(147, 153, 159);
      }
      .user {
        position: absolute;
        right: 0;
        top: rem(36);
        line-height: rem(24);
        font-size: 0;
        .name {
          font-size: rem(20);
          line-height: rem(24);
          margin-right: rem(12);
          color: rgb(147, 153, 159);
        }
        .avatar {
          width: rem(24);
          height: rem(24);
          border-radius: 50%;
          vertical-align: top;
        }
      }
      .content {
        font-size: rem(24);
        line-height: rem(32);
        color: rgb(7, 17, 27);
        .icon {
          display: inline-block;
          width: rem(24);
          height: rem(24);
          margin: rem(4) rem(8) 0 0;
          vertical-align: top;
          background-color: rgba(7, 17, 27, .3);
          border-radius: 50%;
          &.on {
            background-color: rgb(0, 160, 240);
          }
        }
      }
    }
    .no-rating {
      padding: rem(36);
      font-size: rem(24);
      border-top: rem(2) solid rgba(7, 17, 27, .1);
      color: rgb(147, 153, 159);
    }
  }

  .slide-enter-active, .slide-leave-active {
    transition: all .5s ease;
  }

  .slide-enter, .slide-leave-active {
    transform: translateX(100%);
  }

  .fade-enter-active, .fade-leave-active {
    transition: all .3s ease;
  }

  .fade-enter, .fade-leave {
    opacity: 0;
  }
</style>
