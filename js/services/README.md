# Google Image Service

This code is based on another implamentation of google image api, for more details go to [link](https://github.com/vdemedes/node-google-images)

This module extract multiples pages of google search api, this tasks are syncronous.

# Usage
<p>Example of module google-image</p>

<pre><code>
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
</code></pre>

### Object params

1. 'keyword': query to search in google.
2. 'pages': number of pages to looking for. If pages is not given the module assume one page to search

### Response
<pre><code>[{
  width: 'width of the image',
  height: 'height of the image',
  url: 'resourse url',
  name: 'name of the file'
}]
</code></pre>

### Upcoming

* writeImage(): Method to download the resourse (image) and write into local drive.