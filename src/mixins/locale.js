export default {
    data() {
        return {
            languageList: [
                { label: "中文", value: "zh" },
                { label: "English", value: "en" }
            ]
        }
    },
    created() {
        this.$i18n.locale = localStorage.getItem('lang')
    },
    methods: {
        setLocale(lang) {
            this.$i18n.locale = lang
            localStorage.setItem('lang', lang)
        }
    }
}