<template>
  <div
    class="main-home account"
    :style="{ bottom: $route.query.displayType == 'detail' ? 0 : '1.33333rem' }"
  >
    <CommonHeader />
    <div class="myheaderbox" v-if="$route.name == 'user'">
      <div class="accnLayout">
        <div @click="$router.push({ name: 'setting' })" v-if="mapgetuserinfo">
          <div
            class="userimg"
            :style="{ backgroundImage: 'url(' + mapgetuserinfo.headPic + ')' }"
          ></div>
          <div class="DTextView">
            <span class="username">{{ mapgetuserinfo.nickName }}</span>
          </div>
          <div class="HImageView">
            <div class="userdes" v-if="mapgetuserinfo && mapgetuserinfo.phone">
              {{
                mapgetuserinfo.phone.replace(
                  /(\d{5})(\d{4})(\d{2})/,
                  "$1****$3"
                )
              }}
            </div>
          </div>
        </div>
        <div @click="$router.push({ name: 'setting' })" class="setting">
          <van-icon name="setting-o" />
        </div>
      </div>
      <!-- 关注 -->
      <!-- <div class="DFrameLayout">
        <div class="DLinearLayout">
          <div class="MFavorTextView">0</div>
          <div class="DTextView">收藏夹</div>
        </div>
        <div class="DLinearLayout">
          <div class="MFavorTextView">0</div>
          <div class="DTextView">关注</div>
        </div>
        <div class="DLinearLayout">
          <div class="MFavorTextView">0</div>
          <div class="DTextView">足迹</div>
        </div>
      </div> -->
    </div>
    <div class="scrollBox" v-if="$route.name == 'user'">
      <div class="block_card Orderlist">
        <van-cell
          title="我的订单"
          is-link
          value="全部订单"
          @click="$router.push({ name: 'order', query: { type: '0' } })"
        />
        <van-grid :column-num="5" center :border="false">
          <van-grid-item
            text="待付款"
            @click="$router.push({ name: 'order', query: { type: '2' } })"
            :badge="`${orderStatus2 > 0 ? orderStatus2 : ''}`"
          >
            <template #icon>
              <div class="orderimgbox">
                <img src="@/assets/image/common/waitPay.png" alt="" />
              </div>
            </template>
          </van-grid-item>
          <van-grid-item
            text="待发货"
            @click="$router.push({ name: 'order', query: { type: '4' } })"
            :badge="`${orderStatus4 > 0 ? orderStatus4 : ''}`"
          >
            <template #icon>
              <div class="orderimgbox">
                <img src="@/assets/image/common/waitSend.png" alt="" />
              </div>
            </template>
          </van-grid-item>
          <van-grid-item
            text="待收货"
            @click="$router.push({ name: 'order', query: { type: '5' } })"
            :badge="`${orderStatus5 > 0 ? orderStatus5 : ''}`"
          >
            <template #icon>
              <div class="orderimgbox">
                <img src="@/assets/image/common/waitConfirm.png" alt="" />
              </div>
            </template>
          </van-grid-item>
          <van-grid-item
            text="评价"
            @click="$router.push({ name: 'order', query: { type: '6' } })"
            :badge="`${orderStatus6 > 0 ? orderStatus6 : ''}`"
          >
            <template #icon>
              <div class="orderimgbox">
                <img src="@/assets/image/common/waitRate.png" alt="" />
              </div>
            </template>
          </van-grid-item>
          <van-grid-item
            text="退换货"
            @click="$router.push({ name: 'order', query: { type: '11' } })"
            :badge="`${orderStatus11 > 0 ? orderStatus11 : ''}`"
          >
            <template #icon>
              <div class="orderimgbox">
                <img src="@/assets/image/common/refund.png" alt="" />
              </div>
            </template>
          </van-grid-item>
        </van-grid>
      </div>
      <div class="block_card1 Orderlist">
        <van-grid :column-num="4" center :border="false">
          <van-grid-item text="优惠券" @click="goCouponsList">
            <template #icon>
              <div class="orderimgbox">
                <img src="@/assets/image/common/youhuiquan.png" alt="" />
              </div>
            </template>
          </van-grid-item>
          <van-grid-item text="商品收藏" @click="$router.push('/goodsCollect')">
            <template #icon>
              <div class="orderimgbox">
                <img src="@/assets/image/common/shouchang.png" alt="" />
              </div>
            </template>
          </van-grid-item>
          <van-grid-item text="店铺关注" @click="shopNumber">
            <template #icon>
              <div class="orderimgbox">
                <img src="@/assets/image/common/guanzhu.png" alt="" />
              </div>
            </template>
          </van-grid-item>
          <van-grid-item text="申请开店" @click="applyShop">
            <template #icon>
              <div class="orderimgbox">
                <img src="@/assets/image/common/dingdan.png" alt="" />
              </div>
            </template>
          </van-grid-item>
        </van-grid>
      </div>
      <div class="block_card1">
        <van-grid :column-num="4" center :border="false">
          <van-grid-item text="本地中心" @click="_goben">
            <template #icon>
              <div class="orderimgbox">
                <img src="@/assets/image/common/clg.png" alt="" />
              </div>
            </template>
          </van-grid-item>
          <van-grid-item text="名片网" is-link @click="_businesscard">
            <template #icon>
              <div class="orderimgbox">
                <img src="@/assets/image/common/vip.png" alt="" />
              </div>
            </template>
          </van-grid-item>
          <van-grid-item
            text="我的钱包"
            @click="$router.push({ name: 'wallet' })"
            is-link
          >
            <template #icon>
              <div class="orderimgbox">
                <img src="@/assets/image/common/m.png" alt="" />
              </div>
            </template>
          </van-grid-item>
          <!-- <van-grid-item
            text="个人中心"
            @click="$toast('该功能暂未开放')"
            is-link
          >
            <template #icon>
              <div class="orderimgbox">
                <img src="@/assets/image/grIcon.png" alt="" />
              </div>
            </template>
          </van-grid-item> -->
          <van-grid-item
            text="实名认证"
            is-link
            :value="mapgetuserinfo.identAuthStatus | identAuth"
            @click="_Certification"
          >
            <template #icon>
              <div class="orderimgbox">
                <img src="@/assets/image/common/s.png" alt="" />
              </div>
            </template>
          </van-grid-item>
          <van-grid-item
            text="抵用金"
            @click="$router.push({ name: 'credit' })"
            is-link
          >
            <template #icon>
              <div class="orderimgbox">
                <img src="@/assets/image/common/d.png" alt="" />
              </div>
            </template>
          </van-grid-item>
          <!-- <van-grid-item
            text="活动中心"
            @click="$toast('该功能暂未开放')"
            is-link
          >
            <template #icon>
              <div class="orderimgbox">
                <img src="@/assets/image/giftIcon.png" alt="" />
              </div>
            </template>
          </van-grid-item> -->
          <van-grid-item text="安全中心" @click="$router.push('/center')">
            <template #icon>
              <div class="orderimgbox">
                <img src="@/assets/image/common/a.png" alt="" />
              </div>
            </template>
          </van-grid-item>
          <van-grid-item text="客服中心" @click="service" is-link>
            <template #icon>
              <div class="orderimgbox">
                <img src="@/assets/image/common/p.png" alt="" />
              </div>
            </template>
          </van-grid-item>
          <van-grid-item
            text="关于我们"
            @click="$router.push({ name: 'aboutUs' })"
          >
            <template #icon>
              <div class="orderimgbox">
                <img src="@/assets/image/common/i.png" alt="" />
              </div>
            </template>
          </van-grid-item>
        </van-grid>
      </div>

      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :immediate-check="false"
        @load="onLoad"
      >
        <div>
          <div class="shop">
            <img
              src="@/assets/image/common/tuijian.png"
              style="vertical-align: middle"
              alt=""
            />
            <p>为您推荐</p>
            <img
              src="@/assets/image/common/tuijian.png"
              style="vertical-align: middle"
              alt=""
            />
          </div>
          <div>
            <template v-for="(item, index) in goodslist">
              <userCom :goodslist="item" :key="index" />
            </template>
          </div>
        </div>
      </van-list>
    </div>

    <!-- <div class="businesscard">
      <van-cell title="我的名片网" is-link @click="_businesscard" />
    </div> -->
    <!-- 我的钱包 -->
    <!-- <div class="block_card Orderlist">
      <van-cell title="我的钱包" is-link value="资金管理" />
      <van-grid :column-num="4">
        <van-grid-item>          
          <b class="wallet-text">{{ userinfo.availableMoney }}</b>
          <span class="van-grid-item__text">余额</span>
        </van-grid-item>
        <van-grid-item>          
          <b class="wallet-text">0</b>
          <span class="van-grid-item__text">红包</span>
        </van-grid-item>
        <van-grid-item>          
          <b class="wallet-text">6</b>
          <span class="van-grid-item__text">积分</span>
        </van-grid-item>
        <van-grid-item>          
          <b class="wallet-text">6</b>
          <span class="van-grid-item__text">优惠券</span>
        </van-grid-item>
      </van-grid>
    </div> -->
    <!-- <div class="block_card Orderlist credit">
      <van-cell title="我的抵用金" @click="$router.push({name:'credit'})" is-link :value="Moneydata.availableVoucherMoney" />
    </div> -->
    <!-- 我的订单 -->

    <!-- <div class="block_card Orderlist">
      <van-cell title="我的钱包" @click="$router.push({name:'wallet'})" is-link value="资金管理" />
    </div>
    <div class="block_card Orderlist">
      <van-cell is-link :value="getshopdata | fildshopdata" @click="applyShop" >
        <template #title>
          <span class="custom-title">立即申请</span>
          <van-tag type="danger" style="margin-left:5px;">限时免费</van-tag>
        </template>
      </van-cell>
    </div>
    <div class="block_card Orderlist">
      <van-cell is-link :value="mapgetuserinfo.identAuthStatus | identAuth" @click="_Certification" >
        <template #title>
          <span class="custom-title">实名认证</span>
        </template>
      </van-cell>
    </div>
    <div class="block_card Orderlist">
      <van-cell title="客服中心" @click="service" is-link  />
    </div> -->
    <router-view></router-view>
  </div>
</template>
<script>
import {
  countOrderStatusNum,
  getShopStatus,
  getUserInfo,
  getUserAccountMoney,
  checkUserIdentAuthStatus,
  getrecommend
} from "api";
import userCom from "@/components/goods/usercom.vue";
import { mapGetters, mapActions } from "vuex";
import CommonHeader from "@/components/CommonHeader.vue";
export default {
  name: "user",
  data() {
    return {
      OrderStatusNum: [],
      orderStatus2: 0,
      orderStatus3: 0,
      orderStatus4: 0,
      orderStatus5: 0,
      orderStatus6: 0,
      orderStatus7: 0,
      orderStatus11: 0,
      getshopdata: null,
      Moneydata: [],
      goodslist: [],
      loading: false,
      finished: false,
      pageNum: 1, // 当前页数
      pageSize: 20, // 每页条数
      clmH5:
        process.env.NODE_ENV === "development"
          ? "https://pageclm.expection.cn/"
          : "https://m.lkkjjt.com/" //CLM域名
    };
  },
  filters: {
    identAuth: function (key) {
      let data = "";
      switch (key) {
        case 1:
          data = "待审核";
          break;
        case 2:
          data = "未认证";
          break;
        case 3:
          data = "失败";
          break;
        case 4:
          data = "认证成功";
          break;
      }
      return data;
    },
    fildshopdata: function (type) {
      let data = "";
      switch (type) {
        case null:
          data = `商家入驻`;
          break;
        case 1:
          data = `已审核`;
          break;
        case 2:
          data = `审核失败`;
          break;
        case 3:
          data = `审核中`;
          break;
      }
      return data;
    }
  },
  components: {
    CommonHeader,
    userCom
  },
  computed: {
    ...mapGetters({
      mapgetuserinfo: "getuserinfo"
    })
  },
  methods: {
    goCouponsList() {
      this.$router.push("/couponsList");
    },
    shopNumber() {
      this.$router.push("/shopAttention");
    },
    shenQing() {
      this.$toast("功能开发中");
    },
    ...mapActions(["userinfo"]),
    service() {
      window.location.href = `https://yzf.qq.com/xv/web/static/chat/index.html?sign=37ef9b97817351957717cdbb1fb3b53708374ba573672f4fb385cf664728f448ddbba361c3cf4aa02bfe2f013d383c44d38a81ff`;
    },
    applyShop() {
      if (this.getshopdata == 3) {
        this.$toast("正在审核中，请稍后");
      } else if (this.getshopdata == 1) {
        this.$toast("您的店铺已经审核通过了");
      } else {
        this.$router.push({
          name: "shopapply",
          query: { type: this.getshopdata }
        });
      }
    },
    _Certification() {
      // if(this.mapgetuserinfo.identAuthStatus!=1&&this.mapgetuserinfo.identAuthStatus!=4){
      //       this._getUserInfo()
      // this.$router.push({name:'authentication'})
      // }
      const userinfo =
        JSON.parse(window.localStorage.getItem("userinfo")) || [];
      checkUserIdentAuthStatus(userinfo.token)().then((res) => {
        if (res && res.errorCode == 1) {
          this._getUserInfo();
          this.$router.push({
            name: "authentication",
            query: { type: "echo" }
          });
        } else {
          this.$router.push({ name: "authentication" });
        }
      });
    },
    _getUserAccountMoney() {
      getUserAccountMoney().then((res) => {
        if (res && res.errorCode == 1) {
          this.Moneydata = res.data;
        }
      });
    },
    _businesscard() {
      let seft = this;
      window.location.href = `https://clth5.lkkjjt.com/index/see?id=${seft.mapgetuserinfo.unionid}&token=${seft.mapgetuserinfo.token}`;
    },
    _goben() {
      //       https://pageclm.expection.cn //测试
      // https://m.lkkjjt.com //线上
      // /Myorder/mine?&token=%@
      // window.location.href = `https://pageclm.expection.cn/Myorder/mine?&token=${this.mapgetuserinfo.token}`;
      window.location.href =
        this.clmH5 +
        "Myorder/mine?&token=" +
        this.mapgetuserinfo.token +
        "&pageFrom=clg";
    },
    _countOrderStatusNum() {
      let seft = this;
      countOrderStatusNum().then((res) => {
        if (res && res.errorCode == 1) {
          seft.OrderStatusNum = res.data.content;
          seft.OrderStatusNum.forEach(function (item) {
            seft[`orderStatus${item.orderStatus}`] = item.count;
          });
        }
      });
    },
    _getShopStatus() {
      getShopStatus().then((res) => {
        if (res && res.errorCode == 1) {
          this.getshopdata = res.data;
        }
      });
    },
    _getUserInfo() {
      getUserInfo().then((res) => {
        if (res && res.errorCode == 1) {
          this.userinfo(res.data);
          window.localStorage.setItem("isSetPayPwd", res.data.isSetPayPwd);
        }
      });
    },
    onLoad() {
      this.pageNum++;
      this._getS();
    },
    _getS() {
      // this.loading = true;
      getrecommend({
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then((res) => {
        if (res && res.errorCode === 1) {
          // this.refreshing = false;
          this.loading = false;
          this.goodslist = this.goodslist.concat(res.data.content);

          // if (res.data.content.length) {
          //   this.fun(res.data.content);
          // }
          if (!res.data.isHasNextPage) {
            this.finished = true;
            this.finishedText = "- 没有更多了-";
          }
        }
      });
    }
  },
  created() {
    this._countOrderStatusNum();
    this._getUserAccountMoney();
    this._getShopStatus();
    this._getUserInfo();
    this._getS();
  },
  activated() {
    this._countOrderStatusNum();
    this._getShopStatus();
    this._getUserInfo();
    this._getUserAccountMoney();
    // this._getS();
  }
};
</script>

<style lang="scss" scoped>
.shop {
  width: fit-content;
  margin: 10px auto;
  align-items: center;
  font-size: 13px;
  color: #cf0000;
  display: flex;
  img {
    width: 54px;
    height: 1px;
  }
}
:deep(.van-grid-item__content) {
  padding: 5px !important;
}
// .scrollBox {
//   overflow-y: auto;
//   height: calc(100% - 90px);
// }
.account {
  background: #f0f0f0;
  .myheaderbox {
    // height: 148px;
    height: 120px;
    background-image: url("../../assets/image/common/bexi.png");
    background-repeat: no-repeat;
    // background: #930200;
    background-size: 100% 100%;
    .accnLayout {
      display: flex;
      overflow: hidden;
      -webkit-flex: 0 0 auto;
      flex: 0 0 auto;
      height: 81px;
      -webkit-align-self: flex-start;
      align-self: flex-start;
      justify-self: flex-start;
      position: relative;
      .userimg {
        display: flex;
        overflow: hidden;
        position: absolute;
        border-radius: 25px;
        margin-left: 18px;
        margin-top: 28px;
        left: 0;
        top: 0;
        width: 49px;
        height: 49px;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: contain;
        border: 1px #ffffff solid;
      }
      .DTextView {
        display: flex;
        overflow: hidden;
        position: absolute;
        font-size: 20px;
        color: #ffffff;
        width: 200px;
        height: auto;
        margin-top: 30px;
        margin-left: 79px;
        font-weight: bold;
        -webkit-justify-content: flex-start;
        justify-content: flex-start;
        -webkit-align-items: center;
        align-items: center;
        max-width: auto;
        -webkit-box-pack: start;
        -webkit-box-align: center;
        .username {
          text-overflow: ellipsis;
          overflow: hidden;
          line-height: 24px;
          white-space: nowrap;
        }
      }
      .HImageView {
        display: flex;
        overflow: hidden;
        position: absolute;
        width: 145px;
        height: 21px;
        margin-left: 79px;
        margin-top: 60px;
        .userdes {
          width: 100%;
          height: 100%;
          background-repeat: no-repeat;
          background-position: center center;
          background-size: 100% 100%;
          font-size: 12px;
          color: #fff;
        }
      }
      .setting {
        display: flex;
        overflow: hidden;
        position: absolute;
        width: 40px;
        height: auto;
        margin-top: 25px;
        -webkit-flex-direction: row;
        flex-direction: row;
        right: 10px;
        top: 0;
        -webkit-box-orient: horizontal;
        -webkit-box-direction: normal;
        color: #fff;
        .van-icon-setting-o {
          font-size: 22px;
        }
      }
    }
    .DFrameLayout {
      display: flex;
      overflow: hidden;
      -webkit-flex: 0 0 auto;
      flex: 0 0 auto;
      height: 67px;
      width: 375px;
      -webkit-align-self: flex-start;
      align-self: flex-start;
      justify-self: flex-start;
      position: relative;
      justify-content: space-between;
      flex-direction: row;
      flex-wrap: wrap;
      .DLinearLayout {
        display: flex;
        overflow: hidden;
        // width: 91px;
        height: 61px;
        -webkit-flex-direction: column;
        flex-direction: column;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        .MFavorTextView {
          display: flex;
          overflow: hidden;
          -webkit-flex: 0 0 auto;
          flex: 0 0 auto;
          margin-top: 10.5px;
          -webkit-justify-content: center;
          justify-content: center;
          -webkit-align-items: center;
          align-items: center;
          color: #ffffff;
          width: 91px;
          height: auto;
          font-size: 14px;
          max-width: auto;
          -webkit-box-pack: center;
          -webkit-box-align: center;
        }
        .DTextView {
          display: flex;
          overflow: hidden;
          -webkit-flex: 0 0 auto;
          flex: 0 0 auto;
          margin-top: 10px;
          -webkit-justify-content: center;
          justify-content: center;
          -webkit-align-items: center;
          align-items: center;
          color: #ffffff;
          width: 91px;
          height: auto;
          font-size: 12px;
          max-width: auto;
          -webkit-box-pack: center;
          -webkit-box-align: center;
        }
      }
    }
  }

  .block_card {
    margin: -30px 10px 0px;
    overflow: hidden;
    border-radius: 8px;
    .van-grid-item__icon-wrapper {
      .orderimgbox {
        text-align: center;
        img {
          width: 50%;
        }
      }
    }
    .van-grid-item__text {
      margin-top: -5px;
    }
    .wallet-text {
      height: 25px;
      color: #ec5151;
      font-size: 16px;
    }
  }
  .block_card1 {
    margin: 10px 10px 0;
    overflow: hidden;
    border-radius: 8px;
    // height: 135px;
    .van-grid-item__icon-wrapper {
      .orderimgbox {
        text-align: center;
        img {
          width: 50%;
        }
      }
    }
    .van-grid-item__text {
      margin-top: -5px;
    }
    .wallet-text {
      height: 25px;
      color: #ec5151;
      font-size: 16px;
    }
  }
  :deep(.van-info) {
    right: 18px;
    top: 6px;
  }
  .businesscard {
    padding: 10px 10px 0 10px;
    .van-cell {
      border-radius: 8px;
      overflow: hidden;
      margin-top: -30px;
    }
  }
  .credit {
    .van-cell__value {
      color: #e60303;
    }
  }
}
</style>
