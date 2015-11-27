/**
 * Created by Crystian on 15/11/2015.
 */
(function(){
	'use strict';

	var utils = require('../../shared/utils'),
				sass = require('gulp-sass'),
			//	less = require('gulp-less'),
			//stylus = require('gulp-stylus'),
				csslint = require('gulp-csslint'),
				replace = require('gulp-replace'),
				autoprefixer = require('gulp-autoprefixer'),
				rename = require('gulp-rename'),
				gutil    = require('gulp-util'),
			core  = require('./core');
	//			aux    = require('./auxiliar'),

	exports.runPreprocessors = function(file, config, appName, pth){
		var fileName = utils.getFileName(file.path),
				type     = utils.getExtensionFile(file.path),
				fileNameExt = utils.getFileNameWithExtension(file.path),
				stream = {};

		//console.log('filename: ', fileName);
		//console.log('type: ', type);

		if(!config){
			console.logRed('Preprocessors: configuration is required');
			utils.exit(1);
		}

		/*
		* minificated
		* validExtension
		* new stream
		* minName = min.css || min.*
		* replacesOriginal
		* isMin { return}
		notCss
		&& !exist (css) && overwrite {
				preprocess
			 autoPrefix
			 linter

			 genSprite
		}

		makeMin{
		 !exist(min.css) && overwrite {
		 		minStream
				createMinFile
			}
		} else {
			!debug{
				minStream
			}
		}

	 minStream fn{
		replacePre
		min
	 	replacePost
	 }
		*/

		//if it is minificate, it'll ignore
		if(config.minificated){
			return;
		}

		//valid types
		if(core.defaults.validPreproExtensions.indexOf(type) === -1 &&
				type !== 'css'){//css is the exception
			return;
		}

		if(config.replaces.original.length > 0){

			if(fileName.indexOf('.' + config.backupExtension) >= 0){
				//console.log(fileNameExt +': original detected, it will ignore');
				return;
			}

			core.modificateOriginal(file.path, config);
		}

		if(fileName.indexOf(config.minExtension) >= 0){
			//console.log(fileNameExt +': minificated detected');
			return;
		}

		stream = gulp.src(file.path)
			//.pipe(utils.debugeame())
		;

		//preprocessors
		if(core.defaults.validPreproExtensions.indexOf(type) !== -1){
			var dest = file.base + '/' + fileName + '.css';

			if(!config.overwrite && utils.fileExist(dest)){
				console.logWarn('File found, don\'t overwrite ('+ file +')');
			} else {

				switch (type){
					case 'scss':
					case 'sass':
						var sassOptions = {errLogToConsole: true, indentedSyntax: (type === 'sass')};

						stream = stream.pipe(sass(sassOptions));
						break;
					case 'styl':
						stream.pipe(stylus());
						break;
					case 'less':
						stream.pipe(less());
						break;
				}

				if (config.autoPrefix) {
					stream = stream.pipe(autoprefixer({browser:global.cfg.autoprefixer}))
						.pipe(replace(' 0px', ' 0'));
				}

				if (config.linter) {
					stream.pipe(csslint('csslintrc.json'))
						.pipe(csslint.reporter()).on('error', gutil.log);
				}


			}
		}


		stream
				.pipe(rename(fileName+ '.css'))
				.pipe(gulp.dest(file.base, {overwrite: true}));

	};

}());


////
////		if(!(file.makeMin && type === 'css')) {
////			stream = stream.pipe(gulp.dest(file.path));
////		}
////
////		if(file.makeMin){
////			stream = _minificateAndSave(stream, file, 'css')
////		}
////
////		streams = aux.merge(streams, stream);
////	}
////
////	return streams;
////}
