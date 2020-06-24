/**
 * 在App.vue生命周期中
 * 监听主线程的消息
 * 并存入store方便其他组件取用
 * 包含[操作系统]、[是否全屏||最大化]
 */
export default  {
  computed: {
    platform() {
      return this.$store.state.appState.platform;
    },
    isMaximized() {
      return this.$store.state.appState.isMaximized;
    }
  },
  created() {
    this.getAppState();
    this.getMaximized();
    process.env.IS_ELECTRON?this.electron.ipcRenderer.send("appState"):null;
  },
  methods: {
    getAppState() {
      return process.env.IS_ELECTRON?this.electron.ipcRenderer.on("appState", (event, arg) => {
        this.$store.commit("setPlatform", arg.platform);
        this.$store.commit("setIsMaximized", arg.isMaximized);
      }):null;
    },
    getMaximized() {
      return process.env.IS_ELECTRON?this.electron.ipcRenderer.on("isMaximized", (event, arg) => {
        this.$store.commit("setIsMaximized", arg);
      }):null;
    }
  }
};