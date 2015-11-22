///**
// * Created by Crystian on 15/11/2015.
// */
//(function(){
//	'use strict';
//
//	var utils   = require('../../shared/utils'),
//			main   = require('./core'),
//			aux    = require('./auxiliar'),
//			gutil    = require('gulp-util'),
//			through = require('through2');
//
//	exports.runPreprocessors = function(groupStream, groupConfig, pth, options){
//		if(groupConfig.minificated){return groupStream;}
//
//		return groupStream
//				.pipe(preprocess(groupConfig))
//				//.pipe(utils.debugeame())
//				.pipe(gulp.dest('.'));
//	};
//
//function preprocess(config){
//	if(!config){
//		console.logRed('error: configuration is required');
//		utils.exit(1);
//	}
//
//	return through.obj(function(file, enc, cb) {
//			var fileName = utils.getFileName(file.path),
//				type = utils.getExtensionFile(file.path);
//
//			//valid types
//			if(main.defaults.validPreproExtensions.indexOf(type)===-1){return cb(null, file);}
//
//
//			//which name have min file?, default: *.min.*
//			var fileMin = config.min || fileName + '.min.css';
//
//			console.log('filename: ', fileName);
//			console.log('type: ', type);
//			console.log('min:', fileMin);
//
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
//
//
//
//}());
//
//
////
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
