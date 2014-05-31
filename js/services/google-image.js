var _ = require('underscore');
var request = require('request');

var API_URL = 'http://ajax.googleapis.com/ajax/services/search/images?v=1.0&q=' +
              '{{query}}&start={{page}}';

module.exports = {
  search: function (params, callback) {
    var query, pages;
    if (typeof params === 'object') {
      if (Object.keys(params).length === 0) {
        var error = 'Object is empty, read README for more information.';
        return callback(error, null);
      }
       query = params['keyword'];
    }
    if (typeof params === 'string') {
      var error = 'Params must be object, read README for more information.';
      return callback(error, null);
    }
    if (!params.pages) pages = 0;
    else pages =  params.pages;

    var i, images, URLS, url;
    images = [];
    URLS = [];
    for(i = 0; i < pages; i++) {
      url = API_URL.replace('{{query}}', query.replace(/\s/g, '+')).replace('{{page}}', i);
      URLS.push(url);
    }
    var syncRequest = function () {
      var url = URLS.shift();
      request.get(url, processResponse);
    };
    var processResponse = function (err, res, body) {
      if (err) return callback(err, null);
      var item, items, j, len;

      items = JSON.parse(body).responseData.results;

      for (j = 0, len = items.length; j < len; j++) {
        item = items[j];
        images.push({
          width: item.width,
          height: item.height,
          url:  item.url,
          name: _.last(item.url.split('/'))
        });
      }
      pages--;
      if (pages === 0) {
        return callback(null, images);
      } else {
        return syncRequest();
      }
    };
    return syncRequest();
  }
};
