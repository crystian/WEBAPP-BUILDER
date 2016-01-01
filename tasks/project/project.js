/**
 * Created by Crystian on 4/13/2015.
 */

(function(){
	'use strict';

	var runSequence = require('run-sequence').use(gulp),
			fs          = require('fs-extra'),
			utils       = require('../shared/utils'),
			gutil       = require('gulp-util'),
			del         = require('del'),
			engine      = require('./engine/engine'),
			image       = require('./engine/image');

	//Alias
	gulp.task('css', ['makeCss']);
	gulp.task('js', ['makeJs']);
	gulp.task('html', ['makeHtml']);
	gulp.task('on', ['watch']);
	gulp.task('build', ['buildProject']);
	gulp.task('dist', ['buildFullDist']);
	gulp.task('removeBuild', ['_removeBuild']);
	gulp.task('removeTemp', ['_removeTemp']);

	//hooks
	gulp.task('hookPreBuildProject', []);
	gulp.task('hookPostBuildProject', []);
	gulp.task('hookPreDistProject', []);
	gulp.task('hookPostDistProject', []);


	gulp.task('full', function(cb){
		runSequence(
			'buildFull',
			cb);
	});

	gulp.task('buildFull', function(cb){
		return runSequence(
			'buildLoader',
			'buildProject',
			cb);
	});

	gulp.task('buildProject', function(cb){
		utils.breakIfIsRoot();

		runSequence(
			gutil.env.debug ? 'nothing' : 'removeTemp',
			'hookPreBuildProject',
			'makeWwwJson',
			'hookPostBuildProject',
			cb);
	});

	//dist
	gulp.task('buildFullDist', function(cb){
		return runSequence(
			'removeDist',
			'buildLoaderDist',
			'buildProjectDist',
			gutil.env.debug ? 'nothing' : 'removeBuild',
			cb);
	});

	gulp.task('buildProjectDist', function(cb){
		utils.breakIfIsRoot();

		global.cfg.isDist = true;

		return runSequence(
			'hookPreDistProject',
			'makeWwwJson',
			'makeAppsJson',
			'hookPostDistProject',
			'genAppCache',
			cb);
	});

	gulp.task('makeWwwJson', ['makeCss', 'makeJs', 'makeHtml'], function(){
		return engine.makeWwwJson();
	});

	gulp.task('makeAppsJson', [], function(){
		return engine.makeAppsJson();
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

	gulp.task('genAppCache', function (){
		return engine.genAppCache();
	});

	gulp.task('removeDist', function(){
		return del([global.cfg.app.folders.dist], {force: true});
	});

	gulp.task('clearCache', function(done){
		return image.optimizeImagesClearCache(done);
	});

}());