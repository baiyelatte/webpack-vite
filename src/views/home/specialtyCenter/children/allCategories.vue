<!--
 * @Date: 2022-10-11 10:52:44
 * @LastEditors: baiyelatte baiyelatte@gmail.com
 * @LastEditTime: 2022-10-31 16:00:44
 * @FilePath: \mallh5\src\views\home\specialtyCenter\children\allCategories.vue
-->
<template>
  <router-layout>
    <div class="allCategories">
      <van-nav-bar
        v-if="!$route.meta.CLAPP"
        :title="$route.meta.title"
        left-arrow
        @click-left="handleShow"
      />
      <div class="search_content">
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
      </div>
      <div class="allCategoriesGrid">
        <template v-for="(item, index) in dataList">
          <div
            :key="index"
            class="allCategoriesGridDiv"
            @click="handleJump(item)"
          >
            <van-image
              class="sortModuleImg"
              fit="cover"
              radius="10px"
              :src="item.categoryBanner"
            />
            <p class="sortModuleP" style="margin-top: 5px">
              {{ item.categoryName }}
            </p>
          </div>
        </template>
      </div>
    </div>
  </router-layout>
</template>

<script setup>
import { onMounted, ref } from "vue";
import router from "@/router";
import store from "@/store";
import vue from "@/main";
const url =
  "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ftva1.sinaimg.cn%2Fbmiddle%2F006APoFYly1g2qtpp570xj303m03mjr6.jpg&refer=http%3A%2F%2Ftva1.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1667899253&t=fbb3f50c086cc62a9d32605ede28d73c";
const searchValue = ref("");
const isShow = ref(true);
const cityInfo = ref(
  JSON.parse(localStorage.getItem("addressHome")) ?? vue.__proto__.defaultCity
);
const handleShow = () => {
  isShow.value = false;
  router.back();
};
let dataList = ref([]);
const handleSearch = async () => {
  await store.dispatch("classify/getAllMenu", {
    cityId: cityInfo.value.cityId,
    keyword: searchValue.value
  });
  dataList.value = store.state.classify.allData;
};

onMounted(async () => {
  await store.dispatch("classify/getAllMenu", {
    cityId: cityInfo.value.cityId,
    keyword: searchValue.value
  });
  dataList.value = store.state.classify.allData;
});
const handleJump = (item) => {
  router.push({
    path: "/classify",
    query: {
      title: item.categoryName,
      categoryId: item.categoryId
    }
  });
};
</script>

<style lang="scss" scoped>
.allCategories {
  width: 100%;
  height: 100%;
  background-color: #fff;
  .allCategoriesGrid {
    display: flex;
    flex-wrap: wrap;
    // justify-content: space-between;
    margin: 37px 12px;
    .allCategoriesGridDiv {
      width: 25%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .sortModuleImg {
        width: 58px;
        height: 58px;
      }
      .sortModuleP {
        font-size: 13px;
      }
    }
  }
}
.search_content {
  position: relative;
  .searchText {
    position: absolute;
    right: 30px;
    top: 10px;
  }
}
</style>
