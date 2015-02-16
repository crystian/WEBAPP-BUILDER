/**
* Created by Crystian on 10/19/2014.
*/

var gulp = require('gulp'),
	commons = require('./commons'),
	//debug = require('gulp-debug'),
	gif = require('gulp-if'),
	inject = require('gulp-inject'),
	htmlreplace = require('gulp-html-replace'),
	htmlmin = require('gulp-htmlmin'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	minifycss = require('gulp-minify-css'),
	//rename = require('gulp-rename'),
	//merge = require('merge-stream'),
	//streamqueue =require('streamqueue'),
	jshint = require('gulp-jshint'),
	es = require('event-stream'),
	replace = require('gulp-replace'),
	header = require('gulp-header'),
	footer = require('gulp-footer'),
	strip = require('gulp-strip-comments'),
	gutil = require('gulp-util');

gulp.task('make:loader', ['make:loader:js'],  function () {
	var htmlminOptions = {
		removeComments: true,
		collapseWhitespace: true,
		removeRedundantAttributes: true,
		collapseBooleanAttributes: true,
		removeOptionalTags: false
	};

	function injectContent(filePath, name, tagHtm) {
		return inject(gulp.src([filePath]), {
			starttag: '<!-- inject:'+ name +' -->',
			transform: function (filePath, file) {
				return '<'+tagHtm+'>'+file.contents.toString('utf8')+'</'+tagHtm+'>';
			}
		});
	}

	return gulp.src(global.cfg.folders.www + '/index.html')
		//.pipe(debug({verbose: true}))
		.on('error', console.error.bind(console))
		.pipe(htmlreplace())
		.pipe(injectContent(global.cfg.folders.temp +'/-compiledLoader.css','loaderCss','style'))
		.pipe(injectContent(global.cfg.folders.temp +'/-compiledLoader.js','loaderJs','script'))
		.pipe(gif(global.cfg.release, htmlmin(htmlminOptions)))

		//header and footers:
		.pipe(gif(global.cfg.release, header(global.cfg.textHeader.join('\n'),{
			date: gutil.date('mmm d, yyyy h:MM:ss TT Z'),
			name: global.cfg.name,
			version: global.cfg.version,
			site: global.cfg.site})))
		.pipe(gif(global.cfg.release, footer(global.cfg.textFooter.join('\n'))))
		.pipe(gulp.dest(global.cfg.folders.build));
});

gulp.task('make:loader:js', ['make:loader:css'],  function () {
	var releasePostName = (global.cfg.release) ? 'min.' : '';

	//TODO improve it
	var libs = [
		global.cfg.folders.bower + '/platform/platform.' + releasePostName + 'js',
		global.cfg.fastClick ? global.cfg.folders.bower + '/fastclick/lib/fastclick.' + releasePostName + 'js' : '',
		global.cfg.jquery ? global.cfg.folders.bower + '/jquery/dist/jquery.' + releasePostName + 'js' : '',
		global.cfg.bootstrap ? global.cfg.folders.bower + '/bootstrap/dist/js/bootstrap.' + releasePostName + 'js' : '',
		global.cfg.compressor ? global.cfg.folders.bower + '/lz-string/libs/lz-string.' + releasePostName + 'js' : ''
	];

	//TODO improve it
	var loaderScripts = [
		global.cfg.folders.www + '/config.js',
		global.cfg.folders.www + '/loader.js',
		global.cfg.folders.www + '/modules/compatibility.js',
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
		global.cfg.folders.www + '/boot.js'
	];

	var libMin = gulp.src(libs)
		.pipe(gif(cfg.release, strip({safe:false, block:false})));

	var loader = gulp.src(loaderScripts)
		//.pipe(debug({verbose: true}))
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(jshint.reporter('fail'))

		//just for "debugger" forgotens
		.pipe(gif(cfg.release, jshint({lookup:false, debug:false})))
		.pipe(gif(cfg.release, jshint.reporter('jshint-stylish')))
		.pipe(gif(cfg.release, jshint.reporter('fail')))

		.pipe(gif(cfg.release, replace('if(true){return;}//flagGulpConsoleMessage', '')))
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


	return es.merge(libMin, loader)
		.on('error', console.error.bind(console))
		.pipe(concat('/-compiledLoader.js',{newLine: ';'}))
		.pipe(gulp.dest(global.cfg.folders.temp));
});


gulp.task('make:loader:css', ['css:loader'],  function () {
	var releasePostName = (global.cfg.release) ? 'min.' : '';
		bootstrapCss = [
			global.cfg.folders.bower+ '/bootstrap/dist/css/bootstrap.'+releasePostName+'css',
			global.cfg.folders.bower+ '/bootstrap/dist/css/bootstrap-theme.'+releasePostName+'css'
		];

	var cssSheets = [global.cfg.folders.www + '/loader.css'];

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


gulp.task('css:loader', function () {
	return commons.sassfixer(global.cfg.folders.www + '/loader.scss',global.cfg.folders.www);
});
