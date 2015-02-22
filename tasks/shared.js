/**
 * Created by Crystian on 2/21/2015.
 */

// share with app

var gulp = require('gulp'),
	//debug = require('gulp-debug'),
	fs = require('fs'),
	gutil = require('gulp-util');


gulp.task('make:onRequest', function(cb) {
	var file = global.cfg.makeOneRequestFile;

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
});
