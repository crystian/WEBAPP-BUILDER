/**
 * Created by Crystian on 15/11/2015.
 */
	//TODO sprites
(function(){
	'use strict';

	var utils        = require('../../shared/utils'),
			sass         = require('gulp-sass'),
			less         = require('gulp-less'),
			stylus       = require('gulp-stylus'),
			minifycss    = require('gulp-minify-css'),
			strip        = require('gulp-strip-comments'),
			gif          = require('gulp-if'),
			csslint      = require('gulp-csslint'),
			replace      = require('gulp-replace'),
			autoprefixer = require('gulp-autoprefixer'),
			rename       = require('gulp-rename'),
			gutil        = require('gulp-util'),
			core         = require('./core');

	exports.runPreprocessors = function(file, config, appName, pth){
		var fileName    = utils.getFileName(file.path),
				type        = utils.getExtensionFile(file.path),
				fileNameExt = utils.getFileNameWithExtension(file.path),
				fileNameMin = file.base + '/' + fileName + '.' + config.minExtension + '.css',
				dest        = file.base + '/' + fileName + '.css',
				genMinFile  = false,
				stream;

		//if it is minificate, it'll ignore
		if(config.minificated){
			return;
		}

		//valid types, css is the exception
		if(core.defaults.validPreproExtensions.indexOf(type) === -1 &&
			type !== 'css'){
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
					console.debug('File to preprocess found, it doesn\'t overwrite (' + fileNameExt + ')', 'otro', 'y otro');
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
			stream = core.modifyOriginal(stream, file.path, config);
		}

		if(fileName.indexOf('.' + config.minExtension) >= 0 && type === 'css'){
			console.debug(fileNameExt + ': minificated detected'); //and ingnored it
			return stream;
		}

		//preprocessors tasks
		if(core.defaults.validPreproExtensions.indexOf(type) !== -1){
			stream = preprocessFile(stream, config, fileName, type);
		}

		stream = core.replaces(stream, config.replaces.pre, fileNameExt);

		if(genMinFile || global.cfg.app.release){
			stream = stream
				.pipe(strip({safe: false, block: false}))
				.pipe(minifycss());

			stream = core.replaces(stream, config.replaces.post, fileNameExt);

			if(genMinFile){
				stream = stream.pipe(rename(fileNameMin));
			}
		}

		if(!genMinFile && type === 'css'){
			return stream;
		}

		return stream.pipe(gulp.dest(file.base, {overwrite: true}));
	};


	function preprocessFile(stream, config, fileName, type){

		switch (type){
			case 'scss':
			case 'sass':
				var sassOptions = {errLogToConsole: true, indentedSyntax: (type === 'sass')};

				stream = stream.pipe(sass(sassOptions));
				break;
			case 'styl':
				stream = stream.pipe(stylus());
				break;
			case 'less':
				stream = stream.pipe(less());
				break;
		}

		if(config.autoPrefixer){
			stream = stream.pipe(autoprefixer({browsers: global.cfg.autoprefixer}));
		}

		if(config.linter){
			stream
				.pipe(replace(' 0px', ' 0'))
				.pipe(csslint('csslintrc.json'))
				.pipe(csslint.reporter(cssLintCustomReporter))
				.pipe(gif(config.linterForce, csslint.reporter('fail')));
		}

		stream = stream.pipe(rename(fileName + '.css'));
		return stream;
	}

	function cssLintCustomReporter(file){
		gutil.log(gutil.colors.cyan(file.csslint.errorCount) + ' errors in ' + gutil.colors.magenta(file.path));

		file.csslint.results.forEach(function(result){
			gutil.log(result.error.message + ' on line ' + result.error.line);
		});
	}

}());
