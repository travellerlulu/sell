<template>
  <div class="seller-wrapper" ref="seller-wrapper">
    <div class="seller-con">
      <div class="seller-header">
        <div class="seller-top">
          <div class="header-left">
            <h2 class="title">{{seller.name}}</h2>
            <div class="info-box">
              <div class="star-wrapper">
                <star :starSize="36" :score="seller.serviceScore"></star>
              </div>
              <span class="ratingCount">({{seller.ratingCount}})</span>
              <span class="sellCount">月售{{seller.sellCount}}单</span>
            </div>
          </div>
          <div class="header-right">
            <i class="icon" :class="{'active': favorite}"></i>
            <span class="text" @click="_followStore($event)">{{favoriteText}}</span>
          </div>
        </div>
        <ul class="des">
          <li class="des-item">
            <p class="des-tit">起送价</p>
            <span class="des-num">{{seller.minPrice}}</span><span class="des-unit">元</span>
          </li>
          <li class="des-item">
            <p class="des-tit">商家配送</p>
            <span class="des-num">{{seller.deliveryPrice}}</span><span class="des-unit">元</span>
          </li>
          <li class="des-item">
            <p class="des-tit">平均配送时间</p>
            <span class="des-num">{{seller.deliveryTime}}</span><span class="des-unit">分钟</span>
          </li>
        </ul>
      </div>
      <div class="seller-bulletin seller-card">
        <h2 class="title">公告与活动</h2>
        <p class="bulletin">{{seller.bulletin}}</p>
        <ul class="seller-activity">
          <li v-for="support in seller.supports" class="activity-item">
            <icon :icon-size="3" :icon-type="support.type"></icon>
            <span class="des">{{support.description}}</span>
          </li>
        </ul>
      </div>
      <div class="seller-pics seller-card">
        <h2 class="title">商家实景</h2>
        <div class="pics-wrapper" ref="pics-wrapper">
          <ul class="pics-list">
            <li v-for="pic in seller.pics" class="pics-item"><img :src="pic" alt="" class="pic"></li>
          </ul>
        </div>
      </div>
      <div class="seller-info seller-card">
        <h2 class="title">商家信息</h2>
        <ul class="info-list">
          <li v-for="info in seller.infos" class="info-item">{{info}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import {saveToLocal, loadFromLocal} from '../../common/js/store';
  import star from '../star/star.vue';
  import icon from '../icon/icon.vue';

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        favorite: (() => {
          return loadFromLocal(this.seller.id, 'favorite', false);
        })()
      };
    },
    computed: {
      favoriteText () {
        return this.favorite ? '已收藏' : '收藏商家';
      }
    },
    components: {
      star,
      icon
    },
    methods: {
      _followStore (event) {
        if (!event._constructed) {
          return;
        }
        this.favorite = !this.favorite;
        saveToLocal(this.seller.id, 'favorite', this.favorite);
      },
      _initScroll () {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs['seller-wrapper'], {
            click: true
          });
        } else {
          this.scroll.refresh();
        }
      }
    },
    mounted () {
      this.$nextTick(function () {
        this._initScroll();
      })
      if (this.seller.pics) {
        let picW = 120;
        let margin = 6;
        let width = (picW + margin) * this.seller.pics.length + picW;
        this.$refs['pics-wrapper'].getElementsByTagName('ul')[0].style.width = width + 'px';
        this.$nextTick(function () {
          this.picsScroll = new BScroll(this.$refs['pics-wrapper'], {
            scrollX: true,
            eventPassthrough: 'vertical'
          })
        })
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import '../../common/scss/mixin.scss';

  .seller-wrapper {
    position: absolute;
    overflow: hidden;
    width: 100%;
    top: rem(352);
    bottom: 0;
    left: 0;
    background-color: #f3f5f7;
  }

  .seller-card {
    padding: rem(36) rem(36) 0;
    margin-top: rem(32);
    border-top: rem(2) solid rgba(7, 17, 27, .1);
    border-bottom: rem(2) solid rgba(7, 17, 27, .1);
    background-color: #fff;
    .title {
      font-size: rem(28);
      line-height: rem(28);
      color: rgb(7, 17, 27);
    }
  }

  /* header */
  .seller-header {
    position: relative;
    padding: rem(36);
    background-color: #fff;
    border-bottom: rem(2) solid rgba(7, 17, 27, .1);
    .seller-top {
      border-bottom: rem(2) solid rgba(7, 17, 27, .1);
      padding-bottom: rem(36);
    }
    .header-left {
      .title {
        font-size: rem(28);
        line-height: rem(28);
        margin-bottom: rem(16);
        color: rgb(7, 17, 27);
      }
      .info-box {
        font-size: 0;
      }
      .star-wrapper {
        display: inline-block;
      }
      .ratingCount, .sellCount {
        font-size: rem(20);
      }
      .ratingCount {
        margin-right: rem(24);
      }
    }
    .header-right {
      position: absolute;
      right: rem(36);
      top: rem(28);
      width: rem(96);
      text-align: center;
      .icon {
        display: block;
        width: rem(48);
        height: rem(48);
        margin: 0 auto rem(8);
        background-color: rgba(7, 17, 27, .1);
        border: rem(2) solid rgba(7, 17, 27, .1);
        border-radius: 50%;
        &.active {
          background-color: rgb(240, 20, 20);
          border-color: rgb(240, 20, 20);
        }
      }
      .text {
        font-size: rem(20);
        line-height: rem(20);
        color: rgb(77, 85, 93);
      }
    }
    .des {
      display: flex;
      padding-top: rem(36);
      .des-item {
        flex: 1;
        border-right: rem(2) solid rgba(7, 17, 27, .1);
        text-align: center;
        &:last-child {
          border-right: none;
        }
      }
      .des-tit {
        font-size: rem(20);
        color: rgb(147, 153, 159);
        line-height: rem(20);
        margin-bottom: rem(8);
      }
      .des-num, .des-unit {
        color: rgb(7, 17, 27);
        line-height: rem(48);
      }
      .des-num {
        font-size: rem(48);
      }
    }
  }

  /* bulletin */
  .seller-bulletin {
    .title {
      margin-bottom: rem(16);
    }
    .bulletin {
      padding: 0 rem(24);
      font-size: rem(24);
      line-height: rem(48);
      margin-bottom: rem(32);
      color: rgb(240, 20, 20);
    }
    .activity-item {
      line-height: rem(96);
      padding: 0 rem(24);
      border-top: rem(2) solid rgba(7, 17, 27, .1);
      font-size: 0;
      .des {
        font-size: rem(24);
        color: rgb(7, 17, 27);
      }
    }
    .support-icon {
      width: rem(32);
      height: rem(32);
      margin: rem(32) rem(12) 0 0;
    }
  }

  /* pics */
  .seller-pics {
    overflow: hidden;
    padding: rem(36) 0;
    .title {
      padding: 0 rem(36);
      margin-bottom: rem(24);
    }
    .pics-wrapper {
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
    }
    .pics-list {
      padding-left: rem(36);
      font-size: 0;
    }
    .pics-item {
      display: inline-block;
      margin-right: rem(12);
      &:last-child {
        margin-right: 0;
      }
    }
    .pic {
      width: rem(240);
      height: rem(180);
      vertical-align: top;
    }
  }

  /* info */
  .seller-info {
    .title {
      margin-bottom: rem(24);
    }
    .info-list {
    }
    .info-item {
      padding: rem(32) rem(24);
      line-height: rem(32);
      font-size: rem(24);
      border-top: rem(2) solid rgba(7, 17, 27, .1);
      color: rgb(7, 17, 27);
    }
  }
</style>
