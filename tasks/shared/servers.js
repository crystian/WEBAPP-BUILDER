/**
 * Created by Crystian on 10/20/2014.
 */

var webserver = require('gulp-webserver'),
		utils     = require('./utils'),
		gutil     = require('gulp-util');

gulp.task('serveLoader', function(){
	return makeServe(global.cfg.pathFwk, global.cfg.loader.folders.www, global.cfg.ip, global.cfg.ports.serve);
});

//gulp.task('serveBuild', function(){
//	return makeServe(global.cfg.pathFwk, global.cfg.loader.folders.build, global.cfg.ip, global.cfg.ports.build);
//});

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