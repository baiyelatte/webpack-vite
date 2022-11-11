<!--
 * @Date: 2022-06-27 10:25:56
 * @LastEditors: baiyelatte baiyelatte@gmail.com
 * @LastEditTime: 2022-10-14 17:23:09
 * @FilePath: \mallh5\src\components\download.vue
-->
<template>
  <div
    v-if="!isApp"
    class="download"
    :style="{ marginTop: `${headerAttr.statusbar}px` }"
  >
    <div>
      <img src="@/assets/image/appLogo.png" alt="" />
      <div class="text">
        <h2>诚聊购</h2>
        <p>打开APP,热门活动惊喜不断</p>
      </div>
    </div>
    <button type="primary" @click="$router.push('/downloadclg')">
      APP内打开
    </button>
    <!-- <button
      type="primary"
      @click="isWeixin ? $router.push('/downloadclg') : handleCallApp()"
    >
      APP内打开
    </button> -->
  </div>
</template>
<script>
import callAppMixin from "@/mixins/callApp";
import { isWeixin } from "@/utils/dom";
export default {
  // mixins: [callAppMixin],
  data() {
    return {
      isWeixin: isWeixin(),
      headerAttr: LukeappApi.getattribute(),
      isApp: LukeappApi.IscltApp()
    };
  }
};
</script>

<style scoped lang="scss">
.download {
  width: 100%;
  height: 45px;
  background-color: #fff;
  display: flex;
  padding-top: 7px;
  justify-content: space-between;
  padding: 7px 15px 0;
  align-items: center;
  position: relative;
  z-index: 5;
  > div {
    display: flex;
    img {
      width: 30px;
      height: 30px;
      border-radius: 4px;
    }
  }

  .text {
    margin-left: 10px;
    h2 {
      color: #333333;
      font-size: 16px;
      margin-top: 2px;
      font-weight: 500;
    }
    p {
      margin-top: 2px;
      font-size: 11px;
      color: #666666;
    }
  }
  button {
    width: 95px;
    height: 32px;
    background: #ffffff;
    border-radius: 16px;
    color: #cf0100;
    font-size: 13px;
    border: 1px solid #d0020e;
  }
}
</style>
