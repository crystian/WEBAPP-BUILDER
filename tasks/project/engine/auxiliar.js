/**
 * Created by Crystian on 3/27/2015.
 */

var utils   = require('../../shared/utils'),
    replace = require('gulp-replace');

exports.isNotActive = function(file){
  //eval, yes, with pleasure! :)
  return (!eval(file.active));
};

exports.replace = function(stream, replaces){
  var i = 0,
      l = replaces.length;

  for(; i < l; i++){
    var replacePair = replaces[i];

    if(!replacePair || !(replacePair instanceof Array) || replacePair.length !== 2){
      console.logRed('Replace pair not correct format, check it, it should be two items: 0 = value searched, 1 = replace, elements found: ' + replacePair.length);
      utils.exit(-1);
      return;
    }

    //console.log('key: "'+ replacePair[0] +'" value: "'+ replacePair[1] +'"');

    var search = replacePair[0]; //string by default

    if(search[0] === '/'){ //regular expresion
      var parts = search.match(/\/(.*)\/(.*)?/);
      search = new RegExp(parts[1], parts[2] || '');
    }

    stream = stream.pipe(replace(search, replacePair[1]));
  }

  return stream;
};
