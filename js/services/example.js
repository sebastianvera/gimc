var client = require('./google-image');

var params = {
  'keyword': 'heineken logo lata',
  'pages': 2
};

client.search(params, function (err, images) {
  if (err) {
    console.log(err);
    return;
  }
  console.log(images);
});