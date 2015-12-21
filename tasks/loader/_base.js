/**
 * Created by Crystian on 15/02/02.
 */

(function(){
	'use strict';

	var fs       = require('fs-extra'),
			del      = require('del'),
			_        = require('lodash'),
			utils    = require('../shared/utils'),
			rename   = require('gulp-rename'),
			cheerio  = require('gulp-cheerio'),
			replace  = require('gulp-replace'),
			injector = require('./_injector'),
			inject   = require('gulp-inject'),
			gutil    = require('gulp-util');

	//replace references on index.html
	gulp.task('_makeBase', ['_makeBower', '_makeIndex', '_makeConfig', '_makeCss'], function(){
		var loadingHtml = global.cfg.pathFwk + global.cfg.loader.folders.loadings + global.cfg.loader.loading + '/loading.html',
				loadingCSS  = global.cfg.pathFwk + global.cfg.loader.folders.loadings + global.cfg.loader.loading + '/loading.css';

		global.cfg.varCss = utils.normalizePathFwk(global.cfg.varCss);
		global.cfg.varJs = utils.normalizePathFwk(global.cfg.varJs);

		return gulp.src(global.cfg.pathFwk + global.cfg.loader.folders.www + global.cfg.loader.filesDest.index)
			.pipe(utils.debugeame())
			.pipe(injector.injectContent(loadingHtml, 'loadingHtml'))
			.pipe(inject(gulp.src(loadingCSS, {read: false}), {name: 'loadingCss', relative: true, removeTags: true}))
			.pipe(inject(gulp.src(global.cfg.varCss, {read: false}), {name: 'bower', relative: true, removeTags: true}))
			.pipe(inject(gulp.src(global.cfg.varJs, {read: false}), {name: 'bower', relative: true, removeTags: true}))
			.pipe(gulp.dest(global.cfg.pathFwk + global.cfg.loader.folders.www));
	});


	// make a new index on loader folder
	gulp.task('_makeIndex', function(){
		return gulp.src(global.cfg.pathFwk + global.cfg.loader.folders.www + 'index.tpl.html')
			.pipe(utils.debugeame())
			.pipe(rename(global.cfg.loader.filesDest.index))
			.pipe(cheerio({
				run: function($){
					var cfg = global.cfg;
					$('#pageTitle').text(cfg.loader.text.title);
					$('#pageDescription').attr('content', cfg.loader.text.description);
					$('#pageKeyword').attr('content', cfg.loader.text.keyword);
					$('#pageAuthor').attr('content', cfg.loader.text.author);
					$('#noscript').html(cfg.loader.text.noscript);
					$('#viewport').attr('content', cfg.loader.viewport);
					$('#contentSecurity').attr('content', cfg.loader.contentSecurity);
				}
			}))
			.pipe(replace('<!--msgTpl-->', '<!-- REMEMBER, this file is generated, don\'t change it, because you can lost it -->'))
			.pipe(replace('&apos;', '\''))//it's for contentSecurity apost, we cannot inject that one
			.pipe(gulp.dest(global.cfg.pathFwk + global.cfg.loader.folders.www));
	});

	gulp.task('_makeConfig', function(cb){

		//all variables in app, will pass to app
		var json = global.cfg.app;

		//variables shared between loader build and loader app
		json.loader = {
			version: global.cfg.loader.version,
			text: global.cfg.loader.text
		};

		//json.compress = global.cfg.compress;
		//json.isCordovaDevice = global.cfg.isCordovaDevice;
		//json.compatibilityMatrix = global.cfg.compatibilityMatrix;
		//json.debugZoneActive = global.cfg.debugZoneActive;
		//json.mixpanel = global.cfg.mixpanel;
		//json.analytics = global.cfg.analytics;
		//json.consoleError = global.cfg.consoleError;
		//json.fastclick = !!(global.cfg.loader.bower.fastclick);
		//json.showDeviceInfo = global.cfg.showDeviceInfo;
		//json.showSkeletor = global.cfg.showSkeletor;
		//json.contentEditable = global.cfg.contentEditable;

		json.oneRequest = false;//flagOneRequest

		//incompatibleByFeatures: global.cfg.loader.text.incompatibleByFeatures,
		//incompatibleByDiag: global.cfg.loader.text.incompatibleByDiag,
		//semiIncompatible: global.cfg.loader.text.semiIncompatible,
		//faqLink: global.cfg.loader.text.faqLink,
		//errorRequestFile: global.cfg.loader.text.errorRequestFile,
		//errorTimeoutServer: global.cfg.loader.text.errorTimeoutServer

		var compatibilityTpl =
					'\n\n//primer chequeo, si no es compatible con esto, se cancela el loader!\n' +
					'_loaderCfg.compatibilityFirst = function () {\n' +
					'	//jshint maxcomplexity:false, quotmark:false\n' +
					'	\'use strict\';\n' +
					'	var arr = [];\n' +
					global.cfg.loader.compatibilityFirst +
					'};\n';

		var text = '/* Remember, this file is autogenerate, don\'t change it */\n\n' +
			'//jshint maxlen:false\n' +
			'var _loaderCfg = ' + JSON.stringify(json, null, '\t') + ';' +
			compatibilityTpl;


		if(gutil.env.testMode){
			var jsonCloned = _.clone(json);

			//TODO improve with server and test
			//just for share data between unit tests
			jsonCloned.test = {
				server: {
					path: global.cfg.pathFwk,
					pathPrj: global.cfg.pathPrj + global.cfg.app.folders.www,
					pathDist: global.cfg.pathPrj + global.cfg.app.folders.dist,
					folder: global.cfg.loader.folders.www,
					folderDist: '/',
					ip: global.cfg.ip,
					ports: global.cfg.ports
				}
			};

			jsonCloned.cfg = global.cfg;

			fs.writeFile('./config.json',
				JSON.stringify(jsonCloned, null, '\t'),
				function(err){
					if(err){
						console.logRed(err);
					}
				});
		}

		fs.writeFile(global.cfg.pathFwk + global.cfg.loader.folders.www + 'config.js',
			text,
			function(err){
				if(err){
					console.logRed(err);
				} else {
					console.logGreen('Config.js generated');
				}
				cb();
			});
	});

	gulp.task('_removeBuild', function(){
		return del([global.cfg.pathPrjBuild,
			global.cfg.pathPrjBuild + global.cfg.loader.folders.screens], {force: true});
	});

	gulp.task('_removeTemp', function(){
		return del([global.cfg.pathPrjBuild + global.cfg.app.folders.temp], {force: true});
	});

}());