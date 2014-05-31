# Google Image Service

This code is based on another implamentation of google image api, for more details go to [link](https://github.com/vdemedes/node-google-images)
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

1. 'keyword': query to seach in google.
2. 'pages': number of pages to looking for. If pages is not given the module assume one page to search