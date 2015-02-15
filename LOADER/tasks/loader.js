/**
* Created by Crystian on 10/19/2014.
*/

var gulp = require('gulp'),
	commons = require('./commons'),
	debug = require('gulp-debug'),
	gif = require('gulp-if'),
//	inject = require('gulp-inject'),
//	htmlreplace = require('gulp-html-replace'),
//	htmlmin = require('gulp-htmlmin'),
//	concat = require('gulp-concat'),
//	uglify = require('gulp-uglify'),
//	minifycss = require('gulp-minify-css'),
////	rename = require("gulp-rename"),
////	merge = require('merge-stream'),
////	streamqueue =require('streamqueue'),
//	cheerio = require('gulp-cheerio'),
//	jshint = require('gulp-jshint'),
//	es = require('event-stream'),
//	replace = require('gulp-replace'),
//	header = require('gulp-header'),
//	footer = require('gulp-footer');
	gutil = require('gulp-util');
//
//gulp.task('make:loader', ['make:loader:js'],  function () {
//	var htmlminOptions = {
//		removeComments: true,
//		collapseWhitespace: true,
//		removeRedundantAttributes: true,
//		collapseBooleanAttributes: true,
//		removeOptionalTags: false
//	};
//
//	function injectContent(filePath, name, tagHtm) {
//		return inject(gulp.src([filePath]), {
//			starttag: '<!-- inject:'+ name +' -->',
//			transform: function (filePath, file) {
//				return '<'+tagHtm+'>'+file.contents.toString('utf8')+'</'+tagHtm+'>';
//			}
//		});
//	}
//
//	var stream = gulp.src(global.cfg.folders.www + '/index.html')
//		//.pipe(debug({verbose: true}))
//		.pipe(htmlreplace())
//		.pipe(cheerio({
//			run: function ($) {
//				var texts = global.cfg.texts;
//				$('#pageTitle').text(texts.pageTitle);
//				$('#pageDescription').attr('content',texts.pageDescription);
//				$('#pageKeyword').attr('content',texts.pageKeyword);
//				$('#pageAuthor').attr('content',texts.pageAuthor);
//				$('#viewport').attr('content',texts.viewport);
//			}
//		}))
//		.pipe(injectContent(global.cfg.folders.temp +'/-compiledLoader.css','loaderCss','style'))
//		.pipe(injectContent(global.cfg.folders.temp +'/-compiledLoader.js','loaderJs','script'))
//		.pipe(gif(global.cfg.release, htmlmin(htmlminOptions)))
//
//		//header and footers:
//		.pipe(gif(global.cfg.release, header(global.cfg.banner.header.join('\n'),{
//			date: gutil.date('mmm d, yyyy h:MM:ss TT Z'),
//			name: global.cfg.pkg.name,
//			version: global.cfg.pkg.version,
//			site: global.cfg.site})))
//		.pipe(gif(global.cfg.release, footer(global.cfg.banner.footer.join('\n'))))
//
//		.pipe(gulp.dest(global.cfg.folders.build));
//
//	stream.on('error', console.error.bind(console));
//
//	return stream;
//});
//
//gulp.task('make:loader:js', ['make:loader:css'],  function () {
//	var result = {};
//
//	//lib no uglificadas
//	var libNoMin = gulp.src([
//			global.cfg.folders.bower + '/platform/platform.js'
//		])
//		.pipe(gif(cfg.release, uglify()));
//
//	//lib uglificadas
//	var libMin = gulp.src([
//			global.cfg.withCompressor ? global.cfg.folders.bower + '/lz-string/libs/lz-string.min.js' : ''
//		]);
//
//	var loader = gulp.src([
//			global.cfg.folders.loader + '/config.js',
//			global.cfg.folders.loader + '/loader.js',
//			global.cfg.folders.loader + '/modules/diag.js',
//			global.cfg.folders.loader + '/modules/compatibility.js',
//			global.cfg.folders.loader + '/modules/polyfill-ie.js',
//			global.cfg.folders.loader + '/modules/utils.js',
//			global.cfg.folders.loader + '/modules/screen.js',
//			global.cfg.folders.loader + '/modules/events.js',
//			global.cfg.folders.loader + '/modules/settings.js',
//			global.cfg.folders.loader + '/modules/lang.js',
//			global.cfg.folders.loader + '/boot.js',
//
//			global.cfg.folders.base + '/index.js'
//		])
//
//		//.pipe(debug({verbose: true}))
//		.pipe(jshint())
//		.pipe(jshint.reporter('jshint-stylish'))
//		.pipe(jshint.reporter('fail'))
//
//		//just for "debugger" forgotens
//		.pipe(gif(cfg.release, jshint({lookup:false, debug:false})))
//		.pipe(gif(cfg.release, jshint.reporter('jshint-stylish')))
//		.pipe(gif(cfg.release, jshint.reporter('fail')))
//
//		.pipe(gif(cfg.release, replace('if(true){return;}//flagGulpConsoleMessage', '')))
//		.pipe(replace(/(_loaderCfg.version.\W*=\W*')(.*)(\W*';)/, '$1'+global.cfg.pkg.version+'$3'))
//		.pipe(gif(cfg.release, replace(/(_loaderCfg\.debugMode.\W*=\W*)(.\w*)(\W*;)/, '$10$3')))
//		.pipe(gif(cfg.release, replace(/(_loaderCfg\.showDeviceInfo.\W*=\W*)(.\w*)(\W*;)/, '$10$3')))
//		.pipe(gif(cfg.release, replace(/(_loaderCfg\.showSkeletor.\W*=\W*)(.\w*)(\W*;)/, '$10$3')))
//		.pipe(gif(cfg.release, replace(/(_loaderCfg\.contentEditable.\W*=\W*)(.\w*)(\W*;)/, '$10$3')))
//		.pipe(gif(cfg.release, uglify({
//				output:{
//					beautify: false
//				},
//				compress:{
//					sequences: true,
//					drop_console: false
//				}
//			}))
//		);
//
//
//	return es.merge(libMin, libNoMin, loader)
//		.on('error', console.error.bind(console))
//		.pipe(concat('/-compiledLoader.js',{newLine: ';'}))
//		.pipe(gulp.dest(global.cfg.folders.temp));
//});
//
//
//gulp.task('make:loader:css', ['css:loader'],  function () {
//	var result = gulp.src([
//			global.cfg.folders.loader +'/loader.css'
//		])
//		.pipe(gif(cfg.release, minifycss()))
//		.pipe(concat('/-compiledLoader.css'))
//		.pipe(gulp.dest(global.cfg.folders.temp));
//
//	result.on('error', console.error.bind(console));
//	return result;
//});


gulp.task('css:loader', function () {
	return commons.sassfixer(global.cfg.folders.www + '/loader.scss',global.cfg.folders.www);
});


//gulp.task('copy:loader',function () {
//	return gulp.src([
//		global.cfg.folders.temp + '/index.html'
//	])
//	.on('error', console.error.bind(console))
//	.pipe(gulp.dest(global.cfg.folders.build));
//});
