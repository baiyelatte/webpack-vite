<template>
  <router-layout>
    <div
      v-if="!isWeixin"
      class="fullscreen"
      ref="wrapper"
      allowfullscreen="true"
      @fullscreenchange="onFullscreenChange"
    >
      <qrcode-stream :camera="camera" @decode="onDecode" @init="logErrors">
        <div
          class="scanner-wrapper"
          :style="{
            'background-image': `url(${require('@/assets/image/scanner/background.png')})`
          }"
        >
          <div class="scanner-box">
            <div class="header">
              <div class="title">扫描二维码</div>
              <van-icon
                class="arrow-left"
                name="arrow-left"
                @click="$router.replace('/index')"
              />
            </div>

            <div
              class="scanner-body"
              :style="{
                'background-image': `url(${require('@/assets/image/scanner/border.png')})`
              }"
            >
              <img
                :src="require('@/assets/image/scanner/block.png')"
                class="scanner-block"
              />
            </div>
          </div>
        </div>
      </qrcode-stream>
    </div>
  </router-layout>
</template>

<script>
import { QrcodeStream } from "vue-qrcode-reader";
import scanner from "@/mixins/scanner";

export default {
  components: { QrcodeStream },

  data() {
    return {
      destroyed: false,
      camera: "auto",
      toast: null
    };
  },

  mixins: [scanner],

  created() {
    this.toast = this.$toast.loading({
      message: "加载中...",
      forbidClick: true
    });
  },

  mounted() {
    // this.requestFullscreen();
  },

  computed: {},

  watch: {},

  methods: {
    onDecode(result) {
      this.camera = "off";
      // this.$notify(`扫描成功！扫描结果:${result}`);
      // this.result = result;
      const flag = this.goToApplyJoinPage(result);
      if (flag) {
        this.camera = "auto";
      }
    },
    onFullscreenChange(event) {
      this.fullscreen = document.fullscreenElement !== null;
    },

    requestFullscreen() {
      const elem = this.$refs.wrapper;

      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        /* Firefox */
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        /* IE/Edge */
        elem.msRequestFullscreen();
      }
    },

    async logErrors(promise) {
      try {
        await promise;
      } catch (error) {
        let errorMsg = "";
        switch (error.name) {
          case "NotAllowedError":
            errorMsg = "权限不足，请授予浏览器相机权限后重试。";
            break;
          case "NotFoundError":
            errorMsg = "ERROR: no camera on this device。";
            break;
          case "NotSupportedError":
            errorMsg = "ERROR: secure context required (HTTPS, localhost)";
            break;
          case "NotReadableError":
            errorMsg = "ERROR: is the camera already in use?";
            break;
          case "OverconstrainedError":
            errorMsg = "ERROR: installed cameras are not suitable";
            break;
          case "StreamApiNotSupportedError":
            errorMsg = "ERROR: Stream API is not supported in this browser";
            break;
          case "InsecureContextError":
            errorMsg =
              "ERROR: Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.";
            break;
          default:
            errorMsg = `ERROR: Camera error (${error.name})`;
            break;
        }

        this.scannerToastInstance = this.$toast(errorMsg);
      } finally {
        this.scannerToastInstance.clear();
      }
    },

    async reload() {
      this.destroyed = true;

      await this.$nextTick();

      this.destroyed = false;
    }
  }
};
</script>

<style scoped lang="scss">
.fullscreen {
  position: relative;
  height: 100vh;
  .scanner-wrapper {
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: 100%;
    height: 100%;
    .scanner-box {
      padding: 28px;
      .header {
        position: relative;
        color: #fff;
        font-size: 16px;
        .arrow-left {
          position: absolute;
          left: 0;
          top: -4px;
          font-size: 24px;
        }
        .title {
          text-align: center;
        }
      }

      .scanner-body {
        position: absolute;
        width: 333px;
        height: 333px;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        margin: auto;
        background-color: transparent;
        background-size: 333px 333px;
        border-radius: 20px;
        overflow: hidden;
        .scanner-block {
          position: absolute;
          top: 0;
          height: 50px;
          width: 100%;
          animation: forward 1.5s infinite linear;
        }
      }
    }
  }

  @keyframes forward {
    0% {
      top: 0;
    }
    100% {
      top: 283px;
    }
  }
}
</style>
