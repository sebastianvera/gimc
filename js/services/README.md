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