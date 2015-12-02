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
				//valid types, js is the exception
				return (core.defaults.validJsPreproExtensions.indexOf(type) !== -1 || type === this.extensionFinal);
			},
			processFile: function(stream, config, fileName, type){
				//preprocessors tasks
				if(core.defaults.validJsPreproExtensions.indexOf(type) !== -1){
					stream = preprocessFile(stream, config, fileName, type);
				}
				return stream;
			},
			minifyFile: function(stream){
				return stream;
						//.pipe(strip({safe: false, block: false}))
						//.pipe(minifycss());
			}
		});
	}

	function preprocessFile(stream, config, fileName, type){

		switch (type){
			case 's':
				//stream = stream.pipe(sass(sassOptions));
				break;
			case 'c':
				//stream = stream.pipe(stylus());
				break;
		}

		if(config.linter){
			//stream

		}

		return stream.pipe(rename(fileName + '.css'));
	}


	exports.runPreprocessors = runPreprocessors;
}());
