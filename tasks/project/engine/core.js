/**
 * Created by Crystian on 3/16/2015.
 *
 * This is the engine, it do a lot of magic, intentionally all in the same file.
 * Don't touch or you will dead! ... some day
 */
(function(){
	'use strict';

	//libs
	var _      = require('lodash'),
			globby = require('globby'),
			fs     = require('fs-extra'),
			path   = require('path'),
			merge2 = require('merge2'),
			rename = require('gulp-rename'),
			gutil  = require('gulp-util');
	//	commons = require('../commons'),
	//	fs = require('fs-extra'),
	//	StreamQueue = require('streamqueue'),
	//	concat = require('gulp-concat'),
	//	shared = require('./shared'),

	//	sprite = require('gulp-sprite-generator'),
	//	LZString = require('../../vendors/lz-string/libs/lz-string'),
	//	imagemin = require('gulp-imagemin'),
	//	pngquant = require('imagemin-pngquant'),
	//	cache = require('gulp-cache'),
	//	manifest = require('gulp-manifest'),
	//filesRequired = require('gulp-files-required'),

	//engine libs
	var utils = require('../../shared/utils'),
			aux   = require('./auxiliar'),
			www   = require('./www'),
			css   = require('./css');

	//vars
	var appsJson = 'apps.json',
			appJson  = 'app.json';

	var defaults = {
		group: {
			'files': [],								//extension define the flow, can be tipicals and file for preprocessor, automaticaly determine with one will be use
			'overwrite': true,					//specially for libs, just make it once
			'ignoreOnRelease': false,		//ignore on dev time, request by request
			'overwriteOnRelease': false,//
			'minificated': false,				//if it is a lib for don't re do the minifcation (over overwrite!)
			'autoPrefixer': true,				//auto prefix when source is active
			'linter': false,						//if you want to lint, will not apply for libraries
			'linterForce': false,				//if fail, return an error, otherwise continue without break the process
			'backupExtension': 'original',//if it has replaces it will make a backup with this postfix
			'makeBackup': true,					//if there are replaces (original)
			//'genSprite': true,				//generate sprite
			'generateMin': false,				//it should be create a minificate version
			'minExtension': 'min',			//prefix for file name minificated
			'replaces': {
				'original': [], 					//modificate orginal version
				'pre': [									//pre minificatedd
					//["(border.*\\:)[ ]?(\\w*)", "$1 50em"]
				],
				'post': [									//post minificatedd
					//["(border.*\\:)[ ]?(\\w*)", "$1 50em"]
				]
			},
			'active': 'true'						//it will eval this field, for temp use
		},
		validCssPreproExtensions: ['sass', 'scss', 'less', 'styl'],
		validJsPreproExtensions: ['coffee', 'ts'],
		validHtmlPreproExtensions: ['jade'],
		validExtensions: ['html', 'js', 'css']
	};

	function getFilesByGroupAndAppsStream(byApp, byFile){
		var mainStream = merge2(gulp.src('noop')),//because if have not one, might give an error
				apps       = getFilesByGroupAndApps(byApp, byFile);

		apps.forEach(function(app){
			app.files.forEach(function(file){
				if(file){
					mainStream.add(file);
				}
			});
		});

		return mainStream;
	}

	/**
	 * this method run each app, and after groups from app, you can intercep each app or group
	 *
	 * @param fnEachApp()
	 * @param fnEachFile()
	 * @returns {Array}
	 */
	function getFilesByGroupAndApps(fnEachApp, fnEachFile){
		var pth       = global.cfg.pathPrj + global.cfg.app.folders.www,
				apps      = require(pth + appsJson),
				fnEachApp = fnEachApp || function(a){return a;},
				r         = [];

		apps.forEach(function(appName){
			var appFiles = fnEachApp(getFilesByGroup(fnEachFile, appName, pth), appName, pth);

			r.push({name: appName, files: appFiles});
		});

		return r;
	}

	/**
	 * run each app and each file config from apps.json and app.json sent
	 */
	function getFilesByGroup(fnEachFile, appName, pth){
		var groups     = require(pth + appName + '/' + appJson),
				_path      = pth + appName,
				fnEachFile = fnEachFile || function(a){return a;},
				r          = [];

		if(groups.length === 0){
			return;
		}

		groups.forEach(function(group){
			var config = _.merge({}, defaults.group, group);

			if(aux.isNotActive(config) || (global.cfg.app.release && group.ignoreOnRelease)){
				return;
			}
			var files = globby.sync(config.files, {cwd: _path});

			if(files.length === 0){
				console.logRed('APPFACTORY: Files not found');
				utils.exit(1);
			}

			files.forEach(function(file){
				var _file = new gutil.File({
					base: pth + appName,
					cwd: pth,
					path: pth + appName + '/' + file
				});

				r.push(fnEachFile(_file, config, appName, pth));
			});
		});

		return r;
	}

	function doMagic(file, config, appName, pth, typeConfig){
		var fileName    = utils.getFileName(file.path),
				type        = utils.getExtensionFile(file.path),
				fileNameExt = utils.getFileNameWithExtension(file.path),
				fileNameMin = file.base + '/' + fileName + '.' + config.minExtension + '.' + typeConfig.extensionFinal,
				dest        = file.base + '/' + fileName + '.' + typeConfig.extensionFinal,
				genMinFile  = false,
				stream;

		//if it is minificate, it'll ignore
		if(config.minificated){
			return;
		}

		if(!typeConfig.isValidation(type)){
			return;
		}

		var forceOverwrite = (global.cfg.app.release && config.overwriteOnRelease);

		//It is a complex condition, I prefer more explict (and redundant)
		if(!config.overwrite || forceOverwrite){
			if(config.generateMin){

				if(utils.fileExist(fileNameMin) && !forceOverwrite){
					console.debug('File to min found, it doesn\'t overwrite (' + fileNameExt + ')');
					return;
				}

				genMinFile = true;

			} else {

				if(utils.fileExist(dest) && !forceOverwrite){
					console.debug('File to preprocess found, it doesn\'t overwrite (' + fileNameExt + ')');
					return;
				}
			}
		} else {
			if(config.generateMin){
				genMinFile = true;
			}
		}

		if(fileName.indexOf('.' + config.backupExtension) !== -1){
			console.debug(fileNameExt + ': original detected, it will ignore');
			return;
		}

		//starting a new stream
		stream = gulp.src(file.path)
			.pipe(utils.debugeame())
		;

		if(config.replaces.original.length > 0){
			stream = modifyOriginal(stream, file.path, config);
		}

		if(fileName.indexOf('.' + config.minExtension) >= 0 && type === typeConfig.extensionFinal){
			console.debug(fileNameExt + ': minificated detected'); //and ingnored it
			return stream;
		}

		stream = typeConfig.processFile(stream, config, fileName, type);

		stream = typeConfig.linter(stream, config);

		//TODO test it!
		stream = typeConfig.removeCode(stream);

		if(genMinFile || global.cfg.app.release){
			stream = replaces(stream, config.replaces.pre, fileNameExt);

			stream = typeConfig.minifyFile(stream);

			stream = replaces(stream, config.replaces.post, fileNameExt);

			if(genMinFile){
				stream = stream.pipe(rename(fileNameMin));
			}
		}

		if(!genMinFile && type === typeConfig.extensionFinal){
			return stream;
		}

		return stream.pipe(gulp.dest(file.base));
	}

	function modifyOriginal(stream, file, config){
		var filenameBackup = utils.setPreExtensionFilename(file, config.backupExtension);

		if(config.makeBackup && !utils.fileExist(filenameBackup)){
			console.debug('Replaces on original file: ' + utils.getFileNameWithExtension(file));
			fs.copySync(file, filenameBackup);
		}

		stream = aux.replace(stream, config.replaces.original)
			.pipe(gulp.dest(path.dirname(file)));

		return stream;
	}

	function replaces(stream, replaces, file){
		console.debug('Replaces on file: ' + file);

		if(replaces && replaces.length > 0){
			return aux.replace(stream, replaces);
		}

		return stream;
	}

	exports.getFilesByGroupAndAppsStream = getFilesByGroupAndAppsStream;
	exports.getFilesByGroupAndApps = getFilesByGroupAndApps;
	exports.getFilesByGroup = getFilesByGroup;
	exports.doMagic = doMagic;
	exports.modifyOriginal = modifyOriginal;
	exports.replaces = replaces;
	exports.defaults = defaults;

}());


//exports.genAppCache = function() {
//	if(!global.cfg.release){return;}
//
//	var fileName = global.cfg.projectCode + global.cfg.AppCacheFileName;
//
//	var appFile = gulp.src([global.cfg.folders.build+ '/**/*'])
//		.pipe(manifest({
//			hash: true,
//			preferOnline: false,
//			network: ['http://*', 'https://*', '*'],
//			filename: fileName,
//			exclude: fileName
//		}))
//		.pipe(gulp.dest(global.cfg.folders.build));
//
//	var htmlFile = gulp.src(global.cfg.folders.build +'/'+ global.cfg.loader.filesDest.index)
//		.pipe(replace('<html>','<html manifest="'+ fileName +'">'))
//		.pipe(gulp.dest(global.cfg.folders.build));
//
//	return aux.merge(appFile, htmlFile);
//};
//
//exports.optimizeImages = function() {
//	return gulp.src(global.cfg.folders.build +'/img/**/*')
//		.pipe(commons.debugeame())
//		.pipe(imagemin({
//			progressive: true,
//			svgoPlugins: [{removeViewBox: false}],
//			use: [pngquant()]
//		}))
//		.pipe(gulp.dest(global.cfg.folders.build + '/img'));
//};
//
//exports.clearCache = function (done) {
//	return cache.clearAll(done);
//};

//			//just for remove header a footer comments, it's ok here, not move
//			if(type === 'js'){
//				stream = stream.pipe(uglify({
//					output: {beautify: false},
//					compress: {
//						sequences: true, hoist_funs:false, dead_code: false,
//						drop_debugger: true, conditionals: false,
//						unused: false, if_return:false, side_effects:false},
//					mangle: false
//				}));
//			}
//
//	['css','js','html'].map(function (v) {
//		streamsFinal = aux.merge(streamsFinal, _concat(streams, v, appName));
//	});
//
//function runJsonify(path, app, options){
//
//	var temp = global.cfg.folders.temp,
//		json = {};
//
//	json.v = global.cfg.version;
//	json.j = fs.readFileSync(temp +'/'+ app +'.js', {encoding: 'utf8'});
//	json.c = fs.readFileSync(temp +'/'+ app +'.css', {encoding: 'utf8'});
//	json.h = fs.readFileSync(temp +'/'+ app +'.html', {encoding: 'utf8'});
//
//	var b = JSON.stringify(json);
//
//	if(cfg.compress){
//		b = LZString.compressToUTF16(b);
//		console.logGreen(app +' compressed!');
//	}
//
//	fs.writeFileSync(global.cfg.folders.build +'/'+ app +'.json', b);
//
//	console.logGreen(app +' generated!');
//}
//
//function _concat(_streams, _type, _appName){
//
//	var s = _streams[_type].done();
//	s = s.pipe(concat(_appName+'.'+ _type, {newLine: ' '}))
//		.pipe(gulp.dest(global.cfg.folders.temp));
//
//	return s;
//}
//
//
//var _handle = {
//	'css' : function(stream, file, appName) {
//		//console.logWarn('CSS');
//
//		if(!file.minificated && file.genSprite){
//
//			var spriteOutput = stream
//				.pipe(sprite({
//					baseUrl:         './',
//					spriteSheetName: appName +'.png',
//					spriteSheetPath: 'img',
//					padding: 1,
//					algorithm: 'binary-tree',
//					//isRetina: false,
//					//engine: 'gm',
//					verbose: !!(gutil.env.debug),
//					groupBy: [
//						function(image) {
//							if (gutil.env.verbose) {
//								console.dir(image);
//							}
//							//getting number of sprite folder
//							var num = /(sprite)(.)(\/)/.exec(image.url),
//								group = 1;
//
//							if(num !== null && num.length > 0){
//								group = num[2];
//							}
//
//							//group += '.'+utils.getExtensionFile(image.path);
//							return ''+group;
//						}
//					],
//					engineOpts: {
//						imagemagick: false
//					}
//				}));
//
//			spriteOutput.img
//				//.pipe(imageminOptipng({optimizationLevel: 3})())
//				//.pipe(imagemin({
//				//	progressive: true,
//				//	svgoPlugins: [{removeViewBox: false}],
//				//	use: [pngquant()]
//				//}))
//
//				//.pipe(gm(function(gmfile) {
//				//	gmfile.quality(85).setFormat('jpg');
//				//	return gmfile;
//				//}))
//
//				.pipe(gulp.dest(global.cfg.folders.build +'/img'));
//
//			stream = spriteOutput.css.pipe(replace('assets/',''));
//		}
//

//	'html': function(stream, file) {
//		//console.logWarn('HTML');
//
//		stream = shared.htmlMin(stream);
//		return stream;
//	}
//};