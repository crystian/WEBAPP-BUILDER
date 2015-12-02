/**
 * Created by Crystian on 02/12/2015.
 */

(function(){
	'use strict';

	var utils        = require('../../shared/utils'),
			//strip        = require('gulp-strip-comments'),
			//gif          = require('gulp-if'),
			//replace      = require('gulp-replace'),
			//rename       = require('gulp-rename'),
			//gutil        = require('gulp-util'),
			core         = require('./core');

	function runPreprocessors(file, config, appName, pth){
		return core.doMagic(file, config, appName, pth, {
			extensionFinal: 'js',
			isValidation: function(type){
				//valid types, css is the exception
				return (core.defaults.validCssPreproExtensions.indexOf(type) !== -1 || type === 'css');
			},
			processFile: function(stream, config, fileName, type){
				//preprocessors tasks
				if(core.defaults.validCssPreproExtensions.indexOf(type) !== -1){
					stream = preprocessFile(stream, config, fileName, type);
				}
				return stream;
			},
			minifyFile: function(stream){
				return stream
						.pipe(strip({safe: false, block: false}))
						.pipe(minifycss());
			}
		});
	}

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

		return stream.pipe(rename(fileName + '.css'));
	}

	function cssLintCustomReporter(file){
		gutil.log(gutil.colors.cyan(file.csslint.errorCount) + ' errors in ' + gutil.colors.magenta(file.path));

		file.csslint.results.forEach(function(result){
			gutil.log(result.error.message + ' on line ' + result.error.line);
		});
	}

	exports.runPreprocessors = runPreprocessors;
}());
