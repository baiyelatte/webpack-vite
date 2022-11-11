// 城聊客带货
export default {
  state: {
    dellFlag: false
  },
  getters: {
    getdellFlag: (state) => {
      return state.dellFlag;
    }
  },
  mutations: {
    setDellFlag: (state, val) => {
      state.dellFlag = val;
    }
  }
};
