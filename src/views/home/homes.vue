<template>
  <div class="main-home comes">
    <CommonHeader />
    <div class="home-bodys" ref="beatHome">
      <download></download>
      <Header />
      <!-- 下拉刷新 -->
      <van-pull-refresh
        v-model="isLoading"
        :head-height="80"
        @refresh="onRefresh"
      >
        <!-- 下拉提示，通过 scale 实现一个缩放效果 -->
        <template #pulling="props">
          <img
            class="Loading"
            src="@/assets/image/common/Loading.png"
            :style="{ transform: `scale(${props.distance / 80})` }"
          />
        </template>

        <!-- 释放提示 -->
        <template #loosing>
          <img class="Loading" src="@/assets/image/common/Loading.png" />
        </template>

        <!-- 加载提示 -->
        <template #loading>
          <img class="Loading" src="@/assets/image/common/Loading.png" />
        </template>
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          :immediate-check="false"
          @load="onLoad"
        >
          <!-- 轮播图 -->
          <div class="banner">
            <van-swipe
              class="my-swipe"
              :autoplay="3000"
              indicator-color="white"
              ref="swipe"
            >
              <van-swipe-item
                v-for="(item, index) in banner"
                :key="index"
                @click="handleSwipe(item)"
              >
                <img v-lazy="item.imgUrl" alt="" />
              </van-swipe-item>
            </van-swipe>
          </div>
          <!-- 优惠专区 -->
          <div class="preferential">
            <Special :speicaldata="specialifon" />
          </div>
          <!-- 活动-->
          <div class="activity-box">
            <div class="prefecture" @click="getActivityzone">
              <!-- <div class="text">
                <h2>活动专区</h2>
                <p>限时抢购</p>
              </div>
              <img src="@/assets/image/activity/prefectureImg.png" alt="" /> -->
            </div>
            <div class="shop" @click="$router.push('/activityshop')">
              <!-- <div class="text">
                <h2>活动店铺</h2>
                <p>限时抢购</p>
              </div>
              <img src="@/assets/image/activity/shopImg.png" alt="" /> -->
            </div>
          </div>

          <!-- 限时抢购 -->
          <div class="activitys">
            <div class="killActivity">
              <div class="kill_top" v-if="flgT">
                <div class="titleM">秒杀活动</div>
                <!-- <div style="color: #333; font-size: 11px">
                  {{ datatime }}点场
                </div> -->
                <div class="bei">
                  <van-count-down
                    @finish="finish"
                    v-if="countdown > 86400000"
                    :time="countdown"
                    format="DD天HH:mm:ss"
                  >
                  </van-count-down>
                  <van-count-down
                    @finish="finish"
                    v-else
                    :time="countdown"
                    format="HH:mm:ss"
                  >
                  </van-count-down>
                </div>
              </div>
              <div
                class="bei0"
                style="display: flex; justify-content: start"
                v-else
              >
                <div class="titleM">秒杀活动</div>
                <!-- <div style="color: #333; font-size: 11px">
                  {{ datatime }}点场
                </div> -->
              </div>
              <!-- <div v-if="activitylist && activitylist.length > 0" class="mSha"> -->
              <div v-if="flgT" class="mSha">
                <div>
                  <div
                    v-for="(item, index) in activitylist"
                    :key="index"
                    @click="
                      goDetail(
                        item.goodsId,
                        list.id,
                        '',
                        '',
                        '',
                        item.skuKillInventory
                      )
                    "
                  >
                    <img :src="item.logoImgUrl" alt="" />
                    <div v-if="flgT">
                      <div
                        v-if="
                          item.canVoucherMoney && item.skuCanVoucherMoney == 1
                        "
                      >
                        <span class="mS1"
                          ><del>￥{{ item.payMoney }} </del></span
                        >
                        <span class="mS2">￥{{ item.skuPayMoney }}</span>
                      </div>
                      <div v-else>
                        <span class="mS1"
                          ><del>￥{{ item.showPrice }}</del></span
                        >
                        <span class="mS2">￥{{ item.skuKillPrice }}</span>
                      </div>
                    </div>
                    <!-- <div v-else>
                                                                                                                                                                                                                                              
                      <div
                        v-if="item.skus[0].canVoucherMoney"
                        style="
                      display: flex;
                     flex-direction: column
                      justify-content: space-between;
                      align-items: center;
                    "
                      >
                        <span
                          style="
                            font-size: 10px;
                            font-weight: 500;
                            color: #959595;
                            margin-top: 15px;
                          "
                          ><del>￥{{ item.linePrice }}</del></span
                        >
                        <span
                          style="
                            font-size: 11px;
                            font-weight: bold;
                            color: #fe3746;
                            margin-top: 15px;
                          "
                          >￥{{ item.payMoney }} </span
                        >
                      </div>
                      <div
                        v-else
                        style="
                      display: flex;
                     flex-direction: column
                      justify-content: space-between;
                      align-items: center;
                    "
                      >
                        <span
                          style="
                            font-size: 10px;
                            font-weight: 500;
                            color: #959595;
                            margin-top: 15px;
                          "
                          ><del>￥{{ item.showPrice }}</del></span
                        >
                        <span
                          style="
                            font-size: 11px;
                            font-weight: bold;
                            color: #fe3746;
                            margin-top: 15px;
                          "
                          >￥{{ item.showPrice }}</span
                        >
                      </div>
                    </div> -->
                  </div>
                </div>
              </div>
              <div class="ditu" v-else></div>
              <div class="moreG" @click="more">
                <img
                  class="iconM"
                  src="../../assets/image/common/skill.png"
                  alt=""
                />
                <span> 秒杀专区</span>
                <img
                  class="icon1"
                  src="../../assets/image/common/jian.png"
                  alt=""
                />
              </div>
            </div>

            <div class="officialSubsidy">
              <div class="kill_top">
                <div class="titleM">官方补贴</div>
                <div class="bei1">
                  <div>有机会免单</div>
                </div>
              </div>
              <div v-if="subsidyList && subsidyList.length > 0" class="guanFa">
                <div>
                  <div
                    v-for="(item, index) in subsidyList"
                    :key="index"
                    style="
                      display: flex;
                      flex-direction: column;
                      justify-content: space-between;
                      align-items: center;
                    "
                    @click="
                      goDetail(
                        item.goodsInfo.goodsId,
                        '',
                        officialSubsidy,
                        item.officialSubsidyId,
                        item.enableQuantity
                      )
                    "
                  >
                    <img :src="item.goodsInfo.logoImgUrl" alt="" />
                    <span class="span2">补贴价</span>
                    <span class="span2">￥{{ item.showPrice }}</span>
                  </div>
                </div>
              </div>
              <div v-else class="ditu"></div>
              <div class="moreG" @click="$router.push('/offcialSubsidy')">
                <img
                  class="iconM"
                  src="../../assets/image/common/gift.png"
                  alt=""
                />
                <span> 更多福利</span>
                <img
                  class="icon1"
                  src="../../assets/image/common/osi.png"
                  alt=""
                />
              </div>
            </div>
          </div>
          <!-- 直播 -->
          <div>
            <liveBroad
              ref="liveBroad"
              v-if="anchorInfo && anchorInfo.signs !== 0"
              :anchorInfo="anchorInfo"
            />
          </div>
          <!-- <div class="limitedactivities" v-if="activitylist">
            <div class="title_time">
              <div style="display: flex">
                <div class="title_text">
                  <span>限时秒杀</span>
                  <div class="tubiao">
                    <img src="../../assets/image/lei.png" alt="" />
                  </div>
                </div>
                <div
                  v-if="activitylist.limitSaleType == 0"
                  class="title_timer"
                  style="display: flex"
                >
                  <span>倒计时：</span>
                  <van-count-down
                    style="color: #cf0000"
                    :time="countdown"
                    @finish="finish"
                  >
                  </van-count-down>
                </div>
                <div v-else class="title_timer">截止日期:{{ m }}</div>
              </div>
              <div class="more" @click="more">
                <p>更多秒杀</p>
                <van-icon name="arrow" />
              </div>
            </div>
            <div class="activity_content" ref="list">
              <div
                class="info"
                @click="goDetail(activitylist.goodsId)"
                v-if="activitylist"
              >
                <van-card>
                  <template #title>
                    <div
                      class="
                        van-card__title
                        van-multi-ellipsis--l2
                        title_text1 title
                      "
                    >
                      <img
                        v-if="activitylist.titleCardImage"
                        :src="activitylist.titleCardImage"
                        alt=""
                      />
                      {{ activitylist.goodsName }}
                    </div>
                    <div style="margin-top: 15px">
                      <span v-if="salesFun(activitylist.buyNumber)>=10" style="margin-right:5px">{{salesFun(activitylist.buyNumber)}}人已付款</span>
                      <button v-if="activitylist.tailMark" class="tailMark">
                        {{ activitylist.tailMark }}
                      </button>
                    </div>
                    <div
                      v-if="activitylist.personalityTags"
                      class="personalityTags"
                    >
                      <div
                        v-for="(item, index) in personalityTagsArr"
                        :key="index"
                      >
                        <p>{{ item }}</p>
                      </div>
                    </div>
                  </template>
                  <template #thumb>
                    <div class="van-image">
                      <img
                        style="width: 100%; height: 100%"
                        :src="activitylist.logoImgUrl"
                        alt=""
                      />
                    </div>
                  </template>
                    <template
                  <template #price>
                      v-if="
                        activitylist.limitSaleFlag &&
                        flgT &&
                        activitylist.killNumber
                      "
                    >
                      <template
                        v-if="
                          activitylist.killVoucherMoney &&
                          activitylist.killCanVoucherMoney
                        "
                      >
                        <div class="price_cls">
                          <span class="van-card__price-currency">¥</span>
                          <span class="van-card__price-integer">{{
                            activitylist.killPayMoney
                          }}</span>

                          <span class="dyjico">{{
                            activitylist.killVoucherMoney
                          }}</span>

                          <span
                            class="originPrice"
                            v-if="activitylist.linePrice"
                            >¥{{ activitylist.linePrice }}</span
                          >
                        </div>
                        <div
                          class="buy"
                          v-if="activitylist.killNumber"
                          @click.stop="gobuy(activitylist.goodsId)"
                        >
                          <span class="buy_text">立即购买</span>
                        </div>
                        <div class="s" v-else>
                          <div class="buy complete">
                            <span class="buy_text">已抢完</span>
                          </div>
                          <div
                            class="buy_text"
                            style="color: red; font-size: 6px"
                          >
                            原价购买
                          </div>
                        </div>
                      </template>
                      <template v-else>
                        <span>
                          <span
                            class="van-card__price-currency"
                            style="color: red"
                            >¥</span
                          >
                          <span
                            class="van-card__price-integer"
                            style="color: red"
                            >{{ activitylist.killPrice }}
                          
                          </span>
                        </span>
                        <div
                          class="buy"
                          v-if="activitylist.killNumber"
                          @click.stop="gobuy(activitylist.goodsId)"
                        >
                          <span class="buy_text">立即购买</span>
                        </div>
                        <div class="s" v-else>
                          <div class="buy complete">
                            <span class="buy_text">已抢完</span>
                          </div>
                          <div
                            class="buy_text"
                            style="color: red; font-size: 6px"
                          >
                            原价购买
                          </div>
                        </div>
                      </template>
                    </template>
                    <template v-else>
                      <template v-if="activitylist.canVoucherMoney">
                        <div class="price_cls">
                          <span class="van-card__price-currency">¥</span>

                          <span class="van-card__price-integer">{{
                            activitylist.payMoney
                          }}</span>

                          <span class="dyjico">{{
                            activitylist.voucherMoney
                          }}</span>
                          <span
                            class="originPrice"
                            v-if="activitylist.linePrice"
                            >¥{{ activitylist.linePrice }}</span
                          >
                     
                        </div>
                        <div
                          class="buy"
                          v-if="activitylist.killNumber"
                          @click.stop="gobuy(activitylist.goodsId)"
                        >
                          <span class="buy_text">立即购买</span>
                        </div>
                        <div class="s" v-else>
                          <div class="buy complete">
                            <span class="buy_text">已抢完</span>
                          </div>
                          <div
                            class="buy_text"
                            style="color: red; font-size: 6px"
                          >
                            原价购买
                          </div>
                        </div>
                      </template>
                      <template v-else>
                        <span>
                          <span
                            class="van-card__price-currency"
                            style="color: red"
                            >¥</span
                          >

                          <span
                            class="van-card__price-integer"
                            style="color: red"
                            >{{ activitylist.showPrice }}</span
                          >

                          <span
                            class="originPrice"
                            v-if="activitylist.linePrice"
                            >¥{{ activitylist.linePrice }}</span
                          >
                      
                        </span>
                        <div
                          class="buy"
                          v-if="activitylist.killNumber"
                          @click.stop="gobuy(activitylist.goodsId)"
                        >
                          <span class="buy_text">立即购买</span>
                        </div>
                        <div class="s" v-else>
                          <div class="buy complete">
                            <span class="buy_text">已抢完</span>
                          </div>
                          <div
                            class="buy_text"
                            style="color: red; font-size: 6px"
                          >
                            原价购买
                          </div>
                        </div>
                      </template>
                    </template>
                  </template>
                </van-card>
              </div>
            </div>
          </div> -->
          <!-- <div>
            <p @click="$router.push('/award')">幸运大抽奖</p>
          </div> -->
          <div class="nodesdata" v-if="goodslist && goodslist.length == 0">
            <!-- <van-empty description="暂无数据" />          -->
          </div>
          <!-- 为您推荐 -->
          <div class="preferential" v-else>
            <h2>
              <img
                class="recommend-hd-bg"
                src="@/assets/image/common/xh.png"
                alt=""
              />
            </h2>
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
        </van-list>
        <Footlink v-if="!judgeEmpty" />
      </van-pull-refresh>
    </div>
    <!-- <van-cell is-link @click="showPopup">展示弹出层</van-cell> -->
    <!-- <van-popup closeable v-if="type=2" v-model="show">
      <div class="luck">
        <div class="luck_top">
          <img src="../../assets/image/luck_top.png" alt="">
        </div>
          <div class="luck_bottom" >
            <p @click="goluck"><img src="../../assets/image/luck_botttom.png" alt=""></p>
          </div>
      </div>
      
    </van-popup> -->
    <div
      class="suspension"
      @touchmove="touchmove"
      ref="suspension"
      @click="suspensionClick"
      v-if="awardList"
    >
      <img src="@/assets/image/12.png" alt="" />
    </div>
    <div class="popUp" v-if="popFlag && awardList">
      <div>
        <img src="@/assets/image/11.1.png" alt="" />
        <img class="x" src="@/assets/image/11.3.png" alt="" @click="closePop" />

        <div class="rule" @click="$router.push('/awardDetails')">
          <img class="tiao" src="@/assets/image/11.2.png" alt="" />
        </div>
      </div>
    </div>
    <!-- 红包悬浮按钮 -->
    <div
      class="discountBox"
      v-if="getActivityShareInfo"
      ref="discountBox"
      @touchmove="discountTouchmove"
      @click="discountClick"
    >
      <!-- <img
        src="@/assets/image/share/discount.png"
        alt=""
      /> -->
      <!-- <img src="@/assets/image/share/share.png" alt="" /> -->
      <img src="@/assets/image/share/qrj.png" alt="" />
    </div>
    <template v-if="!!getActivityLocalInfo">
      <red-packet-popover
        :visible="isShowLocalShopRed"
        :data="couponData"
        @handleUse="handleUse"
      />
      <recieveRedPacketPopover
        ref="recieveRedPacketPopover"
        :visible="isRecieveRedPacketPopover"
        :data="
          getActivityLocalInfo.couponInfoVO
            ? getActivityLocalInfo.couponInfoVO[0]
            : {}
        "
        @handleOk="handleRecieveRedPacketPopoverOk"
        @handleClose="() => {}"
      />
    </template>
  </div>
</template>

<script>
import {
  getsSlideshow,
  getrecommend,
  getsGoodsTag,
  getsGoodsCateLevel,
  getActivityTime,
  repeatBuy,
  getluck,
  getsUserAddress,
  selectGood,
  officialSubsidy,
  goodsRestriction,
  userGetFlag,
  getUserInfo,
  couponActivity,
  couponReceive
} from "api";
import { salesFun } from "@/utils/dom.js";
import Header from "@/components/Header";
import Footlink from "@/components/home/footlink";
import GoodItem from "@/components/goods/goodItem";
import Special from "@/components/home/special";
import liveBroad from "@/components/home/liveBroad";
import { Dialog } from "vant";
import CommonHeader from "@/components/CommonHeader.vue";
import LoginVue from "../login/Login.vue";
import { mapGetters, mapActions, mapMutations } from "vuex";
import download from "@/components/download";
import redPacketPopover from "@/components/home/redPacketPopover";
import recieveRedPacketPopover from "@/components/home/recieveRedPacketPopover";
export default {
  name: "Home",
  components: {
    Header,
    Footlink,
    GoodItem,
    Special,
    liveBroad,
    CommonHeader,
    download,
    redPacketPopover,
    recieveRedPacketPopover
  },
  data() {
    return {
      // 是否弹出本地购红包
      isShowLocalShopRed: false,
      headerAttr: LukeappApi.getattribute(),
      show: true,
      isLoading: false, // 下拉刷新
      banner: [],
      specialifon: [],
      goodslist: [],
      loading: false, // 加载状态
      finished: false, // 是否加载
      pageNum: 1, // 当前页数
      pageSize: 20, // 每页条数
      refreshing: false,
      orderrefresh: false,
      judgeEmpty: false,
      countdown: 0,
      limitSaleStart: "",
      limitSaleEnd: "",
      countdownStart: "",
      m: "",
      type: 2,
      activitylist: [],
      couponActivityData: [],
      data: 0,
      data1: 0,
      flgT: false,
      goodsFlg: true,
      awardList: null,
      canDefault: false, //用户是否有默认地址
      popFlag: false,
      goodsList1: [],
      goodsList2: [],
      personalityTagsArr: [],
      datatime: 0,
      // 补贴
      subsidyList: [],
      list: [],
      officialSubsidy: true, //官方补贴的商品
      anchorInfo: null, // 直播相关信息
      isRecieveRedPacketPopover: false,
      couponData: null,
      currentQuery: {},
      scrollTop1: ""
    };
  },
  computed: {
    ...mapGetters(["getuserinfo"]),
    ...mapGetters("activity", ["getActivityShareInfo", "getActivityLocalInfo"])
  },

  methods: {
    salesFun: salesFun,
    ...mapActions(["userinfo"]),
    ...mapMutations("activity", ["setList"]),
    async _userGetFlag() {
      const unionid = this.getuserinfo?.unionid;
      // if (!unionid) {
      //   const { errorCode, data } = await getUserInfo();
      //   errorCode === 1 && this.userinfo(data);
      // }
      if (unionid) {
        const { data } = await userGetFlag({
          unionid: this.getuserinfo?.unionid
        });
        this.anchorInfo = data;
      }
    },
    _goodsRestriction() {
      goodsRestriction().then((res) => {
        if (res.errorCode == 1) {
          this.subsidyList = [];
          this.activitylist = [];
          this.list = res.data.content[0];
          this.activitylist =
            res.data.content[0].good && res.data.content[0].good.length > 2
              ? res.data.content[0].good.slice(0, 2)
              : res.data.content[0].good;

          if (this.activitylist) {
            let s = new Date(
              res.data.content[0].beginTime.replace(/-/g, "/")
            ).getTime();

            let t = res.data.content[0].resetTime * 60 * 1000;
            let m = s + t;
            let n = new Date().getTime();

            this.countdown =
              res.data.content[0].resetTime * 60 * 1000 - (n - s);

            this.timeChangs(this.countdown);

            if (n >= s && n <= m) {
              this.flgT = true;
            } else {
              this.flgT = false;
            }
          }
          this.subsidyList =
            res.data.content[1] && res.data.content[1].length > 2
              ? res.data.content[1].showGoodsList.splice(1, 2)
              : res.data.content[1].showGoodsList;
        }
      });
    },
    closePop() {
      sessionStorage.setItem("popFlag", false);
      this.popFlag = false;
    },
    _getluck() {
      const toast = this.$toast.loading({
        message: "加载中...",
        forbidClick: true
      });
      getluck().then((res) => {
        toast.clear();
        if (res && res.errorCode == 1) {
          this.awardList = res.data;
        }
      });
    },
    _getsUserAddress() {
      const toast = this.$toast.loading({
        message: "加载中...",
        forbidClick: true
      });
      getsUserAddress().then((res) => {
        toast.clear();
        if (res.errorCode == 1) {
          for (let i = 0; i < res.data.content.length; i++) {
            if (res.data.content[i].canDefault) {
              this.canDefault = true;
              break;
            }
          }
        }
      });
    },
    suspensionClick() {
      if (!localStorage.getItem("userinfo")) {
        // this.$router.push("/smslogin");
        let fullPath = this.$route.fullPath;
        this.$router.replace({
          path: "/smslogin",
          query: { redirect: fullPath }
        });
      } else if (!this.canDefault) {
        Dialog.alert({
          message: "请前往收货地址中设置默认收货地址"
        }).then(() => {
          this.$router.push({
            path: "/user/setting"
          });
        });
      } else {
        this.$router.push({
          path: "/award",
          query: {
            id: this.awardList.id
            // backgroundPic:this.awardList.backgroundPic,
            // voucherMoney: this.awardList.voucherMoney,
          }
        });
      }
    },
    touchmove(e) {
      e.preventDefault();
      let h =
        document.documentElement.clientHeight || document.body.clientHeight;
      let w = document.documentElement.clientWidth || document.body.clientWidth;
      let H = h - this.$refs.suspension.clientHeight;
      let W = w - this.$refs.suspension.clientWidth;
      let top =
        e.changedTouches[0].clientY - this.$refs.suspension.clientHeight / 2;
      let left =
        e.changedTouches[0].clientX - this.$refs.suspension.clientWidth / 2;
      top = top < 0 ? 0 / 2 : top;
      top = top > H ? H : top;
      left = left < 0 ? 0 : left;
      left = left > W ? W : left;
      this.$refs.suspension.style.top = top + "px";
      this.$refs.suspension.style.left = left + "px";
    },
    discountTouchmove(e) {
      e.preventDefault();
      let h =
        document.documentElement.clientHeight || document.body.clientHeight;
      let w = document.documentElement.clientWidth || document.body.clientWidth;
      let H = h - this.$refs.discountBox.clientHeight;
      let W = w - this.$refs.discountBox.clientWidth;
      let top =
        e.changedTouches[0].clientY - this.$refs.discountBox.clientHeight / 2;
      let left =
        e.changedTouches[0].clientX - this.$refs.discountBox.clientWidth / 2;
      top = top < 0 ? 0 / 2 : top;
      top = top > H ? H : top;
      left = left < 0 ? 0 : left;
      left = left > W ? W : left;
      this.$refs.discountBox.style.top = top + "px";
      this.$refs.discountBox.style.left = left + "px";
    },
    discountClick() {
      this.$router.push("/shares");
    },
    finish() {
      // console.log("倒计时结束");

      this.activitylist = null;
      this.flgT = false;
      this._getActivityTime();
    },
    timeChangs(time) {
      const day = parseInt(time / (60 * 60 * 24));
      const hou = parseInt((time % (60 * 60 * 24)) / 3600);
      const min = parseInt(((time % (60 * 60 * 24)) % 3600) / 60);
      const sec = parseInt(((time % (60 * 60 * 24)) % 3600) % 60);
      return `${day > 0 ? day + "天" : ""}${hou ? hou + "时" : ""}${
        min ? min + "分" : ""
      }${sec}秒`;
    },
    _getActivityTime() {
      selectGood().then((res) => {
        // console.log(res);
        if (res.errorCode == 1) {
          this.list = res.data;
          this.activitylist =
            res.data.good.length > 2
              ? res.data.good.slice(0, 2)
              : res.data.good;
          if (this.activitylist) {
            let s = new Date(res.data.beginTime.replace(/-/g, "/")).getTime();

            let t = res.data.resetTime * 60 * 1000;
            let m = s + t;
            let n = new Date().getTime();

            this.countdown = res.data.resetTime * 60 * 1000 - (n - s);

            this.timeChangs(this.countdown);
            // console.log(this.countdown);
            if (n >= s && n <= m) {
              this.flgT = true;
            } else {
              // console.log("正常");
              this.flgT = false;
            }
          }
        }
      });
      return;
      getActivityTime().then((res) => {
        if (res && res.errorCode === 1) {
          // this.activitylist.push(res.data.content[0]);
          // this.activitylist.push(res.data.content[1]);
          // this.activitylist = res.data.content[0];
          this.datatime = res.data.content[0].countdownStart
            .split(" ")[1]
            .split(":")[0];

          this.activitylist =
            res.data.content.length > 2
              ? res.data.content.splice(1, 2)
              : res.data.content;

          // if (this.activitylist.personalityTags) {
          //   this.personalityTagsArr =
          //     this.activitylist.personalityTags.split(",");
          // }

          if (res.data.content[0] && res.data.content[0].limitSaleFlag) {
            let s = new Date(
              res.data.content[0].countdownStart.replace(/-/g, "/")
            ).getTime();
            let t = res.data.content[0].countdown * 60 * 1000;
            let m = s + t;
            // console.log(s, t, m, n);
            let n = new Date().getTime();
            if (n >= s && n <= m) {
              this.flgT = true;
              // console.log("限时秒杀");
            } else {
              // console.log("正常");
              this.flgT = false;
            }
          }

          if (this.activitylist && this.activitylist[0].limitSaleType == 0) {
            const curTimer = new Date().getTime();
            this.activitylist[0].countdownStart =
              this.activitylist[0].countdownStart.replace(/-/g, "/");
            const fluterTimer = new Date(
              this.activitylist[0].countdownStart
            ).getTime();
            const subTimer = curTimer - fluterTimer;
            this.countdown =
              this.activitylist[0].countdown * 60 * 1000 - subTimer <= 0
                ? 0
                : this.activitylist[0].countdown * 60 * 1000 - subTimer;
          } else if (
            this.activitylist &&
            this.activitylist[0].limitSaleType == 1
          ) {
            this.limitSaleStart = this.activitylist[0].limitSaleStart;
            this.limitSaleEnd = this.activitylist[0].limitSaleEnd;
            this.m = this.limitSaleEnd;
            this.data = new Date(this.m).getTime();

            this.jishi();
            // let arr=this.limitSaleStart=this.limitSaleStart.split(' ')[0].split('-');
            // let arr1=this.limitSaleEnd=this.limitSaleEnd.split(' ')[0].split('-')
            // console.log(arr1);
            // this. m=arr[1]+'/'+arr[2]+'-'+arr1[1]+'/'+arr1[2]
          }
        }
      });
    },
    jishi() {
      setTimeout(() => {
        this.data1 = new Date().getTime();
        if (this.data1 > this.data) {
          this.activitylist = null;
          // this._getActivityTime();
        } else {
          this.jishi();
        }
      }, 1000);
    },
    goluck() {
      this.$router.push("/award?id=1&voucherMoney=0.3");
    },

    goDetail(
      id,
      activityId,
      officialSubsidy,
      officialSubsidyId,
      enableQuantity,
      skuKillInventory
    ) {
      if (activityId && skuKillInventory != 0) {
        this.$router.push({
          path: `/detail/${id}?agencyUnionid=${
            this.$route.query.agencyUnionid || null
          }&fromPlatform=${this.$route.query.fromPlatform || null}`,
          query: { activityId, skuKillInventory }
        });
      } else if (officialSubsidy && enableQuantity != 0) {
        this.$router.push({
          path: `/detail/${id}?agencyUnionid=${
            this.$route.query.agencyUnionid || null
          }&fromPlatform=${this.$route.query.fromPlatform || null}`,
          query: { officialSubsidy, officialSubsidyId, enableQuantity }
        });
      } else {
        this.$router.push({
          path: `/detail/${id}?agencyUnionid=${
            this.$route.query.agencyUnionid || null
          }&fromPlatform=${this.$route.query.fromPlatform || null}`
        });
      }
      // this.$router.push({
      //   path: `/detail/${id}?agencyUnionid=${
      //     this.$route.query.agencyUnionid || null
      //   }&fromPlatform=${this.$route.query.fromPlatform || null}`,
      //   query: { activityId },
      // });
      //     if(activityId){
      //       console.log(1);
      //        this.$router.push({
      //       path: `/detail/${id}?agencyUnionid=${
      //         this.$route.query.agencyUnionid || null
      //       }&fromPlatform=${this.$route.query.fromPlatform || null}`,
      //       query:{activityId}
      //     });
      //     }else{
      //  console.log(2);
      //       this.$router.push({
      //         path: `/detail/${id}?agencyUnionid=${
      //           this.$route.query.agencyUnionid || null
      //         }&fromPlatform=${this.$route.query.fromPlatform || null}`,
      //       });
      //     }
    },
    gobuy(id) {
      let userinfo = JSON.parse(window.localStorage.getItem("userinfo"));
      // console.log(userinfo);
      if (userinfo) {
        // console.log(999);
        this.$router.push({
          path: `/detail/${id}?agencyUnionid=${
            this.$route.query.agencyUnionid || null
          }&fromPlatform=${this.$route.query.fromPlatform || null}`
        });
        // repeatBuy({goodsId:id,userId:userinfo.uid}).then(res=>{
        //   console.log(res);
        //   if(res.data==0){
        //     this.$router.push({
        //       path: `/detail/${id}?agencyUnionid=${
        //         this.$route.query.agencyUnionid || null
        //       }&fromPlatform=${this.$route.query.fromPlatform || null}`,
        //     })

        //   }else if(res.data==1){
        //      this.$toast('您已购买过此秒杀商品!')
        //   }
        // })
      } else {
        // this.$router.push("/login").catch(() => {});
        // this.$router.push("/smslogin").catch(() => {});
        let fullPath = this.$route.fullPath;
        this.$router.replace({
          path: "/smslogin",
          query: { redirect: fullPath }
        });
      }
      // console.log(userinfo);
      // if(userinfo){
      //   console.log(999);
      //   repeatBuy({goodsId:id,userId:userinfo.uid}).then(res=>{
      //     console.log(res);
      //     if(res.data==0){
      //       this.$router.push({
      //         path: `/detail/${id}?agencyUnionid=${
      //           this.$route.query.agencyUnionid || null
      //         }&fromPlatform=${this.$route.query.fromPlatform || null}`,
      //       })

      //     }else if(res.data==1){
      //        this.$toast('您已购买过此秒杀商品!')
      //     }
      //   })
      // }else{
      //   console.log(9998);
      //       this.$router.push("/login").catch(() => {});
      // }
    },
    getActivityzone() {
      // this.$router.push({
      //   path: "/Activityzone",
      // });
      this.$router.push("/purchase1");
    },

    handleTitle() {},
    // 下拉
    onLoad() {
      this.pageNum += 1;
      this.orderrefresh = false;

      setTimeout(() => {
        this._getS();
      }, 500);

      // },5000);

      // this._getgetrecommend(true
    },
    handleSwipe(item) {
      if (item.jumpType == 1) {
        this.$router.push({
          path: `/detail/${item.jumpId}?agencyUnionid=${
            this.$route.query.agencyUnionid || null
          }&fromPlatform=${this.$route.query.fromPlatform || null}`
        });
      } else if (item.jumpType == 2) {
        this.$router.push({
          name: "shopinfo",
          params: { ShopId: item.jumpId }
        });
      } else if (item.jumpType == 3) {
        let seft = this;
        window.location.href = item.hyperlink;
      } else if (item.jumpType === 4) {
        this.$router.push({
          name: "newExclusive",
          query: { One_id: item.jumpId, title: item.title }
        });
      }
    },
    // 下拉刷新
    async onRefresh() {
      this.orderrefresh = false;
      this.pageNum = 1;
      this._getS("1");
      // this._getActivityTime();
      // this.officialSubsidy();
      this._goodsRestriction();
      this.getCouponActivity();
      await this._userGetFlag();
      this.anchorInfo &&
        this.$nextTick().then(() => this.$refs?.liveBroad._goodsAssociated());
    },
    async _getS(more, val) {
      this.judgeEmpty = true;
      const toast = this.$toast.loading({
        message: "加载中...",
        forbidClick: true
      });
      if (more) {
        this.goodsFlg = false;
      } else {
        this.loading = true;
      }
      await getrecommend({
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then((res) => {
        if (more) {
          this.isLoading = false;
          this.goodsFlg = true;
        }
        toast.clear();
        if (res && res.errorCode === 1) {
          if (more) {
            this.goodslist = [];
            this.goodsList1 = [];
            this.goodsList2 = [];
            this.pageNum = 1;
          }
          if (more && !val) {
            this.$toast("刷新成功");
          }
          this.refreshing = false;
          if (res.data) {
            if (res.data.content.length > 0) {
              this.goodslist = this.goodslist.concat(res.data.content);
              this.finished = !res.data.isHasNextPage;
              if (!res.data.isHasNextPage) {
                this.finished = true;
                this.finishedText = "- 没有更多了-";
              }
            } else {
              this.finished = !res.data.isHasNextPage;
            }
            this.$nextTick(() => {
              this.fun(res.data.content);
            });
          } else {
            this.finished = !res.data.isHasNextPage;
            this.goodslist = res.data.content;
            this.$nextTick(() => {
              this.fun(res.data.content);
            });
          }
        } else {
          this.finished = true;
          this.finishedText = "- 没有更多了-";
        }
      });
      this.judgeEmpty = false;
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
    },
    _getsSlideshow() {
      getsSlideshow().then((res) => {
        if (res && res.errorCode == 1) {
          this.banner = res.data.content;
          this.$refs.swipe.resize();
        }
      });
    },
    _getsGoodsTag() {
      getsGoodsTag().then((res) => {
        if (res && res.errorCode === 1) {
          this.specialifon = res.data.content;
        }
      });
    },
    more() {
      // this.$router.push("/purchase");
      this.$router.push("/purchase1");
    },
    async getCouponActivity() {
      try {
        const {
          data: { content }
        } = await couponActivity();
        this.setList(content);

        this.currentQuery.origin &&
          this.dealWithOrigin(this.currentQuery.origin);
      } catch (err) {
        console.log(err);
      }
    },
    dealWithOrigin(url) {
      switch (url) {
        // 诚聊卖跳转来的
        case "clm":
          this.isRecieveRedPacketPopover = !!this.getActivityLocalInfo;
          const { token } = this.$route.query;
          token &&
            token !== "undefined" &&
            localStorage.setItem("userinfo", JSON.stringify({ token }));
          break;
        default:
          break;
      }
    },
    handleUse() {
      !this.getuserinfo && getUserInfo();
    },
    async handleRecieveRedPacketPopoverOk() {
      const { couponId } = this.getActivityLocalInfo;
      const { data, success } = await couponReceive({ couponId });
      this.couponData = data;
      this.isRecieveRedPacketPopover = false;
      if (!success) return;
      setTimeout(() => (this.isShowLocalShopRed = true), 500);
    }
  },
  mounted() {},
  activated() {
    this.$refs.beatHome.addEventListener(
      "scroll",
      (e) => {
        this.scrollTop1 = this.$refs.beatHome.scrollTop;
      },
      true
    );
    this.$refs.beatHome.scrollTop = sessionStorage.getItem("locationHome");
    this.goodsFlg = false;
    // this.pageNum=1;
    // this._getS("1", "1");
    // this._getActivityTime();
    // this.officialSubsidy();
    this.canDefault = false;
    this._getluck();

    if (
      localStorage.getItem("userinfo") &&
      this.$route.query?.origin !== "clm"
    ) {
      this._getsUserAddress();
    }

    this._goodsRestriction();
    this._userGetFlag();
    this.getCouponActivity();
  },
  created() {
    this._goodsRestriction();
    if (!sessionStorage.getItem("popFlag")) {
      sessionStorage.setItem("popFlag", true);
    }
    this.popFlag = sessionStorage.getItem("popFlag") === "true";
    this._getsSlideshow();
    this._getsGoodsTag();
    this._getS();
    this._userGetFlag();
    this.getCouponActivity();
    // this.officialSubsidy()
    // this._getActivityTime();
    // this._getluck();
    // if (localStorage.getItem("userinfo")) {
    //   this._getsUserAddress();
    // }
  },
  beforeRouteLeave(to, from, next) {
    if (to.name == "detail") {
      from.meta.keepAlive = true;
    } else {
      // from.meta.keepAlive = false;
    }
    sessionStorage.setItem("locationHome", this.scrollTop1);

    next();
  },

  watch: {
    $route: {
      handler({ query }, from) {
        this.currentQuery = query || {};
        if (!from) {
          if (query?.inviteCode) {
            sessionStorage.setItem("inviteCode", query?.inviteCode);
          }
        } else {
          const { name } = from;

          if ((name === "smslogin" || name === "login") && query.autoOpen) {
            this.$nextTick(() => {
              this.$refs.recieveRedPacketPopover.handleJoin();
              this.$router.push({ query: {} });
            });
          }
        }
      },
      immediate: true
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/style/mixin.scss";
.home-bodys {
  top: 0;
}
.moreG {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  .iconM {
    width: 17px;
    height: 17px;
  }
  > span {
    font-size: 13px;
    font-weight: bold;
    color: #ff7136;
    vertical-align: middle;
    padding: 0 7px 0 10px;
  }
  .icon1 {
    width: 6px;
    height: 10px;
    vertical-align: middle;
    margin-left: 5px;
  }
}
.guanFa {
  > div {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    > div {
      img {
        width: 75px;
        height: 75px;
      }
      .span1 {
        font-size: 10px;
        font-weight: 500;
        color: #959595;
        margin-top: 15px;
      }
      .span2 {
        font-size: 11px;
        font-weight: bold;
        color: #fe3746;
        margin-top: 15px;
      }
    }
  }
}
.mSha {
  > div {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    > div {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      img {
        width: 75px;
        height: 75px;
      }
      > div {
        > div {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          .mS1 {
            font-size: 10px;
            font-weight: 500;
            color: #959595;
            margin-top: 15px;
          }
          .mS2 {
            font-size: 11px;
            font-weight: bold;
            color: #fe3746;
            margin-top: 15px;
          }
        }
      }
    }
  }
}
.comes {
  .activitys {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    .killActivity {
      width: 172px;
      // height: 194px;
      background: url("../../assets/image/common/miaob.png") no-repeat;
      background-size: 100% 100%;
      padding: 10px;
      .titleM {
        color: #161616;
        font-size: 17px;
        font-weight: bold;
      }
      .kill_top {
        display: flex;
        justify-content: space-around;
        align-items: center;
        .bei {
          background: url("../../assets/image/common/pink.png") no-repeat;
          background-size: 100% 100%;

          .van-count-down {
            font-weight: bold;
            font-size: 10px;
            padding: 0 5px;
            color: #fefefe;
          }
        }
      }
      .div {
        span:first-child {
          color: #161616;
          font-size: 17px;
        }
        > span {
          margin: 5px;
        }
      }
    }
    .ditu {
      background: url("../../assets/image/home/ditu.png") no-repeat;
      background-size: 100% 100%;
      height: 134px;
      border-radius: 8px;
      margin-top: 5px;
    }
    .officialSubsidy {
      width: 172px;
      // height: 194px;
      background: url("../../assets/image/common/miaob.png") no-repeat;
      background-size: 100% 100%;
      padding: 10px;
      .kill_top {
        display: flex;
        align-items: center;
      }
      .bei1 {
        background: url("../../assets/image/common/origine.png") no-repeat;
        background-size: 100% 100%;
        margin-left: 10px;
        > div {
          font-weight: bold;
          font-size: 10px;
          padding: 5px;
          color: #fff;
        }
      }
      .titleM {
        color: #161616;
        font-size: 17px;
        font-weight: bold;
      }
    }
  }

  .personalityTags {
    display: flex;
    flex-wrap: wrap;
    padding: 5px 0;
    > div {
      margin-right: 5px;
      margin-top: 5px;
      font-size: 10px;
      border: 1px solid #d1020c;
      border-radius: 3px;
      p {
        color: #d1020c;
        padding: 2px;
      }
    }
  }
  .tailMark {
    background: #d1020c;
    color: white;
    font-size: 10px;
    border-radius: 10px;
    padding: 2px 5px;

    height: 16px;
    line-height: 10px;
    margin-right: 5px;
    vertical-align: text-bottom;
  }
}
.title {
  font-size: 14px;
  // line-height: 20.424px;
  height: fit-content;
  @include no-wrap-multi(2);
  img {
    height: 17px;
    border: none;
    vertical-align: text-bottom;
  }
}
.goodsbox {
  display: flex;
  justify-content: space-between;
  > div {
    width: 49%;
    height: fit-content;
  }
}
.popUp {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.363);
  z-index: 11;
  > div {
    width: 90%;
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    // .rule {
    //   position: absolute;
    //   bottom: 0;
    //   left: 0;
    //   width: 100%;
    //   height: 20%;
    // }
    .tiao {
      width: 100px;
      height: 40px;
      position: absolute;
      bottom: 10px;
      right: 35%;
    }
    .x {
      width: 35px;
      height: 35px;
      position: absolute;
      // bottom: 10px;
      margin-top: 20px;
      right: 45%;
    }
    img {
      display: block;
      width: 100%;
      border-radius: 10px;
    }
  }
}
.suspension {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  position: fixed;
  top: 80vh;
  left: 78vw;
  z-index: 10;
  img {
    display: block;
    width: 100%;
    height: 100%;
  }
}
.discountBox {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  position: fixed;
  bottom: 15vh;
  left: 78vw;
  z-index: 10;
  img {
    display: block;
    width: 100%;
    height: 100%;
  }
}
.van-popup {
  background-color: transparent;
}
.luck {
  //  background-image: url(../../assets/image/luck1.png);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 9rem;
  //  background-color: springgreen;
  //  opacity: 0.5;
  .luck_top {
    //  background-color: red;
    padding-top: 50px;
    height: 265px;
    img {
      height: 100%;
    }
  }
  .luck_bottom {
    width: 50px;
    height: 41px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.dyjico {
  font-size: 0.4rem;
}
.colon {
  display: inline-block;
  // margin: 0 4px;
  color: #ee0a24;
}
.block {
  display: inline-block;
  width: 22px;
  color: rgb(248, 18, 18);
  font-size: 12px;
  text-align: center;
  // background-color: #ee0a24;
}
.Loading {
  width: 140px;
  height: 72px;
}
.van-card__title {
  font-size: 14px;
  color: #333;
}
.main-home {
  .van-pull-refresh {
    // overflow: auto;
    // height: 100%;
    // width: 100%;
  }
}
.originPrice {
  // float: left;
  margin-left: 5px;
  font-size: 12px;
  color: #999;
  text-decoration: line-through;
}
// :deep( .header) {
//   background: #930200ff;

//   &::after {
//     content: inherit;
//   }
//   .van-nav-bar__content {
//     padding-bottom: 20px;
//   }
// }
:deep(.header.van-hairline--bottom::after) {
  border: 0;
}
.search-box {
  padding: 4px 10px;
  height: 100%;
  border-radius: 2px;
  color: #333;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: left;
  font-size: 12px;
}
.search-tit {
  margin-left: 5px;
}
.banner {
  padding: 10px 10px 0;
  background: linear-gradient(to bottom, #930200ff 60%, #f9f9f9 60%);
  :deep(.van-swipe) {
    // background: #f6f6f6;
    width: 100%;
    max-height: 125px;
    border-radius: 10px;
    // box-shadow: 2Px 2Px 10Px 0px rgba(120, 120, 120, 0.3);
    img {
      width: 100%;
      object-fit: contain;
    }
  }
}

.preferential {
  width: 100%;
  margin-top: 5px;
  padding: 0 10px;
  h2 {
    text-align: center;
    height: 40px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    .recommend-hd-bg {
      width: 177.74399999999997px;
      height: 20.976000000000003px;
    }
  }
  .preferential-content {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 10px;
    padding-bottom: 20px;
    .content-left {
      width: 175px;
      height: 264px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 4px;
        box-shadow: 2px 2px 15px 0px rgba(120, 120, 120, 0.3);
      }
    }
    .content-right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 175px;
      div {
        width: 100%;
        height: 130px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 4px;
          box-shadow: 2px 2px 15px 0px rgba(120, 120, 120, 0.3);
        }
      }
    }
  }
}

.activity-box {
  display: flex;
  padding: 15px 15px 10px 15px;
  justify-content: space-between;
  .prefecture {
    // background: url("../../assets/image/activity/prefectureBg.png") no-repeat;
    background: url("../../assets/image/activity/l11.png") no-repeat;
    background-size: 100% 100%;
  }
  .shop {
    // background: url("../../assets/image/activity/shopBg.png") no-repeat;
    background: url("../../assets/image/activity/r11.png") no-repeat;
    background-size: 100% 100%;
  }
  .prefecture,
  .shop {
    width: 165px;
    height: 80px;
    color: #fefdfd;
    position: relative;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    img {
      width: 60px;
      height: 60px;
      position: absolute;
      bottom: 10px;
      right: 8px;
    }
    .text {
      padding-left: 8.5px;
    }
    h2 {
      margin-top: 18px;
      font-size: 18px;
      font-weight: normal;
    }
    p {
      margin-top: 9px;
      font-size: 14px;
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
  background-image: url(../../assets/image/Activityzone.png);
  background-size: 100%;

  .banner {
    color: #ffffff;
    margin-left: 10px;
  }
}
.van-card__header {
  background-color: #fff;
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
  width: 67px;
  height: 16px;
  font-size: 17px;
  font-family: PingFang SC;
  font-weight: bold;
  color: #ffffff;
  margin-left: 140px;
}

.activity_content {
  // height: 80%;
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 10px;
  overflow: auto;
  background-color: #fff;
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
  // padding-top: 4px;
  padding: 2px 8px;
  // width: 75px;
  // height: 28px;
  // background: linear-gradient(66deg, #ff9429 0%, #ff7200 100%);
  background-color: #cf0000;
  border-radius: 14px;
  width: 80px;
  text-align: center;
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
  // width: 55px;
  // height: 13px;
  font-size: 13px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #fefefe;
  // padding-left: 10px;
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
  font-size: 15px;
}
.title_text1 {
  font-size: 13px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #333333;
}
.van-card__content {
  padding: 10px 0px 4px 0;
  // padding: 10px 10px 0  0;
  background-color: #fff;
}
.van-card__thumb {
  // width: 40%;
  // height: 130px;
  width: 110px;
  height: 110px;
}
.van-card__thumb img {
  border-radius: 0;
}
.goodsback {
  padding-top: 10px;
}
.van-card__thumb img {
  border-radius: 10px;
}
.limitedactivities {
  // width: 100%;
  // height: 100%;
  margin: 15px 15px 10px 15px;
  background: #fff;
  border-radius: 5px;
  .activity_content {
    // height: 80%;
    // margin-left: 10px;
    // margin-right: 10px;
    border-radius: 10px;
    overflow: auto;
    .info {
      //  padding: 10px 0; 0.21333rem 0.42667rem
      //  border-radius: 10px;
      margin-top: 5px;
      margin-bottom: 5px;
    }
  }
  .title_time {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    align-items: center;
    .title_text {
      font-size: 12px;
      color: #cf0000;
      font-weight: bold;
      text-align: center;
      width: 80px;
      height: 23px;
      align-items: center;
      display: flex;
      .tubiao {
        padding-left: 5px;
        line-height: 11px;
        img {
          width: 7px;
          height: 11px;
        }
      }
    }
    .title_timer {
      font-size: 13px;
      color: #cf0000;
      background: url("../../assets/image/timer.png") no-repeat;
      background-size: 100% 100%;
      // padding: 10px;
      line-height: 23px;
    }
    .more {
      display: flex;
      font-size: 14px;
    }
    .van-count-down {
      line-height: 23px;
    }
  }
  .content_time {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    .content_img {
      width: 40%;
      height: 120px;
      img {
        width: 100%;
        height: 100%;
        background-size: 100%;
      }
    }
  }
  .content_message {
    width: 60%;
    height: 120px;
    margin-left: 10px;
    .shop_name {
      font-size: 18px;
    }
    .shop_text {
      font-size: 18px;
    }
    .footer_message {
      display: flex;
      justify-content: space-between;
      // width: 60%;
      // text-align: center;
      // margin-top: 60px;
      // height: 120px;
      .price_text {
        // width: 50px;
        // height: 100%;
        // margin-bottom: 10px;
        // padding: 10px;
        // border: 1px;
        // background: green;
        // width: 50px;
        // height: 50px;
        .price_left {
          padding-right: 10px;
          width: 60%;
          height: 100%;
        }
        .price_right {
          color: #fff;
        }
      }
      .gobuy {
        // width: 2rem;
        // height: 0.1rem;
        // border: 1px;
        // background: yellow;
      }
    }
  }
}
.complete {
  background: linear-gradient(66deg, #747372 0%, #474747 100%);
}
.s {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: -9px;
}
</style>
