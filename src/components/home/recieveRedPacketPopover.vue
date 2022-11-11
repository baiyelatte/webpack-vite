<template>
  <div>
    <van-overlay :show="innerVisible" :z-index="101">
      <div class="pop-wrapper">
        <div class="bg-wrapper">
          <van-image
            class="bg-image"
            lazy-load
            :src="require('../../assets/image/' + bgImg)"
          />
          <van-image
            class="close"
            :src="require('../../assets/image/home/close.png')"
            @click="handleClose"
          >
          </van-image>
          <div class="content">
            <div class="title">优惠券放不停，最高立享</div>
            <!-- <div class="price">{{ priceComputed }}</div> -->
            <div class="price">免单</div>
          </div>

          <div class="footer">
            <div class="use-btn" @click="handleJoin">立即参与</div>
            <div class="extra">
              <div class="extra-icon">
                <van-image :src="require('../../assets/image/appLogo.png')">
                </van-image>
              </div>
              <div>
                <div class="extra-info">诚聊购年终回馈，喜迎新年，更多福利</div>
                <div class="extra-check" @click="handleCheck">点击查看</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </van-overlay>
  </div>
</template>
<script>
import { getUserInfo } from "api";

export default {
  name: "recieveRedPacketPopover",
  props: {
    visible: {
      default: false,
      type: Boolean
    },
    bgImg: {
      default: "home/recieveRedBg.png",
      type: String
    },
    data: {
      default: () => ({}),
      type: Object
    }
  },
  data() {
    return {
      innerVisible: false
    };
  },
  methods: {
    handleJoin() {
      getUserInfo().then((res) => {
        if (res.errorCode == 1) {
          localStorage.setItem("userinfo", JSON.stringify(res.data));
          this.$emit("handleOk");
        }
      });
    },
    handleCheck() {
      this.$router.push("/offcialSubsidy");
    },
    handleClose() {
      this.innerVisible = false;
      this.$emit("handleClose");
    }
  },
  watch: {
    visible: {
      handler(value) {
        this.innerVisible = value;
      },
      immediate: true
    }
  },
  computed: {
    priceComputed() {
      const { couponType, discounts, couponMax } = this.data || {};
      return ["", discounts + "元", discounts + "折", couponMax + "元"][
        couponType
      ];
    },
    getTime() {
      const { couponValidStart, couponValidEnd } = this.data || {};

      function dateParse(data) {
        return data?.split(" ")?.[0]?.replace(/-/g, ".");
      }
      const beginDate = dateParse(couponValidStart);
      const endDate = dateParse(couponValidEnd);
      return beginDate + "至" + endDate;
    }
  }
};
</script>

<style scoped lang="scss">
.pop-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  .bg-wrapper {
    background-repeat: no-repeat;
    background-size: 100%;
    position: relative;
    width: 268px;
    height: 403.5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .bg-image {
      width: 100%;
      position: absolute;
      top: 0;
      z-index: -1;
    }
    .close {
      position: absolute;
      width: 21.5px;
      right: 13.5px;
      top: 100px;
    }
    .content {
      margin-top: 150px;
      height: 120px;
      position: relative;
      .title {
        font-size: 23.45px;
        font-weight: 800;
        color: #fff;
      }
      .price {
        margin-top: 25.5px;
        font-size: 44.48px;
        color: #ffed9c;
      }
      .rules {
        // margin-top: 17.5px;
        font-size: 13.34px;
      }
      .expires {
        // margin-top: 9px;
        font-size: 10.68px;
      }
    }
    .footer {
      display: flex;
      flex-direction: column;
      align-items: center;
      .use-btn {
        font-size: 22px;
        width: 210px;
        height: 40px;
        border-radius: 80px;
        font-weight: 600px;
        color: #c90207;
        background-image: linear-gradient(#ffe5c5, #ffd9af);
        line-height: 40px;
        margin-right: 0;
        text-align: center;
      }
      .extra {
        display: flex;
        .extra-icon {
          margin-top: 29px;
          width: 23.5px;
          height: 23.5px;
          margin-right: 5px;
          border-radius: 50%;
          border: 2px solid #ffffff;
          overflow: hidden;
          line-height: 0;
        }
        .extra-info {
          margin-top: 29px;
          font-size: 11.68px;
          color: #eeeeee;
          line-height: 15px;
          text-align: left;
        }
        .extra-check {
          font-size: 11.68px;
          color: #ffed9c;
          text-align: left;
        }
      }
    }
  }
}
</style>
