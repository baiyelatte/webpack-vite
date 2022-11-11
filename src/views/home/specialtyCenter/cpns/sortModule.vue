<!--
 * @Date: 2022-10-10 13:25:20
 * @LastEditors: baiyelatte baiyelatte@gmail.com
 * @LastEditTime: 2022-11-08 11:00:27
 * @FilePath: \mallh5\src\views\home\specialtyCenter\cpns\sortModule.vue
-->
<template>
  <div class="sortModule" v-if="speciaityCenterMenuListC?.length != 0">
    <van-grid :column-num="5" :border="false" clickable square>
      <van-grid-item
        v-for="(value, index) in speciaityCenterMenuListC"
        :key="value.categoryId"
        @click="handleJump(value, index)"
      >
        <template #icon>
          <van-image
            class="sortModuleImg"
            fit="cover"
            radius="10px"
            :src="value.categoryBanner"
          />
        </template>
        <template #text>
          <span class="sortModuleText">{{ value.categoryName }}</span>
        </template>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script setup>
import router from "@/router";
import { computed } from "vue";
const props = defineProps({
  speciaityCenterMenuList: {
    type: Array,
    default: () => []
  }
});
// props.speciaityCenterMenuList.length == 0
//     ? null
//     : props.speciaityCenterMenuList
// setTimeout(() => {
//   console.log(props.speciaityCenterMenuList);
// }, 2000);
const speciaityCenterMenuListC = computed(() => {
  if (
    props.speciaityCenterMenuList == null ||
    props.speciaityCenterMenuList.length == 0
  ) {
    return null;
  } else {
    return props.speciaityCenterMenuList;
  }
});
const testUrl =
  "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ftva1.sinaimg.cn%2Fbmiddle%2F006APoFYly1g2qtpp570xj303m03mjr6.jpg&refer=http%3A%2F%2Ftva1.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1667899253&t=fbb3f50c086cc62a9d32605ede28d73c";
const items = {
  categoryName: "全部分类",
  categoryBanner: require("@/assets/image/newVersion/allCategoryBtn.png"),
  categoryId: 99,
  onClick: () => {
    router.push("/allCategories");
  }
};

const handleJump = (value, index) => {
  if (value.valueId === 0) {
    router.push("/allCategories");
  } else {
    router.push({
      path: "/classify",
      query: {
        title: value.categoryName,
        categoryId: value.categoryId
      }
    });
  }
};
</script>

<style lang="scss" scoped>
:deep(.van-grid) {
  justify-content: space-between;
}
.sortModule {
  width: 354px;
  height: 74px;
  margin: 0 auto;
  margin-top: 12px;
  border-radius: 10px;
  overflow: hidden;
  .sortModuleText {
    display: inline-block;
    text-align: center;
    width: 80px;
    font-size: 12px;
    font-weight: bold;
    color: #333333;
  }
  .sortModuleImg {
    width: 44px;
    height: 36px;
  }
}
</style>
