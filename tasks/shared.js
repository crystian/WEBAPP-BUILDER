/**
 * Created by Crystian on 2/21/2015.
 */

// share with app

var gulp = require('gulp'),
	//debug = require('gulp-debug'),
	//fs = require('fs'),
	gif = require('gulp-if'),
	fs = require('fs-extra'),
	sass = require('gulp-ruby-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	csslint = require('gulp-csslint'),
	inject = require('gulp-inject'),
	removeCode = require('gulp-remove-code'),
	uglify = require('gulp-uglify'),
	jshint = require('gulp-jshint'),
	gutil = require('gulp-util');



exports.jsMaker = function(stream) {
	return stream
		//.pipe(debug({verbose: true}))
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(jshint.reporter('fail'))

		//just for "debugger" forgotens
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

exports.makeOneRequest = function (file, cb) {
	var json = {};
	if(file.css) {json.h = fs.readFileSync(file.html, {encoding : 'utf8'});}
	if(file.js)	 {json.j = fs.readFileSync(file.js, {encoding : 'utf8'});}
	if(file.css) {json.c = fs.readFileSync(file.css, {encoding : 'utf8'});}
	if(file.data){json.d = fs.readFileSync(file.data, {encoding : 'utf8'});}

	var jsonText = JSON.stringify(json);

	if(global.cfg.compress){
		LZString = require('../vendors/lz-string/libs/lz-string.min.js');
		jsonText = LZString.compressToUTF16(jsonText);
		console.logGreen(file.name +' compressed!');
	}

	fs.writeFile(global.cfg.folders.build +'/'+file.dest,
		jsonText,
		function(err){
			if(err) {
				console.logRed(err);
			} else {
				console.logGreen('Magic generated');
			}
			cb();
		});
};


exports.sassfixer = function(src, dest) {
	return gulp.src(src)
		//.pipe(debug({verbose: true}))
		//.on('error', gutil.log)
		//en mac se necesita ,  'sourcemap=none': true ??
		.pipe(sass({sourcemap : false, style: 'expanded', noCache: true}))
		.pipe(autoprefixer(global.cfg.autoprefixer))
		.pipe(csslint('csslintrc.json'))
		.pipe(csslint.reporter().on('error',gutil.log))
		.pipe(gulp.dest(dest));
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
