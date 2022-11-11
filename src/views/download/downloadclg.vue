<template>
  <router-layout>
    <van-nav-bar
      :title="$route.meta.title"
      v-if="!$route.meta.CLAPP"
      left-arrow
      @click-left="$router.back()"
      fixed
      placeholder
    />
    <div id="downBox">
      <div id="box">
        <div id="top">
          <img src="@/assets/image/download/logo.png" alt="" />
        </div>
        <div id="text">
          <h2>诚聊购</h2>
          <p>诚信社交电商平台</p>
        </div>
        <div id="content">
          <div class="qr-code">
            <div class="wrapper">
              <div class="box">
                <qr-code
                  class="code"
                  :size="73"
                  :value="iosUrl"
                  :avatarSize="30"
                  :avatar="require('@/assets/image/download/apple_black.png')"
                ></qr-code>
              </div>
            </div>
            <div class="wrapper">
              <div class="box" v-longpress="andQrClick">
                <div v-if="isMicromessenger" class="mark"></div>
                <div class="qr-box" v-if="!androidUrl">
                  <van-loading size="24px" color="#ff7876" vertical
                    >加载中...</van-loading
                  >
                </div>
                <qr-code
                  v-else
                  class="code"
                  :size="73"
                  :value="androidUrl"
                  :avatarSize="30"
                  :avatar="require('@/assets/image/download/android_black.png')"
                ></qr-code>
              </div>
            </div>
          </div>
          <div class="btns">
            <div class="btn" @click="handleCallApp()">
              <img src="@/assets/image/download/apple_white.png" alt="" />
              <span>iPhone版下载</span>
            </div>
            <div class="btn" @click="handleCallApp(true)">
              <img src="@/assets/image/download/android_white.png" alt="" />
              <span>Android版下载</span>
            </div>
          </div>
        </div>
      </div>
      <div id="shade" v-if="shadeFlg" @click="shadeFlg = false">
        <img src="@/assets/image/download/shade.png" alt="" />
      </div>
    </div>
  </router-layout>
</template>
<script>
import QrCode from "@/components/common/QrCode";
import callAppMixin from "@/mixins/callApp";
import { getAndroidVersion } from "api";

export default {
  name: "classify",
  data() {
    return {
      lib: null
    };
  },
  mixins: [callAppMixin],
  components: { QrCode },
  computed: {
    isMicromessenger() {
      const ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
      }
      return false;
    }
  },
  async created() {
    try {
      const {
        data: { upgradeUrl }
      } = await getAndroidVersion({
        verNum: 1,
        source: 1,
        platform: "android"
      });

      this.androidUrl = upgradeUrl;
    } catch (err) {
      console.log(err, "err");
    }
  },
  mounted() {
    // window.onresize = () => {
    //   this.onload();
    // };
  },
  methods: {
    andQrClick() {
      this.shadeFlg = this.isMicromessenger;
    }
    // onload() {
    //   let h =
    //     document.getElementById("top").clientHeight +
    //     document.getElementById("text").clientHeight;
    //   document.getElementById("content").style.minHeight =
    //     "calc(100vh - " + h + "px)";
    // }
  }
};
</script>
<style scoped lang="scss">
#downBox {
  height: calc(100% - 1.22667rem);
}
#box {
  background-image: url("~@/assets/image/download/bg.png");
  background-size: 100%;
  background-repeat: no-repeat;
  background-position-y: -45px;
  min-height: 100%;
}
#top {
  padding-top: 140px;
  img {
    width: 94px;
    display: block;
    margin: 0 auto;
  }
}
#text {
  color: #cf0000;
  text-align: center;
  h2 {
    margin-top: 3px;
    font-size: 20px;
  }
  p {
    font-size: 16px;
    margin-top: 9px;
  }
}
#content {
  margin: 30px 40px 0 40px;
  box-sizing: content-box;
  .qr-code {
    display: flex;
    justify-content: space-between;
    margin: 0 26.5px 10px;
    .wrapper {
      width: 84px;
      height: 84px;
      border: 1px solid;
      border-radius: 7.5px;
      padding: 1px;
      box-sizing: border-box;
      overflow: hidden;
      position: relative;
      .box {
        overflow: hidden;
        border-radius: 7.5px;
        padding: 3px;
        .code {
          transform: translate(-2px, -2px);
        }
        .mark {
          width: 100%;
          height: 100%;
          position: absolute;
          z-index: 2;
          top: 0;
          left: 0;
        }
      }
    }
  }
  .btns {
    display: flex;
    justify-content: space-between;
    .btn {
      display: flex;
      align-items: center;
      img {
        width: 22px;
        height: 22px;
        margin-right: 5px;
      }
      width: 137.5px;
      background-color: #cf0000;
      border-radius: 5px;
      height: 32.5px;
      line-height: 32.5px;
      font-size: 14px;
      color: #fff;
    }
  }
}

#content img {
  width: 100%;
  display: block;
}

#content > div > div > img {
  width: 27px;
  height: 27px;
}

#content > div > div {
  margin: 10px auto;
  width: 170px;
  display: flex;
  border: 1px solid #ffffff;
  padding: 5px;
  border-radius: 4px;
}

#content > div > div > p {
  font-size: 18px;
  color: #ffffff;
  line-height: 27px;
  margin-left: 5px;
}
#shade {
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  right: 0;
}
#shade img {
  width: 60%;
  float: right;
  margin-right: 10px;
  margin-top: 10px;
}

.qr-box {
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
