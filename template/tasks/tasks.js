/**
 * Created by Crystian on 4/6/2015.
 */

var gutil = require('gulp-util'),
	debug = require('gulp-debug'),
	engine = require('../../tasks/project/engine.js'),
	shared = require('../../tasks/project/shared.js'),
	sprite = require('gulp-sprite-generator'),
	spawn = require('child_process').spawn,
	clean = require('gulp-clean'),
	fs = require('fs-extra'),
	templateCache = require('gulp-angular-templatecache'),
	runSequence = require('run-sequence'),
	node,
	gulp = require('gulp');

//alias:
gulp.task('default', ['build']);
gulp.task('full', ['build:full']);
gulp.task('css', ['css:app']);
gulp.task('loader', ['get:loader']);

gulp.task('build:full', function (cb) {
	runSequence(
		'remove:build',
		'get:loader',
		'css:app',
		'build',
		cb);
});

gulp.task('build', function (cb) {
	runSequence(
		'build:fast',
		'copy:fonts',
		'copy:imgs',
		'copy:data',
		//'remove:temp',
		cb);
});

gulp.task('make:ngTemplate', function () {
	 var stream = gulp.src([global.cfg.folders.www +'/**/*.tpl.html'])
		//.pipe(debug({verbose: true}))
		.on('error', gutil.log);

	stream = shared.htmlMin(stream);

	stream = stream.pipe(templateCache({
			standalone: true,
			root: '../'+ global.cfg.folders.app +'/www/'
		}))
		.pipe(gulp.dest(global.cfg.folders.temp));

	return stream;
});

gulp.task('copy:fonts', function (){
	return gulp.src([
		'vendors/theme/assets/font-awesome/fonts/**/*',
		global.cfg.folders.www +'/assets/fonts/**/*'
	]).pipe(gulp.dest(global.cfg.folders.build + '/assets/fonts'));

});

gulp.task('copy:imgs', function (){
	return gulp.src([
		global.cfg.folders.www +'/landing/img/**/*',
		global.cfg.folders.www +'/app/assets/img/**/*'
	]).pipe(gulp.dest(global.cfg.folders.build +'/assets/img'));

});

gulp.task('copy:data', function (){
	return gulp.src([
		global.cfg.folders.www +'/app/data/local.json'
	]).pipe(gulp.dest(global.cfg.folders.build +'/data'));

});

gulp.task('build:fast', ['runMagic'], function (){
	return engine.runJsonify(global.cfg.folders.www +'/apps.json');
});

gulp.task('runMagic', ['make:ngTemplate'], function (){
	return engine.runMagic(global.cfg.folders.www +'/apps.json');
});

gulp.task('sprite', [], function (){
	var spriteOutput;

	spriteOutput = gulp.src('./build/.tmp/app.css')
		//.pipe(debug({verbose: true}))
		.on('error', gutil.log)
		.pipe(sprite({
			baseUrl:         "../../build",
			spriteSheetName: "sprite.jpg",
			spriteSheetPath: "./build",
			verbose: true
		}));

	spriteOutput.css.pipe(gulp.dest("./build/sprite"));
	spriteOutput.img.pipe(gulp.dest("./build/sprite"));

	return spriteOutput;
});

gulp.task('get:loader', function(cb){
	shared.getLoader(cb);
});

gulp.task('serve:build', ['build'], function() {
	return utils.makeServe(global.cfg.folders.build, '', global.cfg.ip, global.cfg.ports.build);
});


gulp.task('serve:api', function() {
	if (node) node.kill();
	node = spawn('node', [global.cfg.folders.www +'/api/api.js'], {stdio: 'inherit'});
	node.on('close', function (code) {
		if (code === 8) {
			gulp.log('Error detected, waiting for changes...');
		}
	});
});


gulp.task('css:app', function (){
	return engine.runPreprocessors(global.cfg.folders.www +'/apps.json');
});
gulp.task('cssw', function() {
	gulp.watch([global.cfg.folders.www + '/**/*.scss'], ['css:app']);
});


gulp.task('remove:build', function() {
	//no borrar la carpeta build, da errores de sincro
	return gulp.src([
		global.cfg.folders.build
	], {read: false})
		.pipe(clean());
});

gulp.task('remove:temp', function() {
	return gulp.src([
		global.cfg.folders.temp
	], {read: false})
		.pipe(clean());
});