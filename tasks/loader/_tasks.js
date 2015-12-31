/**
 * Created by Crystian on 10/16/2014.
 */

(function(){
	'use strict';

	var gutil       = require('gulp-util'),
			runSequence = require('run-sequence'),
			fs          = require('fs-extra'),
			utils       = require('../shared/utils.js');

	//alias:
	//main task: buildLoader
	gulp.task('configLoader', ['_makeConfig']);
	gulp.task('cssLoader', ['_makeCss']);
	gulp.task('csswLoader', ['_watchCss']);
	//gulp.task('loaderTest',		['_test']);

	gulp.task('hookPreBuildLoader', []);
	gulp.task('hookPostBuildLoader', []);
	gulp.task('hookPreDistLoader', []);
	gulp.task('hookPostDistLoader', []);

	gulp.task('nothing', []);

	gulp.task('buildLoader', function(cb){
		utils.breakIfIsRoot();

		runSequence(
			'hookPreBuildLoader',
			'_buildLoader',
			gutil.env.debug ? 'nothing' : '_removeTemp',
			'_copyIndex',
			'hookPostBuildLoader',
			cb);
	});

	gulp.task('buildLoaderDist', function(cb){
		utils.breakIfIsRoot();
		global.cfg.isDist = true;

		runSequence(
			'hookPreDistLoader',
			'_buildLoader',
			'_copyIndexDist',
			gutil.env.debug ? 'nothing' : '_removeBuild',
			'hookPostDistLoader',
			cb);
	});

	gulp.task('_copyIndex', function(cb){

		if(!global.cfg.isTemplate && !global.cfg.fromFwk){

			//if not template, copy index on www folder
			var indexOri  = global.cfg.pathPrj + global.cfg.app.folders.build + global.cfg.loader.filesDest.index,
					indexDest = global.cfg.pathPrj + global.cfg.app.folders.www + global.cfg.loader.filesDest.index;

			if(!utils.fileExist(indexOri)){
				console.logRed(global.builderName +': what?, there are some problem generating index.html');
				utils.exit(1);
			}

			fs.copySync(indexOri, indexDest);
			cb();
		} else {
			cb();
		}

	});

	gulp.task('_copyIndexDist', function(cb){
		var indexOri  = global.cfg.pathPrj + global.cfg.app.folders.build + global.cfg.loader.filesDest.index,
				indexDest = global.cfg.pathPrj + global.cfg.app.folders.dist + global.cfg.loader.filesDest.index;

		if(!utils.fileExist(indexOri)){
			console.logRed(global.builderName +': what?, there are some problem generating index.html');
			utils.exit(1);
		}

		fs.copySync(indexOri, indexDest);
		cb();

	});

}());