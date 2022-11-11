<!--
 * @Author: Crush
 * @Date: 2022-04-19 15:23:52
 * @LastEditTime: 2022-09-27 14:32:12
 * @FilePath: \mallh5\src\views\bindPhone\index.vue
-->
<script>
import { ref } from "vue";
import CommonHeader from "@/components/CommonHeader.vue";
import { codelogin } from "api";

import router from "@/router";
import store from "@/store";
import { useValidate, useFormData } from "./hooks";
import { localCache, sessionCache } from "@/utils";

export default {
  name: "bindPhone",
  components: {
    CommonHeader
  },
  setup() {
    const loadingbtn = ref(false);

    const { formData, isPass, handleFormValidate } = useFormData();
    const [
      { validiteText, validiteClass, validateDisabled },
      handleValidateClick
    ] = useValidate(formData, handleFormValidate);

    const handleClick = async () => {
      const { telephoneNumber, validiteCode } = formData;
      const { validateToken } = store.state.user;
      const { redirect } = router.history.current.query;
      const { errorCode, data } = await codelogin({
        phone: telephoneNumber,
        smscode: validiteCode,
        token: validateToken,
        referrer: sessionCache.getCache("inviteCode")
      });

      if (errorCode === 1) {
        const { token } = data;
        localCache.setCache("userInfo", { token });

        let nextUrl;

        if (redirect.includes("&")) {
          nextUrl = `${redirect}&token=${token}`;
        } else if (redirect.endsWith("?")) {
          nextUrl = `${redirect}token=${token}`;
        } else {
          nextUrl = `${redirect}?token=${token}`;
        }

        router.replace(nextUrl);
      }
    };

    return {
      formData,
      loadingbtn,
      validiteText,
      validiteClass,
      validateDisabled,
      handleValidateClick,
      isPass,
      handleClick
    };
  }
};
</script>

<template>
  <router-layout :headerAttrFlag="false">
    <common-header
      backgroundColor="#f7f8fa"
      titleColor="black"
      leftColor="black"
    />
    <div class="bind-phone">
      <div class="wrapper">
        <div class="header">
          <div class="title">绑定手机号</div>
          <div class="info">为了您的账号安全，请及时绑定手机</div>
        </div>

        <van-field
          class="field"
          v-model="formData.telephoneNumber"
          type="tel"
          clearable
          placeholder="请输入手机号"
          is-highlight
        />
        <van-field
          v-model="formData.validiteCode"
          class="field"
          clearable
          maxlength="6"
          type="digit"
          placeholder="请输入短信验证码"
          is-highlight
        >
          <template #button>
            <div
              :class="validiteClass"
              @click="() => !validateDisabled && handleValidateClick()"
            >
              {{ validiteText }}
            </div>
          </template>
        </van-field>
      </div>
      <div class="footer">
        <van-button
          type="danger"
          :loading="loadingbtn"
          :disabled="!isPass"
          size="normal"
          block
          @click="handleClick"
          >确定</van-button
        >
      </div>
    </div>
  </router-layout>
</template>

<style scoped lang="scss">
.bind-phone {
  padding: 16px;
  .wrapper {
    .header {
      .title {
        color: #333;
        font-size: 27px;
        margin-bottom: 15px;
      }
      .info {
        color: #666;
        font-size: 13px;
      }

      margin: 64px 0;
    }

    .field {
      margin-bottom: 28px;
    }

    .danger {
      color: #cf0000;
      font-size: 14px;
    }
  }
}
</style>
