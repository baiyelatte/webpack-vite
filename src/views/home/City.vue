<template>
  <div class="city" style="position: relative">
    <banners :tabId="tabId" :style="'padding: 10px 10px 0 10px;'" />
    <!-- 现在goodslists3是有数据的，只是里面的没有，对 -->
    <div class="content" v-if="goodslist3 && goodslist3.length > 0">
      <div class="title_top">
        <div class="title">
          <img
            src="../../assets/image/common/aixin.png"
            width="16px"
            height="14px"
          />
          <span>热门城市</span>
        </div>
        <div class="more" @click="goMore">更多 ></div>
      </div>
      <div class="content-box">
        <div class="content1" v-for="(item, index) in goodslist3" :key="index">
          <div class="title_list">
            <!-- <p @click="$router.push('goodShop')">{{item.name}}-杭州站</p> -->
            <p>{{ item.name }}</p>
            <div class="list">
              <!--  -->
              <div
                v-for="(item2, index) in item.goodsVOList"
                :key="index"
                @click="goDetail(item2)"
              >
                <img
                  :src="item2.logoImgUrl"
                  style="width: 101px; height: 79px"
                />

                <div class="lay">{{ buyNumberFun(item2.buyNumber) }}人购买</div>
                <div class="flooder">
                  <div class="goodsName">
                    <span>{{ item2.goodsName }}</span>
                  </div>
                  <div v-if="item2.linePrice" class="line-price">
                    <span>¥{{ item2.linePrice }}</span>
                  </div>
                  <div
                    v-if="item2.linePrice == '' || item2.linePrice == null"
                    class="line-price"
                  >
                    <span>¥0</span>
                  </div>
                  <div
                    class="price"
                    style="display: flex; align-items: center"
                    v-if="item2.canVoucherMoney"
                  >
                    <span
                      style="
                        font-weight: 550;

                        font-size: 10px;

                        color: #bb0000;

                        line-height: 10px;
                      "
                      >¥{{ item2.showPrice }}</span
                    >
                    <span class="price dyjico">{{ item2.voucherMoney }} </span>
                  </div>
                  <div
                    class="price"
                    style="display: flex; align-items: center"
                    v-if="
                      item2.canVoucherMoney == '' ||
                      item2.canVoucherMoney == null
                    "
                  >
                    <span
                      style="
                        font-weight: 550;
                        font-size: 10px;
                        color: #bb0000;
                        line-height: 10px;
                      "
                      >¥{{ item2.showPrice }}</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <van-tabs v-model="activeName" @click="tabClick" line-height="0">
      <van-tab v-for="(item, index) in tagList" :key="index" :title="item.name">
        <template #title>
          <span>{{ item.name }}</span>
          <img
            v-if="activeName == index"
            class="bro-rb"
            src="../../assets/image/home/bor-r.png"
            alt=""
        /></template>
      </van-tab>
    </van-tabs>
    <van-list
      v-if="tagList[0]"
      v-model="loading"
      :finished="cityRecommendGoodsfinished"
      finished-text="没有更多了"
      :immediate-check="true"
      :offset="100"
      @load="onLoad"
    >
      <div class="nodesdata" v-if="goodslist && goodslist.length == 0">
        <!-- <van-empty description="暂无数据" />          -->
      </div>
      <!-- 为您推荐 -->

      <div class="preferential" v-else>
        <div class="goodsbox">
          <div class="goodsBoxL">
            <!-- <div
              class="goodItem"
              v-for="(item, index) in goodslist"
              v-if="index % 2 == 0"
               @click="getDetails(item.goodsId)"
            >
              <img class="shopImg" :src="item.logoImgUrl" alt="" />
              <div class="shopTitle">{{ item.goodsName }}</div>
              <div class="flexBox shopTxt" v-if="item.voucherMoney">
                <div class="price">¥{{ item.showPrice }}</div>
                <span class="price dyjico">{{ item.voucherMoney }} </span>
              </div>
              <div v-else class="flexBox shopTxt">
                <div class="price">¥{{ item.showPrice }}</div>
                <span class="price dyjico">{{ item.linePrice }} </span>
              </div>
              <div class="buy">
                <div class="surprise" v-if="item.tailMark">惊喜价</div>
                <div class="num">{{ item.buyNumber }}人付款</div>
              </div>
              <div class="flexBox biaoqianLists">
                <div class="bq" v-if="item.personalityTags.length > 0">
                  <div
                    class="biaoqian"
                    v-for="item3 in item.personalityTags.split(',')"
                  >
                    {{ item3 }}
                  </div>
                </div>
              </div>
              <div v-if="item.shopName" class="leftBottom">
                {{ item.shopName }}
              </div>
            </div> -->
            <template v-for="(item, index) in goodslist">
              <GoodItem :goodItem="item" :key="index" v-if="index % 2 == 0" />
            </template>
          </div>
          <div class="goodsBoxR">
            <!-- <div
              class="goodItem"
              v-for="(item, index) in goodslist"
              v-if="index % 2 != 0"
               @click="getDetails(item.goodsId)"
            >
              <img class="shopImg" :src="item.logoImgUrl" alt="" />
              <div class="shopTitle">{{ item.goodsName }}</div>
              <div class="flexBox shopTxt" v-if="item.voucherMoney">
                <div class="price">¥{{ item.showPrice }}</div>
                <span class="price dyjico">{{ item.voucherMoney }} </span>
              </div>
              <div v-else class="flexBox shopTxt">
                <div class="price">¥{{ item.showPrice }}</div>
                <span class="price dyjico">{{ item.linePrice }} </span>
              </div>
              <div class="buy">
                <div class="surprise" v-if="item.tailMark">惊喜价</div>
                <div class="num">{{ item.buyNumber }}人付款</div>
              </div>
              <div class="flexBox biaoqianLists">
                <div class="bq" v-if="item.personalityTags.length > 0">
                  <div
                    class="biaoqian"
                    v-for="item3 in item.personalityTags.split(',')"
                  >
                    {{ item3 }}
                  </div>
                </div>
              </div>
              <div v-if="item.shopName" class="leftBottom">
                {{ item.shopName }}
              </div>
            </div> -->
            <template v-for="(item, index) in goodslist">
              <GoodItem :goodItem="item" :key="index" v-if="index % 2 != 0" />
            </template>
          </div>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
import {
  slideshow,
  getrecommend,
  getCityType,
  cityRecommendGoods,
  getGoodsTag
} from "api";
import GoodItem from "@/components/goods/goodItem";
import banners from "@/components/home/banners";

export default {
  data() {
    return {
      personalityTags: ["精致生活", "精致生活", "便宜好物"],
      goodsList1: [],
      goodsList2: [],
      goodslist: [],
      activeName: 0,
      tagList: [],
      pageNum: 1,
      pageSize: 20,
      finished: false,
      loading: false, // 加载状态
      cityLoading: false,
      goodslist3: [],
      cityRecommendGoodsfinished: false,
      cityFinished: false,
      cityAreaId: "",
      bottomTabId: null //下面的tabid，写在这就是全局的了
    };
  },
  components: {
    banners,
    banners,
    GoodItem
  },
  props: ["tabId"],
  watch: {},
  created() {
    this._getCityType();
    this._getTag();
  },
  activated() {
    this._getCityType();
    this.pageNum = 1;
    this.cityRecommendGoodsfinished = false;
    this._getTag();
  },
  computed: {
    position() {
      return this.$store.getters["home/position"];
    }
  },
  methods: {
    getDetails(id) {
      this.$emit("goDeatil", id);
      this.$router.push({
        path: `/detail/${id}?agencyUnionid=${
          this.$route.query.agencyUnionid || null
        }&fromPlatform=${this.$route.query.fromPlatform || null}`
      });
    },
    _getTag() {
      getGoodsTag().then((res) => {
        // this.goodslist = [];
        this.tagList = res.data.content || [];
        this.bottomTabId = this.tagList[0]?.id;
        // if (this.tagList.length > 0) {
        //   this.bottomTabId = this.tagList[0].id;
        //   this._getS();
        // }
      });
    },
    tabClick(index) {
      console.log("---------------切换---------------");
      this.bottomTabId = this.tagList[index].id;
      this.pageNum = 1;
      this._getS(true);
    },
    buyNumberFun(val) {
      let value = val.toString();
      if (val < 100) {
        return val;
      } else if (val < 1000) {
        return value[0] + "00" + "+";
      } else if (val < 10000) {
        return value[0] + "000" + "+";
      } else {
        let num = val / 10000;
        return parseInt(num) + "w" + "+";
      }
    },
    goMore() {
      this.$router.push({
        path: "/moreCity",
        query: { cityId: this.position.adcode }
      });
    },
    _getCityType() {
      let params = {
        adCode: this.position.adcode
      };
      this.cityLoading = true;
      getCityType(params).then((res) => {
        if (res && res.errorCode == 1) {
          this.cityLoading = false;
          if (res.data && res.data.content.length > 0) {
            this.goodslist3 = res.data.content;
          }
          this.cityLoading = false;
          this.cityFinished = true;
        }
      });
    },
    goDetail(item2) {
      console.log(item2);
      this.$router.push({
        path: `/detail/${item2.goodsId}?agencyUnionid=${
          this.$route.query.agencyUnionid || null
        }&fromPlatform=${this.$route.query.fromPlatform || null}`
      });
    },
    _getS(isSwitching) {
      this.loading = true;
      cityRecommendGoods({
        cityId: this.position.adcode,
        goodsTag: this.bottomTabId,
        pageSize: 10,
        pageNum: this.pageNum
      }).then((res) => {
        if (res && res.errorCode == 1) {
          //请求成功
          this.pageNum++;
          this.goodslist =
            isSwitching || this.pageNum === 1
              ? res.data.content
              : [...this.goodslist, ...res.data.content]; //数组赋值

          if (!res.data.isHasNextPage) {
            this.cityRecommendGoodsfinished = true;
            this.finishedText = "- 没有更多了-";
          }
        }
        this.loading = false;
      });
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
    // 下拉加载
    onLoad() {
      this.orderrefresh = false;
      this._getS(1);
    }
  }
};
</script>

<style scoped lang="scss">
.dyjico {
  line-height: initial;
  height: auto;
  vertical-align: baseline;
  &::before,
  &::after {
    top: 50%;
    transform: translateY(-50%);
  }
}

.flexBox {
  display: flex;
  align-items: center;
}
.content {
  padding: 0 12px 10px 0px;
  background-color: #f7f7f7;
  .title_top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 10px;
    padding-left: 3px;
  }
  .title {
    margin-bottom: 10px;
    display: flex;

    span {
      margin-left: 5px;
      color: #333;
      font-size: 16px;
    }
  }
  .more {
    font-size: 11px;
    color: #666;
  }
  .content-box {
    width: 100vw;
    border-radius: 10px;
    background: #fff;
  }
  .content1 {
    // border-radius: 10px;
    padding: 0 12px 12px 21px;
    p {
      font-size: 15px;
      color: #333333;
      margin-bottom: 10px;
    }
    .list {
      width: 100%;
      display: flex;
      // justify-content: space-between;
      > div {
        border: 0.5px solid #e5e5e5;
        border-radius: 8px;
        padding-bottom: 8px;
        position: relative;
        margin-right: 10px;
        > img {
          border-radius: 8px 0 0 0;
        }
      }
      .flooder {
        margin-left: 5px;
        h3 {
          color: #333333;
          font-size: 13px;
          margin-top: 2px;
        }
        h4 {
          color: #999999;
          font-size: 11px;
          margin: 3px 0;
          text-decoration: line-through;
        }
        h5 {
          color: #bb0000;
          font-size: 14px;
        }
        .goodsName {
          font-size: 10px;
          width: 91px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: #333;
          font-size: 13px;
          font-weight: 550;
          margin-top: 2px;
        }
        .line-price {
          font-size: 11px;
          font-weight: 400;
          color: #999;
          line-height: 15px;
          text-decoration: line-through;
          margin: 3px 0 0px 0;
        }
        .price {
          line-height: 21px;
        }
      }
    }
  }
}
.lay {
  background-image: linear-gradient(to right, #d10000, #ec0200);
  border-radius: 30px 0 50px 0;
  // width: 60px;
  // width: 71.25px;
  height: 14px;
  // height: 14.7499px;
  position: absolute;
  left: 0;
  top: 0;
  font-size: 9px;
  color: #fff;
  line-height: 14px;
  text-align: center;
  padding: 0px 3px;
}
.title_list {
  padding-top: 10px;
}
:deep(.van-tab--active) {
  color: #bb0000;
  font-size: 15px;
}
.preferential {
  border-radius: 9px;
  padding: 0 12px;
  width: 100%;
  margin-top: 5px;

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
  .goodsbox {
    display: flex;
    justify-content: space-between;
    > div {
      width: 49%;
      height: fit-content;
      .goodItem {
        position: relative;
        padding-bottom: 1px;
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
          width: 170px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-left: 5px;
        }
        .price {
          font-size: 18px;
          color: #cf0000;
          margin-left: 5px;
        }
        .price2 {
          font-size: 10px;
          color: #cf0000;
          margin: 0 2px;
        }
        .buy {
          display: flex;
          align-items: center;
          margin-top: 3px;
          margin-left: 5px;
          .surprise {
            // width: 98px;
            // height: 32px;
            padding: 3px 8px;
            background: #bb0000;
            border-radius: 10px;
            color: #fff;
            font-size: 12px;
            text-align: center;
            margin-right: 5px;
          }
          .num {
            font-size: 10px;
            color: #666;
          }
        }

        .biaoqianLists {
          margin: 10px 0;
          .bq {
            border-radius: 4px;
            font-size: 10px;
            color: #cf0000;
            padding: 2px;
            display: flex;
            flex-wrap: wrap;
            .biaoqian {
              margin-right: 2px;
              padding: 0 4px;
              flex-shrink: 0;
              height: 15px;
              line-height: 15px;
              border-radius: 3px;
              border: 1px solid #bb0000;
              color: #bb0000;
              font-size: 11px;
              margin-top: 2px;
            }
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
      margin-right: 2%;
    }
  }
}
:deep(.van-tab) {
  position: relative;

  &::after {
    content: "";
    position: absolute;
    display: block;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 1px;
    height: 20px;
    background-color: #eee;
  }
}
.bro-rb {
  position: absolute;
  right: 2px;
  bottom: 8px;
  width: 8px;
  height: 8px;
}
</style>
