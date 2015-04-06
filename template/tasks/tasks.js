/**
 * Created by Crystian on 4/6/2015.
 */

var gulp = require('gulp'),
	engine = require('../../tasks/project/engine.js'),
	shared = require('../../tasks/project/shared.js'),
	spawn = require('child_process').spawn,
	clean = require('gulp-clean'),
	node;

gulp.task('default', ['build']);

gulp.task('css', ['css:app']); //just an alias
//gulp.task('loader', ['get:loader']);

gulp.task('css:app', function (){
	return engine.runPreprocessors(global.cfg.folders.www +'/apps.json');
});

gulp.task('cssw', function() {
	gulp.watch([global.cfg.folders.www + '/**/*.scss'], ['css:app']);
});

gulp.task('build', ['runMagic'], function (){
	return engine.runJsonify(global.cfg.folders.www +'/apps.json');
});

gulp.task('runMagic', ['get:loader'], function (){
	return engine.runMagic(global.cfg.folders.www +'/apps.json');
});

gulp.task('serve:build', ['build'], function() {
	return utils.makeServe(global.cfg.folders.build, '', global.cfg.ip, global.cfg.ports.build);
});

gulp.task('get:loader', ['remove:build'], function(cb){
	shared.getLoader(cb);
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