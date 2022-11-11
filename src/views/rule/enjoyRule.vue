<!--
 * @Date: 2022-10-27 10:07:17
 * @LastEditors: baiyelatte baiyelatte@gmail.com
 * @LastEditTime: 2022-11-08 09:11:08
 * @FilePath: \mallh5\src\views\rule\enjoyRule.vue
-->
<template>
  <router-layout>
    <div class="enjoyRule">
      <van-nav-bar
        fixed
        :placeholder="true"
        safe-area-inset-top
        :title="$route.meta.title"
        v-if="!isClApp"
        left-arrow
        @click-left="$router.back()"
      />
      <!-- <div class="centent"></div> -->
      <img
        src="../../assets/image/newVersion/ruleIMG.png"
        alt=""
        class="centent"
      />
    </div>
  </router-layout>
</template>

<script setup>
const isClApp = LukeappApi.IscltApp();
</script>

<style lang="scss" scoped>
.enjoyRule {
  position: relative;
  width: 100%;
  background-color: #ffe2df;
  padding-bottom: 44.5px;
  z-index: 1;
  > div {
    height: 100%;
  }
  .centent {
    width: 100%;
    height: 1044.5px;
    // background: url("../../assets/image/newVersion/ruleIMG.png");
    // background-size: 100% 100%;
    padding: 20px;
  }
}
</style>
