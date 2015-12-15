/**
 * Created by Crystian on 10/16/2014.
 */

(function(){
	'use strict';

	var gutil       = require('gulp-util'),
			runSequence = require('run-sequence'),
			fs          = require('fs-extra'),
			utils       = require('../shared/utils.js'),
			serve       = require('../shared/server');

	//alias:
	//main task: buildLoader
	gulp.task('configLoader', ['_makeConfig']);
	gulp.task('cssLoader', ['_makeCss']);
	gulp.task('csswLoader', ['_watchCss']);
	gulp.task('serveLoader', ['_serve']);
	//gulp.task('loaderTest',		['_test']);

	gulp.task('nothing', []);

	gulp.task('buildLoader', function(cb){
		runSequence(
			'_buildLoader',
			'_copyIndex',
			gutil.env.debug ? 'nothing' : '_removeTemp',
			cb);
	});

	gulp.task('_copyIndex', function(cb){

		if(!global.cfg.isTemplate && !global.cfg.fromFwk){
			//if not template, copy index on www folder
			var indexOri  = global.cfg.pathPrj + global.cfg.app.folders.build + global.cfg.loader.filesDest.index,
					indexDest = global.cfg.pathPrj + global.cfg.app.folders.www + global.cfg.loader.filesDest.index;

			if(!utils.fileExist(indexOri)){
				console.logRed('APPFACTORY: what?, there are some problem generating index.html');
				utils.exit(1);
			}

			fs.copySync(indexOri, indexDest);
			cb();
		} else {
			cb();
		}

	});

	function breakIfIsTemplate(){
		if(!global.cfg.isTemplate){
			console.logRed('APPFACTORY: it is not a template');
			utils.exit(1);
		}
	}

	gulp.task('_serve', function(){
		breakIfIsTemplate();

		return serve.makeServe(global.cfg.pathFwk, global.cfg.loader.folders.www, global.cfg.ip, global.cfg.ports.serve);
	});


}());