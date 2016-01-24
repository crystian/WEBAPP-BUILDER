/**
 * Created by Crystian on 4/13/2015.
 */

var utils = require('../../shared/utils.js'),
    del   = require('del'),
    fs    = require('fs-extra'),
    exec  = require('child_process').exec,
    gutil = require('gulp-util');


gulp.task('runAndroid', ['buildFullDist'], function(cb){
  if(!global.cfg.cordova.active){
    console.logRed('This project is not a cordova one, remember set var cordova.active on true, and it will create "' + global.cfg.cordova.files.index + '" file');
    utils.exit(2);
  }

  exec('cordova run android', {cwd: global.cfg.cordova.folder},
    function(error, stdout, stderr){

      if(error || (stderr && stderr !== '')){
        if(gutil.env.debug){
          console.logRed(stdout);
        }
        console.logRed('stderr: ' + stderr);
        console.logRed('exec error: ' + error);
      } else {
        if(gutil.env.debug){
          console.logGreen(stdout);
        } else {
          console.logGreen('Cordova ran on Android (if you want to see log, use the parameter --debug)');
        }
      }
      cb();
    });
});

gulp.task('copyCordovaWww', ['removeCordovaWww'], function(){
  if(!global.cfg.cordova.active){
    console.logRed('This project is not a cordova one, remember set var cordova.active on true, and it will create "' + global.cfg.cordova.files.index + '" file');
    utils.exit(2);
  }

  fs.copySync(global.cfg.app.folders.dist, global.cfg.cordova.www);

  fs.copySync(
    global.cfg.app.folders.build + global.cfg.cordova.files.index,
    global.cfg.cordova.www + global.cfg.loader.files.index);
});

gulp.task('removeCordovaWww', function(){
  var r;
  if(global.cfg.cordova.active){
    r = del(global.cfg.cordova.www);
  }
  return r
});