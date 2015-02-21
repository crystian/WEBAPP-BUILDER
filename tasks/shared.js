/**
 * Created by Crystian on 2/21/2015.
 */

var gulp = require('gulp'),
	//debug = require('gulp-debug'),
	fs = require('fs'),
	gutil = require('gulp-util');

gulp.task('make:landing', function(cb) {

	var json = {};
	json.h = fs.readFileSync('www/app.html', {encoding : 'utf8'});
	json.j = fs.readFileSync('www/app.js', {encoding : 'utf8'});
	json.c = fs.readFileSync('www/app.css', {encoding : 'utf8'});

	var jsonText = JSON.stringify(json);

	if(global.cfg.compress){
		LZString = require('../vendors/lz-string/libs/lz-string.min.js');
		jsonText = LZString.compressToUTF16(jsonText);
		console.logGreen('Base compressed!');
	}

	fs.writeFile(global.cfg.folders.build +'/magic',
		jsonText,
		function(err){
			if(err) {
				console.logRed(err);
			} else {
				console.logGreen('Magic generated');
			}
			cb();
		});
});
