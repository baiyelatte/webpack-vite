<template>
  <router-layout>
    <van-nav-bar
      :title="$route.meta.title"
      v-if="!$route.meta.CLAPP"
      left-arrow
      @click-left="$router.back()"
    />
    <van-cell-group>
      <van-cell title="添加收款账户" label="请绑定本人的收款账户" />
      <van-field
        label="账户类型"
        readonly
        :value="AddCard.accounttype.accounname"
        right-icon="arrow"
        @click="AddCard.accounttype.showPicker = true"
        input-align="right"
      />
      <!-- 支付宝 -->
      <template v-if="AddCard.accounttype.type == 1">
        <van-field
          v-model="AddCard.accountName"
          readonly
          label="持卡人"
          placeholder="请输入用户名"
          input-align="right"
        />
        <van-field
          label="手机号"
          v-model="mapgetuserinfo.phone"
          type="digit"
          readonly
          input-align="right"
        />
        <van-field
          v-model="AddCard.alipay"
          label="账号"
          placeholder="请输入支付宝账号"
          input-align="right"
        />
      </template>
      <!-- 银行卡 -->
      <template v-if="AddCard.accounttype.type == 4">
        <van-field
          v-model="AddCard.accountName"
          readonly
          label="持卡人"
          input-align="right"
        />
        <van-field
          v-model="AddCard.cardnumber"
          label="卡号"
          type="digit"
          placeholder="请输入您的银行卡号"
          input-align="right"
        />
        <van-field
          label="卡片所属银行"
          readonly
          :value="AddCard.bank.bankname"
          right-icon="arrow"
          @click="AddCard.bank.showPicker = true"
          input-align="right"
        />
        <van-field
          label="手机号"
          v-model="mapgetuserinfo.phone"
          type="digit"
          readonly
          input-align="right"
        />
      </template>
    </van-cell-group>
    <!-- 账户类型 -->
    <van-popup v-model="AddCard.accounttype.showPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="AddCard.accounttype.columns"
        @confirm="onConfirm"
        @cancel="onCancel"
      />
    </van-popup>
    <!-- 银行 -->
    <van-popup v-model="AddCard.bank.showPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="AddCard.bank.bankInfo"
        @confirm="onConfirmBank"
        @cancel="AddCard.bank.showPicker = false"
      />
    </van-popup>
    <div class="btnbox">
      <van-button
        type="danger"
        :disabled="btndisabled"
        block
        @click="_getsmscode"
        >获取验证码</van-button
      >
    </div>
    <router-view></router-view>
  </router-layout>
</template>

<script>
import { mapGetters } from "vuex";
import {
  getsBankInfo,
  addAccountSendSmscode,
  getUserIdentAuthentic
} from "api";
export default {
  name: "addcard",
  data() {
    return {
      btndisabled: true,
      AddCard: {
        bank: {
          bankInfo: [],
          showPicker: false,
          bankId: null, // 卡片所属银行
          bankname: "请选择银行"
        },
        alipay: "", // 支付宝账号
        accountName: "", // 持卡人
        cardnumber: "", // 银行卡号
        accounttype: {
          type: null,
          accounname: "请选择",
          showPicker: false,
          columns: [
            { text: "支付宝", id: 1 },
            { text: "银行卡", id: 4 }
          ] //  {text:'微信', id: 2},
        }
      }
    };
  },
  created() {
    let { noalipay } = this.$route.query;
    let that = this;
    if (noalipay) {
      that.AddCard.accounttype.columns = [{ text: "银行卡", id: 4 }];
    }
    that._getUserIdentAuthentic();
  },
  computed: {
    ...mapGetters({
      mapgetuserinfo: "getuserinfo"
    })
  },
  methods: {
    onConfirmBank({ id, text }) {
      let that = this;
      that.AddCard.bank.bankId = id;
      that.AddCard.bank.bankname = text;
      that.AddCard.bank.showPicker = false;
    },
    _getUserIdentAuthentic() {
      getUserIdentAuthentic().then((res) => {
        if (res && res.errorCode == 1) {
          this.AddCard.accountName = res.data.realName;
        }
      });
    },
    _getsBankInfo() {
      let that = this;
      getsBankInfo().then((res) => {
        let { content } = res.data;
        if (res && res.errorCode == 1) {
          content.forEach((item) => {
            that.AddCard.bank.bankInfo.push({ text: item.name, id: item.id });
          });
        }
      });
    },
    onConfirm({ id, text }) {
      let that = this;
      that.AddCard.accounttype.type = id;
      that.AddCard.accounttype.accounname = text;
      that.AddCard.accounttype.showPicker = false;
      that.btndisabled = false;
      if (id == 4) {
        that._getsBankInfo();
      }
    },
    onCancel() {
      let that = this;
      that.AddCard.accounttype.showPicker = false;
    },
    submitcode() {
      let { AddCard, $router } = this;
      if (AddCard.accounttype.type == 1) {
        $router.push({
          name: "cardsmscode",
          query: {
            accountType: AddCard.accounttype.type,
            accountNum: AddCard.alipay
          }
        });
      }
      if (AddCard.accounttype.type == 4) {
        $router.push({
          name: "cardsmscode",
          query: {
            accountType: AddCard.accounttype.type,
            accountNum: AddCard.cardnumber,
            accountName: AddCard.accountName,
            bankId: AddCard.bank.bankId
          }
        });
      }
    },
    _getsmscode() {
      let that = this;
      if (that.AddCard.accounttype.type == 1) {
        if (that.AddCard.alipay === "") {
          that.$toast("请输入支付宝账号!");
          return false;
        }
      }
      if (that.AddCard.accounttype.type == 4) {
        if (that.AddCard.accountName === "") {
          that.$toast("请输入持卡人!");
          return false;
        }
        var pattern = /^([1-9]{1})(\d{14}|\d{18})$/;
        if (that.AddCard.cardnumber === "") {
          that.$toast("请输入银行卡号!");
          return false;
        } else if (!pattern.test(that.AddCard.cardnumber)) {
          that.$toast("请输入正确银行卡号!");
          return false;
        }
        if (that.AddCard.cardnumber === "") {
          that.$toast("请输入银行卡号!");
          return false;
        }
        if (that.AddCard.bank.bankId === null) {
          that.$toast("请选择所属银行!");
          return false;
        }
      }
      // 开启实名认证
      addAccountSendSmscode().then((res) => {
        if (res && res.errorCode == 1) {
          that.submitcode();
        } else if (res && res.errorCode == 11012) {
          that
            .$confirm({
              message:
                "为了让您的交易更安全，请您在进行提现之前，首先进行实名认证",
              confirmButtonText: "去实名认证"
            })
            .then(() => {
              that.$router.push({ name: "authentication" });
            })
            .catch(() => {
              that.$router.back();
            });
        }
      });
    }
  }
};
</script>

<style></style>
