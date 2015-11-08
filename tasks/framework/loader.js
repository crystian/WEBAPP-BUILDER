///**
//* Created by Crystian on 10/19/2014.
//*/
//
//var gulp = require('gulp'),
//	commons = require('./commons'),
//	streamqueue =require('streamqueue'),
//	strip = require('gulp-strip-comments'),
//	gif = require('gulp-if'),
//	minifycss = require('gulp-minify-css'),
//	concat = require('gulp-concat'),
//	replace = require('gulp-replace'),
//	htmlreplace = require('gulp-html-replace'),
//	htmlmin = require('gulp-htmlmin'),
//	header = require('gulp-header'),
//	footer = require('gulp-footer'),
//	rename = require('gulp-rename'),
//	gutil = require('gulp-util');
//
//gulp.task('make:loader:html', ['make:loader:js', 'make:loader:css'],  function () {
//
//	var htmlminOptions = {
//		removeComments: true,
//		collapseWhitespace: true,
//		removeRedundantAttributes: true,
//		collapseBooleanAttributes: true,
//		removeOptionalTags: false
//	};
//
//	var stream = gulp.src(global.cfg.loader.folders.www + '/'+global.cfg.loader.filesDest.index)
//		.pipe(commons.debugeame())
//		.pipe(htmlreplace())
//		.pipe(commons.injectContent(global.cfg.loader.folders.temp +'/-compiledLoader.css','loaderCss','style'))
//		.pipe(commons.injectContent(global.cfg.loader.folders.temp +'/-compiledLoader.js','loaderJs','script'))
//		.pipe(gif(global.cfg.loader.release, htmlmin(htmlminOptions)))
//
//		//header and footers:
//		.pipe(gif(global.cfg.loader.release, header(global.cfg.loader.text.header.join('\n'),{
//			date: gutil.date('mmm d, yyyy h:MM:ss TT Z'),
//			name: global.cfg.name,
//			version: global.cfg.version,
//			site: global.cfg.site})))
//		.pipe(gif(global.cfg.loader.release, footer(global.cfg.loader.text.footer.join('\n'))))
//
//		.pipe(gif(global.cfg.loader.release,
//			replace('oneRequest:!1,', 'oneRequest:1,'),
//			replace('"oneRequest": false,', '"oneRequest": true,')
//		))
//
//		.pipe(gulp.dest(global.cfg.loader.folders.build));
//
//	if(global.cfg.cordova){
//		/*
//		This is ok, because it make another file equals to index but one change,
//		I prefer it than run again all process to make other file
//		*/
//		stream = stream.pipe(rename(global.cfg.loader.filesDest.indexCordova))
//			.pipe(commons.debugeame())
//			.pipe(gif(global.cfg.loader.release,
//				replace(',isCordovaDevice:!1,', ',isCordovaDevice:1,'),
//				replace('"isCordovaDevice": false,', '"isCordovaDevice": true,')
//			))
//			.pipe(gulp.dest(global.cfg.loader.folders.build));
//	}
//
//	return stream;
//});
//
//gulp.task('make:loader:js',  function () {
//	var releasePostName = (global.cfg.loader.release) ? 'min.' : '',
//		www = global.cfg.loader.folders.www;
//
//	//libs
//    var bowerFolder = global.cfg.loader.folders.bower;
//
//    var libs = [
//		bowerFolder + '/platform/platform.' + releasePostName + 'js',
//		bowerFolder + '/es6-promise/promise.' + releasePostName + 'js',
//		global.cfg.loader.bower.fastclick ? bowerFolder + '/fastclick/lib/fastclick.' + releasePostName + 'js' : '',
//		global.cfg.compress ? bowerFolder + '/lz-string/libs/lz-string.' + releasePostName + 'js' : ''
//	];
//	var libsMin = gulp.src(libs)
//			.pipe(gif(cfg.loader.release, strip({safe:false, block:false})));
//	//endLibs
//
//	//header script
//	var loaderScripts1 = [
//		www + '/config.js',
//		www + '/modules/compatibility.js'
//	];
//	var loaderScripts1Stream = gulp.src(loaderScripts1);
//		//TODO REVIEW
//		//.pipe(replace(/(\"build\".*\:[ ]?)(\w*)/,'$1true'))//just for index built
//		//;
//
//	loaderScripts1Stream = commons.jsMaker(loaderScripts1Stream);
//	//endheader script
//
//	//body script
//	var loaderScripts2 = [
//		www + '/modules/shortcuts.js',
//		www + '/loader.js',
//		www + '/variables.js',
//		www + '/modules/utils.js',
//		www + '/modules/diag.js',
//		www + '/modules/polyfill-ie.js',
//		www + '/modules/settings.js',
//		www + '/modules/lang.js',
//		www + '/modules/events.js',
//		www + '/modules/redefine.js',
//		www + '/modules/screen.js',
//		www + '/modules/cordovaConnection.js',
//		www + '/modules/analytics.js',
//		www + '/modules/mixpanel.js',
//		www + '/modules/boot.js'
//	];
//	var loaderScripts2Stream = gulp.src(loaderScripts2)
//		.pipe(gif(global.cfg.release && global.cfg.compress, replace('if(!loader.cfg.compress){return data;}//flagCompress','')));
//
//	loaderScripts2Stream = commons.jsMaker(loaderScripts2Stream);
//	//endbody script
//
//	return streamqueue({ objectMode: true }, loaderScripts1Stream, libsMin, loaderScripts2Stream)
//		.pipe(commons.debugeame())
//		.pipe(concat('/-compiledLoader.js',{newLine: ';'}))
//		.pipe(gulp.dest(global.cfg.loader.folders.temp));
//});
