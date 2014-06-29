var fs = require('fs-extra');
var path = './classes2/sprite_botella/1/';
var new_path = './classes/';
var images = fs.readdirSync(path);
var colors = require ('colors')
var _ = require('lodash');
var counter = fs.readdirSync('./classes/');
var name = "2014_000";

colors.setTheme({
  verbose: 'cyan',
  debug: 'blue',
  info: 'green',
  data: 'grey',
  error: 'red'
});

images = _.filter(images, function(image){
  return image.indexOf('.DS_S') < 0;
});

counter = _.filter(counter, function(c) {
    return c.match(/.*\.jpg$/);
});
counter = parseInt(_.last(counter).match(/2014_(\d+)/)[1]) + 1;


console.log("Current image counter: ".debug + counter.toString().info);

_.each(images, function (image) {
    var temp_name = '';
    if (counter == 100) {
        temp_name = name + counter;
    } else if (counter >= 10){
        temp_name = name + "0" + counter;
    } else {
        temp_name = name + "00" + counter;
    }
    counter++;
    var current_image = path+image;
    var destination_image = new_path+temp_name+".jpg";
    console.log("Move ".info+current_image.debug+" to ".info+destination_image.verbose);
    fs.renameSync(current_image, destination_image);
});
