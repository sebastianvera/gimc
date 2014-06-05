var app = app || {};

(function(){

  app.ImageClass = Backbone.Model.extend({
    defaults: {
      images: [],
      active: true,
      unique_name: '',
      url: ''
    },
    addImage: function (image) {
      this.set({active: true});
      var imageExists = _.any(this.get('images'), function(i){
        return i.unique_name == image.unique_name;
      });

      if (imageExists) {
        console.log("The image already exists in Class "+this.get('name'));
      } else {
        console.log("Adding image to Class "+this.get('name'));
        this.set({'images': this.get('images').concat(image)});
      }
      this.trigger("highlight", this);
    },
    remove: function() {
      this.trigger('remove');
    },
    getFirstImage: function() {
      return _.first(this.get('images'));
    },
    imageSize: function() {
      return this.get('images').length;
    }
  });

  app.ImageClassList = Backbone.Collection.extend({
    model: app.ImageClass,
    initialize: function(){
      this.on('add', this.deactivateCollection, this);
    },
    classify: function (className, image) {
      this.unclassifyExisting(className, image);

      var imageClass = this.find(function(c){ return c.get('name') == className });
      if (imageClass) {
      } else {
        imageClass = new app.ImageClass(image);
        imageClass.set({name: className});
        this.push(imageClass);
      }
      imageClass.addImage(image);
    },
    have: function (unique_name) {
    },
    unclassifyExisting: function (className, image) {
      var classes = this.filter(function(c){
        return c.get('name') != className;
      });

      _.each(classes, function(c){
        var hasImage = _.find(c.get('images'), function (img) {
          return img.unique_name == image.unique_name;
        });
        if (hasImage) {
          var classImages = c.get('images');
          var filteredImages = _.without(classImages,
            _.findWhere(classImages, {unique_name: image.unique_name}))
          c.set({images: filteredImages});
        }
      });
    },
    deactivateCollection: function(newModel) {
      this.forEach(function (model) {
        if (model.cid != newModel.cid && model.get('active')) {
          model.set({active: false})
        }
      });
    }
  });
})();
