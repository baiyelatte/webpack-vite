<template>
  <div class="aboutUs">
    <van-nav-bar
      :title="$route.meta.title"
      v-if="!$route.meta.CLAPP"
      left-arrow
      @click-left="$router.back()"
    />
    <div class="toppic">
      <div class="app-logo">
        <img src="../../../assets/image/appLogo.png" alt="" />
      </div>
      <div class="app-name">诚聊购</div>
      <div class="app-name">Version 1.1.1</div>
    </div>
    <!-- <div class="list">
            <div>系统版本：Version 1.1.1</div>
            <div>
                去评价
                <span class="jiantou"></span>
            </div>
        </div> -->
    <div class="list">
      <div>诚聊购公众号</div>
      <div class="guanzhu" @click="notice('诚聊购')">关 注</div>
    </div>
    <div class="list">
      <div>诚聊卖公众号</div>
      <div class="guanzhu" @click="notice('诚聊卖')">关 注</div>
    </div>
    <div class="baike">
      <div style="display: flex; justify-content: center">
        <div
          class="agreement"
          @click="$router.push({ name: 'protocol' })"
          tag="a"
        >
          《用户协议》
        </div>
        <div
          class="agreement"
          @click="$router.push({ name: 'service' })"
          tag="a"
        >
          《隐私政策》
        </div>
      </div>

      <div style="margin-top: 5px">
        您通过本软件参加的商业活动，与apple Inc无关
      </div>
    </div>
    <input id="copyNode" onclick="" style="cursor: pointer" type="hidden" />
  </div>
</template>
<script>
import ClipboardJS from "clipboard";
export default {
  name: "aboutUs",
  data() {
    return {
      copyData: ""
    };
  },
  created() {
    this.createClipboard();
  },
  methods: {
    createClipboard() {
      const clipboard = new ClipboardJS("#copyNode", {
        text: (trigger) => {
          return this.copyData;
        }
      });

      clipboard.on("success", (e) => {
        this.$notify({
          title: "成功",
          message: "公众号复制成功，请前往微信进行关注",
          type: "success"
        });
      });

      clipboard.on("error", (e) => {
        this.$notify({
          title: "失败",
          message: "复制失败, 请手动进行复制。",
          type: "danger"
        });
      });
    },
    notice(val) {
      this.copyData = val;
      this.copy(val);
    },
    copy(str) {
      document.getElementById("copyNode").click();
      // var save = function (e){
      //     e.clipboardData.setData('text/plain',str);//下面会说到clipboardData对象
      //     e.preventDefault();//阻止默认行为
      // }
      // document.addEventListener('copy',save);
      // document.execCommand("copy");//使文档处于可编辑状态，否则无效
    }
  }
};
</script>
<style lang="scss" scoped>
.aboutUs {
  min-height: 100vh;
  background-color: #f0f0f0;
  .toppic {
    margin: 30px 0;
    text-align: center;

    .app-logo {
      width: 100px;
      height: 100px;
      margin: 0 auto;
      img {
        width: 100%;
      }
    }
    .app-name {
      margin-top: 10px;
      font-size: 16px;
    }
  }
  .list {
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    padding: 15px 15px;
    background: #fff;
    align-items: center;
    margin-bottom: 6px;
    .jiantou {
      width: 12px;
      height: 12px;
      border: 2px solid transparent;
      border-top-color: #333;
      border-right-color: #333;
      transform: rotateZ(45deg);
      margin-left: 1px;
      display: inline-block;
    }
    .guanzhu {
      color: $blue;
      font-size: 14px;
    }
  }
  .baike {
    position: fixed;
    bottom: 35px;
    width: 100%;
    font-size: $font-size-small;
    text-align: center;
    background: none;
    .agreement {
      color: $red;
    }
  }
}
</style>
