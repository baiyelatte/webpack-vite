<!--
 * @Date: 2022-10-12 13:42:25
 * @LastEditors: baiyelatte baiyelatte@gmail.com
 * @LastEditTime: 2022-11-08 10:28:35
 * @FilePath: \mallh5\src\views\home\cityHall\index.vue
-->
<template>
  <router-layout>
    <div>
      <van-nav-bar
        v-if="!$route.meta.CLAPP"
        :title="$route.meta.title"
        left-arrow
        @click-left="$router.push('index')"
        fixed
        :placeholder="true"
      />
      <!-- 头部搜索 -->
      <headerSearch></headerSearch>
      <!-- 优选店铺 -->
      <hotSaleRecommendation v-bind="config"></hotSaleRecommendation>
      <!-- 全部榜单  -->
      <allTheList ref="allTheListRef" v-bind="allTheItemList"></allTheList>
      <!-- 店铺list -->
      <homeTableItemList
        v-bind="listConfig"
        :cityId="cityInfo.cityId"
        class="homeTableItemListClass"
        ref="homeTableItemListRef"
      ></homeTableItemList>
    </div>
    <router-view></router-view>
  </router-layout>
</template>

<script setup>
import { ref, onMounted, onBeforeMount, computed, onActivated } from "vue";
import {
  headerSearch,
  hotSaleRecommendation,
  allTheList,
  homeTableItemList
} from "./cpns";
import { getRankIndexV2, getPreferredShopListV2 } from "@/api";
import vue from "@/main";
import { animation } from "@/utils/animation";
localStorage.removeItem("cityHallScrollTop");

const allTheListRef = ref();
const homeTableItemListRef = ref();
const config = ref({
  title: "优选店铺",
  itemList: null
});
const listConfig = {
  isHome: false,
  isShowCityHall: true,
  isShowTabs: false,
  isShowTwoLevTabs: false
};

const cityInfo = ref(
  JSON.parse(localStorage.getItem("addressHome")) ?? vue.__proto__.defaultCity
);
// 排行榜前三
const firstThree = ref([]);
const request = () => {
  getRankIndexV2({
    cityId: cityInfo.value.cityId,
    rankType: 1
  }).then((res) => {
    if (res.errorCode == 1) {
      if (res.data.length < 3) {
        res.data.length = 3;
      }
      firstThree.value[1] = res.data[0];
      firstThree.value[0] = res.data[1];
      firstThree.value[2] = res.data[2];
      localStorage.setItem("firstThree", JSON.stringify(firstThree.value));
    }
  });
};
const allTheItemList = {
  itemList: firstThree.value
};
// 优选店铺
const requestPreferredShop = () => {
  getPreferredShopListV2({
    cityId: cityInfo.value.cityId
  }).then((res) => {
    if (res.errorCode === 1) {
      config.value.itemList = res.data;
    }
  });
};
onMounted(() => {
  document.querySelector("#_cityHall").addEventListener(
    "scroll",
    () => {
      localStorage.setItem(
        "cityHallScrollTop",
        document.querySelector("#_cityHall").scrollTop
      );
    },
    true
  );
  homeTableItemListRef.value.isCityPavilion = true;
  request();
  requestPreferredShop();
});
onActivated(() => {
  animation(
    document.querySelector("#_cityHall"),
    localStorage.getItem("cityHallScrollTop")
  );
  cityInfo.value =
    JSON.parse(localStorage.getItem("addressHome")) ??
    vue.__proto__.defaultCity;
  request();
  requestPreferredShop();
  // homeTableItemListRef.value.cityId = cityInfo.value.cityId;
  // homeTableItemListRef.value.getItemList();
  allTheListRef.value.upload();
});
</script>

<style scoped lang="scss">
@import "@/assets/style/mixin.scss";
:deeo(.hotSaleRecommendation) {
  height: 153px !important;
}
:deep(.hotSaleRecommendation::before) {
  width: 3.5px !important;
  height: 14px !important;
  background: url("../../../assets/image/newVersion/rectangular.png") no-repeat !important;
  background-size: 100% !important;
  border-radius: 2px;
  overflow: hidden;
}
:deep(.hotSaleRecommendationP) {
  left: 25px !important;
  top: 10px !important;
}
:deep(.hotSaleRecommendationSwipe) {
  width: 90px !important;
  height: 90px !important;
}
:deep(.sortModuleImg) {
  width: 90px !important;
  height: 66px !important;
}
:deep(.shopBoxFooter) {
  height: 24px !important;
  top: 65px;
}
:deep(.shopClass) {
  width: 15px;
  height: 15px;
  left: 9%;
}
// :deep(.shopBoxFooter::before) {
//   content: "";
//   position: absolute;
//   background: url("../../../assets/image/newVersion/fiveStars.png") no-repeat;
//   background-size: 100%;
//   width: 36.5px;
//   height: 6px;
//   left: 50%;
//   top: 50%;
//   transform: translate(-50%, -250%);
// }
:deep(.hotShopName) {
  width: 80% !important;
  // padding-top: 25px;
  height: auto !important;
  -webkit-line-clamp: 1 !important;
  font-size: 10px !important;
  position: absolute;
  left: 17%;
}
.homeTableItemListClass {
  padding: 0px 10px 0 10px;
}
</style>
