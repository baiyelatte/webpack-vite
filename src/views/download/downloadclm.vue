<template>
  <div>
    <div id="box">
      <div id="top">
        <img src="@/assets/image/download/clm-logo.png" alt="" />
      </div>
      <div id="text">
        <h2>诚聊卖</h2>
        <p class="version">电商版</p>
        <p>诚心优选<span>|</span>便利开店</p>
      </div>
      <div id="content">
        <div class="qr-code">
          <div class="wrapper">
            <div class="box">
              <qr-code
                class="code"
                :size="75"
                :value="iosUrl"
                :avatarSize="30"
                :avatar="require('@/assets/image/download/apple_black.png')"
              ></qr-code>
            </div>
          </div>
          <div class="wrapper">
            <div class="box" @click="andQrClick">
              <div class="qr-box" v-if="!androidUrl">
                <van-loading size="24px" color="#ff7876" vertical
                  >加载中...</van-loading
                >
              </div>
              <qr-code
                v-else
                class="code"
                :size="75"
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
</template>
<script>
import QrCode from "@/components/common/QrCode";
import callAppMixin from "@/mixins/callApp";
import { getClmAndroidVersion } from "api";

export default {
  data() {
    return {
      shadeFlg: false,
      lib: null,
      androidUrl:
        "http://mallres.lkkjjt.com/deploy_mall_shops_release_v1.0.1_2_2.apk",
      iosUrl: "https://itunes.apple.com/cn/app/id1582767555?mt=8",
      onlyDownload: true
    };
  },
  mixins: [callAppMixin],
  components: { QrCode },
  async created() {
    try {
      const {
        data: { upgradeUrl }
      } = await getClmAndroidVersion({
        verNum: 1,
        source: 2,
        platform: "android"
      });

      this.androidUrl = upgradeUrl;
    } catch (err) {
      console.log(err, "err");
    }
  },
  mounted() {},
  methods: {
    andQrClick() {
      const ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        this.shadeFlg = true;
      }
    }
  }
};
</script>
<style scoped lang="scss">
#box {
  background-image: url("~@/assets/image/download/clm-bg.png");
  background-size: 100%;
  background-repeat: no-repeat;
  background-position-y: -70px;
  min-height: 100vh;
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
  color: #fd5a00;
  text-align: center;
  h2 {
    margin-top: 9px;
    font-size: 20px;
  }

  p {
    font-size: 18px;
    margin-top: 5px;
  }
  .version {
    background-color: #fff;
    padding-bottom: 6px;
  }
}
#content {
  margin: 50px 40px 29.5px;
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
      .box {
        overflow: hidden;
        border-radius: 7.5px;
        padding: 3px;
        .code {
          transform: translate(-2px, -2px);
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
      background-color: #fd5a00;
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
</style>
