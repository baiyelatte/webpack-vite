<!--
 * @Date: 2022-10-12 10:22:30
 * @LastEditors: baiyelatte baiyelatte@gmail.com
 * @LastEditTime: 2022-11-08 11:16:01
 * @FilePath: \mallh5\src\views\rule\comeToEnjoy.vue
-->
<template>
  <router-layout>
    <div class="comeToEnjoy">
      <van-nav-bar
        :title="$route.meta.title"
        v-if="!isClApp"
        left-arrow
        @click-left="$router.back()"
        fixed
      />
      <div class="header"></div>
      <h1
        style="
          color: #cf0000;
          font-size: 22px;
          text-align: center;
          margin-top: 50.5px;
          margin-bottom: 22.5px;
          font-family: FangSong;
        "
      >
        一分钟开店
      </h1>
      <div class="text">
        <p class="textP">1分钟简单操作就能开启属于你的线上店铺</p>
        <div>
          <p class="textP">管理方便</p>
          <p class="textP">随时添加商品，查看订单及数据</p>
        </div>
        <div>
          <p class="textP">免费流量</p>
          <p class="textP">百万流量免费推送，迅速累计店铺销量</p>
        </div>
      </div>
      <div class="btnGroup" @click="$router.push('/downloadclg')"></div>
      <div class="ruleIcon" @click="handleJump">
        <span class="ruleText">规则</span>
      </div>
    </div>
    <router-view key="comeToEnjoy"></router-view>
  </router-layout>
</template>

<script setup>
import { ref } from "vue";
import router from "@/router";
const isShow = ref(false);
const isClApp = LukeappApi.IscltApp();
const handleJump = () => {
  router.push("/enjoyRule");
};
</script>

<style lang="scss" scoped>
:deep(.van-icon-cross:before) {
  position: absolute;
  top: -10px;
  left: -10px;
}
:deep(.van-popup) {
  background-color: #ffe2df;
}
.comeToEnjoy {
  position: relative;
  width: 100%;
  background-color: #ffe2df;
  padding-bottom: 44.5px;
  z-index: 1;
  height: 100%;
  .ruleIcon {
    position: fixed;
    top: 75px;
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
      font-size: 18px;
      font-weight: 600;
      line-height: 20px;
    }
  }
  .header {
    width: 374px;
    height: 340.55px;
    background: url("../../assets/image/newVersion/ruleBGIMG.png");
    background-size: 100% 100%;
    z-index: 2;
  }
  .btnGroup {
    width: 100%;
    height: 34.3px;
    display: flex;
    justify-content: space-evenly;
    align-content: center;
    margin-top: 32.5px;
  }
  .btnGroup::before {
    content: "";
    width: 126px;
    height: 34.3px;
    background: url("../../assets/image/newVersion/localMerchants.png");
    background-size: 100%;
  }
  .btnGroup::after {
    content: "";
    width: 126px;
    height: 34.3px;
    background: url("../../assets/image/newVersion/onlineStore.png");
    background-size: 100%;
  }
  .centent {
    width: 100%;
    height: 1044.5px;
    // background: url("../../assets/image/newVersion/ruleIMG.png");
    // background-size: 100% 100%;
    padding: 20px;
  }
  .text {
    height: 146.5px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .textP {
      font-family: "FangSong";
      color: #bd6464;
      font-size: 17px;
      font-weight: 600;
      line-height: 20px;
    }
  }
}
</style>
