var app = app || {};

var gui = require('nw.gui');

// Get the current window
var win = gui.Window.get();
$(function () {
  'use strict';
  Mousetrap.bind('f12', function () {
    win.showDevTools();
  });
  var query = new app.Query();
  var appView = new app.MainView();
  appView.render();
  Mousetrap.bind('right', function(){
    console.log("next image");
    appView.nextImage();
  });
  Mousetrap.bind('left', function () {
    appView.prevImage();
  });
  Mousetrap.bind('enter', function(){
    console.log("enter");
  });
  Mousetrap.bind('backspace', function(){
    console.log("backspace");
  });
  Mousetrap.bind('command+r', function(){
    win.reload();
  });
});
