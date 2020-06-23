<template>
  <v-card>
    <v-card-title>{{$t('themePallet.title')}}</v-card-title>
    <v-card-subtitle>{{$t('themePallet.subtitle')}}</v-card-subtitle>
    <v-card-text>
      <v-tabs v-model="tab" right>
        <v-tab @click="$store.commit('setThemeMode',0)">{{$t('themePallet.lightTheme')}}</v-tab>
        <v-tab @click="$store.commit('setThemeMode',2)">{{$t('themePallet.darkTheme')}}</v-tab>
      </v-tabs>
      <v-row no-gutters>
        <v-col cols="12" sm="6">
          <v-color-picker v-model="color" mode="hexa" />
        </v-col>
        <v-col cols="12" sm="6">
          <v-tabs-items v-model="tab">
            <v-tab-item>
              <ThemeColor theme="light" :colorList="colorList" :color="color.slice(0,7)" />
            </v-tab-item>
            <v-tab-item>
              <ThemeColor theme="dark" :colorList="colorList" :color="color.slice(0,7)" />
            </v-tab-item>
          </v-tabs-items>
        </v-col>
      </v-row>
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
      tab: 0,
      color: "",
      colorList: [
        { name: "primary", lightColorValue: "#1976D2", darkColorValue: "" },
        { name: "secondary", lightColorValue: "#424242", darkColorValue: "" },
        { name: "accent", lightColorValue: "#82B1FF", darkColorValue: "" },
        { name: "success", lightColorValue: "#4CAF50", darkColorValue: "" },
        { name: "warning", lightColorValue: "#FFC107", darkColorValue: "" },
        { name: "error", lightColorValue: "#FF5252", darkColorValue: "" },
        { name: "info", lightColorValue: "#2196F3", darkColorValue: "" }
      ]
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