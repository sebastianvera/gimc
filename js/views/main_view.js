var app = app || {};

(function () {
  'use strict';

  var query = new app.Query();
  app.MainView = Backbone.View.extend({
    el: '#app',
    render: function() {
      // Set query view
      var query = new app.Query();
      var queryView = new app.QueryView({model: query});
      this.$query = queryView;
      this.$el.append(queryView.render().el);
      this.$classes = this.$('#image-classes')


      // Set events
      this.$query.on('startLoading', this.startLoading);
      this.$query.on('stopLoading', this.stopLoading);
      this.$query.on('newQuery', this.newQuery, this);
    },
    newQuery: function (images) {
      console.log("Loading Query");
      this.index = 0;
      this.images = images;
      this.$classes.empty();
      this.imageClasses = new app.ImageClassList();
      this.imageClassesView = new app.ImageClassListView({collection: this.imageClasses});

      app.caca = this.imageClassesView;
      var image = new app.Image(images[0]);
      this.renderImage(image);

      // Preload images
      this.preloadImages(images);
    },
    pressed: function(number){
      if (!this.images) return true;
      if (this.images.length < 1) return true;
      this.imageClassesView.classify(number.toString(), this.images[this.index]);
    },
    preloadImages: function (images) {
      var template = _.template($('#template-current-image').html());
      $('#preload').html('');
      _.each(images, function(image){
        var html = template(image);
        $('#preload').append(html);
      });
    },
    renderImage: function (image) {
      var imageView = new app.ImageView({model: image});
      this.$imageView = imageView;

      this.updateCounter();
      this.$imageView.render();
    },
    updateCounter: function(){
      $('#image-counter').html(this.index + 1 + " / " + this.images.length);
    },
    nextImage: function () {
      if (!this.images) return true;

      if (this.images.length > this.index + 1) {
        var image = new app.Image(this.images[++this.index]);
        this.renderImage(image);
      } else {
        console.log("No more images!");
      }
    },
    prevImage: function () {
      if (this.index > 0) {
        var image = new app.Image(this.images[--this.index]);
        this.renderImage(image);
      } else {
        console.log("This is the first image");
      }
    },
    startLoading: function () {
      var loadingHtml = '<div class="loader"></div>';
      this.$('#query').after(loadingHtml);
      this.$('#image-preview').hide();
      this.$('#image-classes').empty();
    },
    stopLoading: function () {
      this.$('.loader').remove();
      this.$('#image-preview').show();
    }
  });
}());
