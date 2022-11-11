<template>
  <router-layout>
    <van-nav-bar
      :title="$route.meta.title"
      left-arrow
      v-if="!iscltApp()"
      :style="{
        top: headerAttr.header === 1 ? '0' : headerAttr.statusbar + 'px'
      }"
      @click-left="$router.replace('/index')"
    />
    <div class="promotion-page">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <div class="box">
          <img
            class="banner"
            src="../../assets/image/activity/bg-top.png"
            alt=""
          />
          <div class="btn" @click="goRule">活动规则</div>
          <div class="bg-top2">
            <div class="activity" v-if="blgList && blgList.length > 0">
              <img src="../../assets/image/activity/tit4.png" alt="" />
              <div class="activity-Box">
                <div class="activity-title">全场0元包邮到家</div>
                <div class="activity-list">
                  <div
                    class="goods"
                    @click="goCLB"
                    v-for="(item, index) in blgList"
                    :key="index"
                  >
                    <div class="goods-image">
                      <img :src="item.imgUrl" alt="" />
                    </div>
                    <div class="text-goods">
                      <div class="goods-name">{{ item.goodsName }}</div>
                      <div class="tailMarkBox">
                        <span class="line-price">¥{{ item.unitPrice }}</span>
                      </div>
                      <div class="goods-price">
                        <span class="price">¥{{ item.discountPrice }}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="activity-btn" @click="goCLB">更多0元商品</div>
              </div>
            </div>
            <div class="activity" v-if="newsList && newsList.length > 0">
              <img src="../../assets/image/activity/tit2.png" alt="" />
              <div class="activity-Box">
                <img
                  class="lockIcon"
                  src="../../assets/image/activity/lock.png"
                  alt=""
                />
                <div class="activity-title">结束倒计时：{{ djs }}</div>
                <div class="activity-list">
                  <div
                    class="goods"
                    @click="goNew"
                    v-for="(item, index) in newsList"
                    :key="index"
                  >
                    <div class="goods-image">
                      <img :src="item.logoImgUrl" alt="" />
                    </div>
                    <div class="text-goods">
                      <div class="goods-name">{{ item.goodsName }}</div>
                      <div class="tailMarkBox">
                        <span class="line-price">¥{{ item.linePrice }}</span>
                      </div>
                      <div class="goods-price">
                        <span class="price">¥{{ item.showPrice }}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="activity-btn" @click="goNew">更多秒杀</div>
              </div>
            </div>
            <div class="activity" v-if="officalList && officalList.length > 0">
              <img src="../../assets/image/activity/tit3.png" alt="" />
              <div class="activity-Box">
                <div class="activity-list">
                  <div
                    class="goods"
                    @click="goBT"
                    v-for="(item, index) in officalList"
                    :key="index"
                  >
                    <div class="goods-image">
                      <img :src="item.logoImgUrl" alt="" />
                    </div>
                    <div class="text-goods">
                      <div class="goods-name">{{ item.goodsName }}</div>
                      <div class="tailMarkBox">
                        <span class="line-price">¥{{ item.linePrice }}</span>
                      </div>
                      <div class="goods-price">
                        <span class="price">¥{{ item.minActivityPrice }}</span>
                      </div>
                      <!-- <div class="tailMarkBox">
                                      <p class="buy">售{{item.buyNumber}}件</p>
                                  </div> -->
                    </div>
                  </div>
                </div>
                <div class="activity-btn" @click="goBT">更多商品</div>
              </div>
            </div>
          </div>
        </div>
      </van-pull-refresh>
    </div>
  </router-layout>
</template>
<script>
import { officialSubsidy, getLists, promotionUrl } from "api";
export default {
  name: "promotion",
  data() {
    return {
      refreshing: false,
      pageNum: 1,
      pageSize: 10,
      djs: null,
      officalList: [],
      newsList: [],
      blgList: [],
      blgBaseUrl:
        process.env.NODE_ENV === "development"
          ? "http://112.51.25.33:54080/home"
          : "https://blg.xiansuoapp.com/home",
      headerAttr: LukeappApi.getattribute(),
      downTimeInstance: null
    };
  },
  created() {
    this.getBLG();
    this.getNewList();
    setTimeout(() => {
      this.getOFF();
    }, 700);
    //   this.handle();
    //   setInterval(() => {
    //       this.handle()
    //   }, 1000);
    this.handleDownTime();
  },
  methods: {
    iscltApp() {
      const IscltApp = LukeappApi.IscltApp;
      return (
        IscltApp() ||
        window.navigator.userAgent.match(/SincereMall/) == "SincereMall"
      );
    },
    onRefresh() {
      (this.refreshing = false), (this.pageNum = 1);
    },
    goCLB() {
      const userinfo =
        JSON.parse(window.localStorage.getItem("userinfo")) || [];
      window.location.href = this.blgBaseUrl + `?token=` + userinfo.token;
    },
    goNew() {
      this.$router.push("/newExclusive");
    },
    goBT() {
      this.$router.push("/offcialSubsidy");
    },
    goRule() {
      this.$router.push("/promotionRules");
    },
    //帮领购、0元
    getBLG() {
      promotionUrl().then((res) => {
        this.blgList = res.data;
      });
    },
    // 官方补贴商品
    getOFF() {
      officialSubsidy({
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then((res) => {
        if (res && res.errorCode === 1) {
          const List = res.data.list;
          this.officalList = List.slice(0, 3);
        }
      });
    },
    //新人
    getNewList() {
      getLists({
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then((res) => {
        if (res && res.errorCode === 1) {
          const List = res.data.list;
          this.newsList = List.slice(0, 3);
        }
      });
    },

    //活动倒计时
    // handle(){
    //     var newtime = new Date().getHours();
    //     if(newtime < 10){
    //         var remainTime = (+new Date((new Date().toLocaleString().split(' ')[0].replaceAll('/','-')) + ' 10:00:00')) - new Date()
    //     }else{
    //         var remainTime = (+new Date((new Date().toLocaleString().split(' ')[0].replaceAll('/','-')) + ' 10:00:00')) + 86400000 - new Date()
    //     }
    //     this.djs = this.changeTime(remainTime)
    // },
    // changeTime(number) {
    //     let y = Math.floor(number / 1000 / 60 / 60);
    //     let m = Math.floor((number - y*60*60*1000) / 1000 / 60);
    //     let s = Math.floor((number - y*60*60*1000 - m*60*1000) / 1000 );
    //     return (y < 10 ? '0' + y : y )+":" +( m <10 ? '0' + m : m )+":" + (s < 10 ? '0' + s : s)
    // }
    handleDownTime() {
      const todayTenHour = this.$dayjs(
        this.$dayjs().format("YYYY-MM-DD") + " 10:00"
      ).$d;
      const expiresTime =
        todayTenHour > this.$dayjs().$d
          ? todayTenHour
          : this.$dayjs(
              this.$dayjs().add(1, "day").format("YYYY-MM-DD") + " 10:00"
            ).$d;

      const downTimeTrigger = () => {
        this.djs = this.$dayjs(0)
          .subtract(8, "hour")
          .millisecond(expiresTime - this.$dayjs().$d)
          .format("HH:mm:ss");
      };
      downTimeTrigger();
      this.downTimeInstance = setInterval(downTimeTrigger, 1000);
    }
  },
  destroyed() {
    clearInterval(this.downTimeInstance);
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/style/mixin.scss";
:deep(.van-pull-refresh) {
  min-height: calc(100% - 223px);
}

.promotion-page {
  height: calc(100vh - 46px);
  overflow: auto;
  width: 100vw;
  font-size: 14px;
  :deep(.van-nav-bar) {
    background-color: #fff;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    height: 1.22667rem;
  }
  .box {
    position: relative;
    .banner {
      width: 100%;
      margin-bottom: -120px;
    }
    .bg-top2 {
      width: 100%;
      padding-top: 55px;
      position: relative;
      background-image: url("~@/assets/image/activity/bg-top2.png");
      background-size: cover;
      background-repeat: no-repeat;
      padding-bottom: 30px;
      .activity {
        img {
          width: 200px;
          display: block;
          margin: 0 auto;
        }
        .activity-Box {
          margin-top: -8px;
          margin-left: 7px;
          margin-right: 7px;
          background-image: url("~@/assets/image/activity/shadow.png");
          background-size: 100% 100%;
          background-repeat: no-repeat;
          padding-top: 12px;
          padding-bottom: 16px;
          position: relative;
          .lockIcon {
            position: absolute;
            top: -12px;
            left: 3px;
            width: 55px;
          }
          .activity-title {
            font-size: 16px;
            font-weight: 550;
            color: #ff6945;
            text-align: center;
            line-height: 24px;
          }
          .activity-list {
            display: flex;
            padding: 8px 18px;
            .goods {
              width: 105px;
              border-radius: 10px;
              padding-bottom: 5px;
              border: 0.3px solid #999;
              margin-right: 14px;
              &:nth-child(3) {
                margin-right: 0px;
              }
              .goods-image {
                width: 100%;
                img {
                  width: 100%;
                  height: 80px;
                  border-radius: 10px;
                }
              }
              .text-goods {
                text-align: left;
                padding: 6px 5px 5px;
                width: 100%;
                .goods-name {
                  font-size: 12px;
                  height: fit-content;
                  @include no-wrap-multi(1);
                  line-height: 14px;
                }
                .goods-price {
                  font-size: 14px;
                  margin: 3px 0 0 1px;
                  color: #d1020c;
                  overflow: hidden;
                }
                .tailMarkBox {
                  display: flex;
                  margin-top: 5px;
                  .line-price {
                    color: #999;
                    text-decoration: line-through;
                    font-size: 13px;
                    margin-left: 1px;
                  }
                }
              }
            }
          }
          .activity-btn {
            width: 125px;
            height: 35px;
            font-size: 16px;
            line-height: 35px;
            color: #fff;
            background-color: #ff7959;
            border-radius: 20px;
            text-align: center;
            margin: 8px auto 0 auto;
          }
        }
      }
    }
    .btn {
      position: absolute;
      top: 292px;
      right: 0;
      width: 70px;
      height: 22px;
      line-height: 22px;
      color: #fff;
      background: rgba($color: #000000, $alpha: 0.4);
      text-align: center;
      border-radius: 10px 0 0 10px;
    }
  }
}
</style>
