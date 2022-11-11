<template>
  <router-layout>
    <van-nav-bar
      :title="$route.meta.title"
      v-if="!$route.meta.CLAPP"
      left-arrow
      @click-left="$router.back()"
    />
    <div>
      <div class="headers">
        <p class="headers_tit">身份证图片 （必填）</p>
        <div class="cardbox">
          <div class="card_hd positive">
            <van-uploader
              v-model="positive.fileList"
              :max-count="1"
              :disabled="$route.query.type == 'echo' ? true : false"
              :deletable="$route.query.type == 'echo' ? false : true"
              ref="positive"
              :after-read="_upshopimg('positive', false)"
              @delete="_deleteimg"
            />
            <div class="crad_tit">点击上传身份证人像面</div>
          </div>
          <div class="card_hd back">
            <van-uploader
              v-model="back.fileList"
              :max-count="1"
              :disabled="$route.query.type == 'echo' ? true : false"
              :deletable="$route.query.type == 'echo' ? false : true"
              ref="back"
              :after-read="_upshopimg('back', true)"
              @delete="_deleteimg"
            />
            <div class="crad_tit">点击上传身份证国徽面</div>
          </div>
        </div>
      </div>
      <van-form @submit="onSubmit">
        <div class="forms">
          <p class="tits">姓名</p>
          <van-field
            placeholder="请输入您的姓名"
            :readonly="disabled"
            name="legal_person"
            v-model="form.legal_person"
            :rules="[{ required: true }]"
            style="height: 50px; width: 100%"
          />
          <p class="tits">身份证号码</p>
          <van-field
            placeholder="请输入您的身份证号码"
            :readonly="disabled"
            name="personalNo"
            v-model="form.personalNo"
            :rules="[{ required: true }]"
            style="height: 50px; width: 100%"
          />
        </div>
        <div class="btnbox" v-if="$route.query.type != 'echo'">
          <van-button
            type="danger"
            block
            size="normal"
            native-type="submit"
            :loading="btndata.loading"
            :loading-text="btndata.loadingtext"
            >提交认证信息</van-button
          >
          <!-- <van-button v-if="loadstatus" round disabled block loading type="danger" loading-text="请稍后..." />
          <van-button v-else-if="data.personalstatus==0 || data.personalstatus==2" round block type="danger" native-type="submit">提交申请</van-button>
          <van-button v-else-if="data.personalstatus==1" round disabled block type="danger">审核中</van-button>
          <van-button v-else-if="data.personalstatus==3" round disabled block type="primary"><i class="fa fa-check"></i>已认证</van-button> -->
        </div>
      </van-form>
    </div>
  </router-layout>
</template>

<script>
import {
  postuserIdentAuthentic,
  getUserIdentAuthentic,
  getUserIdentAuthenticInfo
} from "api";
// import { iscard } from '@/utils/dom'
export default {
  name: "authentication",
  data() {
    return {
      disabled: true,
      identAuth: [],
      upimgfile: [],
      positive: {
        file: null,
        fileList: []
      },
      back: {
        file: null,
        fileList: []
      },
      form: {
        legal_person: null,
        personalNo: null
      },
      btndata: {
        loading: false,
        loadingtext: "提交认证信息"
      }
    };
  },
  methods: {
    onSubmit() {
      let that = this;
      if (that.positive.file == null || that.back.file == null) {
        that.$toast("请上传身份证照片!");
        return false;
      }
      that.btndata.loading = true;
      that.btndata.loadingtext = "提交中...";
      let formData = new FormData();
      formData.append(
        "frontFile",
        that.positive.file.file,
        that.positive.file.file.name
      );
      formData.append(
        "reverseFile",
        that.back.file.file,
        that.back.file.file.name
      );
      formData.append("realName", that.form.legal_person);
      formData.append("identAuthNum", that.form.personalNo);
      postuserIdentAuthentic(formData)
        .then((res) => {
          that.btndata.loading = false;
          that.btndata.loadingtext = "提交认证信息";
          if (res.errorCode == 1) {
            that.$toast("上传成功");
            setTimeout(() => {
              that.$router.back();
            }, 1000);
          }
        })
        .catch(() => {
          that.btndata.loading = false;
          that.btndata.loadingtext = "提交认证信息";
        });
    },
    _deleteimg(items) {
      this.upimgfile.splice(
        this.upimgfile.findIndex((item) => item === items.url),
        1
      );
    },
    _upshopimg(uptype, Boolean) {
      return (file) => {
        let that = this;

        that[uptype].file = file;
        let formData = new FormData();
        formData.append(
          "file",
          that[uptype].file.file,
          that[uptype].file.file.name
        );
        formData.append("canBack", Boolean);

        getUserIdentAuthenticInfo(formData).then((res) => {
          if (res && res.errorCode == 1) {
            this.form.legal_person = res.data.name;
            this.form.personalNo = res.data.identity;
          }
        });
      };
    },
    _getuser() {
      // 回显
      getUserIdentAuthentic().then((res) => {
        if (res && res.errorCode == 1 && res.data.identAuthStatus == 4) {
          this.identAuth = res.data;
          this.form.legal_person = res.data.realName;
          this.form.personalNo = res.data.identAuthNum;
          this.back.fileList.push({ url: res.data.picBack });
          this.positive.fileList.push({ url: res.data.picJust });
        }
      });
    }
  },
  created() {
    // 回显用
    if (this.$route.query.type == "echo") {
      this._getuser();
    }
  }
};
</script>

<style lang="scss" scoped>
.headers {
  background: #fff;
  padding-top: 10px;
  .headers_tit {
    padding: 15px 10px;
    font-size: 14px;
  }
}
.cardbox {
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: center;
  padding-left: 0.21333rem;
  text-align: center;
  .card_hd {
    width: 100%;
    :deep(.van-uploader__wrapper--disabled) {
      opacity: 1;
    }
  }
  .crad_tit {
    font-size: 12px;
    padding: 15px 0;
  }
  .positive,
  .back {
    :deep(.van-uploader) {
      width: 100%;
    }
    :deep(.van-uploader__upload) {
      width: 100%;
      height: 2.5rem;
      margin: 0 0.21333rem 0 0;
    }
    :deep(.van-icon-photograph) {
      width: 100%;
      height: 100%;
      background-image: url(../../assets/image/common/card_hd.png);
      background-repeat: no-repeat;
      background-position: center;
      background-size: 100%;
    }
    :deep(.van-icon-photograph::before) {
      content: "";
    }
    :deep(.van-uploader__preview),
    :deep(.van-uploader__preview-image) {
      width: 100%;
    }
  }
  .back {
    :deep(.van-icon-photograph) {
      background-image: url(../../assets/image/common/card_back.png);
    }
  }
}
</style>
