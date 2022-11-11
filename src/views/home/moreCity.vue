<!--
 * @Date: 2022-06-27 10:25:56
 * @LastEditors: baiyelatte baiyelatte@gmail.com
 * @LastEditTime: 2022-11-02 11:41:28
 * @FilePath: \mallh5\src\views\home\moreCity.vue
-->
<template>
  <div class="moreCity">
    <van-nav-bar
      :title="$route.meta.title"
      v-if="!$route.meta.CLAPP"
      left-arrow
      @click-left="$router.back()"
    />
    <div
      class="content"
      :style="{
        top:
          headerAttr.header === 1
            ? '46px'
            : `calc(96px + ${headerAttr.statusbar}px)`
      }"
    >
      <div class="title_top"></div>
      <div v-if="shopList.length > 0">
        <div class="content1" v-for="(item, index) in shopList" :key="index">
          <div class="title_list">
            <div class="popular">
              <p>{{ item.name }}</p>
              <div class="more" @click="goNextPage(item)">更多 ></div>
            </div>
            <div
              class="list"
              v-if="item.goodsVOList && item.goodsVOList.length > 0"
            >
              <div
                v-for="(item2, index) in item.goodsVOList"
                :key="index"
                @click="goDetail(item2)"
              >
                <img :src="item2.logoImgUrl" width="101px " height="79px" />
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
                  <div class="price" v-if="item2.canVoucherMoney">
                    <span
                      style="
                        line-height: 14px;
                        font-weight: 550;
                        font-size: 10px;
                        color: #bb0000;
                      "
                      >¥{{ item2.showPrice }}</span
                    >
                    <span class="price dyjico">{{ item2.voucherMoney }} </span>
                  </div>
                  <div
                    class="price"
                    v-if="
                      item2.canVoucherMoney == '' ||
                      item2.canVoucherMoney == null
                    "
                  >
                    <span
                      style="
                        line-height: 14px;
                        font-weight: 550;
                        font-size: 10px;
                        color: #bb0000;
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
      <div v-else>
        <van-empty description="暂无数据" />
      </div>
    </div>
  </div>
</template>

<script>
import { getCityType } from "api";
export default {
  data() {
    return {
      headerAttr: LukeappApi.getattribute(),
      shopList: []
    };
  },
  created() {
    console.log(this.$route.query.cityId);
    this._getMore();
  },
  methods: {
    goDetail(item2) {
      console.log(item2);
      this.$router.push({
        path: `/detail/${item2.goodsId}?agencyUnionid=${
          this.$route.query.agencyUnionid || null
        }&fromPlatform=${this.$route.query.fromPlatform || null}`
      });
    },
    _getMore() {
      const that = this;
      getCityType({
        status: 1,
        adCode: that.$route.query.cityId //城市id
      }).then((res) => {
        //  that.shopList = that.shopList.concat(res.data.content)
        that.shopList = res.data.content;
      });
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
    goNextPage(item) {
      console.log(item, "item3");
      this.$router.push({
        path: "/details",
        query: {
          cityId: item.id,
          shopName: item.name,
          cityName: item.name
        } //区级id
      });
    }
  }
};
</script>

<style scoped lang="scss">
.content {
  padding: 10px 12px 10px 12px;

  .title_top {
    display: flex;
    justify-content: space-between;
    align-items: center;
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
  .content1 {
    background: #fff;
    border-radius: 10px;
    padding: 10px 12px 21px 12px;
    margin-bottom: 5px;
    .popular {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
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
          margin: 3px 0 -6px 0;
        }
      }
    }
  }
}
.lay {
  background-image: linear-gradient(to right, #d10000, #ec0200);
  border-radius: 30px 0 50px 0;
  // width: 60px;
  height: 14px;
  position: absolute;
  left: 0;
  top: 0;
  font-size: 9px;
  color: #fff;
  line-height: 14px;
  text-align: center;
  padding: 0 5px;
}
</style>
