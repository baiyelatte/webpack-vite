import * as types from "./mutation-types";
import { getUserAccountMoney } from "api";

export default {
  state: {
    walletinfo: null
  },
  getters: {
    getwalletinfo: (state) => {
      let walletinfo = state.walletinfo;
      if (!walletinfo) {
        walletinfo =
          JSON.parse(window.localStorage.getItem("walletinfo")) || null;
      }
      return walletinfo;
    }
  },
  actions: {
    putwalletinfo({ commit }) {
      getUserAccountMoney().then((res) => {
        if (res && res.errorCode == 1) {
          commit(types.WALLETINFO, {
            data: res.data
          });
        }
      });
    }
  },
  mutations: {
    [types.WALLETINFO]: (state, { data }) => {
      state.walletinfo = data;
      localStorage.setItem("walletinfo", JSON.stringify(data));
    }
  }
};
