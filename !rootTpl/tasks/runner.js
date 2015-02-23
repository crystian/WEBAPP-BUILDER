/**
 * Created by Crystian on 2/19/2015.
 */



var gulp = require('gulp'),
	exec = require('child_process').exec,
	chalk = require('chalk'),
	gutil = require('gulp-util');

gulp.task('run:cordova', function (cb) {


	exec('cordova run android',{cwd:'APP/CORDOVA'},
		function (error, stdout, stderr) {

			if (error || (stderr && stderr !== '')) {
				if (gutil.env.debug) {
					console.log(chalk.black.bgRed(stdout));
				}
				console.log(chalk.black.bgRed('stderr: ' + stderr));
				console.log(chalk.black.bgRed('exec error: ' + error));
			} else {
				if (gutil.env.debug) {
					console.log(chalk.black.bgGreen(stdout));
				} else {
					console.log(chalk.black.bgGreen('Cordova ran on Android (if you want see log, use the parameter --debug)'));
				}


			}
			cb();
		});
});

