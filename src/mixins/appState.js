/**
 * 在App.vue生命周期中
 * 监听主线程的消息
 * 并存入store方便其他组件取用
 * 包含[操作系统]、[是否全屏||最大化]
 */
export default {
    created() {
      this.getAppState();
      this.getMaximized();
      this.electron.ipcRenderer.send("appState");
    },
    methods: {
      getAppState() {
        return this.electron.ipcRenderer.on("appState", (event, arg) => {
          this.$store.commit("setPlatform", arg.platform);
          this.$store.commit("setIsMaximized", arg.isMaximized);
        });
      },
      getMaximized() {
        return this.electron.ipcRenderer.on("isMaximized", (event, arg) => {
          this.$store.commit("setIsMaximized", arg);
        });
      }
    }
  };