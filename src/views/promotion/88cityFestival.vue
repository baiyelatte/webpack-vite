<template>
  <router-layout>
    <div class="activity">
      <van-nav-bar
        :title="$route.meta.title"
        left-arrow
        v-if="!iscltApp()"
        :style="{
          top: headerAttr.header === 1 ? '0' : headerAttr.statusbar + 'px'
        }"
        @click-left="$router.replace('/index')"
      />
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <div class="container" v-if="activityStatus == 2">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <div class="activityBg">
              <!-- <img src="../../assets/image/activity/88bg.png" alt="" /> -->
              <img :src="cityContent.backImg" alt="" />
            </div>
            <div class="share" @click="activityShare">
              <img src="../../assets/image/activity/88share.png" alt="" />
            </div>
            <div class="rules" @click="$router.push('/cityRules')">
              <img src="../../assets/image/activity/88rules.png" alt="" />
            </div>
            <div class="live" v-if="cityContent && cityContent.liveFlag">
              <img src="../../assets/image/activity/living.png" alt="" />
              <div class="live-status" @click="goLive">
                <p>正在直播</p>
                <p style="font-size: 9px">活动讲解中</p>
              </div>
            </div>
            <div class="content">
              <div class="coupon-tit">
                <img src="../../assets/image/activity/88title.png" alt="" />
              </div>
              <div class="coupon">
                <div
                  class="coupons-list"
                  v-for="(item, index) in couponList"
                  :key="index"
                >
                  <div class="coupons-pri">
                    ¥ <b>{{ item.discounts }}</b>
                  </div>
                  <div class="coupons-tj">满{{ item.useLimit }}可用</div>
                  <div
                    class="coupons-btn"
                    v-if="!enumReceiveRuleFn(item)"
                    @click="getCoupons(item.couponId, index)"
                  >
                    立即领取
                  </div>
                  <div
                    class="coupons-btn"
                    v-else-if="enumReceiveRuleFn(item) === 1"
                  >
                    领取成功
                  </div>
                  <img
                    v-else
                    class="mcImg"
                    src="../../assets/image/activity/mc.png"
                    alt=""
                  />
                </div>
              </div>
              <div class="ranking" v-if="cityContent.rankFlag == true">
                <img
                  class="rankGift"
                  src="../../assets/image/activity/88title2.png"
                  alt=""
                />
                <img
                  class="rankGo"
                  @click="go"
                  src="../../assets/image/activity/go.png"
                  alt=""
                />
              </div>
              <div class="activity-city">
                <van-tabs
                  v-model="activeNum"
                  :ellipsis="false"
                  @click="getTab"
                  immediate-check="false"
                  line-height="0px"
                  line-width="0px"
                >
                  <van-tab
                    v-for="(item, index) in cityContent.cityList"
                    :key="index"
                  >
                    <template #title class="tab-tit">
                      <p
                        style="
                          color: #333;
                          font-size: 14px;
                          font-weight: 500;
                          text-align: center;
                        "
                        :class="[activeNum == index ? 'active' : '']"
                      >
                        {{ item.venueTitle }}
                      </p>
                      <p
                        style="
                          color: #777;
                          font-size: 10px;
                          line-height: 16px;
                          text-align: center;
                        "
                        :class="[activeNum == index ? 'active2' : '']"
                      >
                        {{ item.venueSubTitle }}
                      </p>
                    </template>

                    <video
                      ref="venueVideoCover"
                      :src="item.venueVideoLink"
                      :poster="item.venueVideoCoverLink"
                      controls="true"
                      preload="auto"
                      webkit-playsinline="true"
                      playsinline="true"
                      x-webkit-airplay="allow"
                      x5-video-player-type="h5"
                      x5-video-player-fullscreen="true"
                      x5-video-orientation="portraint"
                    ></video>
                    <div class="goods">
                      <div
                        class="goods-item"
                        v-for="(item1, index1) in activityGoods"
                        :key="index1"
                        @click="goDetail(item1.goodsId)"
                      >
                        <div class="goods-imag">
                          <img :src="item1.logoImgUrl" alt="" />
                        </div>
                        <div class="goods-detail">
                          <div class="goods-name">
                            {{ item1.goodsName }}
                          </div>
                          <div class="goods-sale">
                            人气值 <span>{{ item1.buyNumber }}</span>
                          </div>
                          <div class="price">
                            <div class="goods-price">
                              ¥ <span>{{ item1.activityPrice }}</span>
                            </div>
                            <img
                              class="join"
                              src="../../assets/image/activity/join.png"
                              alt=""
                              @click.stop="join(item1)"
                            />
                          </div>
                        </div>
                        <div class="goods-bq">
                          <img
                            src="../../assets/image/activity/buy.png"
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  </van-tab>
                </van-tabs>
                <van-sku
                  v-model="skuShow"
                  :sku="sku"
                  :goods="goods_info"
                  :goods-id="goodsId"
                  :hide-stock="sku.hide_stock"
                  :hide-selected-text="false"
                  :quota="goodsInfo.limitSaleFlag && flgT ? quota1 : quota"
                  :start-sale-num="
                    skuMinimumOrderQuantity ? skuMinimumOrderQuantity : 1
                  "
                  @add-cart="_skuaddcart"
                  @buy-clicked="_buyclicked"
                  @sku-prop-selected="skuPropSelected"
                  @sku-selected="skuSelected"
                  @stepper-change="stepperChange"
                  ref="getSkuData"
                >
                  <template #sku-header-price="props">
                    <template
                      v-if="props.selectedSkuComb && props.selectedSkuComb"
                    >
                      <div
                        class="van-sku__goods-price"
                        @click="handleClick(props)"
                      >
                        <span class="van-sku__price-symbol">￥</span>
                        <span class="van-sku__price-num">{{
                          skuPayMoneyFilter(props.selectedSkuComb)
                        }}</span>

                        <span
                          class="dyjico cartdet"
                          v-show="isShowSkuVoucherMoney(props.selectedSkuComb)"
                        >
                          {{ props.selectedSkuComb.voucherMoney }}</span
                        >
                      </div>
                    </template>
                    <template v-else>
                      <div class="van-sku__goods-price">
                        <span class="van-sku__price-symbol">￥</span>
                        <span class="van-sku__price-num">{{
                          props.price
                        }}</span>
                      </div>
                    </template>
                  </template>
                  <template #sku-messages>
                    <div class="totalBox">
                      <p>合计金额</p>
                      <p>￥{{ totalMoney }}</p>
                    </div>
                  </template>
                  <!-- 自定义 sku actions -->
                  <!-- v-if="clickType==1" -->
                  <template #sku-actions="props">
                    <div class="van-sku-actions">
                      <van-button
                        v-show="clickType == 1"
                        square
                        size="large"
                        type="danger"
                        text="加入购物车"
                        @click="addcart"
                      >
                      </van-button>
                      <van-button
                        v-show="clickType == 2"
                        square
                        size="large"
                        type="danger"
                        text="确定"
                        @click="props.skuEventBus.$emit('sku:buy')"
                      >
                      </van-button>
                    </div>
                  </template>
                </van-sku>
              </div>
            </div>
          </van-list>
        </div>
        <div class="empty" v-else-if="activityStatus == 1">活动暂未开启</div>
        <div class="empty" v-else-if="activityStatus == 3">活动暂已结束</div>
      </van-pull-refresh>
    </div>
  </router-layout>
</template>
<script>
import wechatShare from "@/utils/wxShare.class.js";
import {
  getCouponList,
  cityInfo,
  cityGoodsList,
  couponReceive,
  getsGoodsSku,
  addshoppingCart
} from "api";

export default {
  name: "cityFestival",
  data() {
    return {
      isApp: LukeappApi.IscltApp(),
      headerAttr: LukeappApi.getattribute(),
      mcTrue: false,
      refreshing: false,
      activeNum: 0,
      cityContent: {},
      cityLists: [],
      pageNum: 1,
      pageSize: 10,
      couponList: [],
      configId: null, //活动id
      detailsId: null, //会场id
      activityGoods: [], // 渲染数据
      active: "",
      skuShow: false,
      totalMoney: 0,
      buyNum: 1,
      isSelectedSku: null, // 是否选中商品，null代表未选中
      goods_info: {
        price: 1,
        title: "测试商品",
        picture: "https://b.yzcdn.cn/vant/sku/shoes-1.png"
      },
      sku: {
        price: 180,
        stock_num: 2218,
        none_sku: false,
        hide_stock: false,
        collection_id: 81,
        tree: [],
        list: []
      },
      goodsInfo: {},
      clickType: 1, //1购物车2购买
      goodsSkuId: 0, //商品skuid
      quota: 0, // 限购
      quota1: 0,
      quota_used: 0,
      goodsId: null,
      customStepperConfig: {
        // 自定义限购文案
        quotaText: ""
      },
      skucate: true,
      skuMinimumOrderQuantity: "",
      resData1: [],
      activityStatus: 2,
      loading: false,
      finished: false
    };
  },
  created() {
    this._getCityInfo();
    this._getCouponList();
  },
  watch: {
    activeNum(val, oldVal) {
      this.$refs.venueVideoCover[oldVal].pause();
    }
  },
  methods: {
    iscltApp() {
      const IscltApp = LukeappApi.IscltApp;
      return (
        IscltApp() ||
        window.navigator.userAgent.match(/SincereMall/) == "SincereMall"
      );
    },
    isShowSkuVoucherMoney({ skuCanVoucherMoney, canVoucherMoney }) {
      const { skuKillInventory } = this.$route.query;

      if (skuKillInventory) {
        return skuCanVoucherMoney;
      }

      return canVoucherMoney;
    },
    skuPayMoneyFilter({
      payMoney,
      skuCanVoucherMoney,
      skuVoucherMoney,
      skuKillPrice
    }) {
      const { skuKillInventory } = this.$route.query;
      if (skuKillInventory) {
        if (skuCanVoucherMoney) {
          return skuVoucherMoney;
        } else {
          return skuKillPrice;
        }
      }

      return payMoney;
    },
    _getsGoodsSku(goodsId) {
      //一级
      let that = this;
      let obj = {
        goodsId,
        at: 5,
        activityId: that.cityContent.configId
      };
      if (this.$route.query.activityId) {
        obj.activityId = this.$route.query.activityId;
      } else if (this.$route.query.officialSubsidy) {
        obj.officialSubsidy = this.$route.query.officialSubsidy;
        obj.officialSubsidyId = this.$route.query.officialSubsidyId;
      }
      getsGoodsSku(obj).then((res) => {
        if (res && res.errorCode == 1) {
          this.resData1 = res.data.content;
          if (this.resData1 && this.resData1[0]) {
            this.sku = {
              ...this.sku,
              price: this.resData1[0].price,
              stock_num: this.resData1[0].enableQuantity
            };
          }

          //  for(let i = 0;i < res.data.content.length;i++) {
          //    if(res.data.content[i].skuOpenTheMinimum==1){
          //      this.skuMinimumOrderQuantity=res.data.content[i].skuMinimumOrderQuantity
          //    }
          //  }
          if (this.goodsInfo.limitSaleFlag && this.flgT) {
            // this.kill();
            // this._getGoodsInfo()
          }
          let resData = res.data.content;
          let treedata = [];

          if (
            this.goodsInfo == null ||
            that.goodsInfo.cateType != 2 ||
            that.goodsInfo.goodsSpecJson == null ||
            that.goodsInfo.goodsSpecJson == ""
          ) {
            const { content } = res.data;

            const listdata = content.map((goodsInfo, i) => ({
              ...goodsInfo,
              stock_num: goodsInfo.enableQuantity,
              s1: i + ""
            }));

            treedata.push({
              k: "商品规格",
              k_s: `s1`, // s10 别名
              v: [],
              largeImageMode: false
            });
            for (var jj = 0; jj < resData.length; jj++) {
              const { skuName, pic } = resData[jj];
              treedata[0].v.push({
                // 对应 list s1的值
                id: jj.toString(),
                name: skuName,
                imgUrl: pic
              });
            }
            this.sku.hide_stock = false;
            this.sku.list = listdata;
            this.sku.none_sku = false;
            this.sku.tree = treedata;
            return;
          }
          let specJson = that.goodsInfo.goodsSpecJson;
          let spec = JSON.parse(specJson);
          this.isSelectedSku = that.goodsInfo.selectedSkuComb;

          for (let i = 0; i < spec.length; i++) {
            treedata.push({
              k: spec[i].n,
              k_s: `s${i + 1}`, // s10 别名
              v: [],
              largeImageMode: false
            });
            let spect = spec[i].t;
            for (var jjj = 0; jjj < spect.length; jjj++) {
              treedata[i].v.push({
                // 对应 list s1的值
                id: jjj.toString(),
                name: spect[jjj]
              });
            }
          }

          let listdata = [];
          for (var f = 0; f < resData.length; f++) {
            listdata.push({
              ...resData[f],
              id: resData[f].id,
              price: resData[f].price,
              stock_num: resData[f].enableQuantity,
              skuMinimumOrderQuantity: resData[f].skuMinimumOrderQuantity,
              skuOpenTheMinimum: resData[f].skuOpenTheMinimum
            });

            if (resData[f].skuName != null) {
              let arr = resData[f].skuName.split("/");
              for (var y = 0; y < arr.length; y++) {
                let var5 = treedata[y] ? treedata[y].v : [];
                for (var yy = 0; yy < var5.length; yy++) {
                  if (var5[yy].name == arr[y]) {
                    var keys = `s${y + 1}`;
                    listdata[f][keys] = yy;
                  }
                }
              }
            }
          }
          this.sku.tree = treedata;
          this.sku.hide_stock = false;
          this.sku.list = listdata;
          this.sku.none_sku = false;
        }
      });
    },
    addcart() {
      let seft = this;
      let user = JSON.parse(window.localStorage.getItem("userinfo"));
      if (!user || !user.token) {
        let fullPath = this.$route.fullPath;
        seft.$router.replace({
          path: "/smslogin",
          query: { redirect: fullPath }
        });
      }
      if (!this.isSelectedSku) {
        seft.$toast("请选择商品规格");
        return;
      }
      let shipdata = {
        buyNum: seft.buyNum,
        goodsSkuId:
          seft.goodsInfo.cateType == 1
            ? seft.sku.list[0].goodsSkuId
            : seft.goodsSkuId,
        goodsId: seft.goodsInfo.goodsId,
        shopId: seft.goodsInfo.shopInfo.id,
        agencyUnionid: seft.$route.query.agencyUnionid || null,
        fromPlatform: seft.$route.query.fromPlatform || null
      };
      if (this.isSelectedSku.id != null || this.isSelectedSku.id == 0) {
        shipdata.goodsSkuId = this.isSelectedSku.id;
      }
      addshoppingCart(shipdata).then((res) => {
        if (res && res.errorCode == 1) {
          seft.$toast.success("已添加购物车");
          this.skuShow = false;
        }
      });
    },
    onRefresh() {
      (this.refreshing = false), (this.pageNum = 1);
    },
    activityShare() {
      const picShare =
        process.env.NODE_ENV === "development"
          ? require("../../assets/image/activity/test.png")
          : require("../../assets/image/activity/oning.png");
      console.log(this.iscltApp(), "-----"); //判断是否在APP里
      if (this.iscltApp() == true) {
        var iosPubUrl =
          "logo==" +
          window.location.origin +
          require("../../assets/image/activity/shareLo.png") +
          "&&title==88狂欢城市节" +
          "&&descs==诚聊购88城市狂欢节，全场买一送一，更有特大惊喜等你来拿" +
          "&&link==" +
          window.location.href +
          "&&picShare==" +
          window.location.origin +
          picShare +
          "&&copyLink==【88羽石节】亿万年沉淀，只为与你相见！矿种稀缺，商机无限，首届古羽石节等你来！" +
          window.location.href.split("?")[0]; //iOS不能编码，&&，==区分链接

        var andPubUrl =
          "logo=" +
          encodeURIComponent(
            window.location.origin +
              require("../../assets/image/activity/shareLo.png")
          ) +
          "&title=88狂欢城市节" +
          "&descs=诚聊购88城市狂欢节，全场买一送一，更有特大惊喜等你来拿" +
          "&link=" +
          encodeURIComponent(window.location.href) +
          "&picShare=" +
          encodeURIComponent(window.location.origin + picShare) +
          "&copyLink=【88羽石节】亿万年沉淀，只为与你相见！矿种稀缺，商机无限，首届古羽石节等你来！" +
          encodeURIComponent(window.location.href);
        var u = navigator.userAgent,
          isAndroid,
          isIOS;
        isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1; //android终端
        isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        window.location.href = isIOS
          ? "LUKETECHCLGProject://EightCityShare?" + iosPubUrl
          : "sinceremall://EightCityShare?" + andPubUrl;
      } else {
        console.log("不是app");
        this.wechatShare = new wechatShare();
        this.wechatShare.check({
          title: "88羽石节",
          desc: `亿万年沉淀，只为与你相见！矿种稀缺，商机无限，首届古羽石节等你来！`,
          imageUrl:
            window.location.origin +
            require("../../assets/image/activity/shareLo.png"),
          link: window.location.href
        });
      }
    },
    //获取活动信息
    _getCityInfo() {
      cityInfo().then((res) => {
        console.log(res, "cityInfo");
        this.cityContent = res.data;
        this.detailsId = res.data.cityList[0].detailsId;
        this.configId = res.data.configId;
        this.activityStatus = res.data.activityStatus;
        this.getTab(0);
      });
    },
    //获取优惠券
    _getCouponList() {
      getCouponList({
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then((res) => {
        this.couponList = res.data.content;
      });
    },
    getTab(index) {
      this.detailsId = this.cityContent.cityList[index].detailsId;
      this.pageNum = 1;
      this.loading = true;
      this.finished = false;
      this.activityGoods = [];
      console.log(this.loading, "loadingloadingloading");
      this._getGoodsList(true, 1);
    },
    //获取商品信息
    _getGoodsList(init, pageNum) {
      const _pageNum = init ? pageNum : this.pageNum;
      if (!this.loading) return;
      if (this.configId && this.detailsId) {
        cityGoodsList({
          activityId: this.configId,
          venueId: this.detailsId,
          pageNum: _pageNum,
          pageSize: this.pageSize
        }).then((res) => {
          if (res && res.errorCode == 1) {
            const goods = res.data.content;
            console.log(
              this.loading,
              this.pageNum,
              res.data.content.length,
              233333333334444444444444444443,
              this.activityGoods
            );
            if (_pageNum == 1) {
              this.activityGoods = goods;
            } else {
              this.activityGoods = [...this.activityGoods, ...goods];
            }
            if (goods && goods.length < 10) {
              this.finished = true;
            }
            this.loading = false;
            if (init) {
              this.pageNum = 2;
            } else {
              this.pageNum = _pageNum + 1;
            }
          }
        });
      }
    },
    goLive() {
      window.location.href = this.cityContent.liveLink;
    },

    /**
     * @description: 优惠券领取状态枚举
     * @param {*} couponInfo 优惠券信息
     * @return {number} {*} 1： 领取成功 0: 未领取 -1: 已领完
     */
    enumReceiveRuleFn(couponInfo) {
      const {
        couponResidueAmount, // 优惠券总剩余量
        dailyLimit, // 日限制 -1为不限制
        personResidueAmount, // 个人剩余
        todayReceiveAmount // 日领取总量
      } = couponInfo;

      if (couponResidueAmount <= 0) {
        return -1;
      }

      if (dailyLimit === -1) {
        return personResidueAmount > 0 ? 0 : 1;
      } else {
        if (dailyLimit - todayReceiveAmount > 0) {
          return personResidueAmount > 0 ? 0 : 1;
        }
        return -1;
      }
    },
    getCoupons(couponId) {
      couponReceive({
        couponId: couponId
      }).then((res) => {
        if (res && res.errorCode == 1) {
          this._getCouponList();
          this.$toast("领取成功");
        }
      });
    },
    goDetail(id) {
      this.$emit("goDeatil", id);
      this.$router.push({
        path: `/detail/${id}?pageFrom=cityF&activityId=${
          this.cityContent.configId
        }&agencyUnionid=${
          this.$route.query.agencyUnionid || null
        }&fromPlatform=${this.$route.query.fromPlatform || null}`
      });
    },
    join(item) {
      console.log(item);
      if (this.iscltApp() == true) {
        var u = navigator.userAgent,
          isAndroid,
          isIOS;
        isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1; //android终端
        isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        var pageUrl =
          "activityType=" +
          "5" +
          "&activityId=" +
          this.configId +
          "&goodsId=" +
          item.goodsId;
        window.location.href = isIOS
          ? "LUKETECHCLGProject://EightCityBuy?" + pageUrl
          : "sinceremall://goods/detail/open?" + pageUrl;
        // window.location.href = 'LUKETECHCLGProject://EightCityBuy?' + pageUrl ;
      } else {
        this.goods_info.picture = item.logoImgUrl;
        this._getsGoodsSku(item.goodsId);
        this.skuShow = true;
        this.clickType = 2;
      }
    },
    _skuaddcart(v) {
      //点击加入购物车页面弹层后又出现的点击加入购物车事件
      this.goodsSkuId = v.selectedSkuComb.goodsSkuId;
      this.addcart();
    },
    _buyclicked(v) {
      if (v.selectedSkuComb.id != null) {
        this.goodsSkuId = v.selectedSkuComb.id;
      }
      this.skucate = false;
      this.onClickButton();
    },
    skuPropSelected() {},
    skuSelected(skuValue) {
      console.log(skuValue.selectedSkuComb);
      this.goodsInfo = {
        ...this.goodsInfo,
        goodsId: skuValue.selectedSkuComb.goodsId,
        shopInfo: {
          id: skuValue.selectedSkuComb.shopId
        }
      };
      if (skuValue.selectedSkuComb) {
        const initSeletedNum = skuValue.selectedSkuComb.skuMinimumOrderQuantity;

        if (this.$refs.getSkuData) {
          this.$refs.getSkuData.selectedNum = initSeletedNum;
        }

        if (this.$refs.getSkuData?.$refs?.skuStepper) {
          this.$refs.getSkuData.$refs.skuStepper.currentNum = initSeletedNum;
        }

        if (this.goodsSkuId == null || this.goodsSkuId == 0) {
          this.goodsSkuId = skuValue.selectedSkuComb.id;
        }
        let obj = this.$refs.getSkuData.getSkuData();

        if (this.goodsInfo.limitSaleFlag) {
          let s = new Date(
            this.goodsInfo.countdownStart?.replace(/-/g, "/")
          ).getTime();
          let t = this.goodsInfo.countdown * 60 * 1000;
          let m = s + t;
          let n = new Date().getTime();
          // console.log(s, t, m, n);
          if (n >= s && n <= m && this.goodsInfo.killNumber && this.killF) {
            // console.log("限时秒杀1");
            skuValue.selectedSkuComb.payMoney = this.priceNo;

            this.limitSaleFlag = true;

            this.totalMoney = this.accMul(this.priceNo, this.buyNum);
          } else {
            // console.log("正常1");
            skuValue.selectedSkuComb.payMoney = skuValue.selectedSkuComb.price;
            this.limitSaleFlag = false;
            this.totalMoney = this.accMul(
              obj.selectedSkuComb.payMoney,
              this.buyNum
            );
          }
        } else {
          skuValue.selectedSkuComb.payMoney = skuValue.selectedSkuComb
            .canVoucherMoney
            ? skuValue.selectedSkuComb.payMoney
            : skuValue.selectedSkuComb.price;
          // sku选择更新图片
          if (this.cateType == 2) {
            this.goods_info.picture = this.resData1.find(
              ({ id }) => id === skuValue.selectedSkuComb.id
            ).pic;
          }

          this.totalMoney = this.accMul(
            obj.selectedSkuComb.payMoney,
            this.buyNum
          );
          this.skuMinimumOrderQuantity =
            skuValue.selectedSkuComb.skuMinimumOrderQuantity;
        }
      }
      this.isSelectedSku = skuValue.selectedSkuComb;
    },
    //去下单
    onClickButton() {
      console.log(this.buyNum, "this.buyNum");
      let params = {
        pageFrom: "cityF",
        buyNum: this.buyNum,
        goodsSkuId:
          this.goodsInfo.cateType == 1
            ? this.sku.list[0].goodsSkuId
            : this.goodsSkuId,
        goodsId: this.goodsInfo.goodsId,
        shopId: this.goodsInfo.shopInfo.id,
        agencyUnionid: this.$route.query.agencyUnionid || null,
        buyType: 1,
        fromPlatform: this.$route.query.fromPlatform || null,
        officialSubsidyId: this.$route.query.officialSubsidyId || null,
        activityId: this.configId,
        activityType: 5
      };
      console.log(params, "----params");
      if (params.goodsSkuId == null || params.goodsSkuId == 0) {
        params.goodsSkuId = this.isSelectedSku.id;
      }
      this.$router.replace({ name: "plorder", query: params });
    },
    accMul(arg1, arg2) {
      console.log(arg1, arg2);
      var m = 0,
        s1 = arg1.toString(),
        s2 = arg2.toString();
      try {
        m += s1.split(".")[1].length;
      } catch (e) {}
      try {
        m += s2.split(".")[1].length;
      } catch (e) {}
      return (
        (Number(s1.replace(".", "")) * Number(s2.replace(".", ""))) /
        Math.pow(10, m)
      );
    },
    stepperChange(value) {
      console.log(value);
      this.buyNum = value;
      let obj = this.$refs.getSkuData.getSkuData();
      // console.log(this.$refs.getSkuData.getSkuData(), 99999);
      // this.totalMoney = obj.selectedSkuComb.payMoney * this.buyNum;
      if (this.goodsInfo.limitSaleFlag) {
        let s = new Date(
          this.goodsInfo.countdownStart?.replace(/-/g, "/")
        ).getTime();
        let t = this.goodsInfo.countdown * 60 * 1000;
        let m = s + t;
        let n = new Date().getTime();

        if (
          n >= s &&
          n <= m &&
          this.goodsInfo.limitSaleFlag &&
          this.goodsInfo.killNumber
        ) {
          this.totalMoney = this.accMul(this.goodsInfo.killPrice, this.buyNum);
        } else {
          this.totalMoney = this.accMul(
            obj.selectedSkuComb.payMoney,
            this.buyNum
          );
        }
      }
      this.totalMoney = this.accMul(obj.selectedSkuComb.payMoney, this.buyNum);
    },
    go() {
      this.$router.push({
        path: "/cityRink",
        query: {
          activityId: this.configId
        }
      });
    },
    onLoad() {
      console.log(11111111);
      this._getGoodsList();
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/style/mixin.scss";
:deep(.van-pull-refresh) {
  min-height: calc(100% - 223px);
}
:deep(.van-tabs--line .van-tabs__wrap) {
  height: auto;
  border-radius: 14.5px;
}
:deep(.van-tabs__nav--line) {
  padding: 5px 0 !important;
}
:deep(.van-tab--active) {
  padding: 0 !important;
}
:deep(.van-sku-actions .van-button--danger) {
  background-color: #000;
  .van-button {
    background-color: #000;
  }
}
.van-sku-actions .van-button:first-of-type {
  border-top-left-radius: 0.3rem;
  border-bottom-left-radius: 0.3rem;
  border-top-right-radius: 0.3rem;
  border-bottom-right-radius: 0.3rem;
}
.van-sku-actions .van-button--danger {
  background: -webkit-linear-gradient(left, #cf0000, #cf0000);
}
.van-sku-actions .van-button:last-of-type {
  border-top-left-radius: 0.3rem;
  border-bottom-left-radius: 0.3rem;
  border-top-right-radius: 0.3rem;
  border-bottom-right-radius: 0.3rem;
}
.totalBox {
  padding: 0.32rem 0.42667rem;
  display: flex;
  justify-content: space-between;
}
.activity {
  width: 100vw;
  height: 100vh;
  overflow: auto;
  background: #f2f2f2;
  .container {
    background-image: linear-gradient(to bottom, #fcedce, #ff613d);
    position: relative;
    .activityBg {
      font-size: 0;
      img {
        width: 100vw;
        height: 200px;
      }
    }
    .share img {
      width: 54px;
      height: 20px;
      position: absolute;
      top: 15px;
      right: 0px;
    }
    .rules img {
      position: absolute;
      top: 45px;
      right: 0px;
      width: 60px;
      height: 20px;
    }
    .live {
      position: absolute;
      top: 23.5vh;
      right: 0px;
      display: flex;
      background: rgba(0, 0, 0, 0.6);
      padding: 3px 10px 3px 0px;
      align-items: center;
      border-radius: 32px;
      img {
        width: 32px;
        height: 32px;
        margin-right: 9px;
      }
      .live-status {
        color: #fff;
        font-size: 11px;
        p {
          line-height: 13px;
          font-weight: 530;
        }
        & :nth-child(2) {
          font-size: 10px;
          font-weight: 350;
        }
      }
    }
    .content {
      // background-image: linear-gradient(to bottom, #fcedce, #ff613d);
      .coupon-tit {
        padding: 10px 0px;
        img {
          width: 270px;
          height: 30px;
          margin: 0px auto;
          display: block;
        }
      }
      .coupon {
        display: flex;
        overflow-x: scroll;
        .coupons-list {
          padding: 10px 22px;
          background-image: url("../../assets/image/activity/catBg.png");
          background-size: cover;
          text-align: center;
          flex-shrink: 0;
          margin-right: 5px;
          margin-left: 5px;
          position: relative;
          width: 115px;
          height: 80px;
          .coupons-pri {
            color: #fff;
            font-size: 13px;
            line-height: 13px;
            b {
              font-size: 32px;
            }
          }
          .coupons-tj {
            color: #fff;
            font-size: 13px;
            line-height: 15px;
            margin-top: 4px;
          }
          .coupons-btn {
            color: #ff002c;
            background: rgba($color: #fff, $alpha: 0.2);
            padding: 5px 11px;
            border-radius: 12px;
            font-size: 12px;
            line-height: 10px;
            margin-top: 8px;
          }
        }
        .mcImg {
          position: absolute;
          top: 0;
          left: 2.6px;
          z-index: 2;
          width: 110px;
          height: 80px;
        }
      }
      .ranking {
        margin: 8px 5px 0px 5px;
        padding: 3px;
        position: relative;
        .rankGift {
          width: 100%;
          height: 95px;
        }
        .rankGo {
          width: 54px;
          height: 54px;
          position: absolute;
          right: 10px;
          top: 20px;
        }
      }
      .activity-city {
        margin: 5px 5px 0px 5px;
        padding: 3px 5px;

        .active {
          color: red !important;
        }
        .active2 {
          background-image: linear-gradient(to right, #ff6231, #ff002c);
          color: #fff !important;
          padding: 0 6px;
          padding-top: 1px;
          border-radius: 20px;
        }
        .tab-tit {
          background: #ff002c;
          text-align: center;
          padding-top: 3px;
          padding-bottom: 3px;
        }
        video {
          width: 100%;
          margin-top: 10px;
          border-radius: 8px;
          height: 178px;
          // object-fit: cover; //视频封面样式
        }
        .goods {
          background-image: url("../../assets/image/activity/buybg.png");
          background-size: 100%;
          background-repeat: no-repeat;
          // padding: 20px;
          margin-top: 16px;
          padding: 0.533rem 0.533rem 0.333rem 0.5333rem;
          background-color: #ff4438;
          border-radius: 14.5px;
          .goods-item {
            display: flex;
            background-image: url("../../assets/image/activity/goodsBg.png");
            background-size: 100%;
            background-position: center;
            background-repeat: no-repeat;
            align-items: center;
            padding: 14px;
            margin-bottom: 10px;
            position: relative;
            border-radius: 8px;
            &:nth-child(1) {
              margin-top: 55px;
            }
            .goods-bq {
              position: absolute;
              top: -2px;
              left: 0;
              img {
                width: 55px;
                height: 18px;
              }
            }
            .goods-imag img {
              width: 84px;
              height: 80px;
              margin-right: 35px;
              // margin-left: 5px;
            }
            .goods-name {
              color: #333;
              font-size: 14px;
              line-height: 18px;
            }
            .goods-sale {
              color: #999;
              font-size: 11px;
              margin: 5px 0px;
              span {
                color: #ff8a3f;
              }
            }
            .price {
              display: flex;
              align-items: center;
              .goods-price {
                color: #ff002c;
                font-size: 13px;
                margin-right: 25px;
                font-weight: 550;
                span {
                  font-size: 18px;
                }
              }
              .join {
                position: absolute;
                margin-bottom: 2px;
                right: 14px;
                width: 90px;
                height: 32px;
              }
            }
          }
        }
      }
    }
  }
  .empty {
    height: calc(100vh - 46px);
    font-size: 16px;
    text-align: center;
    padding-top: 150px;
    background-image: linear-gradient(to bottom, #fcedce, #ff613d);
    color: #444;
  }
}
</style>
