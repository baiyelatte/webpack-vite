<!--
 * @Author: Admin
 * @Date: 2022-02-10 14:39:55
 * @LastEditors: Crush
 * @LastEditTime: 2022-03-24 18:54:00
 * @FilePath: \mallh5\src\components\Header.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by Crush/禄可集团, All Rights Reserved. 
-->
<template>
  <div
    class="header-box"
    :style="{ top: `${isHome ? 0 : headerAttr.statusbar}px` }"
  >
    <van-nav-bar class="header" :border="false">
      <template #left>
        <div class="logo"></div>
      </template>
      <template #title>
        <div class="search-box" @click="handleTitle">
          <van-icon name="search" size="24" color="#333" />
          <span class="search-tit">请输入商品名称</span>
        </div>
      </template>
      <!-- <template #right> -->
      <!-- <van-icon name="contact" size="24" color="#fff" /> -->
      <!-- </template> -->
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {
    isHome: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      headerAttr: LukeappApi.getattribute()
    };
  },
  methods: {
    handleTitle() {
      this.$router.push({
        path: "/search",
        query: {
          title: "搜索"
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.main-home {
  width: 100%;
  height: 100%;
}
.header {
  background: #930200;
  padding: 10px 0;
  height: 50px;
}
.search-box {
  padding: 4px 10px;
  height: 100%;
  border-radius: 30px;
  color: #333;
  background-color: #fff;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: left;
  -ms-flex-pack: left;
  justify-content: left;
  font-size: 12px;
  margin-right: 10px;
}
.search-tit {
  margin-left: 5px;
}
:deep(.van-nav-bar__left) {
  position: relative;
  padding-left: 10px;
  opacity: 1;
  .logo {
    background: url(../assets/image/indexlogo.png);
    width: 70px;
    background-size: 70px 25px;
    height: 25px;
    background-repeat: no-repeat;
  }
}
:deep(.van-nav-bar__content) {
  padding-bottom: 20px;
}
</style>
