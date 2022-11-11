<template>
  <div class="liveBroadcast">
    <div class="liveBroadcast_top">
      <div class="top_left">直播推荐</div>
      <div class="top_right" @click="goToLiveRoom">
        <img
          style="width: 16px; height: 16px; vertical-align: middle"
          :src="anchorInfo.url"
          alt=""
        />
        <span style="padding: 0 10px">{{ anchorInfo.liveName }}</span>
        <img
          style="width: 8px; height: 12px"
          src="../../assets/image/home/right.png"
          alt=""
        />
      </div>
    </div>
    <div class="liveBroadcast_content" @click="goToLiveRoom">
      <div class="content_top">
        <div class="explanation" v-if="listData[0]">
          <div class="explanation_top">
            <div>
              <!-- <div v-if="listData[0].liveFlag === 1">
                <div class="lives">
                  <div class="items"></div>
                  <div class="items"></div>
                  <div class="items"></div>
                </div>
              </div>
              <div v-else style="background: none">
                <img
                  style="margin-right: 2px; width: 16px; height: 16px"
                  :src="
                    require('../../assets/image/home/' +
                      typeImgFilter(listData[0].liveFlag) +
                      '.png')
                  "
                  alt=""
                />
              </div>
              <span>
                <p>商品{{ listData[0].liveFlag | liveTypeFilter }}</p>
              </span> -->
              <img
                :src="
                  require('../../assets/image/home/' +
                    ['waiting', 'living', 'already'][listData[0].liveFlag] +
                    '.png')
                "
                alt=""
              />
            </div>

            <img :src="listData[0].logoImgUrl" alt="" />
          </div>
          <div class="explanation_bottom">
            <p class="title">{{ listData[0].goodsName }}</p>
            <div class="price">
              <span v-if="listData[0].liveFlag === 2">
                <span style="color: #fe3746"
                  >售价 ￥{{ priceFun(listData[0].price) }}</span
                >
              </span>
              <span v-else
                >售价<span v-if="listData[0].flag === 1"
                  >￥{{ priceFun(listData[0].price) }}</span
                ><del v-else>￥{{ priceFun(listData[0].price) }}</del></span
              >
              <span v-if="listData[0].liveFlag !== 2"
                >直播价￥<span>{{
                  priceFun(
                    listData[0].flag === 1 ? "?" : listData[0].broadcastPrice
                  )
                }}</span>
              </span>
            </div>
            <div class="buy">
              已售 {{ salesFun(listData[0].liveBuyNum) }}件
              <span>抢<img src="../../assets/image/home/a.png" alt="" /></span>
            </div>
          </div>
        </div>
        <div class="noExplained">
          <div class="noExplained_no" v-if="listData[1]">
            <div class="no_title">
              <img
                style="margin-right: 2px"
                :src="
                  require('../../assets/image/home/' +
                    typeImgFilter(listData[1].liveFlag) +
                    '.png')
                "
                alt=""
              />
              {{ listData[1].liveFlag | liveTypeFilter }}
            </div>
            <div class="goods">
              <div>
                <img :src="listData[1].logoImgUrl" alt="" />
              </div>
              <div>
                <p class="goods_title">{{ listData[1].goodsName }}</p>
                <span v-if="listData[1].liveFlag !== 2"
                  >售价￥{{ priceFun(listData[1].price) }}</span
                >
                <span v-else
                  >已售 {{ priceFun(listData[1].liveBuyNum) }} 件</span
                >
                <div v-if="listData[1].liveFlag !== 2" class="bei">
                  <span> 直播价 </span>

                  <span
                    >￥{{
                      priceFun(
                        listData[1].flag === 1
                          ? "?"
                          : listData[1].broadcastPrice
                      )
                    }}</span
                  >
                </div>
                <div v-else class="bei">
                  <span> 售价 </span>

                  <span
                    >￥{{
                      priceFun(
                        listData[1].liveFlag !== 2
                          ? "?"
                          : priceFun(listData[1].price)
                      )
                    }}</span
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="noExplained_no" v-if="listData[2]">
            <div class="no_title">
              <img
                style="margin-right: 2px"
                :src="
                  require('../../assets/image/home/' +
                    typeImgFilter(listData[2].liveFlag) +
                    '.png')
                "
                alt=""
              />
              {{ listData[2].liveFlag | liveTypeFilter }}
            </div>
            <div class="goods">
              <div>
                <img :src="listData[2].logoImgUrl" alt="" />
              </div>
              <div>
                <p class="goods_title">{{ listData[2].goodsName }}</p>
                <span v-if="listData[2].liveFlag !== 2"
                  >售价￥{{ priceFun(listData[2].price) }}</span
                >
                <span v-else
                  >已售 {{ priceFun(listData[2].liveBuyNum) }} 件</span
                >
                <div v-if="listData[2].liveFlag !== 2" class="bei">
                  <span> 直播价 </span>

                  <span
                    >￥{{
                      priceFun(
                        listData[2].flag === 1
                          ? "?"
                          : listData[2].broadcastPrice
                      )
                    }}</span
                  >
                </div>
                <div v-else class="bei">
                  <span> 售价 </span>

                  <span
                    >￥{{
                      priceFun(
                        listData[2].liveFlag !== 2
                          ? "?"
                          : priceFun(listData[2].price)
                      )
                    }}</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="content_bottom">
        <div class="goodsItem" v-if="listData[3]">
          <div class="img_box">
            <img :src="listData[3].logoImgUrl" alt="" />
          </div>
          <div class="text_box">
            <div class="title">
              {{ listData[3].goodsName }}
            </div>
            <div class="price">
              <span> 售价 ￥ {{ priceFun(listData[3].price) }} </span>
              <span v-show="listData[3].liveFlag !== 2">
                直播价￥
                {{
                  priceFun(
                    listData[3].flag === 1 ? "?" : listData[3].broadcastPrice
                  )
                }}
              </span>
            </div>
          </div>
          <div class="buy">
            <div>已售{{ salesFun(listData[3].liveBuyNum) }}件</div>
            <div v-show="listData[3].collectStatus !== 1">
              {{ salesFun(listData[3].collect || 0) }}人想要
            </div>
            <div @click.stop="handleCollect(listData[3])">
              <img
                :src="
                  require(`../../assets/image/home/${
                    listData[3].collectStatus === 1 ? 'pinr' : 'xin'
                  }.png`)
                "
                alt=""
              />
              {{ listData[3].collectStatus === 1 ? "已想要" : "想要" }}
            </div>
          </div>
        </div>
        <div class="goodsItem" v-if="listData[4]">
          <div class="img_box">
            <img :src="listData[4].logoImgUrl" alt="" />
          </div>
          <div class="text_box">
            <div class="title">{{ listData[4].goodsName }}</div>
            <div class="price">
              <span> 售价 ￥ {{ priceFun(listData[4].price) }} </span>
              <span v-show="listData[4].liveFlag !== 2">
                直播价￥
                {{
                  priceFun(
                    listData[4].flag === 1 ? "?" : listData[4].broadcastPrice
                  )
                }}
              </span>
            </div>
          </div>
          <div class="buy">
            <div>已售{{ salesFun(listData[4].liveBuyNum) }}件</div>
            <div v-show="listData[4].collectStatus !== 1">
              {{ salesFun(listData[4].collect || 0) }}人想要
            </div>
            <div @click.stop="handleCollect(listData[4])">
              <img
                :src="
                  require(`../../assets/image/home/${
                    listData[4].collectStatus === 1 ? 'pinr' : 'xin'
                  }.png`)
                "
                alt=""
              />
              {{ listData[4].collectStatus === 1 ? "已想要" : "想要" }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="liveBroadcast_bottom" @click="goToLiveMore">
      <div>
        <img
          style="width: 10px; height: 11px"
          src="../../assets/image/home/j.png"
          alt=""
        />
        更多直播
        <img
          style="width: 6px; height: 9px"
          src="../../assets/image/home/black.png"
          alt=""
        />
      </div>
    </div> -->
  </div>
</template>

<script>
import { goodsAssociated, goodsCollect } from "@/api/index";
import { mapGetters } from "vuex";
import { salesFun, priceFun } from "@/utils/dom";
export default {
  name: "liveBroad",
  props: {
    anchorInfo: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      liveBaseUrl:
        process.env.NODE_ENV === "production"
          ? "https://passengerh5.lkkjjt.com"
          : "http://passengerh5.expection.cn",
      listData: [],
      isCollectClick: false
    };
  },
  computed: {
    ...mapGetters(["getuserinfo"])
  },
  created() {
    // this._goodsAssociated();
  },
  methods: {
    salesFun,
    priceFun,
    _goodsAssociated() {
      goodsAssociated({
        anchorId: this.anchorInfo?.anchorId,
        unionId: this.getuserinfo?.unionid,
        types: 2
      }).then((res) => {
        const {
          data: { list }
        } = res;
        this.listData = list;
      });
    },
    goToLiveRoom() {
      window.location.href = `${this.liveBaseUrl}/index/livehome?anchorId=${this.anchorInfo?.anchorId}&nowunionid=${this.anchorInfo?.nowunionid}&token=${this.getuserinfo?.token}`;
    },
    goToLiveMore() {
      window.location.href = `${this.liveBaseUrl}/index/live`;
    },
    typeImgFilter(liveFlag) {
      let result = "";
      switch (liveFlag) {
        case 0:
          result = "biao";
          break;
        case 1:
          result = "j";
          break;
        case 2:
          result = "yijiang";
          break;
        default:
          result = "";
          break;
      }
      return result;
    },
    async handleCollect(info) {
      if (this.isCollectClick) return;
      this.isCollectClick = true;
      const toast = this.$toast.loading({
        message: "加载中...",
        forbidClick: true
      });
      const { goodsId, collectStatus } = info;
      await goodsCollect({
        goodsId,
        unionid: this.getuserinfo?.unionid,
        flag: collectStatus === 1 ? 2 : 1
      });
      toast.clear();
      this.isCollectClick = false;
      this.$toast(collectStatus === 1 ? "取消收藏" : "收藏成功");
      this._goodsAssociated();
    }
  },
  filters: {
    liveTypeFilter(liveFlag) {
      return ["待讲解", "讲解中", "已讲解"][liveFlag];
    }
  }
};
</script>

<style lang="scss" scoped>
.liveBroadcast {
  margin: 10px 0;
  .liveBroadcast_top {
    display: flex;
    justify-content: space-between;
    .top_left {
      font-size: 17px;
      font-weight: bold;
      color: #161616;
    }
    .top_right {
      font-size: 14px;
      font-weight: 500;
      color: #555555;
      display: flex;
      align-items: center;
    }
  }
  .liveBroadcast_content {
    margin: 10px 0;

    .content_top {
      display: flex;
      justify-content: space-between;
      margin: 10px 0;
      > div {
        width: 49%;
        border-radius: 10px;
      }
      .explanation {
        background: #fff;
        position: relative;
        overflow: hidden;
        width: 172px;
        .explanation_top {
          > div {
            > img {
              position: absolute;
              top: 10px;
              left: 7px;
              height: 20px;
              object-fit: contain;
              object-position: left;
            }
            // display: flex;
            // background: #5f5f5f;
            // align-items: center;
            // border-radius: 12px;
            // width: 92px;
            // width: fit-content;
            > div {
              width: 26px;
              height: 20px;
              background: url("../../assets/image/home/tuoyuan.png");
              background-size: 100% 100%;
              display: flex;
              align-items: center;
              justify-content: center;
              position: relative;
              .lives {
                width: 20px;
                height: 10px;
                position: absolute;
                z-index: 10;
                top: 4px;
                left: 16px;
                transform: translateX(-50%) rotateX(180deg);
                .items {
                  width: 3px;
                  height: 13px;
                  background: rgb(255, 255, 255);
                  float: left;
                  border-radius: 0 0 5px 5px;
                  margin-right: 2px;
                }
                .items:nth-child(1) {
                  animation: wave 1s linear infinite alternate;
                }
                .items:nth-child(2) {
                  animation: wave 2s linear infinite alternate;
                }
                .items:nth-child(3) {
                  animation: wave 2.5s linear infinite alternate;
                }
                @keyframes wave {
                  10% {
                    height: 20%;
                  }
                  20% {
                    height: 60%;
                  }
                  40% {
                    height: 40%;
                  }
                  50% {
                    height: 100%;
                  }
                  100% {
                    height: 50%;
                  }
                }
              }
              p {
                font-size: 11px;
                color: #fff;
              }
            }
            p {
              font-size: 11px;
              font-weight: 500;
              color: #ffffff;
              margin: 0 6px 0 5px;
            }
          }
          img {
            width: 172px;
            height: 172px;
          }
        }
        .explanation_bottom {
          background: url("../../assets/image/home/f.png") no-repeat;
          background-size: 100% 100%;
          width: 100%;
          height: fit-content;
          padding: 10px;
          .title {
            font-size: 14px;
            color: #161616;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-weight: bold;
            // display: -webkit-inline-box;
            // text-overflow: ellipsis;
            // -webkit-line-clamp: 1;
            // -webkit-box-orient: vertical;
            // font-weight: bold;
          }
          .price {
            font-size: 11px;
            margin: 10px 0;
            span:nth-child(1) {
              font-size: 11px;
              font-weight: 500;
              color: #a1a1a1;
              padding-right: 10px;
            }
            span:nth-child(2) {
              font-size: 11px;
              font-weight: bold;
              color: #fe3746;
              span {
                font-size: 14px;
                color: #fe3746;
                font-weight: bold;
              }
            }
          }
          .buy {
            // width: 55%;
            width: fit-content;
            border-radius: 12px;
            color: #fff;
            font-size: 12px;
            font-weight: bold;
            background: linear-gradient(90deg, #ff5a70, #ff415c, #fe2744);
            padding: 5px;
            span {
              color: #fe3746;
              background: #fff;
              font-weight: bold;
              padding: 0 4px;
              border-radius: 12px;
              img {
                width: 5px;
                height: 7px;
                padding-left: 2px;
              }
            }
          }
        }
      }

      .noExplained {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 172px;
        > div {
          height: 48%;
          box-sizing: border-box;
          background: url("../../assets/image/home/daijia.png") no-repeat;
          background-size: 100% 100%;
        }
        .noExplained_no {
          font-size: 15px;
          font-weight: bold;
          color: #161616;

          .no_title {
            display: flex;
            justify-content: flex-end;
            padding: 10px;
            img {
              width: 14px;
              height: 14px;
            }
          }
          .goods {
            display: flex;
            height: 68%;
            margin: 0 4px;
            div:nth-child(2) {
              display: flex;
              flex-direction: column;
              justify-content: space-around;
              margin-left: 4px;
              box-sizing: border-box;
            }

            > div {
              width: 50%;
              span {
                font-size: 12px;
                font-weight: 500;
                color: #fe3746;
                display: inline-block;
                // margin: 10px 0;
                img {
                  width: 70px;
                  height: 15px;
                }
              }
            }
            .goods_title {
              font-size: 14px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              color: #161616;
              font-weight: bold;
            }
            img {
              width: 100%;
              height: 100%;
              border-radius: 6px;
            }
            .bei {
              font-size: 9px;
              padding: 5px 2px;
              display: flex;
              justify-content: space-between;
              > span:first-child {
                font-size: 9px;
                transform: scale(0.85) translateX(-1px);
                color: #fff;
              }
              span {
                color: rgba(254, 55, 70, 1);
              }
              background: url("../../assets/image/home/x.png") no-repeat;
              background-size: 100% 100%;
            }
          }
        }
      }
    }
    .content_bottom {
      display: flex;
      justify-content: space-between;

      > div {
        border-radius: 10px;
        width: 49%;
      }
      .goodsItem {
        width: 172px;
        background: #fff;
        height: fit-content;
        .img_box {
          img {
            width: 172px;
            height: 172px;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
          }
        }
        .text_box {
          padding: 0 5px;
          .title {
            font-size: 14px;
            font-weight: bold;
            color: #3c3c3c;
            line-height: 20px;
            display: -webkit-box !important;
            text-overflow: ellipsis;
            overflow: hidden;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            margin-bottom: 8px;
          }
          .price {
            font-size: 12px;
            font-weight: bold;
            color: #fe3746;
          }
        }
        .buy {
          padding: 10px 5px 0 5px;
          padding-top: 10px;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          > div {
            margin-bottom: 10px;
            padding: 0 3px;
            font-size: 12px;
            font-weight: 500;
            color: #a1a1a1;
            > img {
              width: 16px;
              // height: 15px;
              vertical-align: middle;
            }
          }
        }
      }
    }
  }
  .liveBroadcast_bottom {
    border-radius: 18px;
    margin-left: 35%;
    margin-top: 10px;
    display: flex;
    width: 113px;
    height: 35px;
    background: #fff;
    font-size: 14px;
    font-weight: 500;
    color: #161616;
    justify-content: center;
    align-items: center;
  }
}
</style>
