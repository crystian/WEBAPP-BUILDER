/**
* Created by Crystian on 10/20/2014.
*/

var gulp = require('gulp'),
	webserver = require('gulp-webserver');

gulp.task('serve', function() {
	'use strict';

	console.log('Remember, this is the url: http://'+global.cfg.ip+':'+global.cfg.ports.serve+'/www/index.html');

	gulp.src('.')
		.pipe(webserver({
			host: global.cfg.ip,
			port: global.cfg.ports.serve,
			fallback: 'index.html',
			livereload: true,
			open: false
		}));
});

gulp.task('watch', function() {
	gulp.watch(global.cfg.folders.www +'/index.tpl.html', ['bowerify']);
});

gulp.task('servew', ['serve','watch']);


gulp.task('serve:build', function() {
	'use strict';

	console.log('Remember, this is the url: http://'+global.cfg.ip+':'+global.cfg.ports.build+'/index.html');

	gulp.src(global.cfg.folders.build)
		.pipe(webserver({
			host: global.cfg.ip,
			port: global.cfg.ports.build,
			fallback: 'index.html',
			livereload: false,
			open: false
		}));
});
