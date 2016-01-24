/**
 * Created by Crystian on 06/11/2015.
 */

(function(){
  'use strict';

  var utils        = require('../shared/utils'),
      del          = require('del'),
      autoprefixer = require('gulp-autoprefixer'),
      replace      = require('gulp-replace'),
      csslint      = require('gulp-csslint'),
      gutil        = require('gulp-util'),
      strip        = require('gulp-strip-comments'),
      gif          = require('gulp-if'),
      cssnano      = require('gulp-cssnano'),
      concat       = require('gulp-concat'),
      StreamQueue  = require('streamqueue'),
      sass         = require('gulp-sass');

  gulp.task('_buildCss', ['_makeCss', '_removeBuild'], function(){
    var cssLoader = [
      global.cfg.pathFwk + global.cfg.loader.folders.www + 'css/loader.css',
      global.cfg.pathFwk + global.cfg.loader.folders.loadings + global.cfg.loader.loading + '/loading.css'
    ];

    return StreamQueue(
      {objectMode: true},
      gulp.src(cssLoader)
        .pipe(utils.debugme())
        .pipe(strip.text({safe: false, block: false})) //remove comments
    )
      .pipe(concat('-compiledLoader.css', {newLine: ' '}))
      .pipe(gulp.dest(global.cfg.pathPrjBuild + global.cfg.app.folders.temp));
  });

  gulp.task('_makeCss', ['_cleanCss', '_makeConfig'], function(){
    var src  = global.cfg.pathFwk + global.cfg.loader.folders.www + '**/*.s+(a|c)ss',
        dest = global.cfg.pathFwk + global.cfg.loader.folders.www;

    var sassOptions = {errLogToConsole: true, indentedSyntax: false};

    return gulp.src(src)
      .pipe(utils.debugme())
      .pipe(sass(sassOptions))
      .pipe(autoprefixer({browsers: global.cfg.autoprefixer}))
      .pipe(replace(' 0px', ' 0'))
      .pipe(csslint(global.cfg.pathFwk + 'csslintrc.json'))
      .pipe(csslint.reporter(customReporter))
      .pipe(csslint.failReporter())
      .pipe(gif(global.cfg.loader.release, cssnano({zindex: false, reduceIdents: false})))
      .pipe(gulp.dest(dest))
      ;
  });

  gulp.task('_watchCss', ['_makeCss'], function(){
    return gulp.watch([global.cfg.pathFwk + global.cfg.loader.folders.www + '**/*.s+(a|c)ss'], ['makeCss']);
  });

  gulp.task('_cleanCss', function(){
    return del([
      global.cfg.pathFwk + global.cfg.loader.folders.www + '**/*.css'
    ], {force: true});
  });

  var customReporter = function(file){
    gutil.log(gutil.colors.cyan(file.csslint.errorCount) + ' errors in ' + gutil.colors.magenta(file.path));

    file.csslint.results.forEach(function(result){
      gutil.log(result.error.message + ' on line ' + result.error.line);
    });
  };

}());