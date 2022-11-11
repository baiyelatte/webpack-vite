<template>
  <router-layout>
    <div class="goodsboxdis" ref="scrobs">
      <detailskeleton v-if="loading" />
      <template v-if="!loading">
        <download v-if="params.share"></download>
        <div class="searchBox" :style="{ top: 0 }">
          <van-icon class="back" name="arrow-left" @click="_backlogin" />
          <div class="search" @click="searchClick">
            <van-icon name="search" />
            <p>请输入商品名称</p>
          </div>
          <van-icon class="more" name="ellipsis" @click="moreFlag = true" />
        </div>
        <header
          class="header"
          :style="{
            backgroundColor: 'rgba(255, 255, 255, ' + opacity + ')',
            top: `calc(1.06667rem + ${0}px)`
          }"
        >
          <div class="header_layout">
            <div class="placeholder" :style="{ opacity: opacity }">
              <span
                :class="{ active: active == 'goods' }"
                @click="onScrollGoods"
                >宝贝</span
              >
              <span
                :class="{ active: active == 'comment' }"
                @click="onScrollComment"
                >评价</span
              >
              <span
                :class="{ active: active == 'detail' }"
                @click="onScrollDetail"
                >详情</span
              >
              <span
                :class="{ active: active == 'showcase' }"
                @click="onScrollShowcase"
                v-if="goodsInfo.openWindow"
                >橱窗</span
              >
              <!-- <a class="header-btn2" @click="service" > 
              
               <img class="_img" src="../../assets/image/lian.png" alt="">
             </a> -->
            </div>
          </div>
        </header>
        <!-- 商品 -->
        <div class="goods" id="goods">
          <van-swipe
            @change="onChange"
            class="swipebox"
            style="min-height: 300px"
          >
            <van-swipe-item
              v-for="(item, index) in goodsInfo.imgArrayUrls"
              :key="index"
            >
              <van-image
                style="width: 100%; height: 100%"
                :src="item"
                fit="cover"
              ></van-image>
            </van-swipe-item>
            <template #indicator>
              <div class="custom-indicator">
                {{ current + 1 }}/{{ goodsInfo.imgArrayUrls.length }}
              </div>
            </template>
          </van-swipe>
          <div class="module-price">
            <!-- <template v-if="flgT && goodsInfo.limitSaleFlag">
              <template
                v-if="
                  goodsInfo.killVoucherMoney && goodsInfo.killCanVoucherMoney
                "
              >
                <div class="real-price">
                  <div
                    class="ui-yen"
                    style="display: flex; align-items: center"
                  >
                    <span>
                      <i class="price-symbol">¥</i>
                      <span class="price">
                        {{ goodsInfo.killPayMoney }}
                      </span>
                    </span>
                    <span class="price dyjico">
                      {{ goodsInfo.killVoucherMoney }}
                    </span>
                    <div class="tailMarkBox">
                      <button v-if="goodsInfo.tailMark" class="tailMark">
                        {{ goodsInfo.tailMark }}
                      </button>
                    </div>
                    <div class="item-price" style="margin-left: 10px">
                      <del> ￥{{ goodsInfo.killPrice }} </del>
                    </div>
                  </div>
                </div>

              
              </template>
              <template v-else>
                <div style="display: flex; align-items: center">
                  <div class="real-price">
                    <span class="ui-yen"
                      ><i class="price-symbol">¥</i>
                      <span class="price">{{ priceNo }} </span>
                  
                    </span>
                  </div>
                  <div class="tailMarkBox">
                    <button v-if="goodsInfo.tailMark" class="tailMark">
                      {{ goodsInfo.tailMark }}
                    </button>
                  </div>
                  <div class="item-price" style="margin-left: 5px">
                    <del v-if="goodsInfo.linePrice"
                      >¥{{ goodsInfo.linePrice }}</del
                    >
                  </div>
                </div>
              </template>
              <div class="personalityTagsBox">
                <div
                  class="personalityTags"
                  v-if="goodsInfo.personalityTags && goodsInfo.templateId != 0"
                >
                  <div v-for="(item, index) in personalityTagsArr" :key="index">
                    <p>{{ item }}</p>
                  </div>
                </div>
                <p class="coupon" @click="couponClick">
                  <span>领券</span>
                  <van-icon name="arrow" />
                </p>
              </div>
            </template> -->
            <template>
              <div v-if="params.anchorId">
                <div class="anchorId-price">
                  <span style="margin-right: 5px">
                    ￥{{ goodsInfo.showPrice }}
                  </span>
                </div>
                <div class="personalityTagsBox">
                  <p
                    class="coupon"
                    @click="couponClick"
                    v-if="CouponList.length"
                  >
                    <span>领券</span>
                    <van-icon name="arrow" />
                  </p>
                </div>
              </div>
              <div v-else-if="!goodsInfo.templateId">
                <template v-if="goodsInfo.canVoucherMoney">
                  <div class="real-price">
                    <div
                      class="ui-yen"
                      style="display: flex; align-items: center"
                    >
                      <span>
                        <i class="price-symbol">¥</i>
                        <span class="price">
                          {{ goodsInfo.payMoney || 0 }}
                        </span>
                      </span>
                      <span class="price dyjico">
                        {{ goodsInfo.voucherMoney || 0 }}
                      </span>
                    </div>
                  </div>
                  <div class="item-price">
                    <span style="margin-right: 5px">
                      ￥{{ goodsInfo.showPrice }}
                    </span>
                    <del v-if="goodsInfo.linePrice"
                      >¥{{ goodsInfo.linePrice }}
                    </del>
                  </div>
                  <div class="personalityTagsBox">
                    <p
                      class="coupon"
                      @click="couponClick"
                      v-if="CouponList.length"
                    >
                      <span>领券</span>
                      <van-icon name="arrow" />
                    </p>
                  </div>
                </template>

                <template v-else>
                  <div class="real-price">
                    <span class="ui-yen"
                      ><i class="price-symbol">¥</i>
                      <span class="price">{{ priceNo }} </span>
                      <!-- <span v-if="goodsInfo.limitSaleFlag" class="price">{{
                    goodsInfo.killPrice
                  }}</span> -->
                    </span>
                  </div>
                  <div class="item-price" v-if="goodsInfo.linePrice">
                    <del v-if="goodsInfo.linePrice"
                      >¥{{ goodsInfo.linePrice }}</del
                    >
                  </div>
                  <div class="personalityTagsBox">
                    <p
                      class="coupon"
                      @click="couponClick"
                      v-if="CouponList.length"
                    >
                      <span>领券</span>
                      <van-icon name="arrow" />
                    </p>
                  </div>
                </template>
              </div>
              <div v-else-if="goodsInfo.templateId == 1">
                <template v-if="goodsInfo.canVoucherMoney">
                  <div class="real-price">
                    <div
                      class="ui-yen"
                      style="display: flex; align-items: center"
                    >
                      <span>
                        <span class="price">
                          ¥{{ goodsInfo.payMoney || 0 }}
                        </span>
                      </span>
                      <span class="price dyjico">
                        {{ goodsInfo.voucherMoney || 0 }}
                      </span>

                      <div class="tailMarkBox">
                        <button v-if="goodsInfo.tailMark" class="tailMark">
                          {{ goodsInfo.tailMark }}
                        </button>
                      </div>
                      <div class="item-price" style="margin-left: 10px">
                        <del> ￥{{ goodsInfo.showPrice }} </del>
                      </div>
                    </div>
                  </div>
                  <div class="personalityTagsBox">
                    <div
                      class="personalityTags"
                      v-if="
                        goodsInfo.personalityTags && goodsInfo.templateId != 0
                      "
                    >
                      <div
                        v-for="(item, index) in personalityTagsArr"
                        :key="index"
                      >
                        <p>{{ item }}</p>
                      </div>
                    </div>
                    <p
                      class="coupon"
                      @click="couponClick"
                      v-if="CouponList.length"
                    >
                      <span>领券</span>
                      <van-icon name="arrow" />
                    </p>
                  </div>
                </template>
                <template v-else>
                  <div class="real-price">
                    <div
                      class="ui-yen"
                      style="display: flex; align-items: center"
                    >
                      <span>
                        <span class="price">
                          ¥{{ goodsInfo.payMoney || 0 }}
                        </span>
                      </span>
                      <span class="price dyjico">
                        {{ goodsInfo.voucherMoney || 0 }}
                      </span>

                      <div class="tailMarkBox">
                        <button v-if="goodsInfo.tailMark" class="tailMark">
                          {{ goodsInfo.tailMark }}
                        </button>
                      </div>
                      <div class="item-price" style="margin-left: 10px">
                        <del> ￥{{ goodsInfo.showPrice }} </del>
                      </div>
                    </div>
                  </div>
                  <div
                    class="personalityTagsBox"
                    v-if="
                      goodsInfo.personalityTags && goodsInfo.templateId != 0
                    "
                  >
                    <div class="personalityTags">
                      <div
                        v-for="(item, index) in personalityTagsArr"
                        :key="index"
                      >
                        <p>{{ item }}</p>
                      </div>
                    </div>
                    <p
                      class="coupon"
                      @click="couponClick"
                      v-if="CouponList.length"
                    >
                      <span>领券</span>
                      <van-icon name="arrow" />
                    </p>
                  </div>
                </template>
              </div>
              <div v-else-if="goodsInfo.templateId == 2">
                <!-- <template v-if="goodsInfo.canVoucherMoney">
                  <div class="real-price">
                    <div
                      class="ui-yen"
                      style="display: flex; align-items: center"
                    >
                      <span>
                        <span class="price"> ¥{{ goodsInfo.payMoney }} </span>
                      </span>
                      <span class="price dyjico">
                        {{ goodsInfo.voucherMoney }}
                      </span>

                      <div class="tailMarkBox">
                        <button v-if="goodsInfo.tailMark" class="tailMark">
                          {{ goodsInfo.tailMark }}
                        </button>
                      </div>
                      <div class="item-price" style="margin-left: 10px">
                        <del> ￥{{ goodsInfo.showPrice }} </del>
                      </div>
                    </div>
                  </div>
                  <div class="personalityTagsBox">
                    <div
                      class="personalityTags"
                      v-if="
                        goodsInfo.personalityTags && goodsInfo.templateId != 0
                      "
                    >
                      <div
                        v-for="(item, index) in personalityTagsArr"
                        :key="index"
                      >
                        <p>{{ item }}</p>
                      </div>
                    </div>
                    <p
                      class="coupon"
                      @click="couponClick"
                      v-if="CouponList.length"
                    >
                      <span>领券</span>
                      <van-icon name="arrow" />
                    </p>
                  </div>
                </template> -->
                <template>
                  <div style="display: flex; align-items: center">
                    <div class="real-price">
                      <span class="ui-yen">
                        <!-- <i class="price-symbol">¥</i> -->
                        <span class="price">¥{{ priceNo }} </span>
                      </span>
                    </div>
                    <div class="tailMarkBox">
                      <button v-if="goodsInfo.tailMark" class="tailMark">
                        {{ goodsInfo.tailMark }}
                      </button>
                    </div>
                    <div class="item-price" style="margin-left: 5px">
                      <del v-if="goodsInfo.linePrice"
                        >¥{{ goodsInfo.linePrice }}</del
                      >
                    </div>
                    <!-- <div class="item-price" style="margin-left: 5px" v-else>
                      <del v-if="goodsInfo.linePrice"
                        >¥{{ goodsInfo.killPrice }}</del
                      >
                    </div> -->
                  </div>
                  <div class="personalityTagsBox">
                    <div
                      class="personalityTags"
                      v-if="
                        goodsInfo.personalityTags && goodsInfo.templateId != 0
                      "
                    >
                      <div
                        v-for="(item, index) in personalityTagsArr"
                        :key="index"
                      >
                        <p>{{ item }}</p>
                      </div>
                    </div>
                    <p
                      class="coupon"
                      @click="couponClick"
                      v-if="CouponList.length"
                    >
                      <span>领券</span>
                      <van-icon name="arrow" />
                    </p>
                  </div>
                </template>
              </div>
            </template>
            <div class="collect" @click="_gz">
              <img
                v-if="goodsInfo.flag == 2 || !goodsInfo.flag"
                src="@/assets/image/goodsDetail/heart2.png"
                alt=""
              />
              <img
                v-if="goodsInfo.flag == 1"
                src="@/assets/image/goodsDetail/heart1.png"
                alt=""
              />
              <p>收藏</p>
            </div>
          </div>

          <section class="goods-title title">
            <img
              v-if="goodsInfo.titleCardImage"
              :src="goodsInfo.titleCardImage"
              alt=""
            />
            {{ goodsInfo.goodsName }}
          </section>
          <div class="module-adds">
            <!-- <p class="subbranch">西兴分店</p> -->
            <span class="delivery">库存: {{ goodsInfo.enableQuantity }}</span>
            <span class="sales">销量 {{ goodsInfo.buyNumber }}</span>
          </div>
          <div
            class="blank_line"
            style="height: 10px; background: rgb(246, 246, 246)"
          ></div>
          <div></div>
        </div>
        <!-- 评价 -->
        <div class="comment" ref="comment" id="comment">
          <div class="commentTop">
            <p>
              商品评价<span v-if="goodsInfo.goodsEvaluateList.length"
                >({{ goodsInfo.goodsEvaluateCount }}+)</span
              >
            </p>
            <div
              @click="
                $router.push({
                  path: `/evaluate/${$route.params.id}`
                })
              "
            >
              <span>查看更多</span>
              <van-icon name="arrow" />
            </div>
          </div>
          <ratelist
            v-if="goodsInfo.goodsEvaluateList.length"
            :ratedata="goodsInfo.goodsEvaluateList.slice(0, 1)"
          />
          <div v-else class="nullComment">
            <p>暂无评价</p>
          </div>
        </div>
        <!-- 店 -->
        <div
          class="FrameLayout"
          v-if="goodsInfo.shopInfo"
          @click="godetailk(goodsInfo.shopInfo.id)"
        >
          <div class="ImageView">
            <img
              v-lazy="goodsInfo.shopInfo.logoImgUrl"
              style="
                width: 45px;
                height: 45px;
                display: inline-block;
                vertical-align: middle;
                border-radius: 5px;
              "
              alt=""
            />
          </div>
          <div class="TextView">
            <h5
              style="
                font-size: 14px;
                width: 80%;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              "
            >
              {{ goodsInfo.shopInfo.name }}
            </h5>
            <p
              style="
                float: left;
                font-size: 14px;
                padding-top: 10px;
                width: 100%;
              "
            >
              <span style="float: left">信用等级：</span>
              <van-rate
                style="float: left"
                :value="goodsInfo.shopInfo.evGrade"
                size="14"
                color="#ee0a24"
                allow-half
                void-icon="star"
                void-color="#eee"
              />
            </p>
          </div>

          <van-icon name="arrow" />
        </div>
        <!-- 店铺推荐 -->
        <div class="shopRecommend">
          <div class="shopRecommendTop">
            <p>店铺推荐</p>
            <div @click="godetailk(goodsInfo.shopInfo.id)">
              <span>查看更多</span>
              <van-icon name="arrow" />
            </div>
          </div>
          <div class="shopRecommendCount">
            <div
              class="item"
              v-for="(item, index) in shopList"
              :key="index"
              @click="getDetails(item.goodsId)"
            >
              <img :src="item.logoImgUrl" alt="" />
              <div class="title">{{ item.goodsName }}</div>
              <p class="price"><span>￥</span>{{ item.showPrice }}</p>
            </div>
          </div>
        </div>
        <div
          class="blank_line"
          style="height: 10px; background: rgb(246, 246, 246)"
        ></div>
        <!-- 详情 -->
        <div class="detail" ref="detail" id="detail">
          <div class="line-box">
            <img src="@/assets/image/goodsDetail/1.png" alt="" />
            <p>商品详情</p>
            <img src="@/assets/image/goodsDetail/2.png" alt="" />
          </div>
          <div class="modules-desc">
            <div class="wpimagetext-item" v-html="goodsInfo.details"></div>
          </div>
        </div>
        <div
          class="blank_line"
          style="height: 10px; background: rgb(246, 246, 246)"
        ></div>
        <div
          class="blank_line"
          style="height: 10px; background: rgb(246, 246, 246)"
          v-if="showcaseFlg"
        ></div>
        <!-- 橱窗 -->
        <div class="showcase" ref="showcase" id="showcase" v-if="showcaseFlg">
          <div class="line-box">
            <img src="@/assets/image/goodsDetail/1.png" alt="" />
            <p>橱窗展示</p>
            <img src="@/assets/image/goodsDetail/2.png" alt="" />
          </div>
          <img
            :src="item"
            alt=""
            v-for="(item, index) in showcaseImgs"
            :key="index"
          />
        </div>
        <!-- start-sale-num="skuOpenTheMinimum==1?skuMinimumOrderQuantity:1" -->
        <van-sku
          v-model="skushow"
          :sku="sku"
          :goods="goods_info"
          :goods-id="goodsId"
          :hide-stock="sku.hide_stock"
          :hide-selected-text="false"
          :quota="goodsInfo.limitSaleFlag && flgT ? quota1 : quota"
          :start-sale-num="
            skuMinimumOrderQuantity ? skuMinimumOrderQuantity : 1
          "
          :custom-stepper-config="customStepperConfig"
          @add-cart="_skuaddcart"
          @buy-clicked="_buyclicked"
          @sku-prop-selected="skuPropSelected"
          @sku-selected="skuSelected"
          @stepper-change="stepperChange"
          ref="getSkuData"
        >
          <!-- :quota="goodsInfo.limitSaleFlag && flgT ? quota1 : quota" -->

          <!-- :disable-stepper-input="goodsInfo.limitSaleFlag"  步进器禁止输入 -->
          <!-- 自定义 sku-header-price -->
          <template #sku-header-price="props">
            <template v-if="props.selectedSkuComb && props.selectedSkuComb">
              <div class="van-sku__goods-price" @click="handleClick(props)">
                <span class="van-sku__price-symbol">￥</span>
                <span class="van-sku__price-num">{{
                  skuPayMoneyFilter(props.selectedSkuComb)
                }}</span>

                <span
                  class="dyjico cartdet"
                  v-show="isShowSkuVoucherMoney(props.selectedSkuComb)"
                >
                  {{ props.selectedSkuComb.voucherMoney }}</span
                >
              </div>
            </template>
            <template v-else>
              <div class="van-sku__goods-price">
                <span class="van-sku__price-symbol">￥</span>
                <span class="van-sku__price-num">{{ props.price }}</span>
              </div>
            </template>
          </template>
          <template #sku-messages>
            <div class="totalBox">
              <p>合计金额</p>
              <p>￥{{ totalMoney }}</p>
            </div>
          </template>
          <!-- 自定义 sku actions -->
          <!-- v-if="clickType==1" -->
          <template #sku-actions="props">
            <div class="van-sku-actions">
              <van-button
                v-show="clickType == 1"
                square
                size="large"
                type="danger"
                text="加入购物车"
                @click="addcart"
              >
              </van-button>
              <van-button
                v-show="clickType == 2"
                square
                size="large"
                type="danger"
                text="确定"
                @click="props.skuEventBus.$emit('sku:buy')"
              >
              </van-button>
            </div>
          </template>
        </van-sku>
        <van-goods-action>
          <!-- <van-goods-action-icon icon="star" text="已收藏" color="#ff5000" />  $router.push({name: 'goodsshopinfo', params: {shopInfoid: goodsInfo.shopInfo.id}}) -->
          <!-- <van-goods-action-icon
            icon="manager-o"
            text="我的"
            @click="_gotourl('user')"
          /> -->
          <!-- <van-goods-action-icon text="店铺" @click="godetailk(goodsInfo.shopInfo.id)">
            <img src="" alt="">
          </van-goods-action-icon> -->
          <div class="goodsAction" @click="godetailk(goodsInfo.shopInfo.id)">
            <img src="@/assets/image/goodsDetail/shop.png" alt="" />
            <p>店铺</p>
          </div>
          <div class="goodsAction" @click="service">
            <img src="@/assets/image/goodsDetail/service.png" alt="" />
            <p>客服</p>
          </div>
          <div class="goodsAction" @click="_gotourl('cart')">
            <img src="@/assets/image/goodsDetail/cart.png" alt="" />
            <p>购物车</p>
          </div>
          <!-- <van-goods-action-icon icon="star-o" text="收藏" @click="_gz" />
          <van-goods-action-icon
            icon="shopping-cart-o"
            text="购物车"
            @click="_gotourl('cart')"
          /> -->
          <!-- addcart -->
          <template
            v-if="
              goodsInfo.externalLinks == '' || goodsInfo.externalLinks == null
            "
          >
            <van-goods-action-button
              type="warning"
              text="加入购物车"
              @click="_clickadd(goodsInfo)"
            />
            <van-goods-action-button
              type="danger"
              text="立即购买"
              @click="_clickbuy(goodsInfo)"
            />
          </template>
          <van-goods-action-button
            v-else
            type="danger"
            text="立即购买"
            class="van-goods-action-button--danger1"
            @click="_externallink"
          />
        </van-goods-action>
        <div style="height: 1.33333rem"></div>
        <van-popup
          v-model="couponFlag"
          round
          position="bottom"
          :style="{ height: '50%' }"
          class="couponPop"
        >
          <p class="couponPopTitle">可领优惠券</p>
          <div class="couponCount">
            <van-list
              v-model="couponLoading"
              :finished="finished"
              finished-text="没有更多了"
              :immediate-check="false"
              @load="onLoad"
            >
              <div
                class="item"
                v-for="(item, index) in CouponList"
                :key="index"
              >
                <p class="type">
                  {{ item.applyType === 3 ? "平台优惠券" : "店铺优惠券" }}
                </p>
                <div>
                  <p class="price" v-if="item.couponType == 1">
                    ￥{{ item.discounts }}
                  </p>
                  <p class="price" v-if="item.couponType == 2">
                    ￥{{ item.discounts }}折
                  </p>
                  <p class="price" v-if="item.couponType == 3">
                    ￥{{ item.couponMin }}起
                  </p>
                  <div class="text">
                    <p>
                      {{
                        item.useLimit ? "满" + item.useLimit + "可用" : "无门槛"
                      }}
                    </p>
                    <p>
                      {{
                        item.receivedValidEnd && item.receivedValidStart
                          ? "有效期" +
                            getTime(item.receivedValidStart) +
                            "-" +
                            getTime(item.receivedValidEnd)
                          : item.receivedTodayEffect
                          ? "领取后当日起" + item.receivedValidDay + "天内有效"
                          : "领取后次日起" + item.receivedValidDay + "天内有效"
                      }}
                    </p>
                  </div>
                  <div v-if="userinfoMessage">
                    <button
                      v-if="!enumReceiveRuleFn(item)"
                      class="get"
                      @click="getcouponClick(item.couponId, index)"
                    >
                      领取
                    </button>
                    <button
                      v-else-if="enumReceiveRuleFn(item) === 1"
                      class="already"
                    >
                      领取成功
                    </button>
                    <button v-else class="already">已领完</button>
                  </div>
                  <div v-else>
                    <button
                      class="get"
                      @click="getcouponClick(item.couponId, index)"
                    >
                      领取
                    </button>
                  </div>
                </div>
              </div>
            </van-list>
          </div>
          <button class="closeCoupon" @click="couponFlag = false">关闭</button>
        </van-popup>
        <van-popup
          class="morePro"
          v-model="moreFlag"
          round
          position="bottom"
          :style="{ height: '30%' }"
        >
          <div class="moreContent">
            <div @click="service">
              <img src="@/assets/image/more/1.png" alt="" />
              <p>客服小蜜</p>
            </div>
            <div @click="$router.push('/index')">
              <img src="@/assets/image/more/2.png" alt="" />
              <p>回到首页</p>
            </div>
            <div @click="$router.push('/user')">
              <img src="@/assets/image/more/3.png" alt="" />
              <p>我的</p>
            </div>
            <div @click="$router.push('/cart')">
              <img src="@/assets/image/more/4.png" alt="" />
              <p>购物车</p>
            </div>
          </div>
          <button class="cancel" @click="moreFlag = false">取消</button>
        </van-popup>
      </template>
    </div>
    <router-view></router-view>
    <!-- 红包悬浮按钮 -->
    <div
      class="discountBox"
      v-if="getActivityShareInfo"
      ref="discountBox"
      @touchmove="discountTouchmove"
      @click="discountClick"
    >
      <img src="@/assets/image/share/qrj.png" alt="" />
    </div>
  </router-layout>
</template>
<script>
import detailskeleton from "@/components/goods/detailskeleton";
import download from "@/components/download";
import ratelist from "@/components/goods/ratelist";
import { mapGetters, mapActions } from "vuex";
import {
  getGoodsInfo,
  getsGoodsSku,
  addshoppingCart,
  getUserInfo,
  checkUserKill,
  getCouponList,
  couponReceive,
  goodsCollect,
  getQuery,
  getEnjoyUser
} from "api";
import wechatShare from "@/utils/wxShare.class.js";
import { handleLogin } from "@/utils";
import { tabBarConfig } from "@/config";
import { Dialog } from "vant";
export default {
  name: "detail",
  props: {
    winwidth: {
      default: document.documentElement.clientWidth
    },
    winheight: {
      default: document.documentElement.clientHeight
    }
  },
  components: {
    detailskeleton,
    ratelist,
    download
  },
  data() {
    return {
      shopList: [],
      couponLoading: false,
      finished: false,
      moreFlag: false,
      CouponList: [],
      couponFlag: false,
      priceNo: 0,
      limitSaleFlag: false,
      activelock: true,
      topValue: 0, // 上次滚动条到顶部的距离
      timer: null, // 定时器
      loading: true,
      active: "goods",
      scrollTop: 0,
      opacity: 0,
      current: 0,
      // sku1: [],
      defualtoffsetTop: 50 + 50,
      goodsInfo: {},
      skushow: false,
      clickType: 1, //1购物车2购买
      isSelectedSku: null, // 是否选中商品，null代表未选中
      goodsId: null, //商品id
      goodsSkuId: 0, //商品skuid
      buyNum: 1, //购买数量
      skucate: true,
      quota: 0, // 限购
      quota1: 0,
      quota_used: 0,
      goodsSpecJson: [],
      resData1: [],
      goodsAttributesJson: [],
      customStepperConfig: {
        // 自定义限购文案
        quotaText: ""
      },
      customStepperConfig1: {
        // 自定义限购文案
        quotaText1: ""
      },
      start_sale_num: 2,
      goods_info: {
        price: 1,
        title: "测试商品",
        picture: "https://b.yzcdn.cn/vant/sku/shoes-1.png"
      },
      showcaseFlg: false,
      showcaseImgs: [],
      //  skus:[],
      //  skuss: [],
      sku: {
        price: 180,
        stock_num: 2218,
        none_sku: false,
        hide_stock: false,
        collection_id: 2261,
        tree: [],
        list: []
      },
      showType: this.$store.state.showType || false,
      params: {},
      totalMoney: 0,
      flgT: false,
      killF: false,
      personalityTagsArr: [],
      wechatShare: null,
      pageNum: 1,
      pageSize: 10,
      headerAttr: LukeappApi.getattribute(),
      skuMinimumOrderQuantity: "",
      userinfoMessage: null,
      newUserFlag: false,
      // shareGoodsId: "",
      shareUid: ""
    };
  },
  async mounted() {
    this.goodsId = this.$route.params.id;
    this.$refs.scrobs.addEventListener("scroll", this.handleScroll);
    this.wechatShare = new wechatShare();
    await this._getGoodsInfo();

    this._getCouponList();
  },
  computed: {
    ...mapGetters({
      getcartinfo: "getcartinfo",
      mapgetuserinfo: "getuserinfo",
      getdellFlag: "getdellFlag"
    }),
    ...mapGetters("activity", ["getActivityShareInfo", "getActivityLocalInfo"])
  },
  created() {
    let that = this;
    // 取诚聊购过来
    // that._gettokens();
    // that._getsGoodsSku();
    that._getUserInfo();
    // 判断是不是城聊客跳转
    let arr = window.location.href.split("?")[1].split("&");
    for (let i = 0; i < arr.length; i++) {
      let a = arr[i].split("=");
      this.params[a[0]] = a[1];
    }
    if (this.params.carrierId) {
      this.$store.commit("setDellFlag", true);
    }
    // console.log(this.$route.params.id, "goodsId");
    // console.log(this.$route.query.punionid, "punionid");
    // this.shareGoodsId = this.$route.params.id; //分享商品id
    // this.shareUid = this.$route.query.punionid; //分享人id
    // if (this.shareUid) {
    //   //有分享商品id就调接口
    //   this.getShareInfo();
    // }
  },
  methods: {
    isShowSkuVoucherMoney({ skuCanVoucherMoney, canVoucherMoney }) {
      const { skuKillInventory } = this.$route.query;

      if (skuKillInventory) {
        return skuCanVoucherMoney;
      }

      return canVoucherMoney;
    },
    skuPayMoneyFilter({
      payMoney,
      skuCanVoucherMoney,
      skuVoucherMoney,
      skuKillPrice
    }) {
      // const { skuKillInventory } = this.$route.query;
      // if (skuKillInventory) {
      //   if (skuCanVoucherMoney) {
      //     return skuVoucherMoney;
      //   } else {
      //     return skuKillPrice;
      //   }
      // }

      return payMoney;
    },
    handleClick(prop) {
      console.log(prop);
    },
    // 检验秒杀是否达到上线
    // kill() {
    //   let user = JSON.parse(window.localStorage.getItem("userinfo"));
    //   if (user && user.token) {
    //     checkUserKill({
    //       goodsId: this.resData1[0].goodsId,
    //       goodsSkuId: this.resData1[0].id,
    //     }).then((res) => {
    //       console.log(res);
    //       if (res.errorCode == 1) {
    //         if (res.data) {
    //           this.killF = true;
    //           console.log("继续购买");
    //         } else {
    //           this.killF = false;
    //           this.$toast("秒杀已达到上线，原价购买");
    //           this.priceNo = this.goodsInfo.showPrice;
    //         }
    //       }
    //     });
    //   } else {
    //   }
    // },
    /**
     * @description: 优惠券领取状态枚举
     * @param {*} couponInfo 优惠券信息
     * @return {number} {*} 1： 领取成功 0: 未领取 -1: 已领完
     */
    enumReceiveRuleFn(couponInfo) {
      const {
        couponResidueAmount, // 优惠券总剩余量
        dailyLimit, // 日限制 -1为不限制
        personResidueAmount, // 个人剩余
        todayReceiveAmount // 日领取总量
      } = couponInfo;

      if (couponResidueAmount <= 0) {
        return -1;
      }

      if (dailyLimit === -1) {
        return personResidueAmount > 0 ? 0 : 1;
      } else {
        if (dailyLimit - todayReceiveAmount > 0) {
          return personResidueAmount > 0 ? 0 : 1;
        }
        return -1;
      }
    },
    getDetails(id) {
      this.$router.push({
        path: `/detail/${id}?agencyUnionid=${
          this.$route.query.agencyUnionid || null
        }&fromPlatform=${this.$route.query.fromPlatform || null}`
      });
    },
    _getQuery() {
      getQuery({
        shopId: this.goodsInfo.shopInfo.id,
        pageNum: 1,
        pageSize: 10
      }).then((res) => {
        if (res.errorCode == 1) {
          let arr = res.data.content;
          if (arr.length > 6) {
            this.shopList = arr.slice(1, 6);
          } else {
            this.shopList = arr;
          }
        }
      });
    },
    getTime(time) {
      let str = time.split(" ")[0];
      return str.replace(/-/g, ".");
    },
    getcouponClick(couponId, index) {
      couponReceive({
        couponId: couponId,
        shopId: this.goodsInfo.shopInfo.id,
        shopName: this.goodsInfo.shopInfo.name
      }).then((res) => {
        if (res.errorCode == 1) {
          this.pageNum = 1;
          this.finished = false;
          this._getCouponList();
          this.$toast("领取成功");
        }
      });
    },
    onLoad() {
      this.pageNum++;
      this._getCouponList();
    },
    _getCouponList() {
      // console.log(this.goodsInfo, "goodsInfo");
      const shopId = this.goodsInfo?.shopInfo?.id;
      if (!shopId) return;
      this.couponLoading = true;
      getCouponList({
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        shopId: shopId
      }).then((res) => {
        this.userinfoMessage = res.data?.content[0]?.unionid;
        this.couponLoading = false;
        if (res.errorCode == 1) {
          if (this.pageNum >= res.data.pages) {
            this.finished = true;
          }
          if (this.pageNum == 1) {
            this.CouponList = [];
          }
          this.CouponList = this.CouponList.concat(res.data.content);
        }
      });
    },
    couponClick() {
      this.couponFlag = true;
      this.pageNum = 1;
    },
    searchClick() {
      this.$router.push({
        path: "/oldSearch",
        query: {
          title: "搜索",
          pageType: "jump"
        }
      });
    },
    // 橱窗
    onScrollShowcase(val) {
      let seft = this;
      seft.$refs.scrobs.scrollTo({
        top: seft.$refs.showcase.offsetTop - seft.defualtoffsetTop,
        behavior: "smooth"
      });
      seft.active = "showcase";
      seft.activelock = false;
    },
    godetailk(id) {
      this.$store.commit("setShowType", true);
      this.$router.push({
        name: "shopinfo",
        params: { shopId: id }
      });
    },
    service() {
      window.location.href = `https://yzf.qq.com/xv/web/static/chat/index.html?sign=37ef9b97817351957717cdbb1fb3b53708374ba573672f4fb385cf664728f448ddbba361c3cf4aa02bfe2f013d383c44d38a81ff`;
    },
    ...mapActions({
      setcartinfo: "setcartinfo",
      userinfo: "userinfo"
    }),
    // 立即购买
    _clickbuy(goodsInfo) {
      if (goodsInfo.shopInfo.shopStatus != 1) {
        Dialog.alert({
          message: "当前店铺暂不支持购买。",
          showConfirmButton: false,
          closeOnClickOverlay: true
        });
        setTimeout(() => {
          // this.$router.push('/newExclusive');
          console.log(111);
          Dialog.close();
        }, 2000);
        return;
      }
      if (this.$route.query.pageFrom == "new") {
        if (!this.newUserFlag) {
          this.$toast.fail("仅限新用户参加，您不是新用户哦！");
          return;
        }
        // if (this.mapgetuserinfo?.identAuthStatus !== 4) {
        //   this.$confirm({
        //     title: "温馨提示",
        //     message: "为了更好的服务平台用户，本次购买需要完成实名认证"
        //   }).then(() => {
        //     this.$router.push("/user/authentication");
        //   });
        //   return;
        // }
      }
      let user = JSON.parse(window.localStorage.getItem("userinfo"));
      if (user && user.token) {
        this.skushow = true;
        this.clickType = 2;
      } else {
        // this.$router.replace("/login").catch(() => {});
        // this.$router.push("/login").catch(() => {});
        // this.$router.push("/smslogin").catch(() => {});
        // let fullPath = this.$route.fullPath;
        // this.$router.replace({
        //   path: "/smslogin",
        //   query: { redirect: fullPath }
        // });
        handleLogin();
      }
    },
    // 加入购物车
    _clickadd(goodsInfo) {
      console.log("_clickadd");
      if (goodsInfo.shopInfo.shopStatus != 1) {
        Dialog.alert({
          message: "当前店铺暂不支持购买。",
          showConfirmButton: false,
          closeOnClickOverlay: true
        });
        setTimeout(() => {
          Dialog.close();
        }, 2000);
        return;
      }
      let user = JSON.parse(window.localStorage.getItem("userinfo"));
      if (user && user.token) {
        // if (this.goodsInfo.limitSaleFlag) {
        //   // console.log(1111);
        //   let s = new Date(
        //     this.goodsInfo.countdownStart.replace(/-/g, "/")
        //   ).getTime();
        //   let t = this.goodsInfo.countdown * 60 * 1000;
        //   let m = s + t;
        //   let n = new Date().getTime();

        //   if (n >= s && n <= m && this.goodsInfo.limitSaleFlag) {
        //     this.flgT = true;
        //     this.$toast("秒杀商品暂不支持加入购物车,请点击立即购买");
        //   } else {
        //     this.flgT = false;
        //     this.skushow = true;
        //     this.clickType = 1;
        //   }
        // } else {
        //   this.skushow = true;
        //   this.clickType = 1;
        // }
        if (this.$route.query.pageFrom == "new") {
          this.$toast("首单福利暂不支持加入购物车");
          return;
        }
        if (this.$route.query.pageFrom == "cityF") {
          this.$toast("活动商品暂不支持加入购物车");
          return;
        }
        if (
          this.$route.query.activityId ||
          (this.$route.query.officialSubsidy &&
            this.$route.query.enableQuantity != 0)
        ) {
          this.$toast("活动商品暂不支持加入购物车,请点击立即购买");
        } else {
          this.skushow = true;
          this.clickType = 1;
        }
      } else {
        // this.$router.replace("/login").catch(() => {});
        // this.$router.push("/login").catch(() => {});

        // this.$router.push("/smslogin").catch(() => {});
        let fullPath = this.$route.fullPath;
        this.$router.replace({
          path: "/smslogin",
          query: { redirect: fullPath }
        });
      }
    },
    accMul(arg1, arg2) {
      var m = 0,
        s1 = arg1.toString(),
        s2 = arg2.toString();
      try {
        m += s1.split(".")[1].length;
      } catch (e) {}
      try {
        m += s2.split(".")[1].length;
      } catch (e) {}
      return (
        (Number(s1.replace(".", "")) * Number(s2.replace(".", ""))) /
        Math.pow(10, m)
      );
    },
    stepperChange(value) {
      console.log(value);
      this.buyNum = value;
      let obj = this.$refs.getSkuData.getSkuData();
      // console.log(this.$refs.getSkuData.getSkuData(), 99999);
      // this.totalMoney = obj.selectedSkuComb.payMoney * this.buyNum;
      if (this.goodsInfo.limitSaleFlag) {
        let s = new Date(
          this.goodsInfo.countdownStart?.replace(/-/g, "/")
        ).getTime();
        let t = this.goodsInfo.countdown * 60 * 1000;
        let m = s + t;
        let n = new Date().getTime();

        if (
          n >= s &&
          n <= m &&
          this.goodsInfo.limitSaleFlag &&
          this.goodsInfo.killNumber
        ) {
          // console.log("限时秒杀");

          this.totalMoney = this.accMul(this.goodsInfo.killPrice, this.buyNum);
        } else {
          // console.log("正常");

          this.totalMoney = this.accMul(
            obj.selectedSkuComb.payMoney,
            this.buyNum
          );
        }
      }
      this.totalMoney = this.accMul(obj.selectedSkuComb.payMoney, this.buyNum);

      // if (!this.goodsInfo.limitSaleFlag) {
      //   this.totalMoney = this.accMul(
      //     obj.selectedSkuComb.payMoney,
      //     this.buyNum
      //   );
      //   // console.log(this.totalMoney,'704');
      // } else if (this.goodsInfo.limitSaleFlag) {
      //   this.totalMoney = this.accMul(this.goodsInfo.killPrice, this.buyNum);
      //   // console.log(this.totalMoney,'707');
      // }
    },
    _externallink() {
      window.location.href = this.goodsInfo.externalLinks;
    },
    _gotourl(urlname) {
      // JSON.parse(this.$route.query.fromPlatform) == null
      //    ?
      this.$router.push({ name: urlname });
      //  : this.$router.push({
      //     name: urlname,
      //     query: { displayType: "detail" },
      // });
    },
    _gettokens() {
      if (this.$route.query.token != undefined) {
        localStorage.setItem(
          "userinfo",
          JSON.stringify({ token: this.$route.query.token })
        );
        localStorage.setItem("CLAPP", true);
      }
    },

    // 改了这
    _getUserInfo() {
      // let that = this
      // // 参数
      // let dataa = {
      //   goodsId: that.$route.params.id,
      //   agencyUnionid: that.$route.query.agencyUnionid || null,
      //   // fromPlatform: that.$route.query.fromPlatform || null

      // }
      if (this.$route.query.token) {
        getUserInfo().then((res) => {
          // this.skushow = true
          //  this.sku=res.dataa.
          if (res && res.errorCode == 1) {
            this.userinfo(res.data);
          }
        });
      }
    },
    _gz() {
      let userinfo = JSON.parse(localStorage.getItem("userinfo"));
      if (!userinfo || !userinfo.unionid) {
        // this.$router.push("/smslogin");
        let fullPath = this.$route.fullPath;
        this.$router.replace({
          path: "/smslogin",
          query: { redirect: fullPath }
        });
        return;
      }
      goodsCollect({
        flag: this.goodsInfo.flag == 1 ? 2 : 1,
        unionid: userinfo.unionid,
        goodsId: this.$route.params.id
      }).then((res) => {
        if (res.errorCode == 1) {
          this.goodsInfo.flag = this.goodsInfo.flag == 1 ? 2 : 1;
          if (this.goodsInfo.flag == 1) {
            this.$toast("收藏成功");
          } else {
            this.$toast("取消收藏");
          }
        }
      });
    },
    _shopdbo() {
      this.$toast("功能暂未开放");
    },
    _skuaddcart(v) {
      // console.log(v);
      //点击加入购物车页面弹层后又出现的点击加入购物车事件
      // this.buyNum = v.selectedNum;
      this.goodsSkuId = v.selectedSkuComb.goodsSkuId;
      this.addcart();
    },
    _buyclicked(v) {
      // console.log(v, "767");
      // this.buyNum = v.selectedNum;
      if (v.selectedSkuComb.id != null) {
        this.goodsSkuId = v.selectedSkuComb.id;
      }
      this.skucate = false;
      this.onClickButton();
    },
    skuPropSelected() {},
    skuSelected(skuValue) {
      if (skuValue.selectedSkuComb) {
        const initSeletedNum = skuValue.selectedSkuComb.skuMinimumOrderQuantity;

        if (this.$refs.getSkuData) {
          this.$refs.getSkuData.selectedNum = initSeletedNum;
        }

        if (this.$refs.getSkuData?.$refs?.skuStepper) {
          this.$refs.getSkuData.$refs.skuStepper.currentNum = initSeletedNum;
        }

        if (this.goodsSkuId == null || this.goodsSkuId == 0) {
          this.goodsSkuId = skuValue.selectedSkuComb.id;
        }
        let obj = this.$refs.getSkuData.getSkuData();

        if (this.goodsInfo.limitSaleFlag) {
          let s = new Date(
            this.goodsInfo.countdownStart?.replace(/-/g, "/")
          ).getTime();
          let t = this.goodsInfo.countdown * 60 * 1000;
          let m = s + t;
          let n = new Date().getTime();
          // console.log(s, t, m, n);
          if (n >= s && n <= m && this.goodsInfo.killNumber && this.killF) {
            // console.log("限时秒杀1");
            skuValue.selectedSkuComb.payMoney = this.priceNo;

            this.limitSaleFlag = true;

            this.totalMoney = this.accMul(this.priceNo, this.buyNum);
            // console.log(this.totalMoney,'[[[[');
          } else {
            // console.log("正常1");
            skuValue.selectedSkuComb.payMoney = skuValue.selectedSkuComb.price;
            // console.log(skuValue.selectedSkuComb.price);
            this.limitSaleFlag = false;
            this.totalMoney = this.accMul(
              obj.selectedSkuComb.payMoney,
              this.buyNum
            );
            // console.log(this.totalMoney, obj.selectedSkuComb.payMoney,this.buyNum,']]]]]');
          }
        } else {
          // console.log(222);

          skuValue.selectedSkuComb.payMoney = skuValue.selectedSkuComb
            .canVoucherMoney
            ? skuValue.selectedSkuComb.payMoney
            : skuValue.selectedSkuComb.price;
          // sku选择更新图片
          if (this.goodsInfo.cateType == 2) {
            this.goods_info.picture = this.resData1.find(
              ({ id }) => id === skuValue.selectedSkuComb.id
            ).pic;
          }

          this.totalMoney = this.accMul(
            obj.selectedSkuComb.payMoney,
            this.buyNum
          );
          // console.log(skuValue);
          this.skuMinimumOrderQuantity =
            skuValue.selectedSkuComb.skuMinimumOrderQuantity;
          // console.log(this.skuMinimumOrderQuantity);

          // console.log(this.totalMoney);
        }

        // console.log(skuValue);
        // if (!this.goodsInfo.limitSaleFlag) {
        //   this.totalMoney = this.accMul(
        //     obj.selectedSkuComb.payMoney,
        //     this.buyNum
        //   );
        //   // console.log(this.totalMoney,'704');
        // } else if (this.goodsInfo.limitSaleFlag) {
        //   this.totalMoney = this.accMul(this.goodsInfo.killPrice, this.buyNum);
        //   // console.log(this.totalMoney,'707');
        // }
      }
      this.isSelectedSku = skuValue.selectedSkuComb;
    },
    _getGoodsInfo() {
      let that = this;
      let data = {
        goodsId: that.goodsId,
        agencyUnionid: that.$route.query.agencyUnionid || null,
        fromPlatform: that.$route.query.fromPlatform || null,
        at:
          that.$route.query.pageFrom == "new"
            ? "8"
            : that.$route.query.pageFrom == "cityF"
            ? "5"
            : "", //判断是不是从新人专享过来的
        activityId: that.$route.query.activityId,
        activityType: that.$route.query.activityType || ""
      };
      if (this.$route.query.activityId) {
        data.activityId = this.$route.query.activityId;
      } else if (this.$route.query.officialSubsidy) {
        data.officialSubsidy = this.$route.query.officialSubsidy;
        data.officialSubsidyId = this.$route.query.officialSubsidyId;
      }
      if (this.params.anchorId) {
        data.anchorId = this.params.anchorId;
      }
      return getGoodsInfo(data).then((res) => {
        if (res && res.errorCode === 1) {
          setTimeout(() => {
            that.loading = false;
          }, 200);
          that.goodsInfo = res.data;
          this._getQuery();
          this.wechatShare.check({
            title: res.data.goodsName,
            desc: `￥${res.data.showPrice}`,
            imgUrl: res.data.imgArrayUrls[0],
            link: window.location.href
          });
          if (this.goodsInfo.personalityTags) {
            this.personalityTagsArr = this.goodsInfo.personalityTags
              .split(",")
              .filter((item) => item);
          }
          if (that.goodsInfo.limitSaleFlag) {
            let s = new Date(
              that.goodsInfo.countdownStart?.replace(/-/g, "/")
            ).getTime();
            let t = that.goodsInfo.countdown * 60 * 1000;
            let m = s + t;
            let n = new Date().getTime();

            if (
              n >= s &&
              n <= m &&
              that.goodsInfo.limitSaleFlag &&
              that.goodsInfo.killNumber &&
              that.goodsInfo.userKillState
            ) {
              this.flgT = true;

              that.priceNo = that.goodsInfo.killPrice;
              // that.sku.price = that.goodsInfo.killPrice;
              // that.quota1 = res.data.killBuyPerson;
              if (that.goodsInfo.userKillState) {
                that.quota1 = res.data.killBuyPerson - res.data.userkillNums;
              }

              // that.customStepperConfig.quotaText = `总限购${res.data.killNumber}件，可买${that.quota1}件`;
            } else {
              this.flgT = false;

              that.priceNo = that.goodsInfo.showPrice;
              if (
                n >= s &&
                n <= m &&
                that.goodsInfo.limitSaleFlag &&
                that.goodsInfo.killNumber &&
                !that.goodsInfo.userKillState
              ) {
                this.$toast("秒杀已达到上线，原价购买");
              }
              // that.sku.price = res.data.showPrice;
            }
          } else {
            that.priceNo = that.goodsInfo.showPrice;
            that.sku.price = this.flgT
              ? res.data.killPrice
              : res.data.showPrice;

            that.sku.stock_num = res.data.enableQuantity;
            that.goods_info.picture = res.data.logoImgUrl;
            // that._getsGoodsSku();
            if (res.data.canOpenPurLimit) {
              that.quota = res.data.periodPurLimitNum;

              // that.customStepperConfig.quotaText = `总限购${res.data.purLimitSumNum}件，${res.data.periodDayNum}天可买${res.data.periodPurLimitNum}件`;
              that.limitSaleFlag = false;
            }
          }
          // that.sku.price = that.goodsInfo.limitSaleFlag
          //   ? res.data.killPrice
          //   : res.data.showPrice;

          that.sku.price = this.flgT ? res.data.killPrice : res.data.showPrice;
          that.sku.stock_num = res.data.enableQuantity;
          that.goodsId = res.data.goodsId;
          that.goods_info.picture = res.data.logoImgUrl;
          that._getsGoodsSku();
          if (res.data.canOpenPurLimit) {
            that.quota = res.data.periodPurLimitNum;

            // that.customStepperConfig.quotaText = `总限购${res.data.purLimitSumNum}件，${res.data.periodDayNum}天可买${res.data.periodPurLimitNum}件`;
            that.limitSaleFlag = false;
          }
          // if (res.data.limitSaleFlag) {

          //   that.quota1 = res.data.killBuyPerson;
          //   that.customStepperConfig.quotaText = `总限购${res.data.killNumber}件，可买${res.data.killBuyPerson}件`;

          // }
          if (res.data.openWindow) {
            this.showcaseFlg = res.data.openWindow;
            this.showcaseImgs = res.data.windowPictureArray.split(",");
          }

          const {
            data: { newUserFlag }
          } = res;

          this.newUserFlag = newUserFlag;
        }
      });
    },
    _getsGoodsSku() {
      //一级
      // console.log(this.$route.query.officialSubsidyId);
      let that = this;
      let obj = {
        goodsId: this.goodsId,
        at:
          that.$route.query.pageFrom == "new"
            ? "8"
            : that.$route.query.pageFrom == "cityF"
            ? "5"
            : "", //判断是不是从新人专享过来的
        activityId: that.$route.query.activityId,
        activityType: that.$route.activityType || ""
      };
      if (this.$route.query.activityId) {
        obj.activityId = this.$route.query.activityId;
      } else if (this.$route.query.officialSubsidy) {
        obj.officialSubsidy = this.$route.query.officialSubsidy;
        obj.officialSubsidyId = this.$route.query.officialSubsidyId;
      }
      if (this.params.anchorId) {
        obj.anchorId = this.params.anchorId;
      }
      getsGoodsSku(obj).then((res) => {
        if (res && res.errorCode == 1) {
          this.resData1 = res.data.content;
          // console.log(this.resData1);
          //  for(let i = 0;i < res.data.content.length;i++) {
          //    if(res.data.content[i].skuOpenTheMinimum==1){
          //      this.skuMinimumOrderQuantity=res.data.content[i].skuMinimumOrderQuantity
          //    }
          //  }
          if (this.goodsInfo.limitSaleFlag && this.flgT) {
            // this.kill();
            // this._getGoodsInfo()
          }
          let resData = res.data.content;
          let treedata = [];

          if (
            this.goodsInfo == null ||
            that.goodsInfo.cateType != 2 ||
            that.goodsInfo.goodsSpecJson == null ||
            that.goodsInfo.goodsSpecJson == ""
          ) {
            const { content } = res.data;

            const listdata = content.map((goodsInfo, i) => ({
              ...goodsInfo,
              stock_num: this.params.anchorId
                ? goodsInfo.liveStock ?? goodsInfo.enableQuantity
                : goodsInfo.enableQuantity,
              s1: i + ""
            }));

            treedata.push({
              k: "商品规格",
              k_s: `s1`, // s10 别名
              v: [],
              largeImageMode: false
            });

            for (var jj = 0; jj < resData.length; jj++) {
              const { skuName, pic } = resData[jj];
              treedata[0].v.push({
                // 对应 list s1的值
                id: jj.toString(),
                name: skuName,
                imgUrl: pic
              });
            }
            this.sku.hide_stock = false;
            this.sku.list = listdata;
            this.sku.none_sku = false;
            // this.sku.none_sku = false;
            this.sku.tree = treedata;
            return;
          }
          let specJson = that.goodsInfo.goodsSpecJson;
          let spec = JSON.parse(specJson);
          this.isSelectedSku = that.goodsInfo.selectedSkuComb;

          for (let i = 0; i < spec.length; i++) {
            treedata.push({
              k: spec[i].n,
              k_s: `s${i + 1}`, // s10 别名
              v: [],
              largeImageMode: false
            });
            let spect = spec[i].t;
            for (var jjj = 0; jjj < spect.length; jjj++) {
              treedata[i].v.push({
                // 对应 list s1的值
                id: jjj.toString(),
                name: spect[jjj]
                // imgUrl: !skuImages.length
                //   ? that.goodsInfo.logoImgUrl
                //   : skuImages.find(({ skuName }) =>
                //       skuName.includes(spect[jjj])
                //     )?.pic
              });
            }
          }

          let listdata = [];
          for (var f = 0; f < resData.length; f++) {
            listdata.push({
              ...resData[f],
              id: resData[f].id,
              price: resData[f].price,
              stock_num: resData[f].enableQuantity,
              skuMinimumOrderQuantity: resData[f].skuMinimumOrderQuantity,
              skuOpenTheMinimum: resData[f].skuOpenTheMinimum
            });

            if (resData[f].skuName != null) {
              let arr = resData[f].skuName.split("/");
              for (var y = 0; y < arr.length; y++) {
                let var5 = treedata[y] ? treedata[y].v : [];
                for (var yy = 0; yy < var5.length; yy++) {
                  if (var5[yy].name == arr[y]) {
                    var keys = `s${y + 1}`;
                    listdata[f][keys] = yy;
                  }
                }
              }
            }
          }
          this.sku.tree = treedata;
          this.sku.hide_stock = false;
          // this.sku.list = spec.length === 1 ? [listdata[listdata.length - 1]] : listdata;
          this.sku.list = listdata;
          this.sku.none_sku = false;

          // 1单级类型 2多级类型  规格
          // if(this.goodsInfo.cateType == 2 ){
          //this.sku.tree = treedata
          // }
          // this.sku.list = listdata;
        }
      });
    },
    _backlogin() {
      history.back();
      const isClose =
        LukeappApi.IscltApp ||
        tabBarConfig.some(
          ({ path: rootPath }) => rootPath === this.$route.path
        );
      setTimeout(() => {
        if (isClose) LukeappApi.clt_close_browser();
      }, 50);
    },
    onChange(index) {
      this.current = index;
    },
    // 监听页面滚动
    handleScroll() {
      let seft = this;
      // 获取当前的滚动距离
      const scrollTop = seft.$refs.scrobs.scrollTop;
      const footScroll =
        seft.$refs.scrobs.scrollHeight - seft.$refs.scrobs.scrollTop;
      const clientHeight = seft.$refs.scrobs.clientHeight;
      if (scrollTop < 200) {
        seft.opacity = scrollTop / 200;
        seft.activelock ? (seft.active = "goods") : "";
        return;
      } else {
        seft.opacity = 1;
      }
      // 当滚动距离不小于200时，获取三个部分的顶部位置-45。

      let detailTop = seft.$refs.detail.offsetTop - seft.defualtoffsetTop;
      let commentTop = seft.$refs.comment.offsetTop - seft.defualtoffsetTop;
      let showcaseTop = 0;
      if (seft.$refs.showcase) {
        showcaseTop = seft.$refs.showcase.offsetTop - seft.defualtoffsetTop;
      }
      // 计算滚动距离在哪个区间，修改this.active对应的样式名
      if (seft.activelock) {
        if (scrollTop < commentTop && footScroll != clientHeight) {
          if (seft.active != "goods") {
            seft.active = "goods";
          }
        } else if (
          scrollTop >= commentTop &&
          scrollTop < detailTop &&
          footScroll != clientHeight
        ) {
          if (seft.active != "comment") {
            seft.active = "comment";
          }
        } else if (
          (scrollTop >= detailTop && !showcaseTop) ||
          (scrollTop >= detailTop &&
            scrollTop < showcaseTop &&
            footScroll != clientHeight) ||
          (!showcaseTop && footScroll == clientHeight)
        ) {
          if (seft.active != "detail") seft.active = "detail";
        } else if (scrollTop >= showcaseTop || footScroll === clientHeight) {
          if (seft.active != "showcase") seft.active = "showcase";
        }
      }
      clearInterval(seft.timer);
      seft.timer = setTimeout(() => {
        const scrollTops = seft.$refs.scrobs.scrollTop;
        if (scrollTops == seft.topValue) {
          seft.activelock = true;
        }
      }, 450);
      seft.topValue = scrollTop;
    },
    onScrollGoods() {
      this.$refs.scrobs.scrollTo({ top: 0, behavior: "smooth" });
      this.activelock = false;
      this.active = "goods";
    },
    onScrollDetail() {
      let seft = this;
      if (!seft.opacity) return;
      seft.$refs.scrobs.scrollTo({
        top: seft.$refs.detail.offsetTop - seft.defualtoffsetTop,
        behavior: "smooth"
      });
      seft.active = "detail";
      seft.activelock = false;
    },
    onScrollComment() {
      let seft = this;
      if (!seft.opacity) return;
      seft.$refs.scrobs.scrollTo({
        top: seft.$refs.comment.offsetTop - seft.defualtoffsetTop,
        behavior: "smooth"
      });
      seft.activelock = false;
      seft.active = "comment";
    },
    skubox() {
      this.skushow = true;
    },
    //前往下单页面
    onClickButton() {
      let seft = this;
      console.log(seft.buyNum, "seft.buyNum");
      let params = {
        pageFrom: this.$route.query.pageFrom || null,
        buyNum: seft.buyNum,
        goodsSkuId:
          seft.goodsInfo.cateType == 1
            ? seft.sku.list[0].goodsSkuId
            : seft.goodsSkuId,
        goodsId: seft.goodsInfo.goodsId,
        shopId: seft.goodsInfo.shopInfo.id,
        agencyUnionid: seft.$route.query.agencyUnionid || null,
        buyType: 1,
        fromPlatform: seft.$route.query.fromPlatform || null,
        officialSubsidyId: seft.$route.query.officialSubsidyId,
        activityId: seft.$route.query.activityId
        // payMoneys: seft.goodsInfo.limitSaleFlag
        //   ? seft.goodsInfo.killPrice
        //   : seft.goodsInfo.showPrice || null,
        // totalMoneys: seft.goodsInfo.limitSaleFlag
        //   ? this.totalMoney
        //   : this.totalMoney || null,
      };
      console.log(params.officialSubsidyId);
      if (params.goodsSkuId == null || params.goodsSkuId == 0) {
        params.goodsSkuId = this.isSelectedSku.id;
      }
      if (this.params.carrierId) {
        params.carrierId = this.params.carrierId;
      }
      if (this.params.sourceOfOrder) {
        params.sourceOfOrder = this.params.sourceOfOrder;
      }
      if (this.params.anchorId) {
        params.anchorId = this.params.anchorId;
      }

      seft.$router.replace({ name: "plorder", query: params });

      // shoppingCart(params).then((res) => {
      //   if(res && res.errorCode == 1){
      //     let pardata = res.data
      //     pardata['buyType']= 1
      //     this.$router.push({name:'plorder', query:{name: JSON.stringify(pardata)}})
      //   }
      // })
    },

    addcart() {
      let seft = this;

      if (!this.isSelectedSku) {
        seft.$toast("请选择商品规格");
        return;
      }
      let shipdata = {
        buyNum: seft.buyNum,
        goodsSkuId:
          seft.goodsInfo.cateType == 1
            ? seft.sku.list[0].goodsSkuId
            : seft.goodsSkuId,
        goodsId: seft.goodsInfo.goodsId,
        shopId: seft.goodsInfo.shopInfo.id,
        agencyUnionid: seft.$route.query.agencyUnionid || null,
        fromPlatform: seft.$route.query.fromPlatform || null
      };
      if (this.isSelectedSku.id != null || this.isSelectedSku.id == 0) {
        shipdata.goodsSkuId = this.isSelectedSku.id;
      }
      addshoppingCart(shipdata).then((res) => {
        if (res && res.errorCode == 1) {
          seft.$toast.success("已添加购物车");
          this.skushow = false;
        }
      });
    },
    //获取分享人信息，且绑定分享人id
    //获取分享人信息
    // getShareInfo() {
    //   console.log("分享人信息");
    //   getEnjoyUser({
    //     // goodsId: this.shareGoodsId,
    //     uid: this.shareUid
    //   }).then((res) => {
    //     console.log(res);
    //   });
    // },
    discountTouchmove(e) {
      e.preventDefault();
      let h =
        document.documentElement.clientHeight || document.body.clientHeight;
      let w = document.documentElement.clientWidth || document.body.clientWidth;
      let H = h - this.$refs.discountBox.clientHeight;
      let W = w - this.$refs.discountBox.clientWidth;
      let top =
        e.changedTouches[0].clientY - this.$refs.discountBox.clientHeight / 2;
      let left =
        e.changedTouches[0].clientX - this.$refs.discountBox.clientWidth / 2;
      top = top < 0 ? 0 / 2 : top;
      top = top > H ? H : top;
      left = left < 0 ? 0 : left;
      left = left > W ? W : left;
      this.$refs.discountBox.style.top = top + "px";
      this.$refs.discountBox.style.left = left + "px";
    },
    discountClick() {
      this.$router.push("/share");
    }
  },

  //   //onload时，取出并滚动到上次保存位置
  //   get() {
  // window.onload = function(){
  //  var offset = sessionStorage.getItem("offsetTop");
  //  $(document).scrollTop(offset);
  // }
  //   }
  watch: {
    $route: function () {
      if (this.$route.name == "detail") {
        location.reload();
      }
    }
  },
  beforeRouteEnter(to, _, next) {
    let { fullPath, path } = to;
    const pathArr = decodeURIComponent(fullPath).split("?");
    // app跳转过来参数使用？分割
    if (pathArr.length < 5) {
      return next();
    }
    pathArr.shift();
    let params = pathArr.pop();

    const [storeCount, activeId, activeType] = pathArr;
    switch (activeType) {
      case "2":
        params += `&officialSubsidy=true&officialSubsidyId=${activeId}&enableQuantity=${storeCount}`;
        break;
      case "1":
        params += `&activityId=${activeId}&skuKillInventory=${storeCount}`;
      default:
        break;
    }
    const { origin } = location;
    const url = `${origin}${path}?${params}`;
    location.replace(url);
  }
};
</script>

<style lang="scss">
@import "@/assets/style/mixin.scss";
.goodsboxdis {
  .goods {
    margin-top: -1.2rem;
  }
  .anchorId-price {
    width: fit-content;
    span {
      height: 20px;
      line-height: 20px;
      color: #cf0000;
      margin-top: 10px;
      font-size: 20px;
      margin-right: 10px;
    }
  }
  .van-goods-action-button--warning {
    background-image: url("~@/assets/image/goodsDetail/3.png");
    background-size: 100% 100%;
  }
  .van-goods-action-button--danger {
    background-image: url("~@/assets/image/goodsDetail/4.png");
    background-size: 100% 100%;
  }
  .van-goods-action-button--danger1 {
    background: linear-gradient(to right, #ff6034, #ee0a24) !important;
  }
  .line-box {
    display: flex;
    width: fit-content;
    align-items: center;
    font-size: 14px;
    margin: 10px auto;
    p {
      color: #cf0000;
      padding: 0 2px;
    }
    img {
      width: 50px;
      height: 2px;
    }
  }
  .goodsAction {
    font-size: 11px;
    width: 40px;
    text-align: center;
    img {
      width: 18px;
      height: 18px;
    }
    p {
      margin-top: 3px;
    }
  }
  .morePro {
    background-color: #f3f2f2;
    .moreContent {
      margin-top: 20px;
      padding: 10px;
      display: flex;
      justify-content: space-between;
      > div {
        color: #989898;
        font-size: 12px;
        text-align: center;
        img {
          width: 47px;
          height: 47px;
        }
        p {
          margin-top: 5px;
        }
      }
    }
    .cancel {
      position: absolute;
      bottom: 10px;
      left: 50%;
      transform: translateX(-50%);
      width: 90%;
      height: 40px;
      background-color: #fff;
      color: #212121;
      font-size: 12px;
      border-radius: 20px;
    }
  }
  .shopRecommend {
    background-color: #fff;
    margin: 10px 0;
    .shopRecommendTop {
      display: flex;
      justify-content: space-between;
      font-size: 10px;
      padding: 10px;
      > p {
        color: #101010;
        font-size: 16px;
      }
      > div {
        color: #cf0000;
        font-size: 13px;
        display: flex;
        i {
          font-size: 13px;
          display: block;
          line-height: 13px;
        }
      }
    }
    .shopRecommendCount {
      padding: 10px;
      display: flex;
      flex-wrap: wrap;
      .item {
        width: 105px;
        margin: 5px 6.6px;
        img {
          width: 105px;
          height: 105px;
          border-radius: 10px;
        }
        .title {
          @include no-wrap-multi(2);
          color: #101010;
          font-size: 15px;
          height: 40px;
        }
        .price {
          margin-top: 5px;
          color: #cf0000;
          font-size: 18px;
          span {
            font-size: 12px;
          }
        }
      }
    }
  }
  .couponPop {
    .couponPopTitle {
      margin: 30px 0;
      color: #101010;
      font-size: 18px;
      font-weight: bold;
      text-align: center;
    }
    .couponCount {
      overflow-y: auto;
      height: calc(100% - 130px);
      .item {
        width: 335px;
        height: 80px;
        background-color: #fae5e5;
        color: #cf0000;
        margin: 10px auto;
        margin-top: 0;
        border-radius: 10px;
        font-size: 11px;
        .type {
          width: 89px;
          height: 18px;
          background-color: #fff6f6;
          text-align: center;
          line-height: 18px;
          border-bottom-right-radius: 10px;
          border-top-left-radius: 10px;
        }
        > div {
          display: flex;
          align-items: center;
          justify-content: space-between;

          .price {
            margin-left: 15px;
            height: fit-content;
            font-weight: bold;
            font-size: 18px;
          }
          button {
            margin-right: 10px;
            display: block;
            width: 60px;
            height: 25px;
            color: #fff;
            border-radius: 5px;
          }
          .already {
            background-color: #e98989;
          }
          .get {
            background-color: #cf0000;
          }
          .text p:nth-child(1) {
            font-size: 18px;
            font-weight: bold;
          }
          .text p:nth-child(2) {
            margin-top: 10px;
            width: 160px;
          }
        }
      }
    }
    .closeCoupon {
      font-size: 18px;
      width: 90%;
      height: 40px;
      display: block;
      margin: 10px 0;
      background-color: #cf0000;
      color: #fff;
      border-radius: 10px;
      position: absolute;
      bottom: 0px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  .personalityTagsBox {
    margin-top: 10px;
    height: 26px;
    width: 100%;
    position: relative;
  }
  .coupon {
    color: #cf0000;
    font-size: 13px;
    position: absolute;
    right: 5px;
    top: 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
  }
  .comment {
    margin-top: 10px;
    .commentTop {
      font-size: 16px;
      display: flex;
      justify-content: space-between;
      background-color: #fff;
      padding: 10px;
      > p {
        color: #101010;
      }
      > div {
        color: #cf0000;
        font-size: 13px;
        display: flex;
        i {
          font-size: 13px;
          display: block;
          line-height: 13px;
        }
      }
    }
    .nullComment {
      background-color: #fff;
      padding: 15px 10px;
      P {
        font-size: 12px;
      }
    }
  }
  .searchBox {
    width: 100%;
    box-sizing: border-box;
    position: sticky;
    z-index: 98;
    padding: 5px 10px;
    height: 40px;
    display: flex;
    font-size: 15px;
    justify-content: space-between;
    // position: fixed;
    top: 0;
    left: 0;
    background-color: #fff;
    i {
      font-size: 25px;
      line-height: 30px;
    }
    .back {
      color: #989898;
      font-size: 20px;
    }
    .more {
      color: #000000;
    }
    .search {
      display: flex;
      margin-top: 2px;
      width: 258px;
      height: 30px;
      color: #bcbcbc;
      background-color: #f7f7f7;
      border-radius: 10px;
      line-height: 30px;
      i {
        font-size: 20px;
        margin: 0 10px;
      }
    }
  }
  .tailMarkBox {
    display: flex;
    // margin-top: 5px;
  }
  .tailMark {
    background: #d1020c;
    color: white;
    font-size: 10px;
    border-radius: 10px;
    padding: 2px 5px;
    height: 17px;
    line-height: 16px;
    margin-left: 5px;
    margin-top: 2px;
  }
}
.totalBox {
  padding: 0.32rem 0.42667rem;
  display: flex;
  justify-content: space-between;
}
._img {
  width: 20px;
  height: 20px;
}
.fizesku {
  font-size: 14px;
}
.sk_bannter {
  .van-skeleton__title {
    height: 350px;
    background: #ec5151;
  }
}
.goodsboxdis {
  overflow-y: auto;
  height: 100%;
  box-sizing: border-box;
  .showcase {
    margin-top: 10px;
    .line-box {
      display: flex;
      width: fit-content;
      align-items: center;
      font-size: 14px;
      margin: 10px auto;
      p {
        color: #cf0000;
        padding: 0 2px;
      }
      img {
        width: 50px;
        height: 2px;
      }
    }
    img {
      width: 100%;
      display: block;
    }
  }
  .van-sku__stepper-quota {
    float: none;
    margin-left: 5px;
  }
  .FrameLayout {
    width: 100%;
    height: 70px;
    margin-top: 10px;
    background: #fff;
    display: flex;
    align-items: center;
    .ImageView {
      padding: 0 10px;
      width: 70px;
      img {
        height: 100%;
      }
    }
    .van-icon {
      font-size: 25px;
      margin-right: 5px;
    }
    .van-button {
      margin-right: 15px;
    }
    .TextView {
      flex: 1;
      h5 {
        color: #101010;
      }
    }
  }
  .header {
    height: 45px;
    background: transparent;
    position: sticky;
    width: 100%;
    left: 0;
    z-index: 99;
    .header_layout {
      display: -webkit-box;
      display: flex;
      flex-wrap: nowrap;
      -webkit-box-align: center;
      align-items: center;
      -webkit-box-flex: 1;
      flex: 1 1 auto;
      height: 100%;
    }
    .placeholder {
      justify-content: center;
      align-items: center;
      display: flex;
      -webkit-box-flex: 1;
      -ms-flex: 1;
      flex: 1;
      text-align: center;
      height: 100%;
      span {
        margin: 0 10px;
        font-size: 16px;
        padding-bottom: 6px;
        position: relative;
        display: inline-block;
      }
    }
    .active {
      color: #cf0000;
      position: relative;
      &:after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 50%;
        width: 0.26rem;
        height: 0.05rem;
        margin-left: -0.13rem;
        background-color: #cf0000;
        border-radius: 28%;
        overflow: hidden;
      }
    }
  }
  .swipebox {
    height: 370px;
  }
  .swipeimg {
    width: 100%;
  }
  .custom-indicator {
    position: absolute;
    right: 5px;
    bottom: 5px;
    font-size: 12px;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    border-radius: 12px;
    padding: 5px 10px;
  }
  .goods-title {
    background: #fff;
    padding: 17px;
    font-weight: bold;
    color: #191919;
  }
  .module-price {
    background-color: #fff;
    padding: 0 10px;
    position: relative;
    .collect {
      position: absolute;
      color: #101010;
      font-size: 15px;
      right: 20px;
      display: flex;
      top: 10px;
      align-items: center;
      img {
        width: 18px;
        height: 16px;
        margin-right: 2px;
      }
    }
    .price {
      font-size: 24px;
    }
    .real-price {
      color: #ff0036;
      height: 36px;
      line-height: 36px;
      display: flex;
      align-items: center;
      .ui-yen {
        .price-symbol {
          font-family: arial;
          font-style: normal;
          font-size: 18px;
          position: relative;
          top: 2px;
        }
        .price {
          position: relative;
          top: 2px;
        }
      }
    }
    .item-price {
      font-size: 12px;
      height: 20px;
      line-height: 20px;
      color: #888;
      margin-top: 5px;
      margin-right: 10px;
      label {
        margin-right: 4px;
      }
    }
  }
  .goods-title {
    padding: 3px 10px 0;
    background-color: #fff;
    h3 {
      font-size: 14px;
      color: #051b28;
      line-height: 20px;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      max-height: 63px;
      -webkit-box-orient: vertical;
      -webkit-box-pack: center;
      overflow: hidden;
      word-break: break-all;
    }
    .color-red {
      color: #ec5151;
      font-size: 14px;
      margin-top: 5px;
    }
  }
  .module-adds {
    display: -webkit-box;
    display: flex;
    align-items: center;
    background-color: #fff;
    line-height: 30px;
    padding: 0 10px;
    font-size: 12px;
    color: #999;
    span {
      -webkit-box-flex: 1;
      -webkit-flex: 1;
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      display: block;
      &:first-child {
        text-align: left;
      }
    }
    .subbranch {
      color: #fff;
      height: 16px;
      line-height: 16px;
      padding: 0 10px;
      background-image: url("~@/assets/image/subbranch.png");
      background-size: 100% 100%;
    }
  }
  .custom-title {
    color: #999;
  }
  .wpimagetext-item img {
    width: 100% !important;
    vertical-align: middle;
  }
  .wpimagetext-item p {
    font-size: 20px !important;
  }
  .cartdet {
    height: inherit;
    line-height: inherit;
    font-size: 22px;
    text-indent: 2px;
    &::before {
      top: -1px;
      left: 15px;
    }
    // &::after {
    // top: 4px;
    // }
  }
  .van-sku-actions .van-button--danger {
    background-color: #000;
    .van-button {
      background-color: #000;
    }
  }
  .van-sku-actions .van-button:first-of-type {
    border-top-left-radius: 0.3rem;
    border-bottom-left-radius: 0.3rem;
    border-top-right-radius: 0.3rem;
    border-bottom-right-radius: 0.3rem;
  }
  .van-sku-actions .van-button--danger {
    background: -webkit-linear-gradient(left, #cf0000, #cf0000);
  }
  .van-sku-actions .van-button:last-of-type {
    border-top-left-radius: 0.3rem;
    border-bottom-left-radius: 0.3rem;
    border-top-right-radius: 0.3rem;
    border-bottom-right-radius: 0.3rem;
  }
}
.goodsboxdis .title {
  font-size: 14px;
  line-height: 20.424px;
  height: fit-content;
  // @include no-wrap-multi(2);
  img {
    height: 17px;
    border: none;
    vertical-align: text-bottom;
  }
}

.goodsboxdis .personalityTags {
  display: flex;
  flex-wrap: wrap;
  padding: 0px 0 5px;
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
.discountBox {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  position: fixed;
  bottom: 15vh;
  left: 78vw;
  z-index: 10;
  img {
    display: block;
    width: 100%;
    height: 100%;
  }
}
</style>
