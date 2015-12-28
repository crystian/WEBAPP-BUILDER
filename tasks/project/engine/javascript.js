/**
 * Created by Crystian on 02/12/2015.
 */

(function(){
	'use strict';

	var utils      = require('../../shared/utils'),
			gif        = require('gulp-if'),
			jshint     = require('gulp-jshint'),
			removeCode = require('gulp-remove-code'),
			uglify     = require('gulp-uglify'),
			rename     = require('gulp-rename'),
			coffee     = require('gulp-coffee'),
			ts         = require('gulp-typescript'),
			gutil      = require('gulp-util'),
			core       = require('./core');

	var extensionFinal = 'js';

	function runPreprocessors(file, config, appName, pth){
		return core.doMagic(file, config, appName, pth, {
			extensionFinal: extensionFinal,
			validPreproExtension: core.defaults.validJsPreproExtensions,
			preprocessFile: preprocessFile,
			removeCode: function(stream){
				return stream.pipe(removeCode({production: global.cfg.app.release}));
			},
			linter: function(stream, config){
				return stream
					.pipe(jshint({lookup: false, debug: false}))
					.pipe(jshint.reporter('jshint-stylish'))
					.pipe(gif(config.linterForce, jshint.reporter('fail')));
			},
			minifyFile: function(stream){
				return stream
					.pipe(uglify({
							output: {
								beautify: false
							},
							compress: {
								sequences: true,
								drop_console: false
							}
						})
					);
			}
		});
	}

	function preprocessFile(stream, config, fileName, type){
		//TODO add config option (from app.json) for each type
		switch (type){
			case 'coffee':
				stream = stream.pipe(coffee().on('error', gutil.log));
				break;
			case 'ts':
				stream = stream.pipe(ts());
				break;
		}

		return stream.pipe(rename(fileName + '.' + extensionFinal));
	}

	exports.runPreprocessors = runPreprocessors;
}());
