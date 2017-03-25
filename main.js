'use strict';

const {app, BrowserWindow, ipcMain} = require('electron');
const electron = require('electron');
const fs = require('fs');
const path = require('path');
const credentials = require('./src/config/credentials.json');
const Twitter = require('twitter')
const io = require('socket.io-client')('http://localhost:3000');

app.on('ready', () => {
  let displays = electron.screen.getAllDisplays()
  let externalDisplay = displays.find((display) => {
    return display.bounds.x !== 0 || display.bounds.y !== 0
  })

  if (externalDisplay) {
    var mainWindow = new BrowserWindow({
      "x": externalDisplay.bounds.x + 50,
      "y": externalDisplay.bounds.y + 50,
      "frame"       : false,
      "alwaysOnTop" : true,
      "transparent" : true
    })
  } else {
     var mainWindow = new BrowserWindow({
      "frame"       : false,
      "alwaysOnTop" : true,
      "transparent" : true
    });
  }

  mainWindow.top = 0;
  mainWindow.left = 0;
  mainWindow.setIgnoreMouseEvents(true);
  mainWindow.maximize();
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  var client = new Twitter(credentials);
  var stream = client.stream('statuses/filter', {
    "track": "kosenconf" // Fix me
  });
  stream.on('data', (function(_this) {
    return function(event) {
      var data = {
        "message": event.text.replace('#kosenconf', ''),
        "name": event.user.name,
        "icon_url": event.user.profile_image_url
      }
      console.log(data);
      io.emit('stream/tweet', data);
    };
  })(this));

  mainWindow.on('close', () => {
  })

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});
