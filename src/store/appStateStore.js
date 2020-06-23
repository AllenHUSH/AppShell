export default {
    state: {
        platform: "unknown",
        isMaximized: false,
    },
    mutations: {
        setPlatform(state, platform) {
            state.platform = platform;
        },
        setIsMaximized(state, isMaximized) {
            state.isMaximized = isMaximized;
        }
    }
}