<template>
  <div class="goods-wrapper">
    <div class="goods-menu">
      <ul class="menu-list">
        <li class="menu-item" v-for="item in goods">
          <span class="text"><icon :iconSize="3" :iconType="item.type-1"
                                   v-if="item.type > 0"></icon>{{item.name}}</span>
        </li>
      </ul>
    </div>
    <div class="goods-content">
      <ul class="goods-list">
        <li v-for="item in goods" class="goods-item">
          <h2 class="title">{{item.name}}</h2>
          <ul class="foods-list">
            <li v-for="food in item.foods" class="food-item">
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
      <shopcart :select-foods="selectFoods" :min-price="seller.minPrice" :delivery-price="seller.deliveryPrice"></shopcart>
  </div>
</template>
<script type="text/ecmascript-6">
  import axios from 'axios';
  import icon from '../icon/icon.vue';
  import cartcontrol from '../cartcontrol/cartcontrol.vue';
  import shopcart from '../shopcart/shopcart.vue';
  const ERR_OK = 0;
  export default {
    data () {
      return {
        goods: [],
        seller: {}
      }
    },
    components: {
      icon,
      cartcontrol,
      shopcart
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
        console.log(foods);
        return foods;
      }
    },
    created () {
      axios.get('/api/goods').then((response) => {
        if (response.data.errno === ERR_OK) {
          this.goods = response.data.data;
        }
      }, (error) => {
        console.log(error);
      });
      axios.get('/api/seller').then((response) => {
        if (response.data.errno === ERR_OK) {
          this.seller = response.data.data;
          console.log(this.seller);
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

  .menu-list {
    padding: 0 rem(24);
    .menu-item {
      display: table;
      vertical-align: middle;
      position: relative;
      height: rem(108);
      line-height: rem(28);
      font-size: rem(28);
      font-weight: 200;
      color: #07111B;
      &:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: rem(112);
        height: 0;
        border-bottom: rem(2) solid rgba(7, 17, 27, .1);
      }
      &:last-child:after {
        content: none;
      }
      .text {
        display: table-cell;
        vertical-align: middle;
      }
      &.active {
        font-weight: 700;
      }
    }
    .support-icon {
      margin-right: rem(4);
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
