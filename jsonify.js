var gm  = require('gm'),
    fs = require('fs-extra'),
     _ = require('lodash'),
    jf  = require('jsonfile'),
    path = "./classes",
    colors = require('colors');

colors.setTheme({
  verbose: 'cyan',
  debug: 'blue',
  info: 'green',
  data: 'grey',
  error: 'red'
});

var imagePath = function (img) {
    return path+"/"+img;
}

var images = fs.readdirSync(path);

images = _.filter(images, function(image){
    return image.match(/\.jpg/);
});

var jsonTemplate = {
    "folder"   : "VOC2014",
    "filename" : undefined,
    "source"   : {
        "dataset"    : "Patrones Dataset",
        "annotation" : "2014",
        "image"      : "google-image"
    },
    "size": {
        "width"  : undefined,
        "height" : undefined,
        "depth"  : undefined
    },
    "segmented" : 0,
    "object"    : [{
        "name"      : "bottle",
        "pose"      : "Unspecified",
        "truncated" : 0,
        "difficult" : 0,
        "bndbox"    : {
            "xmin"  : undefined,
            "ymin"  : undefined,
            "xmax"  : undefined,
            "ymax"  : undefined
        }
    }]
}

var chunksize = 50;
(function loop(i){
    var image = images[i];
    gm(imagePath(image)).identify(function (err, info) {
        if (err)
            console.log("There was an error with ".error+image.error, err);
        else {
            var size = info.size;
            var old_size = size;
            var depth = info.depth;
            var jsonPath = info.path.replace('.jpg', '.json');

            var saveOrUpdateJSON = function(image, size, depth) {
                var jsonExists = fs.existsSync(jsonPath);
                if(jsonExists) {
                    var json = jf.readFileSync(jsonPath);
                }else{
                    console.log("Create JSON".info, image.data);
                    var json = _.extend({}, jsonTemplate);
                }
                gm(imagePath(image)).identify(function(err, current) {
                    if (err) {
                        console.log("Error getting image size for ".error+image.error);
                        return;
                    }
                    var sameWidth = json.size.width == current.size.width &&
                        json.size.height == current.size.height;
                    if (!_.isEqual(size, current.size) || depth != current.depth || !sameWidth) {
                        json.size = _.extend({}, current.size);
                        json.size.depth = current.depth;
                        json.filename = image;

                        jf.writeFile(jsonPath, json, function (err) {
                            if (err) {
                                console.log("Error when saving ".error+image.error+" :C ".error);
                            }
                            if (jsonExists) {
                                console.log("Update JSON".info, image.data);
                            }
                            else{
                                console.log("JSON Created".info, image.data);
                            }
                        });
                    }
                });
            };

           var resize = function(image, callback, size) {
               // Resize
               if (size.width < 500 && size.height < 500){
                   console.log("The dimensions are below 500px, so can't resize".debug, image.info);
               } else if (size.width > size.height) { //Resize by width
                   console.log("Resize".verbose, image.data);
                   gm(imagePath(image)).resize(500, null).write(imagePath(image), function(err) {
                       if (err) {
                           console.log("There was an error resizing the image ".error+image.error);
                           return;
                       }
                       callback(image);
                   });
               }else{ // Resize by height
                   console.log("Resize".verbose, image.data);
                    gm(imagePath(image)).resize(null, 500).write(imagePath(image), function(err) {
                        if (err) {
                            console.log("There was an error resizing the image ".error+image.error);
                            return;
                        }
                        callback(image);
                    });
                }
           }

           // Image Logic
           if (size.width === 500 || size.height === 500) {
               saveOrUpdateJSON(image, size, depth);
           }
           else{
               resize(image, saveOrUpdateJSON, size);
           }
           i++;
           if(i == images.length) return; // we're done.
             if(i%chunksize == 0){
             setTimeout(function(){ loop(i); }, 50);
           } else {
             loop(i);
           }
        }
    });
})(0);
