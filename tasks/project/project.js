/**
 * Created by Crystian on 4/13/2015.
 *
 * this is a facace for common tasks for project
 */

var runSequence = require('run-sequence').use(gulp),
    fs          = require('fs-extra'),
    utils       = require('../shared/utils'),
    gutil       = require('gulp-util'),
    del         = require('del'),
    engine      = require('./engine/engine'),
    image       = require('./engine/image');

//Alias
gulp.task('css', 'Preprocessors', ['makeCss']);
gulp.task('js', 'Preprocessors', ['makeJs']);
gulp.task('html', 'Preprocessors', ['makeHtml']);
gulp.task('on', '(alias: watch) watcher for your project it calls the preprocessors and others tasks', ['watch']);
gulp.task('build', ['buildProject']);
gulp.task('full', ['buildFull']);
gulp.task('dist', ['buildFullDist']);
gulp.task('removeBuild', ['_removeBuild']);
gulp.task('removeTemp', ['_removeTemp']);

//hooks
gulp.task('hookPreBuildProject', 'Hook', []);
gulp.task('hookPostBuildProject', 'Hook', []);
gulp.task('hookPreDistProject', 'Hook', []);
gulp.task('hookPostDistProject', 'Hook', []);


gulp.task('buildFull', '(alias: full) all buildings are including: loader and project ("slower").', function(cb){
  return runSequence(
    'buildLoader',
    'buildProject',
    cb);
});

gulp.task('buildProject', '(alias: build) fast build of your project.', function(cb){
  utils.breakIfIsRoot();

  runSequence(
    gutil.env.debug ? 'nothing' : 'removeTemp',
    'hookPreBuildProject',
    'makeWwwJson',
    'hookPostBuildProject',
    cb);
});

//dist
gulp.task('buildFullDist', function(cb){
  return runSequence(
    'removeDist',
    'buildLoaderDist',
    'buildProjectDist',
    global.cfg.cordova.active ? 'copyCordovaWww' : 'nothing',
    //gutil.env.debug ? 'nothing' : 'removeBuild',
    cb);
});

gulp.task('buildProjectDist', function(cb){
  utils.breakIfIsRoot();

  global.cfg.isDist = true;

  return runSequence(
    'hookPreDistProject',
    'makeWwwJson',
    'makeAppsJson',
    'hookPostDistProject',
    'genAppCache',
    cb);
});

gulp.task('optimizeImages', 'gulp task for optimizate all images from "dist/img"', function(){
  return image.optimizeImages(global.cfg.app.folders.dist + 'img/**/*', global.cfg.app.folders.dist + 'img')
});

gulp.task('makeWwwJson', ['makeCss', 'makeJs', 'makeHtml'], function(){
  return engine.makeWwwJson();
});

gulp.task('makeAppsJson', [], function(){
  return engine.makeAppsJson();
});

gulp.task('watch', function(){
  gulp.watch([global.cfg.pathPrj + '**/app?(s).json'], ['makeFiles']);
  gulp.watch([global.cfg.pathPrj + '**/?(*.scss|*.sass|*.less|*.styl)'], ['makeCss']);
  gulp.watch([global.cfg.pathPrj + '**/?(*.ts|*.coffee)'], ['makeJs']);
  gulp.watch([global.cfg.pathPrj + '**/?(*.html)'], ['makeHtml']);
});

gulp.task('makeCss', function(){
  return engine.css();
});

gulp.task('makeJs', function(){
  return engine.js();
});

gulp.task('makeHtml', function(){
  return engine.html();
});

gulp.task('genAppCache', function(){
  return engine.genAppCache();
});

gulp.task('removeDist', function(){
  return del([global.cfg.app.folders.dist], {force: true});
});
