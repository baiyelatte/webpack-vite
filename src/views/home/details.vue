<template>
  <div class="main-home category-home">
    <CommonHeader />
    <van-nav-bar
      :title="cityName"
      v-if="!$route.meta.CLAPP"
      left-arrow
      @click-left="$router.back()"
    />
    <div
      class="category-bodys"
      :style="{
        top:
          headerAttr.header === 1
            ? '46px'
            : `calc(96px + ${headerAttr.statusbar}px)`
      }"
    >
      <!-- 左侧tab栏 -->
      <div class="tab-side">
        <van-sidebar
          class="sidebar_title"
          v-model="activeKey"
          @change="onChange"
        >
          <van-sidebar-item
            v-for="(item, index) in cateList"
            :key="index"
            :title="item.goods_cate_level_one_name"
          />
        </van-sidebar>
      </div>
      <!-- 右侧商品区 -->
      <div class="goods" ref="category_right">
        <van-empty
          style="height: 100%"
          description="暂无数据"
          v-if="itemList && itemList.length == 0"
        />
        <div v-else>
          <div class="category_group box-flex">
            <div class="box">
              <div
                class="product"
                v-for="(items, index) in itemList"
                :key="index"
                @click="_goods(items)"
              >
                <div class="img">
                  <img class="big" v-lazy="items.logoImgUrl" alt="" />
                </div>
                <div class="sale" v-if="items.buyNumber">
                  {{ items.buyNumber }}人已买
                </div>
                <div class="name">{{ items.goodsName }}</div>
                <div class="price" v-if="items.linePrice">
                  <div class="show-price">¥{{ items.showPrice }}</div>
                  <div class="line-price">¥{{ items.linePrice }}</div>
                </div>
                <div class="price" v-if="items.voucherMoney">
                  <div class="show-price">¥{{ items.showPrice }}</div>
                  <div class="price dyjico">
                    {{ items.voucherMoney }}
                  </div>
                </div>
                <!-- <div class="biaoqian" v-if="items.personalityTags">
                  {{ items.personalityTags }}
                </div> -->
                <div class="bqLists" v-if="items.personalityTags.length > 0">
                  <div
                    class="biaoqian"
                    v-for="item3 in items.personalityTags.split(',')"
                  >
                    {{ item3 }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { getGoodsLevel, shopCate, shopGoods } from "api";
import Header from "@/components/Header";
import CommonHeader from "@/components/CommonHeader.vue";
export default {
  name: "category",
  components: {
    Header,
    CommonHeader
  },
  data() {
    return {
      headerAttr: LukeappApi.getattribute(),
      activeKey: 0,
      categdata: null,
      itemList: [],
      scroll: 0, // 子页面回来的父页面位置
      cateList: [],
      cateId: "",
      shopName: this.$route.query.shopName || "",
      cityName: this.$route.query.cityName || ""
    };
  },
  computed: {},
  methods: {
    getShopCate() {
      shopCate({
        cityId: this.$route.query.cityId
      }).then((res) => {
        this.cateList = res.data.content;
        if (res.data.content.length > 0) {
          //第一次进来
          this.onChange(0);
        }
      });
    },
    getShopGoods(id) {
      shopGoods({
        cityId: this.$route.query.cityId,
        goodsCateLevelOne: id
      }).then((res) => {
        this.itemList = res.data.content; //
      });
    },
    handleTitle() {},
    onChange(index) {
      this.getShopGoods(this.cateList[index].goods_cate_level_one);
      this.$refs.category_right.scrollTop = 0;
    },
    _goods(data) {
      this.scroll = this.$refs.category_right.scrollTop;
      console.log(data, "data");
      this.$router.push({
        path: `/detail/${data.goodsId}?agencyUnionid=${
          this.$route.query.agencyUnionid || null
        }&fromPlatform=${this.$route.query.fromPlatform || null}`
      });
    }
  },
  created() {
    // this._getsGoodsCateLevel();
    this.getShopCate();
    this.getShopGoods(); //
  },
  activated() {
    this.$refs.category_right.scrollTop = this.scroll;
  }
};
</script>

<style scoped lang="scss">
.sidebar_title {
  background: #f7f8fa;
}
.box-flex {
  display: -webkit-box;
  display: flex;
}
.category-home {
  height: 100vh;
  .category_title {
    background: #fff;
    font-size: 14px;
    text-align: center;
    font-weight: 400;
    margin-top: 12px;
    height: 1.28rem;
    line-height: 1.28rem;
    overflow: hidden;
    span {
      position: relative;
    }
    span:before {
      content: "";
      position: absolute;
      top: 50%;
      left: 0;
      width: 0.4rem;
      border-top: 1px solid #e0e0e0;
      transform: translate3d(-150%, -50%, 0);
      -webkit-transform: translate3d(-150%, -50%, 0);
    }
    span:after {
      content: "";
      position: absolute;
      top: 50%;
      left: auto;
      right: 0;
      width: 0.4rem;
      border-top: 1px solid #e0e0e0;
      transform: translate3d(150%, -50%, 0);
      -webkit-transform: translate3d(150%, -50%, 0);
    }
  }
  .category_group {
    background: #fff;
    margin: -0.06rem 0 0;
    .box {
      width: 100%;
      overflow: hidden;
      display: flex;
      flex-wrap: wrap;
      // justify-content: space-around;
    }
    .product {
      flex-shrink: 0;
      width: 45%;
      // text-align: center;
      margin-top: 10px;
      // margin-bottom: 8px;
      overflow: hidden;
      border-radius: 5px;
      border: 0.5px solid #e5e5e5;
      padding-bottom: 10px;
      padding-top: 5px;
      position: relative;
      margin-left: 2%;
      .img {
        width: 99%;
        height: 100px;
        margin: 0 auto;
        background: #fff;
        overflow: hidden;
        position: relative;
        border-radius: 5px;
        .big {
          display: block;
          width: 100%;
          height: auto;
        }
      }
      .name {
        margin-top: 14px;
        font-size: 13px;
        color: #333;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding: 0 3px;
        font-weight: 500%;
        margin-left: 5px;
      }
      .price {
        display: flex;
        font-size: 14px;
        // justify-content: center;
        margin-left: 10px;
        margin-top: 3px;
        align-items: baseline;
        .line-price {
          color: #999999;
          text-decoration: line-through;
        }
        .show-price {
          color: #bb0000;
          margin-right: 3px;
        }
        .dyjico {
          margin-left: -5px;
        }
      }
      .bqLists {
        display: flex;
        flex-wrap: wrap;
        // margin-top: 6px;
        padding-left: 4px;
        margin-left: 3px;
      }
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
    .sale {
      position: absolute;
      top: 0;
      left: 0;
      width: 60px;
      height: 14px;
      background: linear-gradient(90deg, #d10000 0%, #ec0200 100%);
      border-radius: 14px 0px 100px 0px;
      color: #fff;
      font-size: 10px;
      padding: 2px;
    }
  }
  .category-bodys {
    position: absolute;
    top: 45px;
    bottom: 0;
    left: 0;
    right: 0;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    display: flex;
    .tab-side {
      // position: fixed;
      // top: 46px;
      //
      // padding-bottom: 50px;
      width: 80px;
      height: 100%;
      background-color: #eee;
    }
    .goods {
      width: 100%;
      height: 100%;
      background-color: #fff;
      // padding:0 14px 0 94px;
      overflow-x: hidden;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      flex: 1;
    }
  }
  .van-sidebar {
    height: 100%;
    .van-sidebar-item {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
</style>
