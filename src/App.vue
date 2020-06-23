<template>
  <v-app>
    <!-- 侧边 -->
    <v-navigation-drawer v-model="drawer" app clipped>
      <div :class="{'show-darwin-nav':(platform==='darwin'&&!isMaximized)}"></div>
      <v-list nav>
        <v-list-item
          link
          v-for="(nav, index) in navList"
          :key="index"
          exact
          :input-value="true"
          :to="{name:nav.link}"
          color="primary"
        >
          <v-list-item-action>
            <v-icon>{{nav.icon}}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{$t(nav.title)}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <v-divider></v-divider>
        <div class="d-flex pa-2">
          <v-btn icon @click="electron.shell.openExternal('https://github.com/AllenHUSH/AppShell')">
            <v-icon>mdi-github</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-menu>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon>mdi-earth</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(lang, index) in languageList"
                :key="index"
                @click="$i18n.locale = lang.value"
              >
                <v-list-item-title>{{ lang.label }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-dialog v-model="dialog" width="1000">
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon>mdi-palette</v-icon>
              </v-btn>
            </template>
            <ThemeDesign :dialog="dialog"/>
          </v-dialog>
          <v-btn icon @click="changeMode()">
            <v-icon>mdi-brightness-{{ [5,'auto',7][themeMode] }}</v-icon>
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <!-- 顶部 -->
    <v-app-bar
      app
      dense
      clipped-left
      style="-webkit-app-region: drag;"
      :class="{'show-darwin-btn':(platform==='darwin'&&!isMaximized)}"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" style="-webkit-app-region: no-drag;"></v-app-bar-nav-icon>
      <v-toolbar-title style="-webkit-user-select: none;">{{$t('application.name')}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <WinBtn />
    </v-app-bar>
    <!-- 主要 -->
    <v-main>
      <div :class="{'show-darwin-nav':(platform==='darwin'&&!isMaximized)}"></div>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
    <!-- 底部 -->
    <v-footer app>{{username}}</v-footer>
  </v-app>
</template>

<script>
// 媒体查询来判断使用何种主题颜色
import theme from "@/mixins/theme";
// 在App.vue生命周期中获取全局相关变量
import appState from "@/mixins/appState";
// 仅在Windows系统下显示的模拟[最小化、最大化、关闭]按钮
import WinBtn from "@/components/app/WinBtn";
import ThemeDesign from "@/components/app/ThemeDesign";

export default {
  name: "App",
  mixins: [theme, appState],
  components: { WinBtn, ThemeDesign },
  data: () => ({
    dialog: false,
    drawer: null,
    languageList: [
      { label: "中文", value: "zh" },
      { label: "English", value: "en" }
    ],
    navList: [
      {
        title: "router.home",
        link: "Home",
        icon: "mdi-home"
      },
      {
        title: "router.about",
        link: "About",
        icon: "mdi-more"
      }
    ]
  }),
  computed: {
    username() {
      return this.$store.state.username;
    },
    platform() {
      return this.$store.state.appState.platform;
    },
    isMaximized() {
      return this.$store.state.appState.isMaximized;
    }
  }
};
</script>

<style lang="stylus" scoped>
.show-darwin-btn {
  height: 63px !important;
  padding-top: 15px !important;
}

.show-darwin-nav {
  height: 15px;
  width: 100%;
}
</style>