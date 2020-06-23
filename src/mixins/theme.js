/**
 * 主题配色相关
 * 当themeMode为0时 浅色
 * 为1时 由sysDarkTheme判断
 * 为2时 深色
 * sysDarkTheme为媒体查询操作系统主题配色
 */
export default {
  data() {
    return {
      sysDarkTheme: window.matchMedia("(prefers-color-scheme: dark)"),
      isSysDarkTheme: false,
    };
  },
  computed: {
    isDarkTheme() {
      return this.$store.state.theme.isDarkTheme
    },
    themeMode() {
      return this.$store.state.theme.themeMode
    }
  },
  watch: {
    isDarkTheme(val) {
      this.$vuetify.theme.dark = val;
    },
    themeMode() {
      this.querySysTheme()
      this.$store.commit('setIsDarkTheme', this.returnIsDarkTheme())
    },
    isSysDarkTheme(){
      this.$store.commit('setIsDarkTheme', this.returnIsDarkTheme())
    }
  },
  created() {
    // 先查询一次当前系统主题
    this.querySysTheme();
    // 为媒体查询创建监听器，当系统主题变化时应用主题可能变化
    this.sysDarkTheme.addListener(this.querySysTheme);
  },
  methods: {
    changeMode() {
      // 顺序改变主题模式
      this.$store.commit('changeThemeMode')
    },
    querySysTheme() {
      this.isSysDarkTheme = this.sysDarkTheme.matches;
    },
    returnIsDarkTheme() {
      if (this.themeMode == 0) {
        return false
      } else if (this.themeMode == 1) {
        return this.isSysDarkTheme
      } else if (this.themeMode == 2) {
        return true
      }
    }
  },
};