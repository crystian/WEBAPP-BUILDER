/**
 * Created by Crystian on 08/11/2015.
 */
(function(){
	'use strict';

	var utils       = require('../shared/utils'),
			streamqueue = require('streamqueue'),
			strip       = require('gulp-strip-comments'),
			gif         = require('gulp-if'),
			concat      = require('gulp-concat'),
			replace     = require('gulp-replace'),
			jshint      = require('gulp-jshint'),
			removeCode  = require('gulp-remove-code'),
			uglify      = require('gulp-uglify'),
			gutil       = require('gulp-util');

	gulp.task('_buildJs', ['_makeBower', '_removeBuild'], function(){
		var www  = global.cfg.pathFwk + global.cfg.loader.folders.www,
				libs = utils.normalizePathFwk(global.cfg.varJs),
				libsMinStream,
				loaderScripts1,
				loaderScripts1Stream,
				loaderScripts2,
				loaderScripts2Stream;

		libsMinStream = gulp.src(libs)
			.pipe(gif(global.cfg.loader.release, strip({safe: false, block: false})));
		//endLibs

		//header script
		loaderScripts1 = [
			www + 'config.js',
			www + 'modules/compatibility.js'
		];
		loaderScripts1Stream = gulp.src(loaderScripts1);

		loaderScripts1Stream = jsMaker(loaderScripts1Stream, global.cfg.loader.release);
		//endheader script

		//body script
		loaderScripts2 = [
			www + 'modules/shortcuts.js',
			www + 'loader.js',
			www + 'variables.js',
			www + 'modules/utils.js',
			www + 'modules/diag.js',
			www + 'modules/polyfill-ie.js',
			www + 'modules/settings.js',
			www + 'modules/lang.js',
			www + 'modules/events.js',
			www + 'modules/redefine.js',
			www + 'modules/screen.js',
			www + 'modules/cordovaConnection.js',
			www + 'modules/analytics.js',
			www + 'modules/mixpanel.js',
			www + 'modules/boot.js'
		];

		if(global.cfg.loader.release && gutil.env.forceError){
			//just for force an error
			loaderScripts2.push(www + 'modules/jshintTest.js');
		}

		loaderScripts2Stream = gulp.src(loaderScripts2)
			.pipe(gif(global.cfg.loader.release && global.cfg.compress,
				replace('if(!loader.cfg.compress){return data;}//flagCompress', '')));

		loaderScripts2Stream = jsMaker(loaderScripts2Stream, global.cfg.loader.release);
		//endbody script

		return streamqueue({objectMode: true}, loaderScripts1Stream, libsMinStream, loaderScripts2Stream)
			.pipe(utils.debugeame())
			.pipe(concat('-compiledLoader.js', {newLine: ';'}))
			.pipe(gulp.dest(global.cfg.pathPrjBuild + global.cfg.app.folders.temp));
	});

	function jsMaker(stream, release){
		return stream
			.pipe(gif(release, jshint({lookup: false, debug: false})))
			.pipe(gif(release, jshint.reporter('jshint-stylish')))
			.pipe(gif(release, jshint.reporter('fail')))

			.pipe(removeCode({production: release}))
			.pipe(gif(release, uglify({
					output: {
						beautify: false
					},
					compress: {
						sequences: true,
						drop_console: false
					}
				}))
			);
	}

}());