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

	var stream = gulp.src(global.cfg.loaderFolders.www + '/index.html')
		//.pipe(debug({verbose: true}))
		.on('error', console.error.bind(console))
		.pipe(htmlreplace())
		.pipe(commons.injectContent(global.cfg.loaderFolders.temp +'/-compiledLoader.css','loaderCss','style'))
		.pipe(commons.injectContent(global.cfg.loaderFolders.temp +'/-compiledLoader.js','loaderJs','script'))
		.pipe(gif(global.cfg.release, htmlmin(htmlminOptions)))

		//header and footers:
		.pipe(gif(global.cfg.release, header(global.cfg.textHeader.join('\n'),{
			date: gutil.date('mmm d, yyyy h:MM:ss TT Z'),
			name: global.cfg.name,
			version: global.cfg.version,
			site: global.cfg.site})))
		.pipe(gif(global.cfg.release, footer(global.cfg.textFooter.join('\n'))))
		.pipe(gulp.dest(global.cfg.loaderFolders.build));

	if(global.cfg.cordova){
		/*
		This is ok, because it make another file equals to index but one change,
		I prefer it than run again all process to make other file
		*/
		stream.pipe(rename('index-cordova.html'))
		.pipe(gif(global.cfg.release,
			replace(',isCordovaDevice:!1,', ',isCordovaDevice:1,'),
			replace('"isCordovaDevice": false,', '"isCordovaDevice": true,')
		))
		.pipe(gulp.dest(global.cfg.loaderFolders.build));
	}

	return stream;
});

function jsMaker(stream) {
	return stream
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

	//libs
	var libs = [
		global.cfg.loaderFolders.bower + '/platform/platform.' + releasePostName + 'js',
		global.cfg.fastClick ? global.cfg.loaderFolders.bower + '/fastclick/lib/fastclick.' + releasePostName + 'js' : '',
		global.cfg.jquery ? global.cfg.loaderFolders.bower + '/jquery/dist/jquery.' + releasePostName + 'js' : '',
		global.cfg.bootstrap ? global.cfg.loaderFolders.bower + '/bootstrap/dist/js/bootstrap.' + releasePostName + 'js' : '',
		global.cfg.compressor ? global.cfg.loaderFolders.bower + '/lz-string/libs/lz-string.' + releasePostName + 'js' : '',
		global.cfg.compressor ? global.cfg.loaderFolders.bower + '/swiper/dist/js/swiper.' + releasePostName + 'js' : ''
	];
	var libsMin = gulp.src(libs)
			.pipe(gif(cfg.release, strip({safe:false, block:false})));
	//endLibs

	//header script
	var loaderScripts1 = [
		global.cfg.loaderFolders.www + '/config.js',
		global.cfg.loaderFolders.www + '/modules/compatibility.js'
	];
	var loaderScripts1Stream = gulp.src(loaderScripts1);

	//force variables on build time
	if (gutil.env.withapp) {
		loaderScripts1Stream.pipe(replace(/(\"loaderWithApp.*\:)(.*)(\n)/,'$1true$3'));
	}

	loaderScripts1Stream = jsMaker(loaderScripts1Stream);
	//endheader script

	//body script
	var loaderScripts2 = [
		global.cfg.loaderFolders.www + '/loader.js',
		global.cfg.loaderFolders.www + '/variables.js',
		global.cfg.loaderFolders.www + '/modules/utils.js',
		global.cfg.loaderFolders.www + '/modules/diag.js',
		global.cfg.loaderFolders.www + '/modules/polyfill-ie.js',
		global.cfg.loaderFolders.www + '/modules/settings.js',
		global.cfg.loaderFolders.www + '/modules/lang.js',
		global.cfg.loaderFolders.www + '/modules/events.js',
		global.cfg.loaderFolders.www + '/modules/redefine.js',
		global.cfg.loaderFolders.www + '/modules/screen.js',
		global.cfg.loaderFolders.www + '/modules/cordovaConnection.js',
		global.cfg.loaderFolders.www + '/modules/analytics.js',
		global.cfg.loaderFolders.www + '/modules/boot.js'
	];
	var loaderScripts2Stream = gulp.src(loaderScripts2);
	//space for future change/replace on build time
	loaderScripts2Stream = jsMaker(loaderScripts2Stream);
	//endbody script

	return streamqueue({ objectMode: true }, loaderScripts1Stream, libsMin, loaderScripts2Stream)
		.on('error', console.error.bind(console))
		.pipe(concat('/-compiledLoader.js',{newLine: ';'}))
		.pipe(gulp.dest(global.cfg.loaderFolders.temp));
});

gulp.task('make:loader:css', ['css:sass'],  function () {
	var releasePostName = (global.cfg.release) ? 'min.' : '';
		bootstrapCss = [
			global.cfg.loaderFolders.bower+ '/swiper/dist/css/swiper.'+releasePostName+'css',
			global.cfg.loaderFolders.bower+ '/bootstrap/dist/css/bootstrap.'+releasePostName+'css',
			global.cfg.loaderFolders.bower+ '/bootstrap/dist/css/bootstrap-theme.'+releasePostName+'css'
		];

	//TODO for non-min library

	var cssSheets = [
		global.cfg.loaderFolders.www + '/css/loader.css',
		global.cfg.loaderFolders.loadings+'/'+ global.cfg.loading +'/loading.css'];

	if(global.cfg.bootstrap){
		cssSheets = bootstrapCss.concat(cssSheets);
	}

	return gulp.src(cssSheets)
		//.on('error', console.error.bind(console))
		.pipe(concat('/-compiledLoader.css'))
		.pipe(strip({safe:false, block:false}))
		.pipe(gif(global.cfg.release, minifycss()))
		.pipe(gulp.dest(global.cfg.loaderFolders.temp));
});


gulp.task('css:sass', function (cb) {
	'use strict';

	runSequence(
		'css:loader',
		'css:loadingTpl',
		cb);
});

gulp.task('css:loader', function () {
	return commons.sassfixer(global.cfg.loaderFolders.www + '/css/*.scss',global.cfg.loaderFolders.www +'/css');
});

gulp.task('css:loadingTpl', function () {
	return commons.sassfixer(global.cfg.loaderFolders.www + '/loading/**/*.scss',global.cfg.loaderFolders.www +'/loading');
});
