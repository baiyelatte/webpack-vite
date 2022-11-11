<template>
  <div class="top-bar">
    <i
      @click="goBack"
      class="van-icon van-icon-arrow-left van-nav-bar__arrow"
    />
    <van-search
      v-model="goodName"
      placeholder="查找店内商品"
      @change="onFocus"
    />
    <div class="kefu_icon" @click="service">
      <img src="../../../assets/image/more/kefu_icon.png" alt="" />
      <!-- <a class="phone" :href="'tel:' + shopdata.phoneNumber"></a> -->
    </div>
    <div class="share_icon" @click="shareClick">
      <img src="../../../assets/image/more/share_icon.png" alt="" />
    </div>
    <input id="copyNode" onclick="" style="cursor: pointer" type="hidden" />
  </div>
</template>

<script setup>
import { Toast, Notify } from "vant";
import ClipboardJS from "clipboard";
import router from "@/router";
import store from "@/store";
import { ref, defineEmits, onMounted } from "vue";

const goodName = ref("");
const emit = defineEmits(["change"]);
const onFocus = () => {
  emit("change", goodName.value);
  return;
};
let isCopy = false;
let time;
const service = () => {
  window.location.href = `https://yzf.qq.com/xv/web/static/chat/index.html?sign=37ef9b97817351957717cdbb1fb3b53708374ba573672f4fb385cf664728f448ddbba361c3cf4aa02bfe2f013d383c44d38a81ff`;
};
const shareClick = () => {
  if (isCopy) return Toast("亲,链接已复制！");
  isCopy = true;
  time = setTimeout(() => {
    isCopy = false;
    clearTimeout(time);
  }, 5000);
  document.getElementById("copyNode").click();
};

const createClipboard = () => {
  const clipboard = new ClipboardJS("#copyNode", {
    text: (trigger) => {
      return `【诚聊购】 ${location.origin}/shopinfo/${router.currentRoute.params.shopId} 发现一家宝藏店铺，快来打卡`;
    }
  });
  clipboard.on("success", (e) => {
    Notify({
      title: "成功",
      message: "分享链接已复制到剪切板，快去分享吧~",
      type: "success"
    });
    // clipboard.destroy();
  });

  clipboard.on("error", (e) => {
    Notify({
      title: "失败",
      message: "复制失败, 请手动进行复制。",
      type: "danger"
    });
  });
};
const goBack = () => {
  router.back();
  store.commit("setShowType", false);
};
onMounted(() => {
  createClipboard();
});
</script>

<style lang="scss" scoped>
.top-bar {
  display: flex;
  align-items: center;
  margin-left: -11.25px;
  background-color: #ebeaeb;
  .van-search {
    background-color: #ebeaeb;
    .van-cell {
      -webkit-box-flex: 1;
      -webkit-flex: 1;
      height: 28px;
      align-items: center;
      flex: 1;
      padding: 5px 8px;
      background-color: #fff;
      border-radius: 18.75px;
      margin-left: -11.25px;
    }
    .van-search__content {
      background-color: inherit;
    }
  }
  .van-nav-bar__arrow {
    // color: #fff;
    color: #333;
    margin-left: 20px;
    // margin-top:37.5px;
    font-size: 22px;
  }
  .kefu_icon {
    z-index: 2;
    width: 16px;
    margin-left: 30px;
    margin-right: 16px;
    position: relative;
    img {
      width: 100%;
    }
    .phone {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
    }
  }
  .share_icon {
    z-index: 2;
    width: 16px;
    img {
      width: 100%;
    }
  }
}
</style>
