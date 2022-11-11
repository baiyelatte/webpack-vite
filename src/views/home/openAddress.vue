<!--
 * @Date: 2022-06-27 10:25:56
 * @LastEditors: baiyelatte baiyelatte@gmail.com
 * @LastEditTime: 2022-11-01 13:52:41
 * @FilePath: \mallh5\src\views\home\address.vue
-->
<template>
  <router-layout>
    <div class="address">
      <van-nav-bar
        v-if="!$route.meta.CLAPP"
        :title="$route.meta.title"
        left-arrow
        @click-left="$router.back()"
      />
      <van-search
        shape="round"
        show-action
        v-model="searchValue"
        placeholder="请输入搜索关键词"
        background="#fff"
      >
        <template #action>
          <div @click="handleSearch">搜索</div>
        </template>
      </van-search>

      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div
          v-for="item in cityList"
          :key="item.cityId"
          @click="handleCity(item)"
        >
          <div class="addressBox">
            <img :src="item.cityLogo" alt="" />
            <span style="fon-weight: 700">{{ item.cityName }}</span>
          </div>
        </div>
      </van-list>
    </div>
  </router-layout>
</template>

<script setup>
import { getCityShopV2 } from "@/api";
import { onMounted, ref } from "vue";
import router from "@/router";
const loading = ref(false);
const finished = ref(false);
const cityList = ref();
const searchValue = ref("");
const pageSize = ref(10);
const pageNum = ref(1);
const onLoad = () => {
  pageNum.value += 1;
  requestCityInfo(true);
};
const handleSearch = () => {
  requestCityInfo();
};
const requestCityInfo = (more = false) => {
  finished.value = false;
  loading.value = true;
  const params = {
    pageSize: pageSize.value,
    pageNum: more ? pageNum.value : 1,
    keyword: searchValue.value
  };
  getCityShopV2(params).then((res) => {
    if (res.errorCode === 1) {
      if (res.data.list.length > 0) {
        cityList.value = more ? cityList.value.concat(res.data) : res.data.list;
      }
      loading.value = false;
      if (res.data.hasNextPage === false) {
        finished.value = true;
      }
    }
  });
};
onMounted(() => {
  requestCityInfo();
});
const handleCity = (item) => {
  localStorage.setItem("addressHome", JSON.stringify(item));
  router.back();
};
</script>

<style lang="scss" scoped>
.address {
  width: 100%;
  height: 100%;
  .addressBox {
    width: 351px;
    height: 100px;
    margin: 12px auto;
    text-align: center;
    line-height: 100px;
    font-size: 18px;
    color: #fff;
    position: relative;
    border-radius: 18px;
    overflow: hidden;
    > img {
      width: 100%;
      height: 100%;
    }
    > span {
      left: 50%;
      transform: translateX(-50%);
      position: absolute;
    }
  }
}
</style>
