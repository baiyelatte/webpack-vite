<template>
  <router-layout>
    <van-nav-bar
      :title="$route.meta.title"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="shopApply">
      <van-cell style="margin-top: 0px; height: 108px">
        <div class="logo">
          <van-uploader
            :after-read="toUpLogo"
            v-model="logoPicList"
            :max-count="1"
            :disabled="auditStatus == 1 || auditStatus == 3"
            @delete="delLogo"
          >
            <div class="picBox">
              <img v-lazy="form.logoImgUrl[0]" alt="" />
            </div>
          </van-uploader>
        </div>
        <div
          style="
            width: calc(100% - 70px - 20px);
            float: left;
            padding-top: 34px;
          "
        >
          <span style="color: red"></span>店铺logo
        </div>
      </van-cell>
      <van-field
        label="店铺名称"
        required
        placeholder="请输入店铺名称"
        maxlength="10"
        name="name"
        input-align="right"
        v-model="form.name"
        :error-message="shopNameError"
        @input="shopNameRule"
      />
      <van-field
        label="联系方式"
        required
        type="tel"
        placeholder="请填写手机号"
        name="phoneNumber"
        input-align="right"
        maxlength="11"
        v-model="form.phoneNumber"
      />
      <van-field
        v-if="auditStatus == 1 || auditStatus == 3"
        label="店铺主类目"
        required
        placeholder="点击选择类目"
        input-align="right"
        is-link
        readonly
        clickable
        name="area"
        :value="fieldCategory"
      />
      <van-field
        v-else
        label="店铺主类目"
        required
        placeholder="点击选择类目"
        input-align="right"
        is-link
        readonly
        clickable
        name="area"
        :value="fieldCategory"
        @click="getCategoryData"
      />
      <van-popup v-model="categoryShow" position="bottom">
        <van-picker
          show-toolbar
          :columns="categoryList"
          @confirm="onConfirmCategory"
          @cancel="categoryShow = false"
          :loading="loadingPickerCategory"
        />
      </van-popup>

      <van-field
        label="店铺地址"
        required
        placeholder="点击选择地址"
        input-align="right"
        is-link
        readonly
        clickable
        name="area"
        :value="fieldAddress"
        @click="getAddressData"
      />
      <van-popup v-model="addressShow" position="bottom">
        <van-picker
          show-toolbar
          :columns="addressList"
          @confirm="onConfirmAddress"
          @cancel="addressShow = false"
          :loading="loadingPickerAddress"
        />
      </van-popup>

      <div style="background: #fff; margin-top: 10px">
        <van-cell title="店铺相关图片" value="" />
        <van-uploader
          v-model="showShopImgList"
          :disabled="auditStatus == 1 || auditStatus == 3"
          :after-read="_upshopimg"
          :max-count="3"
          @delete="deleteImgUrl"
          style="padding: 10px"
        />
      </div>
      <div
        style="margin: 0px auto; width: 90%; padding-top: 20px; font-size: 14px"
      >
        <van-checkbox v-model="checked"
          >我已阅读并同意《<span
            @click="isAgreeAgreement = true"
            style="color: #f01c1c"
            >门店入驻协议</span
          >》</van-checkbox
        >
      </div>
      <van-action-sheet v-model="isAgreeAgreement" :title="'门店入驻协议'">
        <div
          :style="
            'height:' +
            (winheight - 200) +
            'px;overflow-y:scroll;-webkit-overflow-scrolling: touch;'
          "
        >
          <agreement />
        </div>
      </van-action-sheet>
      <div class="btnbox">
        <van-button
          :disabled="auditStatus == 1 || auditStatus == 3"
          type="danger"
          block
          @click="onSubmit"
          >提交</van-button
        >
      </div>
    </div>
  </router-layout>
</template>
<script>
import { _uploadFiler, isIOS, isAndroid1 } from "@/utils/dom";
import {
  getCategoryList,
  getAddressList,
  getAllAddress,
  save,
  getappShop,
  getShopLogo
} from "api";
import agreement from "@/components/agreement";
import img from "@/assets/image/common/defaultuser.png";
import { uploadFile } from "api";
export default {
  name: "shopApply",
  components: {
    agreement
  },
  props: {
    winwidth: {
      default: document.documentElement.clientWidth
    },
    winheight: {
      default: document.documentElement.clientHeight
    }
  },
  data() {
    return {
      defaultLogoImgUrl: "",
      type: this.$route.query.type,
      showShopImgList: [],
      logoPicList: [],
      upImgFileList: [],
      isAgreeAgreement: false, //  协议是否同意
      categoryShow: false, // 类目栏
      addressShow: false, // 地址栏
      loadingPickerCategory: false,
      loadingPickerAddress: false,
      fieldCategory: "",
      fieldAddress: "",
      checked: "",
      form: {
        phoneNumber: "",
        provinceId: "",
        consigneeProvince: "",
        cityId: "",
        consigneeCity: "",
        countyId: "",
        consigneeCounty: "",
        logoImgUrl: ["http://mallres.lkkjjt.com/test_1634613185359"],
        name: "",
        cityCategoryId: "",
        goodsCategoryId: ""
      },
      categoryList: [],
      addressList: [],
      auditStatus: false,
      saveObjData: {},
      isApp: LukeappApi.IscltApp(),
      shopNameError: ""
    };
  },
  created() {
    // this.getShopInfo();
    // this.getShopLogoData();
    // const arr = window.location.href.split("?")[1].split("&");
    // for (let i = 0; i < arr.length; i++) {
    //   const A = arr[i].split("=");
    //   this.saveObjData[A[0]] = A[1];
    // }
  },
  methods: {
    shopNameRule() {
      if (this.form.name.length < 2) {
        this.shopNameError = "店铺名称至少两个字符";
      } else {
        this.shopNameError = "";
      }
    },
    onClickLeft() {
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
    deleteImgUrl(items) {
      this.upImgFileList.splice(
        this.upImgFileList.findIndex((item) => item === items.url),
        1
      );
    },
    getShopLogoData() {
      // const toast = this.$toast.loading({
      //   message: "加载中...",
      //   forbidClick: true
      // });
      // getShopLogo().then((res) => {
      //   toast.clear();
      //   if (res.errorCode == 1) {
      //     this.form.logoImgUrl = res.data;
      //   }
      // });
    },
    getShopInfo() {
      // getappShop().then((res) => {
      //   const {
      //     logoImgUrl,
      //     phoneNumber,
      //     name,
      //     imgArrayUrl,
      //     auditStatus
      //   } = res.data;
      //   if (res && res.errorCode == 1) {
      //     this.auditStatus = auditStatus;
      //     if (imgArrayUrl) {
      //       const newImgArr = imgArrayUrl.split(",").map((item, index) => ({url: item, isImage: true, id: index }))
      //       this.showShopImgList = newImgArr;
      //       this.logoPicList = newImgArr;
      //       this.upImgFileList = imgArrayUrl.split(",");
      //     }
      //     this.form = {
      //       phoneNumber,
      //       provinceId,
      //       consigneeProvince,
      //       cityId,
      //       consigneeCity,
      //       countyId,
      //       consigneeCounty,
      //       logoImgUrl,
      //       name,
      //       cityCategoryId,
      //       goodsCategoryId,
      //     };
      //   }
      // });
    },
    onSubmit() {
      // if (!this.form.logoImgUrl) {
      //   this.$notify({ type: "danger", message: "请上传店铺logo" });
      //   return;
      // }
      for (let key in this.form) {
        if (!this.form[key]) {
          this.$notify({ type: "danger", message: "请填写必填项" });
          return false;
        }
      }
      if (this.shopNameError) {
        this.$notify({ type: "danger", message: "请填写必填项" });
        return;
      }
      if (!this.checked) {
        this.$notify({ type: "danger", message: "请同意门店入驻协议" });
        return;
      }
      if (!/^1\d{10}$/.test(this.form.phoneNumber)) {
        this.$notify({ type: "danger", message: "请填写正确的手机号" });
        return;
      }
      let params = {
        ...this.form,
        imgArrayUrl: JSON.parse(JSON.stringify(this.upImgFileList)).join(","),
        logoImgUrl: this.form.logoImgUrl[0]
      };
      // 提交
      save(params)
        .then((res) => {
          if (res?.errorCode == 1) {
            this.$notify({ type: "success", message: "入驻成功" });
            // this.$store.state.user_info.shop = { merchants_audit: 0 }
            // if (this.saveObjData.in == "ios") {
            //   this.$router.replace("/shopAudit");
            //   return;
            // }
            // this.$router.go(-1);

            //跳转线上APP
            // if (this.isApp == true) {
            //   if (isIOS()) {
            //     window.location.href = 'LUKETECHCLGMerProject://changeShop&shopId=' + this.store_informations.id + '&token=' + this.$store.state.config.token;
            //     return;
            //   }
            //   if (isAndroid1()) {
            //     window.location.href = 'clgmer://main/open?token=' + this.$store.state.config.token + '&shopId=' + this.store_informations.id;
            //     return;
            //   }
            // }
            this.$router.replace("/downloadclm");
          }
        })
        .catch(() => {});
    },
    getCategoryData() {
      if (!this.categoryList.length) {
        this.loadingPickerCategory = true;
        getCategoryList()
          .then((res) => {
            if (res?.errorCode == 1) {
              const { content } = res?.data ?? [];
              const list = [];
              this.categoryList = content.map((item) => {
                const children = item.categoryList.map((categoryItem) => ({
                  text: categoryItem.categoryName,
                  id: categoryItem.categoryId
                }));
                return {
                  text: item.cityName,
                  id: item.cityId,
                  children
                };
              });
              this.loadingPickerCategory = false;
              this.categoryShow = true;
            }
          })
          .catch(() => {
            this.loadingPickerCategory = false;
            this.categoryShow = true;
          });
      } else {
        this.categoryShow = true;
      }
    },
    getAddressData() {
      if (!this.addressList.length) {
        this.loadingPickerAddress = true;
        getAllAddress()
          .then((res) => {
            if (res?.errorCode == 1) {
              const { content } = res.data;
              this.addressList = content;
              this.loadingPickerAddress = false;
              this.addressShow = true;
            }
          })
          .catch(() => {
            this.loadingPickerAddress = false;
            this.addressShow = true;
          });
      } else {
        this.addressShow = true;
      }
    },
    onConfirmCategory(picker, index) {
      this.form.cityCategoryId = this.categoryList[index[0]].id;
      this.form.goodsCategoryId =
        this.categoryList[index[0]].children[index[1]].id;
      this.categoryShow = false;
      this.fieldCategory = picker.join(" / ");
    },
    onConfirmAddress(picker, index) {
      this.form.provinceId = this.addressList[index[0]].id;
      this.form.consigneeProvince = picker[0];
      this.form.cityId = this.addressList[index[0]].children[index[1]].id;
      this.form.consigneeCity = picker[1];
      this.form.countyId =
        this.addressList[index[0]].children[index[1]].children[index[2]].id;
      this.form.consigneeCounty = picker[2];
      this.addressShow = false;
      this.fieldAddress = picker.join(" / ");
    },
    toUpLogo(file) {
      // let toats = this.$toast.loading({
      //   // message: '加载中...',
      //   forbidClick: true,
      // });

      // _uploadFiler(file, 6)
      //   .then((res) => {
      //     this.form.logoImgUrl = res;

      //     toats.clear();
      //   })
      //   .catch(() => {
      //     this.form.logoImgUrl = "";
      //     toats.clear();
      //   });
      file.status = "uploading";
      file.message = "上传中...";

      _uploadFiler(file, 6)
        .then((res) => {
          file.status = "done"; // 上传成功
          this.form.logoImgUrl.push(res);
        })
        .catch(() => {
          file.status = "failed";
          file.message = "上传失败";
          this.form.logoImgUrl = [];
        });
    },
    _upshopimg(file) {
      file.status = "uploading";
      file.message = "上传中...";
      _uploadFiler(file, 7)
        .then((res) => {
          file.status = "done"; // 上传成功
          this.upImgFileList.push(res);
        })
        .catch(() => {
          file.status = "failed";
          file.message = "上传失败";
          this.upImgFileList = [];
        });
    },
    //将base64转换为文件
    dataURLtoFile(dataUrl, filename) {
      const arr = dataUrl.split(",");
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    },
    delLogo() {
      this.form.logoImgUrl[0] = "";
    }
  }
};
</script>
<style lang="scss" scoped>
.shopApply {
  background: #f2f2f2;
  :deep(.van-uploader__wrapper--disabled) {
    opacity: 1;
    .van-uploader__upload,
    .van-uploader__preview-delete {
      display: none;
    }
  }
  .logo {
    float: right;
    width: 70px;
    padding-top: 8px;
    .picBox {
      img {
        width: 70px;
        height: 70px;
        border-radius: 50%;
      }
    }
  }
  :deep(.logo .van-uploader__preview-image) {
    width: 70px;
    height: 70px;
    border-radius: 50%;
  }
  :deep(.logo .van-uploader) {
    width: 70px;
    height: 70px;
    border-radius: 50%;
  }
  :deep(.logo .van-uploader__wrapper) {
    width: 70px;
    height: 70px;
    border-radius: 50%;
  }
  :deep(.logo .van-uploader__mask) {
    border-radius: 50%;
  }
  :deep(.van-field__error-message) {
    text-align: inherit;
  }
}
</style>
