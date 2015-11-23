/**
 * Created by Crystian on 15/11/2015.
 */
(function(){
	'use strict';

	var utils = require('../../shared/utils'),
			core  = require('./core');
	//			aux    = require('./auxiliar'),
	//			gutil    = require('gulp-util'),

	exports.runPreprocessors = function(file, config, appName, pth){
		if(!config){
			console.logRed('Preprocessors: configuration is required');
			utils.exit(1);
		}

		//if it is minificate, it'll ignore
		if(config.minificated){
			return;
		}

		/*
		validExtension

		new stream

		minName = min.css || min.*

		replacesOriginal

		isMin { return}


		notCss && !exist (css) && overwrite {
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

		var fileName = utils.getFileName(file.path),
				type     = utils.getExtensionFile(file.path),
				fileNameExt = utils.getFileNameWithExtension(file.path),
				isMin = false;

		//valid types
		if(core.defaults.validPreproExtensions.indexOf(type) === -1 &&
				type !== 'css'){
			return;
		}

		var stream = gulp.src(file.path)
				//.pipe(utils.debugeame())
				;

		//console.log('filename: ', fileName);
		//console.log('type: ', type);

		if(fileName.indexOf(config.minExtension) >= 0){
			//console.log(fileNameExt +': minificated detected');
			isMin = true;
		}

		if(fileName.indexOf('.original') >= 0){
			//console.log(fileNameExt +': original detected, it will ignore');
			return;
		}

		//console.log('min:', fileNameMin);
		//var	fileNameMin = fileName + config.minExtension +'.'+ type;
		//console.log(fileNameMin);
		//console.log(file.path);
		//console.log(file.base);
		core.modificateOriginal(file.path, config, 'normal');
		//core.modificateOriginal(file.base + fileNameMin, config, 'min');
		if(isMin){
			//si?
			return;
		}
	};




//		var fileName2 = file.base + fileMin;
//		console.log(fileName2);
//		if(utils.fileExist(fileName2) && config.overwrite){
//		//		//!(global.cfg.app.release || groupConfig.overwrite)
//		//		//	&& (aux.fileDestExist(groupConfig, file) && !groupConfig.overwrite)) {//for the overwrite = false
//		//		//exist, and don't overwrite it
//		//		console.log('File found, don\'t overwrite ('+ file +')');
//		//		continue;
//				console.log('A');
//			} else {
//				console.log('B');
//			}
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//		cb(null, file);
//	});
//}



}());



////	var source = file.path + file.file,
////		finalFileName = file.path + fileName +'.css';
//
//		//just for detect potentian file exists
//		//file._cssFile = finalFileName;
//
//
////		var stream = gulp.src(source)
////			.pipe(commons.debugeame());
////
////		switch (type){
////			case 'scss':
////			case 'sass':
////				var sassOptions = {errLogToConsole: true, indentedSyntax: (type === 'sass')};
////
////				stream = stream.pipe(sass(sassOptions));
////				break;
////			case 'less':
////				stream = stream.pipe(less());
////				break;
////		}
////
////		if (file.autoPrefix) {
////			stream = stream.pipe(autoprefixer(global.cfg.autoprefixer))
////				.pipe(replace(' 0px', ' 0'));
////		}
////
////		if (file.linter) {
////			stream = stream.pipe(csslint('csslintrc.json'))
////				.pipe(csslint.reporter()).on('error', gutil.log);
////		}
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
