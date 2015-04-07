/**
 * Created by Crystian on 4/6/2015.
 */

var gulp = require('gulp'),
	engine = require('../../tasks/project/engine.js'),
	shared = require('../../tasks/project/shared.js'),
	spawn = require('child_process').spawn,
	clean = require('gulp-clean'),
	runSequence = require('run-sequence'),
	node;

//alias:
gulp.task('default', ['build']);
gulp.task('full', ['build:full']);
gulp.task('css', ['css:app']);
gulp.task('loader', ['get:loader']);

gulp.task('build:full', function (cb) {
	runSequence(
		'remove:build',
		'get:loader',
		'build',
		cb);
});

gulp.task('build', function (cb) {
	runSequence(
		'build:fast',
		'remove:temp',
		cb);
});


gulp.task('build:fast', ['runMagic'], function (){
	return engine.runJsonify(global.cfg.folders.www +'/apps.json');
});

gulp.task('runMagic', function (){
	return engine.runMagic(global.cfg.folders.www +'/apps.json');
});

gulp.task('get:loader', function(cb){
	shared.getLoader(cb);
});

gulp.task('serve:build', ['build'], function() {
	return utils.makeServe(global.cfg.folders.build, '', global.cfg.ip, global.cfg.ports.build);
});


gulp.task('serve:api', function() {
	if (node) node.kill();
	node = spawn('node', [global.cfg.folders.www +'/api/api.js'], {stdio: 'inherit'});
	node.on('close', function (code) {
		if (code === 8) {
			gulp.log('Error detected, waiting for changes...');
		}
	});
});


gulp.task('css:app', function (){
	return engine.runPreprocessors(global.cfg.folders.www +'/apps.json');
});
gulp.task('cssw', function() {
	gulp.watch([global.cfg.folders.www + '/**/*.scss'], ['css:app']);
});


gulp.task('remove:build', function() {
	//no borrar la carpeta build, da errores de sincro
	return gulp.src([
		global.cfg.folders.build +'/**/*'
	], {read: false})
		.pipe(clean());
});

gulp.task('remove:temp', function() {
	return gulp.src([
		global.cfg.folders.temp
	], {read: false})
		.pipe(clean());
});