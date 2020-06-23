<template>
  <v-card>
    <v-card-title>{{$t('themePallet.title')}}</v-card-title>
    <v-card-subtitle>{{$t('themePallet.subtitle')}}</v-card-subtitle>
    <v-card-text>
      <v-tabs v-model="tab" class="mb-2">
        <v-tab @click="$store.commit('setThemeMode',0)">{{$t('themePallet.lightTheme')}}</v-tab>
        <v-tab @click="$store.commit('setThemeMode',2)">{{$t('themePallet.darkTheme')}}</v-tab>
      </v-tabs>
      <v-row no-gutters>
        <v-col cols="12" sm="4">
          <v-color-picker v-model="color" mode="hexa" />
        </v-col>
        <v-col cols="12" sm="8">
          <v-tabs-items v-model="tab">
            <v-tab-item>
              <ThemeColor
                theme="light"
                :colorList="colorList"
                :color="color.slice(0,7)"
                @setColor="setColor"
              />
            </v-tab-item>
            <v-tab-item>
              <ThemeColor
                theme="dark"
                :colorList="colorList"
                :color="color.slice(0,7)"
                @setColor="setColor"
              />
            </v-tab-item>
          </v-tabs-items>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import colorList from "@/mixins/data/colorList";
import ThemeColor from "@/components/app/ThemeColor";
export default {
  mixins: [colorList],
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
      color: ""
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
  },
  created() {
    this.tab = this.isDarkTheme ? 1 : 0;
    this.beforeThemeMode = this.$store.state.theme.themeMode;
  },
  methods: {
    setColor(color) {
      this.color = color + "FF";
    }
  }
};
</script>