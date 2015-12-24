/**
 * Created by Crystian on 4/6/2015.
 */

var gutil       = require('gulp-util');

//alias
gulp.task('default', ['build']);

//gulp.task('ngTemplate', function () {
//	var stream = gulp.src([global.cfg.folders.www +'/**/*.tpl.html'])
//		//.pipe(debug({verbose: true}))
//		.on('error', gutil.log);
//
//	stream = shared.htmlMin(stream);
//	stream = stream.pipe(templateCache({
//		standalone: true,
//		root: global.cfg.folderRoot +'/'+ global.cfg.projectCode +'/www/'
//	}))
//	.pipe(gulp.dest(global.cfg.folders.temp));
//
//	return stream;
//});
