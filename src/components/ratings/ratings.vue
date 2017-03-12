<template>
  <div class="ratings" ref="ratings-scroll">
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
              <star :star-size="36" :score="seller.foodScore"></star>
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
        <div class="ratings-con">
          <ratingSelect :ratings="ratings" :select-type="selectType" :switch-type="switchType"
                        @select="ratingsSelect" @toggle="ratingsToggle"></ratingSelect>
        </div>
        <div class="ratings-box">
          <ul class="ratings-list" v-if="ratings && ratings.length">
            <li v-for="rating in ratings" class="ratings-item" v-show="needShow(rating.rateType, rating.text)">
              <div class="item-top">
                <figure class="avatar"><img :src="rating.avatar" alt=""></figure>
                <div class="user-info">
                  <span class="username">{{rating.username}}</span>
                  <div class="info">
                    <div class="star-wrapper">
                      <star :star-size="24" :score="rating.score"></star>
                    </div>
                    <span class="delivery">{{rating.deliveryTime}}分钟送达</span></div>
                </div>
                <div class="time">{{rating.rateTime | formatTime}}</div>
              </div>
              <div class="item-main">{{rating.text}}</div>
              <div class="item-bottom">
                <i class="icon" :class="rating.rateType === 0 ? 'up' : ''"></i><span
                v-for="label in rating.recommend.slice(0,3)" class="label">{{label}}</span>
              </div>
            </li>
          </ul>
          <div v-show="!ratings || ratings.length === 0" class="no-rating">暂无评价</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import axios from 'axios';
  import {formatDate} from '../../common/js/date';
  import BScroll from 'better-scroll';
  import star from '../star/star.vue';
  import ratingSelect from '../ratingSelect/ratingSelect.vue';
  const ERR_OK = 0;
  const ALL = 2;

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        ratings: [],
        selectType: ALL,
        switchType: false
      }
    },
    components: {
      star,
      ratingSelect
    },
    filters: {
      formatTime (time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-DD hh:mm');
      }
    },
    methods: {
      ratingsSelect (val) {
        this.selectType = val;
        this.$nextTick(() => {
          this.scroll.refresh();
        })
      },
      ratingsToggle (val) {
        this.switchType = val;
        this.$nextTick(() => {
          this.scroll.refresh();
        })
      },
      needShow (type, text) {
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
    created () {
      axios.get('/api/ratings').then((response) => {
        response = response.data;
        if (response.errno === ERR_OK) {
          this.ratings = response.data;
          this.$nextTick(() => {
            this.scroll = new BScroll(this.$refs['ratings-scroll'], {
              click: true
            });
          })
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
    bottom: 0;
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

  .ratings-con {
    padding: 0 rem(36);
  }

  .ratings-box {
    border-top: rem(2) solid rgba(7, 17, 27, .1);
  }

  .ratings-list {
    padding: 0 rem(36);
  }

  .ratings-item {
    padding: rem(36) 0;
    border-bottom: rem(2) solid rgba(7, 17, 27, .1);
    .item-top {
      display: flex;
    }
    .avatar {
      flex: 0 0 rem(56);
      width: rem(56);
      height: rem(56);
      margin-right: rem(24);
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        vertical-align: top;
      }
    }
    .star-wrapper {
      display: inline-block;
    }
    .user-info {
      flex: auto;
    }
    .delivery, .username, .time {
      line-height: rem(24);
      font-size: rem(20);
      color: rgb(147, 153, 159);
    }
    .username {
      color: rgb(7, 17, 27);
    }
    .item-main {
      font-size: rem(24);
      line-height: rem(36);
      padding-left: rem(80);
      margin-top: rem(12);
      color: rgb(7, 17, 27);
    }
    .item-bottom {
      padding-left: rem(80);
      margin-top: rem(16);
      .icon {
        display: inline-block;
        width: rem(24);
        height: rem(24);
        background-color: rgb(183, 187, 191);
        border-radius: 50%;
        &.up {
          background-color: rgb(0, 160, 220);
        }
      }
      .label {
        display: inline-block;
        height: rem(32);
        line-height: rem(32);
        padding: 0 rem(12);
        margin-left: rem(16);
        font-size: rem(18);
        border: 1px solid rgba(7, 17, 27, .1);
        color: rgb(147, 153, 159);
      }
    }
    .no-rating {
      padding: rem(36);
      font-size: rem(24);
      border-top: rem(2) solid rgba(7, 17, 27, .1);
      color: rgb(147, 153, 159);
    }
  }
</style>
