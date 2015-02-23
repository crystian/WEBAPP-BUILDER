/**
* Created by Crystian on 10/19/2014.
*/

var gulp = require('gulp'),
	//debug = require('gulp-debug'),
	commons = require('./commons'),
	gif = require('gulp-if'),
	htmlreplace = require('gulp-html-replace'),
	htmlmin = require('gulp-htmlmin'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	minifycss = require('gulp-minify-css'),
	rename = require('gulp-rename'),
	streamqueue =require('streamqueue'),
	merge =require('merge-stream'),
	jshint = require('gulp-jshint'),
	replace = require('gulp-replace'),
	header = require('gulp-header'),
	footer = require('gulp-footer'),
	strip = require('gulp-strip-comments'),
	runSequence = require('run-sequence'),
	removeCode = require('gulp-remove-code'),
	fs = require('fs-extra'),
	gutil = require('gulp-util');


gulp.task('make:loader', ['make:loader:js', 'make:loader:css'],  function (cb) {
	var htmlminOptions = {
		removeComments: true,
		collapseWhitespace: true,
		removeRedundantAttributes: true,
		collapseBooleanAttributes: true,
		removeOptionalTags: false
	};

	var stream = gulp.src(global.cfg.folders.www + '/index.html')
		//.pipe(debug({verbose: true}))
		//.on('error', console.error.bind(console))
		.pipe(htmlreplace())
		.pipe(commons.injectContent(global.cfg.folders.temp +'/-compiledLoader.css','loaderCss','style'))
		.pipe(commons.injectContent(global.cfg.folders.temp +'/-compiledLoader.js','loaderJs','script'))
		.pipe(gif(global.cfg.loader.release, htmlmin(htmlminOptions)))

		//header and footers:
		.pipe(gif(global.cfg.loader.release, header(global.cfg.loader.text.header.join('\n'),{
			date: gutil.date('mmm d, yyyy h:MM:ss TT Z'),
			name: global.cfg.name,
			version: global.cfg.version,
			site: global.cfg.site})))
		.pipe(gif(global.cfg.loader.release, footer(global.cfg.loader.text.footer.join('\n'))))
		.pipe(gulp.dest(global.cfg.folders.build));

	if(global.cfg.cordova){
		/*
		This is ok, because it make another file equals to index but one change,
		I prefer it than run again all process to make other file
		*/
		stream.pipe(rename('index-cordova.html'))
		.pipe(gif(global.cfg.loader.release,
			replace(',isCordovaDevice:!1,', ',isCordovaDevice:1,'),
			replace('"isCordovaDevice": false,', '"isCordovaDevice": true,')
		))
		.pipe(gulp.dest(global.cfg.folders.build));
	}


	function callbackFn() {
		fs.copySync(global.cfg.folders.template, global.cfg.folders.build);
		cb();
	}

	if (global.cfg.loader.oneRequest) {

		//landing
		global.cfg.makeOneRequestFile = {
			name:'landing',
			js: global.cfg.folders.template +'/app.js',
			css: global.cfg.folders.template +'/app.css',
			html: global.cfg.folders.template +'/app.html',
			dest: '../'+global.cfg.folders.template +'/'+ global.cfg.landing.finalFile
		};

		runSequence('make:onRequest',callbackFn);

	} else {
		callbackFn();
	}

});

function jsMaker(stream) {
	return stream
		//.pipe(debug({verbose: true}))
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(jshint.reporter('fail'))

		//just for "debugger" forgotens
		.pipe(gif(cfg.loader.release, jshint({lookup:false, debug:false})))
		.pipe(gif(cfg.loader.release, jshint.reporter('jshint-stylish')))
		.pipe(gif(cfg.loader.release, jshint.reporter('fail')))

		.pipe(removeCode({ production: cfg.loader.release }))
		.pipe(gif(cfg.loader.release, uglify({
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

gulp.task('make:loader:js',  function () {
	var releasePostName = (global.cfg.loader.release) ? 'min.' : '';
	//libs
	var libs = [
		global.cfg.folders.bower + '/platform/platform.' + releasePostName + 'js',
		global.cfg.loader.fastclick ? global.cfg.folders.bower + '/fastclick/lib/fastclick.' + releasePostName + 'js' : '',
		global.cfg.loader.jquery ? global.cfg.folders.bower + '/jquery/dist/jquery.' + releasePostName + 'js' : '',
		global.cfg.loader.bootstrap ? global.cfg.folders.bower + '/bootstrap/dist/js/bootstrap.' + releasePostName + 'js' : '',
		global.cfg.compress ? global.cfg.folders.bower + '/lz-string/libs/lz-string.' + releasePostName + 'js' : '',
		global.cfg.loader.swiper ? global.cfg.folders.bower + '/swiper/dist/js/swiper.' + releasePostName + 'js' : ''
	];
	var libsMin = gulp.src(libs)
			.pipe(gif(cfg.loader.release, strip({safe:false, block:false})));
	//endLibs

	//header script
	var loaderScripts1 = [
		global.cfg.folders.www + '/config.js',
		global.cfg.folders.www + '/modules/compatibility.js'
	];
	var loaderScripts1Stream = gulp.src(loaderScripts1)
		.pipe(replace(/(\"build\".*\:[ ]?)(\w*)/,'$1true'))//just for index built
		;

	loaderScripts1Stream = jsMaker(loaderScripts1Stream);
	//endheader script

	//body script
	var loaderScripts2 = [
		global.cfg.folders.www + '/modules/shortcuts.js',
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
	var loaderScripts2Stream = gulp.src(loaderScripts2)
		.pipe(gif(global.cfg.compress, replace('if(!loader.cfg.compress){return data;}//flagCompress','')));

	loaderScripts2Stream = jsMaker(loaderScripts2Stream);
	//endbody script

	return streamqueue({ objectMode: true }, loaderScripts1Stream, libsMin, loaderScripts2Stream)
		.on('error', console.error.bind(console))
		.pipe(concat('/-compiledLoader.js',{newLine: ';'}))
		.pipe(gulp.dest(global.cfg.folders.temp));
});

gulp.task('make:loader:css', ['css:sass'],  function () {
	var releasePostName = (global.cfg.loader.release) ? 'min.' : '';

	var cssLib = [
		global.cfg.loader.swiper ? global.cfg.folders.bower + '/swiper/dist/css/swiper.'+releasePostName+'css' : '',
		global.cfg.loader.bootstrap ? global.cfg.folders.bower + '/bootstrap/dist/css/bootstrap.'+releasePostName+'css' : '',
		global.cfg.loader.bootstrap ? global.cfg.folders.bower + '/bootstrap/dist/css/bootstrap-theme.'+releasePostName+'css ': ''
	];

	var cssLibToMin = [
		//global.cfg.folders.bower + '/dist/css/css.css'
	];

	var cssLoader = [
		global.cfg.folders.www + '/css/loader.css',
		global.cfg.folders.loadings+'/'+ global.cfg.loader.loading +'/loading.css'];


	return streamqueue({ objectMode: true },
			gulp.src(cssLib)
				.pipe(strip({safe:false, block:false})),
			merge(
				gulp.src(cssLoader),
				gulp.src(cssLibToMin)
			)
			.pipe(strip({safe:false, block:false}))
			.pipe(gif(global.cfg.loader.release, minifycss()))
		)
		//.on('error', console.error.bind(console))
		.pipe(concat('/-compiledLoader.css'))
		.pipe(gulp.dest(global.cfg.folders.temp));
});


gulp.task('css:sass', function (cb) {
	runSequence(
		'css:loader',
		'css:loadings',
		cb);
});

gulp.task('css:loader', function () {
	return commons.sassfixer(global.cfg.folders.www + '/css/*.scss',global.cfg.folders.www +'/css');
});

gulp.task('css:loadings', function () {
	return commons.sassfixer(global.cfg.folders.www + '/loading/**/*.scss',global.cfg.folders.www +'/loading');
});
