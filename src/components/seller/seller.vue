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
        <div class="header-right"></div>
      </div>
      <div class="des"></div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import axios from 'axios';
  import star from '../star/star.vue';

  const ERR_OK = 0;
  export default {
    data () {
      return {
        seller: {}
      }
    },
    components: {
      star
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
<style lang="scss" rel="stylesheet/scss">
  @import '../../common/scss/mixin.scss';

  .seller-wrapper {
    background-color: #f3f5f7;
  }

  .seller-header {
    position: relative;
    padding: rem(36);
    background-color: #fff;
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
  }
</style>
