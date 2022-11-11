<!--
 * @Date: 2022-10-14 10:24:14
 * @LastEditors: baiyelatte baiyelatte@gmail.com
 * @LastEditTime: 2022-11-02 14:41:07
 * @FilePath: \mallh5\src\views\home\cityHall\children\rankingList.vue
-->
<template>
  <router-layout>
    <div class="rankingList">
      <van-nav-bar
        style="position: relative"
        fixed
        :placeholder="true"
        v-if="!$route.meta.CLAPP"
        :title="$route.meta.title"
        left-arrow
        @click-left="$router.back()"
      />
      <h1 class="rankingListTitle">热卖榜：依据销量计算 | 每日更新</h1>
      <div class="rankingListTitleTrophy"></div>
      <van-tabs
        type="card"
        class="rankingListTabs"
        v-model="tabsActive"
        @click="handleConversion"
      >
        <van-tab title="销量" :name="1"> </van-tab>
        <van-tab title="销售额" :name="2"> </van-tab>
      </van-tabs>
      <homeTableItemList
        @request="request"
        v-bind="listConfig"
        :rankList="shopRankList"
        class="homeTableItemListClass"
        ref="homeTableItemListRef"
      ></homeTableItemList>
      <template v-if="userShopRankList != null">
        <div
          class="rankingListFooter"
          :style="
            userShopRankList?.rankIndex == -1 &&
            'text-align: center;font-weight:700'
          "
        >
          <template v-if="userShopRankList?.rankIndex == -1">
            <span style="line-height: 1.3333rem; color: #ff0000">暂未上榜</span>
          </template>
          <template
            v-if="
              userShopRankList?.rankIndex != -1 &&
              userShopRankList?.rankIndex != null
            "
          >
            <img
              class="rankingListFooterImg"
              src="../../../../assets/image/newVersion/trophy.png"
              alt=""
            />
            <span style="display: inline-block; line-height: 1.3333rem">{{
              userShopRankList?.shopName
            }}</span>
            <span
              style="float: right; line-height: 1.3333rem; padding-right: 10px"
              >您当前所在位置:
              <span style="color: #ff0000">{{
                userShopRankList?.rankIndex + 1
              }}</span>
            </span>
          </template>
        </div>
      </template>
      <template v-if="userShopRankList === null">
        <div class="rankingListFooter" style="text-align: center">
          <span style="line-height: 1.3333rem"
            >用户未登录或 当前用户无关联的店铺</span
          >
        </div>
      </template>
      <div class="ruleIcon" @click="$router.push('/tabularStatement')">
        <span class="ruleText">说明</span>
      </div>
    </div>
    <router-view></router-view>
  </router-layout>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import homeTableItemList from "../../homeTableItemList.vue";
import { getRankIndexV2, getUserShopRankV2 } from "@/api";
import vue from "@/main";

const shopRankList = ref([]);
const userShopRankList = ref();

const listConfig = {
  isShowCityHall: true,
  isShowTabs: false,
  isShowTwoLevTabs: false,
  isRankingList: true
};
const homeTableItemListRef = ref();
const tabsActive = ref(1);
const cityId = ref(
  JSON.parse(localStorage.getItem("addressHome"))?.cityId ??
    vue.__proto__.defaultCity.cityId
);

const request = () => {
  getRankIndexV2({
    cityId: cityId.value,
    rankType: tabsActive.value
  }).then((res) => {
    if (res.errorCode == 1) {
      shopRankList.value = res.data;
    }
  });
  getUserShopRankV2({
    cityId: cityId.value,
    rankType: tabsActive.value
  }).then((res) => {
    if (res.errorCode == 1) {
      userShopRankList.value = res.data;
    }
  });
};
onMounted(() => {
  setTimeout(() => {
    request();
  }, 2000);
  homeTableItemListRef.value.isCityPavilion = true;
});
const handleConversion = () => {
  request();
};
</script>

<style lang="scss" scoped>
.rankingList {
  width: 100%;
  min-height: 100%;
  background: url("../../../../assets/image/newVersion/rankingList.png")
    no-repeat;
  background-size: 100% 100%;
  position: absolute;
  .ruleIcon {
    position: fixed;
    top: 55px;
    right: 0;
    width: 55px;
    height: 24px;
    border-radius: 12px 0px 0px 12px;
    background-color: rgba(#ffffff, 0.5);
    overflow: hidden;
    text-align: center;
    line-height: 16px;
    .ruleText {
      font-family: "FangSong";
      color: #ffffff;
      font-size: 16px;
      font-weight: 600;
    }
  }
  .homeTableItemListClass {
    height: 100%;
    padding: 0 12px;
  }
  .rankingListFooter {
    width: 350px;
    height: 50px;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    bottom: 50px;
    font-size: 15px;
    color: #333333;
    background: radial-gradient(#ffe9c3, #ffa8a8);
    border-radius: 10px;
    margin-bottom: 10px;
    overflow: hidden;
    .rankingListFooterImg {
      width: 25px;
      height: 25px;
      vertical-align: middle;
    }
  }
  .rankingListTitle {
    font-weight: normal;
    font-size: 17px;
    text-align: center;
    margin-top: 42px;
    color: #ffffff;
  }
  .rankingListTitleTrophy {
    width: 68px;
    height: 55px;
    background: url("../../../../assets/image/newVersion/trophy.png") no-repeat;
    background-size: 100%;
    margin: 0 auto;
    margin-top: 13.5px;
  }
  .rankingListTabs {
    :deep(.van-tabs__wrap) {
      transform: scale(1.1);
    }
    :deep(.van-tabs__nav--card) {
      margin: 0 auto;
      width: 140px;
      border-radius: 50px;
      overflow: hidden;
      border: none;

      .van-tab {
        padding: 2px;
        color: #9b9b9b;
      }
      .van-tab {
        border-right: none;
      }
    }
    :deep(.van-tab.van-tab--active) {
      color: #fff;
      background-color: #ff1600;
      border-radius: 1000px;
      overflow: hidden;
      margin: 4px;
    }
  }
}
</style>
