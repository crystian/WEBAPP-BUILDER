/**
* Created by Crystian on 15/02/02.
*/

var gulp = require('gulp'),
	//debug = require('gulp-debug'),
	utils = require('./project/utils'),
	fs = require('fs-extra'),
	removeCode = require('gulp-remove-code'),
	uglify = require('gulp-uglify'),
	jshint = require('gulp-jshint'),
	gif = require('gulp-if'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	csslint = require('gulp-csslint'),
	replace = require('gulp-replace'),
	inject = require('gulp-inject'),
	clean = require('gulp-clean'),
	gutil = require('gulp-util');

gulp.task('remove:build', function() {
	//no borrar la carpeta build, da errores de sincro
	return gulp.src([
			global.cfg.folders.screens,
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

exports.jsMaker = function(stream) {
	return stream
		//.pipe(debug({verbose: true}))
		//.on('error', gutil.log)
		.pipe(gif(cfg.loader.release, jshint({lookup:false, debug:false})))
		.pipe(gif(cfg.loader.release, jshint.reporter('jshint-stylish')))
		.pipe(gif(cfg.loader.release, jshint.reporter('fail')))

		.pipe(removeCode({ production: cfg.loader.release }))
		.pipe(gif(cfg.loader.release, uglify({
			output:{
				beautify: false
			},
			compress:{
				sequences: true,
				drop_console: false
			}
		}))
	);
};

exports.getFileNamesOrAllInOne = function(files){
	if(files.length<2){
		console.logRed('getFileNamesOrAllInOne: It can be minor two element');
		process.exit(1);
	}
	return (global.cfg.loader.oneRequest) ? files[files.length-1] : files.slice(0,files.length-1);
};

exports.prepareOneRequestFile = function (files, cb) {
	var f = {
			html: '',
			js: '',
			css: ''
		},
		self = this;

	files.forEach(function (item) {
		var type = utils.getExtensionFile(item);
		f[type] = item;
	});

	var	oneRequestFiles = {
		js: global.cfg.folders.template +'/'+ f.js,
		css: global.cfg.folders.template +'/'+ f.css,
		html: global.cfg.folders.template +'/'+ f.html,
		dest: '../'+ global.cfg.folders.template +'/'+ files[files.length-1]//always last option
	};

	this.makeOneRequestFile(oneRequestFiles, function () {
		cb();
	});
};

exports.makeOneRequestFile = function (file, cb) {
	var json = {};
	if(file.html) {json.h = fs.readFileSync(file.html, {encoding : 'utf8'});}
	if(file.js)	 {json.j = fs.readFileSync(file.js, {encoding : 'utf8'});}
	if(file.css) {json.c = fs.readFileSync(file.css, {encoding : 'utf8'});}
	//if(file.data){json.d = fs.readFileSync(file.data, {encoding : 'utf8'});}

	var jsonText = JSON.stringify(json);

	if(global.cfg.compress){
		LZString = require('../vendors/lz-string/libs/lz-string.min.js');
		jsonText = LZString.compressToUTF16(jsonText);
		console.logGreen(file.dest +' compressed!');
	}

	fs.writeFile(global.cfg.folders.build +'/'+file.dest,
		jsonText,
		function(err){
			if(err) {
				console.logRed(err);
			} else {
				console.logGreen(file.dest +' generated');
			}
			cb();
		});
};

exports.injectContent = function(filePath, name, tagHtm) {
	return inject(gulp.src([filePath]), {
		starttag: '<!-- inject:'+ name +' -->',
		transform: function (filePath, file) {
			var r = file.contents.toString('utf8');
			if (tagHtm) {
				r = '<'+tagHtm+'>'+r+'</'+tagHtm+'>';
			}
			return r;
		}
	});
};

exports.sassfixer = function(src, dest) {
	var type = utils.getExtensionFile(src);
	var sassOptions = {errLogToConsole: true, indentedSyntax: (type === 'sass')};

	return gulp.src(src)
		//.pipe(debug({verbose: true}))
		//.on('error', gutil.log)
		.pipe(sass(sassOptions))
		.pipe(autoprefixer(global.cfg.autoprefixer))
		.pipe(replace(' 0px', ' 0'))
		.pipe(csslint('csslintrc.json'))
		.pipe(csslint.reporter().on('error',gutil.log))
		.pipe(gulp.dest(dest));
};
