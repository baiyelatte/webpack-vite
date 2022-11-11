/*
 * @Author: Admin
 * @Date: 2022-02-17 14:50:52
 * @LastEditors: Crush
 * @LastEditTime: 2022-04-08 10:57:15
 * @FilePath: \mallh5\src\store\modules\activity.js
 * @Description:
 *
 * Copyright (c) 2022 by Crush/禄可集团, All Rights Reserved.
 */
import { sessionCache } from "@/utils/cache";

export default {
  namespaced: true,
  state: {
    list: sessionCache.getCache("activityList")
  },
  getters: {
    getActivityShareInfo({ list }) {
      return list?.find((item) => item.activityType === 2);
    },
    getActivityLocalInfo({ list }) {
      return list?.find((item) => item.activityType === 3);
    }
  },
  actions: {},
  mutations: {
    setList(state, payload) {
      sessionCache.setCache("activityList", payload);
      state.list = payload;
    },
    clearList(state) {
      state.list = [];
      sessionCache.deleteCache("activityList");
    }
  }
};
