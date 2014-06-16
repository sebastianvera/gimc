var jx = require('js2xmlparser'),
    fs = require('fs-extra'),
    jf = require('jsonfile'),
    _ = require('lodash'),
    colors = require('colors');

colors.setTheme({
  verbose: 'cyan',
  debug: 'blue',
  info: 'green',
  data: 'grey',
  error: 'red'
});

var path = './classes';
var jsonPath = function(file) {
  return path+"/"+file
}
var xmlPath = function (json) {
  var xmlFile = json.replace('.json', '.xml')
  return path+"/"+xmlFile;
}

var jsons = fs.readdirSync(path);
jsons = _.filter(jsons, function(json){
  return json.match(/\.json/);
});

// use just first 20
jsons = _.first(jsons, 20);

// set xml options
var xml_options = {
  declaration: {
    include: false
  }
}

_.each(jsons, function (fileName) {
  var json = jf.readFileSync(jsonPath(fileName));
  if (fs.existsSync(xmlPath(fileName))) {
      console.log("Updating XML".info, "from".data, fileName.verbose);
  }
  else{
      console.log("Creating XML".info, "from".data, fileName.verbose);
  }
  var xml = jx("annotation", json, xml_options);
  fs.writeFileSync(xmlPath(fileName), xml);
});
