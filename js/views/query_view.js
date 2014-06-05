var app = app || {};
var client = require('./js/services/google-image');

(function(){
  'use strict';

  app.QueryView = Backbone.View.extend({

      template: _.template($('#template-query').html()),

      events: {
        'keydown input#query': 'keyDown'
      },

      initialize: function () {
        this.model.on('execQuery', this.execQuery, this);
      },

      execQuery: function() {
        var query = this.inputValue();
        console.log("Executing query: "+query);
        this.trigger('startLoading');
        var params = {
          keyword: this.inputValue(),
          pages: 5
        }
        var _this = this;
        client.search(params, function (err, images) {
          if (err) {
            console.log(err);
            _this.trigger('stopLoading');
          } else {
            _this.trigger('stopLoading');
            var unique_images = _.unique(images, function(i){
              return i.unique_name;
            });
            _this.trigger('newQuery', unique_images);
            _this.$('#query').blur();
          }
        });
      },

      keyDown: function (e) {
        if (e.which === 13) {
          var cleanQuery = this.inputValue();
          this.model.set({query: cleanQuery});
        }
      },

      inputValue: function() {
        return this.$('#query').val().trim().replace(/\s+/g, ' ');;
      },

      render: function () {
        var html = this.template(this.model.toJSON());
        this.$el.html(html);
        return this;
      }
    });
}());
