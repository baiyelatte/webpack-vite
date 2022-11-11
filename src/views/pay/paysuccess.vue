<template>
  <router-layout>
    <!-- <van-nav-bar title="交易成功"  left-arrow  @click-left="$router.back()" /> -->
    <div class="success">
      <template
        v-if="
          $route.query.payType == 1 ||
          $route.query.payType == 3 ||
          $route.query.payType == 4
        "
      >
        <div class="icons">
          <van-icon
            name="success"
            size="22"
            color="#ee0a24"
            style="margin-right: 10px"
          />
          <span class="tit">交易成功</span>
        </div>
      </template>
      <template v-else-if="$route.query.payType == 2">
        <div class="icons" v-if="success == 10001">
          <van-icon
            name="cross"
            size="22"
            color="#ee0a24"
            style="margin-right: 10px"
          />
          <span class="tit">待支付</span>
        </div>
        <div class="icons" v-else-if="success == 1">
          <van-icon
            name="success"
            size="22"
            color="#ee0a24"
            style="margin-right: 10px"
          />
          <span class="tit">交易成功</span>
        </div>
      </template>
      <div class="suc_btn">
        <van-button
          type="danger"
          size="small"
          class="bottom-button"
          style="margin-right: 20px"
          @click="_BoackHOME"
          >返回主页</van-button
        >
        <van-button
          type="default"
          size="small"
          class="bottom-button"
          @click="_vieworder"
          >查看订单</van-button
        >
      </div>
    </div>
    <div class="official">
      <div class="top">
        <img src="@/assets/image/official.jpg" alt="" />
        <div class="rightBox">
          <p>微信搜一搜</p>
          <div class="searchBox">
            <van-icon name="search" />
            <p>诚聊购</p>
          </div>
        </div>
      </div>
      <p>扫码关注诚聊购公众号，订单信息，精彩内容不容错过</p>
    </div>
    <!-- 为您推荐 -->
    <div class="preferential">
      <van-divider>猜你喜欢</van-divider>
      <div class="goodsbox">
        <div ref="goodsList1">
          <template v-for="(item, index) in goodsList1">
            <GoodItem :goodItem="item" :key="index" />
          </template>
        </div>
        <div ref="goodsList2">
          <template v-for="(item, index) in goodsList2">
            <GoodItem :goodItem="item" :key="index" />
          </template>
        </div>
      </div>
    </div>
  </router-layout>
</template>
<script>
import { getrecommend, getUserInfo, getcheckPay } from "api";
import GoodItem from "@/components/goods/goodItem";
import localCache, { PAYSUCCESSREDIRECTURL } from "@/utils/cache";
import { mapActions } from "vuex";
export default {
  name: "paysuccess",
  components: {
    GoodItem
  },
  data() {
    return {
      goodslist: [],
      goodsList1: [],
      goodsList2: [],
      success: null
    };
  },
  created() {
    // 取诚聊购过来
    this.$route.query.token == undefined
      ? []
      : localStorage.setItem(
          "userinfo",
          JSON.stringify({ token: this.$route.query.token })
        );

    if (JSON.parse(this.$route.query.payType) == 2) {
      // if(localStorage.getItem('wxshowcash')){
      this.$confirm({
        message: "请确认微信支付是否已完成"
      })
        .then(() => {
          localStorage.removeItem("wxshowcash");
          this._getcheckPay();
        })
        .catch(() => {
          localStorage.removeItem("wxshowcash");
          this._getcheckPay();
        });
      // }
    }
    // this._getcheckPay()
    this._getgetrecommend();
    this._getUserInfo();
  },
  methods: {
    ...mapActions(["userinfo"]),
    _getcheckPay() {
      getcheckPay({ paySn: this.$route.query.paySn }).then((res) => {
        let { errorCode, msg } = res;
        this.success = errorCode;
        if (errorCode == 1) {
          console.log(msg);
        }
        if (errorCode == errorCode) {
          console.log(msg);
        }
      });
    },
    _getUserInfo() {
      if (this.$route.query.token) {
        getUserInfo({ token: this.$route.query.token }).then((res) => {
          this.userinfo(res.data);
        });
      }
    },
    _BoackHOME() {
      const redirectUrl = localCache.getCache(PAYSUCCESSREDIRECTURL);
      if (redirectUrl) {
        localCache.deleteCache(PAYSUCCESSREDIRECTURL);
        window.location.href = redirectUrl;
      }
      this.$router.replace("/");
    },
    _vieworder() {
      this.$router.push({ name: "order", query: { type: "0" } });
    },
    _getgetrecommend() {
      getrecommend().then((res) => {
        if (res && res.errorCode === 1) {
          this.goodslist = res.data.content;
          this.fun(res.data.content);
        }
      });
    },
    fun(arr) {
      if (arr.length <= 0) {
        this.loading = false;
        return;
      }
      var leftHeight = this.$refs.goodsList1.offsetHeight;
      var rightHeight = this.$refs.goodsList2.offsetHeight;
      if (leftHeight <= rightHeight) {
        this.goodsList1.push(arr.shift());
      } else {
        this.goodsList2.push(arr.shift());
      }
      this.$nextTick(function () {
        this.fun(arr);
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.goodsbox {
  display: flex;
  justify-content: space-between;
  > div {
    width: 49%;
    height: fit-content;
  }
}
.official {
  margin: 10px;
  color: black;
  padding: 10px;
  background: #ffffff;
  > p {
    font-size: 13px;
  }
  .top {
    display: flex;
    align-items: center;
    .rightBox {
      margin-left: 10px;
      > p {
        font-size: 20px;
        text-align: center;
        padding-bottom: 10px;
      }
      .searchBox {
        display: flex;
        width: 200px;
        height: 25px;
        border: 1px solid #dcdbdb;
        border-radius: 6px;
        line-height: 25px;
        i {
          line-height: 25px;
          font-size: 15px;
          margin-left: 5px;
        }
        p {
          font-size: 13px;
        }
      }
    }
    img {
      width: 100px;
      height: 100px;
    }
  }
}
.success {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .icons {
    margin-top: 40px;
    flex: 1;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 0;
  }
  .tit {
    font-size: 15px;
  }
  .bottom-button {
    width: 90px;
  }
}
.preferential {
  width: 100%;
  margin-top: 20px;
  padding: 0 10px;
}
.suc_btn {
  margin-top: 10px;
}
</style>
