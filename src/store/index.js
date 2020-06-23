import Vue from "vue";
import Vuex from "vuex";

import themeStore from "@/store/themeStore"
import appStateStore from "@/store/appStateStore"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username: localStorage.getItem("username") || "©Allen"
  },
  mutations: {},
  actions: {},
  modules: {
    theme: themeStore,
    appState: appStateStore
  },
});