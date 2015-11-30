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
		core.doMagic(file, config, appName, pth, {
			typeValidation: function(type){
				//valid types, css is the exception
				return (core.defaults.validPreproExtensions.indexOf(type) === -1 && type !== 'css');
			},
			processFile: function(stream, config, fileName, type){
				//preprocessors tasks
				if(core.defaults.validPreproExtensions.indexOf(type) !== -1){
					stream = preprocessFile(stream, config, fileName, type);
				}
				return stream;
			},
			minifyFile: function(stream){
				return stream
					.pipe(strip({safe: false, block: false}))
					.pipe(minifycss());
			},
			extensionMin: 'css'
		});
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
