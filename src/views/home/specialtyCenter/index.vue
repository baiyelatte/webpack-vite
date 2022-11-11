<!--
 * @Date: 2022-10-09 17:41:20
 * @LastEditors: baiyelatte baiyelatte@gmail.com
 * @LastEditTime: 2022-11-08 10:27:47
 * @FilePath: \mallh5\src\views\home\specialtyCenter\index.vue
-->
<template>
  <router-layout>
    <div>
      <van-nav-bar
        v-if="!$route.meta.CLAPP"
        :title="$route.meta.title"
        left-arrow
        @click-left="handleShow"
        fixed
        :placeholder="true"
      />
      <div v-if="true">
        <!-- 顶部搜索 -->
        <headerSearch></headerSearch>
        <!-- 分类模块 -->
        <sortModule :speciaityCenterMenuList="speciaityCenterMenuList">
        </sortModule>
        <!-- 精选品牌 -->
        <brandSelection :brandSelectionList="brandSelectionList">
        </brandSelection>
        <!-- 热卖推荐 -->
        <hotSaleRecommendation :itemList="HotGoodsList"></hotSaleRecommendation>
        <!-- 特产中心的商品列表 -->
        <homeTableItemList
          v-bind="config"
          :cityId="cityInfo.cityId"
          class="homeTableItemListClass"
          ref="homeTableItemListRef"
        ></homeTableItemList>
      </div>
      <div class="nodesdata" v-else>
        <van-empty description="暂无数据" />
      </div>
    </div>
    <router-view></router-view>
  </router-layout>
</template>

<script setup>
import router from "@/router";
import { ref, onActivated, onMounted, onUnmounted } from "vue";
import {
  sortModule,
  brandSelection,
  hotSaleRecommendation,
  homeTableItemList,
  headerSearch
} from "./cpns";
import { getCherryPickBrandV2, getQuertHotGoodsV2, getTabMenuV2 } from "@/api";
import vue from "@/main";
import store from "@/store";
import { animation } from "@/utils/animation";
localStorage.removeItem("specialtyCenterScroll");
const config = {
  isShowTabs: false,
  isShowTwoLevTabs: false
};
const homeTableItemListRef = ref();
const handleShow = () => {
  router.push("index");
};

const goToScanner = () => {
  router.push("/scanner");
};
const cityInfo = ref(
  JSON.parse(localStorage.getItem("addressHome")) ?? vue.__proto__.defaultCity
);
//精选品牌
const brandSelectionList = ref([]);
const requestCherryPickBrand = () => {
  getCherryPickBrandV2().then((res) => {
    if (res.errorCode === 1) {
      brandSelectionList.value = res.data;
    }
  });
};
// 热卖推荐
const HotGoodsList = ref({});
const requestHotGoods = () => {
  getQuertHotGoodsV2({
    cityId: cityInfo.value.cityId
  }).then((res) => {
    if (res.errorCode === 1) {
      HotGoodsList.value = res.data;
    }
  });
};
// 特产中心类目
const speciaityCenterMenuList = ref([]);

const requestSpeciaityCenterMenu = () => {
  getTabMenuV2({
    homeType: 2,
    cityId: cityInfo.value.cityId,
    menuType: 2
  }).then((res) => {
    if (res.errorCode === 1) {
      console.log(res.data.slice(0, res.data.length - 1));
      speciaityCenterMenuList.value = res.data.slice(
        0,
        res.data.length === 1 ? res.data.length : res.data.length - 1
      );
    }
  });
};
onActivated(async () => {
  animation(
    document.querySelector("#_specialtyCenter"),
    localStorage.getItem("specialtyCenterScroll")
  );
  cityInfo.value =
    JSON.parse(localStorage.getItem("addressHome")) ??
    vue.__proto__.defaultCity;
  requestCherryPickBrand();
  requestHotGoods();
  // requestSpeciaityCenterMenu();
  const data = await store.dispatch("classify/getMenu", {
    homeType: 2,
    cityId: cityInfo.value.cityId,
    menuType: 2
  });
  speciaityCenterMenuList.value = data;
  // homeTableItemListRef.value.cityId = cityInfo.value.cityId;
  homeTableItemListRef.value.getItemList();
});
onMounted(() => {
  document.querySelector("#_specialtyCenter").addEventListener(
    "scroll",
    () => {
      localStorage.setItem(
        "specialtyCenterScroll",
        document.querySelector("#_specialtyCenter").scrollTop
      );
    },
    true
  );
  // requestCherryPickBrand();
  // requestHotGoods();
  // requestSpeciaityCenterMenu();
  // store.dispatch("classify/getMenu", { homeType: 2, cityId: cityId, menuType: 2 });
});
</script>

<style lang="scss" scoped>
.homeTableItemListClass {
  padding: 0px 10px 0 10px;
}
</style>
