<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tabList">
      <router-link to="/goods" class="tab-item">商品</router-link>
      <router-link to="/ratings" class="tab-item">评价</router-link>
      <router-link to="/seller" class="tab-item">商家</router-link>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import header from 'components/header/header.vue';
  import axios from 'axios';

  const ERR_OK = 0;
  export default {
      data () {
      return {
        seller: {}
      }
    },
    components: {
      'v-header': header
    },
    created () {
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
  @import 'common/scss/mixin.scss';

  .tabList {
    height: rem(80);
    background-color: #fff;
    display: flex;
    border: rem(2) solid rgba(7, 17, 27, .1);
    .tab-item {
      font-size: rem(28);
      color: rgb(77, 85, 93);
      flex: 1;
      line-height: rem(80);
      text-align: center;
      &.active {
        color: rgb(240, 20, 20);
      }
    }

  }
</style>
