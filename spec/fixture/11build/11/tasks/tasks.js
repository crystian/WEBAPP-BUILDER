/**
 * Created by Crystian on 4/6/2015.
 */

var spawn       = require('child_process').spawn,
		runSequence = require('run-sequence'),
		image       = require('../../../../../tasks/project/engine/image'),
		utils       = require('../../../../../tasks/shared/utils'),
		customs     = require('../../../../../tasks/shared/customs'),
		node;

//alias
gulp.task('default', ['build']);

gulp.task('hookPreDistProject', function(cb){
	runSequence(
		'ngTemplateApp',
		cb);
});

gulp.task('ngTemplateApp', function(){
	return customs.ngTemplate(gulp.src([global.cfg.app.folders.www + '/**/*.tpl.html']))
		.pipe(gulp.dest(global.cfg.app.folders.www + 'app'));
});
