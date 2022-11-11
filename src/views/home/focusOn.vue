<template>
  <div class="moreCity">
    <div class="content">
      <div class="title_top"></div>
      <div class="content1">
        <div class="title_list">
          <div class="popular">
            <img
              src="../../assets/image/common/shopbg.png"
              width="50px"
              height="50px"
            />
            <div class="introduce">
              <p>吴姐杂货铺</p>
              <div>
                店铺简介店铺简介店铺简介店铺简介店铺简介呈现出v正常的撒旦撒吃撒从
              </div>
            </div>
          </div>
          <div class="list">
            <div>
              <img
                src="../../assets/image/common/shopbg.png"
                width="101px "
                height="79px"
              />
              <div class="lay">999人购买</div>
              <div class="flooder">
                <h3>商品标题商品…</h3>

                <h5>¥9999.99</h5>
              </div>
            </div>
            <div>
              <img
                src="../../assets/image/common/shopbg.png"
                width="101px "
                height="79px"
              />
              <div class="lay">999人购买</div>
              <div class="flooder">
                <h3>商品标题商品…</h3>

                <h5>¥9999.99</h5>
              </div>
            </div>
            <div>
              <img
                src="../../assets/image/common/shopbg.png"
                width="101px "
                height="79px"
              />
              <div class="lay">999人购买</div>
              <div class="flooder">
                <h3>商品标题商品…</h3>

                <h5>¥9999.99</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="content1">
        <div class="title_list">
          <div class="popular">
            <img
              src="../../assets/image/common/shopbg.png"
              width="50px"
              height="50px"
            />
            <div class="introduce">
              <p>吴姐杂货铺</p>
              <div>店铺简介店铺简介店铺简介店铺简介店铺简介</div>
            </div>
          </div>
          <div class="list">
            <div>
              <img
                src="../../assets/image/common/shopbg.png"
                width="101px "
                height="79px"
              />
              <div class="lay">999人购买</div>
              <div class="flooder">
                <h3>商品标题商品…</h3>

                <h5>¥9999.99</h5>
              </div>
            </div>
            <div>
              <img
                src="../../assets/image/common/shopbg.png"
                width="101px "
                height="79px"
              />
              <div class="lay">999人购买</div>
              <div class="flooder">
                <h3>商品标题商品…</h3>

                <h5>¥9999.99</h5>
              </div>
            </div>
            <div>
              <img
                src="../../assets/image/common/shopbg.png"
                width="101px "
                height="79px"
              />
              <div class="lay">999人购买</div>
              <div class="flooder">
                <h3>商品标题商品…</h3>

                <h5>¥9999.99</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
  </div>
</template>

<script>
import { getsSlideshow, getsGoodsTag, getrecommend } from "api";
import GoodItem from "@/components/goods/goodItem";
export default {
  data() {
    return {
      goodsList1: [],
      goodsList2: [],
      goodslist: [],
      pageNum: 1,
      pageSize: 20
    };
  },
  components: {
    GoodItem
  },
  created() {
    this._getS();
  },
  methods: {
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
    }
  }
};
</script>

<style scoped lang="scss">
.content {
  padding: 16px 12px 10px 12px;

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
      margin-bottom: 12px;
      align-items: center;
      img {
        border-radius: 250px;
        margin-right: 12px;
      }
      .introduce {
        div {
          font-size: 11px;
          color: #666666;
          line-height: 16px;
        }
      }
    }
    p {
      font-size: 15px;
      color: #333333;
      margin-bottom: 10px;
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
    }
  }
}
</style>
