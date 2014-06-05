var app = app || {};
var fs = require('fs-extra');

(function(){
  'use strict';

  app.Query = Backbone.Model.extend({
      defaults: {
        query: 'coca cola lat',
        placeholder: 'Coca Cola lata'
      },
      initialize: function () {
        this.on('change:query', this.initializeOrCreateFolder);
      },
      initializeOrCreateFolder: function () {
        if (this.get('query') != '') {
          fs.ensureDirSync(this.getDirectory());
          this.trigger('execQuery');
        }
      },
      deleteOldFolder: function (query) {
        if (query && query != '') {
          console.log("Delete old folder "+query);
        }
      },
      getDirectory: function () {
        return "classes/"+this.get('query').split(" ").join("_");
      }
    });
})();
