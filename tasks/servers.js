/**
* Created by Crystian on 10/20/2014.
*/

var gulp = require('gulp'),
	//debug = require('gulp-debug'),
	webserver = require('gulp-webserver');

gulp.task('servew', ['serve','watch:tpl']);

gulp.task('watch:tpl', function() {
	gulp.watch([global.cfg.folders.www +'/index.tpl.html','gulp-config.json'], ['make:base']);
});

gulp.task('serve', function() {
	console.logGreen('Remember, this is the url: http://'+global.cfg.ip+':'+global.cfg.ports.serve+'/www/'+global.cfg.files.index);

	gulp.src('.')
		.pipe(webserver({
			host: global.cfg.ip,
			port: global.cfg.ports.serve,
			//fallback: 'index.html',
			livereload: false,
			open: false
		}));
});


gulp.task('serve:build', ['build:fast'], function() {
	console.logGreen('Remember, this is the url: http://'+global.cfg.ip+':'+global.cfg.ports.build+'/'+global.cfg.files.index);

	gulp.src(global.cfg.folders.build)
		.pipe(webserver({
			host: global.cfg.ip,
			port: global.cfg.ports.build,
			//fallback: 'index.html',
			livereload: false,
			open: false
		}));
});

gulp.task('serve:nightmare', function() {
	return gulp.src(global.cfg.folders.build)
		.pipe(webserver({
			host: global.cfg.ip,
			port: global.cfg.ports.nightmare,
			livereload: false,
			//fallback: 'index.html',
			open: false
		}));
});
