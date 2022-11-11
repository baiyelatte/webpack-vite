/*
 * @Author: Admin
 * @Date: 2022-03-15 16:06:42
 * @LastEditors: Crush
 * @LastEditTime: 2022-04-08 14:04:39
 * @FilePath: \mallh5\src\utils\wx.sdk.js
 * @Description:
 *
 * Copyright (c) 2022 by Crush/禄可集团, All Rights Reserved.
 */
"use strict";

import wx from "weixin-js-sdk";
import { isWeixin, isIOS } from "./dom.js";
import { wxSign } from "@/api/index";

class WechatSdk {
  constructor() {}

  async init(jsApiList) {
    if (!isWeixin()) return;
    const url = isIOS()
      ? sessionStorage.getItem("firstUrl")
      : window.location.href;
    return new Promise((resolve) => {
      wxSign({ appId: "wx24a7119992b77c99", url })
        .then((res) => {
          const { data } = res;
          this.setConfig(data, jsApiList);
          resolve(res);
        })
        .catch(() => {});
    });
  }

  setConfig(config, jsApiList) {
    console.log(jsApiList, "jsApiList");
    const { appId, timestamp, nonceStr, signature } = config;
    wx.config({
      debug: false,
      appId,
      timestamp,
      nonceStr,
      signature,
      jsApiList
    });
  }
}

export class WechatShare extends WechatSdk {
  constructor() {
    super();
    this.i = 0;
    this.info = null;
  }

  ready(info) {
    wx.ready(() => {
      wx.onMenuShareTimeline({
        title: info.title,
        link: info.link,
        imgUrl: info.imgUrl,
        desc: info.desc,
        success() {}
      });
      wx.onMenuShareAppMessage({
        title: info.title,
        link: info.link,
        imgUrl: info.imgUrl,
        desc: info.desc,
        success() {}
      });
    });
  }

  check(info) {
    if (!isWeixin()) return;
    this.init(["onMenuShareTimeline", "onMenuShareAppMessage"]);
    info && (this.info = info);
    ++this.i >= 2 && this.ready(this.info);
  }
}

export class WechatScanQRCode extends WechatSdk {
  constructor() {
    super();
  }

  async scanQRCode(success, needResult = 0, scanType = ["qrCode", "barCode"]) {
    await this.init(["scanQRCode"]);
    wx.ready(() => {
      wx.scanQRCode({
        needResult, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType, // 可以指定扫二维码还是一维码，默认二者都有
        success
        // : function (res) {
        //   var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
        // }
      });
    });

    wx.error(function (res) {
      console.log(res, "error");
      // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
    });
  }
}

export class WechatUpdateAppMessageShareData extends WechatSdk {
  constructor(info) {
    super();
    this.info = info;
  }

  async updateAppMessageShareData(successCallback) {
    await this.init(["updateAppMessageShareData"]);
    wx.ready(() => {
      const { title, desc, link, imgUrl } = this.info || {};

      wx.updateAppMessageShareData({
        title, // 分享标题
        desc, // 分享描述
        link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl, // 分享图标
        success: successCallback
      });
    });

    wx.error(function (res) {
      console.log(res, "error");
      // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
    });
  }
}
