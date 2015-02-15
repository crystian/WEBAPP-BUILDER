/**
* Created by Crystian on 15/02/02.
*/

var gulp = require('gulp'),
	//debug = require('gulp-debug'),
	uglify = require('gulp-uglify'),
	inject = require('gulp-inject'),
	replace = require('gulp-replace'),
	rename = require('gulp-rename'),
	fs = require('fs'),
	bowerify = require('gulp-bower'),
	cheerio = require('gulp-cheerio'),
	gutil = require('gulp-util');

gulp.task('bowerify', ['bowerDownload','makeIndex','makeConfig'], function() {
	//replace references on index.html
	return gulp.src(global.cfg.folders.www +'/index.html')
		.pipe(inject(gulp.src(global.cfg.varJs, {read: false}), {name: 'bower', relative:'true'}))
		.pipe(inject(gulp.src(global.cfg.varCss, {read: false}), {name: 'bower', relative:'true'}))
		.pipe(gulp.dest(global.cfg.folders.www));
});

gulp.task('makeIndex', ['copy:indexTpl'], function () {
	return gulp.src(global.cfg.folders.www + '/index.html')
		//.pipe(debug({verbose: true}))
		.pipe(cheerio({
			run: function ($) {
				var cfg = global.cfg;
				$('#pageTitle').text(cfg.textPageTitle);
				$('#pageDescription').attr('content',cfg.textPageDescription);
				$('#pageKeyword').attr('content',cfg.textPageKeyword);
				$('#pageAuthor').attr('content',cfg.textPageAuthor);
				$('#noscript').html(cfg.textNoscript);
				$('#viewport').attr('content',cfg.viewport);
			}
		}))
		.pipe(replace('<!--msgTpl-->','<!-- REMEMBER, this file is generated, don\'t change it, because you can lost it -->'))
		.on('error', console.error.bind(console))
		.pipe(gulp.dest(global.cfg.folders.www));
});

gulp.task('copy:indexTpl',function () {
	return gulp.src(global.cfg.folders.www + '/index.tpl.html')
		.on('error', console.error.bind(console))
		.pipe(rename('index.html'))
		.pipe(gulp.dest(global.cfg.folders.www));
});

gulp.task('makeConfig', function (cb) {
	var json = {};
	json.gaId = global.cfg.gaId;
	json.release = global.cfg.release;
	json.gaAppName = global.cfg.gaAppName;
	json.gaAppId = global.cfg.gaAppId;
	json.gaAppInstaller = global.cfg.gaAppInstaller;
	json.compatibilityMatrix = global.cfg.compatibilityMatrix;
	json.textIncompatibleByFeatures = global.cfg.textIncompatibleByFeatures;
	json.textIncompatibleByDiag = global.cfg.textIncompatibleByDiag;
	json.textSemiIncompatible = global.cfg.textSemiIncompatible;
	json.textFaqLink = global.cfg.textFaqLink;
	json.textErrorRequestFile = global.cfg.textErrorRequestFile;
	json.textErrorTimeoutServer = global.cfg.textErrorTimeoutServer;
	json.loaderVersion = global.cfg.loaderVersion;
	json.version = global.cfg.version;
	json.isCordovaDevice = global.cfg.isCordovaDevice;
	json.consoleError = global.cfg.consoleError;
	json.fastClick = global.cfg.fastClick;
	json.autoprefixer = global.cfg.autoprefixer;
	json.analytics = global.cfg.analytics;
	json.analyticsActive = global.cfg.analyticsActive;
	json.compressor = global.cfg.compressor;

	compatibilityTpl =
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
				console.log(err);
			} else {
				console.log('Config.js generated');
			}
			cb();
		});
});

gulp.task('bowerDownload',['bowerGenerator'], function(cb) {
	return bowerify({ directory: './'+ global.cfg.folders.bower});
});

gulp.task('bowerGenerator',['parseInstaller'],  function(cb) {
	//update bower.json file
	fs.writeFile('bower.json', JSON.stringify(global.cfg.varBower, null, '\t'), function (err) {
		if (err) {
			console.error('err',err);
			throw err;
		}
		console.log('Bower.json generated');
		cb();
	});
});

gulp.task('parseInstaller', function() {
	var bower = global.cfg.bower,
		ambient = global.cfg.release ? 'dev' : 'prod',
		rJs = [],
		rCss = [],
		rBower = {
			'name': global.cfg.name + ' - by Power Loader',
			'version' : global.cfg.version,
			'description' : 'auto generated, don\'t change it, you should use gulp-config to change it and run \'gulp i\'',
			'dependencies': {}
		};

	var i = 0,
		l = bower.length;

	for (; i < l; i++) {
		var o = bower[i],
			js = [],
			css = [];

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

					var p = element.lastIndexOf('/'),
						name = element.substr(p+1),
						pa = element.substr(0, p);

					gulp.src(jsDev[pos])
						.pipe(uglify())
						.pipe(rename(name))
						.pipe(gulp.dest(pa));
				});

			}

			rJs = rJs.concat(js);
		}

		if (css && css.length > 0) {
			rCss = rCss.concat(css);
		}

		if (o.version !== '') {
			rBower.dependencies[o.name] = o.version;
		}

	}

	//horrible, I know
	global.cfg.varBower = rBower;
	global.cfg.varJs = rJs;
	global.cfg.varCss = rCss;

});
