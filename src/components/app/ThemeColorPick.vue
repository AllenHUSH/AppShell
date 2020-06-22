<template>
  <v-card>
    <v-card-title>{{$t('themePallet.title')}}</v-card-title>
    <v-card-subtitle>{{$t('themePallet.subtitle')}}</v-card-subtitle>
    <v-card-text>
      <v-tabs v-model="tab">
        <v-tab>{{$t('themePallet.setMode')}}</v-tab>
        <v-tab>{{$t('themePallet.designTheme')}}</v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th >模式</th>
                  <th >触发条件描述</th>
                  <th >对应模式</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(mode, index) in modeList" :key="index">
                  <td>
                    <v-text-field v-if="mode.isPreset" :value="$t(mode.name)" disabled></v-text-field>
                    <v-text-field v-else v-model="mode.name"></v-text-field>
                  </td>
                  <td>
                    <v-text-field v-if="mode.isPreset" :value="$t(mode.condition.label)" disabled></v-text-field>
                    <v-text-field v-else v-model="mode.condition.label"></v-text-field>
                  </td>
                  <td></td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-tab-item>
        <v-tab-item>
          <!-- 选择颜色 -->
          <v-color-picker v-model="color" mode="hexa" flat></v-color-picker>
          <!-- 应用到何处 -->
          <v-btn color="primary" @click="setColor()">sub</v-btn>
        </v-tab-item>
      </v-tabs-items>
    </v-card-text>
  </v-card>
</template>

<script>
// 媒体查询来判断使用何种主题颜色
import theme from "@/mixins/theme";

export default {
  mixins: [theme],
  data() {
    return {
      color: "",
      tab: null,
      modeList: [
        {
          name: "themePallet.lightMode.name",
          condition: {
            label: "themePallet.lightMode.condition"
          },
          theme: 0,
          isPreset: true
        },
        {
          name: "themePallet.autoMode.name",
          condition: {
            label: "themePallet.autoMode.condition"
          },
          theme: 1,
          isPreset: true
        },
        {
          name: "themePallet.darkMode.name",
          condition: {
            label: "themePallet.darkMode.condition"
          },
          theme: 2,
          isPreset: true
        },
        {
          name: "EVA",
          condition: {
            label: "themePallet.darkMode.condition"
          },
          theme: 2,
          isPreset: false
        }
      ],
      themeList: [
        {
          name: "",
          themeCode: 0,
          colors: [
            {
              key: "primary",
              value: ""
            }
          ]
        }
      ]
    };
  },
  methods: {
    setColor() {
      this.$vuetify.theme.themes.light.primary = this.color.substr(0, 7);
    }
  }
};
</script>