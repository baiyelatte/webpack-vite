<template>
  <router-layout>
    <!-- <van-nav-bar
      :title="$route.meta.title"
      v-if="!$route.meta.CLAPP"
      left-arrow
      @click-left="_backlogin"
    /> -->
    <div class="plorderBox" :style="{ top: 0 }">
      <van-icon class="back" name="arrow-left" @click="_backlogin" />
      <div class="plordeTit">
        <span>{{ $route.meta.title }}</span>
      </div>
    </div>
    <!-- 默认显示地址 -->
    <div
      class="nodesdata"
      v-if="(lists && lists.length == 0) || lists == undefined"
    >
      <van-empty description="暂无数据" />
    </div>
    <template v-else>
      <van-cell center class="outloginbox" :border="false">
        <template #title>
          <div class="quuser">
            <van-image
              round
              width=".8rem"
              height=".8rem"
              fit="cover"
              :src="userdata.headPic"
            />
            <!-- <span class="custom-title" v-if="$route.query.sourceOfOrder==2"
              >{{ $route.query.nickName }} {{ $route.query.phone }}</span
            > -->
            <span class="custom-title"
              >{{ userdata.nickName }} {{ userdata.phone }}</span
            >
          </div>
        </template>
        <!-- <template #right-icon>
          <van-button plain hairline type="primary" size="small" @click="_quuser">切换帐号购买</van-button>
        </template> -->
      </van-cell>
      <div
        @click="address.showPicker = true"
        class="van-cell van-cell--center van-cell--borderless van-contact-card van-contact-card--edit"
      >
        <van-icon name="phone-o" size="30" />
        <div
          v-if="address.name && address.mobile && address.address"
          class="van-cell__value van-cell__value--alone van-contact-card__value"
        >
          <div>{{ address.name }}：{{ address.mobile }}</div>
          <div>{{ address.address }}</div>
        </div>
        <div
          v-else
          class="van-cell__value van-cell__value--alone van-contact-card__value"
        >
          <div>选择收货地址</div>
          <div></div>
        </div>
        <van-icon name="arrow" />
      </div>
      <div v-for="(item, index) in lists.orderDTOList" :key="index">
        <van-cell-group>
          <van-cell
            v-if="item.shopName && item.shopName"
            style="padding-top: 16px; height: 60px; margin-top: 10px"
          >
            <div style="float: left; width: 30px">
              <div
                :style="'width:24px;height:24px;overflow:hidden;line-height:24px;float:left'"
              >
                <img
                  alt=""
                  :src="item.shopLogoImgUrl"
                  style="
                    width: 100%;
                    display: inline-block;
                    vertical-align: middle;
                  "
                />
              </div>
            </div>
            <h5 style="width: calc(100% - 40px); float: left">
              {{ item.shopName }}
            </h5>
          </van-cell>
        </van-cell-group>
        <div v-for="(itemorder, index) in item.orderItemList" :key="index">
          <van-card
            :num="itemorder.buyNum"
            :title="itemorder.goodsName"
            :thumb="itemorder.goodsLogoImgUrl"
            style="margin-top: 0px; line-heihgt: 28px"
          >
            <template #price>
              <template
                v-if="itemorder.canVoucherMoney && voucherMoneyType == 2"
              >
                <span class="van-card__price-currency">¥</span>
                <span class="van-card__price-integer"
                  >{{ itemorder.goodsVoucherPayMoney }}
                </span>
                <span class="dyjico" v-show="itemorder.goodsVoucherMoney"
                  >{{ itemorder.goodsVoucherMoney }}
                </span>
              </template>
              <template v-else>
                <span class="van-card__price-currency">¥</span>
                <!-- <span  class="van-card__price-integer" >{{ itemorder.payMoneys }}</span> -->
                <span class="van-card__price-integer"
                  >{{ itemorder.goodsPrice }}
                </span>
              </template>
            </template>
            <template #tags>
              <van-tag plain type="danger" style="margin-top: 5px">{{
                itemorder.goodsSkuName
              }}</van-tag>
            </template>
          </van-card>
          <!-- 买家留言 -->
          <!-- <van-field
            v-model="itemorder.remark"
            rows="2"
            autosize
            maxlength="30"
            type="textarea"
            placeholder="买家留言"
          /> -->
        </div>
        <!-- 卖家留言 -->
        <div>
          <van-field
            v-model="item.remark"
            rows="2"
            autosize
            maxlength="30"
            type="textarea"
            placeholder="买家留言"
          />
        </div>
        <div role="button" tabindex="0" class="van-cell">
          <div class="van-cell__title">
            <span>运费</span>
          </div>
          <div class="van-cell__value">
            <span
              v-if="parseFloat(item.freightMoney) > 0"
              class="van-submit-bar__price van-submit-bar__price--integer"
              style="font-size: 14px"
              >{{ item.freightMoney.toFixed(2) }}</span
            >
            <span v-else> 免邮</span>
          </div>
        </div>
        <div
          role="button"
          tabindex="0"
          class="van-cell"
          v-if="item.canVoucherMoney && voucherMoneyType == 2"
        >
          <div class="van-cell__title">
            <span>抵用金</span>
          </div>
          <div class="van-cell__value">
            <!-- <span class="van-submit-bar__price van-submit-bar__price--integer" style="font-size:14px;">-{{item.voucherMoney}}</span> -->
            <span
              class="van-submit-bar__price van-submit-bar__price--integer"
              style="font-size: 14px"
              >-{{ item.voucherMoney }}</span
            >
          </div>
        </div>
        <div role="button" tabindex="0" class="van-cell">
          <div class="van-cell__title">
            <span>共{{ item.buyNum }}件商品</span>
          </div>
          <div class="van-cell__value">
            <!-- <span>合计：</span><span class="van-submit-bar__price van-submit-bar__price--integer" style="font-size:14px;">{{(item.shop_price*item.buyNum+item.freight).toFixed(2)}}</span> -->
            <template v-if="item.canVoucherMoney && voucherMoneyType == 2">
              <!-- <span>合计：</span><span class="van-submit-bar__price van-submit-bar__price--integer" style="font-size:14px;">{{(lists.orderDTOList.itemTotalMoney.toFixed(2))}}</span> -->
              <!-- <span>合计：</span><span class="van-submit-bar__price van-submit-bar__price--integer" style="font-size:14px;">{{(item.voucherPayMoney.toFixed(2))-(item.freightMoney.toFixed(2))}}</span> -->
              <span>合计：</span
              ><span
                class="van-submit-bar__price van-submit-bar__price--integer"
                style="font-size: 14px"
              >
                <!-- {{ item.voucherPayMoney.toFixed(2) }}</span -->
                {{
                  item.voucherPayMoney && item.voucherPayMoney.toFixed(2)
                }}</span
              >
            </template>
            <template v-else>
              <!-- <span>合计：</span><span class="van-submit-bar__price van-submit-bar__price--integer" style="font-size:14px;">{{$route.query.flgT?(itemorder.goodsVoucherPayMoney.toFixed(2)):itemorder.goodsVoucherPayMoney}}</span> -->
              <span>合计：</span
              ><span
                class="van-submit-bar__price van-submit-bar__price--integer"
                style="font-size: 14px"
              >
                {{ item.totalMoney.toFixed(2) }}
              </span>
              <!-- {{ dz }}111</span -->
              <!-- <span>合计：</span><span class="van-submit-bar__price van-submit-bar__price--integer" style="font-size:14px;">{{lists.sumTotalVoucherPayMoney}}</span> -->

              <!-- <span>合计：</span><span class="van-submit-bar__price van-submit-bar__price--integer" style="font-size:14px;">{{$route.query.totalMoneys}}</span> -->

              <!-- <span>合计：</span><span class="van-submit-bar__price van-submit-bar__price--integer" style="font-size:14px;">{{(item.totalMoney.toFixed(2))}}</span> -->
            </template>
          </div>
        </div>
      </div>
      <!-- 优惠券 -->
      <van-cell
        title="优惠券"
        is-link
        :value="coupon.acttit"
        @click="couponClick"
        class="couponCell"
        :border="false"
        v-if="this.$route.query.pageFrom != 'new'"
      />
      <van-cell
        title="优惠券"
        value="暂无可用优惠券"
        style="margin-top: 10px"
        :border="false"
        v-else
      />
      <van-action-sheet v-model="coupon.show" title="优惠券" class="couponBox">
        <div class="couponWrapper">
          <van-checkbox
            class="useCoupon"
            v-model="isUseCoupon"
            checked-color="#930200"
            >不使用优惠券</van-checkbox
          >
          <div class="content">
            <template v-for="coupon in couponList">
              <div :key="coupon.id">
                <div class="title">
                  {{ coupon.title }}
                </div>
                <template v-if="coupon.list.length">
                  <template v-for="data in coupon.list">
                    <div :key="data.id" @click="handleCouponClick(data)">
                      <coupon-info :data="data" :select-id="couponId" />
                    </div>
                  </template>
                </template>
                <div class="empty" v-else>暂无优惠券可用</div>
              </div>
            </template>
          </div>

          <!-- <van-radio-group v-model="coupon.action" v-if="couponList.length">
            <van-radio
              checked-color="#930200"
              :name="item"
              v-for="(item, index) in couponList"
              :key="index"
            >
              <div v-if="item.couponType == 1">
                <p v-if="item.useLimit">
                  满{{ item.useLimit }}减{{ item.couponDiscounts }}
                </p>
                <p v-else>无门槛减{{ item.couponDiscounts }}</p>
              </div>
              <div v-if="item.couponType == 2">
                <p v-if="item.useLimit">
                  满{{ item.useLimit }}享{{ item.couponDiscounts }}折
                </p>
                <p v-else>无门槛享{{ item.couponDiscounts }}折</p>
              </div>
              <div v-if="item.couponType == 3">
                <p v-if="item.useLimit">
                  满{{ item.useLimit }}减{{ item.couponDiscounts }}
                </p>
                <p v-else>无门槛减{{ item.couponDiscounts }}</p>
              </div>
              <div v-if="item.couponType == 0">
                <p>不使用优惠</p>
              </div>
            </van-radio>
          </van-radio-group>
          <p v-else class="empty">暂无优惠券可用</p> -->
        </div>
        <van-button type="info" @click="completeClick">完成</van-button>
      </van-action-sheet>
      <!-- 购买类型 -->
      <van-cell
        v-if="lists.canVoucherMoney"
        title="购买类型"
        is-link
        :value="purchaseType.acttit"
        @click="_purchaseType"
        style="margin-top: 10px"
        :border="false"
      />
      <van-action-sheet
        v-model="purchaseType.show"
        :actions="purchaseType.actions"
        :disabled="flag"
        @select="purchaseonSelect"
        cancel-text="取消"
        description="请选择购买类型"
        close-on-click-action
      />
      <!-- 默认显示地址 -->
      <div v-if="lists.orderDTOList.length">
        <div style="height: 60px"></div>
        <van-submit-bar
          :loading="loading"
          text-align="left"
          button-text="提交订单"
          @submit="onSubmit"
          safe-area-inset-bottom
        >
          <template #default>
            <template v-if="voucherMoneyType == 1 || voucherMoneyType == null">
              <div class="van-submit-bar__text" style="text-align: left">
                <!-- <span>实付款：</span><span class="van-submit-bar__price">¥<span class="van-submit-bar__price van-submit-bar__price--integer">{{price}}</span></span> -->
                <span>实付款：</span
                ><span class="van-submit-bar__price"
                  >¥
                  <span
                    class="van-submit-bar__price van-submit-bar__price--integer"
                    v-if="!coupon.action"
                    >{{ lists.sumTotalMoney }}</span
                  >
                  <span
                    class="van-submit-bar__price van-submit-bar__price--integer"
                    v-else-if="coupon.action && coupon.action.couponType == 2"
                    >{{
                      accSub(
                        lists.sumTotalMoney,
                        coupon.action.actualCouponMoney
                      )
                      /* lists.sumTotalMoney *
                        divide(coupon.action.couponDiscounts, 10, 2) >
                      coupon.action.couponMax
                        ? accSub(lists.sumTotalMoney, coupon.action.couponMax)
                        : lists.sumTotalMoney *
                          divide(coupon.action.couponDiscounts, 10, 2) */
                    }}</span
                  >
                  <span
                    class="van-submit-bar__price van-submit-bar__price--integer"
                    v-else
                    >{{
                      accSub(lists.sumTotalMoney, coupon.action.couponDiscounts)
                    }}</span
                  >
                </span>
              </div>
            </template>
            <template v-if="voucherMoneyType == 2">
              <div class="van-submit-bar__text" style="text-align: left">
                <!-- <span>实付款：</span><span class="van-submit-bar__price">¥<span class="van-submit-bar__price van-submit-bar__price--integer">{{lists.sumTotalVoucherPayMoney}}</span></span> -->
                <span>实付款：</span>
                <span class="van-submit-bar__price"
                  >¥
                  <span
                    class="van-submit-bar__price van-submit-bar__price--integer"
                    v-if="!coupon.action"
                    >{{ lists.sumTotalVoucherPayMoney }}</span
                  >
                  <span
                    class="van-submit-bar__price van-submit-bar__price--integer"
                    v-else-if="coupon.action && coupon.action.couponType == 2"
                    >{{
                      accSub(
                        lists.sumTotalVoucherPayMoney,
                        coupon.action.actualCouponMoney
                      ) /*
                      lists.sumTotalVoucherPayMoney *
                        divide(coupon.action.couponDiscounts, 10, 2) >
                      coupon.action.couponMax
                        ? accSub(
                            lists.sumTotalVoucherPayMoney,
                            coupon.action.couponMax
                          )
                        : lists.sumTotalVoucherPayMoney *
                          divide(coupon.action.couponDiscounts, 10, 2) */
                    }}</span
                  >
                  <span
                    class="van-submit-bar__price van-submit-bar__price--integer"
                    v-else
                    >{{
                      accSub(
                        lists.sumTotalVoucherPayMoney,
                        coupon.action.couponDiscounts
                      )
                    }}</span
                  >
                </span>
              </div>
            </template>
          </template>
        </van-submit-bar>
      </div>
      <!--收货地址-->
      <van-popup
        v-model="address.showPicker"
        position="bottom"
        :style="'height:' + winheight + 'px'"
      >
        <van-nav-bar
          title="选择地址"
          left-arrow
          :style="
            'padding-top:' + headerAttr.statusbar + 'px;box-sizing:border-box'
          "
          @click-left="address.showPicker = false"
        />
        <addresss @select="select" />
      </van-popup>
      <!--收货地址-->
      <!--收银台-->
      <van-popup
        class="cashier"
        v-model="cashier.showCashier"
        position="bottom"
        :close-on-click-overlay="false"
        style="border-top-left-radius: 16px; border-top-right-radius: 16px"
      >
        <van-icon name="cross" class="cross" @click="cashierClose" />
        <div class="van-action-sheet__header">
          <p><span>￥</span>{{ payMoney }}</p>
        </div>
        <Cashier1
          ref="Cashier1"
          @passwordOpen="passwordOpen"
          @cancel="cashierClose"
          :orderdata="cashier.orderdata"
          :isSetPayPwd="userdata.isSetPayPwd"
          :payResultMoney="payResultMoney"
        />
      </van-popup>
      <!-- 支付密码 -->
      <van-popup
        class="passwordBox"
        v-model="passwordFlag"
        position="bottom"
        :close-on-click-overlay="false"
        style="border-top-left-radius: 16px; border-top-right-radius: 16px"
      >
        <van-icon name="cross" class="cross" @click="passwordClose" />
        <div class="van-action-sheet__header">
          <p>请输入支付密码</p>
        </div>
        <widthdrawpassword
          ref="widthdrawpassword"
          @passwordSucceed="passwordSucceed"
        ></widthdrawpassword>
      </van-popup>
    </template>
  </router-layout>
</template>
<script>
import {
  submitTrade,
  shoppingCart,
  buyList,
  logout,
  createPay,
  getsOrderSimple,
  getUserAccountMoney,
  getsUserAddress,
  getUserInfo,
  couponHoldList,
  couponCancel
} from "api";
import { dropout, divide } from "@/utils/dom";
import addresss from "@/components/address/address";
import Cashier1 from "@/components/goods/Cashier1";
import widthdrawpassword from "@/components/widthdrawpassword";
import { Dialog } from "vant";
// import { isWeixin, getStorage } from '@/utils/dom'

import CouponInfo from "@/components/goods/CouponInfo";
import { tabBarConfig } from "@/config";

export default {
  name: "plorder",
  props: {
    winwidth: {
      default: document.documentElement.clientWidth
    },
    winheight: {
      default: document.documentElement.clientHeight
    }
  },

  data() {
    return {
      isUseCoupon: false,
      headerAttr: LukeappApi.getattribute(),
      flgT: null,
      price: 0, // 商品总价
      lists: [],
      loading: false,
      userdata: JSON.parse(localStorage.getItem("userinfo")),
      couponList: [],
      voucherMoneyType: null, // 默认抵用金购买
      purchaseType: {
        // 购买类型
        show: false,
        acttit: "抵用金购买",
        actions: [
          { name: "金额购买", type: 1 },
          { name: "抵用金购买", type: 2, disabled: false }
        ]
      },
      // 优惠卷
      coupon: {
        show: false,
        acttit: "",
        action: {}
      },
      couponId: null,
      cashier: {
        orderdata: {
          PayBillType: 1,
          tradeSn: ""
        },
        showCashier: false
      },
      address: {
        id: "", // 收货地址id
        showPicker: false,
        address: "",
        mobile: "",
        name: ""
      },
      userAddress: null,
      availableVoucherMoney: 0,
      availableVoucherMoney1: 0,
      flag: false,
      userinfo: "",
      remark: "",
      payMoney: "",
      passwordFlag: false,
      allowUseForSplitTrade: false
    };
  },
  components: {
    addresss,
    Cashier1,
    widthdrawpassword,
    CouponInfo
  },
  mounted() {
    // let self=this;
    // if (self.lists != undefined) {
    //   for(var i=0; i < self.lists.orderDTOList.length;i++){
    //       self.price+=self.lists.orderDTOList[i].totalMoney;
    //   }
    //   self.price=self.price*100
    // }
  },
  created() {
    this._getsUserAddress();
    let { buyType, phone, nickName, sourceOfOrder } = this.$route.query;
    this._getUserAccountMoney();
    if (buyType == 1) {
      this._shoppingCart();
      return;
    } else if (buyType == 2) {
      this._buyList();
      return;
    } else if (buyType == 3) {
      this._shoppingCart();
      return;
    }
    getUserInfo({ activityType: 8 }).then((res) => {
      if (res && res.errorCode == 1) {
        this.userdata = res.data;
      }
    });
  },
  methods: {
    divide: divide,
    handleCouponClick(couponData) {
      this.coupon.action = couponData;
      this.isUseCoupon = false;
    },
    cancel() {
      this.passwordFlag = false;
      this.cashier.showCashier = true;
    },
    passwordSucceed() {
      this.$refs.Cashier1.triggerPay(3);
    },
    passwordClose() {
      this.cashier.showCashier = true;
      this.passwordFlag = false;
    },
    passwordOpen() {
      this.cashier.showCashier = false;
      this.passwordFlag = true;
    },
    cashierClose() {
      let confirmButtonText = null;

      if (this.coupon.action.id && !this.allowUseForSplitTrade) {
        confirmButtonText = "取消支付不能使用优惠券";
      } else {
        confirmButtonText = "确认取消支付";
      }
      Dialog.confirm({
        confirmButtonText: "继续支付",
        cancelButtonText: "确认",
        message: confirmButtonText
      })
        .then(() => {})
        .catch(() => {
          if (this.coupon.action.id) {
            couponCancel({
              orderSn: this.cashier.orderdata.tradeSn,
              payBillType: 1
            }).then((res) => {
              if (res.errorCode == 1) {
                this.cashier.showCashier = false;
                this.$router.push({ name: "order", query: { type: "2" } });
              }
            });
          } else {
            this.cashier.showCashier = false;
            this.$router.push({ name: "order", query: { type: "2" } });
          }
        });
    },
    completeClick() {
      this.coupon.show = false;
    },
    initCouponData({ platformType, shopType }) {
      const initial = [
        {
          title: "店铺优惠券",
          list: shopType || []
        },
        {
          title: "平台优惠券",
          list: platformType || []
        }
      ];

      // content.forEach((coupon) => {
      //   const { applyType, id } = coupon;
      //   initial[applyType === 3 ? 1 : 0].list.push(coupon);
      //   if (this.couponId == id) {
      //     this.coupon.action = coupon;
      //   }
      // });

      this.couponList = initial;
    },
    initSelectCoupon() {
      this.couponList.some(({ list }) => {
        return list.some((coupon) => {
          const { id } = coupon;
          if (this.couponId == id) {
            this.coupon.action = coupon;
            return true;
          }
        });
      });
    },
    couponClick() {
      this.coupon.acttit = "";
      this.coupon.action = {};
      let obj = {
        couponStatus: 0
      };
      if (this.voucherMoneyType == 1 || this.voucherMoneyType == null) {
        obj.useLimit = this.lists.sumTotalMoney;
      } else if (this.voucherMoneyType == 2) {
        obj.useLimit = this.lists.sumTotalVoucherPayMoney;
      }
      // couponHoldList(obj).then((res) => {
      //   if (res.errorCode == 1) {
      //     const { content } = res.data;
      //     this.initCouponData(content);
      //   }
      // });
      this.initSelectCoupon();
      this.coupon.show = true;
    },
    _getsUserAddress() {
      getsUserAddress().then((res) => {
        // toats.clear()
        if (res && res.errorCode == 1) {
          const data = res.data.content;

          let choseDefault = [];
          if (data.length === 1) {
            choseDefault = data[0];
          } else if (data.length > 1) {
            // choseDefault = data.filter((address) => address.isDefault)[0];
            choseDefault = data.filter((address) => address.canDefault)[0];
          }

          (this.address.address =
            choseDefault.consigneeProvince +
            choseDefault.consigneeCity +
            choseDefault.consigneeCounty +
            choseDefault.consigneeAddress),
            (this.address.id = choseDefault.id);
          this.address.mobile = choseDefault.consigneeMobile;
          this.address.name = choseDefault.consigneeName;
          this.address.showPicker = false;
          this.userAddress = choseDefault;
        }
      });
    },
    // _shoppingCart () {
    //   shoppingCart(params).then((res) => {
    //     if(res && res.errorCode == 1){
    //       let pardata = res.data
    //       pardata['buyType']= 1
    //     }
    //   })
    // },
    _purchaseType() {
      this.purchaseType.show = true;
    },
    purchaseonSelect(item) {
      this.purchaseType.show = false;
      this.purchaseType.acttit = item.name;
      this.voucherMoneyType = item.type;
    },
    _quuser() {
      logout().then((res) => {
        if (res && res.errorCode == 1) {
          dropout();
          this.$router.push({
            name: "login",
            query: { outlogin: "loginswitch" }
          });
        }
      });
    },
    // 浮点型减法
    accSub(arg1, arg2) {
      if (isNaN(arg1)) {
        arg1 = 0;
      }
      if (isNaN(arg2)) {
        arg2 = 0;
      }
      arg1 = Number(arg1);
      arg2 = Number(arg2);

      var r1, r2, m, n;
      try {
        r1 = arg1.toString().split(".")[1].length;
      } catch (e) {
        r1 = 0;
      }
      try {
        r2 = arg2.toString().split(".")[1].length;
      } catch (e) {
        r2 = 0;
      }
      m = Math.pow(10, Math.max(r1, r2)); //last modify by deeka //动态控制精度长度
      n = r1 >= r2 ? r1 : r2;
      let num = ((arg1 * m - arg2 * m) / m).toFixed(n);
      return num < 0 ? 0 : num;
    },
    _shoppingCart() {
      let {
        buyNum,
        goodsSkuId,
        goodsId,
        shopId,
        agencyUnionid,
        fromPlatform,
        buyType,
        anchorId,
        carrierId,
        sourceOfOrder,
        officialSubsidyId,
        activityId
      } = this.$route.query;
      let params = {
        buyNum: buyNum,
        goodsSkuId: goodsSkuId,
        goodsId: goodsId,
        shopId: shopId,
        agencyUnionid: agencyUnionid || null,
        fromPlatform: fromPlatform || null,
        buyType: buyType,
        anchorId: anchorId ? anchorId : "",
        carrierId: carrierId ? carrierId : "",
        sourceOfOrder: sourceOfOrder ? sourceOfOrder : 1,
        officialSubsidyId: officialSubsidyId,
        activityId: activityId,
        activityType:
          this.$route.query.pageFrom == "new"
            ? "8"
            : this.$route.query.pageFrom == "cityF"
            ? "5"
            : ""
      };
      // console.log(params);
      shoppingCart(params).then((res) => {
        if (res && res.errorCode == 1) {
          let { defaultUserAddress } = res.data;
          // console.log(res.data);
          if (defaultUserAddress) {
            this.userAddress = defaultUserAddress;
            this.address = {
              id: defaultUserAddress ? defaultUserAddress.id : null, // 收货地址id
              showPicker: false,
              address: defaultUserAddress
                ? defaultUserAddress.consigneeProvince +
                  defaultUserAddress.consigneeCity +
                  defaultUserAddress.consigneeCounty +
                  defaultUserAddress.consigneeAddress
                : null,
              mobile: defaultUserAddress
                ? defaultUserAddress.consigneeMobile
                : null,
              name: defaultUserAddress ? defaultUserAddress.consigneeName : null
            };
          }
          this.lists = res.data;
          let self = this;
          for (var i = 0; i < self.lists.orderDTOList.length; i++) {
            //  self.price+=self.lists.orderDTOList[i].totalMoney;
            self.price += self.lists.orderDTOList[i].goodsMoney;
          }
          if (self.lists.canVoucherMoney) {
            // self.price = self.lists.sumTotalVoucherPayMoney*100
            self.voucherMoneyType = 2;
          }
          this.get();
          this.voucherMoneyTypeChange(this.voucherMoneyType);
        }
      });
    },
    _buyList() {
      buyList({
        buyGoodsInfoList: JSON.parse(
          decodeURIComponent(this.$route.query.selectgoods)
        )
      }).then((res) => {
        if (res && res.errorCode == 1) {
          let { defaultUserAddress, moneyPayCouponMap } = res.data;
          if (defaultUserAddress) {
            this.userAddress = defaultUserAddress;
            this.address = {
              id: defaultUserAddress ? defaultUserAddress.id : null, // 收货地址id
              showPicker: false,
              address: defaultUserAddress
                ? defaultUserAddress.consigneeProvince +
                  defaultUserAddress.consigneeCity +
                  defaultUserAddress.consigneeCounty +
                  defaultUserAddress.consigneeAddress
                : null,
              mobile: defaultUserAddress
                ? defaultUserAddress.consigneeMobile
                : null,
              name: defaultUserAddress ? defaultUserAddress.consigneeName : null
            };
          }
          this.lists = res.data;
          // this.dz = _accSub(res.data.voucherPayMoney, res.data.freightMoney);
          let self = this;
          for (var i = 0; i < self.lists.orderDTOList.length; i++) {
            //  self.price+=self.lists.orderDTOList[i].totalMoney;
            self.price += self.lists.orderDTOList[i].goodsMoney;
          }
          if (self.lists.canVoucherMoney) {
            // self.price = self.lists.sumTotalVoucherPayMoney*100
            self.voucherMoneyType = 2;
          }
          this.get();
          this.voucherMoneyTypeChange(this.voucherMoneyType);
        }
      });
    },
    select(item, addressdata) {
      let self = this;
      self.address.showPicker = false;
      self.address.address = item.address;
      self.address.id = item.id;
      self.address.mobile = item.tel;
      self.address.name = item.name;
      self.userAddress = addressdata;
    },
    _backlogin() {
      history.back();
      const isClose =
        LukeappApi.IscltApp ||
        tabBarConfig.some(
          ({ path: rootPath }) => rootPath === this.$route.path
        );
      setTimeout(() => {
        if (isClose) LukeappApi.clt_close_browser();
      }, 50);
    },
    _createPay(parm) {
      let self = this;
      createPay(parm).then((res) => {
        if (res && res.errorCode == 1) {
          self.$router.replace({ name: "paysuccess", query: { payType: 3 } });
        }
      });
    },

    onSubmit() {
      // console.log(11111, this.$route.query.activityId);
      let self = this;
      // return;
      // if (self.order_id) {
      //   self.cashier.showCashier = true;
      // } else {
      if (!this.address.id) {
        // self.$toast({ message: '请添加收货地址' });
        self.$toast({ type: "danger", message: "请添加收货地址" });
        return;
      }
      let shoplist = [];
      let s = [];
      self.lists.orderDTOList.forEach((item) => {
        s.push({
          remark: item.remark,
          shopId: item.shopId
        });
        item.orderItemList.forEach((items) => {
          shoplist.push({
            buyNum: items.buyNum,
            goodsSkuId: items.goodsSkuId,
            goodsId: items.goodsId,
            // remark: items.remark,
            agencyUnionid: items.agencyUnionid,
            officialSubsidyId: this.$route.query.officialSubsidyId,
            activityType:
              this.$route.query.pageFrom == "new"
                ? "8"
                : this.$route.query.pageFrom == "cityF"
                ? "5"
                : "",
            activityId: this.$route.query.activityId
          });
        });
        shoplist[0]["shopId"] = item.shopId;
      });
      let tradedata = {
        userAddress: self.userAddress,
        buyGoodsInfoList: shoplist,
        buyType: self.$route.query.buyType,
        voucherMoneyType: self.voucherMoneyType,
        remarkList: s,
        sourceOfOrder: this.$route.query.sourceOfOrder
          ? this.$route.query.sourceOfOrder
          : 1
      };
      tradedata.activityId = this.$route.query.activityId;

      if (this.$route.query.officialSubsidyId) {
        tradedata.officialSubsidyOrder = true;
      }

      if (this.$route.query.carrierId) {
        tradedata.carrierId = this.$route.query.carrierId;
      }
      if (this.$route.query.anchorId) {
        tradedata.anchorId = this.$route.query.anchorId;
      }
      if (this.coupon.action.couponType) {
        tradedata.useCoupon = true;
        tradedata.couponHistoryId = this.coupon.action.id;
      } else {
        tradedata.useCoupon = false;
      }
      self.loading = true;
      submitTrade(tradedata)
        .then(async (res) => {
          self.loading = false;
          if (res && res.errorCode === 1) {
            // this.$toast({ type: 'danger', message: '订单提交成功' })
            // if(res.data.voucherMoneyType == 2 && res.data.voucherPayMoney){
            //   self.cashier.showCashier = true
            //   self.cashier.orderdata = {
            //     PayBillType: 1, // 交易单 2 订单(我的订单类型)
            //     ...res.data
            //   }
            // } else if(res.data.voucherMoneyType == 2 && res.data.voucherPayMoney == null) {
            //   let parm = {
            //     payType: 5,
            //     PayBillType: 1,
            //     sn: res.data.tradeSn
            //   }
            //   self._createPay (parm)
            // } else {
            //   self.cashier.showCashier = true
            //   self.cashier.orderdata = {
            //     PayBillType: 1, // 交易单 2 订单(我的订单类型)
            //     ...res.data
            //   }
            // }
            // await getsOrderSimple({ pageNum: 1, pageSize: 20 }).then(
            //   (result) => {
            //     if (result && result.errorCode === 1) {
            //       self.$router.push({ name: "order", query: { type: "2" } });
            //     }
            //   }
            // );
            this.payMoney = res.data.payMoney;
            this.cashier.showCashier = true;
            this.cashier.orderdata.tradeSn = res.data.tradeSn;
            this.allowUseForSplitTrade = res.data.allowUseForSplitTrade;

            // console.log(this.cashier.orderdata.tradeSn, 1);
          }
        })
        .catch((err) => {
          // self.$toast(JSON.stringify(err))
          setTimeout(() => {
            self.loading = false;
          }, 500);
        });
      // }
    },
    _getUserAccountMoney() {
      getUserAccountMoney().then((res) => {
        if (res && res.errorCode == 1) {
          this.availableVoucherMoney = res.data.availableVoucherMoney;
        }
      });
    },
    get() {
      for (let i = 0; i < this.lists.orderDTOList.length; i++) {
        this.availableVoucherMoney1 += this.lists.orderDTOList[i].voucherMoney;
      }
      if (this.availableVoucherMoney < this.availableVoucherMoney1) {
        this.purchaseType.acttit = "金额购买";
        this.flag = true;
        this.purchaseType.actions[1].disabled = true;
        this.purchaseType.actions[1].name = "抵用金购买(余额不足)";
        this.voucherMoneyType = 1;
      }
    },
    voucherMoneyTypeChange(val) {
      const { voucherPayCouponMap, moneyPayCouponMap } = this.lists;

      this.initCouponData(
        (val === 2 ? voucherPayCouponMap : moneyPayCouponMap) || {}
      );
    }
  },
  computed: {
    couponAction() {
      return this.coupon.action;
    },
    selectgoods() {
      return JSON.parse(
        decodeURIComponent(this.$route.query.selectgoods) || "[]"
      );
    },
    // 是否为多个店铺下单的商品
    isMultiShop() {
      const set = new Set();
      this.selectgoods.forEach(({ shopId }) => set.add(shopId));
      return set.size > 1;
    },
    payResultMoney() {
      if (!this.coupon.action) {
        return this.lists.sumTotalMoney;
      }
      if (this.coupon.action && this.coupon.action.couponType == 2) {
        return this.accSub(
          this.lists.sumTotalVoucherPayMoney,
          this.coupon.action.actualCouponMoney
        );
      }

      return this.accSub(
        this.lists.sumTotalVoucherPayMoney,
        this.coupon.action.couponDiscounts
      );
    }
  },
  activated() {
    getUserInfo({ activityType: 8 }).then((res) => {
      if (res && res.errorCode == 1) {
        localStorage.setItem("userinfo", JSON.stringify(res.data));
        this.userdata = res.data;
      }
    });
  },
  watch: {
    couponAction(newVal, oldVal) {
      if (newVal.couponType) {
        this.couponId = newVal.id;
        if (newVal.couponType == 2) {
          this.coupon.acttit = newVal.couponDiscounts + "折";
        } else {
          this.coupon.acttit = "-￥" + newVal.couponDiscounts;
        }
      } else if (newVal.couponType == 0) {
        this.coupon.acttit = "";
        this.couponId = newVal.id;
      }
    },
    isUseCoupon(newVal) {
      if (newVal) this.coupon.action = { couponType: 0 };
    },
    passwordFlag(newVal) {
      if (!newVal) {
        this.$refs.widthdrawpassword.value = "";
      }
    },
    "purchaseType.acttit"() {
      this.coupon.acttit = "";
      this.coupon.action = {};
    },
    voucherMoneyType: "voucherMoneyTypeChange"
  },
  beforeRouteEnter: (to, from, next) => {
    next((vm) => {
      if (
        from.name &&
        from.name != "verification" &&
        from.name != "Changepassword" &&
        from.name != "cityFestival"
      ) {
        Object.assign(vm.$data, vm.$options.data());
        vm._getsUserAddress();
        let { buyType, phone, nickName, sourceOfOrder } = vm.$route.query;
        vm._getUserAccountMoney();
        if (buyType == 1) {
          vm._shoppingCart();
        } else if (buyType == 2) {
          vm._buyList();
        } else if (buyType == 3) {
          vm._shoppingCart();
        }
        getUserInfo({ activityType: 8 }).then((res) => {
          if (res && res.errorCode == 1) {
            vm.userdata = res.data;
          }
        });
      }
    });
  }
};
</script>
<style lang="scss" scoped>
.passwordBox {
  // height: 60vh;
  height: 380px;
}
.cross {
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 20px;
}
.cashier {
  .van-action-sheet__header {
    padding-top: 30px;
    color: #212121;
    p {
      font-size: 24px;
      span {
        font-size: 12px;
      }
    }
  }
}
.plorderBox {
  width: 100%;
  box-sizing: border-box;
  position: sticky;
  z-index: 98;
  padding: 5px 10px;
  height: 40px;
  display: flex;
  font-size: 15px;
  align-items: center;
  top: 0;
  left: 0;
  background-color: #fff;
  .back {
    color: #989898;
    font-size: 20px;
  }
  .plordeTit {
    margin: 0 auto;
  }
}
.couponBox {
  height: 50vh;
  .empty {
    margin: 15px 0;
    font-size: 13px;
    color: #aaa;
  }
  .couponWrapper {
    position: absolute;
    width: 100%;
    height: calc(100% - 100px);
    overflow-y: auto;
    padding: 12px;
    // -webkit-overflow-scrolling:touch;
    font-size: 15px;
    .useCoupon {
      font-size: 13px;
      color: #666;
      margin-bottom: 3px;
    }
    .content {
      .title {
        margin: 15px 0;
        font-size: 16px;
      }
    }
  }
  .van-radio__icon--checked .van-icon {
    background-color: #930200;
  }
  .van-button {
    display: block;
    height: 30px;
    width: 80%;
    background-color: #930200;
    border: none;
    border-radius: 10px;
    position: absolute;
    bottom: 0;
    margin: 10px 0;
    left: 10%;
  }
  .van-action-sheet__header {
    height: 45px;
    line-height: 45px;
  }
}

.outloginbox {
  margin-bottom: 10px;
  .quuser {
    display: flex;
    align-items: center;
    .van-image {
      margin-right: 10px;
    }
  }
  .van-button--primary {
    border-color: #f15a01;
    color: #f15a01;
  }
}
.couponCell {
  :deep(.van-cell__value span) {
    color: #f15a01;
  }
}
</style>
<style>
.van-toast {
  width: 100px;
}
</style>
