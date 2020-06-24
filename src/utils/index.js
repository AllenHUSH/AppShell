const electron = process.env.IS_ELECTRON ? window.require("electron") : null;

export default {
    openUrl(url) {
        process.env.IS_ELECTRON ? electron.shell.openExternal(url) : window.open(url);
    }
}