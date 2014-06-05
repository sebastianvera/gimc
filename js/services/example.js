var client = require('./google-image');

var params = {
  'keyword': 'heineken logo lata',
  'pages': 3
};

client.search(params, function (err, images) {
  if (err) {
    console.log(err);
    return;
  }
  console.log(images);
  console.log(images.length);
  console.log(images[0]);
  client.writeImage("classes/"+images[0].unique_name, images[0].url, function(){
    console.log("Todo la raja");
  });
});
