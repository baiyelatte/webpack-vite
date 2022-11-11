<!--
 * @Author: Admin
 * @Date: 2022-02-10 14:39:55
 * @LastEditors: baiyelatte baiyelatte@gmail.com
 * @LastEditTime: 2022-11-01 16:27:37
 * @FilePath: \mallh5\src\components\Tabbar.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by Crush/禄可集团, All Rights Reserved. 
-->
<!-- 底部标签栏 -->
<template>
  <div class="tabBar">
    <van-tabbar
      v-model="active"
      active-color="#fc0000"
      inactive-color="#7d7e80"
    >
      <template v-for="tabBar in tabBarConfig">
        <van-tabbar-item :key="tabBar.path" :to="tabBar.path" replace>
          <van-icon class="iconfont" slot="icon" :name="tabBar.icon"></van-icon>
          <span>{{ tabBar.name }}</span>
        </van-tabbar-item>
      </template>
    </van-tabbar>
  </div>
</template>
<script>
import { tabBarConfig } from "@/config/index.js";

export default {
  name: "Tabbar",
  data() {
    return {
      active: 0,
      tabBarConfig
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
        locations: 1,
        cityChoose: 1,
        cityList: 1,
        cart: 1,
        user: 2
      };
      this.active = mapType[item];
    }
  }
};
</script>
<style lang="scss">
.tabBar {
  > div {
    z-index: 9999;
  }
}
</style>
