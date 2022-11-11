"use strict";

import wx from "weixin-js-sdk";
import { isWeixin, isIOS } from "./dom.js";
import { wxSign } from "@/api/index";

class WechatShare {
  constructor() {
    this.i = 0;
    this.info = null;
    this.init();
  }

  init() {
    if (!isWeixin()) return;
    const url = isIOS()
      ? sessionStorage.getItem("firstUrl")
      : window.location.href;
    wxSign({ appId: "wx24a7119992b77c99", url })
      .then((res) => {
        const { data } = res;
        this.setConfig(data);
        this.check();
      })
      .catch(() => {});
  }

  setConfig(config) {
    wx.config({
      debug: false,
      appId: config.appId,
      timestamp: config.timestamp,
      nonceStr: config.nonceStr,
      signature: config.signature,
      jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage"]
    });
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
    info && (this.info = info);
    ++this.i >= 2 && this.ready(this.info);
  }
}

export default WechatShare;
