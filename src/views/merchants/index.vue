<template>
  <router-layout>
    <van-nav-bar title="商家管理中心" left-arrow @click-left="$router.back()" />
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <van-tabbar route v-model="active">
      <van-tabbar-item icon="shop-o" to="/merchants/shoppe" replace
        >商家管理</van-tabbar-item
      >
      <van-tabbar-item icon="newspaper-o" to="/merchants/orderman" replace
        >订单管理</van-tabbar-item
      >
      <van-tabbar-item icon="brush-o" to="/merchants/shopdecoration" replace
        >店铺装修</van-tabbar-item
      >
      <van-tabbar-item icon="comment-o" to="/merchants/information" replace
        >我的信息</van-tabbar-item
      >
    </van-tabbar>
  </router-layout>
</template>
<script>
export default {
  name: "merchants",
  data() {
    return {
      active: 0
    };
  },
  created() {
    //通过路由跳转绑定Tabbar的选中
    this.tabbarSelected(this.$route.name);
  },
  watch: {
    // 监听路由变化,保证路由跳转Tabbar选中正常
    $route: {
      handler(val) {
        this.tabbarSelected(val.name);
      }
    }
  },
  methods: {
    tabbarSelected(item) {
      const mapType = {
        home: 0,
        category: 1,
        cart: 2,
        user: 3
      };
      this.active = mapType[item];
    }
  }
};
</script>
