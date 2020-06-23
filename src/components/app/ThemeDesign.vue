<template>
  <v-card>
    <v-card-title>{{$t('themePallet.title')}}</v-card-title>
    <v-card-subtitle>{{$t('themePallet.subtitle')}}</v-card-subtitle>
    <v-card-text>
      <v-tabs v-model="tab">
        <v-tab @click="$store.commit('setThemeMode',0)">{{$t('themePallet.lightTheme')}}</v-tab>
        <v-tab @click="$store.commit('setThemeMode',2)">{{$t('themePallet.darkTheme')}}</v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <ThemeColor theme="light" />
        </v-tab-item>
        <v-tab-item>
          <ThemeColor theme="dark" />
        </v-tab-item>
      </v-tabs-items>
    </v-card-text>
  </v-card>
</template>

<script>
import ThemeColor from "@/components/app/ThemeColor";
export default {
  components: { ThemeColor },
  props: {
    dialog: {
      type: Boolean
    }
  },
  data() {
    return {
      beforeThemeMode: 0,
      tab: 0
    };
  },
  computed: {
    isDarkTheme() {
      return this.$store.state.theme.isDarkTheme;
    }
  },
  watch: {
    dialog(val) {
      if (val) {
        this.beforeThemeMode = this.$store.state.theme.themeMode;
      } else {
        this.$store.commit("setThemeMode", this.beforeThemeMode);
      }
    },
    isDarkTheme(val) {
      this.tab = val ? 1 : 0;
    }
  }
};
</script>