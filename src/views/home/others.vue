<template>
  <div class="other">
    <div class="preferential" style="background: #fff">
      <!-- <Special :speicaldata="specialifon" /> -->
      <div
        class="specialBox"
        v-if="specialifon.itemList && specialifon.itemList.length > 0"
      >
        <!-- 10个 -->
        <div
          class="specialitem"
          v-for="(item, index) in specialifon.itemList.slice(0, 9)"
          :key="index"
          @click="openlink(item)"
        >
          <div class="grid__icon">
            <img
              :src="
                item.imgUrl
                  ? item.imgUrl
                  : require(`../../assets/image/home/mrlogo.png`)
              "
              alt=""
              @click="pushSearch(item)"
            />
            <!-- <img :src="item.imgUrl" alt="" /> -->
          </div>
          <p class="grid__label">{{ item.name }}</p>
        </div>
        <div
          class="specialitem"
          v-if="specialifon.itemList.length > 9"
          @click="$router.push('category')"
        >
          <div class="grid__icon">
            <!-- <img :src="false ? item.imgUrl : require(`../../assets/image/home/mrlogo.png`)" alt=""> -->
            <img src="../../assets/image/home/more_icon.png" alt="" />
          </div>
          <p class="grid__label">更多</p>
        </div>
      </div>
    </div>
    <div class="content" v-if="brandList && brandList.length > 0">
      <ul>
        <li class="square"></li>
        <li class="title">品牌精选</li>
        <li class="square"></li>
      </ul>
      <div class="brand">
        <ul>
          <li
            v-for="(item, index) in brandList"
            :key="index"
            @click="goNextPage(item)"
          >
            <img :src="item.logImg" width="64px" />
            <p>{{ item.name }}</p>
          </li>
        </ul>
      </div>
    </div>
    <banners :tabId="tabId" :style="'margin-top: 0.26667rem'" />
    <div class="contents" v-for="(item, index) in lists" :key="index">
      <div class="baseMark"></div>
      <div class="title_list">
        <div class="more">
          <img
            src="../../assets/image/common/qg.png"
            width="62px "
            height="15px"
          />
          <p @click="goMoreQg">更多></p>
        </div>
        <div class="list">
          <div>
            <img :src="item.logoImgUrl" height="79px" width="98%" />
            <div class="flooder">
              <h3>{{ item.goodsName }}</h3>
              <h4>¥{{ item.linePrice }}</h4>
              <h5>¥{{ item.showPrice }}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :immediate-check="false"
      @load="onLoad"
    >
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
  </div>
</template>

<script>
import {
  getsSlideshow,
  getsGoodsTag,
  getrecommend,
  getGoodsTabTwo,
  getPromotionGoodsInfo,
  slideshow,
  brand
} from "api";
import Special from "@/components/home/special";
import GoodItem from "@/components/goods/goodItem";
import banners from "@/components/home/banners";
export default {
  data() {
    return {
      specialifon: [],
      goodsList1: [],
      goodsList2: [],
      goodslist: [],
      pageNum: 1,
      pageSize: 20,
      finished: false,
      loading: false, // 加载状态
      lists: [],
      imgLogo: "../../assets/image/home/mrlogo.png",
      brandList: []
    };
  },
  components: {
    Special,
    GoodItem,
    banners
  },
  props: ["tabId"],

  watch: {
    tabId: {
      handler(newVal, oldVal) {
        console.log(newVal, oldVal);
        this._getsGoodsTag();
        this.getPromotion();
      }
    }
  },

  created() {
    this._getsGoodsTag();
    this._getS();
    console.log(this.tabId, "tabid");
    this.getPromotion();
    this.getBrand();
  },
  methods: {
    pushSearch(item) {
      // this.$router.currentRoute.meta.keepAlive = true;
      this.$router.push({
        path: "/search",
        query: {
          two_id: item.id,
          gradeNumber: item.gradeNumber
        }
      });
      // 从这里跳转之后从另一个view加载
      // this.$router.currentRoute.meta.keepAlive = false;
    },
    //获取品牌
    getBrand() {
      const userinfo =
        JSON.parse(window.localStorage.getItem("userinfo")) || [];
      brand({
        token: userinfo.token,
        cateOneId: this.tabId,
        pageNum: this.pageNum,
        pageSize: 10
      }).then((res) => {
        console.log(res, "pinpia");
        this.brandList = res.data.list;
      });
    },
    getPromotion() {
      getPromotionGoodsInfo({
        goodsCateLevelOne: this.tabId,
        status: 1
      }).then((res) => {
        if (res && res.errorCode == 1) {
          this.lists = this.lists.concat(res.data.content);
        }
      });
    },
    openlink() {},
    _getsGoodsTag() {
      getGoodsTabTwo({
        id: this.tabId,
        gradeNumber: 1
      }).then((res) => {
        if (res && res.errorCode === 1) {
          this.specialifon = res.data;
        }
      });
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
      var leftHeight = 0;
      var rightHeight = 0;
      if (this.$refs.goodsList1) {
        leftHeight = this.$refs.goodsList1.offsetHeight;
      }
      if (this.$refs.goodsList2) {
        rightHeight = this.$refs.goodsList2.offsetHeight;
      }
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
      this.pageNum += 1;
      this.orderrefresh = false;

      setTimeout(() => {
        this._getS();
      }, 500);
    },
    goNextPage(item) {
      console.log(item, "brandlist");
      this.$router.push({
        path: "/bands",
        query: {
          brandId: item.id,
          cateOneId: this.tabId
        }
      });
    },
    goMoreQg() {
      this.$router.push({
        path: "/purchase2",
        query: {
          tabId: this.tabId
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.contents {
  margin-top: 10px;
  background: linear-gradient(
      to right bottom,
      #ffe1e1 0.1%,
      transparent 20%,
      #fff 100%
    ),
    linear-gradient(to left bottom, #ffe1e1 0.1%, transparent 20%, #fff 100%);
  border-radius: 10px;
  padding: 10px 12px 21px 12px;
  p {
    font-size: 15px;
    color: #333333;
    margin-bottom: 10px;
  }
  .list {
    width: 100%;
    display: flex;
    flex-flow: wrap;
    justify-content: space-between;
    > div {
      width: 49%;
      border: 0.5px solid #e5e5e5;
      border-radius: 8px;
      padding-bottom: 8px;
      position: relative;
      margin-bottom: 11px;
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
      }
      h5 {
        color: #bb0000;
        font-size: 14px;
      }
    }
  }
}
.title_list {
  padding-top: 10px;
}
.preferential {
  border-radius: 9px;
  width: 100%;
  margin-top: 5px;
  .specialBox {
    display: flex;
    flex-wrap: wrap;
    .specialitem {
      width: 20%;
      padding: 10px 0;
      margin-top: 10px;
      .grid__icon {
        width: 50px;
        height: 50px;
        margin: 0 auto;
        img {
          width: 100%;
          height: 100%;
          border-radius: 10px;
        }
      }
      .grid__label {
        font-size: 13px;
        font-weight: 400;
        padding-top: 8px;
        text-align: center;
        color: rgba(0, 0, 0, 0.9);
      }
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
.content {
  background: #fff;
  padding: 12px 0 15px 12px;
  border-radius: 10px;
  margin: 10px 0;
  > ul {
    display: flex;
    justify-content: center;
    align-items: center;
    .title {
      font-size: 16px;
      color: #333333;
    }
    .square {
      width: 7px;
      height: 7px;
      background: #333333;
      margin: 6px;
      transform: rotate(45deg);
    }
  }
  .brand {
    overflow: hidden;
    overflow-x: auto;
    > ul {
      display: flex;
      li {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0 22px 0 0;
        p {
          font-size: 13px;
          color: #333333;
          margin-top: 16px;
        }
      }
    }
  }
  .brand::-webkit-scrollbar {
    display: none;
  }
}

.more {
  display: flex;
  justify-content: space-between;
  p {
    font-size: 11px;
    color: #666;
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
.preferential {
  border-radius: 9px;
  padding: 0;
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
}
.goodsbox {
  display: flex;
  justify-content: space-between;
  > div {
    width: 49%;
    height: fit-content;
  }
}
</style>
