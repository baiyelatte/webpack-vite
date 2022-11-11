<template>
  <router-layout :backgroundColor="'rgb(242, 242, 242)'">
    <!-- dingwei -->
    <div class="top">
      <div class="location">
        <van-nav-bar
          title
          v-if="!$route.meta.CLAPP"
          left-arrow
          @click-left="$router.back()"
          style="background: #fff"
        />
        <div
          :class="['city', tabIndex == 0 ? 'active' : '']"
          @click="changeTab(0)"
        >
          <span>{{ position.city || position.province || "北京" }}</span>
          <van-icon name="location-o" size="16px" />
        </div>
        <div
          :class="['all', tabIndex == 1 ? 'active' : '']"
          @click="changeTab(1)"
        >
          <span>全国</span>
        </div>
      </div>
      <div class="search-box">
        <van-icon name="search" size="22" color="#BCBCBC" class="search_icon" />
        <!-- <span class="search-tit">请输入商品名称</span> -->
        <input
          type="text"
          class="search-tit"
          v-model="value"
          placeholder="请输入要搜索的商品"
        />
        <span class="sou" @click="_citySearch">搜索</span>
      </div>
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
      </div>
    </div>

    <div
      class="shopLists"
      :style="{ height: shopListsHeight + 'px' }"
      ref="shopLists"
    >
      <div
        v-if="goodsList1.length > 0"
        class="preferential"
        style="height: 100%"
      >
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
            v-model="loading3"
            :finished="finished"
            finished-text="没有更多了"
            @load="list_onLoad_more"
          >
            <div class="goodsbox">
              <div class="goodsBoxL">
                <div
                  class="goodItem"
                  v-for="(item, index) in goodsList1"
                  v-if="index % 2 != 0"
                  @click="$router.push('/cityShop')"
                >
                  <img class="shopImg" :src="item.logoImgUrl" alt="" />
                  <div class="shopTitle">{{ item.goodsName }}</div>
                  <div class="flexBox shopTxt" v-if="item.voucherMoney">
                    <div class="price">¥{{ item.showPrice }}</div>
                    <div class="price2">券后价</div>
                    <span class="price dyjico">{{ item.voucherMoney }} </span>
                  </div>
                  <div v-else class="flexBox shopTxt">
                    <div class="price">¥{{ item.showPrice }}</div>
                    <div class="price2">券后价</div>
                    <span class="price dyjico">¥{{ item.linePrice }} </span>
                  </div>
                  <div class="flexBox biaoqianLists">
                    <div class="bq">满200减30</div>
                    <div class="num">{{ item.buyNumber }}人付款</div>
                  </div>
                  <!-- <div class="leftBottom">西兴分店</div> -->
                  <div class="leftBottom">{{ item.shopName }}</div>
                </div>
              </div>
              <div class="goodsBoxR">
                <div
                  class="goodItem"
                  v-for="(item, index) in goodsList1"
                  v-if="index % 2 == 0"
                  @click="$router.push('/indexShop')"
                >
                  <img class="shopImg" :src="item.logoImgUrl" alt="" />
                  <div class="shopTitle">{{ item.goodsName }}</div>
                  <div class="flexBox shopTxt" v-if="item.voucherMoney">
                    <div class="price">¥{{ item.showPrice }}</div>
                    <div class="price2">券后价</div>
                    <span class="price dyjico">{{ item.voucherMoney }} </span>
                  </div>
                  <div v-else class="flexBox shopTxt">
                    <div class="price">¥{{ item.showPrice }}</div>
                    <div class="price2">券后价</div>
                    <span class="price dyjico">¥{{ item.linePrice }} </span>
                  </div>
                  <div class="flexBox biaoqianLists">
                    <div class="bq">满200减30</div>
                    <div class="num">{{ item.buyNumber }}人付款</div>
                  </div>
                  <!-- <div class="leftBottom">西兴分店</div> -->
                  <div class="leftBottom">{{ item.shopName }}</div>
                </div>
              </div>
            </div>
          </van-list>
        </van-pull-refresh>
      </div>
      <div class="nodesdata" v-else>
        <!-- <van-empty description="暂无数据" /> -->
        <div class="empty">
          <span>该地区暂无分店~</span>
        </div>
        <van-list
          v-model="loading2"
          :finished="recommendFinished"
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
    </div>
  </router-layout>
</template>
<script>
import userCom from "@/components/goods/usercom.vue";
import {
  getCityShop,
  citySearch,
  getrecommend,
  getCityShopRecommend
} from "api";
export default {
  components: {
    userCom
  },
  computed: {
    position() {
      return this.$store.getters.position;
    }
  },
  data() {
    return {
      tabIndex: 0, //tab
      goodsList1: [],
      goodslist: [], //为你推荐
      refreshing: false,
      loading: false, // 加载状态
      loading2: false,
      loading3: false,
      finished: false, // 是否加载
      chosseIndex: 0, //排序方式0 综合 1特产 2新品 3价格上 4价格下
      list: [
        { id: 1, name: "综合", isdown: false },
        { id: 2, name: "特产", isdown: false },
        { id: 3, name: "新品", isdown: false },
        { id: 4, name: "价格", isdown: false }
      ],
      value: "",
      pageNum: 1, // 当前页数
      pageNum2: 1, // 当前页数
      pageSize: 20, // 每页条数
      recommendFinished: false,
      shopListsHeight: 0
    };
  },
  created() {
    this.value = this.$route.query.content;
    console.log(this.$route.query.content);
    this._citySearch();
    this._getS();
  },
  methods: {
    onLoad() {
      // this.pageNum += 1;
      this._getS();
    },
    // 为您推荐
    _getS() {
      this.loading2 = true;
      getCityShopRecommend({
        pageNum: this.pageNum, //你等我注释了你看
        pageSize: 10
      }).then((res) => {
        this.refreshing = false;
        if (res && res.errorCode === 1) {
          this.loading2 = false;
          this.goodslist = this.goodslist.concat(res.data.content);
          this.pageNum += 1;
          this.recommendFinished = !res.data.isHasNextPage;
          if (!res.data.isHasNextPage) {
            this.recommendFinished = true;
            this.finishedText = "- 没有更多了-";
          }
        }
      });
    },
    //搜索结果上拉加载
    list_onLoad_more() {
      this.pageNum2 += 1;
      this._citySearch();
    },
    //搜索结果
    _citySearch() {
      citySearch({
        content: this.value,
        pageNum: this.pageNum2,
        pageSize: 10
      }).then((res) => {
        //重写
        if (res && res.errorCode == 1) {
          if (res.data.content.length > 0) {
            this.loading3 = false;
            this.goodsList1 = this.goodsList1.concat(res.data.content);

            if (!res.data.isHasNextPage) {
              this.finished = true;
              this.finishedText = "- 没有更多了-";
            }
            console.log(this.$refs.shopLists.offsetTop);
            // window.screen.height - document.getElementById('topics').offsetTop
            console.log(window.screen.height);
            this.shopListsHeight =
              window.screen.height - this.$refs.shopLists.offsetTop;
          } else {
            this.finished = true;
            this.finishedText = "- 没有更多了-";
          }
          this.loading3 = false;
        }
      });
      //   this.value = "";
    },
    changeTab(idx) {
      this.tabIndex = idx;
      // 切换掉接口，0是城市 1是全部,接口要区分，如果是0就传城市id，是1就传空
      // this._getCityShop()
    },
    _getCityShop() {
      let toast = "";
      this.loading = true;
      getCityShop({
        branchLevelOneCategory: 1,
        branchLevelTwoCategory: 2
      }).then((res) => {
        if (res && res.errorCode === 1) {
          this.refreshing = false;
          this.finished = false;
          if (res.data) {
            if (res.data.content.length > 0) {
              this.goodsList1 = this.goodsList1.concat(res.data.content);
              this.finished = !res.data.isHasNextPage;

              if (!res.data.isHasNextPage) {
                this.finished = true;
                this.finishedText = "- 没有更多了-";
              }
            } else {
              this.finished = !res.data.isHasNextPage;
              this.loading = false;
              // this.finished = true;
              this.finishedText = "- 没有更多了-";
            }
          } else {
            toast.clear();
            this.finished = !res.data.isHasNextPage;
            this.goodsList1 = this.goodsList1.concat(res.data.content);
          }
        } else {
          this.finished = true;
          this.finishedText = "- 没有更多了-";
        }
        console.log(this.goodsList1, "111111111111111");
      });
    },
    onRefresh() {
      this.orderrefresh = false;
      this.pageNum = 1;
      this._getCityShop();
    },
    changeChoose(index) {
      if (index == 3 && this.chosseIndex == 3) {
        this.chosseIndex = 4;
      } else {
        this.chosseIndex = index;
      }
      console.log(this.chosseIndex);
    }
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
.empty {
  height: 15px;
  font-size: 15px;
  font-weight: 500;
  color: #101010;
  text-align: center;
  padding-top: 45px;
  padding-bottom: 32px;
}
:deep(.van-pull-refresh) {
  min-height: 100%;
}
.flexBox {
  display: flex;
  align-items: center;
}
.top {
  background: #fff;
}
.location {
  display: flex;
  // justify-content: space-between;
  align-items: center;
  .city {
    font-size: 16px;
    font-weight: bold;
    margin-left: 93px;
    margin-right: 100px;
    color: #888;
    position: relative;
  }
  .all {
    font-size: 16px;
    font-weight: bold;
    color: #888;
    position: relative;
  }
  .active {
    color: #cf0000;
    &::after {
      content: "";
      display: inline-block;
      position: absolute;
      bottom: -10px;
      // 左右居中
      left: 50%;
      transform: translateX(-50%);

      width: 45px;
      height: 3px;
      background: #cf0000;
      border-radius: 2px;
    }
  }
}
.search-box {
  width: 305px;
  height: 30px;
  background: #f7f7f7;
  border-radius: 15px;
  color: #333;
  font-size: 12px;
  margin: 0 auto;
  line-height: 30px;
}
.sou {
  font-size: 15px;
  color: #101010;
  font-weight: 500;
  border-left: 1px solid #bcbcbc;
  height: 28px;
  // margin-left:140px;
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
.navLists {
  display: flex;
  flex-wrap: nowrap;
  .navList {
    width: 25%;
    flex-shrink: 0;
    font-size: 15px;
    text-align: center;
    justify-content: center;
    padding: 12px 0;
    &.active {
      color: #cf0000;
    }
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
        padding: 2px 10px;
      }
    }
  }
  .goodsBoxL {
    margin-right: 10px;
  }
}
</style>
