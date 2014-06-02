var app = app || {};

(function(){
  'use strict';

  app.ImageView = Backbone.View.extend({
      el: '#image-preview',
      template: _.template($('#template-current-image').html()),
      render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
      }
    });
}());
