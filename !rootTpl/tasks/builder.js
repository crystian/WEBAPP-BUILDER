/**
 * Created by Crystian on 2/19/2015.
 */

var gulp = require('gulp'),
	exec = require('child_process').exec,
	chalk = require('chalk'),
	gutil = require('gulp-util'),
	debug = require('gulp-debug');



gulp.task('make:app', ['concat:css'], function () {





	return {};
});



gulp.task('concat:css', function () {

});


gulp.task('loader:make', function (cb) {
	exec('gulp build',{cwd:global.cfg.folders.loader},
		function (error, stdout, stderr) {

			if (error || (stderr && stderr !== '')) {
				if (gutil.env.debug) {
					console.log(chalk.black.bgRed(stdout));
				}
				console.log(chalk.black.bgRed('stderr: ' + stderr));
				console.log(chalk.black.bgRed('exec error: ' + error));
			} else {
				if (gutil.env.debug) {
					console.log(stdout);
				} else {
					console.log(chalk.black.bgGreen('Loader made'));
				}
			}
			cb();
		}
	);
});
gulp.task('loader:copy',['loader:make'], function () {
	return gulp.src(global.cfg.folders.loaderDist+'/*.*')
		//.pipe(debug({verbose: true}))
		//.on('error', console.error.bind(console))
		.pipe(gulp.dest(global.cfg.folders.tempFull));
});
gulp.task('loader:get',['loader:copy'], function () {
	return gulp.src(global.cfg.folders.tempFull+'/index.html')
		//.pipe(debug({verbose: true}))
		//.on('error', console.error.bind(console))
		.pipe(gulp.dest(global.cfg.folders.wwwFull));
});
