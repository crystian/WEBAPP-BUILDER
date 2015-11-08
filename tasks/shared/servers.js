/**
 * Created by Crystian on 10/20/2014.
 */

var webserver = require('gulp-webserver'),
		//htmlmin   = require('gulp-htmlmin'),
		//gif       = require('gulp-if'),
		//strip     = require('gulp-strip-comments'),
		//commons   = require('../commons'),
		//exec      = require('child_process').exec,
		utils     = require('./utils'),
		//fs        = require('fs-extra'),
		gutil     = require('gulp-util');


gulp.task('serveLoader', function(){
	return makeServe(global.cfg.folders.fwk, global.cfg.loader.folders.www, global.cfg.ip, global.cfg.ports.serve);
});

//gulp.task('serve:nightmare', function(){
//	return this.makeServe(global.cfg.folders.template + '/' + global.cfg.loader.folders.build, '', global.cfg.ip, global.cfg.ports.nightmare);
//});

function makeServe(folder, path, ip, port){
	path = (path) ? path + '/' : '';
	console.logGreen('Remember, this is the url: http://' + ip + ':' + port + '/' + path);

	return gulp.src(folder)
		.pipe(utils.debugeame())
		.pipe(webserver({
			host: ip,
			port: port,
			//fallback: 'index.html',
			//directoryListing: true,
			livereload: false,
			open: false
		}));

};