/**
* Created by Crystian on 15/02/02.
*/

var gulp = require('gulp'),
	//debug = require('gulp-debug'),
	shared = require('./shared'),
	uglify = require('gulp-uglify'),
	inject = require('gulp-inject'),
	replace = require('gulp-replace'),
	rename = require('gulp-rename'),
	fs = require('fs'),
	bowerify = require('gulp-bower'),
	cheerio = require('gulp-cheerio');


gulp.task('make:base', ['make:bower', 'make:index', 'generate:config'], function() {
	//replace references on index.html
	return gulp.src(global.cfg.folders.www +'/'+global.cfg.files.index)
		//.pipe(debug({verbose: true}))
		.pipe(shared.injectContent(global.cfg.folders.loadings+'/'+ global.cfg.loader.loading +'/loading.html','loadingHtml'))
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
	json.release = global.cfg.loader.release;//be carefull, it's from loader!
	json.version = global.cfg.version;

	json.compress = global.cfg.compress;
	json.isCordovaDevice = global.cfg.isCordovaDevice;
	json.compatibilityMatrix = global.cfg.compatibilityMatrix;
	json.debugZoneActive = global.cfg.debugZoneActive;

	json.mixpanel = {
		'installed': global.cfg.mixpanel.installed,
		'active': global.cfg.mixpanel.active,
		'token': global.cfg.mixpanel.token
	};

	json.analytics = {
		'id': global.cfg.analytics.id,
		'installed': global.cfg.analytics.installed,
		'active': global.cfg.analytics.active,
		'linkid': global.cfg.analytics.linkid,
		'displayFeatures':  global.cfg.analytics.displayFeatures,
		'appName': global.cfg.analytics.appName,
		'appId': global.cfg.analytics.appId,
		'appInstaller': global.cfg.analytics.appInstaller
	};

	json.consoleError = global.cfg.consoleError;

	json.loader = {
		version: global.cfg.loader.version,
		build: false,
		fastclick: global.cfg.loader.fastclick,
		pathTpl: global.cfg.loader.folders.template,

		text: {
			incompatibleByFeatures: global.cfg.loader.text.incompatibleByFeatures,
			incompatibleByDiag: global.cfg.loader.text.incompatibleByDiag,
			semiIncompatible: global.cfg.loader.text.semiIncompatible,
			faqLink: global.cfg.loader.text.faqLink,
			errorRequestFile: global.cfg.loader.text.errorRequestFile,
			errorTimeoutServer: global.cfg.loader.text.errorTimeoutServer
		}
	};

	json.landingFiles = shared.getFileNamesOrAllInOne(global.cfg.landing);

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

/*
 necesitaba hacer el minificado despues de la bajada, me complico la vida...,
 esto fue lo mejor que me quedo, luego de varias horas ...
 problemas con syncronismo y argumentos
 */
gulp.task('make:bower', ['download:bower'], function(cb) {

	var i = 0,
		len = global.cfg.varLibsToMin.length;

	if(len===0){cb();}

	global.cfg.varLibsToMinI = 0;

	for (; i < len; i++) {
		var s = global.cfg.varLibsToMin[i];
		gulp.src(s.jsDev)
			.pipe(uglify())
			.pipe(rename(s.name))
			.pipe(gulp.dest(s.pa))
			.on('finish', function (a,b,c) {
				console.logGreen('Minification of '+global.cfg.varLibsToMin[global.cfg.varLibsToMinI].name+'...');
				global.cfg.varLibsToMinI++;
				if(global.cfg.varLibsToMinI===len){
					cb();
				}
			});
	}

});

gulp.task('download:bower',['generator:bower'], function() {
	return bowerify({ directory: './'+ global.cfg.folders.bower});
});

gulp.task('generator:bower',['parse:bower'],  function(cb) {
	//update bower.json file
	fs.writeFile('bower.json', JSON.stringify(global.cfg.varBower, null, '\t'), function (err) {
		if (err) {
			console.logRed('Error:');
			console.error(err);
			throw err;
		}
		console.logGreen('Bower.json generated');
		cb();
	});
});


gulp.task('parse:bower', function(cb) {
	var bower = Object.keys(global.cfg.loader.bower),
		ambient = global.cfg.loader.release ? 'prod' : 'dev',
		rJs = [],
		rCss = [],
		libsToMin = [],
		rBower = {
			'name': global.cfg.name + ' - by '+ global.cfg.loader.name,
			'version' : global.cfg.loader.version,
			'description' : 'auto generated, don\'t change it, you should use gulp-config to change it and run \'gulp i\'',
			'dependencies': {}
		};

	var i = 0,
		l = bower.length;

	for (; i < l; i++) {
		var o = global.cfg.loader.bower[bower[i]],
			js = [],
			css = [];

		//set variable on loader app
		global.cfg.loader[bower[i]] = true;

		//set to null if you don't want some lib
		if(!o){
			global.cfg.loader[bower[i]] = false;
			continue;
		}

		if(o['js-'+ ambient]){
			js = o['js-'+ ambient].map(function (item) {
				return './'+ global.cfg.folders.bower +'/'+item;
			});
		}

		if(o['css-'+ ambient]){
			css = o['css-'+ ambient].map(function (item) {
				return './'+ global.cfg.folders.bower +'/'+item;
			});
		}

		if (js && js.length > 0) {

			if(ambient==='prod' && o['generate-js']){

				var jsDev = o['js-dev'].map(function (item) {
					return './'+ global.cfg.folders.bower  +'/'+item;
				});

				js.forEach(function (element,pos) {

					if(fs.existsSync(element)){return;}

					var pathSrc = element.lastIndexOf('/'),
						name = element.substr(pathSrc+1),
						pathDest = element.substr(0, pathSrc);

					libsToMin.push({jsDev:jsDev[pos],name:name,pa:pathDest});

				});

			}

			rJs = rJs.concat(js);
		}

		if (css && css.length > 0) {
			rCss = rCss.concat(css);
		}

		if (o.version !== '') {
			rBower.dependencies[bower[i]] = o.version;
		}

	}

	//horrible, I know
	global.cfg.varLibsToMin = libsToMin;
	global.cfg.varBower = rBower;
	global.cfg.varJs = rJs;
	global.cfg.varCss = rCss;

	cb();
});
