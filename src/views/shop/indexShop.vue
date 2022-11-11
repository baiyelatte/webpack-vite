<template>
  <router-layout :backgroundColor="'rgb(242, 242, 242)'" class="cityShop">
    <div class="topBox">
      <div class="top">
        <!-- <van-nav-bar title v-if="!$route.meta.CLAPP" left-arrow @click-left="$router.back()" /> -->
        <van-icon
          class="back left"
          color="#fff"
          name="arrow-left"
          @click="$router.back()"
        />
        <div class="search-box">
          <van-icon name="location-o" size="16px" color="#CF0000" />
          <span
            style="font-size: 14px; margin-right: 15px; color: #cf0000"
            @click="showPop = true"
            >{{ cityName }}</span
          >
          <van-icon name="search" size="17" color="#BCBCBC" />
          <input
            type="text"
            class="search-tit"
            v-model="value"
            placeholder="请输入要搜索的商品"
          />
          <span class="sou" @click="onSearch">搜索</span>
        </div>
      </div>
    </div>
    <div class="allBox">
      <div class="navLists">
        <div
          @click="changeChoose(index)"
          :class="[
            'navList',
            'flexBox',
            index == chosseIndex || (chosseIndex == 4 && index == 3)
              ? 'active'
              : ''
          ]"
          v-for="(item, index) in list"
          :key="index"
        >
          {{ item.name }}
          <div class="jiantouBox" v-if="item.name == '价格'">
            <div :class="['jttop', chosseIndex == 4 ? 'active' : '']"></div>
            <div :class="['jtbottom', chosseIndex == 3 ? 'active' : '']"></div>
          </div>
        </div>
        <div class="navList flexBox shopName">
          <van-icon name="shop-o" color="#CF0000" size="14" />
          <span @click="showShops = true">{{ shopName }}</span>
        </div>
      </div>
      <div class="shopLists">
        <div
          class="preferential"
          ref="allBox"
          :style="{ height: allBoxHeight + 'px' }"
        >
          <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="list_onLoad_more"
            >
              <div v-if="goodsList.length > 0">
                <div class="goodsbox">
                  <div class="goodsBoxL">
                    <div
                      class="goodItem"
                      v-for="(item, index) in goodsList"
                      v-if="index % 2 != 0"
                      @click="$router.push('/cityShop')"
                    >
                      <img class="shopImg" :src="item.logoImgUrl" alt="" />
                      <div class="shopTitle">{{ item.goodsName }}</div>
                      <div class="flexBox shopTxt">
                        <div class="price">￥{{ item.showPrice }}</div>
                        <!-- <span class="price dyjico">{{ goodslist.voucherMoney }} </span> -->
                        <div class="price2">券后价</div>
                        <div class="num">{{ item.buyNumber }}人付款</div>
                      </div>
                      <div class="flexBox biaoqianLists">
                        <div class="bq">满200减30</div>
                      </div>
                      <!-- <div class="leftBottom">西兴分店</div> -->
                      <div class="leftBottom">{{ item.shopName }}</div>
                    </div>
                  </div>
                  <div class="goodsBoxR">
                    <div
                      class="goodItem"
                      v-for="(item, index) in goodsList"
                      v-if="index % 2 == 0"
                      @click="$router.push('/cityShop')"
                    >
                      <img class="shopImg" :src="item.logoImgUrl" alt="" />
                      <div class="shopTitle">{{ item.goodsName }}</div>
                      <div class="flexBox shopTxt">
                        <div class="price">￥{{ item.showPrice }}</div>
                        <!-- <span class="price dyjico">{{ goodslist.voucherMoney }} </span> -->
                        <div class="price2">券后价</div>
                        <div class="num">{{ item.buyNumber }}人付款</div>
                      </div>
                      <div class="flexBox biaoqianLists">
                        <div class="bq">满200减30</div>
                      </div>
                      <!-- <div class="leftBottom">西兴分店</div> -->
                      <div class="leftBottom">{{ item.shopName }}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="nodesdata" v-else>
                <van-empty description="暂无数据" />
              </div>
            </van-list>
          </van-pull-refresh>
        </div>
      </div>
    </div>
    <!-- 地区选择 -->
    <van-popup v-model="showPop" position="bottom">
      <van-area
        @confirm="chooseCity"
        @cancel="closeCity"
        columns-num="3"
        visible-item-count="5"
        :area-list="areaList"
        :columns-placeholder="['请选择', '请选择', '请选择']"
      />
    </van-popup>
    <!-- 店铺选择 -->
    <van-popup v-model="showShops" position="bottom" :style="{ height: '30%' }">
      <van-picker
        title="选择店铺"
        show-toolbar
        :columns="shopsList"
        value-key="name"
        @confirm="onConfirm"
        @cancel="onCancel"
        @change="onChange"
      />
    </van-popup>
  </router-layout>
</template>
<script>
import { getCityShop, getArea, cityShopList } from "api";
import { areaList } from "@vant/area-data";
export default {
  name: "indexShop",
  data() {
    return {
      allBoxHeight: 0,
      value: "",
      cityName: "",
      shopName: "全部",
      shopId: "", //店铺id
      adcode: "", //选择地址后的城市编码
      areaList: [],
      showPop: false,
      showShops: false,
      pageNum: 1,
      goodsList: [],
      refreshing: false,
      loading: false, // 加载状态
      finished: false, // 是否加载
      chosseIndex: 0, //排序方式0 综合 1特产 2新品 3价格上 4价格下
      list: [
        { id: 1, name: "综合", isdown: false },
        { id: 2, name: "特产", isdown: false },
        { id: 3, name: "新品", isdown: false },
        { id: 4, name: "价格", isdown: false }
      ],
      shopsList: [],
      cityId: ""
    };
  },
  computed: {
    position() {
      return this.$store.getters.position;
    }
  },
  created() {
    this.cityId = this.position.adcode || "110100";
    console.log(areaList);
    this.areaList = areaList;
    this.cityName = this.position.city || this.position.province || "北京";
    this.getShops();
  },
  mounted() {
    this.$nextTick(() => {
      console.log(this.$refs.allBox.offsetTop); //177
      console.log(window.screen.height); //667
      this.allBoxHeight = window.screen.height - this.$refs.allBox.offsetTop;
      this._getCityShop(true);
    });
  },
  methods: {
    onSearch() {
      console.log(this.value, "2");
      if (this.value == "") {
        this.$toast("请输入搜索关键字");
        return;
      }
      this.$router.push({ path: "/cityShop", query: { content: this.value } });
    },

    chooseCity(e) {
      console.log(e, "1");
      this.showPop = false;
      let ee = e.slice(0, 2);
      console.log(ee);
      ee.forEach((item) => {
        if (item && item.name) {
          console.log(item, "item");
          this.cityName = item.name;
          this.adcode = item.code;
          this.cityId = this.adcode;
        }
      });
      console.log(this.adcode, "adcode");
      this._getCityShop();
      this.getShops();
    },
    closeCity() {
      this.showPop = false;
    },

    //切换地址后获取数据列表
    // _getArea() {
    //   console.log(1111);
    //   getArea({
    //     cityId: this.adcode || ""
    //     // goodsTag:5,
    //   }).then((res) => {
    //     console.log(1111);
    //     console.log(res);
    //     if (res && res.errorCode == 1) {
    //       this.loading = true;
    //       if (res.data) {
    //         if (res.data.content.length > 0) {
    //           this.goodsList = this.goodsList.concat(res.data.content);
    //           this.loading = false;
    //           this.finished = !res.data.isHasNextPage;
    //           if (!res.data.isHasNextPage) {
    //             this.finished = true;
    //             this.finishedText = "- 没有更多了-";
    //           }
    //         } else {
    //           // this.goodsList = []
    //           this.finished = !res.data.isHasNextPage;
    //           this.loading = false;
    //           this.finished = true;
    //           this.finishedText = "- 没有更多了-";
    //         }
    //       } else {
    //         this.finished = !res.data.isHasNextPage;
    //         this.goodsList = res.data.content;
    //       }
    //     }
    //   });
    // },

    onRefresh() {
      this.orderrefresh = false;
      this.pageNum = 1;
      this.goodsList = [];
      this._getCityShop();
    },
    list_onLoad_more() {
      console.log(123123213132);
      this.pageNum += 1;
      this._getCityShop(true);
    },
    _getCityShop() {
      this.loading = true;
      getCityShop({
        cityId: this.cityId,
        pageNum: this.pageNum,
        branchLevelFourCategory: this.shopId || ""
      }).then((res) => {
        if (res && res.errorCode === 1) {
          this.refreshing = false; //下拉停止
          this.finished = false;
          if (res.data) {
            if (res.data.content.length > 0) {
              this.goodsList = res.data.content;
              this.finished = !res.data.isHasNextPage;
              this.loading = false;
              if (!res.data.isHasNextPage) {
                this.finished = true;
                this.finishedText = "- 没有更多了-";
              }
            } else {
              this.finished = !res.data.isHasNextPage;
              this.loading = false;
              this.finished = true;
              this.finishedText = "- 没有更多了-";
              if (this.pageNum == 1) {
                this.goodsList = [];
              }
            }
          } else {
            toast.clear();
            this.finished = !res.data.isHasNextPage;
            this.goodsList = this.goodsList.concat(res.data.content);
          }
        } else {
          // this.finished = true;
          // this.finishedText = "- 没有更多了-";
        }
      });
    },
    changeChoose(index) {
      if (index == 3 && this.chosseIndex == 3) {
        this.chosseIndex = 4;
      } else {
        this.chosseIndex = index;
      }
      console.log(this.chosseIndex);
    },
    //店铺列表
    getShops() {
      cityShopList({
        adCode: this.cityId
      }).then((res) => {
        this.shopsList = res.data.content;
        console.log(this.shopsList, "shoplist");
      });
    },
    onConfirm(e) {
      console.log(e, "2");
      this.showShops = false;
      this.shopName = e.name;
      this.shopId = e.id;
      this.pageNum = 1;
      this._getCityShop();
    },
    onCancel() {
      this.showShops = false;
    },
    onChange() {}
  }
};
</script>
<style lang="scss">
.cityShop {
  .van-nav-bar__left,
  .van-nav-bar__right {
    padding-left: 5px;
    padding-right: 0;
  }
  .van-nav-bar .van-icon,
  .van-nav-bar__text {
    color: #fff;
    font-size: 24px;
    margin-top: 5px;
  }
  :deep(.van-pull-refresh) {
    min-height: 100%;
  }

  .flexBox {
    display: flex;
    align-items: center;
  }
  .topBox {
    padding-top: 35px;
    background-image: url("../../assets/image/home/cityShop_bg.png");
    background-size: contain;
    background-repeat: no-repeat;
    // background-color: green;
    height: 197px;
    margin-bottom: -20px;
  }

  .top {
    display: flex;
    align-content: center;
  }
  .back {
    padding-top: 10px;
  }
  .search-box {
    width: 305px;
    height: 30px;
    background: #f7f7f7;
    border-radius: 15px;
    color: #333;
    font-size: 12px;
    margin: 10px auto;
    line-height: 30px;
    padding-left: 5px;
  }
  .sou {
    font-size: 15px;
    color: #101010;
    font-weight: 500;
    border-left: 1px solid #bcbcbc;
    height: 28px;
    // margin-left:60px;
    padding-left: 5px;
  }
  .search-tit {
    margin-left: 5px;
    color: #888;
    height: 27px;
    line-height: 27px;
    border: none;
    background: #f7f7f7;
  }
  .allBox {
    border-radius: 20px;
    background-color: #fff;
  }
  .navLists {
    display: flex;
    flex-wrap: nowrap;
    padding: 0 10px;
    .navList {
      width: 15%;
      flex-shrink: 0;
      font-size: 15px;
      text-align: center;
      justify-content: center;
      padding: 12px 0;
      &.active {
        color: #cf0000;
      }
    }
    .shopName {
      width: 25%;
      font-size: 14px;
      text-align: center;
      justify-content: center;
      color: #cf0000;
      margin-left: auto;
    }
  }
  .jiantouBox {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-left: 5px;
    div {
      width: 0;
      height: 0;
      border: 5px solid transparent;
    }
    .jttop {
      border-bottom-color: #666666;
      margin-bottom: 2px;
      &.active {
        border-bottom-color: #cf0000;
      }
    }
    .jtbottom {
      border-top-color: #666666;
      &.active {
        border-top-color: #cf0000;
      }
    }
  }
  .preferential {
    padding: 0 10px;
    height: 85.3%;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    background: #f7f7f7;
  }
  .goodsbox {
    display: flex;
    justify-content: space-between;
    & > div {
      flex: 1;
      .goodItem {
        position: relative;
        padding-bottom: 20px;
        background-color: #fff;
        border-radius: 10px;
        margin-bottom: 10px;
        .shopImg {
          width: 100%;
          margin-bottom: 10px;
          border-radius: 8px;
        }
        .shopTitle {
          color: #101010;
          font-size: 16px;
          font-weight: bolder;
          margin-bottom: 10px;
        }
        .price {
          font-size: 18px;
          color: #cf0000;
        }
        .price2 {
          font-size: 10px;
          color: #cf0000;
          margin: 0 2px;
        }
        .num {
          font-size: 10px;
          color: #666;
        }
        .biaoqianLists {
          margin: 10px 0;
          .bq {
            border: 1px solid #cf0000;
            border-radius: 4px;
            font-size: 10px;
            color: #cf0000;
            padding: 2px;
          }
        }
        .leftBottom {
          background: linear-gradient(90deg, #0dc4fe, #77a3fe, #cc72ff);
          border-radius: 0px 10px 0px 10px;
          font-size: 12px;
          color: #ffffff;
          position: absolute;
          left: 0;
          bottom: 0;
          // padding: 2px 10px;
        }
      }
    }
    .goodsBoxL {
      margin-right: 10px;
    }
  }
}
</style>
