<template>
  <div>
    <div v-for="(color, index) in colorList" :key="index" class="ma-1">
      <v-btn text tile :color="color.name" @click="$emit('set-color',$vuetify.theme.themes[theme][color.name])">
        <v-icon>mdi-eyedropper-variant</v-icon>
        {{$t('themePallet.eyedropper')}}</v-btn>
      <v-btn :color="color.name" outlined tile @click="setThemeColor(color.name)">
        {{$t('themePallet.setAs')}}
        <v-icon>mdi-brightness-1</v-icon>
        {{color.name}}
      </v-btn>
      <v-btn
        text
        tile
        :color="color.name"
        @click="setThemeColor(color.name,color[`${theme}ColorValue`])"
      >
      <v-icon>mdi-restart</v-icon>
      {{$t('themePallet.reset')}}</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    theme: {
      type: String,
      default: "light"
    },
    colorList: {
      type: Array
    },
    color: {
      type: String
    }
  },
  methods: {
    setThemeColor(colorName, colorValue = this.color) {
      this.$vuetify.theme.themes[this.theme][colorName] = colorValue;
      localStorage.setItem(`${this.theme}:${colorName}`, colorValue);
    }
  }
};
</script>