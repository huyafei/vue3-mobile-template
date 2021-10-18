import "../../utils/axios";

const user = {
  namespaced: true,
  state: {
    userInfo: "",
    userName: "",
    token: "",
  },
  getters: {
    userInfo: (state) => {
      return state.userInfo;
    },
  },
  mutations: {
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo;
    },
    SET_USERNAME: (state, userName) => {
      state.userName = userName;
    },
  },
  actions: {
    /**
     * 获取用户信息
     * @param commit
     * @param state
     * @param userInfo
     */
    getUserInfo({ commit }, userInfo) {
      commit("SET_USERNAME", userInfo.userName);
      commit("SET_USERINFO", userInfo);
    },
    /**
     * 退出登录
     * @param commit
     * @param state
     */
    logOut({ commit }) {
      commit("REMOVE_USERINFO", "");
    },
  },
};

export default user;
