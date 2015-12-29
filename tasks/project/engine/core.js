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
			gutil  = require('gulp-util'),
			concat = require('gulp-concat');

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
			'ignoreOnBuild': false,		//ignore on
			'ignoreOnDist': false,		//ignore on
			'overwriteOnRelease': false,//
			'minificated': false,				//if it is a lib for don't re do the minifcation (over overwrite!) and it has two versions, ensure use minExtension
			'autoPrefixer': true,				//auto prefix when source is active
			'linter': false,						//if you want to lint, will not apply for libraries
			'linterForce': false,				//if fail, return an error, otherwise continue without break the process
			'backupExtension': 'original',//if it has replaces it will make a backup with this postfix
			'genSprite': false,				//generate sprite
			'generateMin': false,				//it should be create a minificate version
			'forceUseMin': false,// for generateMin and minificated for dev time on release = false
			'minExtension': 'min',			//prefix for file name minificated
			'replaces': {
				'original': [], 					//modificate orginal version
				'originalMin': [], 					//modificate min orginal version
				'originalDist': [],				//only for orignals
				'prePreprocess': [],
				'postPreprocess': [],
				'prePreprocessDist': [],
				'postPreprocessDist': [],
				'preMin': [									//pre minificatedd
					//["(border.*\\:)[ ]?(\\w*)", "$1 50em"]
				],
				'postMin': [									//post minificatedd
					//["(border.*\\:)[ ]?(\\w*)", "$1 50em"]
				]
			},
			'active': 'true'						//it will eval this field, for temporal use
		},
		validCssPreproExtensions: ['sass', 'scss', 'less', 'styl'],
		validJsPreproExtensions: ['coffee', 'ts'],
		validHtmlPreproExtensions: ['jade'],
		validExtensions: ['html', 'js', 'css']
	};

	function getFilesByGroupAndAppsStream(byApp, byFile, type){
		var mainStream = merge2(gulp.src('noop')),//because if have not one, might give an error
				apps       = getFilesByGroupAndApps(byApp, byFile);

		apps.forEach(function(app){
			var appStream = merge2(gulp.src('noop'));

			app.files.forEach(function(file){
				if(file){
					appStream.add(file);
				}
			});

			appStream = genDistFile(appStream, app.name, type);
			mainStream.add(appStream);
		});

		return mainStream;
	}

	function genDistFile(stream, appName, type){
		if(global.cfg.isDist){
			var newLine = '\n';
			switch (type){
				case 'css':
				case 'html':
					newLine = '';
					break;
				case 'js':
					newLine = ';';
					break;
			}

			stream = stream
					.pipe(concat(appName + '.' + type, {newLine: newLine}))
					.pipe(gulp.dest(global.cfg.app.folders.build + global.cfg.app.folders.temp));
		}
		return stream;
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
			var appFilesStream = fnEachApp(getFilesByGroup(fnEachFile, appName, pth), appName, pth);
			r.push({name: appName, files: appFilesStream});
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

			if(aux.isNotActive(config) ||
				(global.cfg.app.release && group.ignoreOnRelease) ||
				(global.cfg.isDist && group.ignoreOnDist) ||
				(!global.cfg.isDist && group.ignoreOnBuild)
			){
				return;
			}

			var files = globby.sync(config.files, {cwd: _path});

			configValidator(files, config);

			files.forEach(function(file){
				var pathResolved = path.resolve(pth, appName, path.dirname(file));
				var _file = new gutil.File({
					base: pathResolved,
					cwd: pth,
					path: path.resolve(pathResolved, path.basename(file))
				});

				r.push(fnEachFile(_file, config, appName, pth));
			});
		});

		return r;
	}

	function configValidator(files, config){

		if(files.length === 0){
			console.logRed('APPFACTORY: Files not found, check your app.json');
			utils.exit(2);
		}

		if(config.minificated && config.generateMin){
			console.logRed('APPFACTORY Config: generateMin and minificated option are not compatibles (on "' + files + '")');
			utils.exit(2);
		}
	}

	function doMagic(file, config, appName, pth, typeConfig){
		var fileName      = utils.getFileName(file.path),
				type          = utils.getExtensionFile(file.path),
				fileNameExt   = utils.getFileNameWithExtension(file.path),
				fileNameWOMin = utils.removePreExtensionFilename(file.path, config.minExtension),
				fileNameMin   = file.base + '/' + fileName + '.' + config.minExtension + '.' + typeConfig.extensionFinal,
				dest          = file.base + '/' + fileName + '.' + typeConfig.extensionFinal,
				isMin         = fileName.indexOf('.' + config.minExtension) !== -1,
				genMinFile    = false,
				stream;

		//just valid extensions
		if(!(typeConfig.validPreproExtension.indexOf(type) !== -1 || type === typeConfig.extensionFinal)){
			return;
		}

		//if it is minificate, it'll ignore, just check for replaces on original
		if(config.minificated){
			if(fileName.indexOf('.' + config.backupExtension) !== -1){
				return;
			}

			//yes, it can refactor, but is so complex for 3am, and I want to be more explicit
			if(isMin){//minified file
				if(config.replaces.originalMin.length > 0){
					stream = modifyOriginal(gulp.src(file.path), file.path, config);
				}
				if(config.replaces.original.length > 0){
					stream = modifyOriginal(gulp.src(fileNameWOMin), fileNameWOMin, config);
				}
			} else {//normal file
				if(config.replaces.originalMin.length > 0){
					//var fileNameMin = utils.setPreExtensionFilename(file.path, config.minExtension);
					stream = modifyOriginal(gulp.src(fileNameMin), fileNameMin, config);
				}
				if(config.replaces.original.length > 0){
					stream = modifyOriginal(gulp.src(file.path), file.path, config);
				}
			}

			if(!stream){
				var fileNameToBeOrigin = file.path;

				if(global.cfg.app.release || config.forceUseMin){
					fileNameToBeOrigin = fileNameMin;
				}

				stream = gulp.src(fileNameToBeOrigin);
			}


			if(config.replaces.originalDist.length > 0){
				stream = aux.replace(stream, config.replaces.originalDist);
			}

			return stream;
		}

		//overwrite
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

		if(config.replaces.original.length > 0 || config.replaces.originalMin.length > 0){
			stream = modifyOriginal(stream, file.path, config);
		}

		if(isMin && type === typeConfig.extensionFinal){
			console.debug(fileNameExt + ': minificated detected'); //and ingnored it
			return stream;
		}

		if(typeConfig.validPreproExtension.indexOf(type) !== -1){

			stream = replaces(stream, config.replaces.prePreprocess, fileNameExt);

			if(global.cfg.isDist){
				stream = replaces(stream, config.replaces.prePreprocessDist, fileNameExt);
			}

			stream = typeConfig.preprocessFile(stream, config, fileName, type);

			stream = replaces(stream, config.replaces.postPreprocess, fileNameExt);

			if(global.cfg.isDist){
				stream = replaces(stream, config.replaces.postPreprocessDist, fileNameExt);
			}
		}

		if(config.linter){
			stream = typeConfig.linter(stream, config);
		}

		if(typeConfig.postLinter){
			stream = typeConfig.postLinter(stream, config, appName);
		}

		if(typeConfig.removeCode){
			stream = typeConfig.removeCode(stream);
		}

		if(genMinFile || global.cfg.isDist){
			stream = replaces(stream, config.replaces.preMin, fileNameExt);

			if(!gutil.env.noMin){//for debug
				stream = typeConfig.minifyFile(stream);
			}

			stream = replaces(stream, config.replaces.postMin, fileNameExt);

			if(genMinFile){
				stream = stream.pipe(rename(fileNameMin));
			}
		}

		//don't overwrite the same source file
		if(!genMinFile && type === typeConfig.extensionFinal){
			return stream;
		}

		//just for min files
		stream = stream.pipe(gulp.dest(file.base));
		return stream;
	}

	function modifyOriginal(stream, file, config){
		var filenameBackup = utils.setPreExtensionFilename(file, config.backupExtension);

		if(!utils.fileExist(filenameBackup)){
			console.debug('Backup file: ' + utils.getFileNameWithExtension(file));
			try {
				fs.copySync(file, filenameBackup);
			} catch (e) {
				console.logRed('File not found: ' + file + ' ensure exist or not use "minificated" option');
				utils.exit(1);
			}
		} else {
			console.debug('Recover backup file: ' + utils.getFileNameWithExtension(file));
			try {
				fs.copySync(filenameBackup, file);
			} catch (e) {
				console.logRed('File not found: ' + file + ' ensure exist or not use "minificated" option');
				utils.exit(1);
			}

		}

		var replaces = file.indexOf('.' + config.minExtension + '.') === -1 ? config.replaces.original : config.replaces.originalMin;

		if(replaces.length > 0){
			stream = aux.replace(stream, replaces)
				.pipe(gulp.dest(path.dirname(file)));
		}

		return stream;
	}

	function makeAppsJson(){
		var pth  = global.cfg.pathPrj + global.cfg.app.folders.www,
				apps = require(pth + appsJson);

		apps.forEach(function(appName){
			jsonify(appName);
		})
	}

	function jsonify(appName){

		var temp     = global.cfg.app.folders.build + global.cfg.app.folders.temp,
				json     = {},
				jsFile   = temp + appName + '.js',
				cssFile  = temp + appName + '.css',
				htmlFile = temp + appName + '.html';

		json.v = global.cfg.app.version;

		if(utils.fileExist(jsFile)){
			json.j = fs.readFileSync(jsFile, {encoding: 'utf8'});
		}
		if(utils.fileExist(cssFile)){
			json.c = fs.readFileSync(cssFile, {encoding: 'utf8'});
		}

		if(utils.fileExist(htmlFile)){
			json.h = fs.readFileSync(htmlFile, {encoding: 'utf8'});
		}

		var files = JSON.stringify(json);

		if(cfg.compress){
			var LZString = require('../../../vendors/lz-string/libs/lz-string');
			files = LZString.compressToUTF16(files);
			console.logGreen(appName + ' compressed!');
		}
		fs.mkdirsSync(global.cfg.app.folders.dist);
		fs.writeFileSync(global.cfg.app.folders.dist + '/' + appName + '.json', files);

		console.logGreen(appName + ' generated!');
	}

	function replaces(stream, replaces, file){

		if(replaces && replaces.length > 0){
			console.debug('Replaces on file: ' + file + ' replace: ' + replaces);
			stream = aux.replace(stream, replaces);
		}

		return stream;
	}

	exports.getFilesByGroupAndAppsStream = getFilesByGroupAndAppsStream;
	exports.getFilesByGroupAndApps = getFilesByGroupAndApps;
	exports.getFilesByGroup = getFilesByGroup;
	exports.doMagic = doMagic;
	exports.modifyOriginal = modifyOriginal;
	exports.makeAppsJson = makeAppsJson;
	exports.replaces = replaces;
	exports.defaults = defaults;

}());

/*

 exports.genAppCache = function() {
 if(!global.cfg.release){return;}

 var fileName = global.cfg.projectCode + global.cfg.AppCacheFileName;

 var appFile = gulp.src([global.cfg.folders.build+ '/!**!/!*'])
 .pipe(manifest({
 hash: true,
 preferOnline: false,
 network: ['http://!*', 'https://!*', '*'],
 filename: fileName,
 exclude: fileName
 }))
 .pipe(gulp.dest(global.cfg.folders.build));

 var htmlFile = gulp.src(global.cfg.folders.build +'/'+ global.cfg.loader.filesDest.index)
 .pipe(replace('<html>','<html manifest="'+ fileName +'">'))
 .pipe(gulp.dest(global.cfg.folders.build));

 return aux.merge(appFile, htmlFile);
 };
 */

/*
 //just for remove header a footer comments, it's ok here, not move
 if(type === 'js'){
 stream = stream.pipe(uglify({
 output: {beautify: false},
 compress: {
 sequences: true, hoist_funs:false, dead_code: false,
 drop_debugger: true, conditionals: false,
 unused: false, if_return:false, side_effects:false},
 mangle: false
 }));
 }
 */

