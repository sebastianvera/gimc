# Google Image Service

This code is based on another implementation of google image api,
 for more details go to [link](https://github.com/vdemedes/node-google-images)

# Usage

<p>Example of module google-image</p>

```js
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
```

### Object params

1. 'keyword': Google's image query.
2. 'pages': Number of pages to look for. If page's value is not given, the value will be set to 1.

### Response
```js
[{
  width: "image's width",
  height: "image's height",
  url: 'resource url',
  name: "file's name"
}]
```

### Upcoming

* writeImage(): Method to download the resource (image) and write into local drive.
