/**
 * Created by Crystian on 10/20/2014.
 */

(function(){
	'use strict';

	var webserver = require('gulp-webserver'),
			path      = require('path'),
			utils     = require('./utils'),
			gutil     = require('gulp-util');

	//gulp.task('_serveNightmare', function(){
	//	return makeServe(global.cfg.pathFwk +'/'+ global.cfg.loader.folders.build, '', global.cfg.ip, global.cfg.ports.nightmare);
	//});

	function makeServe(folder, _path, ip, port){
		//_path = (_path) ? _path : '';
		console.logGreen('Remember, this is the url: http://' + ip + ':' + port + '/' + _path);
		console.log('Serving: ', path.resolve(folder));

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

	}

	exports.makeServe = makeServe;

}());