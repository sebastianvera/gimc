var app = app || {};

(function(){
  'use strict';

  app.ImageClassView = Backbone.View.extend({
      tagName: 'div',
      className: 'class',
      template: _.template($('#template-image-class').html()),
      initialize: function () {
        // this.model.on('change:active', this.render, this);
        this.model.on('change:images', this.updateSize, this);
        this.model.on('change:active', this.updateActive, this);
        this.model.on('hide', this.remove, this);
      },
      updateActive: function () {
        if (this.model.get('active')) {
          this.$el.addClass("active");
        } else {
          this.$el.removeClass("active");
        }
      },
      updateSize: function () {
        console.log("Update size: "+this.model.imageSize());
        if (this.model.imageSize() > 0) {
          this.$('span').html("Class "+this.model.get('name')+" - total: "+
                              this.model.imageSize());
        }
      },
      render: function () {
        console.log("Rendered class view "+this.model.get('name'));
        console.log("Images class "+this.model.get('name')+": "+this.model.get('images').length);
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
      this.collection.on('remove', this.remove, this)
      this.collection.on('highlight', this.highlight, this);
    },
    remove: function (model) {
      this.collection.remove(model);
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
        console.log("enabled");
        $('#save-button').removeClass('disabled');
      } else {
        console.log("disabled");
        $('#save-button').addClass('disabled');
      }
    },
    highlight: function (c) {
      console.log("hightlight "+c.get('name'));
      this.collection.deactivateCollection(c);
    },
    render: function() {
      // this.$el.empty();
      // this.addAll();
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
