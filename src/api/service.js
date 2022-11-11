// import axios from "axios";
// import qs from "qs";
// import router from "../router";
// import { Toast, Dialog } from "vant";
// import {
//   isWeixin,
//   dropout,
//   getUrlKey,
//   isAlipay,
//   getStorage,
//   localCache
// } from "@/utils";
// import { cltUrl } from "./config";
// let requestype = null;
// // const baseUrl = urlMap[process.env.NODE_ENV];
// const baseUrl = process.env.VUE_APP_CLG_NETWORK;
// // const baseUrl = 'http://192.168.3.145:8090'

// const ERR_OK = 1;
// const ERR_NOLOGIN = 10002;

// const clgAxios = axios.create({
//   baseURL: baseUrl
// });

// const clmAxios = axios.create({
//   baseURL: process.env.VUE_APP_CLM_NETWORK
// });

// // 诚聊购 http request 拦截器
// clgAxios.interceptors.request.use(
//   (config) => {
//     let userinfo = getStorage("userinfo") || {};

//     let data = config.data;
//     if (config.method === "post") {
//       config.headers["token"] = userinfo.token;
//       config.headers["platform"] = "h5";
//       config.headers["requestPlatform"] = isWeixin() ? "2" : null;

//       // config.data = requestype == 'json' ? { ...data } : (requestype == 'file' ? data : qs.stringify({ ...data }));
//       if (
//         config.headers["Content-Type"] ==
//         "application/x-www-form-urlencoded; charset=UTF-8"
//       ) {
//         config.data = qs.stringify(data);
//       }
//     } else if (config.method === "get") {
//       if (config.url !== "https://api.lkkjjt.com/pub/wechatsharing") {
//         config.headers["token"] = userinfo.token;
//         config.headers["platform"] = "h5";
//         config.headers["requestPlatform"] = isWeixin() ? "2" : null;
//       }

//       config.params = {
//         ...config.params
//       };
//     } else if (config.method === "put") {
//       config.headers["token"] = userinfo.token;
//       config.headers["platform"] = "h5";
//       config.data = {
//         ...data
//       };
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // 诚聊购 http response 拦截器
// clgAxios.interceptors.response.use(
//   (res) => {
//     const { errorCode, msg } = res.data;

//     if (errorCode === 11003) {
//       Toast("该账号存在异常，请联系客服咨询~");
//       router.replace("/index");
//     }

//     if (localCache.getCache("isNeedBindPhone")) {
//       const fullPath = router.history.current.fullPath.replace(
//         /token=.*?(&|$)/,
//         ""
//       );
//       router
//         .replace({ path: "/bindPhone", query: { redirect: fullPath } })
//         .catch(() => {});
//       localCache.deleteCache("isNeedBindPhone");
//       return;
//     }

//     if (errorCode === ERR_NOLOGIN) {
//       dropout();
//       handleLogin();
//       return;

//       // router.replace("/login").catch(() => {});
//       // if (router.history.current.path != "/smslogin") {
//       //   let fullPath = router.history.current.fullPath.replace(
//       //     /token=.*?(&|$)/,
//       //     ""
//       //   );

//       //   router
//       //     .replace({ path: "/smslogin", query: { redirect: fullPath } })
//       //     .catch(() => {});
//       // }
//       // return;
//     }
//     if (errorCode === ERR_OK || errorCode === 40100 || res.data.code === 0) {
//       return res.data;
//     }

//     if (errorCode !== ERR_OK && errorCode !== ERR_NOLOGIN) {
//       const {
//         config: { url }
//       } = res;
//       if (url.includes("checkUserIdentAuthStatus")) return;

//       if (msg != "当前暂无限时活动商品信息！") {
//         Toast(msg);
//       }
//       return res.data;
//     }
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // 诚聊卖 http request 拦截
// clmAxios.interceptors.request.use((config) => {
//   if (config.method === "post") {
//     if (
//       config.headers["Content-Type"] ==
//       "application/x-www-form-urlencoded; charset=UTF-8"
//     ) {
//       config.data = qs.stringify(config.data);
//     }
//   }
//   return config;
// });

// // 诚聊卖 http response 拦截器
// clmAxios.interceptors.response.use((config) => {
//   return config.data;
// });

// export function get(url, base = "") {
//   return function (params = {}) {
//     return clgAxios({
//       method: "get",
//       url: base ? base + url : url,
//       params: params
//     });
//   };
// }

// export function post(
//   url,
//   headers = {
//     "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
//   },
//   requestypes = null,
//   base = ""
// ) {
//   return function (data = {}) {
//     requestype = requestypes;
//     return clgAxios({
//       method: "post",
//       url,
//       headers: headers,
//       data: data
//     });
//   };
// }

// export function put(url) {
//   return function (data = {}) {
//     return clgAxios({
//       method: "put",
//       url,
//       data: data
//     });
//   };
// }

// export const cltPost = (url, headers, requestypes) =>
//   post(url, headers, requestypes, process.env.VUE_APP_CLT_NETWORK);

// export const cltGet = (url) => get(url, process.env.VUE_APP_CLT_NETWORK);

// export const clmPost = (url, headers) => {
//   return function (data = {}) {
//     return clmAxios({
//       method: "post",
//       url,
//       headers,
//       data
//     });
//   };
// };

// export const clmGet = (url) => {
//   return function (params = {}) {
//     clmAxios({
//       method: "get",
//       url,
//       params
//     });
//   };
// };

export * from "./config/clgAxios";

import useAxiosFactory from "./config/useAxiosFactory";

const {
  axiosInstance: clmAxios,
  post: clmPost,
  get: clmGet
} = useAxiosFactory(process.env.VUE_APP_CLM_NETWORK);

const {
  axiosInstance: cltAxios,
  post: cltPost,
  get: cltGet
} = useAxiosFactory(process.env.VUE_APP_CLT_NETWORK);

const {
  axiosInstance: pubAxios,
  post: pubPost,
  get: pubGet
} = useAxiosFactory(process.env.VUE_APP_PUB_NETWORK);

const {
  axiosInstance: blgAxios,
  post: blgPost,
  get: blgGet
} = useAxiosFactory(process.env.VUE_APP_BLG_NETWORK);

export {
  clmAxios,
  clmPost,
  clmGet,
  cltAxios,
  cltPost,
  cltGet,
  pubAxios,
  pubPost,
  pubGet,
  blgAxios,
  blgPost,
  blgGet
};
