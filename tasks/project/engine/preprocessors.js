/**
 * Created by Crystian on 15/11/2015.
 */
(function(){
	'use strict';

	var utils   = require('../../shared/utils'),
			main   = require('./main'),
		aux    = require('./auxiliar');

	exports.runPreprocessors = function(groupStream, group, pth, options){
		if(group.minificated){return groupStream;}

		//console.log('min: '+group.files);

		var i = 0,
			l = group.files.length;

		for(;i<l;i++){
			var file = group.files[i];
			var fileName = utils.getFileName(file),
				type = utils.getExtensionFile(file);

			console.log('file', file);
			console.log('filename: ', fileName);
			console.log('type: ', type);
			//console.log('min: ', fileMin);

			//valid types
			if(main.defaults.validPreproExtensions.indexOf(type)===-1){continue;}

			//which name have min file?, default: *.min.*
			var fileMin = group.min || fileName + '.min.css';


			if(
					utils.fileExist(group, file)
			){
				//!(global.cfg.app.release || group.overwrite)
				//	&& (aux.fileDestExist(group, file) && !group.overwrite)) {//for the overwrite = false
				//exist, and don't overwrite it
				console.log('File found, don\'t overwrite ('+ file +')');
				continue;
			}

		}

		return groupStream;
	};

}());


//
//	var source = file.path + file.file,
//		finalFileName = file.path + fileName +'.css';

		//just for detect potentian file exists
		//file._cssFile = finalFileName;


//		var stream = gulp.src(source)
//			.pipe(commons.debugeame());
//
//		switch (type){
//			case 'scss':
//			case 'sass':
//				var sassOptions = {errLogToConsole: true, indentedSyntax: (type === 'sass')};
//
//				stream = stream.pipe(sass(sassOptions));
//				break;
//			case 'less':
//				stream = stream.pipe(less());
//				break;
//		}
//
//		if (file.autoPrefix) {
//			stream = stream.pipe(autoprefixer(global.cfg.autoprefixer))
//				.pipe(replace(' 0px', ' 0'));
//		}
//
//		if (file.linter) {
//			stream = stream.pipe(csslint('csslintrc.json'))
//				.pipe(csslint.reporter()).on('error', gutil.log);
//		}
//
//		if(!(file.makeMin && type === 'css')) {
//			stream = stream.pipe(gulp.dest(file.path));
//		}
//
//		if(file.makeMin){
//			stream = _minificateAndSave(stream, file, 'css')
//		}
//
//		streams = aux.merge(streams, stream);
//	}
//
//	return streams;
//}
