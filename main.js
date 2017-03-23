'use strict';

const {app, BrowserWindow, ipcMain} = require('electron');
const electron = require('electron');
const fs = require('fs');
const path = require('path');
const nicoJS = require('nicojs');

app.on('ready', () => {
  let mainWindow = new BrowserWindow({
    "frame"       : false,
    "alwaysOnTop" : true,
    "transparent" : true
  });

  var size = electron.screen.getPrimaryDisplay().size;
  mainWindow.width = size.width;
  mainWindow.height = size.height;
  mainWindow.top = 0;
  mainWindow.left = 0;
  mainWindow.setIgnoreMouseEvents(true);
  mainWindow.maximize();
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  mainWindow.on('close', () => {
  })

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  function getConfig() {
    let config;

    try {
      const file = fs.readFileSync(config_path);
      config = JSON.parse(file);
    } catch(e) {
      config = {notificationMode: 'never'};
    }

    return config;
  }
});
