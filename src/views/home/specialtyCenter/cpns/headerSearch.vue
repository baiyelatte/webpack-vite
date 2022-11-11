<!--
 * @Date: 2022-10-12 13:52:03
 * @LastEditors: baiyelatte baiyelatte@gmail.com
 * @LastEditTime: 2022-11-08 09:06:17
 * @FilePath: \mallh5\src\views\home\specialtyCenter\cpns\headerSearch.vue
-->
<template>
  <div>
    <div class="header">
      <div class="cityLocation">
        <img src="@/assets/image/newVersion/cityLocation.png" alt="" />
        <span @click="handleJump">{{ cityInfo.cityName ?? 11 }}</span>
        <van-icon
          style="margin-left: 4px; margin-right: 7px"
          name="arrow-down"
        />
        <span class="cityLocationSpan">切换定位有惊喜哦~</span>
      </div>
      <div class="openShop">
        <img src="@/assets/image/home/shop.png" alt="" />
        <p @click="handlePush">我也要开店</p>
        <van-icon name="arrow" size="0.35rem" />
      </div>
    </div>
    <div class="search_content" @click="handleSearch">
      <div class="search_left">
        <img
          src="@/assets/image/newVersion/searchRed.png"
          width="16px"
          height="16px"
        />
        <van-search
          v-model="searchValue"
          placeholder="请输入搜索关键词"
          background="none"
          left-icon="none"
        />
      </div>
      <div class="search_right">
        <div></div>
        <img
          src="@/assets/image/newVersion/searchBtn.png"
          class="search_rightImg"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onActivated } from "vue";
import router from "@/router";
import vue from "@/main";
// console.log(router.currentRoute.meta.title);
const handlePush = () => {
  router.push("/comeToEnjoy");
};
const searchValue = ref();
const handleJump = () => {
  router.push("address");
};
const cityInfo = ref(
  JSON.parse(localStorage.getItem("addressHome")) ?? vue.__proto__.defaultCity
);
onActivated(() => {
  cityInfo.value =
    JSON.parse(localStorage.getItem("addressHome")) ??
    vue.__proto__.defaultCity;
});
const handleSearch = () => {
  router.push({
    path: "/search",
    query: {
      title: "搜索",
      singleSearch: router.currentRoute.meta.title == "特产中心" ? 2 : 3,
      isHome: false
    }
  });
};
</script>

<style lang="scss" scoped>
.header {
  width: 375px;
  height: 42px;
  display: flex;
  align-items: center;
  position: relative;
  .openShop {
    width: 110px;
    height: 22px;
    display: flex;
    position: absolute;
    right: 15px;
    bottom: 10px;
    background: #ffffff;
    border-radius: 20px;
    justify-content: center;
    align-items: center;
    padding: 0 2px 0 5px;
    > img {
      width: 14px;
      height: 14px;
    }
    > p {
      font-size: 11px;
      margin: 0 0 0 4px;
      font-weight: 600;
    }
  }
  .cityLocation {
    margin-left: 15px;
    > img {
      width: 20px;
      height: 20px;
      vertical-align: middle;
    }
    > span {
      font-size: 16px;
      color: #333333;
      font-weight: bold;
      vertical-align: middle;
      margin-left: 1.5px;
    }
    > i {
      font-size: 12px;
      color: #afafaf;
      font-weight: bold;
      vertical-align: middle;
    }
    .cityLocationSpan {
      font-size: 12px;
      color: #afafaf;
      font-weight: bold;
      vertical-align: middle;
    }
  }
}
.search_content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 345px;
  margin-left: 4%;
  height: 40px;
  border-radius: 20px;
  border: 0.5px solid #ed2f34;
  padding: 0 6.5px 0 12px;

  .search_left {
    display: flex;
    align-items: center;
    > div {
      flex: 1;
      font-size: 14px;
      color: #383838;
      margin: 0;
      padding: 0;
      > div {
        width: 250px;
        padding: 0;
      }
    }
  }
  .search_right {
    width: 60px;
    height: 27px;
    display: flex;
    align-items: center;
    > div {
      height: 20px;
      width: 1px;
      background: #eeefee;
    }
    .search_rightImg {
      width: 60px;
      height: 27px;
    }
  }
}
</style>
