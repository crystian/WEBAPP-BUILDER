/**
 * Created by Crystian on 01/12/2015.
 */

var core = require('./core'),
    www  = require('./www'),
    js   = require('./javascript'),
    html = require('./html'),
    css  = require('./css');

exports.makeWwwJson = function(){
  return core.getFilesByGroupAndApps(www.makeWwwJson, www.resolveFiles);
};

exports.makeAppsJson = function(){
  return core.makeAppsJson();
};

exports.css = function(){
  return core.getFilesByGroupAndAppsStream(null, css.runPreprocessors, 'css');
};

exports.js = function(){
  return core.getFilesByGroupAndAppsStream(null, js.runPreprocessors, 'js');
};

exports.html = function(){
  return core.getFilesByGroupAndAppsStream(null, html.runPreprocessors, 'html');
};

exports.genAppCache = function(){
  return core.genAppCache();
};
