<template>
  <div
    class="main-home cartwrap"
    :style="{
      bottom:
        $route.query.displayType == 'detail' || !shoppinglist.length
          ? 0
          : '1.33333rem'
    }"
  >
    <CommonHeader
      :backgroundColor="'#f7f8fa'"
      :titleColor="'black'"
      :leftColor="'black'"
    />
    <div ref="beatHome">
      <div
        class="headers"
        style="height: 55px; overflow: visible"
        v-if="shoppinglist && shoppinglist.length > 0"
      >
        <van-nav-bar
          class="headers-con"
          style="height: 55px; overflow: visible"
        >
          <template #left>
            <span style="font-size: 20px">{{
              $router.history.current.meta.title
            }}</span>
          </template>
          <template #right>
            <span v-if="edit == true" @click="edit = false">完成</span>
            <span v-else @click="edit = true">管理</span>
          </template>
        </van-nav-bar>
      </div>
      <div class="scrollBox">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          :immediate-check="false"
          @load="onLoad"
        >
          <div
            class="nodesdata"
            v-if="
              (shoppinglist && shoppinglist.length == 0) || shoppinglist == null
            "
          >
            <!-- <van-empty description="暂无数据" /> -->
            <div>
              <img src="@/assets/image/shopNull.png" alt="" />
              <p>您的购物车是空的</p>
              <p>去逛逛，买点什么犒赏自己吧</p>
              <button @click="$router.push('/index')">去逛逛</button>
            </div>
          </div>
          <div class="cartcont">
            <van-checkbox-group v-model="select" class="cartbox">
              <div
                class="caritem"
                style="background: #fff"
                v-for="(item, index) in shoppinglist"
                :key="index"
              >
                <van-cell>
                  <van-checkbox
                    :name="item"
                    style="float: left; margin-top: 2px"
                    @click="changeshop(item.shopId)"
                  ></van-checkbox>
                  <div class="van-cell__title" style="margin-left: 34px">
                    <div
                      :style="'width:24px;height:24px;overflow:hidden;line-height:24px;float:left'"
                    >
                      <img
                        alt
                        v-if="item.shopName && item.shopIogoImgUrl"
                        :src="item.shopIogoImgUrl"
                        style="
                          width: 100%;
                          display: inline-block;
                          vertical-align: middle;
                        "
                      />
                    </div>
                    <span v-if="item.shopName" style="margin-left: 10px">{{
                      item.shopName
                    }}</span>
                    <span v-else style="margin-left: 10px">官网自营店</span>
                  </div>
                </van-cell>

                <van-checkbox-group v-model="selectgoods">
                  <div
                    style="
                      width: 100%;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                    "
                    v-for="(item1, index1) in item.orderItemList"
                    :key="index1"
                  >
                    <div style="width: 36px">
                      <van-checkbox
                        :name="item1"
                        @click="changegoods(item1, item.shopId)"
                        @click.stop
                        style="float: right; margin-top: 2px"
                      ></van-checkbox>
                    </div>
                    <!-- :num="item1.buyNum"  -->
                    <div class="cardboxs" style="width: calc(100% - 36px)">
                      <van-card style="margin-top: 10px">
                        <template #title>
                          <div
                            class="van-card__title van-multi-ellipsis--l2"
                            @click.stop="
                              opendrouter('/detail/', {
                                goodsId: item1.goodsId
                              })
                            "
                          >
                            {{ item1.goodsName }}
                          </div>
                          <div class="goodsSkuName">
                            {{ item1.goodsSkuName }}
                          </div>
                          <div
                            v-if="item1.personalityTags"
                            class="personalityTags"
                          >
                            <div
                              v-for="(
                                personalityTags, index
                              ) in personalityTagsArrFun(item1.personalityTags)"
                              :key="index"
                            >
                              <p>{{ personalityTags }}</p>
                            </div>
                          </div>
                        </template>
                        <template #thumb>
                          <div
                            class="van-image"
                            style="width: 100%; height: 100%"
                            @click.stop="
                              opendrouter('/detail/', {
                                goodsId: item1.goodsId
                              })
                            "
                          >
                            <img
                              :src="item1.goodsLogoImgUrl"
                              class="van-image__img"
                              style="object-fit: cover"
                              alt
                            />
                            <img
                              class="titleCardImage"
                              v-if="item1.titleCardImage"
                              :src="item1.titleCardImage"
                              alt=""
                            />
                          </div>
                        </template>
                        <template
                          #price
                          @click.stop="
                            opendrouter('/detail/', { goodsId: item1.goodsId })
                          "
                        >
                          <template v-if="item.canVoucherMoney">
                            <span class="van-card__price-currency">¥</span>
                            <!-- <span class="van-card__price-integer">{{ item1.goodsVoucherPayMoney}}</span><span class="dyjico" v-show=" item1.canVoucherMoney && item1.goodsVoucherMoney">{{item1.goodsVoucherMoney}}</span> -->
                            <span class="van-card__price-integer">{{
                              item1.goodsVoucherPayMoney
                            }}</span>
                            <span
                              class="dyjico"
                              v-show="
                                item1.canVoucherMoney && item1.goodsVoucherMoney
                              "
                              >{{ item1.goodsVoucherMoney }}</span
                            >
                          </template>
                          <template v-else>
                            <span class="van-card__price-currency">¥</span>
                            <!-- <span class="van-card__price-integer">{{ item1.goodsPrice}}</span> -->
                            <span class="van-card__price-integer">{{
                              item1.goodsPrice
                            }}</span>
                          </template>
                        </template>
                        <template #footer>
                          <!-- <van-stepper  button-size="24px" :long-press="false"  @change="clinum($event, item, item1)" v-model="item1.buyNum" /> -->
                          <van-stepper
                            button-size="30px"
                            :long-press="false"
                            @plus="plus(index, index1, item1)"
                            @minus="minus(index, index1, item1)"
                            @focus="focus(index, index1, item1.buyNum)"
                            v-model="item1.buyNum"
                          />
                        </template>
                      </van-card>
                    </div>
                  </div>
                </van-checkbox-group>
              </div>
            </van-checkbox-group>
            <div style="height: 10px"></div>
          </div>
          <!-- 为您推荐 -->
          <div class="preferential">
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
      </div>
    </div>
    <!-- 结算 -->
    <div
      class="cartfooter"
      style="position: fixed; bottom: 50px; width: 100%"
      v-if="shoppinglist && shoppinglist.length > 0"
    >
      <div v-if="edit == true" style="background: #fff">
        <div class="van-submit-bar__bar">
          <van-checkbox v-model="allchecked" @click="change">全选</van-checkbox>
          <div class="van-submit-bar__text">
            <van-button
              round
              plain
              style="width: 100px; opacity: 0"
              size="small"
              >移入收藏夹</van-button
            >
          </div>
          <van-button
            round
            type="danger"
            @click="shoppingdel()"
            plain
            style="width: 100px"
            size="small"
            >删除</van-button
          >
        </div>
      </div>

      <div v-else>
        <van-submit-bar
          v-if="selectgoods.length > 0"
          @submit="plorder()"
          :price="ammoney"
          :suffix-label="voucherMoney"
          :button-text="'结算(' + selectgoods.length + ')'"
          style="position: static"
        >
          <van-checkbox v-model="allchecked" @click="change">全选</van-checkbox>
        </van-submit-bar>
        <van-submit-bar
          v-else
          disabled
          :price="ammoney * buyNum"
          :button-text="'结算'"
          style="position: static"
        >
          <van-checkbox v-model="allchecked" @click="change">全选</van-checkbox>
        </van-submit-bar>
      </div>
    </div>
    <van-dialog
      v-model="show"
      show-cancel-button
      @confirm="confirm"
      class="dialog-box"
    >
      <p class="dialog-text">请输入要购买的数量</p>
      <van-field v-model="num" type="digit" />
    </van-dialog>
  </div>
</template>
<script>
// shoppingCart
import {
  shoppingCartBuy,
  getShoppingCart,
  shoppingremove,
  countMoney,
  getrecommend
} from "api";
// import { shoppingCartBuy, getShoppingCart, shoppingremove } from 'api'
import { mapGetters, mapActions } from "vuex";
import Vue from "vue";
import { Dialog } from "vant";
import GoodItem from "@/components/goods/goodItem";
import CommonHeader from "@/components/CommonHeader.vue";
export default {
  name: "cart",
  components: {
    GoodItem,
    CommonHeader
  },
  data() {
    return {
      checked: false,
      edit: false,
      allchecked: false,
      ammoney: 0, // 购物车已选订单金额
      voucherMoney: "0", // 抵用金
      select: [],
      selectgoods: [],
      shoppinglist: [],
      shoporderdata: [],
      buyNum: 0,
      deltoast: true,
      re: true,
      shoppinglistCopy: [],
      show: false,
      num: 0,
      index: 0,
      index1: 0,
      inp: null,
      goodslist: [],
      finished: false,
      pageNum: 1,
      pageSize: 10,
      loading: false,
      finishedText: "",
      goodsList1: [],
      goodsList2: [],
      scrollTop1s: ""
    };
  },

  watch: {
    $route(val, oldVal) {
      this.getshopping();
      this.ammoney = 0;
      this.selectgoods = [];
    },
    scrollTop1s(val, oldVal) {
      this.scrollTop1s = val;
    }
  },
  computed: {
    ...mapGetters({
      getcartinfo: "getcartinfo"
    })
  },
  created() {
    this._getS();
    this.getshopping();
  },
  activated() {
    console.log(this.$refs.beatHome.scrollTop);
    // 如果不在这里请求， 那么从首页添加商品到购物车后，点击跳转到购物车不会调起购物车列表接口。在这里请求之后，切换路由后在退回来，原来的勾选被取消，但是下放结算的数量和金额都保持着原来的值...故使用watch来判断路由的变化，调起请求，金额、选中状态初始化
    // this.getshopping()

    this.$refs.beatHome.addEventListener(
      "scroll",
      (e) => {
        //  console.log(e.target.scrollTop);
        this.scrollTop1s = e.target.scrollTop;
      },
      true
    );
    this.$refs.beatHome.scrollTop = sessionStorage.getItem("locationHome1");
  },
  methods: {
    ...mapActions({
      setcartinfo: "setcartinfo"
    }),
    personalityTagsArrFun(val) {
      return val.split(",");
    },
    fun(arr) {
      if (arr.length <= 0) {
        this.loading = false;
        return;
      }
      var leftHeight = this.$refs.goodsList1
        ? this.$refs.goodsList1.offsetHeight
        : "";
      var rightHeight = this.$refs.goodsList2
        ? this.$refs.goodsList2.offsetHeight
        : "";
      if (leftHeight <= rightHeight) {
        this.goodsList1.push(arr.shift());
      } else {
        this.goodsList2.push(arr.shift());
      }
      this.$nextTick(function () {
        this.fun(arr);
      });
    },
    onLoad() {
      this.pageNum++;
      this._getS();
    },
    _getS() {
      this.loading = true;
      getrecommend({
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then((res) => {
        if (res && res.errorCode === 1) {
          this.refreshing = false;
          this.goodslist = this.goodslist.concat(res.data.content);
          if (res.data.content.length) {
            this.fun(res.data.content);
          }
          if (!res.data.isHasNextPage) {
            this.finished = true;
            this.finishedText = "- 没有更多了-";
          }
        }
      });
    },
    // 数量加
    plus(index, index1, item) {
      // this.shoppinglist[index].orderItemList[index1].buyNum++;
      // Vue.set(
      //   this.shoppinglist[index].orderItemList[index1],
      //   "buyNum",
      //   this.shoppinglist[index].orderItemList[index1].buyNum + 1
      // );
      let toats = this.$toast.loading({
        forbidClick: true
      });
      let buyGoodsInfoList = [
        {
          buyNum: item.buyNum + 1,
          goodsSkuId: item.goodsSkuId
        }
      ];
      countMoney({ buyGoodsInfoList: buyGoodsInfoList }).then((res) => {
        toats.clear();
        if (res.errorCode != 1) {
          this.shoppinglist[index].orderItemList[index1].buyNum--;
          this.$toast(res.msg);
        } else {
          this._ammoney();
        }
      });
    },
    // 数量减
    minus(index, index1, item) {
      // this.shoppinglist[index].orderItemList[index1].buyNum--;
      let toats = this.$toast.loading({
        forbidClick: true
      });
      let buyGoodsInfoList = [
        {
          buyNum: item.buyNum - 1,
          goodsSkuId: item.goodsSkuId
        }
      ];
      countMoney({ buyGoodsInfoList: buyGoodsInfoList }).then((res) => {
        toats.clear();
        if (res.errorCode != 1) {
          this.shoppinglist[index].orderItemList[index1].buyNum++;
        } else {
          this._ammoney();
        }
      });
    },
    focus(index, index1, num) {
      this.index = index;
      this.index1 = index1;
      this.num = num;
      this.show = true;
    },
    confirm() {
      if (this.num && this.num != "0") {
        let toats = this.$toast.loading({
          forbidClick: true
        });
        let buyGoodsInfoList = [
          {
            buyNum: parseInt(this.num),
            goodsSkuId:
              this.shoppinglist[this.index].orderItemList[this.index1]
                .goodsSkuId
          }
        ];
        countMoney({ buyGoodsInfoList: buyGoodsInfoList }).then((res) => {
          toats.clear();
          if (res.errorCode == 1) {
            this.shoppinglist[this.index].orderItemList[this.index1].buyNum =
              parseInt(this.num);
            this._ammoney();
          }
        });
      }
    },
    // clinum(num, shopitem, goodsitem) {
    //   let self = this;
    //   let cartdata = [
    //     {
    //       buyNum: num || 1,
    //       goodsSkuId: goodsitem.goodsSkuId,
    //       // goodsId: goodsitem.goodsId,
    //       // shopId: shopitem.shopId,
    //       // onClick: false
    //     },
    //   ];

    //   countMoney({ buyGoodsInfoList: cartdata }).then((res) => {
    //     if (res && res.errorCode == 1) {
    //       let { orderItemList } = res.data.orderDTOList[0];
    //       // 因为是引用类型，故数量、金额的变化不能直接体现在shoppinglist中，需在不关联对象shoppinglistCopy中体现
    //       self.shoppinglistCopy.forEach((shop) => {
    //         shop.orderItemList.forEach((order) => {
    //           if (order.goodsId === goodsitem.goodsId) {
    //             order.buyNum = orderItemList[0].buyNum;
    //             order.itemTotalMoney = orderItemList[0].itemTotalMoney; //接口返回总数
    //             order.itemVoucherMoney = orderItemList[0].itemVoucherMoney; //接口抵用金
    //             order.goodsVoucherPayMoney =
    //               orderItemList[0].goodsVoucherPayMoney; //接口抵用金
    //           }
    //         });
    //       });
    //       self._ammoney();
    //     }
    //   });
    // },

    /*  clinum: _debounce(function(num, shopitem, goodsitem) {
        if(this.re){
              let self = this
              let cartdata = [{
                buyNum: num,
                goodsSkuId: goodsitem.goodsSkuId,
                // goodsId: goodsitem.goodsId,
                // shopId: shopitem.shopId,
                // onClick: false
              }]
              this.re=false
            countMoney({ buyGoodsInfoList: cartdata}).then((res) => {
        
                if(res && res.errorCode == 1){
                  let { orderItemList } = res.data.orderDTOList[0]
                  goodsitem.buyNum = orderItemList[0].buyNum
                  goodsitem.itemTotalMoney = orderItemList[0].itemTotalMoney //接口返回总数
                  goodsitem.itemVoucherMoney = orderItemList[0].itemVoucherMoney //接口抵用金
                  goodsitem.itemVoucherPayMoney = orderItemList[0].itemVoucherPayMoney //接口抵用金
                  self._ammoney()
                }
              this.re=true
              })
         }
    }, 400), */

    _shoppingCartBuy() {
      let self = this;
      shoppingCartBuy().then((res) => {
        if (res && res.errorCode == 1) {
          self.shoppinglist = res.data.orderDTOList;
        } else if (res && res.errorCode == 10001) {
          self.shoppinglist = [];
        }
      });
    },
    plorder() {
      //下单
      let self = this;
      let pardata = [];

      self.selectgoods.forEach((item) => {
        pardata.push({
          buyNum: item.buyNum,
          goodsSkuId: item.goodsSkuId,
          goodsId: item.goodsId,
          shopId: item.shopId,
          agencyUnionid: item.agencyUnionid
        });
      });

      // buyType:2  购物车下单
      self.$router.push({
        name: "plorder",
        query: {
          selectgoods: encodeURIComponent(JSON.stringify(pardata)),
          buyType: 2
        }
      });
    },
    onSubmit() {},
    onClickEditAddress() {},
    getshopping() {
      let self = this;
      let toast1 = null;
      if (self.deltoast) {
        toast1 = self.$toast.loading({
          message: "加载中...",
          forbidClick: true
        });
      }
      getShoppingCart().then((res) => {
        if (self.deltoast) {
          toast1.clear();
        }
        if (res && res.errorCode === 1) {
          self.shoppinglist = res.data != null ? res.data.orderDTOList : [];
          self.shoporderdata = res.data != null ? res.data.orderDTOList : [];
          for (let i = 0; i < self.shoppinglist.length; i++) {
            self.shoppinglist[i]["select"] = [];
          }
        } else if (res && res.errorCode == 10001) {
          self.shoppinglist = [];
          self.shoporderdata = [];
        }
        self.shoppinglistCopy = JSON.parse(JSON.stringify(self.shoppinglist));

        for (let i = 0; i < this.shoppinglist.length; i++) {
          for (let j = 0; j < this.shoppinglist[i].orderItemList.length; j++) {
            Vue.set(
              this.shoppinglist[i].orderItemList[j],
              "shopId",
              this.shoppinglist[i].shopId
            );
          }
        }
      });
    },
    //全选 商品
    changeshop(shopId) {
      let boll = true;
      for (let i = 0; i < this.select.length; i++) {
        if (this.select[i].shopId == shopId) {
          boll = false;
          break;
        }
      }
      for (let i = 0; i < this.shoppinglist.length; i++) {
        if (this.shoppinglist[i].shopId == shopId) {
          for (let j = 0; j < this.shoppinglist[i].orderItemList.length; j++) {
            let index = this.selectgoods.indexOf(
              this.shoppinglist[i].orderItemList[j]
            );
            if (index == -1 && !boll) {
              this.selectgoods.push(this.shoppinglist[i].orderItemList[j]);
            }
            if (index != -1 && boll) {
              this.selectgoods.splice(index, 1);
            }
          }
        }
      }
      // 判断是否选中购物车中的全部商品
      if (this.select.length == this.shoppinglist.length) {
        this.allchecked = true;
      } else {
        this.allchecked = false;
      }
      this._ammoney();
    },
    //全选 店铺
    change() {
      this.selectgoods = [];
      this.select = [];
      if (this.allchecked) {
        for (let i = 0; i < this.shoppinglist.length; i++) {
          this.select.push(this.shoppinglist[i]);
          for (let j = 0; j < this.shoppinglist[i].orderItemList.length; j++) {
            this.selectgoods.push(this.shoppinglist[i].orderItemList[j]);
          }
        }
      }
      this._ammoney();
    },
    // 点击选择
    changegoods() {
      let obj = {};
      this.select = [];
      for (let i = 0; i < this.selectgoods.length; i++) {
        if (obj[this.selectgoods[i].shopId]) {
          obj[this.selectgoods[i].shopId].push(this.selectgoods[i]);
        } else {
          obj[this.selectgoods[i].shopId] = [this.selectgoods[i]];
        }
      }
      // 选中店铺中的全部商品的店铺
      for (let key in obj) {
        for (let i = 0; i < this.shoppinglist.length; i++) {
          if (key == this.shoppinglist[i].shopId) {
            if (obj[key].length == this.shoppinglist[i].orderItemList.length) {
              this.select.push(this.shoppinglist[i]);
            }
          }
        }
      }
      // 判断是否选中购物车中的全部商品
      if (this.select.length == this.shoppinglist.length) {
        this.allchecked = true;
      } else {
        this.allchecked = false;
      }
      this._ammoney();
    },
    // 金额
    _ammoney() {
      var self = this;
      self.ammoney = 0.0;
      self.voucherMoney = 0;
      // selectgoods引用于shoppinglist，故需将其深拷贝给一个新变量，使用新变量进行金额的计算
      const selectList = self.selectgoods;
      // selectList.forEach((select) => {
      //   self.shoppinglistCopy.forEach((shop) => {
      //     shop.orderItemList.forEach((order) => {
      //       // 通过goodId来一一对应对selectList进行商品数量等的赋值
      //       if (order.goodsId === select.goodsId) {
      //         select.buyNum = order.buyNum;
      //         select.itemTotalMoney = order.itemTotalMoney;
      //         select.itemVoucherMoney = order.itemVoucherMoney;
      //         select.goodsVoucherPayMoney = order.goodsVoucherPayMoney;
      //       }
      //     });
      //   });
      // });
      for (let i = 0; i < selectList.length; i++) {
        if (selectList[i].canVoucherMoney) {
          self.ammoney += parseFloat(
            selectList[i].goodsVoucherPayMoney * selectList[i].buyNum
          );
          // self.ammoney+=parseFloat(selectList[i].itemGoodsMoney*selectList[i].buyNum)
        } else {
          self.ammoney += parseFloat(
            selectList[i].goodsVoucherPayMoney * selectList[i].buyNum
          );
          //  self.ammoney+=parseFloat(selectList[i].itemGoodsMoney*selectList[i].buyNum)
        }
        if (selectList[i].canVoucherMoney) {
          self.voucherMoney += parseFloat(
            selectList[i].goodsVoucherMoney * selectList[i].buyNum
          );
        }
      }
      self.ammoney = self.ammoney * 100;
      // eslint-disable-next-line no-self-assign
      self.voucherMoney = `抵用金: ${self.voucherMoney}`;
    },
    opendrouter(name, query = {}) {
      var self = this;
      document.documentElement.scrollTop = 0;
      setTimeout(function () {
        // self.$router.push({name:name,query:query})
        self.$router.push(name + query.goodsId);
      }, 10);
    },
    // 删除购物车
    shoppingdel() {
      let self = this;
      let deldata = [];
      if (self.selectgoods.length == 0) {
        self.$toast("请选择商品");
        return;
      }
      self.shoppinglist.forEach(() => {
        self.selectgoods.forEach((twoitem) => {
          deldata.push(twoitem.goodsSkuId);
        });
      });
      // console.log(deldata,'aassssshhhh');
      shoppingremove({ skuIds: deldata.join() }).then((res) => {
        if (res && res.errorCode == 1) {
          Dialog.confirm({
            // title: "标题",
            message: "是否确认删除"
          })
            .then(() => {
              // on confirm
              self.$toast("删除成功");
              self.deltoast = false;
              self.selectgoods = [];
              self.select = [];
              self.ammoney = 0.0;
              self._ammoney();
              self.getshopping();
            })
            .catch(() => {
              // on cancel
            });
        }
      });
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.name == "detail") {
      from.meta.keepAlive = true;
      sessionStorage.setItem("locationHome1", this.scrollTop1s);
    } else {
      // from.meta.keepAlive = false;
    }

    next();
  }
};
</script>
<style lang="scss" scoped>
.van-card__thumb {
  width: 120px;
  height: 120px;
}
.titleCardImage {
  position: absolute;
  height: 14px;
  top: 0;
  right: 0;
  border-radius: 0;
}
.goodsSkuName {
  color: #999999;
  background-color: #f1f1f1;
  padding: 4px 5px;
  border-radius: 5px;
  width: fit-content;
  margin: 5px 0;
  font-size: 12px;
}
.personalityTags {
  display: flex;
  flex-wrap: wrap;
  padding: 0px 0 5px;
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
.scrollBox {
  overflow-y: auto;
  height: calc(100% - 1.22667rem);
}
.preferential {
  width: 100%;
  margin-top: 5px;
  padding: 0 10px;
  .goodsbox {
    display: flex;
    justify-content: space-between;
    > div {
      width: 49%;
      height: fit-content;
    }
  }
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
.dialog-text {
  margin: 15px 15px 0 15px;
}
.dialog-box {
  :deep(input) {
    border-bottom: 1px solid #930200;
    margin-bottom: 10px;
  }
}
.cardboxs {
  .van-card__bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
.cartwrap {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  .headers-con {
    background: none;
  }
  .headers-con::after {
    border: 0;
  }
  .cartcont {
    // flex: 1;
    // overflow-y: scroll;
    // -webkit-overflow-scrolling: touch;
  }
  .cartbox {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    width: 100%;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    .caritem {
      margin: 10px 10px 0px 10px;
      border-radius: 10px;
      overflow: hidden;
      .van-cell {
        padding: 10px 12px;
      }
    }
    .van-cell::after {
      content: inherit;
      border-bottom: 0;
    }
    .van-card {
      background: none;
    }
    .van-card__price {
      color: #ec0016;
    }
  }
  .nodesdata {
    margin-top: 20px;
    img {
      width: 129px;
      height: 92px;
      display: block;
      margin: 0 auto;
    }
    p {
      font-size: 16px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #212121;
      margin: 10px 0;
      text-align: center;
    }
    button {
      width: 90px;
      height: 30px;
      border: 1px solid #cf0000;
      color: #cf0000;
      font-size: 16px;
      background-color: #ffffff;
      border-radius: 20px;
      display: block;
      margin: 20px auto;
    }
  }
  .van-submit-bar__suffix-label {
    display: block !important;
  }
}
:deep(.van-stepper__minus--disabled),
.van-stepper__plus--disabled {
  color: #323233;
}
</style>
