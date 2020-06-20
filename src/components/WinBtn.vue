<template>
  <div class="win-btn" v-if="platform==='win32'">
    <v-btn icon tile @click="sendMessage('window-min')">
      <v-icon>mdi-window-minimize</v-icon>
    </v-btn>
    <v-btn icon tile @click="sendMessage('window-max')">
      <v-icon v-if="isMaximized">mdi-window-restore</v-icon>
      <v-icon v-else>mdi-window-maximize</v-icon>
    </v-btn>
    <v-btn icon tile color="error" @click="sendMessage('window-close')" class="win-btn-close">
      <v-icon>mdi-window-close</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "WinBtn",
  computed: {
    platform() {
      return this.$store.state.platform;
    },
    isMaximized(){
      return this.$store.state.isMaximized
    }
  },
  methods: {
    sendMessage(message) {
      this.electron.ipcRenderer.send(message, null);
    }
  }
};
</script>

<style lang="stylus" scoped>
.win-btn {
  -webkit-app-region: no-drag;
  position: relative;
  right: -16px;

  .win-btn-close {
  }
}
</style>