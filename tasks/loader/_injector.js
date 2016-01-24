/**
 * Created by Crystian on 06/11/2015.
 */
(function(){
  'use strict';

  var inject = require('gulp-inject');

  exports.injectContent = function(filePath, name, tagHtm){
    return inject(gulp.src([filePath]), {
      starttag: '<!-- inject:' + name + ' -->',
      removeTags: true,
      transform: function(filePath, file){
        var r = file.contents.toString('utf8');
        if(tagHtm){
          r = '<' + tagHtm + '>' + r + '</' + tagHtm + '>';
        }
        return r;
      }
    });
  };

}());