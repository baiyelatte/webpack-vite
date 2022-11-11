/*
 * @Author: Crush
 * @Date: 2022-04-20 13:55:30
 * @LastEditTime: 2022-11-11 14:08:49
 * @FilePath: \vite_vue2.7\src\api\config\clgAxios.js
 */

import axios from "axios";
import qs from "qs";
import router from "@/router";
import { Toast } from "vant";
import {
  isWeixin,
  dropout,
  getStorage,
  localCache,
  handleLogin
} from "@/utils";
const baseUrl = import.meta.env.VITE_APP_CLG_NETWORK;

const ERR_OK = 1;
const ERR_NOLOGIN = 10002;

const clgAxios = axios.create({
  baseURL: baseUrl
});
// 诚聊购 http request 拦截器
clgAxios.interceptors.request.use(
  (config) => {
    let userinfo = getStorage("userinfo") || {};

    if (
      userinfo.token &&
      userinfo.token !== "undefined" &&
      userinfo.token !== "null"
    ) {
      config.headers.token = userinfo.token;
    }

    config.headers.platform = "h5";

    let data = config.data;
    if (config.method === "post") {
      config.headers["requestPlatform"] = isWeixin() ? "2" : null;

      // config.data = requestype == 'json' ? { ...data } : (requestype == 'file' ? data : qs.stringify({ ...data }));
      if (
        config.headers["Content-Type"] ==
        "application/x-www-form-urlencoded; charset=UTF-8"
      ) {
        config.data = qs.stringify(data);
      }
    } else if (config.method === "get") {
      if (config.url !== "https://api.lkkjjt.com/pub/wechatsharing") {
        config.headers["requestPlatform"] = isWeixin() ? "2" : null;
      }

      config.params = {
        ...config.params
      };
    } else if (config.method === "put") {
      config.data = {
        ...data
      };
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 诚聊购 http response 拦截器
clgAxios.interceptors.response.use(
  (res) => {
    const { errorCode, msg } = res.data;
    if (errorCode === 11003) {
      Toast("该账号存在异常，请联系客服咨询~");
      return res.data;
    }

    if (errorCode === ERR_NOLOGIN && !localCache.getCache("cltToken")) {
      dropout();
      handleLogin();
      return;

      // router.replace("/login").catch(() => {});
      // if (router.history.current.path != "/smslogin") {
      //   let fullPath = router.history.current.fullPath.replace(
      //     /token=.*?(&|$)/,
      //     ""
      //   );

      //   router
      //     .replace({ path: "/smslogin", query: { redirect: fullPath } })
      //     .catch(() => {});
      // }
      // return;
    }
    if (errorCode === ERR_OK || errorCode === 40100 || res.data.code === 0) {
      return res.data;
    }

    if (errorCode !== ERR_OK && errorCode !== ERR_NOLOGIN) {
      const {
        config: { url }
      } = res;
      if (url.includes("checkUserIdentAuthStatus")) return;

      if (msg != "当前暂无限时活动商品信息！") {
        Toast(msg);
      }
      return res.data;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export function get(url, base = "") {
  return function (params = {}) {
    return clgAxios({
      method: "get",
      url: base ? base + url : url,
      params: params
    });
  };
}

export function post(
  url,
  headers = {
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
  }
) {
  return function (data = {}) {
    return clgAxios({
      method: "post",
      url,
      headers: headers,
      data: data
    });
  };
}

export function put(url) {
  return function (data = {}) {
    return clgAxios({
      method: "put",
      url,
      data: data
    });
  };
}
