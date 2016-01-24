/**
 * Created by Crystian on 10/19/2014.
 */

var utils       = require('../shared/utils'),
    injector    = require('./_injector'),
    gif         = require('gulp-if'),
    rename      = require('gulp-rename'),
    replace     = require('gulp-replace'),
    htmlreplace = require('gulp-html-replace'),
    htmlmin     = require('gulp-htmlmin'),
    header      = require('gulp-header'),
    footer      = require('gulp-footer'),
    gutil       = require('gulp-util');

gulp.task('_buildLoader', ['_buildJs', '_buildCss', '_makeBase'], function(){

  var htmlminOptions = {
    removeComments: true,
    collapseWhitespace: true,
    removeRedundantAttributes: true,
    collapseBooleanAttributes: true,
    removeOptionalTags: false
  };

  var stream = gulp.src(global.cfg.pathFwk + global.cfg.loader.folders.www + global.cfg.loader.files.index)
    .pipe(utils.debugme())
    .pipe(htmlreplace())
    .pipe(injector.injectContent(global.cfg.pathPrjBuild + global.cfg.app.folders.temp + '-compiledLoader.css', 'loaderCss', 'style'))
    .pipe(injector.injectContent(global.cfg.pathPrjBuild + global.cfg.app.folders.temp + '-compiledLoader.js', 'loaderJs', 'script'))
    .pipe(gif(global.cfg.loader.release, htmlmin(htmlminOptions)))

    //header and footers:
    .pipe(gif(global.cfg.loader.release, header(global.cfg.loader.text.header.join('\n'), {
      date: gutil.date('mmm d, yyyy h:MM:ss TT Z'),
      name: global.cfg.app.name,
      version: global.cfg.app.version,
      site: global.cfg.app.site
    })))
    .pipe(gif(global.cfg.loader.release, footer(global.cfg.loader.text.footer.join('\n'))))

    .pipe(gulp.dest(global.cfg.pathPrjBuild));

  if(global.cfg.cordova.active){
    /*
     This is ok, because it make another file equals to index but one change,
     I prefer it than run again all process to make other file
     */
    stream = stream.pipe(rename(global.cfg.cordova.files.index))
      .pipe(utils.debugme())
      .pipe(gif(global.cfg.loader.release,
        replace(',cordova:{isDevice:!1,', ',cordova:{isDevice:1,'),
        replace('"isDevice": false,', '"isDevice": true,')
      ))
      .pipe(gulp.dest(global.cfg.pathPrjBuild));
  }

  return stream;
});
