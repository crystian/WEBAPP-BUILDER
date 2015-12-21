/**
 * Created by Crystian on 10/20/2014.
 */

(function(){
	'use strict';

	var webserver = require('gulp-webserver'),
			path      = require('path'),
			runSequence = require('run-sequence'),
			utils     = require('./utils');

	gulp.task('serveLoader', function(){
		utils.breakIfIsNotTemplate();

		return makeServe(global.cfg.pathFwk, global.cfg.loader.folders.www, global.cfg.ip, global.cfg.ports.server);
	});

	gulp.task('serveDist', function(){
		utils.breakIfIsRoot();

		return makeServe(global.cfg.pathPrj + global.cfg.app.folders.dist, '/', global.cfg.ip, global.cfg.ports.dist);
	});

	gulp.task('serveProject', function(){
		utils.breakIfIsRoot();
		utils.breakIfIsTemplate();

		return makeServe(global.cfg.pathPrj + global.cfg.app.folders.www, '/', global.cfg.ip, global.cfg.ports.project);
	});

	gulp.task('serve', function(){
		var r = 'serveProject';

		if(global.cfg.isTemplate){
			r = 'serveLoader';
		}

		return runSequence(r);
	});

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