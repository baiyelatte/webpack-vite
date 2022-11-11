<template>
  <div
    class="shop-item"
    style="position: relative"
    :style="
      isRankingList ? 'background: radial-gradient(#FFE9C3, #FFA8A8);' : ''
    "
    @click="toShopHome"
  >
    <img
      v-if="isRankingList == false"
      class="shopIcon"
      :src="shopItem.logImage ?? ''"
      alt=""
    />
    <img
      v-if="isRankingList && index < 3"
      class="rankingListIcon"
      :src="rankingListIcon()"
      alt=""
    />
    <p
      v-else-if="isRankingList == true"
      class="rankingListIcon"
      style="color: #ff0000; font-size: 0.6rem"
    >
      {{ index + 1 }}
    </p>
    <img
      v-if="isRankingList"
      class="shopIcon"
      style="position: absolute; left: 1.6rem"
      :src="shopItem.logImage ?? ''"
      alt=""
    />
    <div
      class="content-box"
      :style="
        isRankingList
          ? 'padding-left: 0.5rem;border-left: 1px solid #FFFFFF;'
          : ''
      "
    >
      <div class="storeInformation">
        <div
          v-if="isRankingList"
          class="info-box"
          style="margin-left: 1.3rem; margin-bottom: 0.05rem"
        >
          <div>
            <h3 class="shopName">{{ shopItem.shopName ?? "nixx" }}</h3>
            <button
              v-if="!shopItem.favoriteFlag"
              class="focusOnButton"
              @click.stop="onFocus(shopItem)"
            />
            <button v-else class="unFollow" @click.stop="unFocus(shopItem)" />
          </div>
          <div>
            <van-rate
              v-model="starValue"
              allow-half
              readonly
              void-icon="star"
              void-color="#eee"
              size="0.3rem"
            />
            <span class="boughtNumber"
              >{{ shopItem.buyedUserCount ?? 0 }}人买过</span
            >
          </div>
        </div>

        <div v-else class="info-box">
          <div>
            <h3 class="shopName">{{ shopItem.shopName ?? "nixx" }}</h3>
            <button
              v-if="!shopItem.favoriteFlag"
              class="focusOnButton"
              @click.stop="onFocus(shopItem)"
            />
            <button v-else class="unFollow" @click.stop="unFocus(shopItem)" />
          </div>
          <div>
            <van-rate
              v-model="starValue"
              allow-half
              readonly
              void-icon="star"
              void-color="#eee"
              size="0.3rem"
            />
            <span class="boughtNumber"
              >{{ shopItem.buyedUserCount ?? 0 }}人买过</span
            >
          </div>
        </div>
      </div>

      <div class="shopGoodList">
        <div
          @click.stop="handleJumpGoodInfo(item)"
          class="goodInfo"
          v-for="item in shopItem.goodsInfoList"
          :key="item.goodsId"
        >
          <template v-if="shopItem.goodsInfoList != null">
            <img class="goodImg" :src="item.goodsImage" alt="" />
            <p class="goodPrice">￥{{ item.salePrice ?? 8.88 }}</p>
          </template>
        </div>
        <div
          v-if="shopItem.goodsInfoList && shopItem.goodsInfoList.length == 3"
          class="more"
        >
          <span>查看更多</span>
          <img src="../../assets/image/more.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onActivated, ref } from "vue";
import { Toast } from "vant";
import { shopAttention, shopNoAttention } from "@/api";
import { getRankIndexV2 } from "@/api";
import router from "@/router";
const props = defineProps({
  shopItem: {
    type: Object,
    default: () => {}
  },
  isRankingList: {
    type: Boolean,
    default: false
  },
  index: {
    type: Number,
    default: 1
  }
});
const emit = defineEmits(["changeAttention"]);
const rankingListIcon = () => {
  switch (props.index) {
    case 0:
      return require("../../assets/image/newVersion/ONE.png");
    case 1:
      return require("../../assets/image/newVersion/TWO.png");
    case 2:
      return require("../../assets/image/newVersion/THREE.png");
  }
};
const focusButtonStyle = {
  width: "1.8rem",
  height: "0.7rem"
};

const starValue = ref(props.shopItem.startCount ?? 0);
const onFocus = async (item) => {
  Toast.loading({
    message: "加载中...",
    forbidClick: true
  });
  await shopAttention({ shopId: item.shopId });
  await emit("changeAttention", props.isRankingList);
  Toast.clear();
};
const unFocus = async (item) => {
  Toast.loading({
    message: "加载中...",
    forbidClick: true
  });
  await shopNoAttention({ shopId: item.shopId });
  await emit("changeAttention", props.isRankingList);
  Toast.clear();
};
const toShopHome = () => {
  router.push({
    name: `shopinfo`,
    params: {
      shopId: props.shopItem.shopId
    }
  });
};
const handleJumpGoodInfo = (item) => {
  router.push({
    name: `detail`,
    params: {
      id: item.goodsId
    }
  });
};
// setTimeout(() => {
//   console.log(props.shopItem);
// }, 2000);
</script>

<style lang="scss" scoped>
.shop-item {
  display: flex;
  margin-bottom: 10px;
  background: white;
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  overflow: hidden;
  .rankingListIcon {
    width: 21px;
    height: 27.5px; //27.5
    text-align: center;
    margin: auto;
    margin-right: 9.5px;
  }
  .shopIcon {
    background: #d8d8d8;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    margin-right: 5px;
  }
  .content-box {
    flex: 1;
    > div {
      position: relative;
    }

    .storeInformation {
      display: flex;
      .info-box {
        display: flex;
        flex-direction: column;
        > div {
          display: flex;
          align-items: center;
        }
        .shopName {
          color: #333333;
          font-size: 14px;
          padding-top: 0px;
        }
        > div:first-child {
          padding: 5px 0;
          > button {
            width: 60px;
            height: 25px;
            position: absolute;
            right: 0;
            top: 0;
            background-color: transparent;
            background-size: contain;
            background-repeat: no-repeat;
          }
        }
        .focusOnButton {
          background-image: url("../../assets/image/shopFocus.png");
        }
        .unFollow {
          background-image: url("../../assets/image/shopUnFollow.png");
        }
        .boughtNumber {
          color: #999999;
          font-size: 11px;
          margin-left: 10px;
        }
      }
    }
    .shopGoodList {
      margin-top: 10px;
      display: flex;
      > div {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .goodInfo {
        flex-direction: column;
        margin-right: 8px;
        .goodImg {
          width: 65px;
          height: 65px;
          border-radius: 8px;
        }
        .goodPrice {
          color: #f43030;
          font-size: 14px;
          font-weight: 550;
          margin-top: 8px;
        }
      }
      .more {
        > span {
          color: #e90b8d;
          margin-right: 2px;
          font-size: 11px;
        }
        > img {
          width: 13px;
          height: 13px;
        }
      }
    }
  }
}
</style>
