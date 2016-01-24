/**
 * Created by Crystian on 02/12/2015.
 */

(function(){
  'use strict';

  var utils      = require('../../shared/utils'),
      htmlmin    = require('gulp-htmlmin'),
      jade       = require('gulp-jade'),
      strip      = require('gulp-strip-comments'),
      removeCode = require('gulp-remove-code'),
      rename     = require('gulp-rename'),
      core       = require('./core');

  var extensionFinal = 'html';

  function runPreprocessors(file, config, appName, pth){
    return core.doMagic(file, config, appName, pth, {
      extensionFinal: extensionFinal,
      validPreproExtension: core.defaults.validHtmlPreproExtensions,
      preprocessFile: preprocessFile,
      removeCode: function(stream){
        return stream.pipe(removeCode({production: global.cfg.app.release}));
      },
      minifyFile: function(stream){
        var htmlminOptions = {
          collapseWhitespace: true,
          removeComments: true,
          removeRedundantAttributes: true
        };
        return stream
          .pipe(strip.html({safe: false, block: false}))
          .pipe(htmlmin(htmlminOptions));
      }
    });
  }

  function preprocessFile(stream, config, fileName, type){
    //TODO add config option for each type
    switch (type){
      case 'jade':
        stream = stream.pipe(jade({
          pretty: true
        }));
        break;
    }

    return stream.pipe(rename(fileName + '.' + extensionFinal));
  }

  exports.runPreprocessors = runPreprocessors;
}());
