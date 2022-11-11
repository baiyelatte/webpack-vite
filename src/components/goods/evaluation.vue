<template>
  <div class="evbox">
    <div v-for="(item, index) in propevdata.orderItemVOList" :key="index">
      <div class="ev_goods ev_conbox" v-if="item.itemStatus === 6">
        <div class="ev_hd">
          <van-image fit="cover" :src="item.goodsLogoImgUrl" />
          <div class="ev_goods_right">
            <p class="ev_goods_tit">{{ item.goodsName }}</p>
            <p class="ev_goods_des">{{ item.goodsSkuName }}</p>
          </div>
        </div>
        <div class="ev_level">
          <span class="f14"
            >评价等级：<van-rate
              v-model="evGradeArr[index]"
              :size="20"
              @change="evGradeclick" /></span
          ><span class="evratetit">{{ evratetit[evGradeArr[index] - 1] }}</span>
        </div>
        <div class="ev_input">
          <textarea
            maxlength="200"
            v-model="evContent[index]"
            placeholder="从多个角度评价宝贝，可以帮助更多想买的人"
          />
        </div>
        <div class="uploadimg">
          <van-uploader
            v-model="fileList[index]"
            :after-read="(val) => _upshopimg(val, index)"
            @delete="(val) => _deleteimg(val, index)"
            :max-count="5"
            accept="video/*,image/*"
            multiple
          />
        </div>
      </div>
    </div>

    <div class="ev_shop ev_conbox" v-if="propevdata.orderStatus === 6">
      <h5>{{ propevdata.shopName }}</h5>
      <div class="ev_level">
        <span class="f14"
          >描述相符：<van-rate
            v-model="evGoods"
            :size="20"
            @change="evGoodsclick" /></span
        ><span class="evratetit">{{ evratetit[evGoods - 1] }}</span>
      </div>
      <div class="ev_level">
        <span class="f14"
          >服务态度：<van-rate
            v-model="evSeller"
            :size="20"
            @change="evSellerclick" /></span
        ><span class="evratetit">{{ evratetit[evSeller - 1] }}</span>
      </div>
      <div class="ev_level">
        <span class="f14"
          >物流速度：<van-rate
            v-model="evExpress"
            :size="20"
            @change="evExpressclick" /></span
        ><span class="evratetit">{{ evratetit[evExpress - 1] }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { _uploadFiler } from "@/utils/dom";
import { postorderEvaluate } from "api";

export default {
  props: {
    propevdata: Object
  },
  name: "evaluation",
  data() {
    return {
      evratetit: ["非常差", "差", "一般", "好", "非常好"],
      evGrade: 5, //
      evExpress: null, // 物流
      evSeller: null, // 服务
      evGoods: null, // 描述
      // evContent: '', // 内容
      fileList: [],
      upimgfile: [],
      evGradeArr: [],
      evContent: []
    };
  },
  created() {
    // console.log(this.propevdata, 111);
    this.reset();
  },

  methods: {
    reset() {
      this.evGradeArr = [];
      this.evratetit = [];
      this.upimgfile = [];
      this.evSeller = 0;
      this.evGoods = 0;
      this.evExpress = 0;
      this.evContent = [];
      this.fileList = [];
      for (let i = 0; i < this.propevdata.orderItemVOList.length; i++) {
        // this.evGradeArr.push(5);
        this.evContent.push("");
        this.upimgfile.push([]);
        this.fileList.push([]);
      }
    },
    _deleteimg(items, index) {
      this.upimgfile[index].splice(
        this.upimgfile[index].findIndex((item) => item === items.url),
        1
      );
    },
    save() {
      let toast = this.$toast.loading({
        message: "",
        forbidClick: true
      });
      let shopEvaluate = {};
      let goodsEvaluateList = [];
      if (this.propevdata.orderStatus === 6) {
        if (this.evExpress == null) {
          this.$toast("物流速度分数 不能为空");
          return;
        }
        if (this.evSeller == null) {
          this.$toast("服务态度分数 不能为空");
          return;
        }
        if (this.evGoods == null) {
          this.$toast("描述相符分数 不能为空");
          return;
        }
        shopEvaluate = {
          evExpressNumber: this.evExpress,
          evSellerNumber: this.evSeller,
          evGoodsNumber: this.evGoods,
          shopId: this.propevdata.shopId
        };
      }
      if (this.propevdata.orderStatus === 6) {
        for (var i = 0; i < this.propevdata.orderItemVOList.length; i++) {
          goodsEvaluateList.push({
            evGrade: this.evGradeArr[i],
            evContent: this.evContent[i],
            orderItemId: this.propevdata.orderItemVOList[i].id,
            goodsId: this.propevdata.orderItemVOList[i].goodsId,
            goodsSkuId: this.propevdata.orderItemVOList[i].goodsSkuId,
            fileArrayUrl: this.upimgfile[i].join(",")
          });
        }
      }

      postorderEvaluate({
        orderSn: this.propevdata.orderSn,
        shopEvaluate,
        goodsEvaluateList
      }).then((res) => {
        toast.clear();
        if (res && res.errorCode == 1) {
          this.$emit("evblock");
          this.$toast("评价成功");
        }
      });
    },
    evGradeclick(id) {
      this.evGrade = id;
    },
    evGoodsclick(id) {
      this.evGoods = id;
    },
    evSellerclick(id) {
      this.evSeller = id;
    },
    evExpressclick(id) {
      this.evExpress = id;
    },
    _upshopimg(file, index) {
      //       console.log(file)
      let self = this;
      if (Array.isArray(file) && file.length > 0) {
        file.forEach((item) => {
          item.status = "uploading";
          item.message = "上传中...";
          _uploadFiler(item, 12)
            .then((res) => {
              item.status = "done"; // 上传成功
              self.upimgfile[index].push(res);
            })
            .catch(() => {
              item.status = "failed";
              item.message = "上传失败";
              self.upimgfile[index] = [];
            });
        });
      } else {
        file.status = "uploading";
        file.message = "上传中...";
        _uploadFiler(file, 12)
          .then((res) => {
            file.status = "done"; // 上传成功
            self.upimgfile[index].push(res);
          })
          .catch(() => {
            file.status = "failed";
            file.message = "上传失败";
            self.upimgfile[index] = [];
          });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.evbox {
  .evratetit {
    color: #f64900;
    margin-left: 15px;
    font-size: 14px;
    font-weight: bold;
  }
  .f14 {
    font-size: 14px;
  }
  .ev_level {
    margin: 10px 0;
  }
  .ev_conbox {
    margin: 10px;
    background: #fff;
    padding: 15px;
    border-radius: 5px;
  }
  .ev_input {
    textarea {
      font-size: 14px;
      padding: 10px;
      border: 0;
      width: 100%;
      height: 84px;
      background: #f5f5f5;
      margin-top: 10px;
    }
  }
  .uploadimg {
    margin-top: 10px;
  }
  .ev_hd {
    display: flex;
    .van-image {
      width: 60px;
      height: 60px;
      margin-right: 10px;
      overflow: hidden;
      border-radius: 4px;
    }
    .ev_goods_right {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      .ev_goods_tit {
        font-size: 16px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .ev_goods_des {
        font-size: 14px;
        margin-top: 10px;
        color: #999;
      }
    }
  }
  .ev_shop {
    h5 {
      font-size: 15px;
    }
  }
}
</style>
