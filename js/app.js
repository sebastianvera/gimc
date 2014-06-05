var app = app || {};

var gui = require('nw.gui');

// Get the current window
var win = gui.Window.get();
$(function () {
  'use strict';
  Mousetrap.bind('f12', function () {
    win.showDevTools();
  });
  app.appView = new app.MainView();
  app.appView.render();
  Mousetrap.bind('right', function(){
    app.appView.nextImage();
  });
  Mousetrap.bind('left', function () {
    app.appView.prevImage();
  });
  Mousetrap.bind('command+r', function(){
    win.reload();
  });
  // Get abecedary
  Mousetrap.bind("1", function(){
    app.appView.pressed("1");
  });
  Mousetrap.bind("2", function(){
    app.appView.pressed("2");
  });
  Mousetrap.bind("3", function(){
    app.appView.pressed("3");
  });
  Mousetrap.bind("4", function(){
    app.appView.pressed("4");
  });
  Mousetrap.bind("5", function(){
    app.appView.pressed("5");
  });
  Mousetrap.bind("6", function(){
    app.appView.pressed("6");
  });
  Mousetrap.bind("7", function(){
    app.appView.pressed("7");
  });
  Mousetrap.bind("8", function(){
    app.appView.pressed("8");
  });
  Mousetrap.bind("9", function(){
    app.appView.pressed("9");
  });
});
