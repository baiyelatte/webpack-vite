<template>
  <router-layout>
    <div class="center">
      <van-nav-bar
        :title="$route.meta.title"
        left-arrow
        @click-left="$router.back()"
      />
      <div class="text">
        <p>您提交的注销申请生效前，诚聊购将进行以下信息验证：</p>
        <p>1、账户处于安全状态；</p>
        <p>2、诚聊购账户上没有资金相关问题待结算； 以保证您的账户财产安全！</p>
      </div>
      <div>
        <van-field
          v-model="tel"
          type="tel"
          @input="_focusanem"
          clearable
          placeholder="请输入您的手机号"
        >
          <template #left-icon>
            <img class="pic" src="@/assets/image/common/phone.png" alt="" />
          </template>
        </van-field>
        <van-field
          v-model="codes"
          clearable
          type="digit"
          placeholder="请输入短信验证码"
        >
          <template #button>
            <van-button
              size="small"
              :disabled="codedisabled"
              @click="_smscode"
              type="danger"
              >{{ codeText }}</van-button
            >
          </template>
          <template #left-icon>
            <img class="pic" src="@/assets/image/common/lock.png" alt="" />
          </template>
        </van-field>
      </div>
      <div class="checkedBox">
        <van-checkbox v-model="checked" shape="square"></van-checkbox>
        <p @click="show = true">注销重要提示</p>
      </div>
      <div class="md-example-child-button logoutbtn">
        <van-button
          type="danger"
          :disabled="usernamedisabled"
          :loading="loadingbtn"
          :loading-text="loadingtit"
          size="normal"
          block
          @click="_logout"
          >注销用户</van-button
        >
      </div>
    </div>
    <van-dialog class="hint" v-model="show" title="注销重要提示" round-button>
      <div class="content">
        <p class="p1">
          注销诚聊购帐号是不可恢复的操作，你应自行备份诚聊购帐号相关的信息和数据。操作之前，请确认与诚聊购帐号相关的所有服务均已进行妥善处理。
        </p>
        <p class="p1">
          请谨记：注销诚聊购帐号，你将无法再使用本诚聊购帐号或找回你添加或绑定的任何内容或信息（即使你使用相同的手机号码再次注册并使用诚聊购），包括但不限于：
        </p>
        <p>（1）你将无法登录、使用本诚聊购帐号。</p>
        <p>（2）你诚聊购账号中的订单信息和历史信息都将无法找回。</p>
        <p>（3）注销诚聊购帐号前，你需妥善处理诚聊购账户下所有资金问题。</p>
        <p>（4）你诚聊购帐号所关注的所有诚聊购相关的信息将无法继续使用。</p>
        <p>
          （5）在诚聊购帐号注销期间，如果你的诚聊购帐号被他人投诉、被国家机关调查或者正处于诉讼、仲裁程序中，期望管家有权自行终止你诚聊购帐号的注销而无需另行得到你的同意。
        </p>
        <p class="p1">
          请注意，注销你的诚聊购帐号并不代表本诚聊购帐号注销前的帐号行为和相关责任得到豁免或减轻。
        </p>
      </div>
    </van-dialog>
  </router-layout>
</template>
<script>
import { regphone, md5par } from "@/utils/dom";
import { smscode, applyLogout } from "api";
export default {
  data() {
    return {
      tel: "",
      codes: "",
      loadingbtn: false,
      usernamedisabled: true,
      codedisabled: true,
      loadingtit: "注销中...",
      show: true,
      checked: false,
      codeText: "发送验证码"
    };
  },
  created() {},
  methods: {
    _focusanem(e) {
      if (regphone(e)) {
        this.usernamedisabled = false;
        this.codedisabled = false;
      }
    },
    _logout() {
      const that = this;
      // that.$router.back()
      if (that.tel === "") {
        that.$toast("请输入帐号");
        return;
      }
      if (that.codes === "") {
        that.$toast("请输入验证码");
        return;
      }
      if (!regphone(that.tel)) {
        that.$toast("输入正确的手机号");
        return;
      }
      if (!this.checked) {
        that.$toast("请先确认提示");
        return;
      }
      that.loadingbtn = true;
      applyLogout({ phone: this.tel, smscode: this.codes }).then((res) => {
        that.loadingbtn = false;
        if (res.errorCode == 1) {
          that.$toast("注销申请待审核");
          localStorage.removeItem("userinfo");
          that.$router.push("/smslogin");
        }
      });
    },
    _smscode() {
      const that = this;
      if (!regphone(that.tel)) {
        that.$toast("手机号码格式不正确");
        return;
      }
      if (that.tel === "") {
        that.$toast("手机号不能为空");
        return;
      }
      const Params = {
        smsType: 6,
        phone: that.tel
      };
      smscode(Params)
        .then((result) => {
          if (result.errorCode == 1) {
            that.time = 60;
            that.codedisabled = true;
            that.timer();
          }
        })
        .catch((err) => {});
    },
    // 倒计时
    timer() {
      if (this.time > 0) {
        this.codeText = this.time + "s后重新获取";
        this.time--;
        setTimeout(this.timer, 1000);
      } else {
        this.codedisabled = false;
        this.time = 60;
        this.codeText = "发送验证码";
      }
    }
  }
};
</script>
<style scoped lang="scss">
.checkedBox {
  display: flex;
  margin: 10px;
  :deep(.van-checkbox__icon--checked .van-icon) {
    background-color: #fff;
    color: #cf0000;
  }
  p {
    color: #cf0000;
    margin-left: 5px;
    font-size: 13px;
    line-height: 20px;
  }
}
.logoutbtn {
  margin: 50px 10px 0 10px;
}
:deep(.van-field__left-icon) {
  height: fit-content;
}
.van-cell {
  align-items: center;
}
.pic {
  width: 17px;
  height: 17px;
  margin-right: 10px;
  display: block;
}
.text {
  padding: 0 10px;
}
.hint {
  width: 308px;
  .content {
    margin-top: 10px;
    padding: 10px;
    color: #212121;
    font-size: 13px;
    p {
      line-height: 18px;
    }
    .p1 {
      text-indent: 2em;
    }
  }
  :deep(.van-dialog__header) {
    color: #212121;
    font-size: 15px;
    font-weight: 500;
  }
  :deep(.van-dialog__footer) {
    .van-button__content {
      border-radius: 5px;
      color: #fff;
      width: 125px;
      height: 31px;
      background-color: #cf0000;
      margin: 0 auto;
    }
  }
}
.center {
  background: #fff;
  height: 100%;
  > .text {
    padding-top: 10px;
    p {
      padding: 0 5px;
      font-size: 17px;
      font-weight: 400;
      color: #000000;
      line-height: normal;
    }
  }
}
</style>
