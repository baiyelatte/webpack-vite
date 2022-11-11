<template>
  <router-layout>
    <div class="navBar" v-if="!$route.meta.CLAPP">
      <van-icon
        class="arrow-left"
        name="arrow-left"
        @click="$router.replace('/index')"
      />
      <div class="title">{{ $route.meta.title }}</div>
    </div>
    <div class="content">
      <div class="notify">请员工扫下方二维码</div>
      <div class="desc">邀请他加入你的店铺</div>
      <div class="qrcode-box">
        <qr-code
          ref="qrCode"
          :value="getuserinfo.shopId + ''"
          :size="size"
          :avatar="getuserinfo.headPic"
          level="H"
        />
      </div>

      <div class="btn" @click="download">下载二维码</div>

      <div class="warn">提示：如下载失败请尝试长按图片进行下载。</div>
    </div>
  </router-layout>
</template>

<script>
import QrCode from "@/components/common/QrCode";
import { mapGetters } from "vuex";

export default {
  name: "qrcode",
  components: {
    QrCode
  },
  data() {
    return {
      size: 291
    };
  },
  computed: {
    ...mapGetters(["getuserinfo"])
  },
  mounted() {},
  methods: {
    download() {
      this.$refs.qrCode.download();
    }
  }
};
</script>

<style scoped lang="scss">
.navBar {
  background-image: url("../../assets/image/scanner/bg-hader.png");
  background-size: 100%;
  background-position-y: 100%;
  background-repeat: no-repeat;
  position: relative;
  color: #fff;
  font-size: 16px;
  line-height: 50px;
  padding-bottom: 25px;
  .arrow-left {
    position: absolute;
    left: 0;
    top: 13px;
    font-size: 24px;
  }
  .title {
    text-align: center;
  }
}
.content {
  padding: 24px 12px;
  text-align: center;
  .notify {
    font-size: 20px;
  }
  .desc {
    margin: 12px 0 40px;
    color: #999;
    font-size: 13px;
  }
  .qrcode-box {
    border: 0.5px #ff7876 solid;
    border-radius: 10px;
    padding: 27px 22px;
    position: relative;
    width: 350px;
    height: 350px;
  }
  .btn {
    margin-top: 40px;
    background-color: #ff5151;
    border-radius: 22px;
    color: white;
    line-height: 44px;
    font-size: 16px;
  }

  .warn {
    font-size: 12px;
    color: #999;
    margin-top: 10px;
  }
}
</style>
