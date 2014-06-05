var app = app || {};

(function(){
  'use strict';

  app.ImageClassView = Backbone.View.extend({
      tagName: 'div',
      className: 'class',
      template: _.template($('#template-image-class').html()),
      initialize: function () {
        this.model.on('change', this.render, this);
      },
      render: function () {
        if (this.model.get('images').length < 1) {
          this.$el.remove();
          return this;
        }
        var html = this.template({model: this.model});
        if (this.model.get('active')) {
          this.$el.addClass("active");
          this.$el.html(html).hide().fadeIn();
          this.$el.css('display','inline-block');
        } else {
          this.$el.html(html);
          this.$el.removeClass("active");
        }
        return this;
      }
    });

  app.ImageClassListView = Backbone.View.extend({
    el: '#image-classes',
    imageClassTemplate: _.template($('#template-image-class').html()),
    initialize: function() {
      this.collection.on('add', this.addOne, this);
      this.collection.on('add', this.checkSaveButton, this);
      this.collection.on('reset', this.addAll, this);
      this.collection.on('reset', this.checkSaveButton, this);
      this.collection.on('remove', this.render, this);
      this.collection.on('change', this.render, this);
      this.collection.on('highlight', this.highlight, this);
    },
    comparator: function (a1, a2) {
      return parseInt(a1.get('name')) < parseInt(a2.get('name'));
    },
    addOne: function(newModel) {
      var imageClassView = new app.ImageClassView({model: newModel});
      this.$el.append(imageClassView.render().el);
    },
    addAll: function() {
      this.collection.forEach(this.addOne, this);
    },
    checkSaveButton: function () {
      if (this.collection.length > 0) {
        $('#save-button').removeClass('disabled');
      } else {
        $('#save-button').addClass('disabled');
      }
    },
    highlight: function (c) {
      this.collection.deactivateCollection(c);
      this.render();
    },
    render: function() {
      this.$el.empty();
      this.addAll();
    },
    reset: function() {
      this.$el.empty();
      this.collection = [];
    },
    classify: function(className, image) {
      this.collection.classify(className, image);
    },
    save: function() {
      if (this.collection.length > 0) {
      console.log("Save images with their respectiva classes");
      } else {
        console.log("No images to save");
      }
    }
  });
}());
