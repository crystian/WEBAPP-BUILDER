/**
* Created by Crystian on 19/02/2015.
*/

var gulp = require('gulp'),
	spawn = require('child_process').spawn,
	//utils = require('../../tasks/project/utils'),
	node;

//gulp.task('serve', function() {
//	return utils.makeServe('.', 'www', global.cfg.ip, global.cfg.ports.serve);
//});
//
//gulp.task('serve:build', ['build:fast'], function() {
//	return utils.makeServe(global.cfg.folders.build, '', global.cfg.ip, global.cfg.ports.build);
//});

gulp.task('serve:api', function() {
	if (node) node.kill();
	node = spawn('node', [global.cfg.folders.www +'/api/api.js'], {stdio: 'inherit'});
	node.on('close', function (code) {
		if (code === 8) {
			gulp.log('Error detected, waiting for changes...');
		}
	});
});
