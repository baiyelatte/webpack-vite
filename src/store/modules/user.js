/*
 * @Author: Admin
 * @Date: 2022-02-10 14:39:55
 * @LastEditors: Crush
 * @LastEditTime: 2022-06-20 09:17:29
 * @FilePath: \mallh5\src\store\modules\user.js
 * @Description:
 *
 * Copyright (c) 2022 by Crush/禄可集团, All Rights Reserved.
 */
import * as types from "./mutation-types";
import { localCache, OPENID } from "@/utils/cache";
import { getUserInfo } from "@/api";
import { removeUrlKey, isWeixin, getOpenId } from "@/utils/dom";
const isClApp = LukeappApi.IscltApp();

export default {
  state: {
    userinfo: {},
    validateToken: "",
    openId: ""
  },
  getters: {
    getuserinfo: (state) => {
      let userinfo = state.userinfo;
      if (!userinfo || !Object.keys(userinfo).length) {
        try {
          userinfo = localCache.getCache("userinfo");
        } catch (err) {
          console.log(err);
        }
      }
      return userinfo;
    },
    getOpenIdGetters: () =>
      localCache.getCache(OPENID + localCache.getCache("userinfo")?.unionid)
  },
  actions: {
    userinfo({ commit }, params) {
      commit(types.USERINFO, params);
    },
    async getUserInfoAction({ commit }, { token }) {
      let currentToken = token;

      localCache.setCache("userinfo", { token: currentToken });
      removeUrlKey("token");
      try {
        const { data, errorCode } = await getUserInfo();
        if (errorCode === 1) {
          commit(types.USERINFO, data);
          isWeixin() && getOpenId();
        }
      } catch (err) {
        return err;
      }
    }
  },
  mutations: {
    [types.USERINFO]: (state, payload) => {
      state.userinfo = payload;
      localCache.setCache("userinfo", payload);
      isClApp && localCache.setCache("CLAPP", true);
    },
    [types.CHANGEVALIDATETOKEN]: (state, token) => (state.validateToken = token)
  }
};
