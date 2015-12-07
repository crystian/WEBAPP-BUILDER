/**
 * Created by Crystian on 4/13/2015.
 */

var engine = require('./engine/engine.js');

//Alias
gulp.task('css', ['makeCss']);
gulp.task('js', ['makeJs']);
gulp.task('html', ['makeHtml']);

gulp.task('makeWwwJson', ['makeCss', 'makeJs'/*, 'makeHtml'*/], function(){
	engine.makeWwwJson();
});

gulp.task('makeCss', function(){
	return engine.runCssPreprocessors();
});

gulp.task('makeJs', function(){
	return engine.runJsPreprocessors();
});

gulp.task('makeHtml', function(){
	return engine.runHtmlPreprocessors();
});


//---
//	del = require('del'),
//	shared = require('./shared.js'),

//require('./cordova.js');


//gulp.task('loader',	['get:loader']);
//gulp.task('a',		['run:android']);
//
////make and get loader
//gulp.task('get:loader', function(cb){
//	shared.makeLoader(function () {
//		shared.copyLoader(cb);
//	});
//});
//
////building
//gulp.task('build:fast', ['runMagic'], function (){
//	return magic.runJsonify(global.cfg.folders.www +'/apps.json');
//});
//
//gulp.task('runMagic', function (){
//	return magic.runMagic(global.cfg.folders.www +'/apps.json');
//});
//
//gulp.task('optimizeImages', function (){
//	return magic.optimizeImages();
//});
//
//gulp.task('clearCache', function (done) {
//	return magic.clearCache(done);
//});
//
//gulp.task('genAppCache', function (){
//	return magic.genAppCache();
//});
//
//gulp.task('makeCss', function (){
//	return engine.runPreprocessors('apps.json');
//});


////watches
//gulp.task('cssw', function() {
//	gulp.watch([global.cfg.folders.www + '/**/*.scss'], ['css:app']);
//});
//
////cleaning and others
//gulp.task('remove:build', function() {
//	return del(global.cfg.folders.build);
//});
//
//gulp.task('remove:temp', function() {
//	return del(global.cfg.folders.temp);
//});

//gulp.task('build:loader', function (cb) {
//
//	if(!utils.fileExist(global.cfg.loader.folders.www + '/'+global.cfg.loader.filesDest.index)
//	|| !utils.fileExist(global.cfg.loader.folders.www + '/config.js')){
//		console.logRed('Index not found, run `make:base` to generate');
//		utils.exit(1);
//	}
//
//	runSequence(
//		'make:loader:html',
//		'remove:loader:temp',
//	cb);
//});

//gulp.task('release', function (cb) {
//	if (!global.cfg.loader.release) {
//		console.logRed('Variable "release" in project-config on "false", you will change it if you want a release');
//		utils.exit(1);
//	}
//
//	runSequence(
//		'full:loader',
//		'test:loader',
//	cb);
//});


