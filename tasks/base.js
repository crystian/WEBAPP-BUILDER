/**
* Created by Crystian on 15/02/02.
*/

var gulp = require('gulp'),
	//debug = require('gulp-debug'),
	commons = require('./commons'),
	inject = require('gulp-inject'),
	replace = require('gulp-replace'),
	rename = require('gulp-rename'),
	fs = require('fs-extra'),
	cheerio = require('gulp-cheerio');


gulp.task('make:base', ['make:bower', 'make:index', 'generate:config'], function() {
	//replace references on index.html
	return gulp.src(global.cfg.folders.www +'/'+global.cfg.files.index)
		//.pipe(debug({verbose: true}))
		.pipe(commons.injectContent(global.cfg.folders.loadings+'/'+ global.cfg.loader.loading +'/loading.html','loadingHtml'))
		.pipe(inject(gulp.src(global.cfg.folders.loadings+'/'+ global.cfg.loader.loading +'/loading.css', {read: false}), {name: 'loadingCss', relative:'true'}))
		.pipe(inject(gulp.src(global.cfg.varJs, {read: false}), {name: 'bower', relative:'true'}))
		.pipe(inject(gulp.src(global.cfg.varCss, {read: false}), {name: 'bower', relative:'true'}))
		.pipe(gulp.dest(global.cfg.folders.www));
});

gulp.task('make:index', function () {
	return gulp.src(global.cfg.folders.www + '/index.tpl.html')
		//.on('error', gutil.log)
		//.pipe(debug({verbose: true}))
		.pipe(rename(global.cfg.files.index))
		.pipe(gulp.dest(global.cfg.folders.www))
		.pipe(cheerio({
			run: function ($) {
				var cfg = global.cfg;
				$('#pageTitle').text(cfg.loader.text.title);
				$('#pageDescription').attr('content',cfg.loader.text.description);
				$('#pageKeyword').attr('content',cfg.loader.text.keyword);
				$('#pageAuthor').attr('content',cfg.loader.text.author);
				$('#noscript').html(cfg.loader.text.noscript);
				$('#viewport').attr('content',cfg.loader.viewport);
			}
		}))
		.pipe(replace('<!--msgTpl-->','<!-- REMEMBER, this file is generated, don\'t change it, because you can lost it -->'))
		//.on('error', gutil.log)
		.pipe(gulp.dest(global.cfg.folders.www));
});

gulp.task('generate:config', function (cb) {
	//variables shared between loader build and loader app
	var json = {};
	json.release = global.cfg.app.release;
	json.version = global.cfg.version;

	json.compress = global.cfg.compress;
	json.isCordovaDevice = global.cfg.isCordovaDevice;
	json.compatibilityMatrix = global.cfg.compatibilityMatrix;
	json.debugZoneActive = global.cfg.debugZoneActive;
	json.mixpanel = global.cfg.mixpanel.installed;
	json.analytics = global.cfg.analytics.appInstaller;
	json.consoleError = global.cfg.consoleError;
	json.oneRequest = global.cfg.oneRequest;
	json.firstApp = global.cfg.app.firstApp;
	json.fastclick = global.cfg.loader.bower.fastclick;
	json.appRoot = global.cfg.app.folders.app;

	json.loader = {
		version: global.cfg.loader.version,
		release: global.cfg.loader.release,
		build: false,
		text: {
			incompatibleByFeatures: global.cfg.loader.text.incompatibleByFeatures,
			incompatibleByDiag: global.cfg.loader.text.incompatibleByDiag,
			semiIncompatible: global.cfg.loader.text.semiIncompatible,
			faqLink: global.cfg.loader.text.faqLink,
			errorRequestFile: global.cfg.loader.text.errorRequestFile,
			errorTimeoutServer: global.cfg.loader.text.errorTimeoutServer
		}
	};


	var compatibilityTpl =
		'\n\n//primer chequeo, si no es compatible con esto, se cancela el loader!\n'+
		'_loaderCfg.compatibilityFirst = function () {\n'+
		'	//jshint maxcomplexity:false, quotmark:false\n'+
		'	\'use strict\';\n'+
		'	var arr = [];\n'+
		global.cfg.compatibilityFirst+
		'};\n';

	var text = '/* Remember, this file is autogenerate, don\'t change it */\n\n' +
		'//jshint maxlen:false\n'+
		'var _loaderCfg = '+ JSON.stringify(json, null, '\t') +';'+
		compatibilityTpl;

	fs.writeFile(global.cfg.folders.www +'/config.js',
		text,
		function(err){
			if(err) {
				console.logRed(err);
			} else {
				console.logGreen('Config.js generated');
			}
			cb();
		});
});
