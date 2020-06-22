<template>
  <div>
    <div v-for="(colorName, index) in colorNameList" :key="index">
      <v-btn :color="colorName" outlined rounded>
        <v-icon>mdi-brightness-1</v-icon>
        {{colorName}}
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    theme: {
      type: String,
      default: "light"
    }
  },
  data() {
    return {
      colorNameList: [
        "primary",
        "secondary",
        "accent",
        "success",
        "warning",
        "error",
        "info"
      ]
    };
  }
};
</script>