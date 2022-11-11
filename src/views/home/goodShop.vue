<template>
  <div class="moreCity">
    <div class="content">
      <div class="title_top"></div>
      <div class="content1" v-for="(item, index) in shopLists" :key="index">
        <div class="title_list">
          <div class="popular">
            <p>{{ item.name }}</p>
          </div>
          <div class="list">
            <div
              v-for="(item2, index) in item.goodsInfoList"
              :key="index"
              style="width: 101px"
            >
              <img :src="item2.logoImgUrl" width="101px " height="79px" />
              <div class="lay">{{ item2.goodsSales }}人购买</div>
              <div class="flooder">
                <h3>{{ item2.goodsName }}</h3>
                <div
                  class="price"
                  v-if="item2.voucherMoney"
                  style="display: flex; margin-top: 3px"
                >
                  <h5>¥{{ item2.showPrice }}</h5>
                  <span class="price dyjico">{{ item2.voucherMoney }} </span>
                </div>
                <div
                  class="price"
                  v-else
                  style="display: flex; margin-top: 3px"
                >
                  <h5>¥{{ item2.showPrice }}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getNearShop } from "api";
export default {
  data() {
    return {
      shopLists: []
    };
  },
  created() {
    this._getNearShop();
  },
  computed: {
    position() {
      return this.$store.getters.position;
    }
  },
  methods: {
    _getNearShop() {
      getNearShop({ cityId: this.position.adcode }).then((res) => {
        this.shopLists = this.shopLists.concat(res.data.content);
      });
    }
  }
};
</script>

<style scoped lang="scss">
.content {
  padding: 16px 12px 0 12px;

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
    background: linear-gradient(
        to right bottom,
        #ffdede 0.1%,
        transparent 20%,
        #fff 100%
      ),
      linear-gradient(to left bottom, #fff0f0 0.1%, transparent 20%, #fff 100%);
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
      width: 90%;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    .list {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      > div {
        border: 0.5px solid #e5e5e5;
        border-radius: 8px;
        padding-bottom: 8px;
        position: relative;
        margin-bottom: 5px;

        img {
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

        h5 {
          color: #bb0000;
          font-size: 14px;
        }
      }
    }
  }
}
.lay {
  background-image: linear-gradient(to right, #d10000, #ec0200);
  border-radius: 30px 0 50px 0;
  width: 60px;
  height: 14px;
  position: absolute;
  left: 0;
  top: 0;
  font-size: 9px;
  color: #fff;
  line-height: 14px;
  text-align: center;
}
</style>
