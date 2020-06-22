import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    themeMode: localStorage.getItem("themeMode") ?
      parseInt(localStorage.getItem("themeMode")) : 1,
    isDarkTheme: false,
    username: localStorage.getItem("username") || "©Allen",
    platform: "unknown",
    isMaximized: false,
  },
  mutations: {
    setPlatform(state, platform) {
      state.platform = platform;
    },
    setIsMaximized(state, isMaximized) {
      state.isMaximized = isMaximized;
    },
    changeThemeMode(state) {
      state.themeMode = (state.themeMode + 1) % 3;
      localStorage.setItem("themeMode", state.themeMode);
    },
    setThemeMode(state, themeMode) {
      console.log(themeMode);
      
      state.themeMode = themeMode;
      localStorage.setItem("themeMode", themeMode);
    },
    setIsDarkTheme(state, isDarkTheme) {
      state.isDarkTheme = isDarkTheme
    }
  },
  actions: {},
  modules: {},
});