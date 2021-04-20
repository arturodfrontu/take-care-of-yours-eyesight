'use strict';

const path = require('path');
const { app, BrowserWindow } = require('electron');

const main = () => {

  let mainWindow = new BrowserWindow({
    frame: false,
    webPreferences: {
      nodeIntegration: true
    },
    width: 660,
    height: 650,
  })

  mainWindow.loadFile(path.join('app', 'index.html'));
}

app.on('ready', main);

app.on('window-all-closed', function () {
  app.quit();
});