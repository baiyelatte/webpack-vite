<template>
  <div class="wrapper">
    <div class="qrcode" ref="qrcode"></div>
    <img :src="src" :style="computedStyle" alt="" />
    <div class="loading">
      <van-loading size="24px" color="#ff7876" vertical>加载中...</van-loading>
    </div>
  </div>
</template>

<script>
import QRCode from "@/assets/js/QRCode";
import { convertCanvasToImg, downImg } from "@/utils/dom";
export default {
  name: "QrCode",

  props: {
    value: {
      type: String,
      default: "默认数据"
    },
    size: {
      type: Number,
      default: 300
    },
    level: {
      type: String,
      default: "H"
    },
    colorDark: {
      type: String,
      default: "#000000"
    },
    colorLight: {
      type: String,
      default: "#ffffff"
    },
    // 嵌入图片连接
    avatar: {
      type: String,
      default: ""
    },
    // 图片宽高
    avatarSize: {
      type: Number,
      default: 70
    },
    // 二维码清晰度
    clearLevel: {
      type: Number,
      default: 4
    }
  },

  data() {
    return {
      qrcode: null,
      canvas: null,
      loading: true,
      src: ""
    };
  },

  mounted() {
    const dom = this.$refs.qrcode;
    this.initCanvas(dom);
  },

  computed: {
    computedStyle() {
      return {
        width: (this.size / 36) * this.clearLevel + "rem",
        height: (this.size / 36) * this.clearLevel + "rem",
        zIndex: this.avatar ? (this.loading ? -1 : 1) : 1,
        transform: `scale(${1 / this.clearLevel})`,
        "transform-origin": "top left",
        position: "relative"
      };
    }
  },

  methods: {
    initCanvas(dom) {
      this.qrcode = new QRCode(dom, {
        text: this.value,
        width: this.size * this.clearLevel,
        height: this.size * this.clearLevel,
        colorDark: this.colorDark,
        colorLight: this.colorLight,
        correctLevel: QRCode.CorrectLevel[this.level]
      });

      this.canvas = dom.getElementsByTagName("canvas")[0];
      const img = dom.getElementsByTagName("img")[0];

      this.canvas.style.display = "none";

      dom.removeChild(img);
      this.addAvatar();
    },
    addAvatar() {
      if (!this.avatar) {
        this.src = this.canvas.toDataURL("image/png");
        return;
      }

      const ctx = this.canvas.getContext("2d");
      const img = new Image();

      img.setAttribute("crossOrigin", "Anonymous");

      img.onload = () => {
        const width = this.avatarSize * this.clearLevel;

        const distance = (this.size * this.clearLevel - width) / 2;

        ctx.drawImage(img, distance, distance, width, width);

        this.src = this.canvas.toDataURL("image/png");

        this.loading = false;
      };
      img.src = this.avatar;
    },
    download() {
      const img = convertCanvasToImg(this.canvas);
      downImg(img);
    }
  },

  watch: {
    value(val) {
      this.qrcode?.makeCode(val);
      this.src = this.canvas.toDataURL("image/png");
    }
  },

  destroyed() {
    this.qrcode.clear();
  }
};
</script>

<style scoped lang="scss">
.wrapper {
  position: relative;
}
.loading {
  width: 100%;
  height: 100%;
  background-color: #f7f8fa;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
}
</style>
