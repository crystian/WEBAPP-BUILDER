/**
 * Created by Crystian on 4/6/2015.
 */

var spawn         = require('child_process').spawn,
		runSequence   = require('run-sequence'),
		image         = require('../../../tasks/project/engine/image'),
		utils         = require('../../../tasks/shared/utils'),
		htmlmin       = require('gulp-htmlmin'),
		strip         = require('gulp-strip-comments'),
		templateCache = require('gulp-angular-templatecache'),
		node;

//alias
gulp.task('default', ['build']);

gulp.task('hookPreDistProject', function(cb){
	runSequence(
		'ngTemplateApp2',
		cb);
});

gulp.task('hookPostDistProject', function(cb){
	runSequence(
		'copyFonts',
		'copyData',
		'copyImgs',
		'optimizeImages',
		//		(gutil.env.debug) ? 'nothing' : 'genAppCache',
		cb);
});


gulp.task('optimizeImages', function(){
	return image.optimizeImages(global.cfg.app.folders.dist + 'img/**/*', global.cfg.app.folders.dist + 'img')
});

gulp.task('copyImgs', function(){
	return gulp.src([
		global.cfg.app.folders.www + '/app/assets/img/**/*',
		global.cfg.app.folders.www + '/app2/assets/img/**/*',
		'!'+ global.cfg.app.folders.www + '/app2/assets/img/sprite*/**/*'
	]).pipe(gulp.dest(global.cfg.app.folders.dist + '/img'));
});

gulp.task('copyData', function(){
	return gulp.src([
		global.cfg.app.folders.www + '/app2/data/**/*.json'
	]).pipe(gulp.dest(global.cfg.app.folders.dist + '/data'));
});

gulp.task('copyFonts', function(){
	return gulp.src([
		global.cfg.app.folders.www + 'vendors/bower_components/bootstrap/dist/fonts/**/*',
		global.cfg.app.folders.www + 'vendors/bower_components/components-font-awesome/fonts/**/*',
		global.cfg.app.folders.www + 'assets/fonts/**/*'
	]).pipe(gulp.dest(global.cfg.app.folders.dist + '/fonts'));
});

gulp.task('ngTemplateApp2', function(){

	var htmlminOptions = {
		collapseWhitespace: true,
		removeComments: true,
		removeRedundantAttributes: true
	};

	return gulp.src([global.cfg.app.folders.www + '/**/*.tpl.html'])
		.pipe(utils.debugeame())
		.pipe(strip({safe: false, block: false}))
		.pipe(htmlmin(htmlminOptions))
		.pipe(templateCache({
			standalone: true,
			root: '../'+ global.cfg.app.folders.template + global.cfg.app.folders.www
		}))
		.pipe(gulp.dest(global.cfg.app.folders.www + 'app2'));
});

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
