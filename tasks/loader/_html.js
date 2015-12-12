/**
 * Created by Crystian on 10/19/2014.
 */

(function(){
	'use strict';

	var utils       = require('../shared/utils'),
			injector    = require('./_injector'),
			gif         = require('gulp-if'),
			rename      = require('gulp-rename'),
			replace     = require('gulp-replace'),
			htmlreplace = require('gulp-html-replace'),
			htmlmin     = require('gulp-htmlmin'),
			header      = require('gulp-header'),
			footer      = require('gulp-footer'),
			gutil       = require('gulp-util');

	gulp.task('_buildLoader', ['_buildJs', '_buildCss', '_makeBase'], function(){

		var htmlminOptions = {
			removeComments: true,
			collapseWhitespace: true,
			removeRedundantAttributes: true,
			collapseBooleanAttributes: true,
			removeOptionalTags: false
		};

		var stream = gulp.src(global.cfg.pathFwk + global.cfg.loader.folders.www + global.cfg.loader.filesDest.index)
			.pipe(utils.debugeame())
			.pipe(htmlreplace())
			.pipe(injector.injectContent(global.cfg.pathPrjBuild + global.cfg.app.folders.temp + '-compiledLoader.css', 'loaderCss', 'style'))
			.pipe(injector.injectContent(global.cfg.pathPrjBuild + global.cfg.app.folders.temp + '-compiledLoader.js', 'loaderJs', 'script'))
			.pipe(gif(global.cfg.loader.release, htmlmin(htmlminOptions)))

			//header and footers:
			.pipe(gif(global.cfg.loader.release, header(global.cfg.loader.text.header.join('\n'), {
				date: gutil.date('mmm d, yyyy h:MM:ss TT Z'),
				name: global.cfg.app.name,
				version: global.cfg.app.version,
				site: global.cfg.app.site
			})))
			.pipe(gif(global.cfg.loader.release, footer(global.cfg.loader.text.footer.join('\n'))))

			.pipe(gif(global.cfg.loader.release,
				replace('oneRequest:!1', 'oneRequest:1')
				//	,replace('"oneRequest": false', '"oneRequest": true')
			))

			.pipe(gulp.dest(global.cfg.pathPrjBuild));

		if(global.cfg.app.cordova){
			/*
			 This is ok, because it make another file equals to index but one change,
			 I prefer it than run again all process to make other file
			 */
			stream = stream.pipe(rename(global.cfg.loader.filesDest.indexCordova))
				.pipe(utils.debugeame())
				.pipe(gif(global.cfg.loader.release,
					replace(',isCordovaDevice:!1,', ',isCordovaDevice:1,'),
					replace('"isCordovaDevice": false,', '"isCordovaDevice": true,')
				))
				.pipe(gulp.dest(global.cfg.pathPrjBuild));
		}

		return stream;
	});

}());