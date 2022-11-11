<template>
  <router-layout>
    <div>
      <div class="activity">
        <div class="header-btn2 goodsback">
          <i
            @click="_backlogin"
            class="van-icon van-icon-arrow-left van-nav-bar__arrow banner"
          />
          <span class="text_activity">活动专区</span>
        </div>
        <!-- <div class="activity_middle" ><span class="activity_middle_text">钜惠来袭</span></div> -->
        <div class="activity_content" ref="list" :style="{ height: h }">
          <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
              :immediate-check="false"
            >
              <div
                class="info"
                @click="goDetail(item.goodsId)"
                v-for="(item, index) in activitylist"
                :key="index"
              >
                <van-card>
                  <template #title>
                    <div
                      class="van-card__title van-multi-ellipsis--l2 title_text"
                    >
                      {{ item.goodsName }}
                    </div>
                    <div style="margin-top: 5px">
                      <span style="color: #d20202">正品</span>
                      <span v-if="item.topFlag" class="stick">置顶</span>
                      <span class="fa">72小时发货</span>
                    </div>
                    <div style="margin-top: 10px">
                      {{ item.buyNumber }}人付款
                    </div>
                  </template>
                  <template #thumb>
                    <div class="van-image">
                      <img
                        style="width: 100%; height: 100%"
                        :src="item.logoImgUrl"
                        alt=""
                      />
                    </div>
                  </template>
                  <template #price>
                    <template v-if="item.canVoucherMoney">
                      <div class="price_cls">
                        <span class="van-card__price-currency">¥</span>
                        <!-- <span class="van-card__price-integer">{{ item1.goodsVoucherPayMoney}}</span><span class="dyjico" v-show=" item1.canVoucherMoney && item1.goodsVoucherMoney">{{item1.goodsVoucherMoney}}</span> -->
                        <span class="van-card__price-integer">{{
                          item.payMoney
                        }}</span>
                        <span
                          class="dyjico"
                          v-show="item.canVoucherMoney && item.payMoney"
                          >{{ item.voucherMoney }}</span
                        >
                      </div>
                      <!-- <van-button round type="warning">立即购买</van-button> -->
                      <div class="buy">
                        <span class="buy_text">立即购买</span>
                      </div>
                    </template>
                    <template v-else>
                      <span>
                        <span
                          class="van-card__price-currency"
                          style="color: red"
                          >¥</span
                        >
                        <!-- <span class="van-card__price-integer">{{ item1.goodsPrice}}</span> -->
                        <span
                          class="van-card__price-integer"
                          style="color: red"
                          >{{ item.showPrice }}</span
                        >
                        <!-- <van-button class="btn" round type="warning">立即购买</van-button> -->
                      </span>
                      <div class="buy">
                        <span class="buy_text">立即购买</span>
                      </div>
                    </template>
                  </template>
                </van-card>
              </div>
            </van-list>
          </van-pull-refresh>
        </div>
      </div>
      <van-popup
        :close-on-click-overlay="false"
        closeable
        v-if="luck.state == 1"
        v-model="show"
      >
        <div class="luck">
          <div class="luck_top" @click="goluck">
            <!-- <img src="../../assets/image/luck_top.png" alt=""> -->
            <img :src="luck.entrancePic ? luck.entrancePic : imgurl" alt="" />
            <!-- <div class="luck_bottom"  >
            
              点击抽奖
          
            
          </div> -->
          </div>
          <!-- <div class="luck_bottom" @click="goluck" >
              立即前往》》
          </div> -->
        </div>
      </van-popup>
    </div>
  </router-layout>
</template>

<script>
import { getluck, getactivityZone, getsUserAddress } from "api";
import { Dialog } from "vant";
import { mapGetters } from "vuex";
import Vue from "vue";
export default {
  name: "Activityzone",
  data() {
    return {
      show: true,
      h: 0,
      activitylist: [],
      page: 0,
      isLoading: false,
      loading: false,
      finished: false,
      id: 0,
      luck: {},
      addresslist: [],
      voucherMoney: 0,
      phone: "",
      imgurl: require("@/assets/image/luck_top.png")
      //  cancanDefault:true
    };
  },
  created() {},
  watch: {},
  computed: {
    ...mapGetters({
      mapgetuserinfo: "getuserinfo"
    })
  },
  mounted() {
    this.getHeight();
    window.onresize = () => this.getHeight();
    this._getactivityZone();
    this._getluck();
    if (localStorage.getItem("userinfo")) {
      this._getsUserAddress();
    }
  },
  activated() {},
  methods: {
    _getluck() {
      //  let user = JSON.parse(window.localStorage.getItem("userinfo"));
      getluck().then((res) => {
        if (res && res.errorCode === 1) {
          this.id = res.data.id;
          this.voucherMoney = res.data.voucherMoney;
          this.luck = res.data;
          // let phone=['13799725123', '17606067622' ,'15879172511']
          //  let flag=false;
          //    for (var i = 0; i < phone.length; i++) {
          //      console.log(i,phone[i])
          //     if (phone[i] ==user.phone) {
          //      console.log(phone[i] ===user.phone)
          //        this.show=true
          //       flag=true;
          //     }
          //    }
          //   if(!flag){
          //     this.show=false;
          //   }

          //  console.log(this.luck,user.phone,'luck');
        }
      });
    },
    _getsUserAddress() {
      getsUserAddress().then((res) => {
        if (res && res.errorCode == 1) {
          this.addresslist = res.data.content;
          this.addresslist.forEach((item) => {
            if (item.canDefault) {
              this.addresslist = item;
            }
          });
        }
      });
    },

    goluck() {
      if (this.addresslist.canDefault == true) {
        this.$router.push({
          path: "/award",
          query: {
            id: this.id,
            voucherMoney: this.voucherMoney,
            backgroundPic: this.luck.backgroundPic
          }
        });
      } else {
        Dialog.alert({
          message: "请前往收货地址中设置默认收货地址"
        }).then(() => {
          // on close
          this.$router.push({
            path: "/user/setting"
          });
        });
      }
    },

    _backlogin() {
      this.$router.go(-1);
    },
    getHeight() {
      let offsetTop = this.$refs.list.offsetTop;
      let H = window.innerHeight;
      this.h = H - offsetTop + "px";
    },
    goDetail(id) {
      this.$router.push({
        path: `/detail/${id}?agencyUnionid=${
          this.$route.query.agencyUnionid || null
        }&fromPlatform=${this.$route.query.fromPlatform || null}`
      });
    },
    _getactivityZone(a) {
      this.page++;
      const toast = this.$toast.loading({
        message: "加载中...",
        forbidClick: true
      });
      if (a == 1) {
        this.isLoading = true;
      }

      getactivityZone({ pageNum: this.page, pageSize: 10 }).then((res) => {
        if (res && res.errorCode === 1) {
          if (this.page == 1) {
            this.activitylist = [];
          }
          for (let i = 0; i < res.data.content.length; i++) {
            this.activitylist.push(res.data.content[i]);
          }
          this.isLoading = false;
          this.loading = false;
          if (!res.data.isHasNextPage) {
            this.finished = true;
          } else {
            this.finished = false;
          }
          toast.clear();
        }
      });
    },
    onRefresh() {
      this.page = 0;
      this.finished = true;
      this._getactivityZone();
    },
    onLoad() {
      this._getactivityZone();
    }
  }
};
</script>

<style scoped lang="scss">
.van-popup {
  background-color: transparent;
}
.luck {
  //  background-image: url(../../assets/image/luck1.png);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  //  background-color: springgreen;
  //  opacity: 0.5;
  .luck_top {
    //  background-color: red;
    padding-top: 50px;
    //  height: 265px;
    img {
      width: 291px;
      //height: 331px;
    }
    position: relative;
  }
  .luck_bottom {
    width: 147px;
    height: 30px;
    background-image: url(../../assets/image/award/bg19.png);
    background-size: 100% 100%;
    position: absolute;
    bottom: 80px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 15px;
    color: #ff491e;
    text-align: center;
    line-height: 30px;
    border-radius: 10px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.van-image {
  width: 100%;
  height: 100%;
}
.activity {
  width: 100vw;
  height: 100vh;
  background-image: url(../../assets/image/activity/883.png);
  // background-image: url(../../assets/image/Activityzone.png);
  background-size: 100%;

  .banner {
    color: #ffffff;
    margin-left: 10px;
  }
}
.activity_middle {
  margin: 140px 1.94667rem 40px 2.94667rem;
}
.activity_middle_text {
  width: 220px;
  height: 54px;
  font-size: 40px;
  font-family: PingFang SC;
  font-weight: bold;
  color: #fcfbfb;
}
.text_activity {
  height: 16px;
  font-size: 17px;
  font-family: PingFang SC;
  color: #ffffff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-top: 10px;
}

.activity_content {
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 10px;
  margin-top: 50px;
  overflow: auto;
  .info {
    //  padding: 10px 0; 0.21333rem 0.42667rem
    //  border-radius: 10px;
    margin-top: 5px;
    margin-bottom: 5px;
  }
}
.van-card {
  padding: 0 !important;
  border-radius: 10px;
}
.buy {
  padding-top: 4px;
  width: 75px;
  height: 28px;
  background: linear-gradient(66deg, #ff9429 0%, #ff7200 100%);
  border-radius: 14px;
}
.van-card__price {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .price_cls {
    padding-top: 8px;
  }
}
.buy_text {
  width: 55px;
  // height: 13px;
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #fefefe;
  padding-left: 10px;
}
.fa {
  color: #ff7502;
  margin-left: 10px;
}
.van-card__bottom {
  margin-top: 10px;
}
.price_cls {
  color: #d20202;
  padding-top: 8px;
}
.title_text {
  font-size: 13px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #333333;
}
.van-card__content {
  padding: 10px 10px 4px 0;
  // padding: 10px 10px 0  0;
}
.van-card__thumb {
  width: 40%;
  height: 130px;
}
.van-card__thumb img {
  border-radius: 0;
}
.goodsback {
  padding-top: 10px;
  position: relative;
}
.van-card__thumb img {
  border-radius: 10px 0 0 10px;
}
.stick {
  margin-left: 10px;
  color: rgb(210, 2, 2);
}
</style>
