/**
 * Created by Crystian on 4/6/2015.
 */

var gutil         = require('gulp-util'),
		spawn         = require('child_process').spawn,
		runSequence   = require('run-sequence'),
		image         = require('../../../tasks/project/engine/image'),
		templateCache = require('gulp-angular-templatecache'),
		node;
//	debug = require('gulp-debug'),
//	shared = require('../../tasks/project/shared.js'),
//	fs = require('fs-extra'),
//	gulp = require('gulp');

//alias
gulp.task('default', ['build']);


gulp.task('hookPostDistProject', function(cb){
	runSequence(
		'copyFonts',
		'copyImgs',
		'optimizeImages',
		//		(gutil.env.debug) ? 'nothing' : 'genAppCache',
		cb);
});

gulp.task('hookPreDistProject', function(cb){
	runSequence(
		'ngTemplate',
		cb);
});

gulp.task('optimizeImages', function(){
	return image.optimizeImages(global.cfg.app.folders.dist + 'img/**/*', global.cfg.app.folders.dist + 'img')
});

gulp.task('copyImgs', function(){
	return gulp.src([
		global.cfg.app.folders.www + '/app/assets/img/**/*',
		global.cfg.app.folders.www + '/app2/assets/img/**/*'
	]).pipe(gulp.dest(global.cfg.app.folders.dist + '/img'));
});

gulp.task('copyFonts', function (){
	return gulp.src([
		global.cfg.app.folders.www + 'vendors/bower_components/bootstrap/dist/fonts/**/*',
		global.cfg.app.folders.www + 'vendors/bower_components/components-font-awesome/fonts/**/*',
		global.cfg.app.folders.www + 'assets/fonts/**/*'
	]).pipe(gulp.dest(global.cfg.app.folders.dist + '/fonts'));
});

gulp.task('ngTemplate', function(){
	var stream = gulp.src([global.cfg.app.folders.www + '/**/*.tpl.html'])
		//.pipe(debug({verbose: true}))
		.on('error', gutil.log);

	//stream = shared.htmlMin(stream);
	stream = stream.pipe(templateCache({
			standalone: true
			//root: global.cfg.folderRoot + '/' + global.cfg.projectCode + '/www/'
		}))
		.pipe(gulp.dest(global.cfg.app.folders.temp));

	return stream;
});



//gulp.task('copy:imgs', function (){
//	return gulp.src([
//		global.cfg.folders.www +'/landing/img/**/*',
//		global.cfg.folders.www +'/app/assets/img/**/*',
//		'!**/app/assets/img/sprite*{,/**}'
//	]).pipe(gulp.dest(global.cfg.folders.build +'/img'));
//});
//gulp.task('copy:data', function (){
//	return gulp.src([
//		global.cfg.folders.www +'/app/data/local.json'
//	]).pipe(gulp.dest(global.cfg.folders.build +'/data'));
//});


gulp.task('serveApi', function(){
	if(node) node.kill();
	var www = (global.cfg.pathPrj + 'www/api/api.js');
	node = spawn('node', [www], {stdio: 'inherit'});
	node.on('close', function(code){
		if(code === 8){
			gulp.log('Error detected, waiting for changes...');
		}
	});
});
