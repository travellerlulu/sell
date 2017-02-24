<template>
  <div id="app">
    <v-header></v-header>
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
  export default {
    name: 'app',
    components: {
      'v-header': header
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import 'common/scss/mixin.scss';
  body {
    background-color: #f3f5f7;
  }

  .tabList {
    height: 40px;
    background-color: #fff;
    display: flex;
    @include border-1px(rgba(7,17,27,.1));
    .tab-item {
      font-size: 14px;
      color: rgb(77, 85, 93);
      flex: 1;
      line-height: 40px;
      text-align: center;
      &.active {
        color: rgb(240, 20, 20);
      }
    }

  }
</style>
