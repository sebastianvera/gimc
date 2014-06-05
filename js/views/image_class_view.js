var app = app || {};

(function(){
  'use strict';

  app.ImageClassView = Backbone.View.extend({
      tagName: 'div',
      className: 'class',
      template: _.template($('#template-image-class').html()),
      initialize: function () {
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
        if (this.model.imageSize() > 0) {
          this.$('span').html("Class "+this.model.get('name')+" - total: "+
                              this.model.imageSize());
        }
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
      this.collection.on('remove', this.remove, this)
      this.collection.on('highlight', this.highlight, this);
      this.collection.on('enableButton', this.enableButton, this);
      this.$el.append($('#template-save-button').html());
    },
    events: {
      'click #save-button': 'save'
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
        this.enableButton();
      } else {
        this.disableButton();
      }
    },
    highlightByName: function (unique_name) {
      if (this.collection.length < 1) return true;

      var model = this.collection.findByName(unique_name);
      if (model) {
        this.collection.activateOnly(model);
      } else {
        this.collection.deactivateAll();
      }
    },
    enableButton: function () {
      $('#save-button').removeClass('disabled');
    },
    disableButton: function(){
      $('#save-button').addClass('disabled');
    },
    blurButton: function () {
      $('#save-button').blur();
    },
    highlight: function (c) {
      console.log("hightlight "+c.get('name'));
      this.collection.deactivateCollection(c);
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
        this.blurButton();
        this.disableButton();
        this.collection.save();
      } else {
        console.log("No images to save");
      }
    },
    close: function () {
      this.undelegateEvents();  
    },
  });
}());
