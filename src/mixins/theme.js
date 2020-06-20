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
        themeMode: localStorage.getItem("themeMode") ?
          parseInt(localStorage.getItem("themeMode")) : 1,
        sysDarkTheme: window.matchMedia("(prefers-color-scheme: dark)"),
        isSysDarkTheme: false,
      };
    },
    computed: {
      isDarkTheme() {
        if (this.themeMode == 0) {
          return false;
        } else if (this.themeMode == 1) {
          return this.isSysDarkTheme;
        } else if (this.themeMode == 2) {
          return true;
        }
      }
    },
    watch: {
      isDarkTheme(val) {
        this.$vuetify.theme.dark = val;
      }
    },
    created() {
      this.changeTheme();
      // 为媒体查询创建监听器
      this.sysDarkTheme.addListener(this.changeTheme);
      this.$vuetify.theme.dark = this.isDarkTheme;
    },
    methods: {
      changeMode() {
        this.themeMode = (this.themeMode + 1) % 3;
        localStorage.setItem("themeMode", this.themeMode);
        this.changeTheme();
      },
      changeTheme() {
        this.isSysDarkTheme = this.sysDarkTheme.matches;
      },
    },
  };