<template>
  <div class="goods-wrapper">
    <div class="goods-menu" ref="menu-wrapper">
      <ul class="menu-list">
        <li class="menu-item" :class="{'active':currentIndex === $index}" v-for="(item,$index) in goods"
            @click="selectMenu($index,$event)">
          <span class="text"><icon :iconSize="3" :iconType="item.type-1"
                                   v-if="item.type > 0"></icon>{{item.name}}</span>
        </li>
      </ul>
    </div>
    <div class="goods-content" ref="goods-wrapper">
      <ul class="goods-list">
        <li v-for="item in goods" class="goods-item goods-item-hook">
          <h2 class="title">{{item.name}}</h2>
          <ul class="foods-list">
            <li v-for="food in item.foods" class="food-item" @click="selectFood(food,$event)">
              <figure class="food-img"><img :src="food.icon" alt=""></figure>
              <div class="content">
                <h3 class="name">{{food.name}}</h3>
                <div class="des">{{food.description}}</div>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">¥ {{food.price}}</span>
                  <span class="old" v-if="food.oldPrice !== ''">¥ {{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart :select-foods="selectFoods" :min-price="seller.minPrice"
              :delivery-price="seller.deliveryPrice"></shopcart>

      <food :food="selectedFood" ref="food"></food>

  </div>
</template>
<script type="text/ecmascript-6">
  import axios from 'axios';
  import BScroll from 'better-scroll';
  import icon from '../icon/icon.vue';
  import cartcontrol from '../cartcontrol/cartcontrol.vue';
  import shopcart from '../shopcart/shopcart.vue';
  import food from '../food/food.vue';

  const ERR_OK = 0;
  export default {
    data () {
      return {
        goods: [],
        seller: {},
        listHeight: [],
        scrollY: 0,
        selectedFood: {}
      }
    },
    components: {
      icon,
      cartcontrol,
      shopcart,
      food
    },
    computed: {
      selectFoods () {
        let foods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food);
            }
          })
        })
        return foods;
      },
      currentIndex () {
        let listHeight = this.listHeight;
        for (let i = 0; i < listHeight.length; i++) {
          let h1 = listHeight[i];
          let h2 = listHeight[i + 1];
          if (!h2 || (this.scrollY >= h1 && this.scrollY < h2)) {
            return i;
          }
        }
        return 0;
      }
    },
    methods: {
      _initScroll () {
        this.menuScroll = new BScroll(this.$refs['menu-wrapper'], {
          click: true
        });
        this.goodsScroll = new BScroll(this.$refs['goods-wrapper'], {
          probeType: 3,
          click: true
        });
        this.goodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        });
        this._calculateHeight();
      },
      _calculateHeight () {
        let goodsList = this.$refs['goods-wrapper'].getElementsByClassName('goods-item-hook');
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < goodsList.length; i++) {
          height += goodsList[i].clientHeight;
          this.listHeight.push(height);
        }
      },
      selectMenu (index, event) {
        if (!event._constructed) {
          return;
        }
        let goodsList = this.$refs['goods-wrapper'].getElementsByClassName('goods-item-hook');
        this.goodsScroll.scrollToElement(goodsList[index], 300);
      },
      selectFood (food, event) {
        if (!event._constructed) {
          return;
        }
        this.selectedFood = food;
        this.$refs.food.show();
      }
    },
    created () {
      axios.get('/api/goods', {
        headers: {
          'Content-type': 'application/json'
        }
      }).then((response) => {
        if (response.data.errno === ERR_OK) {
          this.goods = response.data.data;
          this.$nextTick(() => {
            this._initScroll();
          })
        }
      }, (error) => {
        console.log(error);
      });
      axios.get('/api/seller', {
        headers: {
          'Content-type': 'application/json'
        }
      }).then((response) => {
        if (response.data.errno === ERR_OK) {
          this.seller = response.data.data;
        }
      }, (error) => {
        console.log(error);
      })
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import '../../common/scss/mixin.scss';

  .goods-wrapper {
    display: flex;
    position: absolute;
    overflow: hidden;
    width: 100%;
    top: rem(352);
    bottom: rem(100);
    left: 0;
  }

  /* Goods-left */
  .goods-menu {
    flex: 0 0 rem(160);
    width: rem(160);
    background-color: #f3f5f7;
  }

  .menu-item {
    display: table;
    width: rem(112);
    height: rem(108);
    padding: 0 rem(24);
    font-size: rem(24);
    line-height: rem(28);
    color: rgb(7, 17, 27);
    .text {
      display: table-cell;
      vertical-align: middle;
      border-bottom: rem(2) solid rgba(7, 17, 27, .1);
    }
    .support-icon {
      margin-right: rem(4);
    }
    &:last-child {
      .text {
        border-bottom: none;
      }
    }
    &.active {
      font-weight: 700;
      background-color: #fff;
      .text {
        border-bottom: none;
      }
    }
  }

  /* Goods-right */
  .goods-list {

  }

  .goods-item {
    .title {
      height: rem(52);
      line-height: rem(52);
      padding-left: rem(24);
      border-left: rem(4) solid #d9dde1;
      font-size: rem(24);
      color: rgb(147, 153, 159);
      background-color: #f3f5f7;
    }
  }

  .food-item {
    display: flex;
    margin: rem(36) rem(36) 0 rem(36);
    padding-bottom: rem(36);
    border-bottom: rem(2) solid rgba(7, 17, 27, .1);
    &:last-child {
      border-bottom: none;
    }
    .food-img {
      flex: 0 0 rem(114);
      width: rem(114);
      height: rem(114);
      margin-right: 10px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .content {
      position: relative;
      flex: 1;
      .name {
        line-height: rem(28);
        font-size: rem(28);
        margin-top: rem(4);
        color: rgb(7, 17, 27);
      }
      .des {
        margin: rem(16) 0;
      }
      .extra {
        margin-bottom: rem(16);
      }
      .des, .extra {
        font-size: rem(20);
        line-height: rem(20);
        color: rgb(147, 153, 159);
      }
      .extra {
        .count {
          margin-right: rem(24);
        }
      }
      .price {
        line-height: rem(48);
        font-weight: 700;
        font-size: 0;
        .now {
          margin-right: rem(16);
          font-size: rem(28);
          color: rgb(240, 20, 20);
        }
        .old {
          font-size: rem(20);
          color: rgb(147, 153, 159);
          text-decoration: line-through;
        }
      }
      .cartcontrol-wrapper {
        position: absolute;
        right: 0;
        bottom: 0;
      }
    }
  }



</style>
