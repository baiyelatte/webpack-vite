/*
 * @Author: Crush
 * @Date: 2022-04-20 13:52:52
 * @LastEditTime: 2022-11-11 14:27:50
 * @FilePath: \vite_vue2.7\src\api\config\index.js
 */

import { generatorUrlKey } from "@/utils/dom";

const baseUrl = import.meta.env.VITE_APP_PRODUCTION_NETWORK;
const isDev = import.meta.env.VITE_ENV === "development";

export const aliPayUrl = (params) => {
  return `${baseUrl}/app/trade/createAliPay?${generatorUrlKey(params)}`;
};

export const cltfiledomain = isDev
  ? "http://test-luke-sincerechat.oss-cn-beijing.aliyuncs.com/"
  : "https://file.expection.cn/";

export const clmApkUrl = isDev
  ? "http://clgbusinter.expection.cn"
  : "https://mallsa.lkkjjt.com";

export const cltUrl =
  isDev === "development"
    ? "https://testapi.expection.cn"
    : "https://api.lkkjjt.com";
