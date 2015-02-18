/**
* Created by Crystian on 10/19/2014.
*/

var gulp = require('gulp'),
	commons = require('./commons'),
	//debug = require('gulp-debug'),
	gif = require('gulp-if'),
	htmlreplace = require('gulp-html-replace'),
	htmlmin = require('gulp-htmlmin'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	minifycss = require('gulp-minify-css'),
	rename = require('gulp-rename'),
	streamqueue =require('streamqueue'),
	jshint = require('gulp-jshint'),
	replace = require('gulp-replace'),
	header = require('gulp-header'),
	footer = require('gulp-footer'),
	strip = require('gulp-strip-comments'),
	runSequence = require('run-sequence'),
	removeCode = require('gulp-remove-code'),
	gutil = require('gulp-util');


gulp.task('make:loader', ['make:loader:js'],  function () {
	var htmlminOptions = {
		removeComments: true,
		collapseWhitespace: true,
		removeRedundantAttributes: true,
		collapseBooleanAttributes: true,
		removeOptionalTags: false
	};

	var stream = gulp.src(global.cfg.folders.www + '/index.html')
		//.pipe(debug({verbose: true}))
		.on('error', console.error.bind(console))
		.pipe(htmlreplace())
		.pipe(commons.injectContent(global.cfg.folders.temp +'/-compiledLoader.css','loaderCss','style'))
		.pipe(commons.injectContent(global.cfg.folders.temp +'/-compiledLoader.js','loaderJs','script'))
		.pipe(gif(global.cfg.release, htmlmin(htmlminOptions)))

		//header and footers:
		.pipe(gif(global.cfg.release, header(global.cfg.textHeader.join('\n'),{
			date: gutil.date('mmm d, yyyy h:MM:ss TT Z'),
			name: global.cfg.name,
			version: global.cfg.version,
			site: global.cfg.site})))
		.pipe(gif(global.cfg.release, footer(global.cfg.textFooter.join('\n'))))
		.pipe(gulp.dest(global.cfg.folders.build));

	if(global.cfg.cordova){
		stream.pipe(rename('index-cordova.html'))
		.pipe(gif(global.cfg.release,
			replace(',isCordovaDevice:!1,', ',isCordovaDevice:1,'),
			replace('"isCordovaDevice": false,', '"isCordovaDevice": true,')
		))
		.pipe(gulp.dest(global.cfg.folders.build));
	}

	return stream;
});

function jsMaker(src) {
	return gulp.src(src)
		//.pipe(debug({verbose: true}))
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(jshint.reporter('fail'))

		//just for "debugger" forgotens
		.pipe(gif(cfg.release, jshint({lookup:false, debug:false})))
		.pipe(gif(cfg.release, jshint.reporter('jshint-stylish')))
		.pipe(gif(cfg.release, jshint.reporter('fail')))

		.pipe(removeCode({ production: cfg.release }))
		.pipe(gif(cfg.release, uglify({
			output:{
				beautify: false
			},
			compress:{
				sequences: true,
				drop_console: false
			}
		}))
	);
}

gulp.task('make:loader:js', ['make:loader:css'],  function () {
	var releasePostName = (global.cfg.release) ? 'min.' : '';

	var libs = [
		global.cfg.folders.bower + '/platform/platform.' + releasePostName + 'js',
		global.cfg.fastClick ? global.cfg.folders.bower + '/fastclick/lib/fastclick.' + releasePostName + 'js' : '',
		global.cfg.jquery ? global.cfg.folders.bower + '/jquery/dist/jquery.' + releasePostName + 'js' : '',
		global.cfg.bootstrap ? global.cfg.folders.bower + '/bootstrap/dist/js/bootstrap.' + releasePostName + 'js' : '',
		global.cfg.compressor ? global.cfg.folders.bower + '/lz-string/libs/lz-string.' + releasePostName + 'js' : '',
		global.cfg.compressor ? global.cfg.folders.bower + '/swiper/dist/js/swiper.' + releasePostName + 'js' : ''
	];

	var loaderScripts1 = [
		global.cfg.folders.www + '/config.js',
		global.cfg.folders.www + '/modules/compatibility.js'
	];

	var loaderScripts2 = [
		global.cfg.folders.www + '/loader.js',
		global.cfg.folders.www + '/variables.js',
		global.cfg.folders.www + '/modules/utils.js',
		global.cfg.folders.www + '/modules/diag.js',
		global.cfg.folders.www + '/modules/polyfill-ie.js',
		global.cfg.folders.www + '/modules/settings.js',
		global.cfg.folders.www + '/modules/lang.js',
		global.cfg.folders.www + '/modules/events.js',
		global.cfg.folders.www + '/modules/redefine.js',
		global.cfg.folders.www + '/modules/screen.js',
		global.cfg.folders.www + '/modules/cordovaConnection.js',
		global.cfg.folders.www + '/modules/analytics.js',
		global.cfg.folders.www + '/modules/boot.js'
	];

	var libMin = gulp.src(libs)
		.pipe(gif(cfg.release, strip({safe:false, block:false}))),

		scripts1 = jsMaker(loaderScripts1),
		scripts2 = jsMaker(loaderScripts2);

	return streamqueue({ objectMode: true },scripts1, libMin, scripts2)
		.on('error', console.error.bind(console))
		.pipe(concat('/-compiledLoader.js',{newLine: ';'}))
		.pipe(gulp.dest(global.cfg.folders.temp));
});

gulp.task('make:loader:css', ['css:sass'],  function () {
	var releasePostName = (global.cfg.release) ? 'min.' : '';
		bootstrapCss = [
			global.cfg.folders.bower+ '/swiper/dist/css/swiper.'+releasePostName+'css',
			global.cfg.folders.bower+ '/bootstrap/dist/css/bootstrap.'+releasePostName+'css',
			global.cfg.folders.bower+ '/bootstrap/dist/css/bootstrap-theme.'+releasePostName+'css'
		];

	//TODO for non-min library

	var cssSheets = [
		global.cfg.folders.www + '/css/loader.css',
		global.cfg.folders.loadings+'/'+ global.cfg.loading +'/loading.css'];

	if(global.cfg.bootstrap){
		cssSheets = bootstrapCss.concat(cssSheets);
	}

	return gulp.src(cssSheets)
		//.on('error', console.error.bind(console))
		.pipe(concat('/-compiledLoader.css'))
		.pipe(strip({safe:false, block:false}))
		.pipe(gif(global.cfg.release, minifycss()))
		.pipe(gulp.dest(global.cfg.folders.temp));
});


gulp.task('css:sass', function (cb) {
	'use strict';

	runSequence(
		'css:loader',
		'css:loadingTpl',
		cb);
});

gulp.task('css:loader', function () {
	return commons.sassfixer(global.cfg.folders.www + '/css/*.scss',global.cfg.folders.www +'/css');
});

gulp.task('css:loadingTpl', function () {
	return commons.sassfixer(global.cfg.folders.www + '/loading/**/*.scss',global.cfg.folders.www +'/loading');
});
