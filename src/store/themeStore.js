export default {
    state: {
        themeMode: localStorage.getItem("themeMode") ?
            parseInt(localStorage.getItem("themeMode")) : 1,
        isDarkTheme: false
    },
    mutations: {
        changeThemeMode(state) {
            state.themeMode = (state.themeMode + 1) % 3;
            localStorage.setItem("themeMode", state.themeMode);
        },
        setThemeMode(state, themeMode) {
            state.themeMode = themeMode;
            localStorage.setItem("themeMode", themeMode);
        },
        setIsDarkTheme(state, isDarkTheme) {
            state.isDarkTheme = isDarkTheme
        }
    }
}