/*
 * @Author: Crush
 * @Date: 2022-04-20 14:19:41
 * @LastEditTime: 2022-10-17 14:08:35
 * @FilePath: \mallh5\src\api\config\useAxiosFactory.js
 */
import axios from "axios";
import qs from "qs";
// 其他接口通用公共请求

export default function useAxiosFactory(url) {
  const axiosInstance = axios.create({
    baseURL: url
  });

  axiosInstance.interceptors.request.use((config) => {
    if (config.method === "post") {
      if (
        config.headers["Content-Type"] ==
        "application/x-www-form-urlencoded; charset=UTF-8"
      ) {
        config.data = qs.stringify(config.data);
      }
    }
    return config;
  });

  axiosInstance.interceptors.response.use((config) => {
    return config.data;
  });

  const post = (url, headers) => {
    return function (data = {}) {
      return axiosInstance({
        method: "post",
        url,
        headers,
        data
      });
    };
  };

  const get = (url, headers) => {
    return function (params = {}) {
      return axiosInstance({
        method: "get",
        url,
        headers,
        params
      });
    };
  };

  return { axiosInstance, post, get };
}
