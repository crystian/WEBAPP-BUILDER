/**
 * Created by Crystian on 4/13/2015.
 */

(function(){
	'use strict';

	var runSequence = require('run-sequence'),
			fs          = require('fs-extra'),
			utils       = require('../shared/utils.js'),
			gutil       = require('gulp-util'),
			engine      = require('./engine/engine.js');

	//Alias
	gulp.task('css', ['makeCss']);
	gulp.task('js', ['makeJs']);
	gulp.task('html', ['makeHtml']);
	gulp.task('on', ['watch']);
	gulp.task('removeBuild', ['_removeBuild']);
	gulp.task('removeTemp', ['_removeTemp']);

	gulp.task('buildFull', function(cb){
		utils.breakIfIsLoader();
		utils.breakIfIsTemplate(', use buildFullDist');

		return runSequence(
			'buildLoader',
			'buildProject',
			cb);
	});

	gulp.task('buildFullDist', function(cb){
		utils.breakIfIsLoader();

		return runSequence(
			'buildLoaderDist',
			'buildProjectDist',
			'makeJsons',
			gutil.env.debug ? 'nothing' : 'removeTemp',
			cb);
	});

	gulp.task('buildProject', ['makeWwwJson'], function(){
		utils.breakIfIsLoader();
	});

	gulp.task('buildProjectDist', function(cb){
		global.cfg.isBuild = true;

		return runSequence(
			'buildProject',
			cb);
	});

	gulp.task('makeWwwJson', ['makeCss', 'makeJs', 'makeHtml'], function(){
		return engine.makeWwwJson();
	});

	gulp.task('makeJsons', [], function(){
		return engine.makeJsons();
	});

	gulp.task('watch', function(){
		gulp.watch([global.cfg.pathPrj + '**/app?(s).json'], ['makeFiles']);
		gulp.watch([global.cfg.pathPrj + '**/?(*.scss|*.sass|*.less|*.styl)'], ['makeCss']);
		gulp.watch([global.cfg.pathPrj + '**/?(*.ts|*.coffee)'], ['makeJs']);
		gulp.watch([global.cfg.pathPrj + '**/?(*.html)'], ['makeHtml']);
	});

	gulp.task('makeCss', function(){
		return engine.css();
	});

	gulp.task('makeJs', function(){
		return engine.js();
	});

	gulp.task('makeHtml', function(){
		return engine.html();
	});

	//gulp.task('release', function(cb){
	//	if(!global.cfg.loader.release || !global.cfg.app.release){
	//		console.logRed('Release mode fail. Set your app and loader on release: true');
	//		utils.exit(1);
	//	}
	//
	//	//TODO continuar
	//	runSequence(
	//		'full:loader',
	//		'test:loader',
	//		cb);
	//});


	//require('./cordova.js');

	////building
	//gulp.task('build:fast', ['runMagic'], function (){
	//	return magic.runJsonify(global.cfg.folders.www +'/apps.json');
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
}());