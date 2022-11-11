<template>
  <div class="shopSucceed">
    <van-icon class="return" name="arrow-left" @click="$router.back()" />
    <div>
      <div class="one">
        <img src="~@/assets/image/succeed.png" alt="" />
        <h2>恭喜你，开店成功！</h2>
        <p>快来发布店铺的第一个商品吧</p>
      </div>
      <div class="two" @click="toAppStore">
        <p>下载开店必备官方工具</p>
        <div>
          <p>点击下载诚聊卖电商APP<van-icon name="arrow" /></p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      url: ""
    };
  },
  created() {
    var iosLinkUrl = "https://itunes.apple.com/cn/app/id1558426664?mt=8";
    var androidLinkurl = "market://details?id=shop.itbug.ExpectationMall";
    // var androidLinkurl ="https://a.app.qq.com/o/simple.jsp?pkgname=shop.itbug.ExpectationMall";
    var u = navigator.userAgent,
      isAndroid,
      isIOS;
    isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1; //android终端 s
    isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    var link = isIOS ? iosLinkUrl : androidLinkurl;
    if (isAndroid) {
      if (u.match(/MicroMessenger/i) == "micromessenger") {
        link =
          "https://a.app.qq.com/o/simple.jsp?pkgname=shop.itbug.ExpectationMall#";
      }
    }
    this.url = link;
  },
  methods: {
    toAppStore() {
      location.href = this.url;
    }
  }
};
</script>

<style scoped lang="scss">
.shopSucceed {
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  .return {
    font-size: 20px;
    margin: 10px;
    color: #000000;
  }

  > div {
    padding-top: 10vh;
  }
  .one {
    text-align: center;
    img {
      width: 47px;
      height: 47px;
    }
    h2 {
      margin-top: 15px;
      color: #000000;
      font-size: 18px;
    }
    p {
      color: #bcbcbc;
      font-size: 12px;
      margin-top: 10px;
    }
  }
  .two {
    width: 330px;
    margin: 0 auto;
    margin-top: 80px;
    > p {
      color: #000000;
      font-size: 11px;
      margin-bottom: 10px;
    }
    > div {
      height: 76px;
      background-image: url("~@/assets/image/shopSucceed.png");
      background-size: 100% 100%;
      p {
        color: #ffffff;
        text-align: center;
        font-size: 16px;
        line-height: 76px;
        .van-icon {
          margin-left: 15px;
        }
      }
    }
  }
}
</style>
