import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username: localStorage.getItem("username") || "©Allen",
    platform: "unknown",
    isMaximized:false,
  },
  mutations: {
    setPlatform(state, platform) {
      state.platform = platform;
    },
    setIsMaximized(state,isMaximized){
      state.isMaximized=isMaximized;
    }
  },
  actions: {},
  modules: {},
});
