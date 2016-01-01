/**
 * Created by Crystian on 4/13/2015.
 */

var utils = require('../../shared/utils.js'),
		del   = require('del'),
		fs    = require('fs-extra'),
		exec  = require('child_process').exec,
		gutil = require('gulp-util');


gulp.task('runAndroid', ['buildFullDist'], function(cb){
	var cordovaLocal = '';
	if(!global.cfg.cordovaInstalled){
		cordovaLocal = 'node ../../../../../node_modules/cordova/bin/'
	}
	exec(cordovaLocal + 'cordova run android', {cwd: global.cfg.app.folders.cordova},
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
	if(!global.cfg.app.cordova){
		console.logRed('This project is not a cordova one, remember set var app.cordova on true, and it will create "' + global.cfg.loader.filesDest.indexCordova + '" file');
		utils.exit(2);
	}

	fs.copySync(global.cfg.app.folders.dist, global.cfg.app.folders.cordovaWWW);

	fs.copySync(
		global.cfg.app.folders.build + global.cfg.loader.filesDest.indexCordova,
		global.cfg.app.folders.cordovaWWW + global.cfg.loader.filesDest.index);
});

gulp.task('removeCordovaWww', function(){
	var r;
	if(global.cfg.app.cordova){
		r = del(global.cfg.app.folders.cordovaWWW);
	}
	return r
});