<template>
  <div class="header">
    <div class="content-wrapper">
      <figure><img :src="seller.avatar" alt=""></figure>
      <div class="content">
        <h2><i class="brand"></i>{{seller.name}}</h2>
        <h3>{{seller.description}}/{{seller.deliveryTime}}分钟送达</h3>
        <h4 v-if="seller.supports">
          <icon :iconSize="1" :iconType="seller.supports[0].type"></icon>
          {{seller.supports[0].description}}
        </h4>
      </div>
      <div class="support-num" v-if="seller.supports" @click="toggleDetail(true)">
        {{seller.supports.length}}个
        <i class="arrow"></i>
      </div>
    </div>
    <div class="notice" @click="toggleDetail(true)">
      <i class="icon"></i>{{seller.bulletin}}<i class="arrow"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" alt="">
    </div>
    <div class="detail" v-show="detailShow" transition="fade">
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <h2 class="title">{{seller.name}}</h2>
          <div class="star-wrapper">
            <star :starSize="48" :score="seller.score"></star>
          </div>
          <div class="detail-con">
            <div class="title-wrapper">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul class="supports" v-if="seller.supports">
              <li class="support-item" v-for="support in seller.supports">
                <icon :iconSize="1" :iconType="support.type"></icon>{{support.description}}
              </li>
            </ul>
            <div class="title-wrapper">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <p class="bulletin">{{seller.bulletin}}</p>
          </div>
        </div>
      </div>
      <div class="detail-close">
        <i class="icon-close" @click="toggleDetail(false)">×</i>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import star from '../star/star.vue'
  import icon from '../icon/icon.vue'

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        detailShow: false
      }
    },
    methods: {
      toggleDetail (option) {
        this.detailShow = option;
      }
    },
    components: {
      star,
      icon
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import '../../common/scss/mixin.scss';

  .header {
    position: relative;
    background-color: rgba(7, 17, 27, .5);
  }
  .content-wrapper {
    padding: rem(48) rem(24) rem(36) rem(48);
    position: relative;
    font-size: 0;
    figure {
      display: inline-block;
      vertical-align: top;
      width: rem(128);
      margin-right: rem(32);
      img {
        width: rem(128);
        height: rem(128);
        border-radius: rem(4);
      }
    }
    .support-num {
      position: absolute;
      right: rem(24);
      bottom: rem(36);
      padding: 0 rem(16);
      height: rem(48);
      line-height: rem(48);
      border-radius: rem(48);
      background-color: rgba(0, 0, 0, .2);
      font-size: rem(20);
      color: #fff;
      .arrow {
        @include arrow();
      }
    }
  }

  .content {
    display: inline-block;
    color: #fff;
    h2 {
      font-size: rem(32);
      font-weight: bold;
      line-height: rem(32);
      margin: rem(4) 0 rem(16) 0;
      .brand {
        display: inline-block;
        vertical-align: top;
        width: rem(60);
        height: rem(36);
        margin-right: rem(12);
        background: url(./brand@2x.png) no-repeat;
        background-size: 100% 100%;
      }
    }
    h3, h4 {
      line-height: rem(24);
    }
    h3 {
      font-size: rem(24);
      margin-bottom: rem(20);
    }
    h4 {
      font-size: rem(20);
    }
  }

  .notice {
    position: relative;
    padding: 0 rem(44) 0 rem(24);
    height: rem(56);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    line-height: rem(56);
    background-color: rgba(7, 17, 27, .2);
    font-size: rem(20);
    color: #fff;
    .icon {
      display: inline-block;
      vertical-align: top;
      margin: rem(14) rem(8) 0 0;
      width: rem(44);
      height: rem(24);
      background: url(./bulletin@2x.png) no-repeat;
      background-size: 100% 100%;
    }
    .arrow {
      position: absolute;
      right: rem(24);
      top: rem(22);
      @include arrow();
    }
  }

  .background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    overflow: hidden;
    filter: blur(10px);
    img {
      width: 100%;
    }
  }

  .detail {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(7, 17, 27, .8);
    backdrop-filter: blur(10px);
    .detail-wrapper {
      min-height: 100%;
      width: 100%;
      text-align: center;
    }
    .detail-main {
      padding-top: rem(128);
      padding-bottom: rem(128);
      .title {
        margin-bottom: rem(32);
        line-height: rem(32);
        font-size: rem(32);
        font-weight: 700;
        color: #fff;
      }
      .star-wrapper {
        padding: rem(4) auto;
      }
      .detail-con {
        padding: 0 rem(72);
      }
      .title-wrapper {
        display: flex;
        margin: rem(56) 0 rem(48) 0;
        .line {
          flex: 1;
          border-top: 1px solid rgba(255, 255, 255, .2);
          margin-top: rem(12);
        }
        .text {
          font-size: rem(28);
          font-weight: 700;
          color: #fff;
          padding: 0 rem(24);
        }
      }
      .supports {
        padding: 0 rem(24);
        color: #fff;
        text-align: left;
        .support-item {
          line-height: rem(32);
          margin-bottom: rem(24);
          font-size: rem(24);
          font-weight:200;
          &:last-child {
            margin-bottom: 0;
          }
          .support-icon {
            width: rem(32);
            height: rem(32);
            margin-right: rem(12);
          }
        }
      }
      .bulletin {
        text-align: left;
        padding: 0 rem(24);
        font-size: rem(24);
        line-height: rem(48);
        color: #fff;
      }
    }
    .detail-close {
      /*position: relative;*/
      width: rem(64);
      height: rem(64);
      margin: rem(-128) auto 0 auto;
      /*clear: both;*/
      font-size: rem(64);
      text-align: center;
      .icon-close {
        display: inline-block;
        line-height: rem(64);
        color: rgba(255, 255, 255, .5);
      }
    }
  }
</style>
