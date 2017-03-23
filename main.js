'use strict';

const {app, BrowserWindow, ipcMain} = require('electron');
const electron = require('electron');
const fs = require('fs');
const path = require('path');
const credentials = require('./src/config/credentials.json');
const Twitter = require('twitter')
const io = require('socket.io-client')('http://localhost:3000');

app.on('ready', () => {
  let mainWindow = new BrowserWindow({
    "frame"       : false,
    "alwaysOnTop" : true,
    "transparent" : true
  });

  mainWindow.top = 0;
  mainWindow.left = 0;
  mainWindow.setIgnoreMouseEvents(true);
  mainWindow.maximize();
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  var client = new Twitter(credentials);
  var stream = client.stream('statuses/filter', {
    "track": "perfume" // Fix me
  });
  stream.on('data', (function(_this) {
    return function(event) {
      var data = {
        "message": event.text,
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
