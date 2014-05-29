var app = app || {};
// var fs = require('fs');

(function () {
  'use strict';

  app.MainView = Backbone.View.extend({
    el: '#app',
    initialize: function () {
      this.$query = this.$('#query');
      this.$query.val('');
    },
    render: function() {
      console.log(this.$el);
      console.log("obj");
    }
  });
})();
