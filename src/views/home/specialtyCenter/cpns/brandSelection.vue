<!--
 * @Date: 2022-10-10 14:07:27
 * @LastEditors: baiyelatte baiyelatte@gmail.com
 * @LastEditTime: 2022-11-08 11:00:13
 * @FilePath: \mallh5\src\views\home\specialtyCenter\cpns\brandSelection.vue
-->
<template>
  <div
    class="brandSelection"
    v-if="brandSelectionList.length != 0"
    :style="
      brandSelectionList
        ? brandSelectionList.lenght <= 4
          ? 'height:3.2rem'
          : ''
        : ''
    "
  >
    <span class="brandSelectionP">精选品牌</span>
    <div class="brandSelectionBox">
      <template v-for="item of brandSelectionList">
        <van-image
          @click="
            router.push({
              path: '/classify',
              query: {
                title: item.name,
                categoryId: item.id
              }
            })
          "
          :key="item.id"
          class="sortModuleImg"
          fit="cover"
          radius="10px"
          :src="item.logImg"
        />
      </template>
    </div>
  </div>
</template>

<script setup>
import router from "@/router";
const props = defineProps({
  brandSelectionList: {
    type: Array,
    default: () => []
  }
});
// setTimeout(() => {
//   console.log(props.brandSelectionList);
// }, 2000);
const url =
  "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ftva1.sinaimg.cn%2Fbmiddle%2F006APoFYly1g2qtpp570xj303m03mjr6.jpg&refer=http%3A%2F%2Ftva1.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1667899253&t=fbb3f50c086cc62a9d32605ede28d73c";
</script>

<style lang="scss" scoped>
.brandSelection {
  width: 351px;
  // height: 120px;
  background: url("../../../../assets/image/newVersion/brandSelection.png");
  background-size: 100% 100%;
  margin: 0 auto;
  margin-top: 12px;
  position: relative;
  .brandSelectionP {
    font-size: 16px;
    color: #333333;
    font-weight: 700;
    position: absolute;
    left: 39px;
    top: 13px;
  }
  .brandSelectionBox {
    height: 150px;
    display: flex;
    flex-wrap: wrap;
    padding: 38px 20px 12px 20px;
    justify-content: space-between;
    align-content: space-between;
    box-sizing: content-box;
    .sortModuleImg {
      width: 68px;
      height: 70px;
    }
  }
}
.brandSelection::before {
  content: "";
  position: absolute;
  background: url("../../../../assets/image/newVersion/brandExclusive.png")
    no-repeat;
  background-size: 100%;
  width: 22px;
  height: 22px;
  left: 12px;
  top: 8.5px;
}
</style>
