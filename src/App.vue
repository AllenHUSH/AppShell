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
          <v-btn icon @click="openUrl('https://github.com/AllenHUSH/AppShell')">
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
                @click="setLocale(lang.value)"
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
            <ThemeDesign :dialog="dialog" />
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
    <v-main :class="(platform==='darwin'&&!isMaximized)?'main-scroll-darwin':'main-scroll'">
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
// 多语言
import locale from "@/mixins/locale";
// 仅在Windows系统下显示的模拟[最小化、最大化、关闭]按钮
import WinBtn from "@/components/app/WinBtn";
// 主题调色板
import ThemeDesign from "@/components/app/ThemeDesign";
// 工具类
import util from "@/utils/index";

export default {
  name: "App",
  mixins: [theme, appState, locale],
  components: { WinBtn, ThemeDesign },
  data: () => ({
    dialog: false,
    drawer: null,
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
    }
  },
  methods: {
    openUrl(url){
      return util.openUrl(url)
    }
  },
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

html {
  overflow: hidden;
}

.main-scroll {
  height: calc(100vh - 48px - 36px);
  overflow: scroll;
  margin-top: 48px;
  margin-bottom: 30px;
  padding-top: 0 !important;
}

.main-scroll-darwin {
  height: calc(100vh - 63px - 36px);
  overflow: scroll;
  margin-top: 63px;
  margin-bottom: 30px;
  padding-top: 0 !important;
}
</style>

<style lang="stylus">
::-webkit-scrollbar {
  width: 7px;
  height: 7px;
}

::-webkit-scrollbar-thumb {
  border-radius: 1000px;
  background-color: rgba(0, 0, 0, 0.5);

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
}

::-webkit-scrollbar-track {
  background-color: transparent;

  &:hover {
    padding: 1px;
    background-color: rgba(255, 255, 255, 0.2);
    border-left: 1px solid rgba(0, 0, 0, 0.2);
  }
}

::-webkit-scrollbar-button, ::-webkit-scrollbar-corner {
  display: none;
}
</style>