<template>
  <router-layout>
    <div class="share">
      <van-nav-bar
        :title="$route.meta.title"
        left-arrow
        @click-left="routerBack"
      />
      <img class="topImg" :src="shareBg1" alt="" />
      <div class="topPacket" v-if="!!couponInfo">
        <img
          v-if="couponInfo.couponType === 3"
          class="max"
          src="~@/assets/image/share/max.png"
          alt=""
        />
        <div class="title" v-if="couponInfo.couponType === 3">随机满减</div>
        <div :class="couponInfo.couponType === 3 ? 'random-price' : 'price'">
          {{ priceComputed }}
        </div>

        <div :class="couponInfo.couponType === 3 ? 'random-rules' : 'rules'">
          {{ ruleComputed }}
        </div>
        <!-- <div v-if="couponInfo.couponType !== 3" class="expires">
          {{ getTime }}
        </div> -->
        <div class="footer">
          <div class="use-btn" @click="$router.push('/index')"></div>
          <!-- <div class="extra-info">全品类商品可用</div> -->
        </div>
      </div>
      <div class="contentBox">
        <div class="contentTop">
          <p>
            推荐{{ activityInfo.limitType ? "每满" : "满"
            }}{{ activityInfo.shareLimit }}人完成注册即可获得
          </p>
        </div>
        <div class="content">
          <h2>分享给好友</h2>
          <div class="inviteBox">
            <div
              v-for="item in activityInfo.shareLimit"
              :key="item"
              class="inviteItem"
            >
              <div
                class="shareLimitBg"
                v-if="
                  invitedUserHeadPicList.length > activityInfo.shareLimit &&
                  item === activityInfo.shareLimit
                "
              >
                {{ invitedUserHeadPicList.length }}人
              </div>
              <img
                v-if="invitedUserHeadPicList[item - 1]"
                :src="invitedUserHeadPicList[item - 1]"
                alt=""
              />
              <div v-else>
                <div>
                  <van-icon name="plus" />
                </div>
                <p>待邀请</p>
              </div>
            </div>
          </div>
        </div>
        <van-button
          class="shareBtn"
          :disabled="isDisableInvite"
          @click="shareClick"
          >立即邀请好友</van-button
        >
        <div class="rule">
          <h3>领取规则</h3>
          <p>
            1、活动期间，凡是分享线上商城，且推荐{{
              activityInfo.limitType ? "每" : ""
            }}满{{ activityInfo.shareLimit }}人完成注册的，即可获得一份“{{
              couponTypeInfoComputed
            }}红包”；
          </p>
          <p>
            2、用户获得的{{ couponTypeInfoComputed }}红包，每人最高可领取5张；
          </p>
          <p>3、{{ couponTypeInfoComputed }}红包不可叠加，不可转让；</p>
          <p>
            4、每笔订单能且只能使用一份{{
              couponTypeInfoComputed
            }}红包，不可找零，不可兑现；
          </p>
          <p>5、活动时间：{{ expiresTime }}，红包仅在活动期内有效；</p>
          <p>6、领取的红包，请在诚聊购商城“我的”服务版块内查看。</p>
        </div>
      </div>
      <red-packet-popover
        :visible="isSizeUp"
        :data="couponResultData"
        @handleUse="$router.push('/index')"
      >
      </red-packet-popover>

      <input id="copyNode" onclick="" style="cursor: pointer" type="hidden" />
    </div>
  </router-layout>
</template>
<script>
import ClipboardJS from "clipboard";
import { mapGetters, mapMutations } from "vuex";
import {
  createInviteCode,
  activityPageInfo,
  updateAwardShow,
  couponHold,
  couponActivity
} from "api";
import redPacketPopover from "@/components/home/redPacketPopover";
export default {
  name: "share",
  components: {
    redPacketPopover
  },
  data() {
    return {
      couponInfo: null,
      couponResultData: null,
      activityInfo: {},
      inviteCode: "",
      invitedUserHeadPicList: [],
      isSizeUp: false,
      isDisableInvite: false,
      isCopySuccess: false,
      shareBg1: require("@/assets/image/share/shareBg1.png"),
      sharebjss: require("@/assets/image/share/sharebjss.png")
    };
  },
  computed: {
    ...mapGetters(["getuserinfo"]),
    ...mapGetters("activity", ["getActivityShareInfo"]),
    expiresTime() {
      const { startTime, endTime } = this.activityInfo;
      return (
        this.$dayjs(startTime).format("YYYY年MM月D日") +
        " - " +
        this.$dayjs(endTime).format("YYYY年MM月D日")
      );
    },
    priceComputed() {
      const { couponType, discounts, couponMax } = this.couponInfo || {};
      return ["￥" + discounts, discounts + "折", couponMax + "元"][
        couponType - 1
      ];
    },
    ruleComputed() {
      const { couponType, discounts, useLimit } = this.couponInfo || {};
      if (!useLimit) {
        return "无门槛";
      }

      if (couponType === 3) {
        return "下单满" + useLimit + "可减";
      }

      return `满${useLimit}减${discounts}元`;
    },
    getTime() {
      const { couponValidStart, couponValidEnd } = this.couponInfo || {};

      function dateParse(data) {
        return data?.split(" ")?.[0]?.replace(/-/g, ".");
      }
      const beginDate = dateParse(couponValidStart);
      const endDate = dateParse(couponValidEnd);
      return beginDate + "至" + endDate;
    },
    couponTypeInfoComputed() {
      const { couponType } = this.couponInfo || {};
      return couponType === 3 ? "随机满减" : "满减";
    }
  },
  async created() {
    try {
      if (!this.getActivityShareInfo?.id) {
        const { errorCode, data } = await couponActivity();
        if (errorCode === 40100) {
          this.showToastFn();
          return;
        }
        this.setList(data?.content);
      }

      const {
        data: {
          invitedUserHeadPicList,
          activityInfo,
          showState,
          activityId,
          couponInfo
        }
      } = await activityPageInfo({
        activityId: this.getActivityShareInfo?.id
      });

      this.activityInfo = activityInfo;
      this.invitedUserHeadPicList = invitedUserHeadPicList;
      this.couponInfo = couponInfo;

      const { couponId } = this.getActivityShareInfo;
      const {
        data: {
          content: [couponData]
        }
      } = await couponHold({ couponId });

      this.couponResultData = couponData;

      this.isSizeUp = couponData ? showState : false;
      // this.isSizeUp =true
      showState &&
        couponData &&
        updateAwardShow({
          activityId,
          uid: this.getuserinfo?.uid
        });
      await this.getShareCode();

      this.createClipboard();
    } catch (error) {
      console.log(error);
    }
  },
  mounted() {},
  methods: {
    ...mapMutations("activity", ["setList"]),
    showToastFn() {
      const toastInstance = this.$toast({
        message: `当前活动已结束，即将返回首页(3s)`,
        overlay: true,
        duration: 0
      });

      let downTime = 3;
      const timer = setInterval(() => {
        downTime--;
        if (downTime) {
          toastInstance.message = `当前活动已结束，即将返回首页(${downTime}s)`;
        } else {
          clearInterval(timer);
          toastInstance.clear();
          this.$router.push("/index");
        }
      }, 1000);
    },
    async shareClick() {
      if (!this.isCopySuccess) {
        const toastInstance = this.$toast.loading({
          message: "正在生成邀请码",
          duration: 0
        });
        toastInstance.clear();
      }

      this.isCopySuccess && this.$toast("分享链接已复制到剪切板，快去分享吧~");

      document.getElementById("copyNode").click();
    },
    routerBack() {
      // history.back();
      // this.$router.push("/index");
      this.$router.go(-1);
    },
    async getShareCode() {
      const { data, errorCode } = await createInviteCode({
        activityId: this.activityInfo?.id
      });
      this.inviteCode = data;
      this.isDisableInvite = errorCode === 10001 && this.showToastFn();
    },
    createClipboard() {
      const clipboard = new ClipboardJS("#copyNode", {
        text: (trigger) => {
          if (!this.couponInfo) return;
          const { couponType } = this.couponInfo;

          const prefix = `【诚聊购】 ${location.origin}/index?inviteCode=${this.inviteCode}`;

          if (couponType === 3) {
            return (
              prefix +
              " 诚邀您为好友助力，有机会获得100.1-100大额消费券！速来围观！"
            );
          }

          return (
            prefix +
            " 诚聊购诚邀您为好友加油助力，您将获得0.01首单优惠和大额消费券！速来围观！"
          );
        }
      });

      clipboard.on("success", (e) => {
        this.$toast("分享链接已复制到剪切板，快去分享吧~");
        this.isCopySuccess = true;
        // this.$notify({
        //   title: "成功",
        //   message: "分享链接已复制到剪切板，快去分享吧~",
        //   type: "success"
        // });
        clipboard.destroy();
      });

      clipboard.on("error", (e) => {
        this.$notify({
          title: "失败",
          message: "复制失败, 请联系管理员反馈。",
          type: "danger"
        });
      });
    }
  },
  watch: {
    // getActivityShareInfo: {
    //   handler(val) {
    //     this.activityInfo = val;
    //   },
    //   immediate: true
    // }
  }
};
</script>
<style scoped lang="scss">
.share {
  position: relative;
  min-height: 100vh;
  background-color: #ffffff;
  .topImg {
    width: 375px;
    height: 365px;
    display: block;
    position: relative;
    top: -58px;
  }
  .topPacket {
    width: 185px;
    height: 223px;
    display: block;
    position: absolute;
    left: 50%;
    margin-left: -92.5px;
    top: 87px;
    text-align: center;
    color: #e00011;
    .max {
      position: absolute;
      width: 15px;
      height: 23px;
      right: 36px;
      top: 3px;
    }
    .title {
      font-size: 15px;
      font-weight: 900;
    }
    .random-price {
      margin-top: 10px;
      font-size: 30px;
      font-weight: 1000;
    }
    .price {
      font-weight: 700;
    }
    .random-rules {
      font-size: 12px;
      margin-top: 8px;
    }
    .rules {
      margin-top: 8px;
      font-size: 13px;
      font-weight: 600;
      margin-bottom: 68px;
    }
    .expires {
      color: #999;
      font-size: 12px;
      margin-top: 5px;
    }
    .extra-info {
      font-size: 11px;
      color: #fff;
      margin-top: 5px;
    }
    .use-btn {
      margin: auto;
      margin-top: 50px;
      font-size: 18px;
      width: 91.5px;
      height: 29px;
      background-image: url("~@/assets/image/share/clickBtn.png");
      background-size: 100% 100%;
      // border-radius: 80px;
      // font-weight: Medium;
      // color: #da4356;
      // background-image: linear-gradient(#ffc851, #ffd9af);
      // line-height: 34px;
    }
  }
  .contentBox {
    background-color: #ffffff;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    position: relative;
    top: -100px;
    .contentTop {
      margin-left: 12px;
      width: 281px;
      height: 33px;
      color: #ac772c;
      font-size: 13px;
      text-align: center;
      line-height: 33px;
      background-color: #fdf7c8;
      margin: 0 auto;
      border-bottom-left-radius: 60px;
      border-bottom-right-radius: 60px;
    }
    .content {
      margin-top: 24px;
      > h2 {
        margin-left: 12px;
        font-size: 18px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #333333;
        line-height: 25px;
      }
      .inviteBox {
        padding: 0 40px;
        display: flex;
        flex-wrap: wrap;
        margin-top: 20px;
        margin-left: -13.5px;
        .inviteItem {
          margin-left: 13.5px;
          .shareLimitBg {
            position: absolute;
            background-color: rgba(0, 0, 0, 0.3);
            color: #ffffff;
            font-size: 12px;
            text-align: center;
            line-height: 45px;
            width: 45px;
            height: 45px;
            border-radius: 50%;
          }
          > img {
            width: 45px;
            height: 45px;
            border-radius: 50%;
            margin-bottom: 40px;
          }
          > div {
            text-align: center;
            > div {
              width: 45px;
              height: 45px;
              border-radius: 50%;
              background-color: #f4f4f4;
              .van-icon {
                font-size: 20px;
                font-weight: bolder;
                line-height: 45px;
                color: #d8d8d8;
              }
            }
            > p {
              margin-top: 4px;
              color: #999999;
              font-size: 11px;
              margin-bottom: 24px;
            }
          }
        }
      }
    }
    .shareBtn {
      width: 320px;
      height: 44px;
      background: linear-gradient(270deg, #ff3636 0%, #ff6e6e 100%);
      border-radius: 22px;
      color: #ffffff;
      font-size: 18px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      display: block;
      margin: 0 auto;
    }
    .rule {
      padding: 47px 24px 24px 12px;
      h3 {
        color: #666666;
        font-size: 13px;
        margin-bottom: 12px;
      }
      p {
        color: #999999;
        font-size: 13px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        line-height: 18px;
      }
    }
  }
}
</style>
