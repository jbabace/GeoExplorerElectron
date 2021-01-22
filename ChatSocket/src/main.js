const { BrowserWindow } = require("electron");
const path = require('path')


require('electron-reload')(__dirname, {
  electron: path.join(__dirname, 'node_modules', '.bin', 'electron.cmd')
})

function createWindow() {
  const win = new BrowserWindow({
    width: 2000,
    height: 1400,
    webPreferences: {
      nodeIntegration: true
    }
  });
  win.maximize();

  win.loadFile("src/index.html");
}

module.exports = { createWindow };

