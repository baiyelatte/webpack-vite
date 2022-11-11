<template>
  <div class="refundbox">
    <van-card
      :desc="refunddta.goodsSkuName"
      :title="refunddta.goodsName"
      :thumb="refunddta.goodsLogoImgUrl"
      style="margin-top: 0px"
    >
    </van-card>

    <div class="h10"></div>
    <van-cell-group>
      <van-cell title="选择售后服务类型" />
      <van-cell
        title="￥ 我要退款"
        label="没收到货，跟卖家协商只退款，不退货"
        @click="tui('refund')"
        is-link
      />
      <van-cell
        title="￥ 我要退货退款"
        label="已经收到货，申请退货退款"
        @click="tui('exchangegoods')"
        is-link
      />
      <!-- <van-cell title="￥ 我要换货" label="已收到货，商品有质量问题，申请换货"  @click="tui('huangoods')"  is-link  /> -->
    </van-cell-group>
    <!-- <van-cell-group v-else-if="refunddta.itemStatus==6">
      <van-cell title="选择售后服务类型"/>
   
      <van-cell title="￥ 我要退货退款" label="已经收到货，申请退货退款" @click="tui('exchangegoods')" is-link />
      <van-cell title="￥ 我要换货" label="已收到货，商品有质量问题，申请换货"  @click="tui('huangoods')"  is-link  />
    </van-cell-group> -->
    <!-- 货物状态 -->

    <!-- 退款原因 -->
    <van-popup
      get-container="body"
      v-model="refund.showrefund"
      position="bottom"
      :style="'height:' + winheight + 'px;background:#f7f8fa;'"
    >
      <van-nav-bar
        title="申请退款"
        left-arrow
        @click-left="
          refundback();
          refund.showrefund = false;
        "
      />
      <Refund
        :refunddta="refunddta"
        ref="refund"
        :aftersaleType="aftersaleType"
        @revok="revok"
        :isRemodify="remodify"
        @modifyOrder="modifyOrder"
        :refundrefresh="refundrefresh"
      />
    </van-popup>
    <van-popup
      get-container="body"
      v-model="refund.exchangegoods"
      position="bottom"
      :style="'height:' + winheight + 'px;background:#f7f8fa;'"
    >
      <van-nav-bar
        title="申请退款退货"
        left-arrow
        @click-left="
          refundback();
          refund.exchangegoods = false;
        "
      />
      <Exchangegoods
        :refunddta="refunddta"
        ref="refund"
        @revok="revok"
        :isRemodify="remodify"
        @modifyOrder="modifyOrder"
        :aftersaleType="aftersaleType"
        :refundrefresh="refundrefresh"
      />
    </van-popup>
    <!-- <van-popup get-container="body" v-model="refund.huangoods" position="bottom" :style="'height:'+(winheight)+'px;background:#f7f8fa;'">
        <van-nav-bar title="申请换货" left-arrow @click-left="refundback();refund.huangoods = false" />
        <Huangoods :refunddta="refunddta" :orderdata="orderdata" ref="refund" :aftersaleType="aftersaleType" :refundrefresh="refundrefresh" />
    </van-popup>   -->
    <!-- <Huangoods :refunddta="refunddta" :orderdata="orderdata" :isRemodifys="remodifys" @revok1="revok1" ref="refund" :aftersaleType="aftersaleType"  @modifyOrders="modifyOrders" :refundrefresh="refundrefresh" />
    </van-popup>   -->
  </div>
</template>

<script>
import Refund from "@/components/goods/refund.vue";
import Exchangegoods from "@/components/goods/exchangegoods.vue";
// import Huangoods from '@/components/goods/huangoods.vue'

export default {
  name: "sales",
  components: {
    Refund,
    Exchangegoods
    // Huangoods,
  },
  props: {
    refunddta: {},
    orderdata: {},
    aftersaleType: [Number, String],
    isRemodify: {
      type: Boolean,
      default: false
    },
    isRemodifys: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      winheight: document.documentElement.clientHeight,
      refund: {
        // showrefund:false,
        showrefund: this.isRemodify,
        exchangegoods: this.isRemodify,
        huangoods: this.isRemodifys
      },
      remodify: this.isRemodify,
      remodifys: this.isRemodifys
    };
  },
  mounted() {
    // console.log(11, this.orderdata);
  },
  created() {
    window.localStorage.setItem("huanIsInit", null);
    //  console.log(this.isRemodify);
  },
  methods: {
    tui(type) {
      // console.log(type,'88888');
      if (type == "refund") {
        //  alert(777)
        this.refund.showrefund = true;
        this.refund.exchangegoods = false;
        this.refund.huangoods = false;
      } else if (type == "exchangegoods") {
        // alert(888)
        this.refund.showrefund = false;
        this.refund.exchangegoods = true;
        this.refund.huangoods = false;
      } else if (type == "huangoods") {
        // alert(999)
        this.refund.showrefund = false;
        this.refund.exchangegoods = false;
        this.refund.huangoods = true;
        // window.localStorage.setItem('huangoods', 'false')
      }
    },
    // tui1(){
    //       if(type=='huangoods'){
    //         this.refund.showrefund = false
    //         this.refund.exchangegoods=false
    //         this.refund.huangoods=true
    //     }
    // },

    revok() {
      // this.Dialog.close
      this.refund.exchangegoods = false;
      this.$emit("revok");
    },
    revok1() {
      // if(this.activeName == 5 ) {
      //   this.refund.huangoods=true
      // this.$emit('revok1')
      // }
      this.refund.huangoods = false;
      this.$emit("revok1");
    },

    // 点击返回按钮 解除局部刷新
    refundback() {
      this.$refs.refund.inits();
      this.$emit("defrefresh");
      this.$router.go(-1);
      // this.$router.push({path: '/order'})
    },
    inits() {},

    // 换货刷新
    refundrefresh() {
      this.refund.showrefund = false;
      this.refund.exchangegoods = false;
      this.refund.huangoods = false;
      this.$emit("refresh");
    },

    modifyOrder(isShow) {
      this.remodify = isShow;
      this.refund.exchangegoods = isShow;
    }
    //  modifyOrders(isShow) {
    //     this.remodifys = isShow
    //     this.refund.huangoods = isShow
    // },
    // refreshRefund(){
    //   this.$parent._postgetOrder()
    // }
  }
};
</script>

<style lang="scss" scoped>
.sal {
  // background:red;
  margin-left: 12px;
  margin-right: 12px;
  font-size: 15px;
  font-weight: 800;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #666;
}
</style>
