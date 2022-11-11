/*
 * @Date: 2022-10-25 09:18:41
 * @LastEditors: baiyelatte baiyelatte@gmail.com
 * @LastEditTime: 2022-11-02 11:32:08
 * @FilePath: \mallh5\src\store\modules\classify.js
 */
//全部类目查询
import { getTabMenuV2, getAllClassifyV2, getRankIndexV2 } from "@/api";
export default {
  namespaced: true,
  state: {
    data: "",
    allData: ""
  },
  mutations: {
    changeTabManu(state, value) {
      state.data = value;
    },
    changeAllTabManu(state, value) {
      state.allData = value;
    }
  },
  actions: {
    async getMenu({ commit }, params) {
      const { data } = await getTabMenuV2(params);
      commit("changeTabManu", data);
      return data;
    },
    async getAllMenu({ commit }, params) {
      const { data } = await getAllClassifyV2(params);
      commit("changeAllTabManu", data);
      return data;
    },
    // 排行榜
    async getAllRankList({ commit }, params) {
      const { data } = await getAllClassifyV2(params);
      commit("changeAllTabManu", data);
      return data;
    }
  }
};
