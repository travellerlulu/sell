<template>
  <div class="seller-wrapper">
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
      <ul class="pics-list">
        <li v-for="pic in seller.pics" class="pics-item"><img :src="pic" alt="" class="pic"></li>
      </ul>
    </div>
    <div class="seller-info seller-card">
      <h2 class="title">商家信息</h2>
      <ul class="info-list">
        <li v-for="info in seller.infos" class="info-item">{{info}}</li>
      </ul>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import axios from 'axios';
  import star from '../star/star.vue';
  import icon from '../icon/icon.vue';

  const ERR_OK = 0;
  export default {
    data () {
      return {
        seller: {}
      }
    },
    components: {
      star,
      icon
    },
    created () {
      axios.get('/api/seller').then((response) => {
        response = response.data;
        if (response.errno === ERR_OK) {
          this.seller = response.data;
          console.log(this.seller);
        }
      }, (err) => {
        console.log(err);
      })
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import '../../common/scss/mixin.scss';

  .seller-wrapper {
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
      right: 0;
      top: 0;
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
    padding-bottom: rem(36);
    .title {
      margin-bottom: rem(24);
    }
    .pics-list {
      width: 3000px;
    }
    .pics-item {
      float: left;
      margin-right: rem(12);
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
    .info-list {}
    .info-item {
      padding: rem(32) rem(24);
      line-height: rem(32);
      font-size: rem(24);
      border-top: rem(2) solid rgba(7,17,27,.1);
      color: rgb(7,17,27);
    }
  }
</style>
