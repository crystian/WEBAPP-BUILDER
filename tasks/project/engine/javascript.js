/**
 * Created by Crystian on 02/12/2015.
 */

(function(){
	'use strict';

	var utils      = require('../../shared/utils'),
			//strip        = require('gulp-strip-comments'),
			gif        = require('gulp-if'),
			jshint     = require('gulp-jshint'),
			removeCode = require('gulp-remove-code'),
			uglify     = require('gulp-uglify'),
			rename     = require('gulp-rename'),
			coffee     = require('gulp-coffee'),
			ts         = require('gulp-typescript'),
			gutil      = require('gulp-util'),
			core       = require('./core');

	function runPreprocessors(file, config, appName, pth){
		return core.doMagic(file, config, appName, pth, {
			extensionFinal: 'js',
			isPrepro: function(type){
				return (core.defaults.validJsPreproExtensions.indexOf(type) !== -1);
			},
			isValid: function(type){
				return (this.isPrepro() || type === this.extensionFinal);
			},
			processFile: function(stream, config, fileName, type){
				return preprocessFile(stream, config, fileName, type);
			},
			removeCode: function(stream){
				return stream.pipe(removeCode({production: global.cfg.app.release}));
			},
			linter: function(stream, config){
				if(config.linter){
					stream = stream
						.pipe(jshint({lookup: false, debug: false}))
						.pipe(jshint.reporter('jshint-stylish'))
						.pipe(gif(config.linterForce, jshint.reporter('fail')));
				}
				return stream;
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
		//TODO add config option for each type
		switch (type){
			case 'coffee':
				stream = stream.pipe(coffee().on('error', gutil.log));
				break;
			case 'ts':
				stream = stream.pipe(ts());
				break;
		}


		return stream.pipe(rename(fileName + '.js'));
	}


	exports.runPreprocessors = runPreprocessors;
}());
