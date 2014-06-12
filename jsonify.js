// var gm = require('gm'),
//     fs = require('fs-extra'),
//     _ = require('lodash'),
//     jf = require('jsonfile'),
//     path = './classes';
//
// var imagePath = function (img) {
//   return path+"/"+img;
// }
//
// var images = fs.readdirSync(path);
//
// images = _.filter(images, function(image){
//   return image.match(/\.jpg/);
// });
//
// var jsonTemplate = {
//   "folder": "VOC2014",
//   "filename": undefined,
//   "source": {
//     "dataset": "Patrones Database",
//     "annotation": "2014",
//     "image": "google-image"
//   },
//   "size": {
//     "width": undefined,
//     "height": undefined,
//     "depth": undefined
//   },
//   "segmented": 0,
//   "object": [{
//       "name": "bottle",
//       "pose": "Unspecified",
//       "truncated": 0,
//       "difficult": 0,
//       "bndbox": {
//         "xmin": undefined,
//         "ymin": undefined,
//         "xmax": undefined,
//         "ymax": undefined
//       }
//     }]
// }
//
// _.each(images, function (image) {
//   gm(imagePath(image)).identify(function (err, info) {
//     if (err)
//       console.log("There was an error with "+image, err);
//     else {
//       var json = _.extend({}, jsonTemplate);
//       var size = info.size;
//       var depth = info.depth;
//       var jsonPath = info.path.replace('.jpg', '.json');
//
//       json.size = size;
//       json.size.depth = depth;
//       json.filename = image;
//       jf.writeFile(jsonPath, json, function (err) {
//         if (err) {
//           console.log("Error when saving "+image+" :C ");
//         }
//       });
//     }
//   });
// })
