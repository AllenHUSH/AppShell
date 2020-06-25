module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],

  pluginOptions: {
    i18n: {
      locale: 'zh',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true
    }
  },

  pwa: {
    name: 'AppShell',
    themeColor: '#50E3C2',
    msTileColor: '#50E3C2',
    manifestOptions: {
      background_color: '#50E3C2'
    },
    iconPaths:{
      favicon32: 'build/icons/32x32.png',
      favicon16: 'build/icons/16x16.png',
      appleTouchIcon: 'build/icons/128x128.png',
      maskIcon: 'build/icons/icon.svg',
      msTileImage: 'build/icons/128x128.png'
    }
  }
}
