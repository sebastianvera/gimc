var app = app || {};

(function(){
  'use strict';

  app.ImageClassView = Backbone.View.extend({
      template: _.template($('#template-image-class').html()),
      render: function () {
        var html = this.template(this.model.toJSON());
        this.$el.html(html);
        return this;
      }
    });
}());
