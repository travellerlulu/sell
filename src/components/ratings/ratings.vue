<template>
  <div class="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h2 class="score">{{seller.score}}</h2>
          <h3 class="title">综合评分</h3>
          <h4 class="percent">高于周边商家{{seller.rankRate}}%</h4>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <div class="star-wrapper">
              <star :star-size="36" :score="seller.serviceScore"></star>
            </div>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <div class="star-wrapper">
              <star star-size="36" :score="seller.foodScore"></star>
            </div>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="time">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <div class="ratings-wrapper">
        <ratingSelect></ratingSelect>
        <div class="ratings-box">
          <ul class="ratings-list" v-if="ratings && ratings.length">
            <li v-for="rating in ratings" class="ratings-item">
              <div class="item-top">
                <figure class="avatar"><img :src="rating.avatar" alt=""></figure>
                <div class="user-info">
                  <span>{{rating.username}}</span>
                  <div class="info"></div>
                </div>
                <div class="time">{{rating.rateTime}}</div>
              </div>
              <div class="item-main">{{rating.text}}</div>
              <div class="item-bottom">
                <i></i><span v-for="label in recommend">{{label}}</span>
              </div>
            </li>
          </ul>
          <div class="no-rating" v-if="!ratings || !ratings.length">
            暂无评价
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import axios from 'axios';
  import star from '../star/star.vue';
  import ratingSelect from '../ratingSelect/ratingSelect.vue';
  const ERR_OK = 0;

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        ratings: []
      }
    },
    components: {
      star,
      ratingSelect
    },
    created () {
      axios.get('/api/ratings').then((response) => {
        response = response.data;
        if (response.errno === ERR_OK) {
          this.ratings = response.data;
        }
      }, (err) => {
        console.log(err);
      })
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import '../../common/scss/mixin.scss';

  .ratings {
    position: absolute;
    overflow: hidden;
    width: 100%;
    top: rem(352);
    bottom: rem(100);
    left: 0;
    background-color: #F3F5F7;
  }

  .overview {
    display: flex;
    padding: rem(36) 0;
    margin-bottom: rem(30);
    border-bottom: rem(2) solid rgba(7, 17, 27, .1);
    background-color: #fff;
  }

  .overview-left {
    flex: 0 0 rem(275);
    width: rem(275);
    padding-bottom: rem(12);
    text-align: center;
    border-right: rem(2) solid rgba(7, 17, 27, .1);
    .score {
      line-height: rem(56);
      margin-bottom: rem(12);
      font-size: rem(48);
      color: rgb(255, 153, 0);
    }
    .title {
      line-height: rem(24);
      margin-bottom: rem(16);
      font-size: rem(24);
      color: rgb(7, 17, 27);
    }
    .percent {
      line-height: rem(20);
      font-size: rem(20);
      color: rgba(7, 17, 27, .5);
    }
  }

  .overview-right {
    flex: 1;
    padding: 0 rem(36) rem(12);
    .title {
      line-height: rem(36);
      margin-right: rem(24);
      font-size: rem(24);
      color: rgb(7, 17, 27);
    }
    .score-wrapper {
      margin-bottom: rem(16);
      font-size: 0;
      .star-wrapper {
        display: inline-block;
        vertical-align: top;
        margin-right: rem(12);
      }
      .score {
        line-height: rem(36);
        font-size: rem(24);
        color: rgb(255, 153, 0);
      }
    }
    .delivery-wrapper {
      .time {
        line-height: rem(36);
        font-size: rem(24);
        color: rgb(147, 153, 159);
      }
    }
  }

  /* ratings */
  .ratings-wrapper {
    border-top: rem(2) solid rgba(7, 17, 27, .1);
    border-bottom: rem(2) solid rgba(7, 17, 27, .1);
    background-color: #fff;
  }
  .ratings-box {
    border-top: rem(2) solid rgba(7,17,27,.1);
  }
  .ratings-list {
    padding: 0 rem(36);
  }
  .ratings-item {
    padding: rem(36) 0;
    border-bottom: rem(2) solid rgba(7,17,27,.1);
    .item-top {
      display: flex;
    }
    .avatar {
      flex: 0 0 rem(56);
      width: rem(56);
      height: rem(56);
      margin-right: rem(24);
      img {
        width:100%;
        height: 100%;
        border-radius: 50%;
        vertical-align: top;
      }
    }
    .user-info {

    }
  }
</style>
