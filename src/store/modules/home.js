/*
 * @Author: Admin
 * @Date: 2022-02-10 14:39:55
 * @LastEditors: Crush
 * @LastEditTime: 2022-08-23 16:05:15
 * @FilePath: \project\mallh5\src\store\modules\home.js
 * @Description:
 *
 * Copyright (c) 2022 by Crush/禄可集团, All Rights Reserved.
 */
import * as types from "./mutation-types";
import { getTabs as getTabsRequest } from "api";

export default {
  namespaced: true,
  state: {
    columns: null,
    position: null,
    activeIndex: 0,
    tabList: null,
    tabId: ""
  },
  getters: {
    position: (state) => {
      if (!state.position) {
        return {
          adcode: "110100",
          isInitial: true
        };
      }

      return state.position;
    }
  },
  actions: {
    getColumns({ commit }, params) {
      commit(types.HOME, { data: params });
    },
    async getTabs({ commit, state }) {
      if (state.tabList) return state.tabList;
      const res = await getTabsRequest();
      if (res && res.errorCode == 1) {
        commit("SET_TABLE_LIST", res.data.content);
        commit("SET_TABLE_ID", res.data.content[0]?.id);
      }
    }
  },
  mutations: {
    [types.HOME]: (state, { data }) => {
      state.columns = data;
    },
    SET_POSITION: (state, value) => {
      state.position = value;
      localStorage.setItem("mph5-pos", JSON.stringify(value));
    },
    CHANGE_ACTIVE_INDEX(state, value) {
      state.activeIndex = value;
    },
    SET_TABLE_LIST(state, value) {
      state.tabList = value;
    },
    SET_TABLE_ID(state, value) {
      state.tabId = value;
    }
  }
};
