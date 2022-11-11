<template>
  <router-layout>
    <div
      class="main-home comes"
      :style="{
        marginTop: `${headerAttr.header == 2 ? headerAttr.statusbar + 46 : 0}px`
      }"
    >
      <CommonHeader />
      <div class="home-bodys" ref="beatHome">
        <download ref="download"></download>
        <!-- <Header :isHome="true" /> -->
        <!-- 下拉刷新 -->
        <van-pull-refresh
          v-model="refreshing"
          :head-height="80"
          @refresh="onRefresh"
          style="background-color: #f7f8fa"
        >
          <!-- 下拉提示，通过 scale 实现一个缩放效果 -->
          <template #pulling="props">
            <img
              class="Loading"
              src="@/assets/image/common/Loading.png"
              :style="{ transform: `scale(${props.distance / 80})` }"
            />
          </template>

          <!-- 释放提示 -->
          <template #loosing>
            <img class="Loading" src="@/assets/image/common/Loading.png" />
          </template>

          <!-- 加载提示 -->
          <template #loading>
            <img class="Loading" src="@/assets/image/common/Loading.png" />
          </template>
          <!-- <div v-if="addBgc == true" style="width: 100%; height: 100px"></div> -->
          <!--  :style="
              'background: top/cover url(' +
              (weather.background
                ? cltfiledomain + weather.background
                : require('@/assets/image/home/topPic2.png')) +
              ') no-repeat'
            " -->
          <div
            ref="topBox"
            class="top"
            :style="
              'background: top/cover url(' +
              cityInfo.cityLogo +
              ') no-repeat;background-size: 100% 100%;'
            "
          >
            <div class="orderNew" v-show="activeIndex == 0">
              <van-swipe
                class="my-swipe"
                :autoplay="3000"
                :show-indicators="false"
                indicator-color="white"
                vertical
                v-if="swipeLists && swipeLists.length > 0"
              >
                <van-swipe-item
                  v-for="(item, index) in swipeLists"
                  :key="index"
                >
                  <div class="swipe">
                    <img
                      :src="
                        item.photo.includes('https://file.expection.cn')
                          ? 'http://mallres.lkkjjt.com/dev_1633931578083'
                          : item.photo
                      "
                      alt=""
                    />
                    <div class="nick">
                      <p>
                        <span
                          >最新订单来自{{
                            item.phone.replace(
                              /.{3}(.+)?/,
                              (match, p1, p2, p3, offset, string) =>
                                match.replace(p1, '')
                            )
                          }}</span
                        ><span class="star">****</span>
                      </p>
                    </div>
                  </div>
                </van-swipe-item>
              </van-swipe>
            </div>

            <p class="head">
              <span @click="$router.push('address')">
                <span>{{
                  cityInfo.cityName ?? (position.province || '北京')
                }}</span>

                <img
                  src="../../assets/image/common/xl.png"
                  width="6.5px"
                  height="3.5px"
                />
                <span class="weather">
                  <i>{{ weather.weather }} {{ weather.temperature }}℃ </i>
                </span>
              </span>
              <template>
                <div class="city_a">
                  <!-- <img
                  src="../../assets/image/common/hb.png"
                  width="36px"
                  height="25px"
                  @click="$router.push('/shares')"
                /> -->
                  <div class="city_b" @click="cityOnclick">
                    <img
                      src="../../assets/image/common/cs.png"
                      width="10px"
                      height="11px"
                    /><span>城市名片 ></span>
                  </div>
                </div>
              </template>
            </p>

            <div class="search_content">
              <div class="search_left" @click="handleSearch">
                <img
                  src="@/assets/image/home/fdj.png"
                  width="14px"
                  height="14px"
                />
                <span>购城市特产，就上诚聊购</span>
              </div>
              <div class="search_right">
                <div></div>
                <img
                  src="@/assets/image/home/sy.png"
                  width="18px"
                  height="16.5px"
                  @click="goToScanner"
                />
              </div>
            </div>
            <div class="openShop">
              <img src="@/assets/image/home/shop.png" alt="" />
              <p @click="$router.push('/comeToEnjoy')">我也要开店</p>
              <van-icon name="arrow" size="0.35rem" />
            </div>
            <!-- <div class="subcategory" ref="subcategory">
            <van-tabs
              v-model="activeIndexComputed"
              line-width="19px"
              @click="activeNameClick"
            >
              <van-tab
                :title="item.name"
                v-for="(item, index) in tabList"
                :key="index"
              ></van-tab>
            </van-tabs>
            <div class="subcategory_label" @click="$router.push('category')">
              <img
                src="../../assets/image/home/fl.png"
                width="15px"
                height="14px"
              />
              <div>分类</div>
            </div>
          </div> -->
          </div>

          <!-- 优惠专区 -->

          <div class="goTop" v-if="activeIndex == 0">
            <banners :tabId="tabId" />
            <div
              class="preferential"
              style="background: #fff; position: relative"
            >
              <Special :speicaldata="specialifon" />
            </div>
            <!-- 线上线下开店 -->
            <!-- <div class="openShop">
              <div class="left">
                <div class="tit" @click="joinBd">
                  <div class="tit1">本地商家入驻</div>
                  <div class="tit2">点击报名</div>
                </div>
                <img
                  class="icon"
                  src="../../assets/image/home/bdIcon.png"
                  alt=""
                />
              </div>
              <div class="right">
                <div class="tit" @click="joinWd">
                  <div class="tit1">网店入驻</div>
                  <div class="tit2">点击报名</div>
                </div>
                <img
                  class="icon"
                  src="../../assets/image/home/xsIcon.png"
                  alt=""
                />
              </div>
            </div> -->

            <div class="activitys">
              <!-- 城市店铺榜 -->
              <div class="killActivity">
                <!-- <div class="kill_top" v-if="flgT">
                <div class="titleM">秒杀活动</div> -->
                <!-- <div style="color: #333; font-size: 11px">
                    {{ datatime }}点场
                  </div> -->
                <!-- <div class="bei">
                  <van-count-down
                    @finish="finish"
                    v-if="countdown > 86400000"
                    :time="countdown"
                    format="DD天HH:mm:ss"
                  >
                  </van-count-down>
                  <van-count-down
                    @finish="finish"
                    v-else
                    :time="countdown"
                    format="HH:mm:ss"
                  >
                  </van-count-down>
                </div> -->
                <!-- </div> -->
                <!-- <div
                class="bei0"
                style="display: flex; justify-content: start"
                v-else
              > -->
                <!-- <div class="titleM">秒杀活动</div> -->
                <!-- <div style="color: #333; font-size: 11px">
                    {{ datatime }}点场
                  </div> -->
                <!-- </div> -->
                <!-- <div v-if="activitylist && activitylist.length > 0" class="mSha"> -->
                <div
                  class="killActivityIMG"
                  @click="$router.push('/rankingList')"
                >
                  <template v-if="cityShopList?.length == 0">
                    <van-image
                      style="width: 100%; height: 100%"
                      fit="cover"
                      radius="10px"
                      :src="bigLookForwardIMG"
                    >
                      <template v-slot:loading>
                        <van-loading type="spinner" size="20" />
                      </template>
                    </van-image>
                  </template>
                  <template v-else>
                    <van-image
                      class="ITEMimg1"
                      fit="cover"
                      radius="10px"
                      :src="
                        cityShopList?.length > 0
                          ? cityShopList[0]?.logImage ??
                            require('@/assets/image/newVersion/miniLookForward.png')
                          : require('@/assets/image/newVersion/miniLookForward.png')
                      "
                    >
                      <template v-slot:loading>
                        <van-loading type="spinner" size="20" />
                      </template>
                    </van-image>
                    <van-image
                      class="ITEMimg2"
                      fit="cover"
                      radius="10px"
                      :src="
                        cityShopList?.length > 0
                          ? cityShopList[1]?.logImage ??
                            require('@/assets/image/newVersion/miniLookForward.png')
                          : require('@/assets/image/newVersion/miniLookForward.png')
                      "
                    >
                      <template v-slot:loading>
                        <van-loading type="spinner" size="20" />
                      </template>
                    </van-image>
                  </template>
                </div>
                <!-- v-if="flgT" -->
                <div
                  class="killActivityIMG"
                  style="margin-top: 10px"
                  @click="$router.push('/newExclusive')"
                >
                  <div class="exclusiveIMG">
                    <van-image
                      fit="cover"
                      radius="10px"
                      :src="
                        newUserBuyImg ??
                        require('@/assets/image/newVersion/miniLookForward.png')
                      "
                    >
                      <template v-slot:loading>
                        <van-loading type="spinner" size="20" />
                      </template>
                    </van-image>
                  </div>
                  <div class="exclusive">
                    <img
                      :src="
                        require('@/assets/image/newVersion/doubleElevenHappy.png')
                      "
                      alt=""
                      class="exclusiveImg"
                    />
                    <p class="titleM">新人专享</p>
                    <div class="exclusiveDiv"></div>
                  </div>
                  <!-- <div>
                  <div
                    v-for="(item, index) in activitylist"
                    :key="index"
                    @click="
                      goDetail(
                        item.goodsId,
                        list.id,
                        '',
                        '',
                        '',
                        item.skuKillInventory
                      )
                    "
                  >
                    <img :src="item.logoImgUrl" alt="" />
                    <div v-if="flgT">
                      <div>
                        <span class="mS1"
                          ><del>￥{{ item.showPrice }}</del></span
                        >
                        <span class="mS2">￥{{ item.skuKillPrice }}</span>
                      </div>
                    </div>
                  </div>
                </div> -->
                </div>
                <!-- <div class="ditu" v-else></div> -->
                <!-- <div class="moreG" @click="more">
                <img
                  class="iconM"
                  src="../../assets/image/common/skill.png"
                  alt=""
                />
                <span> 秒杀专区</span>
                <img
                  class="icon1"
                  src="../../assets/image/common/jian.png"
                  alt=""
                />
              </div> -->
              </div>
              <!-- 特产秒杀 -->
              <div class="officialSubsidy">
                <div class="kill" @click="more">
                  <div class="kill_top">
                    <div class="titleM">特产秒杀</div>
                    <div class="bei">
                      <van-count-down
                        :style="`transform: scale(${
                          width <= 375 ? '0.7' : width >= 768 ? '0.9' : '0.8'
                        })`"
                        @finish="finish"
                        v-if="countdown > 86400000"
                        :time="countdown"
                        format="DD天HH:mm:ss"
                      >
                      </van-count-down>
                      <van-count-down
                        :style="`transform: scale(${
                          width <= 375 ? '0.7' : width >= 768 ? '0.9' : '0.8'
                        })`"
                        @finish="finish"
                        v-else
                        :time="countdown"
                        format="HH:mm:ss"
                      >
                      </van-count-down>
                    </div>
                  </div>
                  <div class="killActivityIMG">
                    <template v-if="activitylist?.length > 0">
                      <div
                        v-for="(item, index) in activitylist"
                        :key="index"
                        class="ITEMimg1"
                      >
                        <van-image
                          :class="item.logoImgUrl ? 'ITEMimg1' : ''"
                          fit="cover"
                          radius="10px"
                          :src="
                            item.logoImgUrl ??
                            require('@/assets/image/newVersion/miniLookForward.png')
                          "
                        >
                          <template v-slot:loading>
                            <van-loading type="spinner" size="20" />
                          </template>
                        </van-image>
                        <van-image
                          v-if="activitylist.length === 1"
                          class="ITEMimg1"
                          fit="cover"
                          radius="10px"
                          :src="
                            item.logoImgUrl ??
                            require('@/assets/image/newVersion/miniLookForward.png')
                          "
                        >
                          <template v-slot:loading>
                            <van-loading type="spinner" size="20" />
                          </template>
                        </van-image>
                      </div>
                    </template>
                    <template v-else>
                      <div>
                        <van-image
                          class="ITEMimg"
                          fit="cover"
                          radius="10px"
                          :src="
                            require('@/assets/image/newVersion/bigLookForward.png')
                          "
                        >
                          <template v-slot:loading>
                            <van-loading type="spinner" size="20" />
                          </template>
                        </van-image>
                      </div>
                    </template>
                  </div>
                </div>
                <div class="subsidies" @click="$router.push('/offcialSubsidy')">
                  <div class="kill_top">
                    <div class="titleM">官方补贴</div>
                  </div>
                  <div class="killActivityIMG">
                    <template v-if="subsidyList.length > 0">
                      <div
                        v-for="(item, index) in subsidyList"
                        :key="index"
                        class="ITEMimg1"
                      >
                        <van-image
                          :class="item.goodsInfo.logoImgUrl ? 'ITEMimg1' : ''"
                          fit="cover"
                          radius="10px"
                          :src="
                            item.goodsInfo.logoImgUrl ??
                            require('@/assets/image/newVersion/miniLookForward.png')
                          "
                        >
                          <template v-slot:loading>
                            <van-loading type="spinner" size="20" />
                          </template>
                        </van-image>
                        <van-image
                          v-if="subsidyList.length === 1"
                          class="ITEMimg1"
                          fit="cover"
                          radius="10px"
                          :src="
                            item.goodsInfo.logoImgUrl ??
                            require('@/assets/image/newVersion/miniLookForward.png')
                          "
                        >
                          <template v-slot:loading>
                            <van-loading type="spinner" size="20" />
                          </template>
                        </van-image>
                      </div>
                    </template>
                    <template v-else>
                      <div>
                        <van-image
                          v-if="subsidyList.length === 0"
                          class="ITEMimg"
                          fit="cover"
                          radius="10px"
                          :src="
                            require('@/assets/image/newVersion/bigLookForward.png')
                          "
                        >
                          <template v-slot:loading>
                            <van-loading type="spinner" size="20" />
                          </template>
                        </van-image>
                      </div>
                    </template>
                  </div>
                </div>
                <!-- <div v-else class="ditu"></div> -->
                <!-- <div class="moreG" @click="$router.push('/offcialSubsidy')">
                <img
                  class="iconM"
                  src="../../assets/image/common/gift.png"
                  alt=""
                />
                <span> 更多福利</span>
                <img
                  class="icon1"
                  src="../../assets/image/common/osi.png"
                  alt=""
                />
              </div> -->
              </div>
            </div>
            <!-- 直播 -->
            <div>
              <liveBroad
                ref="liveBroad"
                v-if="anchorInfo && anchorInfo.signs !== 0"
                :anchorInfo="anchorInfo"
              />
            </div>
            <!-- <div class="lives" @click="goToLiveRoom">
            <div>
              <img
                src="../../assets/image/common/livess.png"
                width="11px"
                height="12px"
              /><span>更多直播 ></span>
            </div>
          </div> -->
            <!-- 好友推荐 -->
            <div
              class="recommend"
              v-if="shareGoodsList && shareGoodsList.length > 0"
            >
              <div class="recommend_title">
                <p>好友推荐</p>
                <div @click="goClk">
                  <img :src="shareHeadPic" alt="" class="shareHeader" />
                  <span>来自{{ shareShopName }}的推荐 ></span>
                </div>
              </div>
              <!-- 为您推荐 -->
              <div class="preferential">
                <div class="goodsbox">
                  <div class="goodsBoxL">
                    <template v-for="(item, index) in shareGoodsList">
                      <div
                        class="goodItem"
                        :key="item.goodsId"
                        v-if="index % 2 == 0"
                        @click="getDetails(item.goodsId)"
                      >
                        <img class="shopImg" :src="item.logoImgUrl" alt="" />
                        <div class="shopTitle">{{ item.goodsName }}</div>
                        <div v-if="item.templateId == 1">
                          <div
                            v-if="item.canVoucherMoney"
                            class="flexBox shopTxt"
                          >
                            <div class="price">¥{{ item.payMoney }}</div>
                            <span class="linePrice"
                              >¥{{ item.showPrice }}
                            </span>
                          </div>
                          <div v-else class="flexBox shopTxt">
                            <div class="price">¥{{ item.showPrice }}</div>
                            <span class="linePrice"
                              >¥{{ item.linePrice }}
                            </span>
                          </div>
                        </div>

                        <div
                          v-else-if="item.templateId == 2"
                          class="flexBox shopTxt"
                        >
                          <div class="price">¥{{ item.showPrice }}</div>
                          <span class="linePrice">¥{{ item.linePrice }} </span>
                        </div>

                        <div v-else>
                          <div
                            v-if="item.canVoucherMoney"
                            class="flexBox shopTxt"
                          >
                            <div class="price">¥{{ item.payMoney }}</div>
                            <span class="linePrice"
                              >¥{{ item.showPrice }}
                            </span>
                          </div>
                          <div v-else class="flexBox shopTxt">
                            <div class="price">¥{{ item.showPrice }}</div>
                            <span class="linePrice"
                              >¥{{ item.linePrice }}
                            </span>
                          </div>
                        </div>

                        <div class="sale">
                          <div class="num">已售{{ item.buyNumber }}件</div>
                        </div>
                      </div>
                    </template>
                  </div>
                  <div class="goodsBoxR">
                    <template v-for="(item, index) in shareGoodsList">
                      <div
                        class="goodItem"
                        :key="item.goodsId"
                        v-if="index % 2 != 0"
                        @click="getDetails(item.goodsId)"
                      >
                        <img class="shopImg" :src="item.logoImgUrl" alt="" />
                        <div class="shopTitle">{{ item.goodsName }}</div>
                        <div v-if="item.templateId == 1">
                          <div
                            v-if="item.canVoucherMoney"
                            class="flexBox shopTxt"
                          >
                            <div class="price">¥{{ item.payMoney }}</div>
                            <span class="linePrice"
                              >¥{{ item.showPrice }}
                            </span>
                          </div>
                          <div v-else class="flexBox shopTxt">
                            <div class="price">¥{{ item.showPrice }}</div>
                            <span class="linePrice"
                              >¥{{ item.linePrice }}
                            </span>
                          </div>
                        </div>
                        <div
                          v-if="item.templateId == 2"
                          class="flexBox shopTxt"
                        >
                          <div class="price">¥{{ item.showPrice }}</div>
                          <span class="linePrice">¥{{ item.linePrice }} </span>
                        </div>
                        <div v-else>
                          <div
                            v-if="item.canVoucherMoney"
                            class="flexBox shopTxt"
                          >
                            <div class="price">¥{{ item.payMoney }}</div>
                            <span class="linePrice"
                              >¥{{ item.showPrice }}
                            </span>
                          </div>
                          <div v-else class="flexBox shopTxt 5">
                            <div class="price">¥{{ item.showPrice }}</div>
                            <span class="linePrice"
                              >¥{{ item.linePrice }}
                            </span>
                          </div>
                        </div>
                        <div class="sale">
                          <div class="num">已售{{ item.buyNumber }}件</div>
                        </div>
                      </div>
                    </template>
                  </div>
                </div>
              </div>
            </div>
            <!-- 分类 -->
            <homeTableItemList
              :isHome="true"
              :cityId="cityInfo.cityId"
              :pageNum="pageNum"
              :refreshing="refreshing"
            />
          </div>

          <div v-else-if="activeIndex == 1">
            <City :tabId="tabId"></City>
          </div>
          <div v-else class="goTops">
            <others :tabId="tabId"></others>
          </div>
          <Footlink v-if="!judgeEmpty" />
        </van-pull-refresh>
      </div>
      <div
        class="suspension"
        @touchmove="touchmove"
        ref="suspension"
        @click="suspensionClick"
        v-if="awardList && false"
      >
        <img :src="awardList.entrancePic" alt="" />
      </div>
      <div class="popUp" v-if="popFlag && awardList && false">
        <div>
          <img src="@/assets/image/8.8.png" alt="" />
          <img
            class="x"
            src="@/assets/image/11.3.png"
            alt=""
            @click="closePop"
          />

          <div class="rule" @click="goAward">
            <img class="tiao" src="@/assets/image/88.2.png" alt="" />
          </div>
        </div>
      </div>
      <!-- 红包悬浮按钮 -->
      <template v-for="item in funcSwitchData">
        <div
          :key="item.id"
          class="discountBox"
          v-if="
            funcSwitchData &&
            item.switchType === 1 &&
            $route.meta.title === '诚聊购'
          "
          ref="discountBox"
          @touchmove="discountTouchmove"
          @click="discountClick"
        >
          <img :src="item.entrancePictureUrl" alt="" />
        </div>
        <div
          :key="item.id"
          v-if="funcSwitchData && item.switchType === 2 && firstShow"
        >
          <van-overlay :show="isShow" @click="handleShow" :z-index="1002">
            <div class="openingPage">
              <img
                :src="item.entrancePictureUrl"
                alt=""
                @click="discountClick"
              />
              <van-icon
                name="close"
                class="openingPageIcon"
                @click="handleShow"
                color="#fff"
              />
            </div>
          </van-overlay>
        </div>
      </template>
      <template v-if="!!getActivityLocalInfo">
        <red-packet-popover
          :visible="isShowLocalShopRed"
          :data="couponData"
          @handleUse="handleUse"
        />
        <recieveRedPacketPopover
          ref="recieveRedPacketPopover"
          :visible="isRecieveRedPacketPopover"
          :data="
            getActivityLocalInfo.couponInfoVO
              ? getActivityLocalInfo.couponInfoVO[0]
              : {}
          "
          @handleOk="handleRecieveRedPacketPopoverOk"
          @handleClose="() => {}"
        />
      </template>
      <div class="login">
        <div class="tips" v-if="loginShow">
          <img src="../../assets/image/appLogo.png" alt="" />
          <div class="tip-tit">登录开启美好品质生活</div>
          <div class="tip-btn" @click="$router.push({ path: '/smslogin' })">
            立即登录
          </div>
        </div>
      </div>
      <router-view></router-view>
    </div>
  </router-layout>
</template>

<script>
import { Dialog } from 'vant';
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
import {
  getsSlideshow,
  getrecommend,
  getsGoodsTag,
  getKingDirectList,
  getKingDirectListV2,
  getsGoodsCateLevel,
  getActivityTime,
  repeatBuy,
  getluck,
  getsUserAddress,
  selectGood,
  officialSubsidy,
  goodsRestriction,
  userGetFlag,
  getUserInfo,
  couponActivity,
  couponReceive,
  tabAreaList,
  getFeatureShop,
  selectLiveGoods,
  getTabs,
  newTabAreaList,
  friendsRecommend,
  getVSwitch as getFuncSwitch,
  getNewestOrder,
  getOpenState,
  getCityRankPreviewV2,
  getNewUserBuyV2,
  getCityShopV2
} from 'api';
import { salesFun, isIOS, isAndroid1 } from '@/utils/dom.js';
import { cltfiledomain } from '@/api/config';
import Header from '@/components/Header';
import Footlink from '@/components/home/footlink';
import Special from '@/components/home/special';
import liveBroad from '@/components/home/liveBroad';
import download from '@/components/download';
import redPacketPopover from '@/components/home/redPacketPopover';
import recieveRedPacketPopover from '@/components/home/recieveRedPacketPopover';
import CommonHeader from '@/components/CommonHeader.vue';
import banners from '@/components/home/banners';
import homeTableItemList from './homeTableItemList';
import City from './City.vue';
import others from './others.vue';
import scanner from '@/mixins/scanner';
import vue from '@/main';
import urlImg from '@/imgUrl';

export default {
  name: 'Home',
  components: {
    Header,
    Footlink,
    Special,
    liveBroad,
    CommonHeader,
    download,
    redPacketPopover,
    recieveRedPacketPopover,
    City,
    others,
    banners,
    homeTableItemList
  },
  mixins: [scanner],
  data() {
    return {
      bigLookForwardIMG:urlImg.getAssetsFile('newVersion/bigLookForward.png'),
      width: window.innerWidth,
      newUserBuyImg: '',
      cityInfo:
        JSON.parse(localStorage.getItem('addressHome')) ??
        vue.__proto__.defaultCity,
      cityShopList: [],
      firstShow: this.$router.currentRoute.meta.firstShow,
      isShow: true,
      addBgc: false,
      // 是否弹出本地购红包
      isShowLocalShopRed: false,
      headerAttr: LukeappApi.getattribute(),
      show: true,
      refreshing: false, // 下拉刷新
      banner: [],
      specialifon: [],
      goodslist: [],
      loading: false, // 加载状态
      finished: false, // 是否加载
      pageNum: 1, // 当前页数
      pageSize: 20, // 每页条数
      judgeEmpty: false,
      countdown: 0,
      limitSaleStart: '',
      limitSaleEnd: '',
      countdownStart: '',
      m: '',
      type: 2,
      activitylist: [],
      couponActivityData: [],
      data: 0,
      data1: 0,
      flgT: false,
      goodsFlg: true,
      awardList: null,
      canDefault: false, //用户是否有默认地址
      popFlag: false,
      goodsList1: [],
      goodsList2: [],
      // personalityTagsArr: [],
      datatime: 0,
      // 补贴
      subsidyList: [],
      list: [],
      officialSubsidy: true, //官方补贴的商品
      anchorInfo: null, // 直播相关信息
      isRecieveRedPacketPopover: false,
      couponData: null,
      currentQuery: {},
      scrollTop1: '',
      classificationTables: [
        { id: 1, name: '精选', Label: '为你推荐' },
        { id: 2, name: '直播', Label: '主播力荐' },
        { id: 3, name: '城市', Label: '特色店铺' }
      ],
      homeTable: '', // 特产中心、城市馆切换
      homeSubTable: '', //  特产中心、城市馆下级类目切换
      homeSubTableList: [
        // 类目展示
        {
          table: '全部',
          id: 0
        },
        {
          table: '西湖龙井',
          id: 1
        },
        {
          table: '特色小吃',
          id: 2
        },
        {
          table: '速食藕粉',
          id: 3
        },
        {
          table: '特产',
          id: 4
        },
        {
          table: '西湖醋鱼',
          id: 5
        }
      ],
      value: '',
      indexAll: 1,
      weather: {},
      cltfiledomain: cltfiledomain,
      liveBaseUrl:
        process.env.NODE_ENV === 'production'
          ? 'https://passengerh5.lkkjjt.com'
          : 'http://passengerh5.expection.cn',
      homeGoodList: [],
      shareGoodsList: [], //好友推荐列表
      shareHeadPic: '',
      shareShopName: '',
      sharePubUser: '',
      funcSwitchData: null,
      swipeLists: [],
      loginShow: false,
      clmH5:
        process.env.NODE_ENV === 'development'
          ? 'https://pageclm.expection.cn/'
          : 'https://m.lkkjjt.com/' //CLM域名
    };
  },
  computed: {
    ...mapGetters(['getuserinfo']),
    ...mapGetters('home', ['position']),
    ...mapGetters('activity', ['getActivityShareInfo', 'getActivityLocalInfo']),
    ...mapState('home', ['activeIndex', 'tabList', 'tabId']),
    activeIndexComputed: {
      get() {
        return this.activeIndex;
      },
      set(val) {
        this.CHANGE_ACTIVE_INDEX(val);
      }
    }
  },
  methods: {
    handleSearch() {
      this.$router.push({
        path: '/search',
        query: {
          title: '搜索',
          isGoodsCateLevelTwo: false,
          isHome: true
        }
      });
    },
    handleShow() {
      this.$router.currentRoute.meta.firstShow = false;
      this.isShow = false;
    },
    // 好友
    getFriends() {
      let nowUserInfo = JSON.parse(localStorage.getItem('userinfo')) || [];
      friendsRecommend({
        token: nowUserInfo.token
        // status: 1 //不传，展示4条，传1展示所有
      }).then((res) => {
        if (res && res.errorCode == 1) {
          if (res.data && res.data.goodsVOList.length > 0) {
            this.shareHeadPic = res.data.headPic;
            this.shareShopName = res.data.nickName;
            this.shareGoodsList = res.data.goodsVOList;
            this.sharePubUser = res.data.unionid;
          }
        }
      });
    },
    // tab
    // 直播（主播力荐）
    _selectLiveGoods() {
      // this.judgeEmpty = true;
      // selectLiveGoods({
      //   pageNum: this.pageNum,
      //   pageSize: 10
      // }).then((res) => {
      //   if (res && res.errorCode == 1) {
      //     this.loading = false;
      //     if (res.data) {
      //       if (res.data.content.length > 0) {
      //         this.pageNum += 1;
      //         this.homeGoodList = this.homeGoodList.concat(res.data.content);
      //         this.finished = !res.data.hasNextPage;
      //         // this.pageNum += 1;
      //         if (!res.data.hasNextPage) {
      //           this.finished = true;
      //           this.finishedText = "- 没有更多了-";
      //         }
      //       } else {
      //         this.finished = !res.data.hasNextPage;
      //         this.loading = false;
      //         ``;
      //         this.finished = true;
      //         this.finishedText = "- 没有更多了-";
      //       }
      //     } else {
      //       this.finished = !res.data.hasNextPage;
      //       this.homeGoodList = res.data.list;
      //     }
      //   } else {
      //     this.finished = true;
      //     this.finishedText = "- 没有更多了-";
      //   }
      // });
    },
    // 城市（特色店铺）
    _getFeatureShop() {
      this.judgeEmpty = true;
      getFeatureShop({
        cityId: this.position.adcode || '110100',
        pageNum: this.pageNum,
        pageSize: 10
      }).then((res) => {
        if (res && res.errorCode == 1) {
          if (res.data) {
            if (res.data.content.length > 0) {
              this.pageNum += 1;
              this.homeGoodList = this.homeGoodList.concat(res.data.content);
              this.finished = !(res.data.content.length > 9);
              console.log(this.finished, 'this.finished');
              if (!(res.data.content.length > 9)) {
                this.loading = false;
                this.finished = true;
                this.finishedText = '- 没有更多了-';
              }
            } else {
              this.loading = false;
              this.finished = true;
              this.finishedText = '- 没有更多了-';
            }
          } else {
            this.loading = false;
            this.finished = true;
            this.homeGoodList = res.data.content;
          }
        } else {
          this.loading = false;
          this.finished = true;
          this.finishedText = '- 没有更多了-';
        }
      });
      this.judgeEmpty = false;
    },
    // 这个貌似没用了
    goToLiveRoom() {
      window.location.href = `${this.liveBaseUrl}/index/live?token=${this.getuserinfo?.token}`;
    },
    cityOnclick() {
      const cityUrl =
        process.env.NODE_ENV === 'development'
          ? 'https://city.mp.wang'
          : 'https://city.mp.wang';
      window.location.href =
        cityUrl +
        `?adcode=${this.position.adcode}&token=${this.getuserinfo?.token}`;
    },
    // 天气
    getAreaList() {
      try {
        newTabAreaList({
          adcode: this.cityInfo.adcode
        }).then((res) => {
          try {
            this.weather = res.data.lives[0];
          } catch (e) {
            console.log(e);
          }
        });
      } catch (e) {
        console.log(e);
      }
    },
    // 下拉加载
    onLoad() {
      if (this.indexAll == 1) {
        this.getChoose();
      } else if (this.indexAll == 2) {
        if (this.pageNum == 1) {
          return;
        }
        this._selectLiveGoods();
      } else if (this.indexAll == 3) {
        if (this.pageNum == 1) {
          return;
        }
        this._getFeatureShop();
      }
    },
    // 头部tab
    activeNameClick(index) {
      console.log(index, 'index');
      this.CHANGE_ACTIVE_INDEX(index);
      this.SET_TABLE_ID(this.tabList[index].id);
      this.$refs.beatHome.scrollTop = 0; //切换tab时，页面滚动到最上
      this._userGetFlag();
    },
    // 精选高亮
    onClick(item, index) {
      this.pageNum = 1;
      this.indexAll = item.id;
      if (item.id == 1) {
        this.homeGoodList = [];
        this.getChoose();
      } else if (item.id == 2) {
        this.homeGoodList = [];
        this._selectLiveGoods();
      } else if (item.id == 3) {
        this.homeGoodList = [];
        this._getFeatureShop();
      }
    },
    getMyLocation() {
      console.log('走了定位------------------------');
      var geolocation = new qq.maps.Geolocation(
        'V7KBZ-D4QLV-F3HPS-U3ID3-75SOK-JYFHT',
        '微信公众号'
      ); // eslint-disable-line
      geolocation.getLocation(this.showPosition, this.showErr); // 或者用getLocation精确度比较高
    },
    showPosition(position) {
      console.log(position, '定位之后的值===============');
      var map = new AMap.Map('container', {
        resizeEnable: true
      });
      const adcode = ~~((position.adcode || map.getAdcode()) / 100) * 100;
      const location = {
        province: position.city,
        city: position.district,
        flag: new Date().getDate(),
        adcode,
        type: 6,
        position: true
      };
      localStorage.setItem('mph5-pos', JSON.stringify(location));
      localStorage.setItem('mph5-pos2', JSON.stringify(location)); //新加的
      this.SET_POSITION(location);
      this.getAreaList();
    },
    showErr() {
      console.log('获取位置失败'); //
      const location = {
        flag: new Date().getDate(),
        province: '北京',
        adcode: '110100',
        id: 52,
        pid: 2,
        type: 2,
        position: true,
        default: true
      };
      localStorage.setItem('mph5-pos', JSON.stringify(location));
      localStorage.setItem('mph5-pos2', JSON.stringify(location)); //新加的
      this.SET_POSITION(location);
      // this.$toast("获取位置失败");
      this.getAreaList();
    },
    salesFun: salesFun,
    ...mapActions('home', ['getTabs']),
    ...mapActions(['userinfo']),
    ...mapMutations('activity', ['setList', 'clearList']),
    ...mapMutations('home', [
      'CHANGE_ACTIVE_INDEX',
      'SET_TABLE_ID',
      'SET_POSITION'
    ]),
    async _userGetFlag() {
      const unionid = this.getuserinfo?.unionid;
      // if (!unionid) {
      //   const { errorCode, data } = await getUserInfo();
      //   errorCode === 1 && this.userinfo(data);
      // }
      if (unionid) {
        const { data } = await userGetFlag({
          unionid: this.getuserinfo?.unionid
        });
        this.anchorInfo = data;
      }
      this.$nextTick().then(() => {
        this.$refs.liveBroad?._goodsAssociated();
      });
    },
    _goodsRestriction() {
      goodsRestriction().then((res) => {
        if (res.errorCode == 1) {
          this.subsidyList = [];
          this.activitylist = [];
          this.list = res.data.content[0];
          this.activitylist =
            res.data.content[0].good && res.data.content[0].good.length > 2
              ? res.data.content[0].good.slice(0, 2)
              : res.data.content[0].good;

          if (this.activitylist) {
            let s = new Date(
              res.data.content[0].beginTime.replace(/-/g, '/')
            ).getTime();

            let t = res.data.content[0].resetTime * 60 * 1000;
            let m = s + t;
            let n = new Date().getTime();

            this.countdown =
              res.data.content[0].resetTime * 60 * 1000 - (n - s);

            this.timeChangs(this.countdown);

            if (n >= s && n <= m) {
              this.flgT = true;
            } else {
              this.flgT = false;
            }
          }
          this.subsidyList =
            res.data.content[1] && res.data.content[1].showGoodsList.length > 2
              ? res.data.content[1].showGoodsList.slice(0, 2)
              : res.data.content[1].showGoodsList;
        }
      });
    },
    // 活动悬浮窗
    closePop() {
      sessionStorage.setItem('popFlag', false);
      this.popFlag = false;
    },
    _getluck() {
      const toast = this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      });
      getluck().then((res) => {
        toast.clear();
        if (res && res.errorCode == 1) {
          this.awardList = res.data;
        }
      });
    },
    _getsUserAddress() {
      const toast = this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      });
      getsUserAddress().then((res) => {
        toast.clear();
        if (res?.errorCode == 1) {
          // for (let i = 0; i < res.data.content.length; i++) {
          //   if (res.data.content[i].canDefault) {
          //     this.canDefault = true;
          //      console.log(this.canDefault,'this.canDefault');
          //     break;
          //   }
          // }

          if (res.data.content.length > 0) {
            this.canDefault = true;
          }
        }
      });
    },
    suspensionClick() {
      if (!localStorage.getItem('userinfo')) {
        // this.$router.push("/smslogin");
        let fullPath = this.$route.fullPath;
        this.$router.replace({
          path: '/smslogin',
          query: { redirect: fullPath }
        });
      } else if (!this.canDefault) {
        Dialog.alert({
          message: '请前往收货地址中设置默认收货地址'
        }).then(() => {
          this.$router.push({
            path: '/user/setting'
          });
        });
      } else {
        this.$router.push({
          path: '/award',
          query: {
            id: this.awardList.id
            // backgroundPic:this.awardList.backgroundPic,
            // voucherMoney: this.awardList.voucherMoney,
          }
        });
      }
    },
    touchmove(e) {
      e.preventDefault();
      let h =
        document.documentElement.clientHeight || document.body.clientHeight;
      let w = document.documentElement.clientWidth || document.body.clientWidth;
      let H = h - this.$refs.suspension.clientHeight;
      let W = w - this.$refs.suspension.clientWidth;
      let top =
        e.changedTouches[0].clientY - this.$refs.suspension.clientHeight / 2;
      let left =
        e.changedTouches[0].clientX - this.$refs.suspension.clientWidth / 2;
      top = top < 0 ? 0 / 2 : top;
      top = top > H ? H : top;
      left = left < 0 ? 0 : left;
      left = left > W ? W : left;
      this.$refs.suspension.style.top = top + 'px';
      this.$refs.suspension.style.left = left + 'px';
    },
    discountTouchmove(e) {
      e.preventDefault();
      let h =
        document.documentElement.clientHeight || document.body.clientHeight;
      let w = document.documentElement.clientWidth || document.body.clientWidth;
      let H = h - this.$refs.discountBox[0].clientHeight;
      let W = w - this.$refs.discountBox[0].clientWidth;
      let top =
        e.changedTouches[0].clientY -
        this.$refs.discountBox[0].clientHeight / 2;
      let left =
        e.changedTouches[0].clientX - this.$refs.discountBox[0].clientWidth / 2;
      top = top < 0 ? 0 / 2 : top;
      top = top > H ? H : top;
      left = left < 0 ? 0 : left;
      left = left > W ? W : left;
      this.$refs.discountBox[0].style.top = top + 'px';
      this.$refs.discountBox[0].style.left = left + 'px';
    },
    discountClick() {
      window.location.href = this.funcSwitchData[0].forwardUrl;
    },
    finish() {
      this.activitylist = null;
      this.flgT = false;
      this._getActivityTime();
    },
    timeChangs(time) {
      const day = parseInt(time / (60 * 60 * 24));
      const hou = parseInt((time % (60 * 60 * 24)) / 3600);
      const min = parseInt(((time % (60 * 60 * 24)) % 3600) / 60);
      const sec = parseInt(((time % (60 * 60 * 24)) % 3600) % 60);
      return `${day > 0 ? day + '天' : ''}${hou ? hou + '时' : ''}${
        min ? min + '分' : ''
      }${sec}秒`;
    },
    _getActivityTime() {
      selectGood().then((res) => {
        if (res.errorCode == 1) {
          this.list = res.data;
          this.activitylist = res.data.good
            ? res.data.good.length > 2
              ? res.data.good.slice(0, 2)
              : res.data.good
            : '';
          if (this.activitylist) {
            let s = new Date(res.data.beginTime.replace(/-/g, '/')).getTime();

            let t = res.data.resetTime * 60 * 1000;
            let m = s + t;
            let n = new Date().getTime();

            this.countdown = res.data.resetTime * 60 * 1000 - (n - s);

            this.timeChangs(this.countdown);
            if (n >= s && n <= m) {
              this.flgT = true;
            } else {
              this.flgT = false;
            }
          }
        }
      });
    },
    // 这个貌似没用了
    jishi() {
      setTimeout(() => {
        this.data1 = new Date().getTime();
        if (this.data1 > this.data) {
          this.activitylist = null;
          // this._getActivityTime();
        } else {
          this.jishi();
        }
      }, 1000);
    },
    // 这个貌似没用了
    goluck() {
      this.$router.push('/award?id=1&voucherMoney=0.3');
    },

    goDetail(
      id,
      activityId,
      officialSubsidy,
      officialSubsidyId,
      enableQuantity,
      skuKillInventory
    ) {
      if (activityId && skuKillInventory != 0) {
        this.$router.push({
          path: `/detail/${id}?agencyUnionid=${
            this.$route.query.agencyUnionid || null
          }&fromPlatform=${this.$route.query.fromPlatform || null}`,
          query: { activityId, skuKillInventory }
        });
      } else if (officialSubsidy && enableQuantity != 0) {
        this.$router.push({
          path: `/detail/${id}?agencyUnionid=${
            this.$route.query.agencyUnionid || null
          }&fromPlatform=${this.$route.query.fromPlatform || null}`,
          query: { officialSubsidy, officialSubsidyId, enableQuantity }
        });
      } else {
        this.$router.push({
          path: `/detail/${id}?agencyUnionid=${
            this.$route.query.agencyUnionid || null
          }&fromPlatform=${this.$route.query.fromPlatform || null}`
        });
      }
    },
    // 这个貌似没用了
    gobuy(id) {
      let userinfo = JSON.parse(window.localStorage.getItem('userinfo'));
      if (userinfo) {
        // console.log(999);
        this.$router.push({
          path: `/detail/${id}?agencyUnionid=${
            this.$route.query.agencyUnionid || null
          }&fromPlatform=${this.$route.query.fromPlatform || null}`
        });
        // repeatBuy({goodsId:id,userId:userinfo.uid}).then(res=>{
        //   console.log(res);
        //   if(res.data==0){
        //     this.$router.push({
        //       path: `/detail/${id}?agencyUnionid=${
        //         this.$route.query.agencyUnionid || null
        //       }&fromPlatform=${this.$route.query.fromPlatform || null}`,
        //     })

        //   }else if(res.data==1){
        //      this.$toast('您已购买过此秒杀商品!')
        //   }
        // })
      } else {
        // this.$router.push("/login").catch(() => {});
        // this.$router.push("/smslogin").catch(() => {});
        let fullPath = this.$route.fullPath;
        this.$router.replace({
          path: '/smslogin',
          query: { redirect: fullPath }
        });
      }
      // console.log(userinfo);
      // if(userinfo){
      //   console.log(999);
      //   repeatBuy({goodsId:id,userId:userinfo.uid}).then(res=>{
      //     console.log(res);
      //     if(res.data==0){
      //       this.$router.push({
      //         path: `/detail/${id}?agencyUnionid=${
      //           this.$route.query.agencyUnionid || null
      //         }&fromPlatform=${this.$route.query.fromPlatform || null}`,
      //       })

      //     }else if(res.data==1){
      //        this.$toast('您已购买过此秒杀商品!')
      //     }
      //   })
      // }else{
      //   console.log(9998);
      //       this.$router.push("/login").catch(() => {});
      // }
    },
    // 这个貌似没用了
    getActivityzone() {
      // this.$router.push({
      //   path: "/Activityzone",
      // });
      this.$router.push('/purchase1');
    },
    // 这个貌似没用了
    handleSwipe(item) {
      if (item.jumpType == 1) {
        this.$router.push({
          path: `/detail/${item.jumpId}?agencyUnionid=${
            this.$route.query.agencyUnionid || null
          }&fromPlatform=${this.$route.query.fromPlatform || null}`
        });
      } else if (item.jumpType == 2) {
        this.$router.push({
          name: 'shopinfo',
          params: { ShopId: item.jumpId }
        });
      } else if (item.jumpType == 3) {
        let seft = this;
        window.location.href = item.hyperlink;
      } else if (item.jumpType === 4) {
        this.$router.push({
          name: 'newExclusive',
          query: { One_id: item.jumpId, title: item.title }
        });
      }
    },
    // 下拉刷新
    async onRefresh() {
      this.pageNum = 1;
      // window.location.reload(true);
      this.refreshing = false;
      // this._getS("1");
      // this._getActivityTime();
      // this.officialSubsidy();
      this._goodsRestriction();
      this.getCouponActivity();
      await this._userGetFlag();
      this.getFriends();
    },
    // 这个貌似没用了
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
    // 这个貌似没用了
    _getsSlideshow() {
      getsSlideshow().then((res) => {
        if (res && res.errorCode == 1) {
          this.banner = res.data.content;
          this.$refs.swipe.resize();
        }
      });
    },
    _getsGoodsTag() {
      getKingDirectListV2({ cityId: 8 }).then((res) => {
        if (res && res.errorCode === 1) {
          this.specialifon = res.data;
        }
      });
    },
    more() {
      // this.$router.push("/purchase");
      this.$router.push('/purchase1');
    },
    async getCouponActivity() {
      try {
        const { data, errorCode } = await couponActivity();

        if (errorCode === 40100) {
          this.clearList();
          return;
        }

        this.setList(data?.content);

        this.currentQuery.origin &&
          this.dealWithOrigin(this.currentQuery.origin);
      } catch (err) {
        console.log(err);
      }
    },
    dealWithOrigin(url) {
      switch (url) {
        // 诚聊卖跳转来的
        case 'clm':
          this.isRecieveRedPacketPopover = !!this.getActivityLocalInfo;
          const { token } = this.$route.query;
          token &&
            token !== 'undefined' &&
            localStorage.setItem('userinfo', JSON.stringify({ token }));
          break;
        default:
          break;
      }
    },
    handleUse() {
      !this.getuserinfo && getUserInfo();
    },
    async handleRecieveRedPacketPopoverOk() {
      const { couponId } = this.getActivityLocalInfo;
      const { data, success } = await couponReceive({ couponId });
      this.couponData = data;
      this.isRecieveRedPacketPopover = false;
      if (!success) return;
      setTimeout(() => (this.isShowLocalShopRed = true), 500);
    },
    goClk() {
      let nowUser = JSON.parse(window.localStorage.getItem('userinfo'));
      window.location.href = `${this.liveBaseUrl}/index/homePage?punionid=${
        this.sharePubUser
      }&params=${1}&token=${nowUser.token}`;
    },
    goToScanner() {
      if (this.isWeixin) {
        this.handleScanQrCode();
        return;
      }

      this.$router.push('/scanner');
    },
    getDetails(id) {
      this.$emit('goDeatil', id);
      this.$router.push({
        path: `/detail/${id}?agencyUnionid=${
          this.$route.query.agencyUnionid || null
        }&fromPlatform=${this.$route.query.fromPlatform || null}`
      });
    },
    goAward() {
      this._getsUserAddress();
      // this.$router.push('/awardDetails')
      this.$router.push('/cityFestival');
    },
    async getFuncSwitch() {
      const { success, data } = await getFuncSwitch();
      if (success) {
        this.funcSwitchData = data?.content;
      }
    },
    //跑马灯
    getNewestOrder() {
      getNewestOrder().then((res) => {
        if (res && res.errorCode == 1) {
          this.swipeLists = res.data.content;
        }
      });
    },
    //本地商家入驻
    joinBd() {
      let nowUser = JSON.parse(window.localStorage.getItem('userinfo'));
      getOpenState().then((res) => {
        if ((res.data.storeState = false)) {
          window.location.href =
            this.clmH5 + 'set_shop/index?token=' + nowUser.token;
        } else {
          this.$confirm({
            message: '您已入驻本地商家，是否立即前往'
          }).then(() => {
            window.location.href =
              this.clmH5 + 'index/home?token=' + nowUser.token;
          });
          return;
        }
      });
    },
    //网店入驻
    joinWd() {
      getOpenState().then((res) => {
        if ((res.data.shopState = false)) {
          this.$router.push({
            path: '/shopapply',
            query: {
              type: 0
            }
          });
        } else {
          this.$confirm({
            message: '您已开通线上商家，是否立即前往'
          }).then(() => {
            this.$router.push('/downloadclm');
          });
          return;
        }
      });
    },
    //判断是否已经登录
    isLogin() {
      let user = JSON.parse(window.localStorage.getItem('userinfo'));
      if (user && user.token) {
        this.loginShow = false;
      } else {
        this.loginShow = true;
      }
    }
  },
  mounted() {
    this.getTabs();
    if (!localStorage.getItem('mph5-pos2')) {
      const location = {
        flag: new Date().getDate(),
        province: '北京',
        adcode: '110100',
        id: 52,
        pid: 2,
        type: 2,
        position: true,
        default: true
      };
      localStorage.setItem('mph5-pos2', JSON.stringify(location)); //新加的
    }
    this.getAreaList();
    getNewUserBuyV2().then((res) => {
      if (res.errorCode === 1) {
        this.newUserBuyImg = res.data.list[0].imgArrayUrls[0];
      }
    });
    localStorage.setItem('historyScroolTop', 0);
    //监听
    return;
    this.$refs.beatHome.addEventListener(
      'scroll',
      (e) => {
        this.scrollTop1 = this.$refs.beatHome.scrollTop;
        var topHeight = 0;
        if (this.$refs.download) {
          var topHeight =
            this.$refs.download.$el.getBoundingClientRect().height || 0;
        }
        if (this.scrollTop1 >= topHeight) {
          this.addBgc = true;
        } else {
          this.addBgc = false;
        }
      },
      true
    );
  },
  activated() {
    this.isLogin();
    this.cityInfo =
      JSON.parse(localStorage.getItem('addressHome')) ??
      vue.__proto__.defaultCity;

    var userInfo = JSON.parse(window.localStorage.getItem('userinfo')) || {};
    this.userinfo(userInfo);
    this.goodsFlg = false;
    this.canDefault = false;
    //从详情页返回高度不变
    this.$nextTick(() => {
      this.$refs.beatHome.scrollTop = sessionStorage.getItem('locationHome');
      document.querySelector('.home-bodys').scrollTop =
        localStorage.getItem('historyScroolTop');
    });
    this._getActivityTime();
    // this._getluck();
    // // 获取用户地址
    // if (
    //   localStorage.getItem("userinfo") && localStorage.getItem("userinfo") != '{}' &&
    //   this.$route.query?.origin !== "clm"
    // ) {
    //   this._getsUserAddress();
    // }
    // this._getsUserAddress();
    this._goodsRestriction();
    this._userGetFlag();
    this.getCouponActivity();
    this._goodsRestriction();
    // this.getFriends();
  },
  created() {
    // await getCityShopV2().then((res) => {
    //   if (res && res.errorCode === 1) {
    //     this.cityInfo = res.data[0];
    //     vue.__proto__.defaultCity = res.data[0];
    //   }
    // });
    // setInterval(() => {
    //   console.log(this.$router.currentRoute.params,this.cityInfo);
    // }, 2000);
    var userInfo = JSON.parse(window.localStorage.getItem('userinfo')) || {};
    this.userinfo(userInfo);
    // this.position.isInitial && this.getMyLocation();
    this.getFriends();
    this._goodsRestriction();
    if (!sessionStorage.getItem('popFlag')) {
      sessionStorage.setItem('popFlag', true);
    }
    this.popFlag = sessionStorage.getItem('popFlag') === 'true';
    // this._getsSlideshow();
    this._getsGoodsTag();
    this._userGetFlag();
    this.getCouponActivity();
    this.getFuncSwitch();
    // this.officialSubsidy()
    // this._getActivityTime();
    this._getluck();
    getCityRankPreviewV2({ cityId: this.cityInfo.cityId }).then((res) => {
      if (res.errorCode === 1) {
        this.cityShopList = res.data;
      }
    });
    // 获取用户地址
    if (
      localStorage.getItem('userinfo') &&
      localStorage.getItem('userinfo') != '{}' &&
      this.$route.query?.origin !== 'clm'
    ) {
      this._getsUserAddress();
    }
    // if (localStorage.getItem("userinfo")) {
    //   this._getsUserAddress();
    // }
    this.isLogin();
    this.getNewestOrder();
  },
  beforeRouteLeave(to, from, next) {
    if (to.name == 'detail') {
      from.meta.keepAlive = true;
      sessionStorage.setItem('locationHome', this.$refs.beatHome.scrollTop);
    } else {
      // from.meta.keepAlive = false;
      sessionStorage.setItem('locationHome', 0);
    }
    next();
  },

  watch: {
    $route: {
      handler({ query }, from) {
        this.currentQuery = query || {};
        if (!from) {
          if (query?.inviteCode) {
            sessionStorage.setItem('inviteCode', query?.inviteCode);
          }
        } else {
          const { name } = from;

          if ((name === 'smslogin' || name === 'login') && query.autoOpen) {
            this.$nextTick(() => {
              this.$refs.recieveRedPacketPopover.handleJoin();
              this.$router.push({ query: {} });
            });
          }
        }
      },
      immediate: true
    },
    cityInfo(newValue, oldValue) {
      getCityRankPreviewV2({ cityId: newValue.cityId }).then((res) => {
        if (res.errorCode === 1) {
          this.cityShopList = res.data;
        }
      });
      this.getAreaList();
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/style/mixin.scss';
.home-bodys {
  top: 0;
}
.flexBox {
  display: flex;
  align-items: center;
}
.moreG {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  .iconM {
    width: 17px;
    height: 17px;
  }
  > span {
    font-size: 13px;
    font-weight: bold;
    color: #ff7136;
    vertical-align: middle;
    padding: 0 7px 0 10px;
  }
  .icon1 {
    width: 6px;
    height: 10px;
    vertical-align: middle;
    margin-left: 5px;
  }
}
.guanFa {
  > div {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    > div {
      img {
        width: 75px;
        height: 75px;
        border-radius: 6px;
      }
      .span1 {
        font-size: 10px;
        font-weight: 500;
        color: #959595;
        margin-top: 15px;
      }
      .span2 {
        font-size: 11px;
        font-weight: bold;
        color: #fe3746;
        margin-top: 15px;
      }
    }
  }
}
.mSha {
  > div {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    > div {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      img {
        width: 75px;
        height: 75px;
        border-radius: 6px;
      }
      > div {
        > div {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          .mS1 {
            font-size: 10px;
            font-weight: 500;
            color: #959595;
            margin-top: 15px;
          }
          .mS2 {
            font-size: 11px;
            font-weight: bold;
            color: #fe3746;
            margin-top: 15px;
          }
        }
      }
    }
  }
}
.comes {
  .activitys {
    display: flex;
    justify-content: space-between;
    margin: 12px 0;
    .killActivity {
      width: 171px;
      height: 242px;
      background: url('../../assets/image/newVersion/doubleEleven.png')
        no-repeat;
      background-size: 100% 100%;
      padding: 37.5px 6px 114.5px 6px;
      .killActivityIMG {
        width: 159px;
        height: 90px;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-between;
        padding: 10px 7px;
        background: linear-gradient(#fff1f1, #fcd8d7);
        border-radius: 10px;
        overflow: hidden;
        .exclusiveIMG {
          width: 70px;
          height: 70px;
        }
        .exclusive {
          position: relative;
          width: 70px;
          height: 70px;
          padding-left: 5px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .titleM {
            font-size: 16px;
            margin-top: 20px;
          }
          .exclusiveImg {
            width: 56px;
            height: 14px;
            position: absolute;
            top: -11px;
          }
          .exclusiveDiv {
            width: 60px;
            height: 24px;
            background: url('../../assets/image/newVersion/snapUp.png');
            background-size: 100%;
            margin-top: 10px;
          }
        }
        .ITEMimg1 {
          width: 70px;
          height: 70px;
          position: relative;
        }
        .ITEMimg2 {
          width: 70px;
          height: 70px;
          position: relative;
        }
        .ITEMimg1::before {
          position: absolute;
          content: url('../../assets/image/newVersion/NO1.png');
          width: 22.5px;
          height: 26.5px;
          z-index: 2;
        }
        .ITEMimg2::before {
          position: absolute;
          content: url('../../assets/image/newVersion/NO2.png');
          width: 22.5px;
          height: 26.5px;
          z-index: 2;
        }
      }
      .titleM {
        color: #161616;
        font-size: 15px;
        font-weight: bold;
      }
      .kill_top {
        display: flex;
        justify-content: space-around;
        align-items: center;
        .bei {
          background: url('../../assets/image/common/pink.png') no-repeat;
          background-size: 100% 100%;

          // .van-count-down {
          //   font-weight: bold;
          //   font-size: 10px;
          //   padding: 0 5px;
          //   color: #fefefe;
          // }
        }
      }
      .div {
        span:first-child {
          color: #161616;
          font-size: 17px;
        }
        > span {
          margin: 5px;
        }
      }
    }
    .ditu {
      background: url('../../assets/image/home/ditu.png') no-repeat;
      background-size: 100% 100%;
      height: 134px;
      border-radius: 8px;
      margin-top: 5px;
    }
    .officialSubsidy {
      width: 172px;
      height: 242px;
      .exclusiveText {
        font-size: 16px;
      }
      .kill {
        height: 115px;
        background: url('../../assets/image/newVersion/kill11.png') no-repeat;
        background-size: 100%;
        padding: 10px;
        .kill_top {
          height: 20px;
          display: flex;
          align-items: center;
          .titleM {
            color: #161616;
            font-size: 15px;
            font-weight: bold;
            margin-left: 21.5px;
            margin-bottom: 8px;
          }
        }
        .bei {
          height: 20px;
          width: 73.5px;
          background: url('../../assets/image/newVersion/countDown.png')
            no-repeat;
          background-size: 100% 100%;
          margin-bottom: 0.5px;
          position: absolute;
          right: 18px;
          margin-bottom: 9px;
          > div {
            width: 70px;
            font-weight: bold;
            font-size: 10px;
            transform: scale(0.78);
            text-align: center;
            // padding: 5px;
            // padding-right: 3px;
            // padding-left: 29px;
            color: red;
            line-height: 12px;
            // margin-right: -3px;
            position: absolute;
            right: -6.8px;
            top: 20%;
            transform: translateY(-25%);
          }
        }
        .killActivityIMG {
          height: 70px;
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          justify-content: space-between;
          border-radius: 10px;
          overflow: hidden;
          margin-top: 4px;
          .ITEMimg1 {
            width: 70px;
            height: 70px;
            position: relative;
            // margin-bottom: 11.5px;
          }
          .ITEMimg1::before {
            position: absolute;
            bottom: 3px;
            left: 5px;
            content: '';
            background: url('../../assets/image/newVersion/flash.png') no-repeat;
            background-size: 100%;
            width: 60px;
            height: 15px;
          }
        }
      }
      .subsidies {
        height: 115px;
        background: url('../../assets/image/newVersion/subsidies111.png')
          no-repeat;
        background-size: 100%;
        padding: 10px;
        margin-top: 12px;
        .kill_top {
          display: flex;
          align-items: center;
          .titleM {
            color: #161616;
            font-size: 15px;
            font-weight: bold;
            margin-left: 23px;
            // margin-bottom: 10px;
          }
        }
        .killActivityIMG {
          height: 70px;
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          justify-content: space-between;
          border-radius: 10px;
          overflow: hidden;
          margin-top: 11px;
          .ITEMimg1 {
            width: 70px;
            height: 70px;
            position: relative;
          }
          .ITEMimg1::before {
            position: absolute;
            bottom: 3px;
            left: 5px;
            content: '';
            background: url('../../assets/image/newVersion/subsidiesIMG.png')
              no-repeat;
            background-size: 100%;
            width: 60px;
            height: 15px;
          }
        }
      }

      .titleM {
        color: #161616;
        font-size: 15px;
        font-weight: bold;
        margin-left: 23px;
      }
    }
  }

  .personalityTags {
    display: flex;
    flex-wrap: wrap;
    padding: 5px 0;
    > div {
      margin-right: 5px;
      margin-top: 5px;
      font-size: 10px;
      border: 1px solid #d1020c;
      border-radius: 3px;
      p {
        color: #d1020c;
        padding: 2px;
      }
    }
  }
  .tailMark {
    background: #d1020c;
    color: white;
    font-size: 10px;
    border-radius: 10px;
    padding: 2px 5px;

    height: 16px;
    line-height: 10px;
    margin-right: 5px;
    vertical-align: text-bottom;
  }
}
.title {
  font-size: 14px;
  // line-height: 20.424px;
  height: fit-content;
  @include no-wrap-multi(2);
  img {
    height: 17px;
    border: none;
    vertical-align: text-bottom;
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
      padding-bottom: 10px;
      .shopImg {
        width: 100%;
        height: 174px;
        margin-bottom: 10px;
        border-radius: 8px;
      }
      .shopTitle {
        color: #3c3c3c;
        font-size: 14px;
        line-height: 20.4225px;
        margin-bottom: 6px;
        width: 140px;
        overflow: hidden;
        word-break: break-all;
        text-overflow: ellipsis;
        margin-left: 10px;
        white-space: nowrap;
      }
      .price {
        font-size: 16px;
        color: #d1020c;
        margin-left: 12px;
      }
      .linePrice {
        font-size: 13px;
        color: #999;
        margin: 0 5px;
        text-decoration: line-through;
      }
      .sale {
        display: flex;
        align-items: center;
        margin-top: 7px;
        margin-left: 12px;
        .num {
          font-size: 12px;
          color: #999;
        }
      }
    }
  }
  .goodsBoxL {
    margin-right: 2%;
  }
}
.popUp {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.363);
  z-index: 999;
  > div {
    width: 80%;
    position: absolute;
    top: 55%;
    left: 50%;
    transform: translate(-55%, -50%);
    // .rule {
    //   position: absolute;
    //   bottom: 0;
    //   left: 0;
    //   width: 100%;
    //   height: 20%;
    // }
    .tiao {
      width: 200px;
      height: 48px;
      position: absolute;
      bottom: 40px;
      right: 18%;
    }
    .x {
      width: 35px;
      height: 35px;
      position: absolute;
      // bottom: 10px;
      // margin-top: 20px;
      right: 45%;
    }
    img {
      display: block;
      width: 100%;
      border-radius: 10px;
    }
  }
}

.suspension {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  position: fixed;
  top: 80vh;
  left: 78vw;
  z-index: 10;
  img {
    display: block;
    width: 100%;
    height: 100%;
  }
}
.discountBox {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  position: fixed;
  bottom: 15vh;
  left: 78vw;
  z-index: 1000;
  img {
    display: block;
    width: 100%;
    height: 100%;
  }
}
.openingPage {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  position: relative;
  img {
    position: absolute;
    width: 70%;
    height: 40%;
  }
  .openingPageIcon {
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    top: 75%;
  }
}
.van-popup {
  background-color: transparent;
}
.luck {
  //  background-image: url(../../assets/image/luck1.png);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 9rem;
  //  background-color: springgreen;
  //  opacity: 0.5;
  .luck_top {
    //  background-color: red;
    padding-top: 50px;
    height: 265px;
    img {
      height: 100%;
    }
  }
  .luck_bottom {
    width: 50px;
    height: 41px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.dyjico {
  font-size: 0.4rem;
}
.colon {
  display: inline-block;
  // margin: 0 4px;
  color: #ee0a24;
}
.block {
  display: inline-block;
  width: 22px;
  color: rgb(248, 18, 18);
  font-size: 12px;
  text-align: center;
  // background-color: #ee0a24;
}
.Loading {
  width: 140px;
  height: 72px;
}
.van-card__title {
  font-size: 14px;
  color: #333;
}
.main-home {
  .van-pull-refresh {
    overflow: initial;
    // height: 100%;
    // width: 100%;
  }
}
.originPrice {
  // float: left;
  margin-left: 5px;
  font-size: 12px;
  color: #999;
  text-decoration: line-through;
}
// :deep( .header) {
//   background: #930200ff;

//   &::after {
//     content: inherit;
//   }
//   .van-nav-bar__content {
//     padding-bottom: 20px;
//   }
// }
:deep(.header.van-hairline--bottom::after) {
  border: 0;
}
.search-box {
  padding: 4px 10px;
  height: 100%;
  border-radius: 2px;
  color: #333;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: left;
  font-size: 12px;
}
.search-tit {
  margin-left: 5px;
}

.goTop {
  position: relative;
  background: #f5f5f5;
  // margin-top: -20px;
  border-radius: 10px;
  padding: 12px 12px 0 12px;
  .preferential {
    border-radius: 9px;
    width: 100%;
    margin-top: 12px;
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
  .openShop {
    display: flex;
    justify-content: space-between;
    .left,
    .right {
      background: #fff;
      margin-top: 10px;
      padding: 10px;
      border-radius: 9px;
      width: 170px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .tit {
        .tit1 {
          font-size: 14px;
          font-weight: 500;
          line-height: 16px;
          color: #333;
        }
        .tit2 {
          color: #999;
          font-size: 11px;
          line-height: 15px;
          margin-top: 5px;
          font-weight: 500;
        }
      }
      .icon {
        width: 37.5px;
        height: 37.5px;
      }
    }
  }
}
.goTops {
  position: relative;
  background: #f5f5f5;
  border-radius: 10px;
  padding: 10px 10px 0 10px;
}
.activity-box {
  display: flex;
  padding: 15px 15px 10px 15px;
  justify-content: space-between;
  .prefecture {
    // background: url("../../assets/image/activity/prefectureBg.png") no-repeat;
    background: url('../../assets/image/activity/l11.png') no-repeat;
    background-size: 100% 100%;
  }
  .shop {
    // background: url("../../assets/image/activity/shopBg.png") no-repeat;
    background: url('../../assets/image/activity/r11.png') no-repeat;
    background-size: 100% 100%;
  }
  .prefecture,
  .shop {
    width: 165px;
    height: 80px;
    color: #fefdfd;
    position: relative;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    img {
      width: 60px;
      height: 60px;
      position: absolute;
      bottom: 10px;
      right: 8px;
    }
    .text {
      padding-left: 8.5px;
    }
    h2 {
      margin-top: 18px;
      font-size: 18px;
      font-weight: normal;
    }
    p {
      margin-top: 9px;
      font-size: 14px;
    }
  }
}

.van-image {
  width: 100%;
  height: 100%;
}
.activity {
  width: 100vw;
  height: 100vh;
  background-image: url(../../assets/image/Activityzone.png);
  background-size: 100%;

  .banner {
    color: #ffffff;
    margin-left: 10px;
  }
}
.van-card__header {
  background-color: #fff;
}
.activity_middle {
  margin: 140px 1.94667rem 40px 2.94667rem;
}
.activity_middle_text {
  width: 220px;
  height: 54px;
  font-size: 40px;
  font-family: PingFang SC;
  font-weight: bold;
  color: #fcfbfb;
}
.text_activity {
  width: 67px;
  height: 16px;
  font-size: 17px;
  font-family: PingFang SC;
  font-weight: bold;
  color: #ffffff;
  margin-left: 140px;
}

.activity_content {
  // height: 80%;
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 10px;
  overflow: auto;
  background-color: #fff;
  .info {
    //  padding: 10px 0; 0.21333rem 0.42667rem
    //  border-radius: 10px;
    margin-top: 5px;
    margin-bottom: 5px;
  }
}
.van-card {
  padding: 0 !important;
  border-radius: 10px;
}
.buy {
  // padding-top: 4px;
  padding: 2px 8px;
  // width: 75px;
  // height: 28px;
  // background: linear-gradient(66deg, #ff9429 0%, #ff7200 100%);
  background-color: #cf0000;
  border-radius: 14px;
  width: 80px;
  text-align: center;
}
.van-card__price {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .price_cls {
    padding-top: 8px;
  }
}
.buy_text {
  // width: 55px;
  // height: 13px;
  font-size: 13px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #fefefe;
  // padding-left: 10px;
}
.fa {
  color: #ff7502;
  margin-left: 10px;
}
.van-card__bottom {
  margin-top: 10px;
}
.price_cls {
  color: #d20202;
  font-size: 15px;
}
.title_text1 {
  font-size: 13px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #333333;
}
.van-card__content {
  padding: 10px 0px 4px 0;
  // padding: 10px 10px 0  0;
  background-color: #fff;
}
.van-card__thumb {
  // width: 40%;
  // height: 130px;
  width: 110px;
  height: 110px;
}
.van-card__thumb img {
  border-radius: 0;
}
.goodsback {
  padding-top: 10px;
}
.van-card__thumb img {
  border-radius: 10px;
}
.limitedactivities {
  // width: 100%;
  // height: 100%;
  margin: 15px 15px 10px 15px;
  background: #fff;
  border-radius: 5px;
  .activity_content {
    // height: 80%;
    // margin-left: 10px;
    // margin-right: 10px;
    border-radius: 10px;
    overflow: auto;
    .info {
      //  padding: 10px 0; 0.21333rem 0.42667rem
      //  border-radius: 10px;
      margin-top: 5px;
      margin-bottom: 5px;
    }
  }
  .title_time {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    align-items: center;
    .title_text {
      font-size: 12px;
      color: #cf0000;
      font-weight: bold;
      text-align: center;
      width: 80px;
      height: 23px;
      align-items: center;
      display: flex;
      .tubiao {
        padding-left: 5px;
        line-height: 11px;
        img {
          width: 7px;
          height: 11px;
        }
      }
    }
    .title_timer {
      font-size: 13px;
      color: #cf0000;
      background: url('../../assets/image/timer.png') no-repeat;
      background-size: 100% 100%;
      // padding: 10px;
      line-height: 23px;
    }
    .more {
      display: flex;
      font-size: 14px;
    }
    .van-count-down {
      line-height: 8px;
    }
  }
  .content_time {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    .content_img {
      width: 40%;
      height: 120px;
      img {
        width: 100%;
        height: 100%;
        background-size: 100%;
      }
    }
  }
  .content_message {
    width: 60%;
    height: 120px;
    margin-left: 10px;
    .shop_name {
      font-size: 18px;
    }
    .shop_text {
      font-size: 18px;
    }
    .footer_message {
      display: flex;
      justify-content: space-between;
      // width: 60%;
      // text-align: center;
      // margin-top: 60px;
      // height: 120px;
      .price_text {
        // width: 50px;
        // height: 100%;
        // margin-bottom: 10px;
        // padding: 10px;
        // border: 1px;
        // background: green;
        // width: 50px;
        // height: 50px;
        .price_left {
          padding-right: 10px;
          width: 60%;
          height: 100%;
        }
        .price_right {
          color: #fff;
        }
      }
      .gobuy {
        // width: 2rem;
        // height: 0.1rem;
        // border: 1px;
        // background: yellow;
      }
    }
  }
}
.complete {
  background: linear-gradient(66deg, #747372 0%, #474747 100%);
}
.s {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: -9px;
}
.city_a {
  display: flex;

  .city_b {
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    border-radius: 12.5px;
    padding: 0 10px;
    span {
      color: #fff;
      font-size: 11px;
      line-height: 25px;
    }
  }
}
.top {
  width: 100%;
  height: 157px;
  border: 0.1px solid transparent;
  background-size: 100% 100%;
  position: sticky;
  top: 0;
  z-index: 5;
  .head {
    display: flex;
    justify-content: space-between;
    > span {
      display: flex;
      align-items: center;
    }
  }
  .openShop {
    width: 110px;
    height: 22px;
    display: flex;
    position: absolute;
    right: 4px;
    bottom: 14px;
    background: #ffffff;
    border-radius: 20px;
    justify-content: center;
    align-items: center;
    padding: 0 2px 0 5px;
    > img {
      width: 14px;
      height: 14px;
    }
    > p {
      font-size: 11px;
      margin: 0 0 0 4px;
      font-weight: 600;
    }
  }
  > p {
    font-size: 18px;
    color: #fff;
    font-weight: bold;
    margin: 35px 14px 10px 15px;
    display: flex;
    align-items: center;
    img {
      margin: 0 10px 0 4.5px;
    }
    .weather {
      font-size: 15px;
      color: #fff;
      font-weight: normal;
    }
  }
  > div {
    margin-right: 12px;
    .icongengduo1 {
      font-size: 22px;
      color: #fff;
    }
  }
}
.zindex99 {
  z-index: 99 !important;
  height: 160px;
  position: fixed;
  top: 0;
}

.search_content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 92%;
  margin-left: 4%;
  height: 32px;
  background: #ffffff;
  border-radius: 16px;
  padding: 0 15px 0 12px;

  .search_left {
    display: flex;
    align-items: center;
    span {
      font-size: 14px;
      color: #383838;
      margin-left: 5px;
    }
  }
  .search_right {
    display: flex;
    align-items: center;
    > div {
      height: 20px;
      width: 1px;
      background: #eeefee;
      margin: 14.5px;
    }
  }
}
.recommend_title {
  p {
    font-size: 17px;
    color: #161616;
    font-weight: bold;
  }
  div {
    font-size: 14px;
    color: #555;
    display: flex;
    align-items: center;
    .shareHeader {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      margin-right: 5px;
    }
  }
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.Classification {
  display: flex;
  justify-content: space-between;
  padding: 20px 26px 13px 29px;
  .Label {
    text-align: center;
    h5 {
      color: #161616;
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 6px;
    }
    p {
      font-size: 12px;
      color: #808080;
    }
    .actives {
      color: #fe3746;
    }
    .actives1 {
      background: #fe3746;
      font-size: 11px;
      color: #fff;
      padding: 2px 4px;
      border-radius: 250px;
    }
  }
}
.homeTables {
  padding: 0 70px;
  margin-bottom: 5px;
  :deep(.van-tab) {
    font-size: 18px;
    font-weight: 550;
  }
  :deep(.van-tabs__line) {
    bottom: 20px;
    width: 60px;
    height: 4px;
    background: linear-gradient(
        to left,
        rgba(255, 255, 255, 1) 0%,
        rgba(255, 255, 255, 0) 50%,
        rgba(255, 255, 255, 1) 100%
      ),
      red no-repeat;
  }
}
.homeSubTables {
  height: 48px;
  position: static;
  .box {
    position: absolute;
    left: 0;
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    height: 48px;
    border-radius: 20px 20px 0 0;
    :deep(.van-tabs) {
      .van-tab__text {
        font-size: 13px;
      }
      .van-tab--active {
        font-weight: 600;
      }
      .van-tabs__line {
        bottom: 20px;
      }
    }
    > h3 {
      font-size: 13px;
      color: red;
      width: 74px;
      line-height: 48px;
      height: 48px;
      margin-left: 6px;
    }
  }
}
.lives {
  padding: 15px 0 22px 0;
  display: flex;
  justify-content: center;
  div {
    background: #fff;
    padding: 8px 15px;
    border-radius: 150px;
  }
  span {
    font-size: 14px;
    color: #161616;
    margin-left: 5px;
  }
}

.subcategory {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1px 0 15px;
  height: 44px;
  .subcategory_label {
    display: flex;
    align-items: center;
    justify-content: center;
    div {
      font-size: 16px;
      color: #fff;
      margin-left: 4px;
      flex-shrink: 0;
    }
  }
  :deep(.van-tabs__line) {
    background: #fff;
  }
  :deep(.van-tabs__nav) {
    background: rgba(255, 255, 255, 0);
    color: #000;
  }
  :deep(.van-tab) {
    color: #fff;
    font-size: 16px;
    padding-left: 0;
  }
  :deep(.van-tab--active) {
    font-size: 19px;
  }
  :deep(.van-tabs) {
    z-index: 9;
    width: 82%;
    height: 44px;
  }
}

:deep(.van-tabs__nav--line.van-tabs__nav--complete) {
  padding-right: 0;
  padding-left: 0;
}
.orderNew {
  position: absolute;
  bottom: 8px;
  left: 10px;
  .my-swipe {
    height: 30px;
    width: 170px;
    .swipe {
      // width: 170px;
      height: 30px;
      background: rgb(255 255 255 / 50%);
      border-radius: 15px;
      display: flex;
      align-items: center;
      padding: 0 10px;
      font-size: 0;
      img {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        margin-right: 5px;
      }
      .nick {
        display: flex;
        p {
          margin-top: 4px;
          color: #fff;
          font-size: 12px;
        }
        span {
          vertical-align: top;
        }
        .star {
          font-size: 16px;
        }
      }
    }
  }
}
.login {
  position: fixed;
  bottom: 1.33333rem;
  left: 10px;
  z-index: 99;
  width: 355px;
  .tips {
    display: flex;
    background: rgba(0, 0, 0, 0.45);
    justify-content: center;
    align-items: center;
    border-radius: 24px;
    padding: 5px 0px;
    img {
      width: 34px;
      height: 34px;
      border-radius: 50%;
    }
    .tip-tit {
      color: #fff;
      font-size: 14px;
      margin-left: 15px;
      margin-right: 50px;
    }
    .tip-btn {
      width: 100px;
      color: #fff;
      background: linear-gradient(180deg, #ff5252 0%, #fe2828 100%);
      border-radius: 20px;
      font-size: 15px;
      height: 34px;
      line-height: 34px;
      text-align: center;
    }
  }
}
:deep(.van-overlay) {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
