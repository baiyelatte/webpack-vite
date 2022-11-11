/*
 * @Author: Admin
 * @Date: 2022-03-10 14:31:47
 * @LastEditors: Crush
 * @LastEditTime: 2022-06-08 17:08:11
 * @FilePath: \mallh5\src\mixins\callApp.js
 * @Description:
 *
 * Copyright (c) 2022 by Crush/禄可集团, All Rights Reserved.
 */
import { isIOS as isI, isAndroid1 as isA, isWeixin as isW } from "@/utils/dom";
// import CallApp from "callapp-lib";

export default {
  data() {
    return {
      shadeFlg: false,
      onlyDownload: false,
      androidUrl: "",
      iosUrl: "https://itunes.apple.com/cn/app/id1558426664?mt=8",
      androidPackageName: "shop.itbug.ExpectationMall", // android包名
      scheme: "sinceremall://main/open",
      androidScheme: {
        protocol: "sinceremall", // APP协议,URLScheme的scheme字段,就是你要打开的APP的标识
        host: "main/open" // URL Scheme的host字段
      },
      iosScheme: "LUKETECHCLGProject://"
    };
  },
  created() {
    const isAndroid = isA();
    if (isAndroid && !this.onlyDownload) {
      window.location.href = this.scheme;
    }
  },
  methods: {
    createCallApp() {
      this.lib?.open({
        path: "", // 需要打开的页面对应的值,若不需要打开特定页面,path传空字符串''就可以。

        param: {}, // 打开APP某个页面时需要接收的参数

        // 自定义唤端失败回调函数,传递callback会覆盖callapp-lib库中默认的唤端失败处理逻辑
        callback: () => {
          console.log("唤端失败的处理");

          const isIOS = isI();
          window.location.href = isIOS ? this.iosUrl : this.androidUrl;
        }
      });
    },
    handleCallApp(isAndroidDownload) {
      const isIOS = isI();
      const isAndroid = isA();
      const isWeixin = isW();

      const ua = window.navigator.userAgent.toLowerCase();

      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        this.shadeFlg = true;
        return;
      }

      if (isWeixin && isIOS) {
        const src = isAndroidDownload ? this.androidUrl : this.iosUrl;
        if (isAndroidDownload) {
          window.location.href = src;
        } else {
          this.$notify("请在浏览器内打开,或扫码进行下载。");
        }
        return;
      }

      if ((isWeixin && isAndroid) || this.onlyDownload) {
        window.location.href = isAndroidDownload
          ? this.androidUrl
          : this.iosUrl;
        return;
      }

      if (isIOS) {
        window.location.href = isAndroidDownload
          ? this.androidUrl
          : this.iosScheme;

        if (!isAndroidDownload) {
          setTimeout(() => {
            window.location.href = this.iosUrl;
          }, 500);
        }
        return;
      }

      window.location.href = this.androidUrl;

      // ios包名
      // const iosPackageName = "com.luketech.expmall";

      // const option = isAndroid
      //   ? {
      //       scheme: this.androidScheme,
      //       // intent: {
      //       //   // 安卓原生谷歌浏览器必须传递Intent协议地址,才能唤起APP。
      //       //   package: this.androidPackageName,
      //       //   scheme: this.scheme // 和protocol一样:APP协议,URL Scheme的scheme字段,就是你要打开的APP的标识
      //       // },
      //       fallback: "",
      //       timeout: 3000
      //     }
      //   : {};

      // this.lib = new CallApp(option);
      // isAndroid && this.createCallApp();
    }
  }
};
