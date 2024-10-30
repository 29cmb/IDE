const { default: axios } = require('axios');
const { app, BrowserWindow } = require('electron/main');
const fs = require("fs");

module.exports = {
    window: null,
    initialize: function() {
        console.log("⚛️  | Starting Electron...");
        app.on("ready", () => {
            console.log("🚀 | Electron is ready!");
            this.window = new BrowserWindow({
                width: 1920,
                height: 1080,
                webPreferences: {
                    nodeIntegration: true
                },
                autoHideMenuBar: true
            });

            if (!fs.existsSync("../client/build")) {
                console.log("🔥 | The build directory could not be found! Checking for a react dev server...");
                axios.get("http://localhost:3000").then(() => {
                    console.log("⚛️  | React dev server found! Loading...");
                    this.window.loadURL("http://localhost:3000");
                }).catch(() => {
                    console.log("🔥 | Could not find a React dev server or build directory!");
                    app.quit();
                    this.window.close();
                });
            } else {
                console.log("⚛️  | Build directory found! Loading...");
                this.window.loadFile("../client/build/index.html");
            }

            this.window.on("closed", () => {
                app.quit();
            });
        });
    },
    app
};