/*
 * @Author: Admin
 * @Date: 2022-04-14 14:45:07
 * @LastEditors: Crush
 * @LastEditTime: 2022-04-14 14:51:49
 * @FilePath: \mallh5\src\mixins\sanner.js
 * @Description:
 *
 * Copyright (c) 2022 by Crush/禄可集团, All Rights Reserved.
 */
import { isWeixin as isWei } from "@/utils/dom";
import { WechatScanQRCode } from "@/utils/wx.sdk.js";

export default {
  data() {
    return {
      wechatScanQRCodeInstance: null,
      isWeixin: isWei()
    };
  },
  created() {
    this.wechatScanQRCodeInstance = new WechatScanQRCode();
  },
  methods: {
    goToApplyJoinPage(result) {
      const shopIdReg = /^\d+$/;
      if (shopIdReg.test(result)) {
        this.$router.push({
          name: "joins",
          query: {
            shopId: result
          }
        });
        return false;
      }

      if (result.includes("u.wechat.com")) {
        this.$notify("暂不支持微信二维码添加店员。");
        return true;
      }

      this.$notify("请扫描正确的店铺信息二维码~");
      return true;
    },
    handleScanQrCode() {
      this.wechatScanQRCodeInstance.scanQRCode(
        (res) => {
          const { resultStr } = res;
          this.goToApplyJoinPage(resultStr);
        },
        1,
        ["qrCode"]
      );
    }
  }
};
